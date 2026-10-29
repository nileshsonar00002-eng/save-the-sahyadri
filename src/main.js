// SAVE THE SAHYADRI — MAIN APPLICATION ENTRYPOINT

import './style.css';
import { renderHeader } from './components/Header';
import { renderHero, updateHeroMapSupporters } from './components/Hero';
import { renderMovementCounter, updateCounterValues } from './components/MovementCounter';
import { renderIssueSection, openNewsSection, closeNewsSection, toggleNewsSection } from './components/IssueSection';
import { renderStorySection } from './components/StorySection';
import { renderFooter } from './components/Footer';
import { openJoinModal } from './components/JoinModal';
import { openShareCardModal } from './components/ShareCardModal';
import { subscribeToSupporters } from './services/supporterService';
import { initNatureAnimations } from './utils/natureAnimations';

class SahyadriApp {
  constructor() {
    this.appEl = document.getElementById('app');
    this.currentSupportersData = {
      supporters: [],
      total: 0,
      uniqueCities: 0,
      isLive: false
    };
    this.unsubscribeSupporters = null;
    this.activeAdminApp = null;
  }

  init() {
    // Check initial route
    this.handleRoute();

    // Listen to hash changes (for routing to #admin and section anchors)
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  }

  async handleRoute() {
    const hash = window.location.hash;

    // Check if user requested the admin panel
    if (hash === '#admin') {
      this.tearDownWebsite();
      document.title = 'KHADDA Moderation HQ • Admin Panel';
      const { AdminApp } = await import('./adminApp');
      this.activeAdminApp = new AdminApp(this.appEl);
      this.activeAdminApp.init();
      return;
    }

    // Otherwise, render Save the Sahyadri platform
    if (this.activeAdminApp) {
      this.activeAdminApp.destroy();
      this.activeAdminApp = null;
    }

    document.title = 'SAVE THE SAHYADRI 🌿 • Protect Maharashtra\'s Natural Heritage';
    this.renderWebsiteLayout();
  }

  tearDownWebsite() {
    if (this.unsubscribeSupporters) {
      try { this.unsubscribeSupporters(); } catch (_) {}
      this.unsubscribeSupporters = null;
    }
    this.appEl.innerHTML = '';
  }

  renderWebsiteLayout() {
    // Scaffold DOM containers for each section
    this.appEl.innerHTML = `
      <div id="sahyadri-header-mount" class="sticky top-0 z-50 w-full pointer-events-none"></div>
      <main id="sahyadri-main-content" class="flex-1">
        <div id="sahyadri-hero-mount"></div>
        <div id="sahyadri-issue-mount"></div>
        <div id="sahyadri-counter-mount"></div>
        <div id="sahyadri-story-mount"></div>
      </main>
      <div id="sahyadri-footer-mount"></div>
    `;

    const mounts = {
      header: document.getElementById('sahyadri-header-mount'),
      hero: document.getElementById('sahyadri-hero-mount'),
      counter: document.getElementById('sahyadri-counter-mount'),
      issue: document.getElementById('sahyadri-issue-mount'),
      story: document.getElementById('sahyadri-story-mount'),
      footer: document.getElementById('sahyadri-footer-mount')
    };

    const handleOpenJoin = () => {
      openJoinModal((newSupporter) => {
        // Optimistically update map and counts
        this.currentSupportersData.supporters.unshift(newSupporter);
        this.currentSupportersData.total += 1;
        updateCounterValues(
          mounts.counter,
          this.currentSupportersData.total,
          this.currentSupportersData.uniqueCities
        );
        updateHeroMapSupporters(this.currentSupportersData.supporters);
      });
    };

    const handleOpenShare = (supporter) => {
      openShareCardModal(supporter || {
        displayName: 'Concerned Citizen',
        city: 'Maharashtra',
        state: 'India'
      });
    };

    // Global hooks
    window.__sahyadriOpenJoinModal = handleOpenJoin;
    window.__sahyadriOpenShareCard = handleOpenShare;
    window.__sahyadriOpenNewsSection = openNewsSection;
    window.__sahyadriCloseNewsSection = closeNewsSection;
    window.__sahyadriToggleNewsSection = toggleNewsSection;

    // Render static and initial components
    renderHeader(mounts.header, handleOpenJoin);
    renderHero(mounts.hero, handleOpenJoin, this.currentSupportersData);
    renderMovementCounter(mounts.counter, this.currentSupportersData);
    renderIssueSection(mounts.issue);
    renderStorySection(mounts.story, handleOpenJoin);
    renderFooter(mounts.footer, handleOpenJoin);

    // Initialize subtle nature animations & scroll reveals
    initNatureAnimations();

    // Subscribe to real-time Firestore database
    this.unsubscribeSupporters = subscribeToSupporters(
      (data) => {
        this.currentSupportersData = data;

        // Update Counter values
        updateCounterValues(mounts.counter, data.total, data.uniqueCities);

        // Update Hero stats badges
        const heroSupporters = document.getElementById('hero-supporter-count');
        const heroCities = document.getElementById('hero-cities-count');
        if (heroSupporters) {
          heroSupporters.textContent = typeof data.total === 'number' ? data.total.toLocaleString('en-IN') : '0';
        }
        if (heroCities) {
          heroCities.textContent = data.uniqueCities.toString();
        }

        // Update Hero Map Markers and connection arcs dynamically
        updateHeroMapSupporters(data.supporters);
      },
      (error) => {
        console.warn('[App] Realtime backend notice:', error.message);
      }
    );
  }
}

// Bootstrap Application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new SahyadriApp();
    app.init();
  });
} else {
  const app = new SahyadriApp();
  app.init();
}
