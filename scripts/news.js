// News page interactions

function isNewsMobileViewport() {
  return window.matchMedia('(max-width: 600px)').matches;
}

function primeInlineCardVideo(video) {
  if (!video || !isNewsMobileViewport()) return;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.autoplay = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('autoplay', '');
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.content-image video');
  if (!videos.length) return;

  videos.forEach((video) => {
    primeInlineCardVideo(video);
  });
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

  const overlay = document.getElementById('expanded-overlay');
  const overlayContent = document.getElementById('expanded-box-content');
  if (!overlay || !overlayContent) return;

  const mainImageHtml = box.querySelector('.content-image')?.innerHTML ?? '';

  overlay.classList.add('active');
  document.body.classList.add('no-scroll-content');

  overlayContent.innerHTML = `
      <div class="overlay-image">${mainImageHtml}</div>
      <div class="overlay-details">
          <p>Loading paragraph...</p>
          <div class="image-placeholder">Loading images...</div>
      </div>
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
      const details = overlayContent.querySelector('.overlay-details');
      if (details) {
        details.innerHTML = '<p>Sorry, the content could not be loaded.</p>';
      }
    });

  function renderContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraph = doc.querySelector('p')?.outerHTML || '<p>No text available.</p>';
    const media = doc.querySelector('.image-mosaic')?.outerHTML || '';

    const details = overlayContent.querySelector('.overlay-details');
    if (!details) return;

    details.innerHTML = `
          ${paragraph}
          <div class="image-placeholder">${media}</div>
      `;
  }
}

function closeBox() {
  const overlay = document.getElementById('expanded-overlay');
  const overlayContent = document.getElementById('expanded-box-content');
  if (!overlay || !overlayContent) return;

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
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target.id === 'expanded-overlay') {
        closeBox();
      }
    });
  }

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

document.addEventListener('lazybeforeunveil', function(e) {
  const target = e.target;

  if (target.tagName === 'VIDEO') {
    const sources = target.querySelectorAll('source');
    sources.forEach(source => {
      if (source.dataset.src) {
        source.src = source.getAttribute('data-src');
      }
    });
    target.load();
    target.addEventListener('loadeddata', () => {
      primeInlineCardVideo(target);
    }, { once: true });
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

  if (!lightbox || !lightboxClose || !lightboxContent || !prevArrow || !nextArrow) return;

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
