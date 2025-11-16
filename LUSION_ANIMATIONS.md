# Lusion-Style Animation Framework

This project now includes a complete Lusion.co-inspired animation system using WebGL, Three.js, and GSAP ScrollTrigger.

## 🎬 Components

### LusionStyleHero
**Location:** `src/components/LusionStyleHero.tsx`

Advanced hero section with:
- **WebGL Canvas**: Real-time 3D rendering with Three.js
- **Animated Mesh**: Rotating icosahedron with metallic material
- **Particle System**: 500 floating particles with additive blending
- **Dynamic Lighting**: Multi-directional lights for depth
- **Scroll Interactions**: Camera movement tied to scroll position
- **Text Animations**: Staggered reveal with 3D transforms

**Performance:**
- Lazy loaded (481KB chunk, 121KB gzipped)
- Hardware-accelerated rendering
- Automatic cleanup on unmount
- Responsive canvas resizing

### ScrollTransition
**Location:** `src/components/ScrollTransition.tsx`

Smooth section transitions with:
- **Opacity fade**: 0 → 1 on scroll into view
- **Vertical movement**: 100px upward motion
- **Scale effect**: 0.95 → 1.0 zoom
- **Staggered delays**: Configurable animation timing

**Usage:**
```tsx
<ScrollTransition delay={0.1}>
  <YourSection />
</ScrollTransition>
```

### WebGLBackground
**Location:** `src/components/WebGLBackground.tsx`

Custom fragment shader background:
- **Dynamic waves**: Sine/cosine pattern animation
- **Color gradients**: Smooth interpolation between two colors
- **Vertex displacement**: 3D wave effects
- **Customizable speed**: Adjustable animation rate

**Usage:**
```tsx
<WebGLBackground
  colorA="#8b5cf6"
  colorB="#ec4899"
  speed={0.5}
/>
```

## 🎨 Key Features

### 1. GSAP ScrollTrigger Integration
All animations are powered by GSAP's ScrollTrigger plugin:

```javascript
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'bottom top',
    scrub: 1,
  },
});
```

### 2. Three.js Performance
- **PixelRatio limiting**: `Math.min(devicePixelRatio, 2)`
- **Geometry optimization**: IcosahedronGeometry with 4 subdivisions
- **Material efficiency**: Standard material with controlled parameters
- **Proper cleanup**: All resources disposed on unmount

### 3. Scroll-Based Camera Movement
The hero camera and 3D objects respond to scroll:
```javascript
gsap.to(mesh.rotation, {
  x: Math.PI * 3,
  y: Math.PI * 3,
  scrollTrigger: { scrub: 1 }
});
```

### 4. Custom Shaders
WebGL background uses vertex and fragment shaders:
- **Vertex shader**: Displacement based on position and time
- **Fragment shader**: Color mixing with wave patterns
- **Uniforms**: `uTime`, `uColorA`, `uColorB`

## 📊 Bundle Analysis

**Initial Load:**
- HomePage: 47.27 KB (19.47 KB gzipped)
- LusionStyleHero: Lazy loaded separately

**Lazy Chunks:**
- LusionStyleHero: 481.15 KB (121.41 KB gzipped)
- Individual sections: 6-22 KB each

**Vendor Bundles:**
- React: 173.38 KB (57.01 KB gzipped)
- Three.js: Included in hero chunk
- GSAP: Included in hero chunk

## 🚀 Performance Optimizations

1. **Lazy Loading**: Hero loads after initial render
2. **Code Splitting**: Each section is a separate chunk
3. **Hardware Acceleration**: Uses WebGL for rendering
4. **Throttled Animations**: 60fps cap with requestAnimationFrame
5. **Responsive**: Adapts to window resizing

## 🎯 Animation Techniques

### Text Reveal
```javascript
gsap.fromTo('.word', {
  yPercent: 100,
  opacity: 0,
  rotateX: -90,
}, {
  yPercent: 0,
  opacity: 1,
  rotateX: 0,
  stagger: 0.15,
});
```

### Scroll Fade
```javascript
scrollTrigger: {
  trigger: element,
  start: 'top 85%',
  end: 'top 30%',
  toggleActions: 'play none none reverse',
}
```

### Parallax Effect
```javascript
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    scrub: 1,  // Smooth scrubbing
  },
});
```

## 🔧 Customization

### Change Hero Colors
Edit `LusionStyleHero.tsx`:
```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x8b5cf6,  // Change this
  emissive: 0x8b5cf6,  // And this
});
```

### Adjust Animation Speed
Edit scroll trigger duration:
```javascript
duration: 1.2,  // Increase for slower
ease: 'power4.out',  // Change easing
```

### Add New Transitions
Use the ScrollTransition component:
```tsx
<ScrollTransition delay={0.2}>
  <CustomSection />
</ScrollTransition>
```

## 🎓 References

- **Lusion.co**: Inspiration for animation style
- **GSAP ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Three.js**: https://threejs.org/docs/
- **WebGL Shaders**: https://thebookofshaders.com/

## 🐛 Troubleshooting

**Hero doesn't appear:**
- Check browser WebGL support
- Verify Three.js loaded correctly
- Check console for errors

**Laggy animations:**
- Reduce particle count
- Lower geometry subdivisions
- Disable on mobile

**Scroll not working:**
- Ensure ScrollTrigger is registered
- Check trigger element exists
- Verify scroll container setup
