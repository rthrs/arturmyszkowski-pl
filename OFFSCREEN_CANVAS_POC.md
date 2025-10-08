# OffscreenCanvas Web Worker PoC

This Proof of Concept demonstrates moving WebGL rendering and geometry calculations off the main thread using OffscreenCanvas and Web Workers for the SneaksBackground component.

## 🎯 Goal

Improve performance and responsiveness by:

- Moving WebGL rendering to a Web Worker
- Offloading geometry-heavy calculations from the main thread
- Enabling true parallel processing of animations
- Reducing main thread blocking for better UI responsiveness

## 📁 Files Created

1. **Worker Implementation**
    - `src/workers/sneaksBackground.worker.ts` - Web Worker that handles all WebGL rendering

2. **Component Implementation**
    - `src/components/backgrounds/SneaksBackgroundOffscreen.tsx` - React component using OffscreenCanvas

3. **Test Page**
    - `src/app/test-offscreen/page.tsx` - Interactive demo to compare performance

## 🏗️ Architecture

### Traditional Approach (React Three Fiber)

```
┌─────────────────────────────────────┐
│         Main Thread                 │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   React Rendering            │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   Three.js / WebGL           │  │
│  │   - Geometry calculations    │  │
│  │   - Shader updates           │  │
│  │   - Animation loop           │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │   User Interactions          │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### OffscreenCanvas Approach

```
┌─────────────────────┐    ┌──────────────────────────┐
│   Main Thread       │    │   Web Worker Thread      │
│                     │    │                          │
│  ┌───────────────┐  │    │  ┌────────────────────┐ │
│  │ React         │  │    │  │ Three.js / WebGL   │ │
│  │ Rendering     │  │    │  │ - Geometry calc    │ │
│  └───────────────┘  │    │  │ - Shader updates   │ │
│  ┌───────────────┐  │    │  │ - Animation loop   │ │
│  │ User          │  │    │  │ - Canvas rendering │ │
│  │ Interactions  │  │    │  └────────────────────┘ │
│  └───────────────┘  │    │                          │
│         ▲           │    │           ▲              │
│         │           │    │           │              │
│         ▼           │    │           ▼              │
│  ┌───────────────┐  │    │  ┌────────────────────┐ │
│  │ Canvas Proxy  │◄─┼────┼─►│ OffscreenCanvas    │ │
│  └───────────────┘  │    │  └────────────────────┘ │
└─────────────────────┘    └──────────────────────────┘
    ⚡ Fast & Responsive         ⚙️ Heavy Computation
```

## 🔑 Key Features

### 1. Complete Thread Separation

- All WebGL operations run in a dedicated Web Worker
- Main thread only handles React rendering and user interactions
- No blocking between UI updates and animation rendering

### 2. Efficient Communication

- Canvas control transferred via `transferControlToOffscreen()`
- Minimal message passing (config updates, resize events)
- Worker runs independently once initialized

### 3. Geometry Calculations in Worker

All heavy computations happen off the main thread:

- Vertex position calculations (200 segments × 12+ lines)
- UV mapping and indexing
- Curve generation with `CatmullRomCurve3`
- Shader uniform updates
- Animation frame calculations

### 4. Graceful Degradation

- Checks for OffscreenCanvas support
- Falls back gracefully if not supported
- Error handling for worker failures

## 🚀 Usage

### Running the Demo

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Navigate to:

    ```
    http://localhost:3000/test-offscreen
    ```

3. Use the controls to:
    - Toggle between OffscreenCanvas and traditional rendering
    - Adjust line count, opacity, and animation speed
    - Compare performance in different modes

### Performance Testing

1. **Open Chrome DevTools**
    - Press F12 or Cmd+Option+I (Mac)

2. **Navigate to Performance tab**
    - Click "Record" button
    - Interact with the page for 5-10 seconds
    - Stop recording

3. **Compare Results**
    - **OffscreenCanvas mode:** Main thread shows minimal activity
    - **Traditional mode:** Main thread shows continuous rendering work
    - Look for "Web Worker" section to see offscreen rendering

4. **Key Metrics to Compare**
    - Main thread idle time
    - Frame rendering time
    - JavaScript execution time
    - Layout/Paint operations

### Integration Example

```tsx
import SneaksBackgroundOffscreen from "@/components/backgrounds/SneaksBackgroundOffscreen";

export default function MyPage() {
    return (
        <div className="relative">
            <SneaksBackgroundOffscreen lineCount={12} opacity={0.15} speed={0.2} />
            <div className="relative z-10">{/* Your content */}</div>
        </div>
    );
}
```

## 📊 Performance Improvements

### Expected Benefits

1. **Main Thread CPU Usage**
    - Reduction: 30-60% during animation
    - More headroom for React updates and user interactions

2. **Frame Rate Stability**
    - More consistent 60 fps
    - Fewer dropped frames during heavy interaction

3. **Input Responsiveness**
    - Lower input latency
    - Smoother scrolling and interactions

4. **Mobile Performance**
    - Significant improvements on low-end devices
    - Better battery efficiency

### Benchmarking

Use the following to measure improvements:

```javascript
// Main thread blocking test
console.time("expensive-operation");
// Perform expensive operation
console.timeEnd("expensive-operation");

// Check with OffscreenCanvas: Should show minimal impact
// Check without: Shows longer blocking time
```

## 🔧 Technical Details

### Worker Message Protocol

```typescript
// Initialize worker with canvas
{
    type: "init",
    canvas: OffscreenCanvas,
    width: number,
    height: number,
    config: WorkerConfig
}

// Resize canvas
{
    type: "resize",
    width: number,
    height: number
}

// Update configuration
{
    type: "config",
    config: Partial<WorkerConfig>
}

// Start/stop animation
{
    type: "start" | "stop"
}
```

### Browser Support

- ✅ Chrome 69+
- ✅ Edge 79+
- ✅ Firefox 105+
- ✅ Safari 16.4+
- ❌ IE 11 (not supported, falls back gracefully)

Check support:

```javascript
if (typeof OffscreenCanvas !== "undefined") {
    // OffscreenCanvas is supported
}
```

## 🎓 Learnings & Best Practices

### What Works Well

1. **Heavy computational tasks**
    - Complex geometry generation
    - Large vertex buffer calculations
    - Continuous animation loops

2. **Isolated rendering**
    - Background effects
    - Particle systems
    - Data visualizations

3. **Predictable workloads**
    - Consistent frame updates
    - Regular animation patterns

### Limitations

1. **No DOM Access in Worker**
    - Cannot read DOM dimensions
    - Must send resize events from main thread

2. **Canvas Resize Restrictions**
    - After calling `transferControlToOffscreen()`, you **cannot** set `canvas.width` or `canvas.height` from main thread
    - Canvas must be sized BEFORE transfer, or resized internally by worker via `renderer.setSize()`
    - Attempting to resize from main thread will throw: "Cannot resize canvas after call to transferControlToOffscreen()"

3. **Message Passing Overhead**
    - Keep messages minimal
    - Avoid frequent config updates
    - Transfer large data (like ImageBitmap) instead of copying

4. **Debugging Complexity**
    - Worker errors can be harder to trace
    - Need separate logging strategy
    - DevTools worker debugging required

5. **Memory Considerations**
    - Worker has separate memory space
    - Properly dispose resources to avoid leaks
    - Terminate workers when no longer needed

## 🔄 Migration Strategy

To migrate other backgrounds to OffscreenCanvas:

1. **Extract geometry logic to worker**
    - Move all Three.js geometry creation
    - Keep only canvas element in React component

2. **Setup message protocol**
    - Define config interface
    - Handle init, resize, config updates

3. **Handle lifecycle**
    - Initialize worker on mount
    - Terminate on unmount
    - Handle visibility changes

4. **Test thoroughly**
    - Verify visual parity
    - Measure performance improvements
    - Test on various devices/browsers

## 📝 Next Steps

### Recommended Improvements

1. **Extend to Other Backgrounds**
    - FluidBackground
    - WireframeBackground
    - GradientBackground

2. **Shared Worker Pool**
    - Reuse workers across components
    - Better resource management
    - Reduced initialization overhead

3. **Performance Monitoring**
    - Add FPS counter
    - Track worker messages
    - Memory usage monitoring

4. **Progressive Enhancement**
    - Auto-detect device capabilities
    - Adjust quality based on performance
    - Adaptive rendering strategies

5. **Advanced Features**
    - SharedArrayBuffer for zero-copy data sharing
    - Multiple render targets
    - Compute shaders for physics

## 🐛 Troubleshooting

### Worker Not Loading

- Check webpack/bundler configuration
- Verify worker file path
- Check browser console for errors

### Canvas Not Rendering

- Ensure OffscreenCanvas is supported
- Check canvas transfer happened before worker init
- Verify canvas dimensions are set

### "Cannot resize canvas after call to transferControlToOffscreen()"

**Problem:** This error occurs when trying to set `canvas.width` or `canvas.height` from the main thread after calling `transferControlToOffscreen()`.

**Solution:**

1. Set canvas size BEFORE transferring control:
    ```typescript
    canvas.width = width;
    canvas.height = height;
    const offscreen = canvas.transferControlToOffscreen();
    ```
2. For resize events, send message to worker instead of setting size directly:

    ```typescript
    // DON'T do this after transfer:
    canvas.width = newWidth; // ❌ Will throw error

    // DO this instead:
    worker.postMessage({ type: "resize", width: newWidth, height: newHeight }); // ✅
    ```

3. Worker handles resize internally:
    ```typescript
    renderer.setSize(width, height); // ✅ Works in worker
    ```

### Performance Not Improved

- Profile with DevTools to confirm worker is running
- Check if worker is being created/destroyed frequently
- Verify heavy calculations are actually in worker

### Memory Leaks

- Ensure worker is terminated on cleanup
- Dispose Three.js resources properly
- Check for event listener leaks

## 📚 References

- [OffscreenCanvas API](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Three.js Documentation](https://threejs.org/docs/)
- [transferControlToOffscreen](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen)

## 🤝 Contributing

This is a PoC - feedback and improvements welcome! Areas for contribution:

- Performance benchmarks on various devices
- Additional browser compatibility testing
- Optimization suggestions
- Bug fixes

---

**Status:** ✅ Proof of Concept Complete  
**Created:** 2025-10-08  
**Last Updated:** 2025-10-08
