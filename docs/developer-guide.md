# Developer Guide

## 🏗️ Project Architecture

This project follows a modular architecture pattern for better maintainability and scalability.

### 📁 File Structure

```
eze-okwodu-realty/
├── index.html              # Main HTML file
├── style.css               # Legacy stylesheet (for backward compatibility)
├── style-new.css           # New modular stylesheet entry point
├── app.js                  # Legacy JavaScript (for backward compatibility)
├── js/                     # JavaScript modules
│   ├── config.js           # Website configuration and settings
│   ├── app.js             # Main application entry point
│   ├── navigation.js      # Navigation functionality
│   └── forms.js           # Form handling and validation
├── css/                    # CSS modules
│   ├── variables.css      # Design tokens and CSS custom properties
│   ├── base.css           # CSS reset and base styles
│   ├── layout.css         # Layout system and utilities
│   ├── components.css     # Reusable UI components
│   ├── navigation.css     # Navigation-specific styles
│   ├── pages.css          # Page-specific sections
│   └── responsive.css     # Media queries and responsive utilities
└── docs/                  # Documentation
    ├── developer-guide.md # This file
    ├── components.md      # Component documentation
    └── deployment.md      # Deployment instructions
```

## 🎯 Design Principles

### 1. **Modular Architecture**
- Each module has a single responsibility
- Modules can be developed and tested independently
- Easy to add new features without affecting existing code

### 2. **Configuration-Driven**
- All website content and settings in `js/config.js`
- Easy to update business information without touching code
- Centralized theme and styling configuration

### 3. **Mobile-First Design**
- Responsive design starts with mobile breakpoints
- Progressive enhancement for larger screens
- Touch-friendly interactions and proper accessibility

### 4. **Performance Optimized**
- Modular CSS prevents unused styles
- Lazy loading and intersection observers
- Efficient event handling with throttling/debouncing

## 🔧 Development Workflow

### Making Changes

#### 1. **Updating Business Information**
Edit `js/config.js`:
```javascript
const WEBSITE_CONFIG = {
  business: {
    name: 'Your Business Name',
    phone: '(XXX) XXX-XXXX',
    email: 'your@email.com',
    // ... other settings
  }
};
```

#### 2. **Adding New Services**
In `js/config.js`, add to the services array:
```javascript
services: [
  {
    id: 'new-service',
    title: 'New Service',
    description: 'Service description',
    icon: 'lucide-icon-name',
    features: ['Feature 1', 'Feature 2']
  }
]
```

#### 3. **Styling Changes**
- Global styles: Edit `css/variables.css`
- Component styles: Edit appropriate CSS module
- New components: Create in `css/components.css`

#### 4. **Adding New Functionality**
1. Create new module in `js/` folder
2. Import and initialize in `js/app.js`
3. Add corresponding CSS in appropriate module

### CSS Architecture

#### BEM Methodology
We use BEM (Block, Element, Modifier) naming:
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__body { }

/* Modifier */
.card--featured { }
.card__title--large { }
```

#### CSS Custom Properties
All design tokens are defined in `css/variables.css`:
```css
:root {
  --color-primary: #1e3a5f;
  --space-4: 1rem;
  --font-size-lg: 1.125rem;
}
```

#### Component Structure
Each component follows this pattern:
```css
.component {
  /* Base styles */
}

.component__element {
  /* Element styles */
}

.component--modifier {
  /* Modifier styles */
}

/* Responsive */
@media (max-width: 768px) {
  .component {
    /* Mobile styles */
  }
}
```

### JavaScript Architecture

#### Module Pattern
Each module is a class with clear responsibilities:
```javascript
class ModuleName {
  constructor() {
    this.config = window.WEBSITE_CONFIG;
    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
  }

  cacheDOMElements() {
    // Cache DOM elements
  }

  bindEvents() {
    // Bind event listeners
  }
}
```

#### Event Handling
- Use event delegation where possible
- Throttle/debounce expensive operations
- Always clean up event listeners if needed

## 🚀 Adding New Features

### Example: Adding a New Section

1. **Update Configuration**
```javascript
// js/config.js
sections: {
  newSection: {
    title: 'New Section',
    subtitle: 'Section description',
    enabled: true
  }
}
```

2. **Add HTML Structure**
```html
<!-- index.html -->
<section id="new-section" class="section new-section">
  <div class="container">
    <h2 class="section__title">New Section</h2>
    <!-- Section content -->
  </div>
</section>
```

3. **Create CSS Module**
```css
/* css/new-section.css */
.new-section {
  background: var(--color-surface);
  padding: var(--space-20) 0;
}

.new-section__content {
  /* Styles */
}
```

4. **Add JavaScript if Needed**
```javascript
// js/new-section.js
class NewSectionManager {
  constructor() {
    this.init();
  }
  
  init() {
    // Initialize functionality
  }
}
```

5. **Import in Main Files**
```css
/* style-new.css */
@import url('css/new-section.css');
```

```javascript
// js/app.js - in initializeModules()
if (window.NewSectionManager) {
  this.modules.newSection = new NewSectionManager();
}
```

## 🧪 Testing Changes

### Local Testing
1. Open `index.html` in browser
2. Test all breakpoints (320px, 768px, 1024px, 1440px+)
3. Test form submissions
4. Validate HTML and CSS
5. Check console for JavaScript errors

### Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Testing
- Google PageSpeed Insights
- WebPageTest
- Browser DevTools Performance tab

## 🔍 Debugging

### Common Issues

#### 1. **Styles Not Applying**
- Check CSS specificity
- Verify CSS custom property values
- Check for typos in class names
- Use browser DevTools to inspect styles

#### 2. **JavaScript Errors**
- Check browser console
- Verify module loading order
- Check for undefined variables
- Use debugger statements or console.log

#### 3. **Mobile Issues**
- Test on actual devices
- Check viewport meta tag
- Verify touch targets are 44px minimum
- Test scroll behavior

### DevTools Tips
- Use the device toolbar for responsive testing
- Check Network tab for loading issues
- Use Application tab to check for errors
- Lighthouse tab for performance audits

## 📚 Resources

### CSS
- [BEM Methodology](https://getbem.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

### JavaScript
- [Modern JavaScript Features](https://javascript.info/)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Performance
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

## 🤝 Contributing Guidelines

1. **Follow the existing code style**
2. **Test changes thoroughly**
3. **Update documentation**
4. **Use meaningful commit messages**
5. **Keep modules focused and single-purpose**

## 📞 Support

For questions about this codebase:
- Review the documentation
- Check existing code for patterns
- Test changes in multiple browsers
- Consider performance implications

---

*This guide covers the essential aspects of working with the refactored codebase. For specific component documentation, see `docs/components.md`.*