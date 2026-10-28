/**
 * SAVE THE SAHYADRI — SHAREABLE SUPPORT CARD GENERATOR
 * High-resolution HTML5 Canvas generator for 1:1 Square and 9:16 Story formats.
 * Web Share API, WhatsApp share, PNG download, and copy link support.
 */

export function openShareCardModal(supporter = {}) {
  closeShareCardModal();

  const displayName = supporter.displayName || 'Citizen Supporter';
  const city = supporter.city || 'India';
  const state = supporter.state || 'Maharashtra';

  const modalContainer = document.createElement('div');
  modalContainer.id = 'sahyadri-share-modal-root';
  modalContainer.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto';

  modalContainer.innerHTML = `
    <!-- Backdrop Blur -->
    <div id="share-modal-backdrop" class="fixed inset-0 bg-black/85 backdrop-blur-md"></div>

    <!-- Modal Dialog (Compact on Mobile) -->
    <div 
      class="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#06150E] border border-emerald-500/25 shadow-2xl p-4 sm:p-8 z-10 space-y-3.5 sm:space-y-6 my-auto text-left transform transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      
      <!-- Close Button -->
      <button 
        id="share-modal-close-btn" 
        aria-label="Close modal" 
        class="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-400 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="space-y-1 pr-8">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] sm:text-xs font-bold border border-emerald-500/30">
          <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 11 18-5v12L3 14v-3z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
          </svg>
          <span>AMPLIFY THE MOVEMENT</span>
        </div>
        <h2 id="share-modal-title" class="font-heading font-black text-xl sm:text-3xl text-white">
          Your Shareable <span class="text-gradient-emerald">Support Card</span>
        </h2>
        <p class="text-[11px] sm:text-sm text-slate-300">
          Download and share this card to inspire friends, family, and communities across India.
        </p>
      </div>

      <!-- Format Switcher: 1:1 Square vs 9:16 Story -->
      <div class="flex items-center gap-2 p-1 bg-[#030805] rounded-xl border border-emerald-500/20 max-w-xs text-xs">
        <button 
          id="btn-format-square" 
          class="flex-1 py-1.5 px-3 rounded-lg font-bold bg-emerald-500 text-black shadow-sm transition-all"
        >
          1:1 Square (Feed)
        </button>
        <button 
          id="btn-format-story" 
          class="flex-1 py-1.5 px-3 rounded-lg font-bold text-slate-400 hover:text-white transition-all"
        >
          9:16 Story
        </button>
      </div>

      <!-- Canvas Preview Wrapper -->
      <div class="relative w-full max-h-[380px] flex items-center justify-center p-3 rounded-2xl bg-[#030905] border border-emerald-500/20 overflow-hidden shadow-inner">
        <canvas id="support-card-canvas" class="max-h-[350px] w-auto h-auto rounded-xl shadow-2xl"></canvas>
      </div>

      <!-- Sharing Action Buttons -->
      <div class="space-y-3 pt-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <!-- Download Button -->
          <button 
            id="btn-download-card" 
            class="py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 shadow-emerald-glow flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download High-Res Card</span>
          </button>

          <!-- WhatsApp Share Button -->
          <button 
            id="btn-whatsapp-share" 
            class="py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9.5 9.5a1.5 1.5 0 0 1 1.8 -.4l1.2 .8a1 1 0 0 1 .3 1.1l-.4 .8a7 7 0 0 0 2.8 2.8l.8 -.4a1 1 0 0 1 1.1 .3l.8 1.2a1.5 1.5 0 0 1 -.4 1.8c-.8 .6 -1.8 .8 -2.7 .4c-2.8 -1.2 -5.2 -3.6 -6.4 -6.4c-.4 -.9 -.2 -1.9 .4 -2.7z" />
            </svg>
            <span>Share on WhatsApp</span>
          </button>

        </div>
      </div>

    </div>
  `;

  document.body.appendChild(modalContainer);
  document.body.classList.add('overflow-hidden');

  const closeBtn = modalContainer.querySelector('#share-modal-close-btn');
  const backdrop = modalContainer.querySelector('#share-modal-backdrop');
  const canvas = modalContainer.querySelector('#support-card-canvas');
  const btnSquare = modalContainer.querySelector('#btn-format-square');
  const btnStory = modalContainer.querySelector('#btn-format-story');
  const btnDownload = modalContainer.querySelector('#btn-download-card');
  const btnWhatsApp = modalContainer.querySelector('#btn-whatsapp-share');

  let currentFormat = 'square'; // 'square' (1080x1080) or 'story' (1080x1920)

  closeBtn.addEventListener('click', closeShareCardModal);
  backdrop.addEventListener('click', closeShareCardModal);

  // ESC key listener
  const onKeyDown = (e) => {
    if (e.key === 'Escape') closeShareCardModal();
  };
  window.addEventListener('keydown', onKeyDown);
  modalContainer._escListener = onKeyDown;

  function renderCard() {
    const isSquare = currentFormat === 'square';
    const width = 1080;
    const height = isSquare ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Deep Forest Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#030805');
    bgGrad.addColorStop(0.35, '#071A0E');
    bgGrad.addColorStop(0.7, '#0C2B18');
    bgGrad.addColorStop(1, '#020704');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ambient Emerald Radial Glow
    const glowGrad = ctx.createRadialGradient(width / 2, height * 0.4, 80, width / 2, height * 0.4, width * 0.7);
    glowGrad.addColorStop(0, 'rgba(0, 255, 135, 0.18)');
    glowGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.05)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Mountain Silhouette Layers
    drawMountainSilhouette(ctx, width, height, isSquare);

    // 4. Subtle Border Frame
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Corner decorative markers
    drawCornerBrackets(ctx, 40, 40, width - 80, height - 80);

    // 5. Header Branding
    const headerY = isSquare ? 160 : 260;
    ctx.textAlign = 'center';
    
    // Leaf Icon
    ctx.font = '64px sans-serif';
    ctx.fillText('🌿', width / 2, headerY - 30);

    // Brand Name
    ctx.font = 'bold 38px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#6EE7B7';
    ctx.letterSpacing = '4px';
    ctx.fillText('SAVE THE SAHYADRI', width / 2, headerY + 40);

    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.letterSpacing = '2px';
    ctx.fillText('MAHARASHTRA WESTERN GHATS INITIATIVE', width / 2, headerY + 80);

    // 6. Main Bold Headline
    const headlineY = isSquare ? 420 : 640;
    ctx.font = '900 76px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.letterSpacing = '-1px';
    ctx.fillText('I STAND WITH', width / 2, headlineY);

    ctx.font = '900 84px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#00FF87';
    ctx.shadowColor = '#00FF87';
    ctx.shadowBlur = 25;
    ctx.fillText('SAHYADRI', width / 2, headlineY + 95);
    ctx.shadowBlur = 0; // reset

    // 7. Supporter Card Box
    const boxY = isSquare ? 630 : 960;
    const boxW = width - 200;
    const boxH = isSquare ? 230 : 280;
    const boxX = (width - boxW) / 2;

    // Box Background
    ctx.fillStyle = 'rgba(4, 15, 8, 0.85)';
    roundRect(ctx, boxX, boxY, boxW, boxH, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Supporter Name
    ctx.font = 'bold 44px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(displayName, width / 2, boxY + 75);

    // City & State
    ctx.font = '600 30px Inter, sans-serif';
    ctx.fillStyle = '#34D399';
    ctx.fillText(`Standing from ${city}, ${state}`, width / 2, boxY + 130);

    // Verified citizen badge
    ctx.font = '500 20px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('✓ Verified Citizen Awareness Supporter', width / 2, boxY + 180);

    // 8. Key Quote & Website URL Footer
    const footerY = isSquare ? 960 : 1650;
    
    if (!isSquare) {
      // Extra Quote for Story format
      ctx.font = 'italic 30px Inter, sans-serif';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText('“Protecting nature is not just about today.', width / 2, footerY - 140);
      ctx.fillText('It is about what we leave behind.”', width / 2, footerY - 95);
    }

    ctx.font = 'bold 30px Outfit, Inter, sans-serif';
    ctx.fillStyle = '#00FF87';
    ctx.letterSpacing = '1px';
    ctx.fillText('Join the movement: savethesahyadri.org', width / 2, footerY);

    ctx.font = '400 18px Inter, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.letterSpacing = '0.5px';
    ctx.fillText('Independent Citizen Public Awareness Movement • Non-commercial', width / 2, footerY + 36);
  }

  // Format Switchers
  btnSquare.addEventListener('click', () => {
    currentFormat = 'square';
    btnSquare.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold bg-emerald-500 text-black shadow-sm transition-all';
    btnStory.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold text-slate-400 hover:text-white transition-all';
    renderCard();
  });

  btnStory.addEventListener('click', () => {
    currentFormat = 'story';
    btnStory.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold bg-emerald-500 text-black shadow-sm transition-all';
    btnSquare.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold text-slate-400 hover:text-white transition-all';
    renderCard();
  });

  // Download Handler
  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `save-the-sahyadri-${displayName.toLowerCase().replace(/\s+/g, '-')}-${currentFormat}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // WhatsApp Handler
  btnWhatsApp.addEventListener('click', () => {
    const text = encodeURIComponent(
      `🌿 I STAND WITH SAHYADRI!\n\n` +
      `I have pledged my support from ${city}, ${state} to protect Maharashtra's Western Ghats and Sahyadri forests.\n\n` +
      `Stand with our rivers, wildlife, and natural heritage. Add your voice to the movement:\n` +
      `👉 ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });

  // Initial Card Render
  renderCard();
}

export function closeShareCardModal() {
  const modal = document.getElementById('sahyadri-share-modal-root');
  if (modal) {
    if (modal._escListener) {
      window.removeEventListener('keydown', modal._escListener);
    }
    modal.remove();
    document.body.classList.remove('overflow-hidden');
  }
}

// Helper to draw mountain silhouette in canvas
function drawMountainSilhouette(ctx, width, height, isSquare) {
  const baseH = isSquare ? height * 0.75 : height * 0.8;

  // Background Ridge
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, baseH - 40);
  ctx.lineTo(width * 0.2, baseH - 140);
  ctx.lineTo(width * 0.45, baseH - 60);
  ctx.lineTo(width * 0.7, baseH - 180);
  ctx.lineTo(width * 0.9, baseH - 80);
  ctx.lineTo(width, baseH - 120);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(7, 28, 16, 0.4)';
  ctx.fill();

  // Foreground Ridge
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, baseH + 40);
  ctx.lineTo(width * 0.28, baseH - 80);
  ctx.lineTo(width * 0.55, baseH + 10);
  ctx.lineTo(width * 0.82, baseH - 90);
  ctx.lineTo(width, baseH - 10);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(4, 16, 9, 0.75)';
  ctx.fill();
}

function drawCornerBrackets(ctx, x, y, w, h) {
  const len = 30;
  ctx.strokeStyle = '#00FF87';
  ctx.lineWidth = 4;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
