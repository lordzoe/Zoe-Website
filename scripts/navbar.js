// Navbar menu toggle + banner scroll behavior

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const fullscreenNav = document.getElementById('fullscreen-nav');

  if (menuIcon && fullscreenNav) {
    menuIcon.addEventListener('click', () => {
      const isActive = menuIcon.classList.toggle('active');
      fullscreenNav.classList.toggle('active', isActive);
      document.body.classList.toggle('nav-open', isActive);
      document.documentElement.classList.toggle('nav-open', isActive);
    });
  }

  const banner = document.getElementById('navbar-banner');
  if (banner) {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        banner.classList.add('hidden');
      } else {
        banner.classList.remove('hidden');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
});
