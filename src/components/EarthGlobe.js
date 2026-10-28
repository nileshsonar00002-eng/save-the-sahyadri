/**
 * SAVE THE SAHYADRI — CUSTOM 3D EARTH GLOBE
 * Built using Three.js & WebGL. Zero external map tile services.
 * Features:
 * - Real 3D Earth sphere with dark forest aesthetic
 * - Luminous emerald India and Sahyadri / Western Ghats corridor
 * - Curved 3D arcs from real backend participant cities converging on Karjat
 * - Animated traveling photons along arcs
 * - Atmospheric rim glow and subtle starfield
 * - Touch & pointer drag rotation with damping and India view reset
 * - Tab visibility and offscreen animation pausing
 * - Graceful 2D fallback if WebGL is unavailable
 */

import * as THREE from 'three';
import { SAHYADRI_HUB, SAHYADRI_CORRIDOR_COORDS } from '../data/sahyadriData.js';
import { INDIA_BOUNDARY, WORLD_CONTINENTS } from '../data/earthGeoData.js';

const GLOBE_RADIUS = 2.0;

/**
 * Coordinate Transformation: Lat/Lng -> 3D Vector3 on Sphere
 * Standard equirectangular mapping compatible with Three.js SphereGeometry UVs.
 */
export function latLngToVector3(lat, lng, radius = GLOBE_RADIUS, altitude = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;

  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = (r * Math.sin(phi) * Math.sin(theta));
  const y = (r * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

/**
 * Initialize 3D Earth Globe
 * @param {HTMLElement} container Parent DOM element
 * @param {Array} supporters Real participant records from backend
 * @returns {Object} Globe controller instance with update and destroy methods
 */
export function initEarthGlobe(container, supporters = []) {
  if (!container) return null;

  // Check WebGL availability
  if (!isWebGLAvailable()) {
    console.warn('[EarthGlobe] WebGL not supported. Rendering 2D fallback.');
    render2DFallback(container, supporters);
    return null;
  }

  // Clear container
  container.innerHTML = '';
  container.style.position = 'relative';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 350;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.4);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    console.warn('[EarthGlobe] WebGLRenderer init failed:', err);
    render2DFallback(container, supporters);
    return null;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.borderRadius = '1rem';
  renderer.domElement.style.cursor = 'grab';

  // 2. Starfield
  const starfield = createStarfield();
  scene.add(starfield);

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0x06190f, 1.8);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x34d399, 2.2);
  mainLight.position.set(5, 3, 5);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0x00ff87, 1.5);
  rimLight.position.set(-5, -2, -3);
  scene.add(rimLight);

  // 4. Globe Group (holds globe, markers, arcs and rotates together)
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Initial orientation: Center on India (Lat ~20°N, Lng ~78°E)
  // Rotating around Y and X to bring India facing camera (+Z)
  const initialRotY = -((78 + 90) * Math.PI / 180);
  const initialRotX = (20 * Math.PI / 180);
  globeGroup.rotation.y = initialRotY;
  globeGroup.rotation.x = initialRotX;

  // 5. Procedural Earth Texture on Canvas
  const earthTexture = createProceduralEarthTexture();
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.75,
    metalness: 0.15,
    emissive: new THREE.Color(0x031209),
    emissiveIntensity: 0.45
  });

  const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  globeGroup.add(earthMesh);

  // 6. Atmospheric Glow Outer Shell
  const atmosphereMesh = createAtmosphereMesh(GLOBE_RADIUS);
  scene.add(atmosphereMesh);

  // 7. Sahyadri Focal Beacon at Karjat
  const sahyadriBeacon = createSahyadriBeacon(globeGroup);

  // 8. Arcs & City Markers Group
  const arcsGroup = new THREE.Group();
  globeGroup.add(arcsGroup);
  let travelingPhotons = [];

  // Function to build participant arcs
  function buildParticipantArcs(list) {
    // Clear old arcs
    while (arcsGroup.children.length > 0) {
      const child = arcsGroup.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
      arcsGroup.remove(child);
    }
    travelingPhotons = [];

    // Target: Karjat / Sahyadri Hub
    const targetVec = latLngToVector3(SAHYADRI_HUB.lat, SAHYADRI_HUB.lng, GLOBE_RADIUS);

    // Limit arcs to 16 max for mobile performance
    const activeParticipants = (list || []).slice(0, 16);

    activeParticipants.forEach((sup, idx) => {
      if (typeof sup.lat !== 'number' || typeof sup.lng !== 'number') return;

      const isHub = Math.abs(sup.lat - SAHYADRI_HUB.lat) < 0.1 && Math.abs(sup.lng - SAHYADRI_HUB.lng) < 0.1;
      const startVec = latLngToVector3(sup.lat, sup.lng, GLOBE_RADIUS);

      // Add city marker sphere on globe surface
      const cityMarkerGeo = new THREE.SphereGeometry(0.025, 12, 12);
      const cityMarkerMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const cityMarker = new THREE.Mesh(cityMarkerGeo, cityMarkerMat);
      cityMarker.position.copy(startVec);
      arcsGroup.add(cityMarker);

      if (isHub) return;

      // Create 3D curved arc
      const angle = startVec.angleTo(targetVec);
      if (angle < 0.05) return;

      // Arc apex altitude proportional to distance
      const maxAltitude = Math.min(0.5, Math.max(0.12, angle * 0.35));
      const midVec = startVec.clone().add(targetVec).multiplyScalar(0.5);
      const midLen = midVec.length();
      if (midLen > 0.001) {
        midVec.normalize().multiplyScalar(GLOBE_RADIUS + maxAltitude);
      }

      // Generate quadratic bezier points
      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, targetVec);
      const points = curve.getPoints(36);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      const arcMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Add traveling photon particle along the curve
      const photonGeo = new THREE.SphereGeometry(0.02, 8, 8);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending
      });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      arcsGroup.add(photon);

      travelingPhotons.push({
        mesh: photon,
        curve,
        progress: (idx * 0.18) % 1,
        speed: 0.006 + (idx % 3) * 0.002
      });
    });
  }

  buildParticipantArcs(supporters);

  // 9. Interaction: Pointer Drag & Touch Controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = !prefersReducedMotion;
  let targetRotationY = globeGroup.rotation.y;
  let targetRotationX = globeGroup.rotation.x;
  let isResetting = false;

  const onPointerDown = (e) => {
    isDragging = true;
    autoRotate = false;
    isResetting = false;
    renderer.domElement.style.cursor = 'grabbing';
    previousMousePosition = {
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0
    };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - previousMousePosition.x;
    const deltaY = clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.006;
    targetRotationX += deltaY * 0.006;

    // Clamp X rotation to prevent flipping upside down
    targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

    previousMousePosition = { x: clientX, y: clientY };
  };

  const onPointerUp = () => {
    isDragging = false;
    renderer.domElement.style.cursor = 'grab';
    // Resume gentle auto-rotation after 4 seconds of idle
    setTimeout(() => {
      if (!isDragging && !isResetting && !prefersReducedMotion) {
        autoRotate = true;
      }
    }, 4000);
  };

  const domEl = renderer.domElement;
  domEl.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  domEl.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // 10. Animation Loop & Lifecycle
  let animationFrameId = null;
  let isRunning = true;
  let clock = new THREE.Clock();

  function animate() {
    if (!isRunning) return;

    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth rotation damping
    if (isResetting) {
      globeGroup.rotation.y += (initialRotY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (initialRotX - globeGroup.rotation.x) * 0.08;
      if (Math.abs(globeGroup.rotation.y - initialRotY) < 0.002 && Math.abs(globeGroup.rotation.x - initialRotX) < 0.002) {
        globeGroup.rotation.y = initialRotY;
        globeGroup.rotation.x = initialRotX;
        targetRotationY = initialRotY;
        targetRotationX = initialRotX;
        isResetting = false;
        if (!prefersReducedMotion) autoRotate = true;
      }
    } else {
      if (autoRotate && !isDragging) {
        targetRotationY += 0.0018;
      }
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.1;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.1;
    }

    // Sahyadri pulse
    if (sahyadriBeacon) {
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.35;
      sahyadriBeacon.ring.scale.set(pulseScale, pulseScale, pulseScale);
      sahyadriBeacon.ring.material.opacity = 0.8 - (pulseScale - 1.0) * 1.5;
    }

    // Animate traveling photons along participant arcs
    if (!prefersReducedMotion) {
      travelingPhotons.forEach((item) => {
        item.progress = (item.progress + item.speed) % 1;
        const pos = item.curve.getPoint(item.progress);
        item.mesh.position.copy(pos);
      });
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  const resizeObserver = new ResizeObserver(() => {
    const newW = container.clientWidth || 400;
    const newH = container.clientHeight || 350;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
  resizeObserver.observe(container);

  // Tab visibility & offscreen optimization
  const onVisibilityChange = () => {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      if (!isRunning) {
        isRunning = true;
        clock.start();
        animate();
      }
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          clock.start();
          animate();
        }
      } else {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.1 });
  intersectionObserver.observe(container);

  // Controller API
  return {
    resetFocus: () => {
      isResetting = true;
      autoRotate = false;
    },
    updateSupporters: (newSupporters) => {
      buildParticipantArcs(newSupporters);
    },
    destroy: () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      document.removeEventListener('visibilitychange', onVisibilityChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      renderer.dispose();
    }
  };
}

/**
 * Procedural Equirectangular Earth Texture Generator
 * Draws oceans, continents, lat/lng grid lines, luminous India outline,
 * and the glowing Sahyadri mountain ridge.
 */
function createProceduralEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const w = canvas.width;
  const h = canvas.height;

  // 1. Deep Oceanic Background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, '#020704');
  oceanGrad.addColorStop(0.5, '#040d08');
  oceanGrad.addColorStop(1, '#020704');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // Helper: Project (lat, lng) to Canvas [x, y]
  function toCanvas(lat, lng) {
    const x = ((lng + 180) / 360) * w;
    const y = ((90 - lat) / 180) * h;
    return { x, y };
  }

  // 2. Graticule Lat/Lng Subtle Grid
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.06)';
  ctx.lineWidth = 1;

  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // 3. World Continents (Subtle dark forest landmasses)
  ctx.fillStyle = '#081c11';
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
  ctx.lineWidth = 1.5;

  WORLD_CONTINENTS.forEach((poly) => {
    ctx.beginPath();
    poly.forEach((pt, i) => {
      const p = toCanvas(pt.lat, pt.lng);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 4. India Boundary (Luminous Emerald Highlight)
  ctx.beginPath();
  INDIA_BOUNDARY.forEach((pt, i) => {
    const p = toCanvas(pt.lat, pt.lng);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();

  // Emerald interior fill
  ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
  ctx.fill();

  // Outer glowing border
  ctx.strokeStyle = '#00FF87';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#00FF87';
  ctx.shadowBlur = 14;
  ctx.stroke();
  ctx.shadowBlur = 0; // reset

  // 5. Sahyadri / Western Ghats Mountain Corridor
  ctx.beginPath();
  SAHYADRI_CORRIDOR_COORDS.forEach((pt, i) => {
    const p = toCanvas(pt.lat, pt.lng);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4.5;
  ctx.shadowColor = '#00FF87';
  ctx.shadowBlur = 16;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 6. Karjat Hub Epicenter
  const karjatPixel = toCanvas(SAHYADRI_HUB.lat, SAHYADRI_HUB.lng);
  ctx.beginPath();
  ctx.arc(karjatPixel.x, karjatPixel.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = '#00FF87';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Atmospheric Outer Glow Shell
 */
function createAtmosphereMesh(radius) {
  const geometry = new THREE.SphereGeometry(radius * 1.05, 48, 48);
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
        gl_FragColor = vec4(0.0, 1.0, 0.53, 1.0) * intensity * 0.85;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });

  return new THREE.Mesh(geometry, material);
}

/**
 * Starfield Generator
 */
function createStarfield() {
  const count = 350;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 25 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Color variation: white to soft emerald
    const isEmerald = Math.random() > 0.65;
    colors[i * 3] = isEmerald ? 0.2 : 0.9;
    colors[i * 3 + 1] = isEmerald ? 1.0 : 0.9;
    colors[i * 3 + 2] = isEmerald ? 0.6 : 0.9;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  return new THREE.Points(geometry, material);
}

/**
 * Sahyadri Focal Beacon Marker at Karjat
 */
function createSahyadriBeacon(parentGroup) {
  const pos = latLngToVector3(SAHYADRI_HUB.lat, SAHYADRI_HUB.lng, GLOBE_RADIUS);

  // Core glowing sphere
  const coreGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ff87 });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.copy(pos);
  parentGroup.add(coreMesh);

  // Pulsing ring
  const ringGeo = new THREE.RingGeometry(0.04, 0.07, 24);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00ff87,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.position.copy(pos);
  ringMesh.lookAt(0, 0, 0); // Face outward
  parentGroup.add(ringMesh);

  return { core: coreMesh, ring: ringMesh };
}

/**
 * Check if WebGL is available in browser
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (_) {
    return false;
  }
}

/**
 * Lightweight 2D Fallback if WebGL fails or is unavailable
 */
function render2DFallback(container, supporters) {
  container.innerHTML = `
    <div class="relative w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#040E08] rounded-2xl border border-emerald-500/20">
      <span class="text-4xl animate-bounce">🌍</span>
      <h4 class="font-heading font-bold text-white text-base">3D Earth Active View</h4>
      <p class="text-xs text-slate-300 max-w-xs">
        Hardware acceleration is limited. Interactive 2D view and full movement map are running.
      </p>
      <a href="#map" class="px-4 py-2 rounded-lg bg-emerald-400 text-black font-bold text-xs">
        Open Movement Map →
      </a>
    </div>
  `;
}
