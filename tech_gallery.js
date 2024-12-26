function moveGallery(button, direction) {
    const gallery = button.closest('.tech-gallery').querySelector('.gallery-items');
    const items = gallery.children;
    const totalItems = items.length;

    // Calculate current index
    let currentIndex = Array.from(items).findIndex((item) => item.style.transform === 'translateX(0%)' || item.style.transform === '');

    if (currentIndex === -1) {
        currentIndex = 0;
    }

    // Calculate next index
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) {
        nextIndex = totalItems - 1; // Wrap to the last item
    } else if (nextIndex >= totalItems) {
        nextIndex = 0; // Wrap to the first item
    }

    // Reset all items
    Array.from(items).forEach((item, index) => {
        item.style.transform = `translateX(${(index - nextIndex) * 100}%)`;
    });

    gallery.style.transform = `translateX(${-nextIndex * 100}%)`;
}
