/**
 * SAVE THE SAHYADRI — EARTH GEODATA & BOUNDARIES
 * Geographically accurate vector boundaries for the custom 3D Earth Globe.
 * Public domain geographic vectors for continents, India boundary, and Sahyadri ridge.
 */

// Geographically accurate India outline (lat/lng points forming the boundary polygon)
export const INDIA_BOUNDARY = [
  // Northern Region / Jammu & Kashmir & Ladakh
  { lat: 37.05, lng: 74.5 },
  { lat: 35.5, lng: 77.0 },
  { lat: 34.3, lng: 79.0 },
  { lat: 32.5, lng: 78.8 },
  // Himachal / Uttarakhand border
  { lat: 31.0, lng: 78.2 },
  { lat: 30.1, lng: 81.0 },
  // Nepal border transition (skirting along Himalayan foothills)
  { lat: 27.5, lng: 85.0 },
  { lat: 27.2, lng: 88.1 }, // Sikkim
  { lat: 27.8, lng: 88.8 },
  { lat: 26.8, lng: 89.8 }, // Bhutan border
  // Arunachal Pradesh & Northeast
  { lat: 27.5, lng: 91.8 },
  { lat: 28.5, lng: 94.5 },
  { lat: 28.2, lng: 96.8 },
  { lat: 27.0, lng: 96.5 },
  { lat: 25.5, lng: 95.0 }, // Nagaland / Manipur
  { lat: 23.5, lng: 93.3 }, // Mizoram
  { lat: 22.0, lng: 92.8 },
  { lat: 24.0, lng: 92.0 }, // Tripura
  { lat: 25.2, lng: 90.0 }, // Meghalaya
  { lat: 26.0, lng: 89.8 },
  // West Bengal & Sundarbans
  { lat: 24.5, lng: 88.5 },
  { lat: 22.0, lng: 89.0 },
  { lat: 21.6, lng: 87.5 },
  // East Coast (Odisha, Andhra Pradesh, Tamil Nadu)
  { lat: 20.0, lng: 86.0 },
  { lat: 18.0, lng: 83.5 },
  { lat: 16.0, lng: 81.0 },
  { lat: 14.0, lng: 80.1 },
  { lat: 13.0, lng: 80.3 }, // Chennai
  { lat: 10.8, lng: 79.8 },
  { lat: 9.2, lng: 79.2 },
  { lat: 8.08, lng: 77.55 }, // Kanyakumari (Southern Tip)
  // West Coast (Kerala, Karnataka, Goa, Maharashtra, Gujarat)
  { lat: 8.8, lng: 76.5 }, // Kerala
  { lat: 10.0, lng: 76.2 },
  { lat: 12.0, lng: 75.1 }, // Karnataka
  { lat: 14.8, lng: 74.1 },
  { lat: 15.5, lng: 73.8 }, // Goa
  { lat: 17.0, lng: 73.3 }, // Konkan Maharashtra
  { lat: 18.9, lng: 72.8 }, // Mumbai
  { lat: 20.2, lng: 72.8 },
  { lat: 21.2, lng: 72.8 }, // Gulf of Khambhat
  { lat: 20.7, lng: 71.0 }, // Saurashtra / Gir
  { lat: 22.3, lng: 69.0 }, // Dwarka
  { lat: 23.0, lng: 70.2 },
  { lat: 23.8, lng: 68.2 }, // Kutch / Sir Creek
  // Western Border (Rajasthan, Punjab)
  { lat: 24.5, lng: 71.0 },
  { lat: 26.5, lng: 70.3 }, // Jaisalmer
  { lat: 28.0, lng: 71.5 },
  { lat: 30.0, lng: 73.8 }, // Punjab border
  { lat: 32.5, lng: 74.8 },
  { lat: 34.5, lng: 74.0 }  // Back to North
];

// Simplified World Continent Outlines (lat, lng pairs for realistic global terrain backdrop)
export const WORLD_CONTINENTS = [
  // Eurasia & Africa Landmass (Main Afro-Eurasia)
  [
    { lat: 71, lng: 28 }, { lat: 68, lng: 50 }, { lat: 72, lng: 75 }, { lat: 76, lng: 110 },
    { lat: 72, lng: 140 }, { lat: 66, lng: 170 }, { lat: 60, lng: 165 }, { lat: 55, lng: 135 },
    { lat: 40, lng: 120 }, { lat: 30, lng: 122 }, { lat: 22, lng: 108 }, { lat: 10, lng: 105 },
    { lat: 1, lng: 104 }, { lat: 15, lng: 95 }, { lat: 23, lng: 90 }, { lat: 22, lng: 88 },
    // India gap (highlighted separately)
    { lat: 25, lng: 65 }, { lat: 25, lng: 57 }, { lat: 13, lng: 45 }, { lat: 12, lng: 51 },
    { lat: -10, lng: 40 }, { lat: -25, lng: 35 }, { lat: -34, lng: 25 }, { lat: -34, lng: 18 },
    { lat: -20, lng: 12 }, { lat: 5, lng: 2 }, { lat: 15, lng: -17 }, { lat: 25, lng: -15 },
    { lat: 36, lng: -5 }, { lat: 43, lng: -9 }, { lat: 48, lng: -4 }, { lat: 54, lng: 8 },
    { lat: 58, lng: 5 }, { lat: 62, lng: 5 }, { lat: 71, lng: 28 }
  ],
  // Americas (North & South America)
  [
    { lat: 70, lng: -160 }, { lat: 70, lng: -130 }, { lat: 60, lng: -85 }, { lat: 55, lng: -60 },
    { lat: 45, lng: -65 }, { lat: 35, lng: -75 }, { lat: 25, lng: -80 }, { lat: 20, lng: -90 },
    { lat: 10, lng: -75 }, { lat: 5, lng: -55 }, { lat: -5, lng: -35 }, { lat: -22, lng: -40 },
    { lat: -35, lng: -55 }, { lat: -55, lng: -68 }, { lat: -50, lng: -75 }, { lat: -20, lng: -70 },
    { lat: -5, lng: -80 }, { lat: 8, lng: -80 }, { lat: 18, lng: -105 }, { lat: 32, lng: -117 },
    { lat: 48, lng: -125 }, { lat: 60, lng: -140 }, { lat: 65, lng: -168 }, { lat: 70, lng: -160 }
  ],
  // Australia
  [
    { lat: -12, lng: 131 }, { lat: -12, lng: 142 }, { lat: -20, lng: 148 }, { lat: -32, lng: 152 },
    { lat: -38, lng: 147 }, { lat: -38, lng: 140 }, { lat: -32, lng: 130 }, { lat: -34, lng: 115 },
    { lat: -22, lng: 114 }, { lat: -15, lng: 124 }, { lat: -12, lng: 131 }
  ]
];
