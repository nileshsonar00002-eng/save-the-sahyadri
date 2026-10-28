/**
 * SAVE THE SAHYADRI — WHY THE SAHYADRI MATTERS
 * Refined ecological pillars highlighting hydrology, biodiversity, and cultural heritage
 * with verified facts, elegant landscape banners, and responsive equal-height cards.
 */

import { SAHYADRI_PILLARS } from '../data/sahyadriData.js';

export function renderStorySection(container, onJoinClick) {
  // Focus on the core pillars: Water, Rivers & Catchments and Natural & Cultural Heritage
  const activePillars = SAHYADRI_PILLARS.slice(2);
  
  const pillarCardsHtml = activePillars.map((pillar) => {
    let iconSvg = '';
    if (pillar.icon === 'droplet') {
      // Lucide Droplet line icon
      iconSvg = `
        <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
      `;
    } else {
      // Lucide Mountain line icon
      iconSvg = `
        <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          <path d="m4.14 15 .86-1 2 2 4-4 2 2 3-3 2.14 4" />
        </svg>
      `;
    }

    const imageSrc = pillar.image || (pillar.id === 'pillar-water' ? '/images/story/sahyadri-river.jpg' : '/images/story/sahyadri-heritage-fort.jpg');

    return `
      <div class="group relative rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl overflow-hidden hover:-translate-y-0.5">
        
        <!-- Top Landscape Image Banner -->
        <div class="relative w-full h-44 sm:h-52 overflow-hidden bg-emerald-950/40 border-b border-emerald-500/15">
          <img 
            src="${imageSrc}" 
            alt="${pillar.title}" 
            class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
            loading="lazy" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#06150E] via-[#06150E]/30 to-transparent"></div>
          
          <!-- Icon Floating Badge -->
          <div class="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/70 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            ${iconSvg}
          </div>

          <!-- Tagline Pill on Bottom -->
          <div class="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 flex items-center justify-between">
            <span class="text-[10px] sm:text-[11px] font-mono font-semibold text-emerald-300 tracking-wider uppercase bg-[#041209]/90 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm truncate">
              ${pillar.tagline}
            </span>
          </div>
        </div>

        <!-- Card Body (16px padding on mobile: p-4, 24px on desktop: sm:p-6 lg:p-7) -->
        <div class="p-4 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
          <div class="space-y-2.5 sm:space-y-3">
            <h3 class="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-emerald-300 transition-colors tracking-tight">
              ${pillar.title}
            </h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              ${pillar.description}
            </p>
          </div>

          <!-- 3 Concise Verified Facts with Green Check Icons -->
          <div class="space-y-2 pt-3 sm:pt-4 border-t border-emerald-500/15">
            <div class="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              KEY ECOLOGICAL ATTRIBUTES
            </div>
            <ul class="space-y-2">
              ${pillar.keyPoints.map(kp => `
                <li class="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                  <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-400 font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>${kp}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Card Footer with Accurate Natural Heritage Badge and Source Link -->
          <div class="pt-3 sm:pt-4 border-t border-emerald-500/15 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono">
            <span class="text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              WESTERN GHATS · NATURAL HERITAGE
            </span>
            <a 
              href="${pillar.sourceUrl || 'https://whc.unesco.org/en/list/1342/'}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
              title="Official UNESCO World Heritage documentation"
            >
              <span>Source: UNESCO WHC</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    `;
  }).join('');

  container.innerHTML = `
    <section id="story" class="relative py-12 sm:py-16 lg:py-20 bg-[#030805] overflow-hidden">
      
      <!-- Subtle Western Ghats Forest & Mountain Background Accent with Dark Overlay -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img 
          src="/images/story/sahyadri-heritage-fort.jpg" 
          alt="" 
          class="w-full h-full object-cover object-center opacity-[0.06] filter blur-[2px] scale-105" 
          loading="lazy" 
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#030805] via-[#041208]/95 to-[#030805]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(16,185,129,0.08),transparent_80%)]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <!-- Hero Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
            <span>ECOLOGICAL SIGNIFICANCE</span>
          </div>

          <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            WHY THE SAHYADRI <span class="text-gradient-emerald">MATTERS</span>
          </h2>

          <p class="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
            From sustaining rivers and influencing regional rainfall to sheltering extraordinary biodiversity, the Sahyadri is vital to life across the Western Ghats.
          </p>
        </div>

        <!-- 2 Visually Balanced Responsive Cards (1 column mobile, 2 column desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          ${pillarCardsHtml}
        </div>

        <!-- Full-Width Atmospheric Visual Banner with Pledge Quote -->
        <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-500/25 shadow-xl bg-gradient-to-r from-[#030905] via-[#081B10] to-[#030905] min-h-[300px] sm:min-h-[360px] flex items-center justify-center p-6 sm:p-10 lg:p-14 text-center">
          
          <!-- Forest / Mountain Background Overlay Pattern -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0,transparent_75%)] pointer-events-none"></div>
          
          <!-- Silhouette Mountain Skyline in SVG -->
          <svg class="absolute bottom-0 left-0 right-0 w-full h-32 text-emerald-950/40 pointer-events-none" viewBox="0 0 1200 240" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,240 L0,180 L140,80 L280,160 L420,60 L580,150 L750,40 L900,140 L1040,70 L1200,160 L1200,240 Z" opacity="0.4"/>
            <path d="M0,240 L0,190 L180,120 L350,170 L520,90 L700,160 L880,100 L1050,150 L1200,180 L1200,240 Z" opacity="0.7"/>
          </svg>

          <div class="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
            <div class="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shadow-emerald-glow">
              <svg class="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                <path d="m4.14 15 .86-1 2 2 4-4 2 2 3-3 2.14 4" />
              </svg>
            </div>
            
            <blockquote class="font-heading font-extrabold text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
              “Protecting nature is not just about today. It is about what we leave behind.”
            </blockquote>

            <p class="text-xs sm:text-base text-slate-300 font-medium">
              Join thousands of conscious citizens taking a stand for Maharashtra’s natural heritage.
            </p>

            <div class="pt-2">
              <button 
                id="story-stand-btn" 
                class="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full font-heading font-extrabold text-sm sm:text-base text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-200 shadow-emerald-glow hover:shadow-emerald-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 min-h-[44px]"
              >
                STAND FOR THE SAHYADRI
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;

  const standBtn = container.querySelector('#story-stand-btn');
  if (standBtn) {
    standBtn.addEventListener('click', () => {
      if (onJoinClick) onJoinClick();
    });
  }
}
