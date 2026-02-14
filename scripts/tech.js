// Tech skills page interactions

function moveGallery(button, direction) {
  const gallery = button.closest('.tech-gallery');
  if (!gallery) return;

  const galleryItems = gallery.querySelector('.gallery-items');
  if (!galleryItems) return;

  const items = Array.from(galleryItems.children);
  const totalItems = items.length;

  let currentIndex = parseInt(galleryItems.dataset.currentIndex ?? '0');

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  galleryItems.dataset.currentIndex = currentIndex;

  const itemWidth = gallery.offsetWidth;
  const newOffset = -(itemWidth * currentIndex);
  galleryItems.style.transition = 'transform 0.5s ease-in-out';
  galleryItems.style.transform = `translateX(${newOffset}px)`;
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
});
