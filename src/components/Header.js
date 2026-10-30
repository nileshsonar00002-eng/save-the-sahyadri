/**
 * SAVE THE SAHYADRI — COMPACT & UNIQUE FLOATING NAVIGATION HEADER
 * 
 * - Streamlined & Unique: Floating pill glassmorphic navbar with emerald glow.
 * - Removed: "home", "issue", "explore map", "how it works" as requested.
 * - Added: Direct WhatsApp Share button with pre-filled movement message.
 * - Primary Action: "I STAND WITH SAHYADRI" pledge button.
 */

export function renderHeader(container, onJoinClick) {
  const getShareUrl = () => {
    const siteUrl = (typeof window !== 'undefined' && window.location)
      ? (window.location.origin + window.location.pathname)
      : 'https://savethesahyadri.org/';

    const text = `💔🌳 *सह्याद्री के जंगलों पर संकट है… क्या हम चुप रहेंगे?*

महाराष्ट्र के कर्जत में 32,490 पेड़ों को हटाने की खबर ने हर प्रकृति प्रेमी को सोचने पर मजबूर कर दिया है। 💔

ये सिर्फ पेड़ों की गिनती नहीं है…
🌳 ये किसी पक्षी का घर है।
🐾 ये बेज़ुबान जानवरों का आशियाना है।
💧 ये हमारी नदियों और पानी के भविष्य का सवाल है।
🌱 और ये हमारी आने वाली पीढ़ियों की विरासत है।

🙏 *विकास ज़रूरी है, लेकिन प्रकृति की कीमत पर हर फैसला सवालों से परे नहीं हो सकता।* 💚

🌿 *Save the Sahyadri*
🤝 आइए, जागरूकता फैलाएँ। इस आवाज़ को और लोगों तक पहुँचाएँ।

💚 *मैं सह्याद्री के साथ खड़ा हूँ… क्या आप भी?*
🌐 हमारी मुहिम से जुड़ें:
${siteUrl}

📢 *इस संदेश को शेयर करें। सह्याद्री की आवाज़ दूर तक पहुँचनी चाहिए।*`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  container.innerHTML = `
    <header class="sticky top-0 z-50 w-full transition-all duration-300 pt-1.5 sm:pt-3.5 px-2 sm:px-6 pointer-events-none">
      <div class="pointer-events-auto max-w-6xl mx-auto rounded-full bg-[#030905]/90 backdrop-blur-xl border border-emerald-500/25 px-2.5 sm:px-6 py-1.5 sm:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.75)] flex items-center justify-between transition-all">
        
        <!-- Brand Identity -->
        <a href="#hero" class="flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full py-0.5 pr-1 sm:pr-2">
          <div class="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-[#05392e] border border-emerald-500/40 flex items-center justify-center shadow-emerald-glow-sm group-hover:border-emerald-300 transition-all duration-300 shrink-0">
            <img 
              src="/images/logo.png" 
              alt="Save the Sahyadri Logo" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="font-heading font-black text-xs sm:text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
              SAVE THE SAHYADRI
            </span>
            <span class="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Movement
            </span>
          </div>
        </a>

        <!-- Compact Navigation Links (Only key curated links) -->
        <nav class="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Main navigation">
          <a href="#story" class="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors rounded-full hover:bg-emerald-950/40 focus-visible:ring-2 focus-visible:ring-emerald-400">
            Why Sahyadri
          </a>
          <a id="nav-news-link" href="#news" class="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors rounded-full hover:bg-emerald-950/40 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer">
            The Issue in Karjat
          </a>
        </nav>

        <!-- Right Action Buttons (Thin-Outline WhatsApp Share Icon + Compact JOIN CTA) -->
        <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          <!-- Direct WhatsApp Share Button (Mobile: Icon only with thin outline; Desktop: Icon + Text) -->
          <a 
            id="header-whatsapp-btn"
            href="${getShareUrl()}"
            target="_blank"
            rel="noopener noreferrer"
            title="Share Movement on WhatsApp"
            aria-label="Share on WhatsApp"
            class="w-7 h-7 sm:w-auto sm:px-3 sm:py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 hover:border-[#25D366] transition-all shadow-[0_0_10px_rgba(37,211,102,0.15)] flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] shrink-0"
          >
            <!-- Thin-line / Outline WhatsApp Icon (Patli rekha) -->
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9.5 9.5a1.5 1.5 0 0 1 1.8 -.4l1.2 .8a1 1 0 0 1 .3 1.1l-.4 .8a7 7 0 0 0 2.8 2.8l.8 -.4a1 1 0 0 1 1.1 .3l.8 1.2a1.5 1.5 0 0 1 -.4 1.8c-.8 .6 -1.8 .8 -2.7 .4c-2.8 -1.2 -5.2 -3.6 -6.4 -6.4c-.4 -.9 -.2 -1.9 .4 -2.7z" />
            </svg>
            <span class="hidden sm:inline text-xs font-bold text-white">Share</span>
          </a>

          <!-- Primary CTA Button (Mobile: Compact 'JOIN' without leaf icon; Desktop: 'I STAND WITH SAHYADRI') -->
          <button 
            id="header-join-btn" 
            aria-label="I STAND WITH SAHYADRI - JOIN"
            title="Join the movement"
            class="btn-nature-cta inline-flex items-center justify-center px-2.5 sm:px-5 py-1 sm:py-2 rounded-full font-heading font-black text-[11px] sm:text-sm tracking-wider uppercase text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-200 shadow-emerald-glow hover:shadow-emerald-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
          >
            <span class="hidden sm:inline">I STAND WITH SAHYADRI</span>
            <span class="sm:hidden font-black">JOIN</span>
          </button>

          <!-- Mobile Hamburger Toggle (for small screens) -->
          <button 
            id="mobile-menu-toggle" 
            aria-label="Toggle Navigation Menu" 
            aria-expanded="false" 
            class="md:hidden w-7 h-7 flex items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500/20 text-slate-300 hover:text-emerald-400 focus:outline-none shrink-0"
          >
            <svg id="hamburger-icon" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="close-icon" class="w-4 h-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

      </div>

      <!-- Mobile Dropdown Panel -->
      <div id="mobile-nav-drawer" class="pointer-events-auto hidden md:hidden max-w-6xl mx-auto mt-2 rounded-2xl border border-emerald-500/20 bg-[#050e08]/98 backdrop-blur-xl p-3 space-y-2 shadow-2xl transition-all">
        <a href="#story" class="mobile-nav-link block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors">
          Why Sahyadri Matters
        </a>
        <a id="mobile-nav-news-link" href="#news" class="mobile-nav-link block px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors cursor-pointer">
          The Issue in Karjat
        </a>
        
        <div class="pt-2 border-t border-emerald-500/15 flex flex-col gap-2">
          <a 
            href="${getShareUrl()}"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9.5 9.5a1.5 1.5 0 0 1 1.8 -.4l1.2 .8a1 1 0 0 1 .3 1.1l-.4 .8a7 7 0 0 0 2.8 2.8l.8 -.4a1 1 0 0 1 1.1 .3l.8 1.2a1.5 1.5 0 0 1 -.4 1.8c-.8 .6 -1.8 .8 -2.7 .4c-2.8 -1.2 -5.2 -3.6 -6.4 -6.4c-.4 -.9 -.2 -1.9 .4 -2.7z" />
            </svg>
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  `;

  // Event handlers
  const headerJoinBtn = container.querySelector('#header-join-btn');
  const menuToggle = container.querySelector('#mobile-menu-toggle');
  const mobileDrawer = container.querySelector('#mobile-nav-drawer');
  const hamburgerIcon = container.querySelector('#hamburger-icon');
  const closeIcon = container.querySelector('#close-icon');

  const openJoin = () => {
    closeMobileMenu();
    if (onJoinClick) onJoinClick();
  };

  if (headerJoinBtn) headerJoinBtn.addEventListener('click', openJoin);

  function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.remove('hidden');
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  }

  function closeMobileMenu() {
    if (!menuToggle) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    if (mobileDrawer) mobileDrawer.classList.add('hidden');
    if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile drawer on link click
  container.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // News menu handlers (opens the hidden news section & scrolls)
  const navNewsLink = container.querySelector('#nav-news-link');
  const mobileNavNewsLink = container.querySelector('#mobile-nav-news-link');

  const onNewsClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    if (window.__sahyadriOpenNewsSection) {
      window.__sahyadriOpenNewsSection();
    }
  };

  if (navNewsLink) navNewsLink.addEventListener('click', onNewsClick);
  if (mobileNavNewsLink) mobileNavNewsLink.addEventListener('click', onNewsClick);
}
