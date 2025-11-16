# Lusion-Style Animation System

A comprehensive, reusable animation framework for React that brings fluid Lusion-style transitions to any section.

## Features

- ✨ **Word-by-Word & Line-by-Line Reveals**: Automatic text splitting with staggered animations
- 🎯 **Scroll-Triggered Animations**: Elements animate as they enter the viewport
- 🎨 **Parallax Effects**: Smooth depth-based motion on scroll
- 🎭 **Hover Interactions**: Magnetic and tilt effects using GSAP quickTo
- ♿ **Accessibility**: Respects `prefers-reduced-motion`
- ⚡ **Performance**: Optimized with `will-change` and batch processing
- 🔧 **Zero Config**: Works out of the box with sensible defaults

## Installation

Already included in your project! Just import and use.

## Quick Start

### 1. Basic Usage

```tsx
import { useRef } from 'react';
import { useSectionAnimations } from '../hooks/useSectionAnimations';

function MySection() {
  const sectionRef = useRef(null);

  useSectionAnimations(sectionRef, {
    animateOnScroll: true,
    stagger: 0.08,
    duration: 1.2,
    ease: 'power3.out',
  });

  return (
    <section ref={sectionRef}>
      <h2 data-animate="words">Animate Words</h2>
      <p data-animate="lines">Split into lines</p>
      <button className="fade-element">Fade In</button>
    </section>
  );
}
```

### 2. Data Attributes

Use these attributes to control animation behavior:

- `data-animate="words"` - Split text into words and animate
- `data-animate="lines"` - Split text into lines and animate
- `data-parallax="50"` - Add parallax effect (higher = more movement)
- `data-hover="tilt"` - Add 3D tilt on hover
- `data-hover="magnetic"` - Add magnetic pull effect
- `.fade-element` - Simple fade and slide up

### 3. Configuration Options

```tsx
interface SectionAnimationOptions {
  animateOnMount?: boolean;      // Animate immediately (default: false)
  animateOnScroll?: boolean;     // Animate on scroll (default: true)
  stagger?: number;              // Delay between elements (default: 0.08)
  duration?: number;             // Animation duration (default: 1.2)
  ease?: string;                 // GSAP easing (default: 'power3.out')
  delay?: number;                // Initial delay (default: 0)
  start?: string;                // ScrollTrigger start (default: 'top 80%')
  parallax?: boolean;            // Enable parallax (default: false)
  parallaxSpeed?: number;        // Parallax intensity (default: 50)
  fadeOut?: boolean;             // Fade on scroll away (default: false)
  scaleOnExit?: number;          // Scale when leaving (default: 0.95)
}
```

## Examples

### Hero Section (Mount Animation)

```tsx
const heroRef = useRef(null);

useSectionAnimations(heroRef, {
  animateOnMount: true,
  stagger: 0.1,
  duration: 1.4,
  ease: 'expo.out',
  delay: 0.3,
});

return (
  <section ref={heroRef}>
    <h1 data-animate="words">Welcome</h1>
  </section>
);
```

### Scroll-Triggered Section

```tsx
const featuresRef = useRef(null);

useSectionAnimations(featuresRef, {
  animateOnScroll: true,
  stagger: 0.12,
  parallax: true,
});

return (
  <section ref={featuresRef}>
    <div className="fade-element" data-parallax="30">
      Feature 1
    </div>
  </section>
);
```

### Interactive Buttons

```tsx
<button data-hover="tilt">
  3D Tilt Button
</button>

<button data-hover="magnetic">
  Magnetic Button
</button>
```

## Easing Options

Common GSAP easing functions:

- `power1.out` - Gentle deceleration
- `power2.out` - Medium deceleration
- `power3.out` - Strong deceleration (recommended)
- `power4.out` - Very strong deceleration
- `expo.out` - Exponential easing (dramatic)
- `back.out` - Slight overshoot
- `elastic.out` - Bouncy effect

## Best Practices

### 1. Typography
```tsx
<h1 data-animate="words">
  Keep text concise
</h1>
```

### 2. Stagger Timing
- Short text: 0.05-0.08s
- Medium text: 0.08-0.12s
- Long lists: 0.12-0.15s

### 3. Duration
- Quick reveals: 0.8-1.0s
- Standard: 1.2-1.4s
- Dramatic: 1.6-2.0s

### 4. Parallax Speed
- Subtle: 20-40px
- Medium: 50-70px
- Strong: 80-100px

## Performance Tips

1. Use `fade-element` class instead of `data-animate` for simple elements
2. Limit parallax elements on mobile
3. The hook automatically adds `will-change: transform, opacity`
4. Animations respect `prefers-reduced-motion`

## Component Examples

See these files for complete examples:
- `components/EnhancedContact.tsx` - Full contact section
- `components/AnimationShowcase.tsx` - Multiple section types

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Falls back gracefully for older browsers
- Respects user motion preferences

## Troubleshooting

**Animations not working?**
- Ensure `ref` is attached to the section element
- Check that data attributes are spelled correctly
- Verify GSAP is installed

**Text not splitting?**
- Make sure `data-animate="words"` or `data-animate="lines"` is present
- Text content must be direct child, not nested deep

**Performance issues?**
- Reduce number of parallax elements
- Increase stagger delay
- Disable parallax on mobile

## License

Part of your project - use freely!
