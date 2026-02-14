// Tech skills page interactions

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

  // Ensure we start on a clean snap point before moving.
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

// Tech Content Animation

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.tech-content');
  if (!sections.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const galleryVideos = document.querySelectorAll('.tech-gallery video');
  galleryVideos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  });

  const galleries = document.querySelectorAll('.tech-gallery');

  function initGallery(gallery) {
    const container = gallery.querySelector('.gallery-items');
    if (!container) return;
    const slides = getSlides(container);
    if (slides.length <= 1) return;

    // Snap to the first slide on init.
    container.scrollLeft = 0;
    snapContainer(container);

    slides.forEach((slide) => {
      if (slide.tagName === 'IMG') {
        if (!slide.complete) {
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
      const observer = new ResizeObserver(() => {
        snapContainer(container);
      });
      observer.observe(container);
    }
  }

  galleries.forEach((gallery) => initGallery(gallery));

  function configureMlDemoLink() {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const demoContainers = document.querySelectorAll('[onclick*="expandDemoBox"]');
    const demoLinks = document.querySelectorAll('a[onclick*="expandDemoBox"]');

    if (isMobile) {
      demoContainers.forEach((el) => el.removeAttribute('onclick'));
      demoLinks.forEach((link) => {
        link.removeAttribute('onclick');
        link.setAttribute('href', 'ml_demo.html');
      });
    }
  }

  configureMlDemoLink();
  window.addEventListener('resize', configureMlDemoLink);
  window.addEventListener('orientationchange', configureMlDemoLink);
});
