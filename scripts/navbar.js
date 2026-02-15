// Navbar menu toggle + banner scroll behavior

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const fullscreenNav = document.getElementById('fullscreen-nav');
  let lockedScrollY = 0;

  if (menuIcon && fullscreenNav) {
    menuIcon.addEventListener('click', () => {
      const isActive = menuIcon.classList.toggle('active');
      fullscreenNav.classList.toggle('active', isActive);
      if (isActive) {
        lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.style.setProperty('--scroll-lock-top', `-${lockedScrollY}px`);
        document.body.classList.add('nav-open');
        document.documentElement.classList.add('nav-open');
        if (document.body.classList.contains('nav-scroll-override') && window.matchMedia('(min-width: 601px)').matches) {
          document.documentElement.classList.add('nav-hide-scroll');
        }
      } else {
        document.body.classList.remove('nav-open');
        document.documentElement.classList.remove('nav-open');
        document.documentElement.classList.remove('nav-hide-scroll');
        document.documentElement.style.removeProperty('--scroll-lock-top');
        window.scrollTo(0, lockedScrollY);
      }
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
