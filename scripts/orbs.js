// Deep-space galaxy background renderer

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rawConfig = window.SpaceSceneConfig || {};
  const profile = sanitizeProfile(rawConfig.profile);
  const motion = sanitizeMotion(rawConfig.motion);
  const qualityScale = sanitizeQuality(rawConfig.qualityScale);
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const nebulaLayer = document.createElement('canvas');
  const nebulaCtx = nebulaLayer.getContext('2d');
  const starDustLayer = document.createElement('canvas');
  const starDustCtx = starDustLayer.getContext('2d');

  if (!nebulaCtx || !starDustCtx) return;

  const MOTION_SPEED = {
    subtle: 0.00006,
    moderate: 0.00011,
    aggressive: 0.00018
  };

  const PROFILE_COUNTS = {
    performance: {
      desktop: { dynamicStars: 210, starDust: 320, glowObjects: 3, twinkleStars: 24 },
      mobile: { dynamicStars: 120, starDust: 180, glowObjects: 2, twinkleStars: 16 }
    },
    balanced: {
      desktop: { dynamicStars: 250, starDust: 380, glowObjects: 4, twinkleStars: 36 },
      mobile: { dynamicStars: 130, starDust: 200, glowObjects: 3, twinkleStars: 22 }
    },
    max: {
      desktop: { dynamicStars: 300, starDust: 480, glowObjects: 5, twinkleStars: 44 },
      mobile: { dynamicStars: 170, starDust: 280, glowObjects: 4, twinkleStars: 26 }
    }
  };

  const NEAR_Z = 0.2;
  const FAR_Z = 1.35;
  const MAX_DT = 40;

  let running = true;
  let rafId = 0;
  let resizeTimer;
  let lastTimestamp = performance.now();
  let elapsedTime = 0;
  let lastWidth = window.innerWidth;
  let lastHeight = window.innerHeight;
  let reducedMotion = reducedMotionQuery.matches;

  let cssWidth = window.innerWidth;
  let cssHeight = window.innerHeight;
  let dpr = clamp(window.devicePixelRatio || 1, 1, 1.5);
  let spreadX = cssWidth * 0.42;
  let spreadY = cssHeight * 0.42;

  const dynamicStars = [];
  const glowObjects = [];
  const twinkleStars = [];

  initializeScene();
  rafId = requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => handleResize(false), 150);
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => handleResize(true), 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
      return;
    }

    running = true;
    lastTimestamp = performance.now();
    rafId = requestAnimationFrame(animate);
  });

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);
  } else if (typeof reducedMotionQuery.addListener === 'function') {
    reducedMotionQuery.addListener(onReducedMotionChange);
  }

  function onReducedMotionChange(event) {
    reducedMotion = event.matches;
    applyCountTargets();
  }

  function sanitizeProfile(value) {
    return value === 'performance' || value === 'max' || value === 'balanced'
      ? value
      : 'balanced';
  }

  function sanitizeMotion(value) {
    return value === 'subtle' || value === 'moderate' || value === 'aggressive'
      ? value
      : 'subtle';
  }

  function sanitizeQuality(value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return 1;
    return clamp(numericValue, 0.5, 1.5);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isMobileViewport() {
    const mobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return mobileUA || window.matchMedia('(max-width: 900px)').matches;
  }

  function currentCounts() {
    const tier = isMobileViewport() ? 'mobile' : 'desktop';
    const base = PROFILE_COUNTS[profile][tier];
    const reducedFactor = reducedMotion ? 0.6 : 1;
    const scaled = {
      dynamicStars: Math.max(36, Math.round(base.dynamicStars * qualityScale * reducedFactor)),
      starDust: Math.max(120, Math.round(base.starDust * qualityScale)),
      glowObjects: Math.max(1, Math.round(base.glowObjects * qualityScale)),
      twinkleStars: Math.max(8, Math.round(base.twinkleStars * qualityScale * reducedFactor))
    };
    return scaled;
  }

  function initializeScene() {
    resizeCanvases(true);
    applyCountTargets();
    rebuildStaticLayers();
  }

  function applyCountTargets() {
    const counts = currentCounts();
    syncArrayLength(dynamicStars, counts.dynamicStars, createDynamicStar);
    syncArrayLength(glowObjects, counts.glowObjects, createGlowObject);
    syncArrayLength(twinkleStars, counts.twinkleStars, createTwinkleStar);
  }

  function syncArrayLength(targetArray, targetLength, factory) {
    while (targetArray.length < targetLength) {
      targetArray.push(factory());
    }
    if (targetArray.length > targetLength) {
      targetArray.length = targetLength;
    }
  }

  function resizeCanvases(force) {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const widthDelta = Math.abs(nextWidth - lastWidth);
    const heightDelta = Math.abs(nextHeight - lastHeight);

    // Ignore small viewport changes (mobile browser bars) to prevent visual resets.
    if (!force && widthDelta < 80 && heightDelta < 80) {
      return false;
    }

    const scaleX = lastWidth ? nextWidth / lastWidth : 1;
    const scaleY = lastHeight ? nextHeight / lastHeight : 1;

    cssWidth = nextWidth;
    cssHeight = nextHeight;
    dpr = clamp(window.devicePixelRatio || 1, 1, 1.5);
    spreadX = cssWidth * 0.42;
    spreadY = cssHeight * 0.42;

    const pixelWidth = Math.round(cssWidth * dpr);
    const pixelHeight = Math.round(cssHeight * dpr);

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    nebulaLayer.width = pixelWidth;
    nebulaLayer.height = pixelHeight;
    nebulaCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    starDustLayer.width = pixelWidth;
    starDustLayer.height = pixelHeight;
    starDustCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (Number.isFinite(scaleX) && Number.isFinite(scaleY)) {
      normalizeDynamicObjects(scaleX, scaleY);
    }

    lastWidth = nextWidth;
    lastHeight = nextHeight;
    return true;
  }

  function normalizeDynamicObjects(scaleX, scaleY) {
    dynamicStars.forEach((star) => {
      star.x *= scaleX;
      star.y *= scaleY;
    });

    glowObjects.forEach((glow) => {
      glow.x *= scaleX;
      glow.y *= scaleY;
      glow.radius *= (scaleX + scaleY) * 0.5;
    });

    twinkleStars.forEach((twinkle) => {
      twinkle.x *= scaleX;
      twinkle.y *= scaleY;
    });
  }

  function handleResize(force) {
    const resized = resizeCanvases(force);
    if (!resized) return;
    applyCountTargets();
    rebuildStaticLayers();
  }

  function rebuildStaticLayers() {
    buildNebulaLayer();
    buildStarDustLayer();
  }

  function buildNebulaLayer() {
    nebulaCtx.clearRect(0, 0, cssWidth, cssHeight);

    const baseGradient = nebulaCtx.createLinearGradient(0, 0, 0, cssHeight);
    baseGradient.addColorStop(0, '#02030a');
    baseGradient.addColorStop(0.4, '#061338');
    baseGradient.addColorStop(0.75, '#050a1f');
    baseGradient.addColorStop(1, '#010207');
    nebulaCtx.fillStyle = baseGradient;
    nebulaCtx.fillRect(0, 0, cssWidth, cssHeight);

    const cloudCount = Math.round(18 * qualityScale);
    nebulaCtx.globalCompositeOperation = 'screen';
    for (let i = 0; i < cloudCount; i++) {
      const cx = Math.random() * cssWidth;
      const cy = Math.random() * cssHeight;
      const radius = randomRange(cssWidth * 0.12, cssWidth * 0.45);
      const cloud = nebulaCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      const tint = pickNebulaTint();
      cloud.addColorStop(0, `rgba(${tint.r}, ${tint.g}, ${tint.b}, ${randomRange(0.14, 0.26)})`);
      cloud.addColorStop(0.55, `rgba(${tint.r}, ${tint.g}, ${tint.b}, ${randomRange(0.06, 0.12)})`);
      cloud.addColorStop(1, 'rgba(0, 0, 0, 0)');
      nebulaCtx.fillStyle = cloud;
      nebulaCtx.beginPath();
      nebulaCtx.arc(cx, cy, radius, 0, Math.PI * 2);
      nebulaCtx.fill();
    }

    nebulaCtx.globalCompositeOperation = 'source-over';
    const vignette = nebulaCtx.createRadialGradient(
      cssWidth * 0.5,
      cssHeight * 0.5,
      Math.min(cssWidth, cssHeight) * 0.15,
      cssWidth * 0.5,
      cssHeight * 0.5,
      Math.max(cssWidth, cssHeight) * 0.75
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
    nebulaCtx.fillStyle = vignette;
    nebulaCtx.fillRect(0, 0, cssWidth, cssHeight);
  }

  function buildStarDustLayer() {
    starDustCtx.clearRect(0, 0, cssWidth, cssHeight);
    const counts = currentCounts();
    for (let i = 0; i < counts.starDust; i++) {
      const x = Math.random() * cssWidth;
      const y = Math.random() * cssHeight;
      const radius = Math.pow(Math.random(), 2.1) * 1.5 + 0.12;
      const alpha = randomRange(0.2, 0.85);
      const tone = pickStarTone();
      starDustCtx.fillStyle = `rgba(${tone.r}, ${tone.g}, ${tone.b}, ${alpha})`;
      starDustCtx.beginPath();
      starDustCtx.arc(x, y, radius, 0, Math.PI * 2);
      starDustCtx.fill();
    }
  }

  function pickNebulaTint() {
    const choices = [
      { r: 14, g: 43, b: 114 },
      { r: 31, g: 79, b: 191 },
      { r: 11, g: 34, b: 82 },
      { r: 8, g: 24, b: 65 }
    ];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function pickStarTone() {
    const roll = Math.random();
    if (roll < 0.83) return { r: 222, g: 236, b: 255 };
    if (roll < 0.97) return { r: 170, g: 199, b: 255 };
    return { r: 255, g: 228, b: 184 };
  }

  function randomRange(min, max) {
    return min + (max - min) * Math.random();
  }

  function createDynamicStar() {
    return {
      x: randomRange(-spreadX, spreadX),
      y: randomRange(-spreadY, spreadY),
      z: randomRange(NEAR_Z, FAR_Z),
      size: randomRange(0.5, 1.55),
      hue: randomRange(205, 225),
      alpha: randomRange(0.5, 0.95),
      speedFactor: randomRange(0.7, 1.35)
    };
  }

  function createGlowObject() {
    return {
      x: randomRange(0, cssWidth),
      y: randomRange(0, cssHeight),
      radius: randomRange(Math.min(cssWidth, cssHeight) * 0.1, Math.min(cssWidth, cssHeight) * 0.22),
      alpha: randomRange(0.06, 0.16),
      hue: randomRange(208, 228),
      driftX: randomRange(-0.01, 0.01),
      driftY: randomRange(-0.01, 0.01),
      pulseRate: randomRange(0.00012, 0.00026),
      pulseOffset: Math.random() * Math.PI * 2
    };
  }

  function createTwinkleStar() {
    const tone = pickStarTone();
    return {
      x: randomRange(0, cssWidth),
      y: randomRange(0, cssHeight),
      radius: randomRange(0.35, 1.4),
      baseAlpha: randomRange(0.25, 0.75),
      amplitude: randomRange(0.06, 0.2),
      pulseRate: randomRange(0.002, 0.006),
      pulseOffset: Math.random() * Math.PI * 2,
      tone
    };
  }

  function projectStar(star, vanishingX, vanishingY, zValue) {
    const safeZ = Math.max(zValue, NEAR_Z);
    const scale = 1 / safeZ;
    return {
      x: vanishingX + star.x * scale,
      y: vanishingY + star.y * scale,
      radius: clamp(star.size * scale * 0.85, 0.25, 3.8),
      scale
    };
  }

  function drawGlowObjects(dt, timestamp) {
    glowObjects.forEach((glow) => {
      glow.x += glow.driftX * dt;
      glow.y += glow.driftY * dt;

      if (glow.x < -glow.radius) glow.x = cssWidth + glow.radius;
      if (glow.x > cssWidth + glow.radius) glow.x = -glow.radius;
      if (glow.y < -glow.radius) glow.y = cssHeight + glow.radius;
      if (glow.y > cssHeight + glow.radius) glow.y = -glow.radius;

      const pulse = 0.8 + Math.sin(timestamp * glow.pulseRate + glow.pulseOffset) * 0.2;
      const gradient = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.radius);
      gradient.addColorStop(0, `hsla(${glow.hue}, 80%, 68%, ${glow.alpha * pulse})`);
      gradient.addColorStop(0.45, `hsla(${glow.hue}, 75%, 56%, ${glow.alpha * 0.45 * pulse})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawTwinkleStars(timestamp) {
    twinkleStars.forEach((star) => {
      const twinkle = Math.sin(timestamp * star.pulseRate + star.pulseOffset);
      const alpha = clamp(star.baseAlpha + twinkle * star.amplitude, 0.06, 0.9);
      ctx.fillStyle = `rgba(${star.tone.r}, ${star.tone.g}, ${star.tone.b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawDynamicStars(dt, vanishingX, vanishingY) {
    const motionSpeed = MOTION_SPEED[motion] * (reducedMotion ? 0.65 : 1);
    const streaksEnabled = !reducedMotion;

    dynamicStars.forEach((star) => {
      const previousZ = star.z;
      star.z -= motionSpeed * star.speedFactor * dt;

      if (star.z <= NEAR_Z) {
        resetStar(star);
        return;
      }

      const currentProjection = projectStar(star, vanishingX, vanishingY, star.z);
      if (
        currentProjection.x < -80 ||
        currentProjection.x > cssWidth + 80 ||
        currentProjection.y < -80 ||
        currentProjection.y > cssHeight + 80
      ) {
        resetStar(star);
        return;
      }

      if (streaksEnabled && star.z < 0.38) {
        const previousProjection = projectStar(star, vanishingX, vanishingY, previousZ);
        const streakAlpha = clamp(star.alpha * ((0.4 - star.z) * 1.2), 0.05, 0.24);
        ctx.strokeStyle = `hsla(${star.hue}, 60%, 82%, ${streakAlpha})`;
        ctx.lineWidth = clamp(currentProjection.radius * 0.72, 0.3, 1.3);
        ctx.beginPath();
        ctx.moveTo(previousProjection.x, previousProjection.y);
        ctx.lineTo(currentProjection.x, currentProjection.y);
        ctx.stroke();
      }

      const starGradient = ctx.createRadialGradient(
        currentProjection.x,
        currentProjection.y,
        0,
        currentProjection.x,
        currentProjection.y,
        currentProjection.radius * 2.2
      );
      starGradient.addColorStop(0, `hsla(${star.hue}, 65%, 92%, ${star.alpha})`);
      starGradient.addColorStop(0.4, `hsla(${star.hue}, 60%, 82%, ${star.alpha * 0.62})`);
      starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = starGradient;
      ctx.beginPath();
      ctx.arc(currentProjection.x, currentProjection.y, currentProjection.radius * 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function resetStar(star) {
    star.x = randomRange(-spreadX, spreadX);
    star.y = randomRange(-spreadY, spreadY);
    star.z = FAR_Z;
    star.size = randomRange(0.5, 1.55);
    star.hue = randomRange(205, 225);
    star.alpha = randomRange(0.5, 0.95);
    star.speedFactor = randomRange(0.7, 1.35);
  }

  function drawScene(dt, timestamp) {
    const driftX = cssWidth * 0.018 * Math.sin(elapsedTime * 0.000035);
    const driftY = cssHeight * 0.014 * Math.cos(elapsedTime * 0.000028 + 0.75);
    const vanishingX = cssWidth * 0.5 + driftX;
    const vanishingY = cssHeight * 0.5 + driftY;

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.drawImage(nebulaLayer, 0, 0, cssWidth, cssHeight);
    ctx.drawImage(starDustLayer, 0, 0, cssWidth, cssHeight);
    drawGlowObjects(dt, timestamp);
    drawTwinkleStars(timestamp);
    drawDynamicStars(dt, vanishingX, vanishingY);
  }

  function animate(timestamp) {
    if (!running) return;
    const dt = clamp(timestamp - lastTimestamp, 0, MAX_DT);
    lastTimestamp = timestamp;
    elapsedTime += dt;
    drawScene(dt, timestamp);
    rafId = requestAnimationFrame(animate);
  }
});
