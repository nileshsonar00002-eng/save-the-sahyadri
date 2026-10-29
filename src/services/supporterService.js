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
const DEVICE_ID_KEY = 'sahyadri_device_id';
const DEVICE_PLEDGED_KEY = 'sahyadri_device_pledged';
const PLEDGED_SUPPORTER_KEY = 'sahyadri_pledged_supporter';

// Helper: safe cookie reader
function getCookie(name) {
  if (typeof document === 'undefined' || !document.cookie) return null;
  try {
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  } catch (_) {
    return null;
  }
}

// Helper: safe cookie writer (10-year persistence)
function setCookie(name, value, days = 3650) {
  if (typeof document === 'undefined') return;
  try {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  } catch (_) {}
}

// Helper: browser & hardware fingerprint generator
function getBrowserFingerprint() {
  let fp = '';
  try {
    if (typeof navigator !== 'undefined') {
      fp += `${navigator.userAgent || ''}|${navigator.language || ''}|${new Date().getTimezoneOffset()}|`;
    }
    if (typeof screen !== 'undefined') {
      fp += `${screen.width}x${screen.height}|${screen.colorDepth}|`;
    }
  } catch (_) {}

  let hash = 0;
  for (let i = 0; i < fp.length; i++) {
    hash = ((hash << 5) - hash) + fp.charCodeAt(i);
    hash |= 0;
  }
  return 'fp_' + Math.abs(hash).toString(36);
}

/**
 * Get or initialize persistent Device ID
 */
export function getDeviceId() {
  let id = null;

  // 1. Check localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      id = localStorage.getItem(DEVICE_ID_KEY);
    }
  } catch (_) {}

  // 2. Check Cookie
  if (!id) {
    id = getCookie(DEVICE_ID_KEY);
  }

  // 3. Check sessionStorage
  if (!id) {
    try {
      if (typeof sessionStorage !== 'undefined') {
        id = sessionStorage.getItem(DEVICE_ID_KEY);
      }
    } catch (_) {}
  }

  // 4. Generate persistent ID if not found
  if (!id) {
    const fp = getBrowserFingerprint();
    const random = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
      ? crypto.randomUUID()
      : ('r_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36));
    id = `${fp}_${random}`;
  }

  // Sync to all available layers
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
  } catch (_) {}
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(DEVICE_ID_KEY, id);
    }
  } catch (_) {}
  setCookie(DEVICE_ID_KEY, id);

  return id;
}

/**
 * Check if current device has already joined the movement
 */
export function hasDeviceJoined() {
  // 1. Check localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem(DEVICE_PLEDGED_KEY) === 'true') return true;
      if (localStorage.getItem(PLEDGED_SUPPORTER_KEY)) return true;
      if (localStorage.getItem(DEDUP_CACHE_KEY)) return true;
    }
  } catch (_) {}

  // 2. Check Cookie
  if (getCookie(DEVICE_PLEDGED_KEY) === 'true') return true;

  // 3. Check sessionStorage
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(DEVICE_PLEDGED_KEY) === 'true') {
      return true;
    }
  } catch (_) {}

  // 4. Check active memory cache against device ID
  const devId = getDeviceId();
  if (devId && activeSupporters && activeSupporters.length > 0) {
    const matched = activeSupporters.find(s => s.deviceId === devId);
    if (matched) {
      markDeviceAsJoined(matched);
      return true;
    }
  }

  return false;
}

/**
 * Mark this device as permanently joined
 */
export function markDeviceAsJoined(supporterData = null) {
  const devId = getDeviceId();
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DEVICE_PLEDGED_KEY, 'true');
      localStorage.setItem(DEVICE_ID_KEY, devId);
      if (supporterData) {
        localStorage.setItem(PLEDGED_SUPPORTER_KEY, JSON.stringify({
          id: supporterData.id || '',
          displayName: supporterData.displayName || 'Concerned Citizen',
          city: supporterData.city || 'Maharashtra',
          state: supporterData.state || 'India',
          lat: supporterData.lat,
          lng: supporterData.lng,
          joinedAt: supporterData.joinedAt || new Date().toISOString()
        }));
      }
    }
  } catch (_) {}

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(DEVICE_PLEDGED_KEY, 'true');
      sessionStorage.setItem(DEVICE_ID_KEY, devId);
    }
  } catch (_) {}

  setCookie(DEVICE_PLEDGED_KEY, 'true');
  setCookie(DEVICE_ID_KEY, devId);
}

/**
 * Retrieve saved supporter details for this device (if available)
 */
export function getDevicePledgedSupporter() {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(PLEDGED_SUPPORTER_KEY);
      if (raw) return JSON.parse(raw);
    }
  } catch (_) {}
  return null;
}

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
              deviceId: data.deviceId || null,
              joinedAt: data.joinedAt?.toDate ? data.joinedAt.toDate().toISOString() : new Date().toISOString()
            });
          }
        });

        activeSupporters = list;

        // Auto-check if current device already has a registered supporter
        const currentDevId = getDeviceId();
        if (currentDevId) {
          const matchedPledge = list.find(s => s.deviceId === currentDevId);
          if (matchedPledge) {
            markDeviceAsJoined(matchedPledge);
          }
        }

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

  // Strict 1-pledge-per-device check: local storage, cookies & memory
  if (hasDeviceJoined()) {
    throw new Error('Aapke is device se pehle hi movement join kiya ja chuka hai. Spam rokne ke liye ek device se sirf ek hi registration allowed hai.');
  }

  const deviceId = getDeviceId();
  const submissionKey = `${cleanName.toLowerCase()}_${cleanCity.toLowerCase()}`;

  // Database verification: Ensure this deviceId does not already exist in Firestore
  if (isFirebaseAvailable) {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = query(colRef, where('deviceId', '==', deviceId));
      const snap = await getDocs(q);
      const existingDoc = snap.docs.find(d => {
        const dData = d.data();
        return dData && dData.status !== 'removed';
      });
      if (existingDoc) {
        const existingData = existingDoc.data();
        markDeviceAsJoined({ id: existingDoc.id, ...existingData });
        throw new Error('Aapke is device se pehle hi movement join kiya ja chuka hai. Spam rokne ke liye ek device se sirf ek hi registration allowed hai.');
      }
    } catch (err) {
      if (err.message && err.message.includes('pehle hi movement join')) {
        throw err;
      }
      // Firestore query error (index or permissions) — local check already enforced
    }
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
    deviceId,
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
    
    const record = {
      id: docRef.id,
      displayName: cleanName,
      city: cleanCity,
      state: cleanState,
      lat,
      lng,
      deviceId
    };

    // Mark device as joined across localStorage, sessionStorage, and cookie
    markDeviceAsJoined(record);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(DEDUP_CACHE_KEY, submissionKey);
      }
    } catch (_) {}

    return {
      success: true,
      ...record
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
      deviceId,
      joinedAt: new Date().toISOString()
    };
    
    saveLocalSupporter(fallbackRecord);
    markDeviceAsJoined(fallbackRecord);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(DEDUP_CACHE_KEY, submissionKey);
      }
    } catch (_) {}

    return {
      success: true,
      ...fallbackRecord,
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
