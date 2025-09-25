// Real Estate Website JavaScript - Fixed Navigation and Enhanced Professional Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollEffects();
    initializePhoneFormatting();
});

// Fixed Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Smooth scrolling for navigation links - Fixed implementation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    // Use requestAnimationFrame for smoother scrolling
                    smoothScrollTo(targetPosition, 600);
                    
                    // Update active state
                    updateActiveNavLink(this);
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
}

// Custom smooth scroll implementation for better browser compatibility
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }
    
    requestAnimationFrame(scrollAnimation);
}

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Fixed active navigation update based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    let currentSection = 'home'; // Default to home
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav') && navMenu.classList.contains('nav__menu--active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav__menu');
    const menuToggle = document.querySelector('.nav__toggle');
    
    navMenu.classList.toggle('nav__menu--active');
    menuToggle.classList.toggle('nav__toggle--active');
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav__menu');
    const menuToggle = document.querySelector('.nav__toggle');
    
    navMenu.classList.remove('nav__menu--active');
    menuToggle.classList.remove('nav__toggle--active');
}

// Enhanced contact form handling
function initializeContactForm() {
    const contactForm = document.querySelector('.consultation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateFormField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        return false;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const messagesDiv = document.getElementById('form-messages');
    
    submitButton.textContent = 'Sending Request...';
    submitButton.disabled = true;
    messagesDiv.innerHTML = '';
    
    // Submit to Formspree using fetch API
    fetch('https://formspree.io/f/mwprkqar', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess(form);
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    showFormError(form, 'Please correct the errors and try again.');
                } else {
                    showFormError(form, 'Oops! There was a problem submitting your form.');
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormError(form, 'Network error. Please check your connection and try again.');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateFormField(field)) {
            isValid = false;
        }
    });
    
    // Additional email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateFormField(field) {
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class and message
    field.classList.add('field-error-input');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    field.classList.remove('field-error-input');
    
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormSuccess(form) {
    const messagesDiv = document.getElementById('form-messages');
    messagesDiv.innerHTML = `
        <div class="form-success">
            <strong>✓ Thank you for your consultation request!</strong>
            <p>Eze will contact you within 24 hours to discuss your real estate needs. For immediate assistance, call <a href="tel:301-559-2872">(301) 559-2872</a>.</p>
        </div>
    `;
    
    // Remove success message after 8 seconds
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 8000);
    
    // Scroll to success message
    messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showFormError(form, message) {
    const messagesDiv = document.getElementById('form-messages');
    messagesDiv.innerHTML = `
        <div class="form-error">
            <strong>⚠ Error</strong>
            <p>${message}</p>
        </div>
    `;
    
    // Remove error message after 8 seconds
    setTimeout(() => {
        messagesDiv.innerHTML = '';
    }, 8000);
    
    // Scroll to error message
    messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced scroll effects and animations
function initializeScrollEffects() {
    // Add scroll-based animations for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe service cards and other elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial, .service-detail, .highlight'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Phone number formatting for better UX
function initializePhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
}

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    input.value = value;
}

// Utility function for throttling scroll events
function throttle(func, limit) {
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

// Professional photo placeholder enhancement
function enhancePhotoPlaceholder() {
    const placeholder = document.querySelector('.photo-placeholder');
    if (placeholder) {
        placeholder.innerHTML = `
            <div class="professional-avatar">
                <div class="avatar-icon">👤</div>
                <div class="avatar-text">
                    <div>Eze Okwodu</div>
                    <div>Real Estate Professional</div>
                </div>
            </div>
        `;
    }
}

// Initialize professional photo enhancement
document.addEventListener('DOMContentLoaded', function() {
    enhancePhotoPlaceholder();
});

// Add CSS for form validation, animations, and enhanced photo placeholder
const additionalStyles = `
    <style>
    .field-error {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    }
    
    .field-error-input {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 1px var(--color-error) !important;
    }
    
    .form-success {
        background: rgba(var(--color-success-rgb), 0.1);
        border: 1px solid rgba(var(--color-success-rgb), 0.3);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        margin-bottom: var(--space-20);
        animation: slideIn 0.3s ease-out;
    }
    
    .success-content strong {
        color: var(--color-success);
        display: block;
        margin-bottom: var(--space-8);
    }
    
    .success-content p {
        margin: 0;
        color: var(--color-text);
    }
    
    .success-content a {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced professional photo placeholder */
    .professional-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: var(--space-16);
    }
    
    .avatar-icon {
        font-size: 4rem;
        color: var(--color-navy);
        background: var(--color-bg-1);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--color-navy);
    }
    
    .avatar-text {
        text-align: center;
        color: var(--color-navy);
    }
    
    .avatar-text > div:first-child {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-4);
    }
    
    .avatar-text > div:last-child {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
    }
    
    /* Mobile menu styles - Enhanced */
    @media (max-width: 768px) {
        .nav__menu {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border-top: 1px solid var(--color-border);
            flex-direction: column;
            padding: var(--space-20);
            gap: var(--space-16);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }
        
        .nav__menu--active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav__toggle--active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav__toggle--active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav__toggle--active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav__link {
            padding: var(--space-12);
            border-bottom: 1px solid var(--color-border);
            text-align: center;
            font-size: var(--font-size-lg);
        }
        
        .nav__link:last-child {
            border-bottom: none;
        }
    }
    
    /* Smooth scrolling fallback */
    html {
        scroll-behavior: smooth;
    }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);