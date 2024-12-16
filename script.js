// Orbs Animation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('orb-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const orbs = [];
  const numOrbs = 150; // Total number of orbs
  const maxOrbRadius = 8; // Maximum size for orbs
  const fadeDistance = 50; // Distance near edges where orbs fade

  // Initialize orbs
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
        // Move orb
        orb.x += Math.cos(orb.angle) * orb.speed;
        orb.y += Math.sin(orb.angle) * orb.speed;

        // Calculate distance from center of the screen
        const distanceFromCenter = Math.sqrt(
            Math.pow(orb.x - centerX, 2) + Math.pow(orb.y - centerY, 2)
        );

        // Determine the maximum orb size based on distance (closer to center = larger size)
        const maxPerspectiveSize = Math.max(
            maxOrbRadius * (1 - (distanceFromCenter / (canvas.width * 0.6))), // Adjust perspective scale
            1.5 // Minimum size
        );

        orb.radius = Math.min(orb.radius + orb.growth, maxPerspectiveSize);

        // Fade near edges
        const fadeX = Math.min(orb.x, canvas.width - orb.x);
        const fadeY = Math.min(orb.y, canvas.height - orb.y);
        const distanceToEdge = Math.min(fadeX, fadeY);
        orb.opacity = Math.max(0, distanceToEdge / fadeDistance);

        // Draw orb
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

        // Reset orb if it fades out
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

  // Responsive canvas resizing
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      orbs.length = 0;
      createOrbs();
  });

  createOrbs();
  animateOrbs();
});

// Menu Icon Toggle
const menuIcon = document.getElementById('menu-icon');
const fullscreenNav = document.getElementById('fullscreen-nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  fullscreenNav.classList.toggle('active');
});


function expandBox(box) {
  document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
  box.classList.add('expanded');
  document.querySelector('.blur-overlay').classList.add('active');
}

function closeBox() {
  document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
  document.querySelector('.blur-overlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // Get the lightbox elements
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Get all mosaic images
  const mosaicImages = document.querySelectorAll('.image-mosaic img');

  // Add click event to each mosaic image to open the lightbox
  mosaicImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src; // Set the clicked image URL
      lightbox.classList.add('active');
    });
  });

  // Close the lightbox when clicking on the close button
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Optional: Close the lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
});
