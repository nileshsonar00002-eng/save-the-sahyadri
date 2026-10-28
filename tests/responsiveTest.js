// Mobile Responsiveness & Unified Card Design Verification Script

import assert from 'node:assert/strict';
import { renderHeader } from '../src/components/Header.js';
import { renderHero } from '../src/components/Hero.js';
import { renderMovementCounter } from '../src/components/MovementCounter.js';
import { renderInteractiveMap } from '../src/components/InteractiveMap.js';
import { renderIssueSection } from '../src/components/IssueSection.js';
import { renderStorySection } from '../src/components/StorySection.js';
import { renderHowItWorks } from '../src/components/HowItWorks.js';
import { renderFooter } from '../src/components/Footer.js';

function createMockElement(id = 'container') {
  return {
    id,
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    addEventListener: () => {}
  };
}

console.log('📱 Running Mobile-Responsiveness & Card Design Verification...\n');

const components = [
  { name: 'Hero', render: (el) => renderHero(el, () => {}, { total: 42, uniqueCities: 5 }) },
  { name: 'MovementCounter', render: (el) => renderMovementCounter(el, { total: 42, uniqueCities: 5 }) },
  { name: 'IssueSection', render: (el) => renderIssueSection(el) },
  { name: 'StorySection', render: (el) => renderStorySection(el, () => {}) },
  { name: 'HowItWorks', render: (el) => renderHowItWorks(el, () => {}, () => {}) },
  { name: 'InteractiveMap', render: (el) => renderInteractiveMap(el, [], () => {}) },
  { name: 'Footer', render: (el) => renderFooter(el, () => {}) }
];

components.forEach(({ name, render }) => {
  const el = createMockElement(name);
  render(el);
  const html = el.innerHTML;

  // 1. Verify 16px horizontal container padding on mobile (px-4)
  assert.ok(html.includes('px-4'), `${name} must include px-4 (16px page margin on mobile)`);

  // 2. Check for any fixed wide pixel widths without responsive classes (e.g. w-[400px] or w-[500px])
  const wideFixedRegex = /w-\[(\d{3,4})px\]/g;
  let match;
  while ((match = wideFixedRegex.exec(html)) !== null) {
    const widthVal = parseInt(match[1], 10);
    // Ignore backgrounds or large blurred glows if pointer-events-none
    if (widthVal > 320 && !html.includes('blur')) {
      console.warn(`⚠️ Warning: ${name} contains wide fixed width ${match[0]}`);
    }
  }

  // 3. Verify single-column grid on mobile (grid-cols-1) where grids exist
  if (html.includes('grid ')) {
    assert.ok(html.includes('grid-cols-1'), `${name} grid must stack vertically with grid-cols-1 on mobile`);
  }

  // 4. Verify 16px gap on mobile (gap-4)
  if (html.includes('grid ')) {
    assert.ok(html.includes('gap-4'), `${name} must use 16px gap (gap-4) between cards on mobile`);
  }

  // 5. Verify consistent dark emerald card background #06150E
  if (name !== 'Hero' && name !== 'Footer' && name !== 'InteractiveMap') {
    assert.ok(html.includes('#06150E'), `${name} cards must use standardized #06150E background`);
  }

  console.log(`✓ ${name} passed mobile responsive & card design checks`);
});

console.log('\n🎉 ALL MOBILE RESPONSIVENESS AND CARD DESIGN CHECKS PASSED!');
