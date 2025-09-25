/**
 * Form Manager Module
 * Handles form submissions, validation, and user feedback
 */

class FormManager {
  constructor() {
    this.config = window.WEBSITE_CONFIG?.forms || {};
    this.forms = [];
    this.init();
  }

  init() {
    this.cacheForms();
    this.bindEvents();
  }

  cacheForms() {
    this.forms = [
      {
        element: document.querySelector('.consultation-form'),
        type: 'consultation',
        config: this.config.consultation
      }
    ].filter(form => form.element);
  }

  bindEvents() {
    this.forms.forEach(form => {
      form.element.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }

  async handleSubmit(e, form) {
    e.preventDefault();
    
    const formElement = form.element;
    const formData = new FormData(formElement);
    const config = form.config;
    
    if (!config) {
      console.error('Form configuration not found');
      return;
    }

    // Validate form
    const validation = this.validateForm(formData, config.fields);
    if (!validation.isValid) {
      this.showMessage(formElement, validation.errors.join(', '), 'error');
      return;
    }

    try {
      // Show loading state
      this.setLoadingState(formElement, true);
      
      // Submit form
      const response = await this.submitForm(config.endpoint, formData, config.method);
      
      if (response.ok) {
        this.showMessage(formElement, 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        formElement.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage(formElement, 'Sorry, there was an error sending your message. Please try again or call directly.', 'error');
    } finally {
      this.setLoadingState(formElement, false);
    }
  }

  validateForm(formData, fieldConfig) {
    const errors = [];
    
    Object.entries(fieldConfig).forEach(([fieldName, config]) => {
      const value = formData.get(fieldName);
      
      if (config.required && (!value || value.trim() === '')) {
        errors.push(`${config.label} is required`);
      }
      
      if (value && config.type === 'email' && !this.isValidEmail(value)) {
        errors.push('Please enter a valid email address');
      }
      
      if (value && config.type === 'tel' && !this.isValidPhone(value)) {
        errors.push('Please enter a valid phone number');
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  }

  async submitForm(endpoint, formData, method = 'POST') {
    const options = {
      method: method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    };

    return fetch(endpoint, options);
  }

  showMessage(formElement, message, type) {
    const messagesContainer = formElement.querySelector('.form-messages');
    
    if (messagesContainer) {
      messagesContainer.innerHTML = message;
      messagesContainer.className = `form-messages form-messages--${type}`;
      messagesContainer.style.display = 'block';
      
      // Auto-hide success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          messagesContainer.style.display = 'none';
        }, 5000);
      }
      
      // Scroll to message
      messagesContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  setLoadingState(formElement, isLoading) {
    const submitButton = formElement.querySelector('button[type="submit"]');
    const inputs = formElement.querySelectorAll('input, textarea, select, button');
    
    if (isLoading) {
      formElement.classList.add('loading');
      inputs.forEach(input => input.disabled = true);
      
      if (submitButton) {
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
      }
    } else {
      formElement.classList.remove('loading');
      inputs.forEach(input => input.disabled = false);
      
      if (submitButton) {
        submitButton.innerHTML = 'Request Consultation';
      }
    }
  }

  // Phone number formatting
  formatPhoneNumber(input) {
    const x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    input.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  }

  initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
      input.addEventListener('input', () => this.formatPhoneNumber(input));
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormManager;
} else {
  window.FormManager = FormManager;
}