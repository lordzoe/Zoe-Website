// Tech Skills Page Interactions

function isTechMobileViewport() {
  return window.matchMedia('(max-width: 900px)').matches;
}

function isElementMostlyVisible(element, minimumRatio = 0.35) {
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

function prepareTechGalleryVideo(video) {
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.autoplay = true;
  video.controls = false;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('autoplay', '');
}

function playTechGalleryVideo(video) {
  if (!video) return;
  prepareTechGalleryVideo(video);
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

function pauseTechGalleryVideo(video) {
  if (!video || video.paused) return;
  video.pause();
}

function hydrateDeferredImage(image) {
  if (!image) return;
  const deferredSrc = image.getAttribute('data-src');
  if (!deferredSrc) return;
  image.src = deferredSrc;
  image.removeAttribute('data-src');
}

function hydrateDeferredVideo(video) {
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

function hydrateDeferredGalleryMedia(gallery) {
  if (!gallery) return;
  gallery.querySelectorAll('img[data-src]').forEach((image) => {
    hydrateDeferredImage(image);
  });
  gallery.querySelectorAll('video').forEach((video) => {
    hydrateDeferredVideo(video);
  });
}

function applyDeferredBackground(section) {
  if (!section) return;
  const deferredBackground = section.getAttribute('data-bg-src');
  if (!deferredBackground) return;
  section.style.backgroundImage = `url('${deferredBackground}')`;
  section.removeAttribute('data-bg-src');
}

function getSlides(container) {
  return Array.from(container.querySelectorAll(':scope > img, :scope > video'));
}

function snapContainer(container) {
  const width = container.clientWidth;
  if (!width) return;
  const index = Math.round(container.scrollLeft / width);
  container.scrollLeft = index * width;
}

function moveGallery(button, direction) {
  const gallery = button.closest('.tech-gallery');
  if (!gallery) return;

  const container = gallery.querySelector('.gallery-items');
  if (!container) return;

  const slides = getSlides(container);
  if (slides.length <= 1) return;

  snapContainer(container);

  const width = container.clientWidth;
  if (!width) return;
  const currentIndex = Math.round(container.scrollLeft / width);
  let nextIndex = currentIndex + direction;

  if (nextIndex < 0) {
    nextIndex = slides.length - 1;
  } else if (nextIndex >= slides.length) {
    nextIndex = 0;
  }

  if (nextIndex < 0) {
    nextIndex = slides.length - 1;
    container.scrollTo({ left: nextIndex * width, behavior: 'auto' });
    return;
  }

  if (nextIndex >= slides.length) {
    nextIndex = 0;
    container.scrollTo({ left: 0, behavior: 'auto' });
    return;
  }

  container.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
}

function expandDemoBox(url) {
  const overlay = document.getElementById('expanded-overlay');
  const content = document.getElementById('expanded-box-content');
  if (!overlay || !content) return;

  content.innerHTML = '';
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Loading...';
  content.appendChild(loading);

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.frameBorder = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.display = 'none';
  content.appendChild(iframe);

  iframe.addEventListener('load', () => {
    loading.remove();
    iframe.style.display = 'block';
  }, { once: true });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDemoBox() {
  const overlay = document.getElementById('expanded-overlay');
  const content = document.getElementById('expanded-box-content');
  if (!overlay || !content) return;

  overlay.classList.remove('active');
  content.innerHTML = '';
  document.body.style.overflow = '';
}

window.expandDemoBox = expandDemoBox;
window.closeDemoBox = closeDemoBox;

document.addEventListener('DOMContentLoaded', () => {
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  const sections = document.querySelectorAll('.tech-content');
  const galleries = document.querySelectorAll('.tech-gallery');
  const deferredBackgroundSections = document.querySelectorAll('.tech-section[data-bg-src]');
  const galleryVideos = document.querySelectorAll('.tech-gallery video');

  if (sections.length) {
    if (supportsIntersectionObserver) {
      const animationObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        });
      }, { root: null, threshold: 0.3 });
      sections.forEach((section) => animationObserver.observe(section));
    } else {
      sections.forEach((section) => section.classList.add('animate'));
    }
  }

  function initGallery(gallery) {
    const container = gallery.querySelector('.gallery-items');
    if (!container) return;

    const slides = getSlides(container);
    if (slides.length <= 1) return;

    container.scrollLeft = 0;
    snapContainer(container);

    slides.forEach((slide) => {
      if (slide.tagName === 'IMG') {
        if (slide.getAttribute('data-src') || !slide.complete) {
          slide.addEventListener('load', () => snapContainer(container), { once: true });
        }
      } else if (slide.tagName === 'VIDEO') {
        if (slide.readyState >= 1) {
          snapContainer(container);
        } else {
          slide.addEventListener('loadedmetadata', () => snapContainer(container), { once: true });
          slide.addEventListener('loadeddata', () => snapContainer(container), { once: true });
        }
      }
    });

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        snapContainer(container);
      });
      resizeObserver.observe(container);
    }
  }

  galleries.forEach((gallery) => initGallery(gallery));

  if (supportsIntersectionObserver) {
    const backgroundObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        applyDeferredBackground(entry.target);
        obs.unobserve(entry.target);
      });
    }, { root: null, rootMargin: '300px 0px', threshold: 0.01 });

    deferredBackgroundSections.forEach((section) => {
      backgroundObserver.observe(section);
    });

    const galleryHydrationObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        hydrateDeferredGalleryMedia(entry.target);
        obs.unobserve(entry.target);
      });
    }, { root: null, rootMargin: '250px 0px', threshold: 0.05 });

    galleries.forEach((gallery) => {
      galleryHydrationObserver.observe(gallery);
    });

    const videoPlaybackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          hydrateDeferredVideo(video);
          playTechGalleryVideo(video);
          return;
        }
        pauseTechGalleryVideo(video);
      });
    }, { root: null, threshold: 0.35 });

    galleryVideos.forEach((video) => {
      videoPlaybackObserver.observe(video);
    });
  } else {
    deferredBackgroundSections.forEach((section) => applyDeferredBackground(section));
    galleries.forEach((gallery) => hydrateDeferredGalleryMedia(gallery));
    galleryVideos.forEach((video) => playTechGalleryVideo(video));
  }

  function configureMlDemoLink() {
    const isMobile = isTechMobileViewport();
    const demoContainers = document.querySelectorAll('.tech-media.ml-demo-trigger');
    const demoLinks = document.querySelectorAll('a.ml-demo-trigger');

    if (isMobile) {
      demoContainers.forEach((element) => {
        element.removeAttribute('onclick');
      });
      demoLinks.forEach((link) => {
        link.removeAttribute('onclick');
        link.setAttribute('href', 'ml_demo.html');
      });
      return;
    }

    demoContainers.forEach((element) => {
      element.setAttribute('onclick', "expandDemoBox('ml_demo.html')");
    });
    demoLinks.forEach((link) => {
      link.setAttribute('href', 'javascript:void(0)');
      link.setAttribute('onclick', "expandDemoBox('ml_demo.html')");
    });
  }

  configureMlDemoLink();
  window.addEventListener('resize', configureMlDemoLink);
  window.addEventListener('orientationchange', configureMlDemoLink);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      galleryVideos.forEach((video) => pauseTechGalleryVideo(video));
      return;
    }
    galleryVideos.forEach((video) => {
      if (isElementMostlyVisible(video)) {
        playTechGalleryVideo(video);
      }
    });
  });

  const overlay = document.getElementById('expanded-overlay');
  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target.id === 'expanded-overlay') {
        closeDemoBox();
      }
    });
  }
});
