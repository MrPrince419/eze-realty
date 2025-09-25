# Component Documentation

## 🧩 UI Components

This document describes all reusable UI components in the system.

## 🔘 Buttons

### Basic Button
```html
<button class="btn btn--primary">Click Me</button>
```

### Variants
- `btn--primary` - Main call-to-action button
- `btn--secondary` - Secondary actions  
- `btn--outline` - Outlined button for less emphasis
- `btn--lg` - Large button for important actions
- `btn--sm` - Small button for compact spaces
- `btn--full-width` - Full width button

### Examples
```html
<!-- Primary button -->
<a href="#contact" class="btn btn--primary btn--lg">Get Started</a>

<!-- Outline button -->
<button class="btn btn--outline">Learn More</button>

<!-- Full width button -->
<button class="btn btn--primary btn--full-width">Submit Form</button>
```

### CSS Variables
```css
.btn {
  --btn-padding: var(--space-3) var(--space-6);
  --btn-font-size: var(--font-size-base);
  --btn-border-radius: var(--radius-lg);
}
```

## 🃏 Cards

### Basic Card
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Optional subtitle</p>
  </div>
  <div class="card__body">
    <p class="card__description">Card content goes here</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

### Service Card
```html
<div class="card">
  <div class="card__header">
    <i data-lucide="home" class="card__icon"></i>
    <h3 class="card__title">Service Name</h3>
  </div>
  <div class="card__body">
    <p class="card__description">Service description</p>
    <ul class="card__features">
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
  </div>
</div>
```

### Card Features
- Hover animations (lift effect)
- Border color change on hover
- Flexible content areas
- Responsive design
- Icon support

## 📝 Forms

### Form Group
```html
<div class="form-group">
  <label for="input-id" class="form-label">Field Label *</label>
  <input type="text" id="input-id" class="form-control" required>
</div>
```

### Form Controls
- `form-control` - Base input styling
- `form-label` - Label styling
- `form-messages` - Success/error messages

### Select Dropdown
```html
<div class="form-group">
  <label for="service" class="form-label">Service Interest *</label>
  <select id="service" class="form-control" required>
    <option value="">Select a service</option>
    <option value="buying">Buying a Home</option>
    <option value="selling">Selling a Home</option>
  </select>
</div>
```

### Textarea
```html
<div class="form-group">
  <label for="message" class="form-label">Message</label>
  <textarea 
    id="message" 
    class="form-control" 
    rows="4" 
    placeholder="Your message..."
  ></textarea>
</div>
```

### Form Messages
```html
<div class="form-messages form-messages--success">
  Success message content
</div>

<div class="form-messages form-messages--error">
  Error message content
</div>
```

## 🏷️ Badges

### Basic Badge
```html
<span class="badge badge--primary">New</span>
<span class="badge badge--secondary">Popular</span>
<span class="badge badge--success">Available</span>
```

### Usage in Cards
```html
<div class="card">
  <div class="card__header">
    <div class="flex flex--between">
      <h3 class="card__title">Service Name</h3>
      <span class="badge badge--success">Available</span>
    </div>
  </div>
</div>
```

## 🧭 Navigation

### Main Navigation
```html
<nav class="nav container">
  <div class="nav__brand">
    <h1 class="nav__logo">Brand Name</h1>
    <p class="nav__tagline">Tagline</p>
  </div>
  
  <ul class="nav__menu">
    <li><a href="#section" class="nav__link">Section</a></li>
  </ul>
  
  <div class="nav__contact">
    <a href="tel:123-456-7890" class="nav__phone">
      <i data-lucide="phone"></i>
      (123) 456-7890
    </a>
  </div>
  
  <button class="nav__toggle">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>
```

### Navigation States
- `nav__link.active` - Current page/section
- `nav__menu--active` - Mobile menu open
- `nav__toggle--active` - Hamburger animation

## 📏 Layout Components

### Container
```html
<div class="container">
  <!-- Content with proper max-width and padding -->
</div>
```

### Section
```html
<section class="section">
  <div class="container">
    <h2 class="section__title">Section Title</h2>
    <p class="section__subtitle">Optional subtitle</p>
    <!-- Section content -->
  </div>
</section>
```

### Grid System
```html
<!-- 2 column grid -->
<div class="grid grid--2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 3 column grid (responsive) -->
<div class="grid grid--3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Flexbox Utilities
```html
<!-- Centered content -->
<div class="flex flex--center">
  <p>Centered content</p>
</div>

<!-- Space between -->
<div class="flex flex--between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Column direction with gap -->
<div class="flex flex--column flex--gap">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## 🎨 Typography

### Headings
```html
<h1 class="section__title">Main Title</h1>
<h2 class="section__subtitle">Subtitle</h2>
```

### Text Utilities
```html
<p class="text-center">Centered text</p>
<p class="text-left">Left aligned</p>
<p class="text-right">Right aligned</p>
```

## 📱 Responsive Components

### Responsive Utilities
```html
<!-- Hide on mobile -->
<div class="hidden-mobile">Desktop only</div>

<!-- Hide on desktop -->
<div class="hidden-desktop">Mobile only</div>

<!-- Center on mobile -->
<div class="text-center-mobile">Centered on mobile</div>
```

### Breakpoints
- Mobile: `max-width: 767px`
- Tablet: `768px - 1023px`
- Desktop: `1024px+`

## 🔧 Customization

### CSS Custom Properties
Most components use CSS custom properties for easy customization:

```css
:root {
  --color-primary: #1e3a5f;
  --color-secondary: #d4a574;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}
```

### Component Modifications
To modify a component, override the CSS custom properties:

```css
.custom-card {
  --card-padding: var(--space-12);
  --card-border-radius: var(--radius-xl);
}
```

## 🎭 Animations

### Available Animations
- `animate-ready` - Prepare element for animation
- `animate-in` - Trigger fade-in animation
- Hover effects on cards and buttons
- Mobile menu slide animations

### Usage
```html
<div class="card animate-ready">
  <!-- Content will animate in when visible -->
</div>
```

## 📚 Best Practices

### Component Usage
1. **Always use semantic HTML**
2. **Include proper ARIA attributes**
3. **Ensure minimum touch targets (44px)**
4. **Test with keyboard navigation**
5. **Verify color contrast ratios**

### Accessibility
- Use proper heading hierarchy
- Include alt text for images
- Ensure focus states are visible
- Test with screen readers
- Provide skip links where needed

### Performance
- Use CSS custom properties for theming
- Minimize reflows and repaints
- Optimize images and assets
- Use efficient selectors

---

*For implementation details and advanced customization, see the Developer Guide.*