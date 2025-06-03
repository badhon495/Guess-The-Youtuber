# Particles.js Implementation Guide

## Overview
This project uses particles.js (@tsparticles/react) to create an interactive animated background that enhances the visual appeal of the "Guess The YouTuber" game.

## Implementation Details

### Dependencies
- `@tsparticles/react`: ^3.0.0
- `@tsparticles/slim`: ^3.8.1

### File Structure
```
src/
├── components/
│   └── ParticlesBackground.js    # Main particles component
├── config/
│   └── particlesConfig.js        # Particles configuration for different themes
└── App.js                        # Main app with particles integration
```

### Features
- **Theme-aware particles**: Different colors and settings for dark/light modes
- **Interactive particles**: Responds to mouse hover and click events
- **Responsive design**: Adapts to different screen sizes
- **Performance optimized**: Uses slim version of tsparticles for better performance

### Configuration Options

#### Dark Mode Particles
- **Count**: 120 particles
- **Colors**: Pastel colors (pink, blue, yellow, green, coral)
- **Speed**: 1.5
- **Opacity**: 0.7 (with randomization)

#### Light Mode Particles
- **Count**: 80 particles
- **Colors**: Vibrant colors (pink, teal, blue, yellow, purple)
- **Speed**: 2.0
- **Opacity**: 0.5 (with randomization)

### Interactive Features
- **Hover Effect**: Particles repel from mouse cursor
- **Click Effect**: Creates new particles on click
- **Responsive**: Automatically adjusts to window resize

### Styling Integration
The particles background works seamlessly with:
- Glass-morphism effects (backdrop-filter: blur)
- Semi-transparent overlays
- Dynamic theme switching
- Proper z-index layering

### Customization
To modify particles behavior, edit `src/config/particlesConfig.js`:

```javascript
// Example: Change particle count
particles: {
  number: {
    value: 150, // Increase for more particles
    // ...
  }
}
```

### Performance Notes
- Uses `loadSlim` instead of full particles.js for better performance
- Particles are positioned with `position: fixed` and `z-index: -1`
- GPU acceleration enabled through CSS transforms
- Retina display support enabled

### Browser Compatibility
- Modern browsers with ES6+ support
- Canvas API support required
- Works on mobile devices with touch events

## Usage
The particles background is automatically included in the main App component and responds to the dark mode toggle.

```jsx
<ParticlesBackground darkMode={darkMode} />
```

## Troubleshooting
- If particles don't appear, check browser console for errors
- Ensure all dependencies are properly installed
- Verify z-index values don't conflict with other elements
- Check that the particles container has proper dimensions
