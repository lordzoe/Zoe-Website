// Autoplay Loop for Videos
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".content-image video");

  videos.forEach((video) => {
    video.muted = true; 
    video.playsInline = true; 
    video.loop = true; 
    video.autoplay = true; 
    video.play().catch((error) => {
      console.error("Autoplay failed on mobile:", error);
    });
  });
});

// Orbs Animation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('orb-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

// News Expanded Box Overlay
const contentCache = {};

function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (n) => {
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => resolve(data))
                .catch(error => {
                    if (n > 0) {
                        console.warn(`Fetch failed. Retrying in ${backoff}ms... (${n} retries left)`);
                        setTimeout(() => attemptFetch(n - 1), backoff);
                    } else {
                        reject(error);
                    }
                });
        };
        attemptFetch(retries);
    });
}

function expandBox(box) {
  const contentFile = box.getAttribute('data-content');
  if (!contentFile) {
      console.error('No data-content attribute found for this content-box.');
      return;
  }

  const mainImageHtml = box.querySelector('.content-image').innerHTML;
  const overlay = document.getElementById('expanded-overlay');
  const overlayContent = document.getElementById('expanded-box-content');

  overlay.classList.add('active');
  document.body.classList.add('no-scroll-content');

  overlayContent.innerHTML = `
      <div class="overlay-image">${mainImageHtml}</div>
      <div class="overlay-details">
          <p>Loading paragraph...</p>
          <div class="image-placeholder">Loading images...</div>
      </div>
      <span class="expanded-close" onclick="closeBox()">×</span>
  `;

  if (contentCache[contentFile]) {
      renderContent(contentCache[contentFile]);
      initializeMediaPlayers();
      return;
  }

  fetchWithRetry(contentFile, {}, 3, 500)
      .then(html => {
          contentCache[contentFile] = html;
          renderContent(html);
          initializeMediaPlayers();
      })
      .catch(error => {
          console.error('Error fetching content:', error);
          overlayContent.querySelector('.overlay-details').innerHTML = '<p>Sorry, the content could not be loaded.</p>';
      });

  function renderContent(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const paragraph = doc.querySelector('p')?.outerHTML || '<p>No text available.</p>';
      const media = doc.querySelector('.image-mosaic')?.outerHTML || '';

      overlayContent.querySelector('.overlay-details').innerHTML = `
          ${paragraph}
          <div class="image-placeholder">${media}</div>
      `;
  }
}


function closeBox() {
    const overlay = document.getElementById('expanded-overlay');
    const overlayContent = document.getElementById('expanded-box-content');

    overlay.classList.remove('active');
    overlayContent.innerHTML = '';
    document.body.classList.remove('no-scroll-content');
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function loadVisibleOverlayImages() {
    const expandedContent = document.querySelector('.expanded-overlay.active #expanded-box-content');
    if (!expandedContent) return;

    const lazyElements = expandedContent.querySelectorAll('img[data-src], video[data-src]');

    lazyElements.forEach(element => {
        if (element.tagName === 'IMG') {
            element.src = element.getAttribute('data-src');
        } else if (element.tagName === 'VIDEO') {
            const source = element.querySelector('source');
            if (source) {
                source.src = source.getAttribute('data-src');
                element.load();
            }
        }
        element.removeAttribute('data-src');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('expanded-overlay');
    
    overlay.addEventListener('click', (e) => {
        if (e.target.id === 'expanded-overlay') {
            closeBox();
        }
    });

    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        const contentFile = box.getAttribute('data-content');
        if (contentFile && !contentCache[contentFile]) {
            box.addEventListener('mouseenter', () => {
                fetchWithRetry(contentFile, {}, 2, 500)
                    .then(html => {
                        contentCache[contentFile] = html;
                    })
                    .catch(error => {
                        console.error('Error preloading content:', error);
                    });
            });
        }
    });

    window.addEventListener('scroll', debounce(() => {
        loadVisibleOverlayImages();
    }, 300));
});

document.addEventListener('lazybeforeunveil', function(e){
    const target = e.target;

    if(target.tagName === 'VIDEO'){
        const sources = target.querySelectorAll('source');
        sources.forEach(source => {
            if(source.dataset.src){
                source.src = source.getAttribute('data-src');
            }
        });
        target.load();
    }
});

function initializeMediaPlayers() {
}

// News Image Lightbox
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxContent = document.getElementById('lightbox-content');
  const prevArrow = document.getElementById('lightbox-prev');
  const nextArrow = document.getElementById('lightbox-next');

  let currentMediaIndex = null;
  let currentMediaItems = [];
  let currentMediaElement = null;

  let startX = 0;
  let startY = 0;
  const swipeThreshold = 50;

  function closeLightbox() {
    if (currentMediaElement && currentMediaElement.tagName === 'VIDEO') {
      currentMediaElement.pause();
      currentMediaElement.currentTime = 0;
    }
    lightbox.classList.remove('active');
    lightboxContent.innerHTML = '';
    currentMediaIndex = null;
    currentMediaItems = [];
    currentMediaElement = null;
    document.body.classList.remove('no-scroll-lightbox');
  }

  function showMediaAtIndex(index) {
    document.body.classList.add('no-scroll-lightbox');

    if (index < 0) {
      index = currentMediaItems.length - 1;
    } else if (index >= currentMediaItems.length) {
      index = 0;
    }

    lightboxContent.innerHTML = '';
    const el = currentMediaItems[index];
    let elementToShow;

    if (el.tagName === 'VIDEO') {
      const videoSrc = el.querySelector('source') ? el.querySelector('source').src : el.src;
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.style.maxWidth = '80vw';
      video.style.maxHeight = '80vh';
      elementToShow = video;
    } else if (el.tagName === 'IMG') {
      const img = document.createElement('img');
      img.src = el.src;
      img.style.maxWidth = '80vw';
      img.style.maxHeight = '80vh';
      img.style.objectFit = 'contain';
      elementToShow = img;
    }

    lightboxContent.appendChild(elementToShow);
    currentMediaElement = elementToShow;
    currentMediaIndex = index;
  }

  document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.closest('.image-mosaic img, .image-mosaic video')) {
      const mosaic = el.closest('.image-mosaic');
      currentMediaItems = Array.from(mosaic.querySelectorAll('img, video'));
      const clickedIndex = currentMediaItems.indexOf(el);
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll-lightbox');
      showMediaAtIndex(clickedIndex);
    }
  });

  prevArrow.addEventListener('click', () => {
    if (currentMediaIndex !== null) {
      showMediaAtIndex(currentMediaIndex - 1);
    }
  });

  nextArrow.addEventListener('click', () => {
    if (currentMediaIndex !== null) {
      showMediaAtIndex(currentMediaIndex + 1);
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.pageX;
    const endY = touch.pageY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      if (diffX < 0) {
        if (currentMediaIndex !== null) {
          showMediaAtIndex(currentMediaIndex + 1);
        }
      } else {
        if (currentMediaIndex !== null) {
          showMediaAtIndex(currentMediaIndex - 1);
        }
      }
    } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > swipeThreshold) {
      if (diffY > 0) {
        closeLightbox();
      }
    }
  }, { passive: true });
});

// Navbar Banner
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("navbar-banner");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      banner.classList.add("hidden");
    } else {
      banner.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  });
});

// Tech Gallery
function moveGallery(button, direction) {
  const gallery = button.closest('.tech-gallery');
  const galleryItems = gallery.querySelector('.gallery-items');
  const items = Array.from(galleryItems.children);
  const totalItems = items.length;

  let currentIndex = parseInt(galleryItems.dataset.currentIndex ?? "0");

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  galleryItems.dataset.currentIndex = currentIndex;

  const itemWidth = gallery.offsetWidth;
  const newOffset = -(itemWidth * currentIndex);
  galleryItems.style.transition = "transform 0.5s ease-in-out";
  galleryItems.style.transform = `translateX(${newOffset}px)`;
}

// Tech Content Animation
document.addEventListener("DOMContentLoaded", function () {
const sections = document.querySelectorAll(".tech-content");

const observerOptions = {
  root: null, 
  threshold: 0.3, 
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});
});

// Homepage Delay Animation
document.addEventListener("DOMContentLoaded", () => {
  const indexContent = document.querySelector(".index-content");
  setTimeout(() => {
    indexContent.classList.add("with-image");
  }, 3000);
});



