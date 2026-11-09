/**
 * PURE UTILITY FUNCTIONS FOR SANITIZATION & METRICS
 */

/**
 * Sanitize string to prevent XSS and strip control characters
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}

/**
 * Escape HTML for safe interpolation in innerHTML
 */
export function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

/**
 * Calculate unique cities count from supporters array
 */
export function countUniqueCities(supporters) {
  if (!Array.isArray(supporters)) return 0;
  const set = new Set();
  supporters.forEach(s => {
    if (s && s.city && typeof s.city === 'string' && s.city.trim().length > 0) {
      set.add(s.city.trim().toLowerCase());
    }
  });
  return set.size;
}

/**
 * Parse supporter joinedAt value into epoch milliseconds.
 * Supports Firestore Timestamps (.toMillis / .toDate / { seconds, nanoseconds }),
 * Date instances, epoch numbers, and ISO strings.
 * Unresolved local pending writes fall back to Date.now(); missing non-pending
 * timestamps return 0 so legacy records never sort ahead of newer joins.
 */
export function parseJoinedAtMs(rawJoinedAt, options = {}) {
  const hasPendingWrites = Boolean(options && options.hasPendingWrites);

  if (rawJoinedAt === null || rawJoinedAt === undefined || rawJoinedAt === '') {
    return hasPendingWrites ? Date.now() : 0;
  }

  if (typeof rawJoinedAt === 'number') {
    return Number.isFinite(rawJoinedAt) && rawJoinedAt > 0 ? rawJoinedAt : 0;
  }

  if (rawJoinedAt instanceof Date) {
    const ms = rawJoinedAt.getTime();
    return Number.isFinite(ms) && ms > 0 ? ms : 0;
  }

  if (typeof rawJoinedAt === 'string') {
    const ms = Date.parse(rawJoinedAt);
    return Number.isFinite(ms) && ms > 0 ? ms : 0;
  }

  if (typeof rawJoinedAt === 'object') {
    if (typeof rawJoinedAt.toMillis === 'function') {
      const ms = rawJoinedAt.toMillis();
      return Number.isFinite(ms) && ms > 0 ? ms : 0;
    }
    if (typeof rawJoinedAt.toDate === 'function') {
      const d = rawJoinedAt.toDate();
      const ms = d instanceof Date ? d.getTime() : NaN;
      return Number.isFinite(ms) && ms > 0 ? ms : 0;
    }
    const secs = typeof rawJoinedAt.seconds === 'number'
      ? rawJoinedAt.seconds
      : (typeof rawJoinedAt._seconds === 'number' ? rawJoinedAt._seconds : null);
    if (secs !== null && Number.isFinite(secs)) {
      const nanos = typeof rawJoinedAt.nanoseconds === 'number'
        ? rawJoinedAt.nanoseconds
        : (typeof rawJoinedAt._nanoseconds === 'number' ? rawJoinedAt._nanoseconds : 0);
      const ms = secs * 1000 + Math.floor((Number.isFinite(nanos) ? nanos : 0) / 1e6);
      return ms > 0 ? ms : 0;
    }
  }

  return hasPendingWrites ? Date.now() : 0;
}

/**
 * Sort supporters chronologically with the most recent join first.
 */
export function sortSupportersByLatest(supporters = []) {
  if (!Array.isArray(supporters)) return [];
  return [...supporters].sort((a, b) => {
    const bMs = parseJoinedAtMs(b && b.joinedAt);
    const aMs = parseJoinedAtMs(a && a.joinedAt);
    return bMs - aMs;
  });
}

/**
 * Return the chronologically most recent supporter from a list.
 * Falls back to the first valid supporter if no timestamps exist.
 */
export function getLatestSupporter(supporters = []) {
  if (!Array.isArray(supporters) || supporters.length === 0) return null;
  let latestItem = null;
  let latestMs = -1;
  for (let i = 0; i < supporters.length; i++) {
    const item = supporters[i];
    if (!item || typeof item !== 'object') continue;
    const ms = parseJoinedAtMs(item.joinedAt);
    if (ms > latestMs) {
      latestMs = ms;
      latestItem = item;
    }
  }
  return latestItem;
}
