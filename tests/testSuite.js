// Automated Unit & Integration Test Suite for SAVE THE SAHYADRI

import assert from 'node:assert/strict';
import {
  SAHYADRI_HUB,
  SAHYADRI_CORRIDOR_COORDS,
  INDIAN_CITIES_GEO,
  INDIAN_STATES,
  SAHYADRI_PILLARS,
  findCityGeo
} from '../src/data/sahyadriData.js';
import {
  KARJAT_FACT_CARD,
  NEWS_REPORTS,
  OFFICIAL_DOCUMENTS_GUIDE
} from '../src/data/newsData.js';
import {
  sanitizeInput,
  countUniqueCities
} from '../src/utils/sanitize.js';

console.log('🧪 Starting SAVE THE SAHYADRI Test Suite...\n');

// 1. Geographic & Corridor Tests
console.log('Test 1: Validating Sahyadri Geographic Hub & Corridor');
assert.equal(SAHYADRI_HUB.lat, 18.9183, 'Hub latitude must match Karjat 18.9183');
assert.equal(SAHYADRI_HUB.lng, 73.4370, 'Hub longitude must match Karjat 73.4370');
assert.ok(SAHYADRI_CORRIDOR_COORDS.length >= 10, 'Must have at least 10 verified corridor coordinates');
SAHYADRI_CORRIDOR_COORDS.forEach(coord => {
  assert.ok(coord.lat >= 15.0 && coord.lat <= 22.0, `Corridor latitude ${coord.lat} in Maharashtra Western Ghats`);
  assert.ok(coord.lng >= 72.0 && coord.lng <= 76.0, `Corridor longitude ${coord.lng} in Maharashtra Western Ghats`);
});
console.log('✓ Sahyadri corridor coordinates geographically valid\n');

// 2. City Geocoding & Privacy Centroid Tests
console.log('Test 2: City Centroid & Privacy-Preserving Geocoding');
const mumbaiGeo = findCityGeo('Mumbai', 'Maharashtra');
assert.ok(mumbaiGeo, 'Must resolve Mumbai');
assert.equal(mumbaiGeo.city, 'Mumbai');
assert.ok(Math.abs(mumbaiGeo.lat - 19.076) < 0.01);

const puneGeo = findCityGeo('Pune', 'Maharashtra');
assert.ok(puneGeo, 'Must resolve Pune');
assert.equal(puneGeo.city, 'Pune');

const delhiGeo = findCityGeo('New Delhi', 'Delhi');
assert.ok(delhiGeo, 'Must resolve New Delhi');

const fuzzyGeo = findCityGeo('pune city', 'Maharashtra');
assert.ok(fuzzyGeo, 'Must fuzzy match "pune city" to Pune');

// Test obscure city fallback (maps safely to regional centroid, never crashes)
const fallbackGeo = findCityGeo('UnknownVillage123', 'Maharashtra');
assert.ok(fallbackGeo && typeof fallbackGeo.lat === 'number', 'Fallback must return valid centroid coordinates');
console.log('✓ City centroid and privacy protection verified\n');

// 3. Editorial & Karjat 32,490 Trees Requirement Tests
console.log('Test 3: Editorial Factual Integrity & 32,490 Trees Card');
assert.equal(KARJAT_FACT_CARD.reportedFigure, '32,490');
assert.equal(KARJAT_FACT_CARD.statusBadge, 'Reported — verification pending');
const expectedQuote = "News reports have cited a figure of 32,490 trees proposed or authorised for removal in connection with a project in the Karjat region. The original official order and the current cumulative number of trees felled must be independently verified.";
assert.equal(KARJAT_FACT_CARD.officialClarification, expectedQuote, 'Fact card must contain exact required neutral wording');
assert.equal(KARJAT_FACT_CARD.distinctions.length, 5, 'Must contain all 5 essential verification classifications');
console.log('✓ Fact card and 5 distinct categories verified\n');

// 4. News Reports Integrity Tests
console.log('Test 4: News Reports & Citations');
assert.ok(NEWS_REPORTS.length >= 3, 'Must have at least 3 curated news reports');
NEWS_REPORTS.forEach(rep => {
  assert.ok(rep.headline && rep.headline.length > 10, 'Report must have valid headline');
  assert.ok(rep.publisher, 'Report must credit publisher');
  assert.ok(rep.publishDate, 'Report must have publication date');
  assert.ok(rep.url && rep.url.startsWith('http'), 'Report must have direct URL link');
  assert.ok(rep.summary, 'Report must have summary');
});
assert.ok(OFFICIAL_DOCUMENTS_GUIDE.length >= 3, 'Must provide official statutory framework guide');
console.log('✓ News reports and citations verified\n');

// 5. Campaign Story Pillars Tests
console.log('Test 5: Campaign Story Pillars');
assert.equal(SAHYADRI_PILLARS.length, 4, 'Must have exactly 4 ecological pillars');
const pillarIds = SAHYADRI_PILLARS.map(p => p.id);
assert.ok(pillarIds.includes('pillar-biodiversity'));
assert.ok(pillarIds.includes('pillar-ecosystems'));
assert.ok(pillarIds.includes('pillar-water'));
assert.ok(pillarIds.includes('pillar-heritage'));
console.log('✓ 4 Campaign story pillars verified\n');

// 6. Security: Input Sanitization Tests
console.log('Test 6: XSS Prevention & Input Sanitization');
const dirtyInput1 = '<script>alert("xss")</script>Aditya';
const clean1 = sanitizeInput(dirtyInput1);
assert.ok(!clean1.includes('<script>'), 'Must strip script tags');
assert.ok(clean1.includes('&lt;script&gt;'));

const dirtyInput2 = 'Pune <img src=x onerror=alert(1)>';
const clean2 = sanitizeInput(dirtyInput2);
assert.ok(!clean2.includes('<img'));

const normalInput = '  Aditya Patil  ';
assert.equal(sanitizeInput(normalInput), 'Aditya Patil');
console.log('✓ Input sanitization verified\n');

// 7. Supporter Aggregation Tests
console.log('Test 7: Supporter Count & Unique Cities Aggregation');
const mockSupporters = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'mumbai', state: 'Maharashtra' }, // case-insensitive check
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: '', state: '' }
];
const cityCount = countUniqueCities(mockSupporters);
assert.equal(cityCount, 3, 'Must count exactly 3 unique cities: Mumbai, Pune, Bengaluru');
console.log('✓ Supporter deduplication and unique city calculation verified\n');

// 8. 3D Earth Globe Coordinates & Geometric Alignment Tests
console.log('Test 8: 3D Earth Globe Coordinate Transformations & Boundaries');
import { latLngToVector3 } from '../src/components/EarthGlobe.js';
import { INDIA_BOUNDARY, WORLD_CONTINENTS } from '../src/data/earthGeoData.js';

const R = 2.0;

// Test North Pole
const northPole = latLngToVector3(90, 0, R);
assert.ok(Math.abs(northPole.x) < 0.0001);
assert.ok(Math.abs(northPole.y - R) < 0.0001, 'North pole Y must equal radius');
assert.ok(Math.abs(northPole.z) < 0.0001);

// Test South Pole
const southPole = latLngToVector3(-90, 0, R);
assert.ok(Math.abs(southPole.x) < 0.0001);
assert.ok(Math.abs(southPole.y - (-R)) < 0.0001, 'South pole Y must equal -radius');
assert.ok(Math.abs(southPole.z) < 0.0001);

// Test Equator Prime Meridian
const equatorPrime = latLngToVector3(0, 0, R);
assert.ok(Math.abs(equatorPrime.length() - R) < 0.0001, 'Magnitude must equal radius');
assert.ok(Math.abs(equatorPrime.y) < 0.0001, 'Equator Y must be 0');

// Test Sahyadri Karjat Focal Target on 3D Globe
const sahyadri3D = latLngToVector3(SAHYADRI_HUB.lat, SAHYADRI_HUB.lng, R);
assert.ok(Math.abs(sahyadri3D.length() - R) < 0.0001, 'Sahyadri 3D vector length must match sphere radius');
assert.ok(sahyadri3D.y > 0, 'Sahyadri must reside in Northern hemisphere (Y > 0)');

// Test 3D Altitude Offset
const sahyadriElevated = latLngToVector3(SAHYADRI_HUB.lat, SAHYADRI_HUB.lng, R, 0.25);
assert.ok(Math.abs(sahyadriElevated.length() - (R + 0.25)) < 0.0001, 'Elevated vector length must match R + altitude');

// Verify India Boundary Polygon
assert.ok(INDIA_BOUNDARY.length >= 30, 'India boundary must have comprehensive vector vertices');
INDIA_BOUNDARY.forEach(pt => {
  assert.ok(pt.lat >= 6.0 && pt.lat <= 38.0, `India boundary lat ${pt.lat} in valid range`);
  assert.ok(pt.lng >= 65.0 && pt.lng <= 99.0, `India boundary lng ${pt.lng} in valid range`);
});

// Verify World Continents
assert.ok(WORLD_CONTINENTS.length >= 3, 'Must define multiple world continent polygons');
console.log('✓ 3D Earth Globe coordinate transformations & geographic boundaries verified\n');

// 9. Maharashtra State Vector Map Geography & Projection Tests
console.log('Test 9: Maharashtra State Map Geography & Projection');
import {
  MAHARASHTRA_BOUNDARY,
  MAHARASHTRA_INTERNAL_DIVISIONS,
  MAHARASHTRA_TARGET,
  projectMaharashtraGeo
} from '../src/data/maharashtraGeoData.js';
import { generateMaharashtraSvgHtml } from '../src/components/MaharashtraMap.js';

// Verify Maharashtra Boundary
assert.ok(MAHARASHTRA_BOUNDARY.length >= 40, 'Maharashtra boundary must have high-fidelity perimeter points');
MAHARASHTRA_BOUNDARY.forEach(pt => {
  assert.ok(pt.lat >= 15.5 && pt.lat <= 22.2, `Boundary lat ${pt.lat} within Maharashtra bounds`);
  assert.ok(pt.lng >= 72.4 && pt.lng <= 81.1, `Boundary lng ${pt.lng} within Maharashtra bounds`);
});

// Verify Karjat Target
assert.equal(MAHARASHTRA_TARGET.lat, 18.9183, 'Target latitude must match Karjat 18.9183');
assert.equal(MAHARASHTRA_TARGET.lng, 73.4370, 'Target longitude must match Karjat 73.4370');

// Verify Coordinate Projections
const karjatSvg = projectMaharashtraGeo(18.9183, 73.4370);
const mumbaiSvg = projectMaharashtraGeo(19.0760, 72.8777);
const puneSvg = projectMaharashtraGeo(18.5204, 73.8567);
const nagpurSvg = projectMaharashtraGeo(21.1458, 79.0882);

// Check that Mumbai is west of Karjat (mumbaiSvg.x < karjatSvg.x)
assert.ok(mumbaiSvg.x < karjatSvg.x, `Mumbai (${mumbaiSvg.x}) must be west of Karjat (${karjatSvg.x})`);

// Check that Nagpur is east of Karjat (nagpurSvg.x > karjatSvg.x)
assert.ok(nagpurSvg.x > karjatSvg.x, `Nagpur (${nagpurSvg.x}) must be east of Karjat (${karjatSvg.x})`);

// Check that Pune is south of Karjat (puneSvg.y > karjatSvg.y in SVG coordinates where Y increases downwards)
assert.ok(puneSvg.y > karjatSvg.y, `Pune (${puneSvg.y}) must be south of Karjat (${karjatSvg.y})`);

// Verify SVG generation with empty supporters
const emptySvg = generateMaharashtraSvgHtml([], 'test-empty');
assert.ok(emptySvg.includes('<svg'), 'Must render SVG element');
assert.ok(emptySvg.includes('#10B981'), 'Must include neon-emerald boundary stroke');
assert.ok(emptySvg.includes('KARJAT (Target Hub)'), 'Must feature Karjat target beacon');
assert.ok(emptySvg.includes('SAHYADRI WESTERN GHATS RIDGE'), 'Must feature Sahyadri ridge');

// Verify SVG generation with real supporters
const mockSupportersList = [
  { displayName: 'Aditya', city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { displayName: 'Neha', city: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 }
];
const populatedSvg = generateMaharashtraSvgHtml(mockSupportersList, 'test-pop');
assert.ok(populatedSvg.includes('participant-connection-arc'), 'Must render curved connection line arcs');
assert.ok(populatedSvg.includes('Pune'), 'Must render participant city label for Pune');
assert.ok(populatedSvg.includes('Nagpur'), 'Must render participant city label for Nagpur');
console.log('✓ Maharashtra State Vector Map geography, projections & connections verified\n');

// 10. Zoom-Adaptive Connection Line Thickness & Geometry Tests
console.log('Test 10: Zoom-Adaptive Connection Line Thickness & Geometry');
import { getAdaptiveLineStyle, computeCurvedArcPoints, createHolographicMarkerSvg } from '../src/components/MaharashtraMap.js';

// 1. Country/India-level zoom (approx 1 - 1.5 px strokes with subtle glow & compact holographic marker footprint)
const countryStyle = getAdaptiveLineStyle(4.5);
assert.ok(countryStyle.strokeWeight >= 1.0 && countryStyle.strokeWeight <= 1.5, `Country zoom stroke weight ${countryStyle.strokeWeight} must be between 1.0 and 1.5px`);
assert.ok(countryStyle.strokeOpacity <= 0.8, `Country zoom opacity ${countryStyle.strokeOpacity} must be subtle (<= 0.8) to prevent thick ribbons`);
assert.strictEqual(countryStyle.holoMarkerPixelSize, 18, 'Country zoom holographic marker footprint must be compact (18px)');

// 2. Medium zoom (~2 px strokes & 18-22px holographic marker footprint)
const mediumStyle = getAdaptiveLineStyle(7.0);
assert.ok(mediumStyle.strokeWeight >= 1.7 && mediumStyle.strokeWeight <= 2.1, `Medium zoom stroke weight ${mediumStyle.strokeWeight} must be approx 2.0px`);
assert.ok(mediumStyle.holoMarkerPixelSize >= 18 && mediumStyle.holoMarkerPixelSize <= 22, 'Medium zoom holographic marker footprint must scale naturally');

// 3. Close/local zoom (~2.5 - 3.0 px strokes & 22-26px holographic marker footprint)
const closeStyle = getAdaptiveLineStyle(10.0);
assert.ok(closeStyle.strokeWeight >= 2.5 && closeStyle.strokeWeight <= 3.0, `Close zoom stroke weight ${closeStyle.strokeWeight} must be between 2.5 and 3.0px`);
assert.ok(closeStyle.strokeOpacity >= 0.9, `Close zoom opacity ${closeStyle.strokeOpacity} must provide vibrant glow`);
assert.ok(closeStyle.holoMarkerPixelSize >= 22 && closeStyle.holoMarkerPixelSize <= 26, 'Close zoom holographic marker footprint must provide clear holographic definition');

// 4. Minimal Holographic Dot SVG Specifications (Center dot ~4-5px, outer ring ~8-10px, subtle pulse, count indicator)
const greenHoloSvg = decodeURIComponent(createHolographicMarkerSvg({ color: '#00FF87', isBlue: false, count: 1 }));
assert.ok(greenHoloSvg.includes('r="2.2"'), 'Holographic marker must have tiny ~4.4px center dot (radius 2.2px)');
assert.ok(greenHoloSvg.includes('r="4.5"'), 'Holographic marker must have thin ~9px outer ring (radius 4.5px)');
assert.ok(greenHoloSvg.includes('animateName') || greenHoloSvg.includes('animate'), 'Holographic marker must have subtle breathing pulse animation');
assert.ok(!greenHoloSvg.includes('<text'), 'Single report marker must not show cluttering count text');

const clusteredHoloSvg = decodeURIComponent(createHolographicMarkerSvg({ color: '#00E5FF', isBlue: true, count: 42 }));
assert.ok(clusteredHoloSvg.includes('42'), 'Clustered marker (>1) must show clean count indicator');
assert.ok(clusteredHoloSvg.includes('#00E5FF'), 'Cyan/blue marker must apply neon cyan palette');

// 4. Smooth monotonicity & zero loops across nearby and distant markers
const testCoords = [
  { name: 'Panvel (Near)', lat: 18.9894, lng: 73.1175 },
  { name: 'Mumbai (Near)', lat: 19.0760, lng: 72.8777 },
  { name: 'Nashik (Mid)', lat: 19.9975, lng: 73.7898 },
  { name: 'Delhi (Distant)', lat: 28.6139, lng: 77.2090 }
];
const kLat = 18.9183, kLng = 73.4370;

testCoords.forEach(tc => {
  const pts = computeCurvedArcPoints(tc.lat, tc.lng, kLat, kLng);
  assert.ok(pts.length >= 20, 'Points array must have at least 20 steps');
  const dLat = kLat - tc.lat, dLng = kLng - tc.lng;
  const dist = Math.sqrt(dLat*dLat + dLng*dLng);
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i-1], curr = pts[i];
    const uPrev = (prev.lat - tc.lat) * (dLat/dist) + (prev.lng - tc.lng) * (dLng/dist);
    const uCurr = (curr.lat - tc.lat) * (dLat/dist) + (curr.lng - tc.lng) * (dLng/dist);
    assert.ok(uCurr > uPrev, `${tc.name}: Point ${i} must have strictly monotonic forward progression (no loops)`);
  }
});
console.log('✓ Zoom-adaptive line styles and loop-free geometry verified\n');

console.log('🎉 ALL 10 TEST SUITES PASSED FLAWLESSLY!');
