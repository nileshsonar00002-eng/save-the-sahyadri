/**
 * SAVE THE SAHYADRI — MOVEMENT & CONSERVATION STATISTICS
 * Official UNESCO World Heritage verified ecological data & live citizen movement counters.
 */

export function renderMovementCounter(container, stats = {}) {
  const total = typeof stats.total === 'number' ? stats.total : 0;
  const uniqueCities = typeof stats.uniqueCities === 'number' ? stats.uniqueCities : 0;
  const isLive = stats.isLive !== false;
  const isFallback = stats.fallbackMode === true;

  container.innerHTML = `
    <section class="relative py-12 sm:py-16 lg:py-20 bg-[#040C07] border-b border-emerald-500/15 overflow-hidden">
      
      <!-- Subtle Ambient Forest Lighting -->
      <div class="absolute inset-0 bg-radial-gradient pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            ONE MOVEMENT. <span class="text-gradient-emerald">MANY VOICES.</span>
          </h2>
          
          <p class="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Verified ecological metrics from the Sahyadri Western Ghats — an irreplaceable global biodiversity sanctuary whose critical corridors demand urgent protection.
          </p>
        </div>

        <!-- 4 UNESCO Statistic Cards with Visual Reference Images (1 column mobile, 2 tablet, 4 desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          
          <!-- Card 1: 325+ Threatened Species -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#06150E] border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#07190F] transition-all duration-300 text-left group shadow-md flex flex-col justify-between h-full">
            <div class="space-y-3.5">
              <!-- Photo Container -->
              <div class="relative w-full aspect-[16/9] sm:aspect-[5/3] overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-950/60">
                <img 
                  src="/images/unesco/threatened-species.png" 
                  alt="Lion-tailed Macaque - Globally Threatened Species in Western Ghats" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <!-- Stat Number -->
              <div class="font-heading font-black text-3xl sm:text-4xl text-emerald-400 tracking-tight leading-none">
                325+
              </div>

              <!-- Stat Title -->
              <div class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                THREATENED SPECIES
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                Globally threatened species recorded in the Western Ghats, according to UNESCO's listing information.
              </p>
            </div>
          </div>

          <!-- Card 2: 54% Endemic Tree Species -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#06150E] border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#07190F] transition-all duration-300 text-left group shadow-md flex flex-col justify-between h-full">
            <div class="space-y-3.5">
              <!-- Photo Container -->
              <div class="relative w-full aspect-[16/9] sm:aspect-[5/3] overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-950/60">
                <img 
                  src="/images/unesco/endemic-trees.png" 
                  alt="Ancient Rainforest Canopy - Endemic Tree Species in Sahyadri" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <!-- Stat Number -->
              <div class="font-heading font-black text-3xl sm:text-4xl text-emerald-400 tracking-tight leading-none">
                54%
              </div>

              <!-- Stat Title -->
              <div class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                ENDEMIC TREE SPECIES
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                352 of nearly 650 tree species cited by UNESCO's description are endemic.
              </p>
            </div>
          </div>

          <!-- Card 3: 8 Biodiversity Hotspots -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#06150E] border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#07190F] transition-all duration-300 text-left group shadow-md flex flex-col justify-between h-full">
            <div class="space-y-3.5">
              <!-- Photo Container -->
              <div class="relative w-full aspect-[16/9] sm:aspect-[5/3] overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-950/60">
                <img 
                  src="/images/unesco/biodiversity-hotspots.png" 
                  alt="Misty Mountain Forest - World Biodiversity Hotspots" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <!-- Stat Number -->
              <div class="font-heading font-black text-3xl sm:text-4xl text-emerald-400 tracking-tight leading-none">
                8
              </div>

              <!-- Stat Title -->
              <div class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                BIODIVERSITY HOTSPOTS
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                The Western Ghats–Sri Lanka region is recognised as one of the world's eight biodiversity hotspots.
              </p>
            </div>
          </div>

          <!-- Card 4: 2012 UNESCO World Heritage -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#06150E] border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-[#07190F] transition-all duration-300 text-left group shadow-md flex flex-col justify-between h-full">
            <div class="space-y-3.5">
              <!-- Photo Container -->
              <div class="relative w-full aspect-[16/9] sm:aspect-[5/3] overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-950/60">
                <img 
                  src="/images/unesco/unesco-heritage.png" 
                  alt="Western Ghats River Valley Gorge - UNESCO World Heritage Site" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <!-- Stat Number -->
              <div class="font-heading font-black text-3xl sm:text-4xl text-emerald-400 tracking-tight leading-none">
                2012
              </div>

              <!-- Stat Title -->
              <div class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                UNESCO WORLD HERITAGE
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                The Western Ghats property was inscribed on the UNESCO World Heritage List in 2012.
              </p>
            </div>
          </div>

        </div>

        <!-- Official Source Link (Matches reference styling) -->
        <div class="pt-2">
          <a 
            href="https://whc.unesco.org/en/list/1342/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          >
            <span>Source: UNESCO — Western Ghats</span>
            <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  `;
}

/**
 * Animate numbers when new data arrives
 */
export function updateCounterValues(container, total, uniqueCities) {
  const totalEl = container.querySelector('#stat-total-supporters');
  const citiesEl = container.querySelector('#stat-total-cities');

  if (totalEl) totalEl.textContent = Number(total || 0).toLocaleString();
  if (citiesEl) citiesEl.textContent = Number(uniqueCities || 0).toLocaleString();
}
