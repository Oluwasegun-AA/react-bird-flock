# React Bird Flock

An interactive React component that renders a flock of animated birds with realistic flocking behavior and intelligent perching mechanics. Birds smoothly fly around your background and automatically cluster around your cursor when idle, creating an engaging and organic visual effect.

Ships with three beautiful SVG bird variants (Classic, Simple, and Detailed) and supports extensive customization for both behavior and appearance.


<div align="center">
  <video 
    src="https://github.com/user-attachments/assets/657aae91-9e8c-432a-9ca8-276d82baf457"
    autoplay
    loop
    muted
    playsinline
    style="max-width: 100%; border-radius: 8px;"
  >
  </video>
</div>






## Features

- **Three SVG Bird Variants**: Classic (detailed), Simple (minimalist), and Detailed (ornate) designs
- **Smart Perching Behavior**: Birds automatically cluster around your cursor when idle
- **Smooth Cursor Seeking**: Natural movement with velocity-basephysics
- **Fully Responsive**: Works seamlessly on desktop, tablet, and touch devices
- **Customizable Colors**: Use built-ipalettes or provide your own
- **Modular Architecture**: Use individual components, hooks, or the complete BirdFlock
- **Zero Dependencies**: Lightweight implementation with React as the only peer dependency
- **Performance Optimized**: 60fps animations using requestAnimationFrame
- **Highly Configurable**: Control speed, clustering, perching timing, and more

## Installation

```bash
npm install react-bird-flock
```

Or with yarn:

```bash
yarn add react-bird-flock
```

Or with pnpm:

```bash
pnpm add react-bird-flock
```

## Quick Start

```tsx
import BirdFlock from 'react-bird-flock';

export default function App() {
	return (
		<>
			<BirdFlock count={15} />
			<main>
				<h1>Your Content Here</h1>
			</main>
		</>
	);
}
```

That's it! Move your mouse around and watch the birds fly realistically in your background. When you stop moving, they'll automatically perch around your cursor position in organic clusters.

## API Reference

### BirdFlock Component Props

| Prop                | Type                   | Default    | Description                                                                          |
| ------------------- | ---------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `count`             | `number`               | `10`       | Number of birds to render in the flock                                               |
| `size`              | `number`               | `60`       | Size of each bird in pixels (width and height)                                       |
| `zIndex`            | `number`               | `0`        | CSS z-index for the flock container layer                                            |
| `topSpeed`          | `number`               | `4`        | Maximum velocity birds can travel (pixels per frame at 60fps)                        |
| `perchDelaySeconds` | `number`               | `2`        | Time in seconds before birds start perching when mouse is idle                       |
| `clusterRadius`     | `number`               | `85`       | Radius in pixels defining the perching cluster around cursor                         |
| `clusterJitter`     | `number`               | `22`       | Random offset in pixels added to perching positions for natural variation            |
| `palettes`          | `Palette \| Palette[]` | `PALETTES` | Custom color palette(s). Single palette applies to all birds, array randomly assigns |

### Palette Type

```typescript
interface Palette {
	dark: string; // Primary dark color for bird bodies
	mid: string; // Mid-tone color for wings
	light: string; // Light color for highlights
	accent: string; // Bright accent for beak
}
```

### BirdState Type

```typescript
interface BirdState {
	x: number; // Current X position
	y: number; // Current Y position
	targetX: number; // Target X coordinate
	targetY: number; // Target Y coordinate
	velocityX: number; // Horizontal velocity
	velocityY: number; // Vertical velocity
	isPerched: boolean; // Perched status
	rotation: number; // Rotation angle in degrees
	zIndex: number; // Stacking order
	size: number; // Bird size in pixels
	mode: 'free' | 'perching' | 'perched'; // Current behavior mode
	wingPhase: number; // Wing animation phase (0-100)
	palette: Palette; // Color palette
	variant: 'classic' | 'simple' | 'detailed'; // SVG variant
}
```

## Usage Examples

### Basic Usage with Custom Props

```tsx
import BirdFlock from 'react-bird-flock';

function App() {
	return (
		<BirdFlock
			count={20}
			size={50}
			topSpeed={5}
			perchDelaySeconds={1.5}
			clusterRadius={100}
			clusterJitter={15}
		/>
	);
}
```

### Custom Color Palettes

```tsx
import BirdFlock from 'react-bird-flock';

// Single palette for all birds
const customPalette = {
	dark: '#1a1a2e',
	mid: '#16213e',
	light: '#0f3460',
	accent: '#e94560',
};

function ThemedFlock() {
	return <BirdFlock count={10} palettes={customPalette} />;
}

// Multiple palettes (randomly assigned)
const palettes = [
	{ dark: '#2d3436', mid: '#636e72', light: '#b2bec3', accent: '#fdcb6e' },
	{ dark: '#1e3a8a', mid: '#3b82f6', light: '#93c5fd', accent: '#fbbf24' },
	{ dark: '#7f1d1d', mid: '#dc2626', light: '#fca5a5', accent: '#fb923c' },
];

function ColorfulFlock() {
	return <BirdFlock count={15} palettes={palettes} />;
}
```

### Performance Configurations

```tsx
// Large flock optimized for performance
<BirdFlock
  count={50}
  size={30}
  topSpeed={3}
  clusterJitter={5}
  perchDelaySeconds={3}
/>

// Small premium flock with high detail
<BirdFlock
  count={5}
  size={80}
  topSpeed={6}
  perchDelaySeconds={0.5}
/>

// Tight clustering for compact effect
<BirdFlock
  count={20}
  clusterRadius={40}
  clusterJitter={8}
/>
```

### Layered with Content

```tsx
function LandingPage() {
	return (
		<>
			{/* Birds in background */}
			<BirdFlock count={12} zIndex={0} />

			{/* Your content */}
			<main style={{ position: 'relative', zIndex: 1 }}>
				<h1>Welcome</h1>
				<p>Your content here</p>
			</main>

			{/* Birds in foreground */}
			<BirdFlock count={8} zIndex={2} size={40} />
		</>
	);
}
```

## Advanced Usage

### Using Individual Hooks

Access lower-level hooks for custom implementations:

```tsx
import { useMouseTracking, useBirdFlock } from 'react-bird-flock';
import { Bird } from 'react-bird-flock';

function CustomFlockManager() {
	const { mousePosition, isMouseMoving, hasActualMouse } = useMouseTracking();

	const birds = useBirdFlock({
		initialBirds: [], // Provide initial bird states
		mousePosition,
		isMouseMoving,
		hasActualMouse,
		topSpeed: 4,
		perchDelaySeconds: 2,
		clusterRadius: 85,
		clusterJitter: 22,
	});

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			{birds.map((bird, i) => (
				<Bird key={i} bird={bird} />
			))}
		</div>
	);
}
```

### Rendering Specific Bird Variants

```tsx
import { ClassicBird, SimpleBird, DetailedBird } from 'react-bird-flock';
import type { BirdState } from 'react-bird-flock';

function BirdShowcase() {
	const mockBird: BirdState = {
		x: 100,
		y: 100,
		targetX: 100,
		targetY: 100,
		velocityX: 0,
		velocityY: 0,
		isPerched: false,
		rotation: 0,
		zIndex: 1,
		size: 60,
		mode: 'free',
		wingPhase: 50,
		palette: {
			dark: '#1F2937',
			mid: '#374151',
			light: '#9CA3AF',
			accent: '#F6AD55',
		},
		variant: 'classic',
	};

	return (
		<div style={{ display: 'flex', gap: '20px' }}>
			<ClassicBird bird={mockBird} />
			<SimpleBird bird={mockBird} />
			<DetailedBird bird={mockBird} />
		</div>
	);
}
```

### Initialize Birds Utility

```tsx
import { initializeBirds, PALETTES } from 'react-bird-flock';

function CustomInitialization() {
	const birds = initializeBirds({
		count: 10,
		size: 60,
		zIndex: 1,
		palettes: PALETTES, // or custom palette(s)
	});

	// Use birds state however you need
	return <div>{/* Custom rendering */}</div>;
}
```

## How It Works

The bird flock uses a multi-phase animation system:

### 1. **Free Mode** (Default)

- Birds fly freely around the screen
- Each bird has a random target position
- When near target or randomly, birds pick a new destination
- Movement is smoothed with velocity-based physics

### 2. **Mouse Tracking**

- Birds continuously track cursor position
- `useMouseTracking` hook detects mouse movement and device type
- Updates at 60fps for smooth following behavior

### 3. **Perching Phase**

- After `perchDelaySeconds` of mouse being idle, perching begins
- Birds are "recruited" in randomized waves (not all at once)
- Each wave recruits 1-5 birds with delays between 280-1100ms
- Creates organic, natural-looking clustering behavior

### 4. **Perched Mode**

- Birds settle at positions within `clusterRadius` of cursor
- `clusterJitter` adds random offset for natural variation
- Birds scale down slightly (0.85x) when perched
- Smooth CSS transitions for perching animation

### 5. **Resume**

- Any mouse movement instantly breaks perching
- All birds return to "free" mode
- Cycle repeats when mouse stops again

The animation runs at 60fps using `requestAnimationFrame` for smooth, GPU-accelerated motion with minimal CPU overhead.

## Bird Variant Comparison

| Variant      | Style                                  | Performance | Best For                         |
| ------------ | -------------------------------------- | ----------- | -------------------------------- |
| **Classic**  | Detailed with realistic wing animation | Medium      | Hero sections, premium branding  |
| **Simple**   | Minimalist, flat design                | High        | Large flocks (50+), backgrounds  |
| **Detailed** | Ornate with enhanced feather detail    | Lower       | Small flocks, artistic showcases |

Variants are randomly assigned during initialization. All variants support the same color customization and animation features.

## Exports

```typescript
// Components
export { BirdFlock } from 'react-bird-flock'; // Main component
export { Bird } from 'react-bird-flock'; // Individual bird wrapper
export { ClassicBird } from 'react-bird-flock'; // Classic variant
export { SimpleBird } from 'react-bird-flock'; // Simple variant
export { DetailedBird } from 'react-bird-flock'; // Detailed variant

// Hooks
export { useMouseTracking } from 'react-bird-flock'; // Mouse tracking hook
export { useBirdFlock } from 'react-bird-flock'; // Main flock logic hook

// Utilities
export { initializeBirds } from 'react-bird-flock'; // Initialize bird states
export { PALETTES } from 'react-bird-flock'; // Default color palettes

// Types
export type { BirdState, Palette } from 'react-bird-flock';
```

## Performance Tips

### For Large Flocks (50+ birds)

```tsx
<BirdFlock
	count={100}
	size={25} // Smaller birds
	topSpeed={2.5} // Slower movement
	clusterJitter={5} // Less jitter calculation
	perchDelaySeconds={3} // Less frequent mode changes
/>
```

### Optimize Rendering

- Use `zIndex` to layer birds behind content
- Consider reducing `count` on mobile devices
- Simple variant performs best for large flocks
- `clusterJitter={0}` eliminates randomness calculations

### Memory Management

- Component automatically cleans up animation frames on unmount
- No memory leaks from timers or event listeners
- Refs used for frequently-updating values to prevent re-renders

## Troubleshooting

### Birds aren't appearing

- Ensure component is mounted and visible
- Check that `count > 0`
- Verify no CSS is hiding the fixed-position container
- Check z-index layering with other content

### Birds aren't moving

- Ensure `topSpeed > 0`
- Check browser console for errors
- Verify mouse events are firing (test with `useMouseTracking`)

### Performance issues

- Reduce `count` for fewer birds
- Increase `size` with fewer birds instead of many small ones
- Use `Simple` variant for better performance
- Lower `topSpeed` for smoother animation
- Reduce `clusterJitter` to minimize calculations

### Birds perch too quickly/slowly

- Adjust `perchDelaySeconds` (higher = longer delay)
- Default is 2 seconds - try 1-5 range
- Set to 0.5 for very responsive perching

### Clustering too tight/loose

- Adjust `clusterRadius` (higher = more spread out)
- Adjust `clusterJitter` (higher = more randomness)
- Default: `clusterRadius={85}`, `clusterJitter={22}`

## Browser Support

| Browser        | Support                   |
| -------------- | ------------------------- |
| Chrome/Edge    | ✅ Full support (v90+)    |
| Firefox        | ✅ Full support (v88+)    |
| Safari         | ✅ Full support (v14+)    |
| iOS Safari     | ✅ Full support (iOS 13+) |
| Android Chrome | ✅ Full support           |

Requires support for:

- `requestAnimationFrame`
- CSS `transform` and `transition`
- SVG rendering
- ES2020+ features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

## Author

Created with ❤️ by [Olúwáségun Adepoju](https://www.linkedin.com/in/adepoju)
