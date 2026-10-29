/**
 * SAVE THE SAHYADRI — THE 32,490 TREES AT RISK (EDITORIAL FEATURE)
 * Redesigned single-panel editorial feature combining the emotional tree-age concept
 * with forest protection, cinematic imagery, and verified context.
 */

export function renderIssueSection(container) {
  container.innerHTML = `
    <section id="issue" class="relative py-12 sm:py-16 lg:py-20 bg-[#030805]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <!-- Section Header -->
        <div class="relative text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <!-- HEADING -->
          <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            32,490 TREES <span class="text-gradient-emerald">AT RISK</span>
          </h2>
          
          <!-- SHORT FACTUAL DESCRIPTION -->
          <p class="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-sans">
            A reported 32,490 trees were authorised for removal for the Saidongar-I Karjat pumped-storage project.
          </p>
        </div>

        <!-- Cohesive Editorial-Style Panel -->
        <div id="news" class="relative p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/20 text-center space-y-6 sm:space-y-8 overflow-hidden shadow-2xl">
          
          <!-- Ambient Radial Emerald Lighting -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.06)_0,transparent_70%)] pointer-events-none"></div>

          <!-- Wide Cinematic Image of a Majestic Mature Tree in Lush Sahyadri Forest -->
          <div class="relative z-10 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-emerald-500/25 shadow-xl group">
            <div class="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-black/60">
              <img 
                src="/images/sahyadri-tree-hero.jpg" 
                alt="Majestic ancient mature tree standing tall in the lush misty canopy of the Sahyadri Western Ghats" 
                class="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <!-- Cinematic Vignette & Bottom Shadow Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#06150E] via-transparent to-black/30 pointer-events-none"></div>
              
              <!-- Subtle Image Badge -->
              <div class="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030905]/85 backdrop-blur-md text-[10px] sm:text-xs font-bold text-emerald-300 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SAHYADRI ANCIENT CANOPY</span>
              </div>
            </div>
          </div>

          <!-- Emotional Message Block -->
          <div class="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-5">
            
            <!-- Emotional Headline -->
            <div class="space-y-1 sm:space-y-2">
              <div class="font-heading font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                50–100 YEARS TO GROW.
              </div>
              <div class="font-heading font-black text-xl sm:text-3xl lg:text-4xl text-[#00FF87] tracking-tight leading-tight drop-shadow-[0_0_20px_rgba(0,255,135,0.35)]">
                JUST MINUTES TO CUT?
              </div>
            </div>

            <!-- Supporting Message -->
            <p class="text-xs sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-sans">
              A tree is more than timber. It can be a home for wildlife, part of a living ecosystem, and a legacy for generations to come.
            </p>

            <!-- Strong Closing Statement in Neon Green -->
            <div class="pt-2 sm:pt-4">
              <div class="inline-block px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 shadow-[0_0_25px_rgba(0,255,135,0.15)]">
                <span class="font-heading font-extrabold text-xs sm:text-base lg:text-lg text-[#00FF87] tracking-wider uppercase">
                  WHAT WE PROTECT TODAY, TOMORROW WILL INHERIT.
                </span>
              </div>
            </div>

          </div>

          <!-- Readable Factual Disclaimer Footnote -->
          <div class="relative z-10 pt-4 sm:pt-6 border-t border-emerald-500/15 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 max-w-2xl mx-auto text-center leading-normal">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>Reported figure. The current on-ground status and the age of affected trees require independent confirmation.</span>
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
