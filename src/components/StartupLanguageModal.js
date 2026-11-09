/**
 * SAVE THE SAHYADRI — STARTUP LANGUAGE SELECTION MODAL
 * Appears smoothly right when the site opens (before the fast preview video starts),
 * letting visitors choose मराठी, हिंदी, or English while background assets,
 * live satellite map, and Firebase data finish loading underneath.
 */

import { getLanguage, setLanguage } from '../utils/i18n.js';

export const STARTUP_LANGUAGE_OPTIONS = [
  {
    code: 'mr',
    icon: 'म',
    nativeName: 'मराठी',
    actionHint: 'मराठीत पुढे पहा'
  },
  {
    code: 'hi',
    icon: 'हिं',
    nativeName: 'हिंदी',
    actionHint: 'हिंदी में आगे देखें'
  },
  {
    code: 'en',
    icon: 'EN',
    nativeName: 'English',
    actionHint: 'Continue in English'
  }
];

let activeDialog = null;
let activeCleanup = null;

/**
 * Closes and cleans up the startup language dialog without invoking continuation callback.
 */
export function closeStartupLanguageModal() {
  if (typeof activeCleanup === 'function') {
    activeCleanup();
    activeCleanup = null;
  }

  const existing = document.getElementById('sahyadri-startup-lang-dialog') || activeDialog;
  if (existing) {
    existing._suppressCallback = true;
    try {
      if (existing.open && typeof existing.close === 'function') {
        existing.close('');
      }
    } catch (_) {}
    if (existing.parentNode) {
      existing.parentNode.removeChild(existing);
    } else if (typeof existing.remove === 'function') {
      existing.remove();
    }
  }
  activeDialog = null;
}

/**
 * Opens native modal <dialog> for language selection before FastPreviewModal starts.
 * @param {Function} onLanguageChosen Called after language choice/dismissal to launch FastPreviewModal.
 */
export function openStartupLanguageModal(onLanguageChosen) {
  closeStartupLanguageModal();

  const currentLang = getLanguage();
  const dialog = document.createElement('dialog');
  dialog.id = 'sahyadri-startup-lang-dialog';
  dialog.className = 'sahyadri-native-dialog select-none';
  dialog.setAttribute('aria-labelledby', 'startup-lang-modal-title');
  dialog._suppressCallback = false;

  const optionsHtml = STARTUP_LANGUAGE_OPTIONS.map((opt) => {
    const isCurrent = opt.code === currentLang;
    const cardStateClasses = isCurrent
      ? 'border-emerald-400/70 bg-emerald-500/15 shadow-[0_0_20px_rgba(0,255,135,0.16)]'
      : 'border-emerald-500/25 bg-[#04120A]/90 hover:border-emerald-400/55 hover:bg-emerald-950/75';
    const badgeStateClasses = isCurrent
      ? 'bg-emerald-400/25 text-[#00FF87] border-emerald-400/60'
      : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/35 group-hover:text-[#00FF87] group-hover:border-emerald-400/50';

    return `
      <button
        type="button"
        data-startup-lang="${opt.code}"
        ${isCurrent ? 'autofocus' : ''}
        aria-label="${opt.nativeName} — ${opt.actionHint}"
        class="startup-lang-btn group w-full flex items-center justify-between gap-3 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87] active:scale-[0.985] ${cardStateClasses}"
      >
        <div class="flex items-center gap-3 min-w-0">
          <span class="w-10 h-10 rounded-xl border flex items-center justify-center font-heading font-black text-sm tracking-wide shrink-0 transition-colors ${badgeStateClasses}">
            ${opt.icon}
          </span>
          <div class="min-w-0">
            <div class="font-heading font-extrabold text-base sm:text-lg text-white leading-tight group-hover:text-[#00FF87] transition-colors">
              ${opt.nativeName}
            </div>
            <div class="text-[11px] sm:text-xs text-slate-400 leading-snug mt-0.5">
              ${opt.actionHint}
            </div>
          </div>
        </div>
        <span class="text-emerald-400/80 group-hover:text-[#00FF87] group-hover:translate-x-0.5 transition-all text-base font-bold shrink-0" aria-hidden="true">→</span>
      </button>
    `;
  }).join('');

  dialog.innerHTML = `
    <div class="relative w-full rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/35 shadow-2xl shadow-emerald-950/70 p-5 sm:p-7 text-center overflow-hidden animate-fadeIn">
      <!-- Subtle Tree Atmosphere Matching Brand Design -->
      <div class="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/sahyadri-tree-hero.jpg"
          alt=""
          class="w-full h-full object-cover object-center opacity-15 transform scale-105 filter brightness-95 contrast-125"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#06150E]/85 via-[#06150E]/92 to-[#06150E]/98"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16)_0%,transparent_70%)]"></div>
        <div class="absolute inset-0 ring-1 ring-inset ring-emerald-500/20 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
      </div>

      <!-- Native Accessible Close Control -->
      <button
        type="button"
        id="startup-lang-close-btn"
        aria-label="Close language selector"
        title="Continue (${currentLang.toUpperCase()})"
        class="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/30 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        ✕
      </button>

      <div class="relative z-10 space-y-4">
        <!-- Brand Header -->
        <div class="flex flex-col items-center space-y-2 pt-1">
          <div class="w-11 h-11 rounded-full overflow-hidden bg-[#05392e] border border-emerald-400/50 shadow-emerald-glow-sm flex items-center justify-center">
            <img src="/images/logo.png" alt="Save the Sahyadri Logo" class="w-full h-full object-cover" loading="eager" />
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-[10px] font-bold tracking-widest uppercase text-emerald-400">
            <span class="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse"></span>
            <span>SAVE THE SAHYADRI</span>
          </div>
          <h2 id="startup-lang-modal-title" class="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
            Select Your Language
          </h2>
          <p class="text-xs sm:text-[13px] text-slate-300 font-medium">
            तुमची भाषा निवडा <span class="text-emerald-500/70 mx-1">•</span> अपनी भाषा चुनें
          </p>
        </div>

        <!-- Language Option Cards -->
        <div class="space-y-2.5 pt-1">
          ${optionsHtml}
        </div>

        <!-- Subtle Background Readiness Note -->
        <div class="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse"></span>
          <span>म • हिं • EN</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);
  activeDialog = dialog;

  let isFinalized = false;
  let isClosing = false;

  const finalize = (selectedLang) => {
    if (isFinalized) return;
    isFinalized = true;

    const suppressed = Boolean(dialog._suppressCallback);
    if (activeDialog === dialog) {
      activeDialog = null;
    }
    activeCleanup = null;

    if (dialog.parentNode) {
      dialog.parentNode.removeChild(dialog);
    } else if (typeof dialog.remove === 'function') {
      dialog.remove();
    }

    if (!suppressed && typeof onLanguageChosen === 'function') {
      onLanguageChosen(selectedLang || getLanguage());
    }
  };

  const handleNativeClose = () => {
    const returnVal = dialog.returnValue || '';
    dialog.returnValue = '';
    finalize(returnVal || getLanguage());
  };

  if (typeof dialog.addEventListener === 'function') {
    dialog.addEventListener('close', handleNativeClose);
  }
  activeCleanup = () => {
    if (typeof dialog.removeEventListener === 'function') {
      dialog.removeEventListener('close', handleNativeClose);
    }
  };

  const triggerClose = (returnVal = '') => {
    if (isClosing || isFinalized) return;
    isClosing = true;

    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close(returnVal);
    } else {
      finalize(returnVal || getLanguage());
    }
  };

  // Language Option Click Handlers
  const langButtons = dialog.querySelectorAll('.startup-lang-btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = btn.getAttribute('data-startup-lang');
      if (chosen) {
        setLanguage(chosen);
      }
      triggerClose(chosen || getLanguage());
    });
  });

  // Close Button (proceeds with current/detected language)
  const closeBtn = dialog.querySelector('#startup-lang-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      triggerClose(getLanguage());
    });
  }

  // Open as native top-layer modal when supported (with graceful fallback in non-browser tests)
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
}
