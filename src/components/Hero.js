/**
 * SAVE THE SAHYADRI — HOMEPAGE HERO WITH REAL ORIGINAL GOOGLE MAPS
 * 
 * - Original Real Google Map loaded with actual natural colors (Terrain / Roadmap / Satellite).
 * - Sahyadri / Karjat central focal hub (18.9102° N, 73.3283° E).
 * - Curved neon blue (#00E5FF) and neon green (#00FF87) connection lines converging on Sahyadri.
 * - Floating stats card: "PEOPLE UNITED FOR SAHYADRI", total count, "LAST JOINED FROM: ...".
 * - "JOIN THE MOVEMENT" CTA pill button.
 * - "Full View ↗" expanding into a full-screen Google Maps overlay.
 */

import { renderHeroMaharashtraMap, openMaharashtraFullView } from './MaharashtraMap.js';

let currentSupportersList = [];
let heroMapContainer = null;
let savedOnJoinClick = null;

export function renderHero(container, onJoinClick, supportersData = {}) {
  const totalCount = typeof supportersData.total === 'number'
    ? supportersData.total
    : (supportersData.supporters ? supportersData.supporters.length : 0);
  const uniqueCities = supportersData.uniqueCities || 0;
  currentSupportersList = supportersData.supporters || [];
  const latestSupporter = currentSupportersList.length > 0 ? currentSupportersList[0] : null;
  const lastJoinedText = latestSupporter
    ? `${latestSupporter.city || 'MUMBAI'}, ${latestSupporter.state || 'MAHARASHTRA'}`.toUpperCase()
    : 'MUMBAI, MAHARASHTRA';
  heroMapContainer = container;
  savedOnJoinClick = onJoinClick;

  container.innerHTML = `
    <section id="hero" class="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-10 sm:py-14 lg:py-20">
      
      <!-- High-Resolution Ancient Sahyadri Heritage Tree Background -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src="/images/sahyadri-tree-hero.jpg" 
          alt="Majestic Sahyadri Forest Heritage Tree" 
          class="w-full h-full object-cover object-center lg:object-[50%_35%] select-none scale-100"
          loading="eager"
          decoding="async"
        />

        <!-- Forest Green Atmosphere & Contrast Overlays: ensures readable text while the majestic tree is clearly visible behind 'THE SAHYADRI NEEDS US' -->
        <!-- 1. Ambient forest tint unifying photo with dark theme without obscuring foliage -->
        <div class="absolute inset-0 bg-[#031309]/30 mix-blend-multiply"></div>

        <!-- 2. Desktop directional gradient: deeper behind text on left, soft and transparent across the tree in center/right -->
        <div class="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#030805]/85 via-[#030805]/45 to-[#030805]/15"></div>

        <!-- 3. Mobile directional gradient: darker top/bottom for text contrast, open in center for tree visibility -->
        <div class="lg:hidden absolute inset-0 bg-gradient-to-b from-[#030805]/80 via-[#030805]/35 to-[#030805]/85"></div>

        <!-- 4. Seamless bottom fade into page background (#030805) -->
        <div class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#030805] via-[#030805]/75 to-transparent"></div>

        <!-- 5. Seamless top fade from navigation bar -->
        <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030805]/80 to-transparent"></div>
      </div>

      <!-- Ambient Deep Forest Gradient & Glow -->
      <div class="absolute inset-0 bg-radial-gradient pointer-events-none z-[1]">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[400px] sm:h-[650px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-950/20 rounded-full blur-[110px] pointer-events-none"></div>
      </div>

      <!-- Subtle background topographic grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#062012_1px,transparent_1px),linear-gradient(to_bottom,#062012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-[2]"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <!-- Mobile Main Headline (Visible ONLY in mobile view, right below menu bar) -->
        <div class="lg:hidden text-center space-y-1 mb-5">
          <h1 class="font-heading font-black text-3xl sm:text-4xl tracking-tight leading-[1.08] text-white">
            THE SAHYADRI <br />
            <span class="text-gradient-emerald">NEEDS US.</span>
          </h1>
        </div>

        <div class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          <!-- Left Column on Desktop / Below Map on Mobile (lg:col-span-5 lg:order-1 order-2) -->
          <div class="w-full lg:col-span-5 lg:order-1 order-2 text-center lg:text-left flex flex-col items-center lg:items-start gap-5 sm:gap-6">
            
            <!-- Desktop Eyebrow Badge & Main Headline (Hidden on mobile because mobile headline is at the top) -->
            <div class="hidden lg:block space-y-4 lg:order-1 w-full">
              <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-emerald-glow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>A MOVEMENT FOR OUR NATURAL HERITAGE</span>
              </div>

              <h1 class="font-heading font-black text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[1.08] text-white">
                THE SAHYADRI <br />
                <span class="text-gradient-emerald">NEEDS US.</span>
              </h1>
            </div>

            <!-- Real Movement Summary Badges (Shifted on mobile: directly below map & Join Movement button; Order-3 on desktop) -->
            <div class="order-1 lg:order-3 inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 p-3 rounded-2xl bg-[#06150E] border border-emerald-500/20 text-xs text-slate-300 backdrop-blur-md">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span class="font-semibold text-white">Karjat & Western Ghats</span>
              </div>
              <span class="hidden sm:inline text-emerald-500/40">•</span>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Supporters: <strong id="hero-supporter-count" class="text-emerald-400 font-bold">${totalCount.toLocaleString('en-IN')}</strong></span>
              </div>
              <span class="hidden sm:inline text-emerald-500/40">•</span>
              <div>
                <span>Cities: <strong id="hero-cities-count" class="text-white font-bold">${uniqueCities}</strong></span>
              </div>
            </div>

            <!-- Supporting Text (Order-2 on both mobile and desktop) -->
            <p class="order-2 lg:order-2 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              “From every corner of India, we can stand together for the future of our forests.”
            </p>

            <!-- Action CTAs (Order-3 on mobile, Order-4 on desktop) -->
            <div class="order-3 lg:order-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1 w-full sm:w-auto">
              <button 
                id="hero-primary-cta" 
                class="w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-extrabold text-base tracking-wide text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-200 shadow-emerald-glow hover:shadow-emerald-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <svg class="w-4 h-4 text-black shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  <path d="m4.14 15 .86-1 2 2 4-4 2 2 3-3 2.14 4" />
                </svg>
                <span>I STAND WITH SAHYADRI</span>
              </button>
            </div>

            <!-- Trust Note (Order-4 on mobile, Order-5 on desktop) -->
            <div class="order-4 lg:order-5 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 pt-1">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>100% Peaceful Awareness • Privacy Protected</span>
            </div>

          </div>

          <!-- Right Column on Desktop / Directly Below Headline on Mobile (lg:col-span-7 lg:order-2 order-1) -->
          <div class="w-full lg:col-span-7 lg:order-2 order-1 relative">
            <div class="relative w-full rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/20 p-2.5 sm:p-4 shadow-xl overflow-hidden group">
              
              <!-- Map Viewport (Default: Authentic Satellite View) -->
              <div class="relative w-full h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#071318] border border-emerald-500/15 map-3d-viewport">
                
                <!-- 3D Horizon Atmosphere Gradient -->
                <div id="hero-map-3d-horizon" class="map-3d-horizon"></div>

                <!-- 1. Real Google Maps Container (Actual Natural Colors) -->
                <div id="hero-google-map-target" class="w-full h-full is-3d"></div>

                <!-- 2. Fallback SVG Map Container (used if offline or waiting) -->
                <div id="hero-map-mount" class="hidden w-full h-full flex items-center justify-center"></div>

                <!-- 3. Loading Indicator -->
                <div id="hero-map-loader" class="absolute inset-0 flex flex-col items-center justify-center bg-[#071318]/90 z-20 transition-opacity">
                  <div class="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-3"></div>
                  <p class="text-xs font-heading font-bold text-emerald-400">Loading Satellite Movement Map...</p>
                  <p class="text-[10px] text-slate-400 mt-0.5 font-mono">Authentic natural colors & neon arcs</p>
                </div>

                <!-- Floating Compact Map Controls (Right Side Corner) -->
                <div class="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-1.5 z-20 pointer-events-auto">
                  <button 
                    id="hero-map-zoom-in"
                    aria-label="Zoom in"
                    title="Zoom In (+)"
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#071318]/90 hover:bg-emerald-900/80 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm active:scale-95"
                  >
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button 
                    id="hero-map-zoom-out"
                    aria-label="Zoom out"
                    title="Zoom Out (−)"
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#071318]/90 hover:bg-emerald-900/80 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm active:scale-95"
                  >
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                    </svg>
                  </button>
                  <button 
                    id="hero-map-fullscreen-btn"
                    aria-label="Full screen view"
                    title="Full Screen View"
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#071318]/90 hover:bg-emerald-900/80 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm active:scale-95"
                  >
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                <!-- Desktop Central Floating Bottom CTA ("JOIN THE MOVEMENT") -->
                <div class="hidden sm:block absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-auto max-w-[90%]">
                  <button 
                    id="hero-map-join-cta"
                    class="hero-map-join-cta px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#09221B]/95 hover:bg-[#0E342A] border-2 border-[#00FF87] hover:border-emerald-300 text-white font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-emerald-glow hover:shadow-emerald-glow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <svg class="w-4 h-4 text-[#00FF87] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                      <path d="m4.14 15 .86-1 2 2 4-4 2 2 3-3 2.14 4" />
                    </svg>
                    <span>JOIN THE MOVEMENT</span>
                  </button>
                </div>

              </div>

              <!-- Mobile Movement Button: Full-width, thumb-friendly tap target -->
              <div class="sm:hidden mt-3">
                <button 
                  id="hero-map-join-cta-mobile"
                  class="hero-map-join-cta w-full min-h-[44px] py-3 rounded-xl bg-[#09221B]/95 hover:bg-[#0E342A] border-2 border-[#00FF87] hover:border-emerald-300 text-white font-heading font-extrabold text-xs tracking-wider uppercase shadow-emerald-glow hover:shadow-emerald-glow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4 text-[#00FF87] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    <path d="m4.14 15 .86-1 2 2 4-4 2 2 3-3 2.14 4" />
                  </svg>
                  <span>JOIN THE MOVEMENT</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  // Attach Primary CTA and Map Join CTAs (both desktop & mobile)
  const primaryCta = container.querySelector('#hero-primary-cta');
  if (primaryCta) {
    primaryCta.addEventListener('click', () => {
      if (onJoinClick) onJoinClick();
    });
  }

  const mapJoinCtas = container.querySelectorAll('.hero-map-join-cta, #hero-map-join-cta');
  mapJoinCtas.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (onJoinClick) onJoinClick();
    });
  });

  // Attach Fullscreen CTA
  const heroFullscreenBtn = container.querySelector('#hero-map-fullscreen-btn');
  if (heroFullscreenBtn) {
    heroFullscreenBtn.addEventListener('click', () => {
      openMaharashtraFullView(currentSupportersList);
    });
  }

  // Render the real Google Map with authentic natural colors
  renderHeroMaharashtraMap(container, currentSupportersList, () => {});
}

/**
 * Hook to update map when new supporters join in real time
 */
export function updateHeroMapSupporters(supporters) {
  currentSupportersList = supporters || [];
  if (heroMapContainer) {
    renderHeroMaharashtraMap(heroMapContainer, currentSupportersList, () => {});
  }
}

// Backward compatibility alias for any existing callers
export const updateHeroGlobeSupporters = updateHeroMapSupporters;
