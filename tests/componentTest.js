// Component Smoke Test Suite

import assert from 'node:assert/strict';
import { renderHeader } from '../src/components/Header.js';
import { renderHero } from '../src/components/Hero.js';
import { openMaharashtraFullView, closeMaharashtraFullView } from '../src/components/MaharashtraMap.js';
import { renderMovementCounter } from '../src/components/MovementCounter.js';
import { renderInteractiveMap } from '../src/components/InteractiveMap.js';
import { renderIssueSection } from '../src/components/IssueSection.js';
import { renderStorySection } from '../src/components/StorySection.js';
import { renderHowItWorks } from '../src/components/HowItWorks.js';
import { renderFooter } from '../src/components/Footer.js';

// Mock minimal DOM element
function createMockElement(id = 'container') {
  return {
    id,
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild: () => {},
    setAttribute: () => {},
    getAttribute: () => null,
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false
    },
    addEventListener: () => {}
  };
}

console.log('🧪 Running Component HTML Generation Tests...');

// 1. Header
const headerEl = createMockElement('header-mount');
renderHeader(headerEl, () => {});
assert.ok(headerEl.innerHTML.includes('SAVE THE SAHYADRI'), 'Header must contain brand title');
assert.ok(headerEl.innerHTML.includes('The Issue in Karjat'), 'Header must contain The Issue in Karjat navigation link');
assert.ok(headerEl.innerHTML.includes('I STAND WITH SAHYADRI'), 'Header must contain primary CTA');
console.log('✓ Header component rendered properly');

// 2. Hero
const heroEl = createMockElement('hero-mount');
renderHero(heroEl, () => {}, { total: 108, uniqueCities: 14 });
assert.ok(heroEl.innerHTML.includes('A MOVEMENT FOR OUR NATURAL HERITAGE'), 'Hero must contain eyebrow');
assert.ok(heroEl.innerHTML.includes('THE SAHYADRI'), 'Hero must contain main headline');
assert.ok(heroEl.innerHTML.includes('NEEDS US.'), 'Hero must contain highlight headline');
assert.ok(heroEl.innerHTML.includes('From every corner of India, we can stand together for the future of our forests.'), 'Hero must contain exact supporting text');
assert.ok(heroEl.innerHTML.includes('hero-google-map-target'), 'Hero must contain google map target container');
assert.ok(heroEl.innerHTML.includes('hero-map-fullscreen-btn'), 'Hero must contain fullscreen map button');
assert.ok(heroEl.innerHTML.includes('order-1 lg:order-3'), 'Supporters & Cities badge must be order-1 on mobile and order-3 on desktop');
assert.ok(heroEl.innerHTML.includes('order-2 lg:order-2'), 'Supporting text quote must be order-2 on mobile and desktop');
assert.ok(!heroEl.innerHTML.includes('PEOPLE UNITED FOR SAHYADRI'), 'Hero embedded map must NOT feature live counter card (removed to keep map 100% visible)');
console.log('✓ Hero component rendered properly with clean map and mobile-shifted supporters/cities card');

// 2b. Fullscreen Map Live Counter Card Verification
let appendedOverlay = null;
global.document = {
  createElement: (tag) => {
    const el = createMockElement(tag);
    el.remove = () => { appendedOverlay = null; };
    return el;
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: (id) => (appendedOverlay && appendedOverlay.id === id ? appendedOverlay : null),
  head: {
    appendChild: () => {}
  },
  body: {
    appendChild: (el) => { appendedOverlay = el; },
    classList: { add: () => {}, remove: () => {} }
  }
};
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {}
};

openMaharashtraFullView([{ city: 'Pune', state: 'Maharashtra' }]);
assert.ok(appendedOverlay, 'Fullscreen overlay must be created');
assert.ok(appendedOverlay.innerHTML.includes('PEOPLE UNITED FOR SAHYADRI'), 'Fullscreen map must feature live counter card');
assert.ok(appendedOverlay.innerHTML.includes('MEMBERS JOINED'), 'Fullscreen map must feature MEMBERS JOINED');
assert.ok(appendedOverlay.innerHTML.includes('32,490 TREES AT RISK?'), 'Fullscreen map must feature 32,490 TREES AT RISK? headline');
assert.ok(appendedOverlay.innerHTML.includes('INDIA CONNECTS TO SAVE SAHYADRI.'), 'Fullscreen map must feature INDIA CONNECTS TO SAVE SAHYADRI. headline');
closeMaharashtraFullView();
console.log('✓ Fullscreen Map view properly displays the live counter card and campaign headline in the upper black horizon');

// 3. Movement Counter
const counterEl = createMockElement('counter-mount');
renderMovementCounter(counterEl, { total: 42, uniqueCities: 8, isLive: true });
assert.ok(counterEl.innerHTML.includes('ONE MOVEMENT. <span class="text-gradient-emerald">MANY VOICES.</span>'), 'Counter must contain section title');
assert.ok(counterEl.innerHTML.includes('325+'), 'Counter must feature 325+ threatened species stat');
assert.ok(counterEl.innerHTML.includes('THREATENED SPECIES'), 'Counter must feature THREATENED SPECIES label');
assert.ok(counterEl.innerHTML.includes('54%'), 'Counter must feature 54% endemic tree species stat');
assert.ok(counterEl.innerHTML.includes('ENDEMIC TREE SPECIES'), 'Counter must feature ENDEMIC TREE SPECIES label');
assert.ok(counterEl.innerHTML.includes('BIODIVERSITY HOTSPOTS'), 'Counter must feature BIODIVERSITY HOTSPOTS label');
assert.ok(counterEl.innerHTML.includes('2012'), 'Counter must feature 2012 UNESCO World Heritage inscription year');
assert.ok(counterEl.innerHTML.includes('UNESCO WORLD HERITAGE'), 'Counter must feature UNESCO WORLD HERITAGE label');
assert.ok(counterEl.innerHTML.includes('https://whc.unesco.org/en/list/1342/'), 'Counter must include UNESCO source link');
console.log('✓ Movement Counter rendered properly with UNESCO verified statistics');

// 4. Interactive Map
const mapEl = createMockElement('map-mount');
renderInteractiveMap(mapEl, [], () => {});
assert.ok(mapEl.innerHTML.includes('sahyadri-leaflet-map'), 'Map element must exist');
assert.ok(mapEl.innerHTML.includes('Be The First Voice To Put Your City On The Map'), 'Empty state must exist when 0 supporters');
console.log('✓ Interactive Map rendered properly');

// 5. Issue Section
const issueEl = createMockElement('issue-mount');
renderIssueSection(issueEl);
assert.ok(issueEl.innerHTML.includes('32,490 TREES'), 'Issue must contain 32,490 TREES headline');
assert.ok(issueEl.innerHTML.includes('A reported 32,490 trees were authorised for removal for the Saidongar-I Karjat pumped-storage project.'), 'Must contain factual description');
assert.ok(issueEl.innerHTML.includes('sahyadri-tree-hug.jpg'), 'Must contain person hugging tree image');
assert.ok(issueEl.innerHTML.includes('SAHYADRI RANGE'), 'Must contain responsive SAHYADRI RANGE badge');
assert.ok(issueEl.innerHTML.includes('50–100 YEARS TO GROW.'), 'Must contain emotional headline part 1');
assert.ok(issueEl.innerHTML.includes('JUST MINUTES TO CUT?'), 'Must contain emotional headline part 2');
assert.ok(issueEl.innerHTML.includes('A tree is more than timber. It can be a home for wildlife, part of a living ecosystem, and a legacy for generations to come.'), 'Must contain supporting message');
assert.ok(issueEl.innerHTML.includes('WHAT WE PROTECT TODAY, TOMORROW WILL INHERIT.'), 'Must contain neon green closing statement');
assert.ok(issueEl.innerHTML.includes('Reported figure. The current on-ground status and the age of affected trees require independent confirmation.'), 'Must contain factual disclaimer');
assert.ok(!issueEl.innerHTML.includes('STAGE 01'), 'Technical stage cards must be completely removed');
assert.ok(!issueEl.innerHTML.includes('FELLING STATUS'), 'Felling status card must be completely removed');
console.log('✓ Issue & Fact Card component rendered properly with emotional tree-age editorial layout');

// 6. Story Section
const storyEl = createMockElement('story-mount');
renderStorySection(storyEl, () => {});
assert.ok(storyEl.innerHTML.includes('WHY THE SAHYADRI <span class="text-gradient-emerald">MATTERS</span>'), 'Story must contain header');
assert.ok(storyEl.innerHTML.includes('From sustaining rivers and influencing regional rainfall to sheltering extraordinary biodiversity, the Sahyadri is vital to life across the Western Ghats.'), 'Must contain exact required refined introduction');
assert.ok(storyEl.innerHTML.includes('Water, Rivers & Catchments'), 'Must contain Water, Rivers & Catchments card');
assert.ok(storyEl.innerHTML.includes('Natural & Cultural Heritage'), 'Must contain Natural & Cultural Heritage card');
assert.ok(storyEl.innerHTML.includes('WESTERN GHATS · NATURAL HERITAGE'), 'Must feature updated WESTERN GHATS · NATURAL HERITAGE badge');
assert.ok(storyEl.innerHTML.includes('sahyadri-river.jpg'), 'Must feature Western Ghats river image');
assert.ok(storyEl.innerHTML.includes('sahyadri-heritage-fort.jpg'), 'Must feature Sahyadri heritage fort image');
assert.ok(storyEl.innerHTML.includes('https://whc.unesco.org/en/list/1342/'), 'Must link to official UNESCO source');
assert.ok(storyEl.innerHTML.includes('Protecting nature is not just about today. It is about what we leave behind.'), 'Must contain required pledge quote');
assert.ok(storyEl.innerHTML.includes('STAND FOR THE SAHYADRI'), 'Must contain CTA button');
console.log('✓ Story Section component rendered properly with refined verified facts, banners, and layout');

// 7. How It Works
const howEl = createMockElement('how-mount');
renderHowItWorks(howEl, () => {}, () => {});
assert.ok(howEl.innerHTML.includes('01'), 'Step 1 must exist');
assert.ok(howEl.innerHTML.includes('LEARN'), 'Step 1 must be LEARN');
assert.ok(howEl.innerHTML.includes('02'), 'Step 2 must exist');
assert.ok(howEl.innerHTML.includes('JOIN'), 'Step 2 must be JOIN');
assert.ok(howEl.innerHTML.includes('03'), 'Step 3 must exist');
assert.ok(howEl.innerHTML.includes('SHARE'), 'Step 3 must be SHARE');
console.log('✓ How It Works rendered properly');

// 8. Footer
const footerEl = createMockElement('footer-mount');
renderFooter(footerEl, () => {});
assert.ok(footerEl.innerHTML.includes('SAVE THE SAHYADRI'), 'Footer must contain brand');
assert.ok(footerEl.innerHTML.includes('Official Campaign Disclaimer'), 'Footer must contain disclaimer');
assert.ok(footerEl.innerHTML.includes('Privacy Policy'), 'Footer must have Privacy link');
assert.ok(!footerEl.innerHTML.includes('Terms of Use'), 'Footer must not have Terms link');
assert.ok(!footerEl.innerHTML.includes('Sources & Corrections'), 'Footer must not have Sources link');
assert.ok(!footerEl.innerHTML.includes('Moderation Portal'), 'Footer must not have Moderation portal link');
assert.ok(!footerEl.innerHTML.includes('Data Correction / Removal'), 'Footer must not have Data Removal link');
console.log('✓ Footer component rendered properly with streamlined links');

console.log('\n🎉 ALL COMPONENT SMOKE TESTS PASSED!');
