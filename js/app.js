/**
 * Main Application Entry Point
 * Initializes all modules and manages the application lifecycle
 */

class RealEstateApp {
  constructor() {
    this.config = window.WEBSITE_CONFIG || {};
    this.modules = {};
    this.isInitialized = false;
    
    // Bind methods to maintain context
    this.init = this.init.bind(this);
    this.initializeModules = this.initializeModules.bind(this);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.init);
    } else {
      this.init();
    }
  }

  init() {
    if (this.isInitialized) return;
    
    console.log('🏡 Initializing Eze Okwodu Real Estate Website');
    
    try {
      this.initializeModules();
      this.initializeLucideIcons();
      this.setupGlobalErrorHandling();
      this.isInitialized = true;
      
      console.log('✅ Website initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize website:', error);
    }
  }

  initializeModules() {
    // Initialize Navigation
    if (window.NavigationManager) {
      this.modules.navigation = new NavigationManager();
      console.log('✅ Navigation module loaded');
    }

    // Initialize Forms
    if (window.FormManager) {
      this.modules.forms = new FormManager();
      this.modules.forms.initPhoneFormatting();
      console.log('✅ Forms module loaded');
    }

    // Initialize Scroll Effects
    this.initializeScrollEffects();
    console.log('✅ Scroll effects initialized');

    // Initialize Animations (if enabled)
    if (this.config.animations?.enabled) {
      this.initializeAnimations();
      console.log('✅ Animations initialized');
    }
  }

  initializeLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
      console.log('✅ Lucide icons initialized');
    }
  }

  initializeScrollEffects() {
    // Add scroll-based header styling
    const header = document.querySelector('.header');
    if (header) {
      const handleScroll = this.throttle(() => {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 50) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      }, 10);

      window.addEventListener('scroll', handleScroll);
    }

    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.card, .section__title, .section__subtitle');
    animateElements.forEach(el => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  initializeAnimations() {
    // Add CSS for animations if not already present
    if (!document.getElementById('animation-styles')) {
      const style = document.createElement('style');
      style.id = 'animation-styles';
      style.textContent = `
        .animate-ready {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .header--scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(15px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
      `;
      document.head.appendChild(style);
    }
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }

  // Utility method for throttling
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

  // Public API for external interactions
  getModule(name) {
    return this.modules[name];
  }

  isReady() {
    return this.isInitialized;
  }

  // Method to reinitialize if needed (for SPA navigation, etc.)
  reinitialize() {
    this.isInitialized = false;
    this.init();
  }
}

// Initialize the application
const app = new RealEstateApp();

// Make app globally available for debugging and external access
window.RealEstateApp = app;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RealEstateApp;
}