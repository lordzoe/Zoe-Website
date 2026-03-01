// Navbar menu toggle + banner scroll behavior

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const fullscreenNav = document.getElementById('fullscreen-nav');
  let lockedScrollY = 0;
  let closeUnlockTimer = null;
  let closeUnlockToken = 0;

  if (menuIcon && fullscreenNav) {
    const clearPendingCloseUnlock = () => {
      closeUnlockToken += 1;
      if (closeUnlockTimer !== null) {
        window.clearTimeout(closeUnlockTimer);
        closeUnlockTimer = null;
      }
    };

    const applyScrollLock = () => {
      document.documentElement.style.setProperty('--scroll-lock-top', `-${lockedScrollY}px`);
      document.body.classList.add('nav-open');
      document.documentElement.classList.add('nav-open');
      if (document.body.classList.contains('nav-scroll-override') && window.matchMedia('(min-width: 601px)').matches) {
        document.documentElement.classList.add('nav-hide-scroll');
      }
    };

    const releaseScrollLock = () => {
      document.body.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-hide-scroll');
      document.documentElement.style.removeProperty('--scroll-lock-top');
      window.scrollTo(0, lockedScrollY);
    };

    const scheduleScrollUnlockAfterClose = () => {
      const token = ++closeUnlockToken;

      const completeClose = () => {
        if (token !== closeUnlockToken || fullscreenNav.classList.contains('active')) return;
        releaseScrollLock();
      };

      const onTransitionEnd = (event) => {
        if (event.target !== fullscreenNav) return;
        if (event.propertyName !== 'transform') return;
        fullscreenNav.removeEventListener('transitionend', onTransitionEnd);
        if (closeUnlockTimer !== null) {
          window.clearTimeout(closeUnlockTimer);
          closeUnlockTimer = null;
        }
        completeClose();
      };

      fullscreenNav.addEventListener('transitionend', onTransitionEnd);
      closeUnlockTimer = window.setTimeout(() => {
        fullscreenNav.removeEventListener('transitionend', onTransitionEnd);
        closeUnlockTimer = null;
        completeClose();
      }, 550);
    };

    menuIcon.addEventListener('click', () => {
      const isOpening = !menuIcon.classList.contains('active');

      if (isOpening) {
        clearPendingCloseUnlock();
        menuIcon.classList.add('active');
        fullscreenNav.classList.add('active');
        lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        applyScrollLock();
      } else {
        menuIcon.classList.remove('active');
        fullscreenNav.classList.remove('active');
        scheduleScrollUnlockAfterClose();
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
