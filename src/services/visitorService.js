/**
 * SAVE THE SAHYADRI — REAL-TIME VISITOR TRACKER SERVICE
 * 
 * Tracks anonymous unique session visitors in Firebase Firestore (`stats/savesahyadri`)
 * and provides real-time live synchronization across all connected clients.
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.js';

const STATS_COLLECTION = 'stats';
const STATS_DOC = 'savesahyadri';
const SESSION_KEY = 'sahyadri_session_visited';
const LOCAL_STORAGE_VISITOR_KEY = 'sahyadri_cached_visitors';

/**
 * Record a visit once per browser session
 */
export async function trackVisitor() {
  if (typeof window === 'undefined') return;

  try {
    let hasVisited = false;
    try {
      hasVisited = sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch (_) {}

    if (!hasVisited) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch (_) {}

      const docRef = doc(db, STATS_COLLECTION, STATS_DOC);
      const snap = await getDoc(docRef);

      if (!snap.exists()) {
        await setDoc(docRef, {
          totalVisitors: 1,
          lastVisitedAt: serverTimestamp(),
          site: 'savesahyadri.online'
        }, { merge: true });
      } else {
        await updateDoc(docRef, {
          totalVisitors: increment(1),
          lastVisitedAt: serverTimestamp()
        });
      }
    }
  } catch (err) {
    console.warn('[VisitorService] Track notice:', err.message);
  }
}

/**
 * Real-time listener for visitor count
 * @param {Function} onUpdate Callback when visitor count changes
 * @returns {Function} Unsubscribe function
 */
export function subscribeToVisitorCount(onUpdate) {
  let cachedCount = 1;
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY);
      if (stored) cachedCount = parseInt(stored, 10) || 1;
    }
  } catch (_) {}

  // Immediately invoke with cached value
  onUpdate(cachedCount);

  try {
    const docRef = doc(db, STATS_COLLECTION, STATS_DOC);

    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const count = typeof data.totalVisitors === 'number' ? data.totalVisitors : cachedCount;
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(LOCAL_STORAGE_VISITOR_KEY, count.toString());
            }
          } catch (_) {}
          onUpdate(count);
        } else {
          onUpdate(cachedCount);
        }
      },
      (error) => {
        console.warn('[VisitorService] Sync notice:', error.message);
        onUpdate(cachedCount);
      }
    );
  } catch (err) {
    console.warn('[VisitorService] Listener init notice:', err.message);
    onUpdate(cachedCount);
    return () => {};
  }
}
