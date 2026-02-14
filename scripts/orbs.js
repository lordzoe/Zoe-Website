// Orbs animation background

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let lastWidth = window.innerWidth;
  let lastHeight = window.innerHeight;
  canvas.width = lastWidth;
  canvas.height = lastHeight;

  const orbs = [];
  const numOrbs = 150;
  const maxOrbRadius = 8;
  const fadeDistance = 50;

  function createOrbs() {
    for (let i = 0; i < numOrbs; i++) {
      const distance = Math.random() * canvas.width * 0.5;
      const angle = Math.random() * Math.PI * 2;
      orbs.push({
        x: canvas.width / 2 + Math.cos(angle) * distance,
        y: canvas.height / 2 + Math.sin(angle) * distance,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        angle: angle,
        growth: Math.random() * 0.02 + 0.005,
        opacity: 1
      });
    }
  }

  function animateOrbs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    orbs.forEach((orb, index) => {
      orb.x += Math.cos(orb.angle) * orb.speed;
      orb.y += Math.sin(orb.angle) * orb.speed;

      const distanceFromCenter = Math.sqrt(
        Math.pow(orb.x - centerX, 2) + Math.pow(orb.y - centerY, 2)
      );

      const maxPerspectiveSize = Math.max(
        maxOrbRadius * (1 - (distanceFromCenter / (canvas.width * 0.6))),
        1.5
      );

      orb.radius = Math.min(orb.radius + orb.growth, maxPerspectiveSize);

      const fadeX = Math.min(orb.x, canvas.width - orb.x);
      const fadeY = Math.min(orb.y, canvas.height - orb.y);
      const distanceToEdge = Math.min(fadeX, fadeY);
      orb.opacity = Math.max(0, distanceToEdge / fadeDistance);

      ctx.save();
      ctx.globalAlpha = orb.opacity;
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;

      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (orb.opacity <= 0) {
        const distance = Math.random() * canvas.width * 0.5;
        const angle = Math.random() * Math.PI * 2;
        orbs[index] = {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.3 + 0.1,
          angle: angle,
          growth: Math.random() * 0.02 + 0.005,
          opacity: 1
        };
      }
    });

    requestAnimationFrame(animateOrbs);
  }

  function handleResize(force = false) {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const widthDelta = Math.abs(nextWidth - lastWidth);
    const heightDelta = Math.abs(nextHeight - lastHeight);

    // Ignore small viewport changes (mobile address bar) to prevent resets.
    if (!force && widthDelta < 80 && heightDelta < 80) {
      return;
    }

    const scaleX = lastWidth ? nextWidth / lastWidth : 1;
    const scaleY = lastHeight ? nextHeight / lastHeight : 1;

    canvas.width = nextWidth;
    canvas.height = nextHeight;

    if (Number.isFinite(scaleX) && Number.isFinite(scaleY)) {
      orbs.forEach((orb) => {
        orb.x *= scaleX;
        orb.y *= scaleY;
      });
    }

    lastWidth = nextWidth;
    lastHeight = nextHeight;
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => handleResize(false), 150);
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => handleResize(true), 150);
  });

  createOrbs();
  animateOrbs();
});
