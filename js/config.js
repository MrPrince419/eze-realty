/**
 * Website Configuration
 * Centralized configuration for easy maintenance and updates
 */

const WEBSITE_CONFIG = {
  // Business Information
  business: {
    name: 'Eze Okwodu Real Estate',
    owner: 'Eze Okwodu',
    tagline: 'Buy and Sell Houses the Eze Way',
    description: 'Professional Real Estate Services in DC, MD, VA',
    phone: '(301) 559-2872',
    phoneLink: '301-559-2872',
    email: 'okwodu1@gmail.com',
    serviceAreas: ['Washington DC', 'Maryland', 'Virginia'],
    experience: '20+ years'
  },

  // Social Media Links
  social: {
    instagram: {
      url: 'https://www.instagram.com/eze_okwodu',
      handle: '@eze_okwodu'
    },
    facebook: {
      url: 'https://www.facebook.com/profile.php?id=825840203',
      handle: 'Eze Okwodu'
    },
    eventbrite: {
      url: 'https://www.eventbrite.com/o/eze-okwodu-events-98765432109',
      handle: 'Events'
    }
  },

  // Services Configuration
  services: [
    {
      id: 'buyer-representation',
      title: 'Buyer Representation',
      description: 'Expert guidance through every step of the home buying process',
      icon: 'home',
      features: ['Market Analysis', 'Property Search', 'Negotiation', 'Closing Support']
    },
    {
      id: 'seller-representation',
      title: 'Seller Representation',
      description: 'Maximize your home\'s value with professional selling strategies',
      icon: 'trending-up',
      features: ['Home Staging', 'Market Pricing', 'Professional Photos', 'Marketing']
    },
    {
      id: 'investment-consulting',
      title: 'Investment Consulting',
      description: 'Build wealth through strategic real estate investments',
      icon: 'bar-chart-3',
      features: ['ROI Analysis', 'Market Trends', 'Portfolio Planning', 'Risk Assessment']
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Comprehensive market insights for informed decisions',
      icon: 'line-chart',
      features: ['Comparable Sales', 'Market Trends', 'Pricing Strategy', 'Investment Potential']
    }
  ],

  // Form Configuration
  forms: {
    consultation: {
      endpoint: 'https://formspree.io/f/mwprkqar',
      method: 'POST',
      fields: {
        name: { required: true, type: 'text', label: 'Full Name' },
        email: { required: true, type: 'email', label: 'Email Address' },
        phone: { required: false, type: 'tel', label: 'Phone Number' },
        service: { 
          required: true, 
          type: 'select', 
          label: 'Service Interest',
          options: [
            { value: '', text: 'Select a service' },
            { value: 'buying', text: 'Buying a Home' },
            { value: 'selling', text: 'Selling a Home' },
            { value: 'investment', text: 'Investment Consulting' },
            { value: 'market-analysis', text: 'Market Analysis' }
          ]
        },
        message: { 
          required: false, 
          type: 'textarea', 
          label: 'Message',
          placeholder: 'Tell me about your real estate goals...'
        }
      }
    }
  },

  // Navigation Configuration
  navigation: [
    { href: '#home', text: 'Home', active: true },
    { href: '#about', text: 'About' },
    { href: '#services', text: 'Services' },
    { href: '#events', text: 'Events' },
    { href: '#contact', text: 'Contact' }
  ],

  // Theme Configuration
  theme: {
    colors: {
      primary: '#1e3a5f',
      secondary: '#d4a574',
      accent: '#e6c19a',
      text: '#2d3748',
      background: '#f7fafc'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headingWeight: '600',
      bodyWeight: '400'
    },
    spacing: {
      section: '80px',
      container: '16px'
    }
  },

  // Animation Settings
  animations: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enabled: true
  },

  // SEO Configuration
  seo: {
    title: 'Eze Okwodu - DMV Real Estate Expert | Buy and Sell Houses the Eze Way',
    description: 'Professional real estate services in Washington DC, Maryland, and Virginia. Over 20 years of experience helping clients buy and sell properties.',
    keywords: [
      'real estate agent DC',
      'Maryland realtor',
      'Virginia homes',
      'DMV real estate',
      'buy house DC',
      'sell house Maryland',
      'Eze Okwodu',
      'real estate investment'
    ],
    og: {
      image: '/og-image.jpg',
      imageWidth: 1200,
      imageHeight: 630
    }
  },

  // Developer Information
  developer: {
    name: 'Prince Uwagboe',
    portfolio: 'https://prince-portfolio.site/',
    credit: 'Made by Prince Uwagboe'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WEBSITE_CONFIG;
}

// Global access in browser
window.WEBSITE_CONFIG = WEBSITE_CONFIG;