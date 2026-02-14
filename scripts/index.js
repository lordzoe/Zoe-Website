// Homepage delayed image fade-in

document.addEventListener('DOMContentLoaded', () => {
  const indexContent = document.querySelector('.index-content');
  if (!indexContent) return;

  setTimeout(() => {
    indexContent.classList.add('with-image');
  }, 3000);
});
