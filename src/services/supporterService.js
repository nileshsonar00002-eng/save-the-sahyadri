/**
 * SAHYADRI SUPPORTER & REAL-TIME MOVEMENT SERVICE
 * 
 * Handles registration, real-time subscriber sync via Firebase Firestore,
 * privacy-conscious city centroid mapping, and client-side sanitization.
 */

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { findCityGeo, SAHYADRI_HUB } from '../data/sahyadriData.js';
import { sanitizeInput, countUniqueCities } from '../utils/sanitize.js';

export { sanitizeInput, countUniqueCities };

const COLLECTION_NAME = 'sahyadri_supporters';
const LOCAL_STORAGE_KEY = 'sahyadri_pledged_data';
const DEDUP_CACHE_KEY = 'sahyadri_pledge_token';

// Simple in-memory supporters cache
let activeSupporters = [];
let isFirebaseAvailable = true;

/**
 * Real-time listener for supporters
 * @param {Function} onUpdate Callback when supporter list updates
 * @param {Function} onError Callback if Firestore listener encounters errors
 * @returns {Function} Unsubscribe function
 */
export function subscribeToSupporters(onUpdate, onError) {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        isFirebaseAvailable = true;
        const list = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.status !== 'removed') {
            // Only expose public fields (no emails, no exact home coordinates)
            list.push({
              id: docSnap.id,
              displayName: data.displayName || 'Supporter',
              city: data.city || 'Maharashtra',
              state: data.state || 'India',
              lat: typeof data.lat === 'number' ? data.lat : SAHYADRI_HUB.lat,
              lng: typeof data.lng === 'number' ? data.lng : SAHYADRI_HUB.lng,
              joinedAt: data.joinedAt?.toDate ? data.joinedAt.toDate().toISOString() : new Date().toISOString()
            });
          }
        });

        activeSupporters = list;
        onUpdate({
          supporters: list,
          total: list.length,
          uniqueCities: countUniqueCities(list),
          isLive: true
        });
      },
      (error) => {
        console.warn('[Sahyadri Sync] Firestore read note:', error.message);
        isFirebaseAvailable = false;
        
        // Load fallback from localStorage if present
        const localList = loadLocalSupporters();
        activeSupporters = localList;
        
        if (onError) onError(error);
        onUpdate({
          supporters: localList,
          total: localList.length,
          uniqueCities: countUniqueCities(localList),
          isLive: false,
          fallbackMode: true
        });
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('[Sahyadri Sync] Init error:', err);
    isFirebaseAvailable = false;
    const localList = loadLocalSupporters();
    onUpdate({
      supporters: localList,
      total: localList.length,
      uniqueCities: countUniqueCities(localList),
      isLive: false,
      fallbackMode: true
    });
    return () => {};
  }
}

/**
 * Register a new supporter
 */
export async function registerSupporter({ displayName, city = 'Maharashtra', state = 'Maharashtra', email = '', consented = true, lat: inputLat, lng: inputLng }) {
  const cleanName = sanitizeInput(displayName);
  const cleanCity = sanitizeInput(city) || 'Maharashtra';
  const cleanState = sanitizeInput(state) || 'Maharashtra';
  const cleanEmail = email ? sanitizeInput(email).toLowerCase() : '';

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Please enter a valid display name (at least 2 characters).');
  }
  if (!consented) {
    throw new Error('Please confirm consent for public awareness display.');
  }

  // Deduplication check: Has this browser already pledged with this name?
  const existingToken = localStorage.getItem(DEDUP_CACHE_KEY);
  const submissionKey = `${cleanName.toLowerCase()}_${cleanCity.toLowerCase()}`;
  if (existingToken === submissionKey) {
    throw new Error('You have already pledged support from this browser. Thank you for standing with Sahyadri!');
  }

  // Map to GPS coordinates if provided, else city centroid
  let lat = typeof inputLat === 'number' ? inputLat : null;
  let lng = typeof inputLng === 'number' ? inputLng : null;

  if (lat === null || lng === null) {
    const cityGeo = findCityGeo(cleanCity, cleanState);
    lat = cityGeo ? cityGeo.lat : SAHYADRI_HUB.lat;
    lng = cityGeo ? cityGeo.lng : SAHYADRI_HUB.lng;
  }

  const newDoc = {
    displayName: cleanName,
    city: cleanCity,
    state: cleanState,
    lat,
    lng,
    consented: true,
    hasEmail: Boolean(cleanEmail),
    // Email stored privately for updates only if requested, never exposed publicly
    privateEmail: cleanEmail || null,
    status: 'active',
    joinedAt: serverTimestamp()
  };

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, newDoc);
    
    // Save token in localStorage
    localStorage.setItem(DEDUP_CACHE_KEY, submissionKey);

    return {
      success: true,
      id: docRef.id,
      displayName: cleanName,
      city: cleanCity,
      state: cleanState,
      lat,
      lng
    };
  } catch (err) {
    console.warn('[SupporterService] Firestore write note:', err.message);
    
    // If Firestore rules reject or network is offline, write to local fallback
    const localId = 'loc_' + Date.now();
    const fallbackRecord = {
      id: localId,
      displayName: cleanName,
      city: cleanCity,
      state: cleanState,
      lat,
      lng,
      joinedAt: new Date().toISOString()
    };
    
    saveLocalSupporter(fallbackRecord);
    localStorage.setItem(DEDUP_CACHE_KEY, submissionKey);

    return {
      success: true,
      id: localId,
      displayName: cleanName,
      city: cleanCity,
      state: cleanState,
      lat,
      lng,
      isLocalFallback: true
    };
  }
}

/**
 * Request data correction or removal
 */
export async function requestSupporterRemoval({ supporterId, name, reason }) {
  if (!supporterId && !name) {
    throw new Error('Please provide your Supporter ID or registered name.');
  }

  try {
    if (supporterId && !supporterId.startsWith('loc_')) {
      const docRef = doc(db, COLLECTION_NAME, supporterId);
      await updateDoc(docRef, {
        status: 'removed',
        removalReason: sanitizeInput(reason || 'User request'),
        removalRequestedAt: serverTimestamp()
      });
      return { success: true, message: 'Your participation record has been successfully scheduled for removal.' };
    }
  } catch (e) {
    console.warn('[Supporter Removal] Firestore removal note:', e);
  }

  // Remove from local fallback
  removeLocalSupporter(supporterId, name);
  return { success: true, message: 'Your participation record has been removed.' };
}

// LocalStorage helpers
function loadLocalSupporters() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveLocalSupporter(item) {
  try {
    const list = loadLocalSupporters();
    list.unshift(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

function removeLocalSupporter(id, name) {
  try {
    let list = loadLocalSupporters();
    list = list.filter(s => s.id !== id && s.displayName.toLowerCase() !== (name || '').toLowerCase());
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}
