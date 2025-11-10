# React Bird Flock

An interactive, modular React component that renders a flock of animated birds flocking in your background/forground with realistic flocking behavior. Ships with three beautiful bird variants (Classic, Simple, and Detailed) and supports extensive customization for behavior and appearance.

## Installation

''' bash

npm install react-bird-flock

'''

Or with yarn:

'''bash

yarn add react-bird-flock

'''

## Quick Start

'''tsx
import BirdFlock from 'react-bird-flock';

export default function App() {
  return <BirdFlock count={15} />;
}
'''

That's it! Move your mouse around and watch the birds follow your cursor. When you stop moving, they'll automatically perch around your cursor position.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | number | 10 | Number of birds to render in the flock |
| `size` | number | 60 | Size of each bird in pixels (width and height) |
| `zIndex` | number | 0 | Z-index stacking context of the flock container |
| `topSpeed` | number | 4 | Maximum velocity magnitude of flying birds (pixels per frame) |
| `perchDelaySeconds` | number | 2 | Time in seconds before birds start perching when mouse is idle |
| `clusterRadius` | number | 85 | Radius in pixels defining the perching cluster around cursor position |
| `clusterJitter` | number | 22 | Randomness in pixels added to perching positions for natural variation |

### Prop Examples

'''tsx
// Large flock with slower, more deliberate movement
<BirdFlock
  count={50}
  size={40}
  topSpeed={2}
  perchDelaySeconds={3}
/>

// Small, zippy flock that perches quickly
<BirdFlock
  count={5}
  size={80}
  topSpeed={6}
  perchDelaySeconds={0.5}
/>

// Tight clustering behavior
<BirdFlock
  count={20}
  clusterRadius={50}
  clusterJitter={10}
/>
'''

## Features

- **Three bird variants**: Choose from Classic (detailed), Simple (minimalist), and Detailed (ornate) SVG designs
- **Smart perching behavior**: Birds automatically perch around your cursor when idle, creating natural resting clusters
- **Cursor following**: Smooth animation as birds track and follow mouse movement
- **Responsive**: Works seamlessly on desktop, tablet, and touch devices
- **Modular architecture**: Use individual components, hooks, or the complete BirdFlock
- **Fully typed**: Complete TypeScript support with comprehensive types
- **Zero dependencies**: Lightweight implementation with no external package dependencies
- **Performance optimized**: Uses refs for fast-changing values to prevent unnecessary re-renders
- **Customizable timing**: Control perching delay and animation speed

## How It Works

The birds use a simple but effective flocking algorithm:

1. **Tracking Phase**: All birds track your cursor position and move toward it
2. **Idle Detection**: When your mouse hasn't moved for `perchDelaySeconds`, birds enter perching mode
3. **Perching**: Birds settle into random positions within a `clusterRadius` around your cursor with `clusterJitter` for natural variation
4. **Resume**: Mouse movement instantly breaks perching and birds resume following

The animation runs at 60fps using `requestAnimationFrame` for smooth, GPU-accelerated motion.

## Advanced Usage

### Custom Flock Manager

Build a custom bird manager with external state control:

'''tsx
import { useBirdFlock } from 'react-bird-flock';
import { useState } from 'react';

function CustomFlockManager() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { birds, setBirds } = useBirdFlock({
    count: 15,
    mousePosition: mousePos,
    perchDelaySeconds: 2.5,
  });

  return (
    <div
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      style={{ width: '100%', height: '100vh' }}
    >
      {birds.map((bird) => (
        <Bird key={bird.id} bird={bird} size={60} />
      ))}
    </div>
  );
}
'''

### Individual Bird Components

Use specific bird variants in custom layouts:

'''tsx
import { ClassicBird, SimpleBird, DetailedBird } from 'react-bird-flock';

function BirdShowcase() {
  const mockBird = {
    id: 1,
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    isPerched: false,
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ClassicBird bird={mockBird} size={80} />
      <SimpleBird bird={mockBird} size={80} />
      <DetailedBird bird={mockBird} size={80} />
    </div>
  );
}
'''

### Mouse Tracking Hook

Access raw mouse tracking data for custom implementations:

'''tsx
import { useMouseTracking } from 'react-bird-flock';

function CustomComponent() {
  const { mousePosition, isMouseMoving } = useMouseTracking();

  return (
    <div>
      <p>Mouse at: {mousePosition.x}, {mousePosition.y}</p>
      <p>Status: {isMouseMoving ? 'Moving' : 'Idle'}</p>
    </div>
  );
}
'''

### Combining with Canvas

Render birds on a canvas for advanced effects:

'''tsx
import BirdFlock from 'react-bird-flock';
import { useEffect, useRef } from 'react';

function CanvasFlockOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <BirdFlock count={20} size={50} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </>
  );
}
'''

### Performance Tuning

For large flocks (50+ birds), optimize performance:

'''tsx
// Use smaller bird sizes and reduce cluster jitter
<BirdFlock
  count={100}
  size={30}
  clusterJitter={8}
  perchDelaySeconds={3}
/>

// Or render on odd scroll events to reduce frame rate
<BirdFlock
  count={50}
  topSpeed={3}
/>
'''

### Themed Integration

Integrate with your design system's theme:

'''tsx
function ThemedBirdFlock() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <BirdFlock
        count={12}
        size={50}
        zIndex={10}
      />
    </div>
  );
}
'''

## Bird Variant Comparison

| Variant | Style | Use Case |
|---------|-------|----------|
| **Classic** | Detailed, realistic wings | Hero sections, premium feels |
| **Simple** | Minimalist, flat design | Modern UIs, backgrounds |
| **Detailed** | Ornate, decorative | Landing pages, artistic sites |

## Troubleshooting

**Birds aren't moving?**
- Check that your component is mounted and visible
- Ensure `count` is greater than 0
- Verify mouse events are being fired (open DevTools)

**Performance issues with large flocks?**
- Reduce `count` or increase `size` to use fewer birds
- Lower `topSpeed` for smoother animations
- Try `clusterJitter={0}` for less calculation

**Birds stuck in place?**
- Increase `perchDelaySeconds` to give birds time to follow
- Check that `topSpeed` is greater than 0

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 13+)

## Contributing

Found a bug or have an idea? We'd love to hear from you! Open an issue or submit a PR on GitHub.

## License

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license]()**
- With ❤️ from <a href="https://www.linkedin.com/in/adepoju" target="_blank">Olúwáségun.</a>

---

_This File was generated by [md-generator](https://github.com/oluwasegun-AA/md-generator)_
