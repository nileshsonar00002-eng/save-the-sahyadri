/**
 * SAVE THE SAHYADRI — ISSUE & FACT-CHECK SECTION
 * Redesigned neutral, factual breakdown of the 32,490 trees figure in Karjat.
 */

export function renderIssueSection(container) {
  container.innerHTML = `
    <section id="issue" class="relative py-12 sm:py-16 lg:py-20 bg-[#030805]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <!-- Section Header -->
        <div class="relative text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <!-- HEADING -->
          <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            THE 32,490 TREES <span class="text-gradient-emerald">AT RISK</span>
          </h2>
          
          <!-- INTRODUCTION -->
          <p class="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-sans">
            News reports cite a Forest Department order dated 14 October 2026 authorising the removal of 32,490 trees for the Saidongar-I Karjat pumped-storage project. The latest on-ground status requires confirmation from official sources.
          </p>
        </div>

        <!-- Prominent 32,490 Hero Number & Status Cards Block -->
        <div id="news" class="relative p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/25 text-center space-y-6 sm:space-y-8 overflow-hidden shadow-xl">
          
          <!-- Ambient Radial Emerald Lighting -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.08)_0,transparent_70%)] pointer-events-none"></div>

          <div class="relative z-10 flex flex-col items-center justify-center space-y-2">
            <!-- Subtle Tree Icon -->
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1 shadow-emerald-glow-sm shrink-0">
              <svg class="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V22" />
                <path d="m8 14-4 5h16l-4-5h2l-4-5h2L12 2 8 9h2l-4 5h2z" />
              </svg>
            </div>

            <!-- Large Prominent 32,490 Number -->
            <div class="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none">
              32,490
            </div>

            <div class="text-[11px] sm:text-sm font-bold text-emerald-400 uppercase tracking-widest pt-1">
              REPORTED TREES AUTHORISED FOR REMOVAL
            </div>
          </div>

          <!-- Three Compact Status Cards (Stacked single-column on mobile, 3-column on desktop) -->
          <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left items-stretch">
            
            <!-- Card 1: PROPOSED -->
            <div class="p-4 sm:p-5 rounded-2xl bg-[#07190F] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 shadow-md">
              <div class="space-y-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase font-mono">STAGE 01</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/90 text-slate-300 border border-slate-700">Project Scope</span>
                </div>
                <h3 class="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                  PROPOSED
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-emerald-500/10">
                Trees covered by the project proposal.
              </p>
            </div>

            <!-- Card 2: AUTHORISED -->
            <div class="p-4 sm:p-5 rounded-2xl bg-[#071F11] border-2 border-emerald-400/50 shadow-emerald-glow-sm hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
              <div class="space-y-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[10px] sm:text-[11px] font-bold text-emerald-400 tracking-wider uppercase font-mono">STAGE 02</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-400/50">Official Order</span>
                </div>
                <h3 class="font-heading font-black text-lg sm:text-xl text-emerald-300 tracking-tight flex items-baseline gap-2">
                  <span>AUTHORISED</span>
                  <span class="text-xs sm:text-sm font-bold text-white">(32,490)</span>
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-2 border-t border-emerald-500/20 font-medium">
                32,490 trees, as reported from the Forest Department order.
              </p>
            </div>

            <!-- Card 3: FELLING STATUS -->
            <div class="p-4 sm:p-5 rounded-2xl bg-[#07190F] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 shadow-md">
              <div class="space-y-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[10px] sm:text-[11px] font-bold text-amber-400 tracking-wider uppercase font-mono">STAGE 03</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/30">Ground Scrutiny</span>
                </div>
                <h3 class="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                  FELLING STATUS
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-amber-200/90 leading-relaxed pt-2 border-t border-emerald-500/10">
                Conflicting reports; awaiting official confirmation.
              </p>
            </div>

          </div>

          <!-- Trust & Neutrality Verification Footnote -->
          <div class="relative z-10 pt-2 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>This platform publishes figures strictly as reported in public records, reserving definitive on-ground validation for official Forest Department ground audits.</span>
          </div>

        </div>

        <!-- Regional Ecological Watershed Context -->
        <div class="p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/20 space-y-2.5 shadow-lg">
          <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Regional Watershed Context — Raigad District</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Karjat lies at the vital geological interface between the low-lying Konkan coast and the Western Ghats escarpment. It forms the critical catchment for the <strong>Pej and Ulhas river basins</strong>, adjoining the Matheran Eco-Sensitive Zone. Any large-scale canopy removal directly impacts slope stability and regional water security for millions downstream.
          </p>
        </div>

      </div>
    </section>
  `;

  // Attach event listeners for close buttons (if present)
  const closeTopBtn = container.querySelector('#close-news-top-btn');
  const closeBottomBtn = container.querySelector('#close-news-bottom-btn');

  if (closeTopBtn) closeTopBtn.addEventListener('click', closeNewsSection);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeNewsSection);
}

export function openNewsSection() {
  const mount = document.getElementById('sahyadri-issue-mount');
  if (mount) {
    mount.classList.remove('hidden');
    requestAnimationFrame(() => {
      const issueSection = document.getElementById('issue');
      if (issueSection) {
        issueSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

export function closeNewsSection() {
  const mount = document.getElementById('sahyadri-issue-mount');
  if (mount) {
    mount.classList.add('hidden');
    const header = document.getElementById('sahyadri-header-mount');
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function toggleNewsSection() {
  const mount = document.getElementById('sahyadri-issue-mount');
  if (!mount) return;
  if (mount.classList.contains('hidden')) {
    openNewsSection();
  } else {
    closeNewsSection();
  }
}
