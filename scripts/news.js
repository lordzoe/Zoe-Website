// News Page Interactions

function isNewsMobileViewport() {
  return window.matchMedia('(max-width: 600px)').matches;
}

function isElementMostlyVisible(element, minimumRatio = 0.25) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.width <= 0 || rect.height <= 0) return false;

  const visibleX = Math.max(0, Math.min(rect.right, viewWidth) - Math.max(rect.left, 0));
  const visibleY = Math.max(0, Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0));
  const visibleArea = visibleX * visibleY;
  const totalArea = rect.width * rect.height;

  return totalArea > 0 && visibleArea / totalArea >= minimumRatio;
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

function pauseInlineCardVideo(video) {
  if (!video || video.paused) return;
  video.pause();
}

// News Expanded Box Overlay
const contentCache = {};
const inFlightContentFetches = new Map();
let overlayMediaObserver = null;
let cardVideoObserver = null;

function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  return new Promise((resolve, reject) => {
    const attemptFetch = (n) => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => resolve(data))
        .catch((error) => {
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

function fetchContentHtml(contentFile, retries = 3, backoff = 500) {
  if (contentCache[contentFile]) {
    return Promise.resolve(contentCache[contentFile]);
  }

  if (inFlightContentFetches.has(contentFile)) {
    return inFlightContentFetches.get(contentFile);
  }

  const request = fetchWithRetry(contentFile, {}, retries, backoff)
    .then((html) => {
      contentCache[contentFile] = html;
      return html;
    })
    .finally(() => {
      inFlightContentFetches.delete(contentFile);
    });

  inFlightContentFetches.set(contentFile, request);
  return request;
}

function disconnectOverlayMediaObserver() {
  if (!overlayMediaObserver) return;
  overlayMediaObserver.disconnect();
  overlayMediaObserver = null;
}

function hydrateOverlayImage(image) {
  if (!image) return;
  const deferredSrc = image.getAttribute('data-src');
  if (!deferredSrc) return;
  image.src = deferredSrc;
  image.removeAttribute('data-src');
}

function hydrateOverlayVideo(video) {
  if (!video) return;

  let requiresLoad = false;
  const deferredVideoSrc = video.getAttribute('data-src');
  if (deferredVideoSrc) {
    video.src = deferredVideoSrc;
    video.removeAttribute('data-src');
    requiresLoad = true;
  }

  video.querySelectorAll('source[data-src]').forEach((source) => {
    source.src = source.getAttribute('data-src');
    source.removeAttribute('data-src');
    requiresLoad = true;
  });

  if (requiresLoad) {
    video.load();
  }
}

function playOverlayVideo(video) {
  if (!video) return;
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

function pauseOverlayVideo(video) {
  if (!video || video.paused) return;
  video.pause();
}

function normalizeOverlayMediaMarkup(doc) {
  const media = doc.querySelector('.image-mosaic');
  if (!media) return '';

  media.querySelectorAll('img').forEach((image) => {
    const src = image.getAttribute('src');
    if (src) {
      image.setAttribute('data-src', src);
      image.removeAttribute('src');
    }
    image.classList.add('lazyload');
    image.setAttribute('loading', 'lazy');
    image.setAttribute('decoding', 'async');
  });

  media.querySelectorAll('video').forEach((video) => {
    const src = video.getAttribute('src');
    if (src) {
      video.setAttribute('data-src', src);
      video.removeAttribute('src');
    }
    video.setAttribute('preload', 'none');
    video.querySelectorAll('source').forEach((source) => {
      const sourceSrc = source.getAttribute('src');
      if (!sourceSrc) return;
      source.setAttribute('data-src', sourceSrc);
      source.removeAttribute('src');
    });
  });

  return media.outerHTML;
}

function initializeOverlayMediaLazyLoading(scope) {
  const targetScope = scope || document;
  const overlayMedia = Array.from(targetScope.querySelectorAll(
    '.overlay-image img[data-src], .overlay-image video, .image-mosaic img[data-src], .image-mosaic video'
  ));

  if (!overlayMedia.length) return;
  disconnectOverlayMediaObserver();

  if (!('IntersectionObserver' in window)) {
    overlayMedia.forEach((element) => {
      if (element.tagName === 'IMG') {
        hydrateOverlayImage(element);
      } else if (element.tagName === 'VIDEO') {
        hydrateOverlayVideo(element);
        playOverlayVideo(element);
      }
    });
    return;
  }

  overlayMediaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      if (entry.isIntersecting) {
        if (element.tagName === 'IMG') {
          hydrateOverlayImage(element);
          overlayMediaObserver.unobserve(element);
          return;
        }

        if (element.tagName === 'VIDEO') {
          hydrateOverlayVideo(element);
          playOverlayVideo(element);
        }
        return;
      }

      if (element.tagName === 'VIDEO') {
        pauseOverlayVideo(element);
      }
    });
  }, { root: null, rootMargin: '150px 0px', threshold: 0.2 });

  overlayMedia.forEach((element) => {
    overlayMediaObserver.observe(element);
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

  initializeOverlayMediaLazyLoading(overlayContent);

  function renderContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraph = doc.querySelector('p')?.outerHTML || '<p>No text available.</p>';
    const media = normalizeOverlayMediaMarkup(doc);

    const details = overlayContent.querySelector('.overlay-details');
    if (!details) return;

    details.innerHTML = `
          ${paragraph}
          <div class="image-placeholder">${media}</div>
      `;

    initializeOverlayMediaLazyLoading(overlayContent);
  }

  fetchContentHtml(contentFile, 3, 500)
    .then((html) => {
      renderContent(html);
      initializeMediaPlayers();
    })
    .catch((error) => {
      console.error('Error fetching content:', error);
      const details = overlayContent.querySelector('.overlay-details');
      if (details) {
        details.innerHTML = '<p>Sorry, the content could not be loaded.</p>';
      }
    });
}

function closeBox() {
  const overlay = document.getElementById('expanded-overlay');
  const overlayContent = document.getElementById('expanded-box-content');
  if (!overlay || !overlayContent) return;

  disconnectOverlayMediaObserver();
  overlayContent.querySelectorAll('video').forEach((video) => {
    pauseOverlayVideo(video);
  });
  overlay.classList.remove('active');
  overlayContent.innerHTML = '';
  document.body.classList.remove('no-scroll-content');
}

function observeCardVideo(video) {
  if (!video) return;
  if (cardVideoObserver) {
    cardVideoObserver.observe(video);
    return;
  }
  primeInlineCardVideo(video);
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('expanded-overlay');
  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target.id === 'expanded-overlay') {
        closeBox();
      }
    });
  }

  const contentBoxes = document.querySelectorAll('.content-box');
  const prefetchedContent = new Set();
  contentBoxes.forEach((box) => {
    const contentFile = box.getAttribute('data-content');
    if (!contentFile) return;

    box.addEventListener('mouseenter', () => {
      if (prefetchedContent.has(contentFile) || contentCache[contentFile]) return;
      prefetchedContent.add(contentFile);
      fetchContentHtml(contentFile, 2, 500).catch((error) => {
        console.error('Error preloading content:', error);
      });
    });
  });

  const videos = document.querySelectorAll('.content-image video');
  if (!videos.length) return;

  if ('IntersectionObserver' in window) {
    cardVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          primeInlineCardVideo(video);
        } else {
          pauseInlineCardVideo(video);
        }
      });
    }, { root: null, threshold: 0.35 });

    videos.forEach((video) => {
      cardVideoObserver.observe(video);
    });
    return;
  }

  videos.forEach((video) => {
    primeInlineCardVideo(video);
  });
});

document.addEventListener('lazybeforeunveil', (event) => {
  const target = event.target;
  if (target.tagName !== 'VIDEO') return;

  const deferredVideoSrc = target.getAttribute('data-src');
  if (deferredVideoSrc) {
    target.src = deferredVideoSrc;
    target.removeAttribute('data-src');
  }

  target.querySelectorAll('source').forEach((source) => {
    const sourceSrc = source.getAttribute('data-src');
    if (!sourceSrc) return;
    source.src = sourceSrc;
    source.removeAttribute('data-src');
  });

  target.load();
  observeCardVideo(target);
  target.addEventListener('loadeddata', () => {
    if (isElementMostlyVisible(target)) {
      primeInlineCardVideo(target);
    }
  }, { once: true });
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

  document.addEventListener('click', (event) => {
    const el = event.target;
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
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const endX = touch.pageX;
    const endY = touch.pageY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      if (diffX < 0) {
        if (currentMediaIndex !== null) {
          showMediaAtIndex(currentMediaIndex + 1);
        }
      } else if (currentMediaIndex !== null) {
        showMediaAtIndex(currentMediaIndex - 1);
      }
    } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > swipeThreshold) {
      if (diffY > 0) {
        closeLightbox();
      }
    }
  }, { passive: true });
});
