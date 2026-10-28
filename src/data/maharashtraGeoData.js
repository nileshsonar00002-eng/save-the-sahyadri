/**
 * SAVE THE SAHYADRI — GEOGRAPHIC DATASET & PROJECTIONS
 * Geographically verified boundary coordinates for Maharashtra, India,
 * Sahyadri Western Ghats corridor, and major participating cities.
 * All coordinates in [latitude, longitude] degrees WGS84.
 */

// Geographically accurate perimeter boundary of Maharashtra (WGS84 lat/lng)
export const MAHARASHTRA_BOUNDARY = [
  // 1. Northernmost apex at Narmada River (Nandurbar district)
  { lat: 22.025, lng: 74.150 },
  { lat: 21.980, lng: 74.320 },
  { lat: 21.820, lng: 74.650 },
  { lat: 21.680, lng: 74.920 },

  // 2. Satpura Range & Tapi River Basin (Dhule & Jalgaon border with MP)
  { lat: 21.520, lng: 75.180 },
  { lat: 21.420, lng: 75.550 },
  { lat: 21.360, lng: 75.920 },
  { lat: 21.280, lng: 76.320 },
  { lat: 21.350, lng: 76.600 },

  // 3. Melghat / Satpura Foothills (Amravati border with MP)
  { lat: 21.620, lng: 76.880 },
  { lat: 21.750, lng: 77.180 },
  { lat: 21.650, lng: 77.550 },
  { lat: 21.480, lng: 77.920 },
  { lat: 21.420, lng: 78.350 },

  // 4. North Vidarbha / Pench (Nagpur & Bhandara border with MP)
  { lat: 21.580, lng: 78.850 },
  { lat: 21.640, lng: 79.220 },
  { lat: 21.560, lng: 79.650 },
  { lat: 21.620, lng: 80.050 },

  // 5. Easternmost Apex (Gondia & Gadchiroli border with MP & Chhattisgarh)
  { lat: 21.450, lng: 80.420 },
  { lat: 21.300, lng: 80.680 },
  { lat: 20.950, lng: 80.580 },
  { lat: 20.650, lng: 80.500 },
  { lat: 20.250, lng: 80.620 },
  { lat: 19.780, lng: 80.750 },
  { lat: 19.350, lng: 80.880 }, // Indravati / Bhamragad easternmost corner
  { lat: 19.050, lng: 80.520 },

  // 6. South Gadchiroli & Pranhita/Godavari Confluence (Sironcha / Telangana border)
  { lat: 18.820, lng: 80.050 },
  { lat: 18.780, lng: 79.820 }, // Sironcha confluence

  // 7. Southern Border with Telangana (Chandrapur & Yavatmal along Penganga)
  { lat: 19.220, lng: 79.520 },
  { lat: 19.550, lng: 79.350 },
  { lat: 19.720, lng: 78.880 },
  { lat: 19.600, lng: 78.420 },
  { lat: 19.320, lng: 77.920 },

  // 8. Nanded Southern Border (Degloor / Telangana & Karnataka tripoint)
  { lat: 18.750, lng: 77.620 },
  { lat: 18.420, lng: 77.380 },
  { lat: 18.250, lng: 77.050 },

  // 9. Latur, Dharashiv (Osmanabad) & Solapur Border with Karnataka
  { lat: 18.120, lng: 76.850 },
  { lat: 17.780, lng: 76.450 },
  { lat: 17.480, lng: 76.050 },
  { lat: 17.280, lng: 75.520 },

  // 10. Sangli & Kolhapur Border with Karnataka (Jath, Miraj, Chandgad)
  { lat: 17.020, lng: 75.050 },
  { lat: 16.820, lng: 74.620 },
  { lat: 16.550, lng: 74.400 },
  { lat: 16.250, lng: 74.280 },
  { lat: 15.920, lng: 74.220 }, // Chandgad

  // 11. Southernmost Point: Sindhudurg Border with Goa (Amboli / Dodamarg / Vengurla)
  { lat: 15.750, lng: 74.050 },
  { lat: 15.680, lng: 73.820 },
  { lat: 15.740, lng: 73.650 }, // Vengurla beach tip

  // 12. Western Konkan Coastline (Arabian Sea, South to North)
  { lat: 16.020, lng: 73.450 }, // Malvan
  { lat: 16.520, lng: 73.320 }, // Vijaydurg / Devgad
  { lat: 16.980, lng: 73.280 }, // Ratnagiri
  { lat: 17.480, lng: 73.180 }, // Guhagar / Jaigad
  { lat: 17.820, lng: 73.080 }, // Dapoli
  { lat: 18.280, lng: 72.950 }, // Murud / Raigad coast
  { lat: 18.650, lng: 72.870 }, // Alibag
  { lat: 18.920, lng: 72.810 }, // Mumbai harbor / Colaba
  { lat: 19.120, lng: 72.820 }, // Mumbai suburban / Bandra
  { lat: 19.380, lng: 72.780 }, // Vasai / Palghar coast
  { lat: 19.720, lng: 72.740 }, // Palghar / Tarapur
  { lat: 20.050, lng: 72.740 }, // Dahanu
  { lat: 20.180, lng: 72.780 }, // Bordi / Gujarat (Daman) border

  // 13. Northwest Gujarat Border (Palghar, Nashik, Dhule, Nandurbar)
  { lat: 20.280, lng: 73.020 }, // Jawhar / Dadra border
  { lat: 20.520, lng: 73.320 }, // Surgana / Dang border
  { lat: 20.780, lng: 73.680 }, // Baglan / Dang border
  { lat: 21.120, lng: 73.780 }, // Navapur
  { lat: 21.520, lng: 73.880 }, // Akkalkuwa / Narmada border
  { lat: 21.800, lng: 74.020 },
  { lat: 22.025, lng: 74.150 }  // Back to northernmost apex
];

// Major internal regional & ecological divider lines
export const MAHARASHTRA_INTERNAL_DIVISIONS = [
  // 1. Sahyadri Mountain Divide (Separates Konkan coastal plain from the Deccan plateau)
  {
    name: "Sahyadri Western Ghats Escarpment Divide",
    points: [
      { lat: 20.65, lng: 73.85 }, // Dang / Salher
      { lat: 19.60, lng: 73.71 }, // Kalsubai
      { lat: 19.38, lng: 73.78 }, // Harishchandragad
      { lat: 19.07, lng: 73.53 }, // Bhimashankar
      { lat: 18.91, lng: 73.33 }, // Karjat ridge
      { lat: 18.75, lng: 73.40 }, // Khandala / Lonavala
      { lat: 18.47, lng: 73.42 }, // Tamhini Ghat
      { lat: 17.92, lng: 73.66 }, // Mahabaleshwar
      { lat: 17.43, lng: 73.75 }, // Koyna
      { lat: 17.15, lng: 73.85 }, // Chandoli
      { lat: 16.42, lng: 74.00 }, // Radhanagari
      { lat: 15.96, lng: 73.99 }  // Amboli
    ]
  },
  // 2. Khandesh / Northern Division (Tapi basin / Satmala-Ajanta ridge)
  {
    name: "Satmala-Ajanta Ridge (Khandesh-Marathwada Divide)",
    points: [
      { lat: 20.45, lng: 74.20 }, // Chandwad / Nashik
      { lat: 20.55, lng: 75.10 }, // Chalisgaon
      { lat: 20.60, lng: 75.75 }, // Ajanta hills
      { lat: 20.45, lng: 76.50 }, // Buldhana border
      { lat: 20.35, lng: 77.20 }  // Washim border
    ]
  },
  // 3. Marathwada - Paschim Maharashtra Divide (Balaghat Range)
  {
    name: "Balaghat Range (Ahmednagar - Beed/Dharashiv)",
    points: [
      { lat: 19.10, lng: 74.75 }, // Ahmednagar east
      { lat: 18.95, lng: 75.40 }, // Ashti / Jamkhed
      { lat: 18.65, lng: 75.95 }, // Dharashiv north
      { lat: 18.35, lng: 76.55 }  // Latur border
    ]
  },
  // 4. Vidarbha Divide (Wardha & Penganga River Line)
  {
    name: "Wardha-Penganga Basin Divide",
    points: [
      { lat: 21.20, lng: 78.40 }, // Wardha north
      { lat: 20.55, lng: 78.80 }, // Hinganghat
      { lat: 20.00, lng: 79.15 }, // Chandrapur
      { lat: 19.55, lng: 79.40 }  // Penganga confluence
    ]
  }
];

// Verified Target Location in Karjat, Raigad
export const MAHARASHTRA_TARGET = {
  name: "Karjat / Northern Sahyadri Foothills",
  district: "Raigad District",
  lat: 18.9183,
  lng: 73.4370,
  description: "Focal conservation zone at the foot of the Western Ghats escarpment."
};

/**
 * Coordinate Projection Function: [lat, lng] -> SVG [x, y] for Maharashtra close-up
 */
export function projectMaharashtraGeo(lat, lng, width = 800, height = 650) {
  const minLng = 72.4;
  const maxLng = 81.1;
  const minLat = 15.5;
  const maxLat = 22.2;
  const cosLat = 0.9455; // Cosine of center latitude ~19°N

  const projW = (maxLng - minLng) * cosLat;
  const projH = (maxLat - minLat);

  const padX = 35;
  const padY = 30;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;

  const x = padX + (((lng - minLng) * cosLat) / projW) * usableW;
  const y = padY + ((maxLat - lat) / projH) * usableH;

  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// -------------------------------------------------------------
// ENHANCED PAN-INDIA GEODATA (Matches Reference Image Map View)
// -------------------------------------------------------------

// Geographically accurate India outer boundary polygon
export const INDIA_BOUNDARY_POINTS = [
  // Jammu & Kashmir & Ladakh
  { lat: 37.10, lng: 74.80 },
  { lat: 35.80, lng: 76.90 },
  { lat: 34.80, lng: 78.90 },
  { lat: 33.20, lng: 79.20 },
  // Himachal & Uttarakhand
  { lat: 31.80, lng: 78.70 },
  { lat: 30.20, lng: 80.90 },
  // Nepal Border Foothills
  { lat: 28.60, lng: 81.30 },
  { lat: 27.50, lng: 84.50 },
  { lat: 27.20, lng: 88.10 }, // Sikkim
  { lat: 27.80, lng: 88.80 },
  { lat: 27.10, lng: 89.80 }, // Bhutan border
  // Arunachal Pradesh & Northeast
  { lat: 27.60, lng: 91.90 },
  { lat: 28.50, lng: 94.60 },
  { lat: 28.30, lng: 96.80 },
  { lat: 27.10, lng: 96.60 },
  { lat: 25.60, lng: 95.10 }, // Nagaland / Manipur
  { lat: 23.60, lng: 93.30 }, // Mizoram
  { lat: 22.20, lng: 92.80 },
  { lat: 24.10, lng: 92.10 }, // Tripura
  { lat: 25.30, lng: 90.10 }, // Meghalaya
  { lat: 26.10, lng: 89.90 },
  // West Bengal & Sundarbans
  { lat: 24.80, lng: 88.40 },
  { lat: 22.30, lng: 89.00 },
  { lat: 21.60, lng: 87.50 },
  // Odisha & Andhra Coast
  { lat: 19.80, lng: 85.80 },
  { lat: 17.70, lng: 83.30 },
  { lat: 15.80, lng: 80.80 },
  { lat: 13.10, lng: 80.30 }, // Chennai
  { lat: 10.80, lng: 79.80 },
  { lat: 9.30, lng: 79.10 },
  // Kanyakumari Tip
  { lat: 8.08, lng: 77.55 },
  // Kerala & Karnataka Coast
  { lat: 9.90, lng: 76.20 },
  { lat: 12.90, lng: 74.80 },
  { lat: 15.00, lng: 74.00 }, // Goa
  // Maharashtra Konkan Coast
  { lat: 16.50, lng: 73.30 },
  { lat: 18.90, lng: 72.80 }, // Mumbai
  { lat: 20.10, lng: 72.80 },
  // Gujarat Coast & Peninsula
  { lat: 21.10, lng: 72.70 }, // Surat / Gulf of Khambhat
  { lat: 20.70, lng: 70.90 }, // Gir / Somnath
  { lat: 22.30, lng: 69.00 }, // Dwarka
  { lat: 23.10, lng: 70.20 },
  { lat: 23.80, lng: 68.30 }, // Rann of Kutch
  // Rajasthan & Punjab Border
  { lat: 24.50, lng: 71.00 },
  { lat: 26.80, lng: 70.40 }, // Jaisalmer
  { lat: 28.50, lng: 71.80 },
  { lat: 30.50, lng: 74.20 }, // Punjab
  { lat: 32.50, lng: 74.80 },
  { lat: 34.60, lng: 74.10 }  // Back to J&K
];

// Key internal state and regional boundary dividers across India
export const INDIA_STATE_DIVIDERS = [
  // 1. Maharashtra state boundary (distinctive outline)
  MAHARASHTRA_BOUNDARY.map(p => ({ lat: p.lat, lng: p.lng })),

  // 2. Gujarat-Rajasthan-MP dividers
  [
    { lat: 20.20, lng: 73.00 }, { lat: 22.00, lng: 74.10 }, { lat: 23.50, lng: 73.40 },
    { lat: 24.60, lng: 72.80 }, { lat: 24.50, lng: 71.00 }
  ],
  [
    { lat: 23.50, lng: 73.40 }, { lat: 24.50, lng: 74.50 }, { lat: 26.00, lng: 76.50 },
    { lat: 27.50, lng: 77.20 }
  ],

  // 3. Northern states (Punjab, Haryana, Delhi, UP)
  [
    { lat: 30.00, lng: 74.00 }, { lat: 29.50, lng: 76.00 }, { lat: 28.60, lng: 77.20 },
    { lat: 27.80, lng: 78.50 }, { lat: 25.50, lng: 82.00 }, { lat: 24.50, lng: 83.50 }
  ],

  // 4. Central & Eastern states (MP, Chhattisgarh, Odisha, Bengal)
  [
    { lat: 21.60, lng: 76.00 }, { lat: 23.00, lng: 78.50 }, { lat: 23.80, lng: 81.50 },
    { lat: 23.50, lng: 85.00 }, { lat: 22.50, lng: 88.00 }
  ],
  [
    { lat: 21.50, lng: 80.50 }, { lat: 20.50, lng: 82.50 }, { lat: 19.50, lng: 84.50 }
  ],

  // 5. Southern states (Karnataka, Telangana, AP, Tamil Nadu, Kerala)
  [
    { lat: 18.80, lng: 79.80 }, { lat: 17.50, lng: 79.50 }, { lat: 16.00, lng: 80.20 }
  ],
  [
    { lat: 17.50, lng: 76.50 }, { lat: 15.50, lng: 77.50 }, { lat: 13.50, lng: 78.50 },
    { lat: 13.00, lng: 80.20 }
  ],
  [
    { lat: 15.00, lng: 74.50 }, { lat: 13.00, lng: 75.50 }, { lat: 11.50, lng: 76.50 },
    { lat: 8.50, lng: 77.20 }
  ]
];

/**
 * Coordinate Projection Function: [lat, lng] -> SVG [x, y] for Pan-India view
 * Equirectangular with cosine latitude compensation (cos 22° = 0.927)
 */
export function projectIndiaGeo(lat, lng, width = 1000, height = 650) {
  const minLng = 66.8;
  const maxLng = 97.6;
  const minLat = 7.2;
  const maxLat = 37.8;
  const cosLat = 0.927;

  const projW = (maxLng - minLng) * cosLat; // ~28.55
  const projH = (maxLat - minLat);          // ~30.60

  // Margins tailored to match the reference image positioning
  const padX = 45;
  const padY = 35;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;

  const x = padX + (((lng - minLng) * cosLat) / projW) * usableW;
  const y = padY + ((maxLat - lat) / projH) * usableH;

  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// Default reference cities directly matching the user's reference image visual
export const REFERENCE_CITIES_DATA = [
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, color: "green", count: 4280 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, color: "blue", count: 2190 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, color: "green", count: 3150 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, color: "blue", count: 2640 },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, color: "green", count: 5820 },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, color: "green", count: 12450 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, color: "blue", count: 9810 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, color: "blue", count: 3410 }
];
