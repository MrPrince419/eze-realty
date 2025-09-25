/**
 * Navigation Module
 * Handles navigation functionality, smooth scrolling, and active states
 */

class NavigationManager {
  constructor() {
    this.config = window.WEBSITE_CONFIG || {};
    this.header = null;
    this.navLinks = [];
    this.mobileToggle = null;
    this.mobileMenu = null;
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.updateActiveNavOnLoad();
  }

  cacheDOMElements() {
    this.header = document.querySelector('.header');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.mobileToggle = document.querySelector('.nav__toggle');
    this.mobileMenu = document.querySelector('.nav__menu');
  }

  bindEvents() {
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Mobile menu toggle
    if (this.mobileToggle && this.mobileMenu) {
      this.mobileToggle.addEventListener('click', (e) => this.toggleMobileMenu(e));
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => this.handleOutsideClick(e));
      
      // Close menu on window resize
      window.addEventListener('resize', () => this.handleResize());
    }

    // Update active nav on scroll
    window.addEventListener('scroll', this.throttle(() => this.updateActiveNavOnScroll(), 100));
  }

  handleNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    // Only handle internal links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = this.header ? this.header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        this.smoothScrollTo(targetPosition, 600);
        this.updateActiveNavLink(link);
        this.closeMobileMenu();
      }
    }
  }

  smoothScrollTo(targetPosition, duration = 600) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  updateActiveNavLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  updateActiveNavOnScroll() {
    const scrollPosition = window.pageYOffset + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        if (activeLink) {
          this.updateActiveNavLink(activeLink);
        }
      }
    });
  }

  updateActiveNavOnLoad() {
    const hash = window.location.hash;
    if (hash) {
      const activeLink = document.querySelector(`.nav__link[href="${hash}"]`);
      if (activeLink) {
        this.updateActiveNavLink(activeLink);
      }
    }
  }

  toggleMobileMenu(e) {
    e.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;
    
    this.mobileMenu.classList.toggle('nav__menu--active');
    this.mobileToggle.classList.toggle('nav__toggle--active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileMenu?.classList.remove('nav__menu--active');
    this.mobileToggle?.classList.remove('nav__toggle--active');
    document.body.style.overflow = '';
  }

  handleOutsideClick(e) {
    if (this.isMenuOpen && 
        !e.target.closest('.nav') && 
        this.mobileMenu.classList.contains('nav__menu--active')) {
      this.closeMobileMenu();
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
} else {
  window.NavigationManager = NavigationManager;
}