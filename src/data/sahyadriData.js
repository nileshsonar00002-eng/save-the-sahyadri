/**
 * SAHYADRI GEOGRAPHIC & CAMPAIGN DATASET
 * Verified geographical coordinates, corridor polylines, major city centroids,
 * state catalogs, and environmental science resources.
 */

// Central focal anchor for the Karjat / Northern Sahyadri region
export const SAHYADRI_HUB = {
  name: "Karjat / Northern Sahyadri Foothills",
  district: "Raigad District, Maharashtra",
  lat: 18.9183,
  lng: 73.4370,
  elevation: "194 m (rising to 800m+ escarpments)",
  significance: "Crucial ecological junction between the coastal Konkan plains and the Western Ghats crestline."
};

// Key ecological waypoints forming the Sahyadri Maharashtra ridge corridor
export const SAHYADRI_CORRIDOR_COORDS = [
  { name: "Salher / Baglan", lat: 20.722, lng: 73.945 },
  { name: "Kalsubai Peak (1646m)", lat: 19.601, lng: 73.712 },
  { name: "Harishchandragad", lat: 19.387, lng: 73.778 },
  { name: "Bhimashankar Wildlife Sanctuary", lat: 19.072, lng: 73.535 },
  { name: "Karjat Foothills & Pej Basin", lat: 18.9183, lng: 73.4370 },
  { name: "Matheran Eco-Sensitive Zone", lat: 18.986, lng: 73.267 },
  { name: "Khandala / Rajmachi Ridge", lat: 18.829, lng: 73.398 },
  { name: "Tamhini Ghat Corridor", lat: 18.472, lng: 73.421 },
  { name: "Mahabaleshwar Plateau (Krishna River Origin)", lat: 17.923, lng: 73.658 },
  { name: "Koyna Wildlife Sanctuary", lat: 17.433, lng: 73.754 },
  { name: "Chandoli (Sahyadri Tiger Reserve)", lat: 17.158, lng: 73.856 },
  { name: "Radhanagari Wildlife Sanctuary", lat: 16.425, lng: 74.004 },
  { name: "Amboli Rainforest Ridge", lat: 15.962, lng: 73.998 }
];

// Major Indian Cities with standardized geographic centroids (City-level privacy preservation)
export const INDIAN_CITIES_GEO = [
  // Maharashtra
  { city: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
  { city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { city: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
  { city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898 },
  { city: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781 },
  { city: "Navi Mumbai", state: "Maharashtra", lat: 19.0330, lng: 73.0297 },
  { city: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra", lat: 19.8762, lng: 75.3433 },
  { city: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064 },
  { city: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433 },
  { city: "Satara", state: "Maharashtra", lat: 17.6805, lng: 73.9930 },
  { city: "Karjat", state: "Maharashtra", lat: 18.9183, lng: 73.4370 },
  { city: "Panvel", state: "Maharashtra", lat: 18.9894, lng: 73.1175 },
  { city: "Alibag", state: "Maharashtra", lat: 18.6414, lng: 72.8722 },
  { city: "Ratnagiri", state: "Maharashtra", lat: 16.9902, lng: 73.3120 },
  { city: "Amravati", state: "Maharashtra", lat: 20.9320, lng: 77.7523 },
  { city: "Nanded", state: "Maharashtra", lat: 19.1383, lng: 77.3210 },
  { city: "Jalgaon", state: "Maharashtra", lat: 21.0077, lng: 75.5626 },
  { city: "Dhule", state: "Maharashtra", lat: 20.9042, lng: 74.7749 },

  // Rest of India (Major Metros & Hubs)
  { city: "New Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 },
  { city: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  { city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867 },
  { city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { city: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
  { city: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812 },
  { city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
  { city: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
  { city: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
  { city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { city: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376 },
  { city: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096 },
  { city: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245 },
  { city: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362 },
  { city: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322 },
  { city: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734 },
  { city: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973 },
  { city: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278 },
  { city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673 },
  { city: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366 },
  { city: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 },
  { city: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198 },
  { city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
  { city: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480 },
  { city: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296 },
  { city: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
  { city: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
  { city: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243 },
  { city: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
  { city: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394 },
  { city: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.8560 },
  { city: "Hubballi", state: "Karnataka", lat: 15.3647, lng: 75.1240 },
  { city: "Belagavi", state: "Karnataka", lat: 15.8497, lng: 74.4977 }
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Detailed 4 pillars for Section 9: Campaign Story
export const SAHYADRI_PILLARS = [
  {
    id: "pillar-biodiversity",
    title: "Biodiversity & Wildlife Sanctuary",
    tagline: "Global Biodiversity Hotspot & UNESCO Heritage",
    description: "The Western Ghats are older than the Himalayas and host over 5,000 species of flowering plants, 139 mammal species, 508 bird species, and 179 amphibian species. More than 300 globally threatened taxa reside here, including the Malabar Giant Squirrel, Leopard, and the elusive Hornbill.",
    keyPoints: [
      "Designated one of the world's eight 'Hottest Hotspots' of biological diversity",
      "Endemic amphibians found nowhere else on planet Earth",
      "Critical contiguous wildlife migratory corridor between northern and southern Sahyadri"
    ],
    icon: "paw"
  },
  {
    id: "pillar-ecosystems",
    title: "Forest Ecosystems & Canopy",
    tagline: "Moist Deciduous & Tropical Evergreen Shields",
    description: "The dense tropical rainforests and montane shola-grassland mosaics of the Sahyadri act as India’s critical carbon sequestration buffer. Their complex root systems prevent massive hill landslides, lock topsoil on steep Deccan escarpments, and regulate ambient microclimates.",
    keyPoints: [
      "High-density biomass storing millions of tonnes of atmospheric carbon",
      "Natural shock absorbers preventing severe soil erosion and cloudburst flash floods",
      "Traditional sacred groves (Devrais) preserved by indigenous communities for centuries"
    ],
    icon: "trees"
  },
  {
    id: "pillar-water",
    title: "Water, Rivers & Catchments",
    tagline: "Peninsular Watershed & Regional Reservoirs",
    description: "The Sahyadri range forms peninsular India's primary watershed, capturing southwest monsoon rainfall that feeds vital river basins and municipal drinking water reservoirs.",
    keyPoints: [
      "Headwaters for major peninsular river systems including the Godavari, Krishna, Bhima, and Koyna.",
      "Westward Pej and Ulhas river basins recharge municipal reservoirs serving Mumbai, Thane, and Raigad.",
      "Dense catchment forests regulate monsoon runoff, prevent reservoir siltation, and sustain perennial groundwater aquifers."
    ],
    icon: "droplet",
    image: "/images/story/sahyadri-river.jpg",
    sourceName: "UNESCO WHC & Hydrological Data",
    sourceUrl: "https://whc.unesco.org/en/list/1342/"
  },
  {
    id: "pillar-heritage",
    title: "Natural & Cultural Heritage",
    tagline: "Geological Antiquity & Living Heritage",
    description: "Formed millions of years before the Himalayas, the rugged Sahyadri terrain harbors an ancient geological legacy, extraordinary biodiversity, and centuries of community stewardship.",
    keyPoints: [
      "Ancient origin dating back ~150M years to Gondwana, with basalt cliffs shaped by 66M-year-old Deccan volcanism.",
      "Serial sites across the Western Ghats inscribed as a UNESCO World Heritage property in 2012 for global biodiversity value.",
      "Living cultural legacy with historic bastions like Rajmachi and sacred groves (devrais) protected by local communities."
    ],
    icon: "mountain",
    image: "/images/story/sahyadri-heritage-fort.jpg",
    sourceName: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/1342/"
  }
];

// Helper to look up coordinates for any entered Indian city
export function findCityGeo(cityName, stateName) {
  if (!cityName) return null;
  const cleanCity = cityName.trim().toLowerCase();
  const cleanState = (stateName || '').trim().toLowerCase();

  // 1. Direct city match
  const exact = INDIAN_CITIES_GEO.find(c => c.city.toLowerCase() === cleanCity);
  if (exact) return exact;

  // 2. City substring or contains
  const fuzzy = INDIAN_CITIES_GEO.find(c => 
    c.city.toLowerCase().includes(cleanCity) || cleanCity.includes(c.city.toLowerCase())
  );
  if (fuzzy) return fuzzy;

  // 3. Fallback to state capital / representative center if city is obscure
  const stateMatch = INDIAN_CITIES_GEO.find(c => c.state.toLowerCase() === cleanState);
  if (stateMatch) return stateMatch;

  // 4. Default to Karjat / Sahyadri hub with slight offset
  return {
    city: cityName,
    state: stateName || "India",
    lat: SAHYADRI_HUB.lat + (Math.random() - 0.5) * 0.1,
    lng: SAHYADRI_HUB.lng + (Math.random() - 0.5) * 0.1
  };
}
