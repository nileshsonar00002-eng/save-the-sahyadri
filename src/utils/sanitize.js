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
