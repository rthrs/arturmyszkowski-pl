# Offscreen Canvas Migration Guide

This guide explains how to migrate existing background components to use the generic `CanvasBackground` component with offscreen rendering via web workers.

## ✅ Verified Working Implementation

The offscreen canvas setup is **working and tested** on:

- ✅ Chrome, Firefox, Edge (offscreen canvas with worker)
- ✅ Safari (automatic fallback to main thread)
- ✅ SSR/Next.js (proper hydration handling)

## Benefits of Offscreen Rendering

- **🚀 Performance**: WebGL rendering runs in a separate thread, keeping the main thread responsive
- **🎯 Better UX**: Complex 3D animations don't block user interactions or scrolling
- **🌐 Cross-browser**: Automatic fallback for browsers that don't support OffscreenCanvas (Safari)
- **♻️ DRY**: Reusable `CanvasBackground` component reduces boilerplate
- **🔋 Battery Friendly**: Better resource management with visibility detection

## Quick Start (Copy-Paste Template)

```tsx
// 1. YourScene.tsx
export default function YourScene() {
    return (
        <mesh>
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>
    );
}

// 2. your-scene.worker.tsx
import { render } from "@react-three/offscreen";
import YourScene from "./YourScene";
render(<YourScene />);

// 3. YourBackground.tsx
import { useMemo } from "react";
import CanvasBackground from "./CanvasBackground";
import YourScene from "./YourScene";

export default function YourBackground() {
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./your-scene.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                console.warn("Worker failed:", error);
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground worker={worker} fallbackScene={<YourScene />} camera={{ position: [0, 0, 10], fov: 60 }} />
    );
}
```

## Migration Steps

### 1. Extract Scene Component

Create a separate file for your scene logic:

**Before:**

```tsx
// MyBackground.tsx
export default function MyBackground() {
    return (
        <Canvas>
            <mesh>
                <boxGeometry />
                <meshBasicMaterial />
            </mesh>
        </Canvas>
    );
}
```

**After:**

```tsx
// MyScene.tsx
export default function MyScene({ position = [0, 0, 0] }) {
    return (
        <mesh position={position}>
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>
    );
}
```

### 2. Create Worker File

Create a worker file that renders your scene:

```tsx
// my-scene.worker.tsx
import { render } from "@react-three/offscreen";
import MyScene from "./MyScene";

render(<MyScene position={[0, 0, 0]} />);
```

### 3. Update Background Component

Use `CanvasBackground` instead of `Canvas`:

```tsx
// MyBackground.tsx
import { useMemo } from "react";
import CanvasBackground from "./CanvasBackground";
import MyScene from "./MyScene";

export default function MyBackground({ position = [0, 0, 0], className = "" }) {
    // Create worker with proper URL resolution
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./my-scene.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                console.warn("Failed to create worker:", error);
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground
            className={className}
            worker={worker}
            fallbackScene={<MyScene position={position} />}
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "low-power"
            }}
            useOffscreen={true}
        />
    );
}
```

## Example: FluidBackground Migration

### Before (current implementation)

```tsx
// FluidBackground.tsx
export default function FluidBackground({ speed = 0.2 }) {
    return (
        <Canvas>
            <FluidPlane speed={speed} />
            <FlowingLines speed={speed} />
        </Canvas>
    );
}
```

### After (with offscreen)

```tsx
// FluidScene.tsx
export default function FluidScene({ speed = 0.2 }) {
    return (
        <>
            <FluidPlane speed={speed} />
            <FlowingLines speed={speed} />
        </>
    );
}

// fluid.worker.tsx
import { render } from "@react-three/offscreen";
import FluidScene from "./FluidScene";
render(<FluidScene speed={0.2} />);

// FluidBackground.tsx
import { useMemo } from "react";
import CanvasBackground from "./CanvasBackground";
import FluidScene from "./FluidScene";

export default function FluidBackground({ speed = 0.2 }) {
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./fluid.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground
            worker={worker}
            fallbackScene={<FluidScene speed={speed} />}
            camera={{ position: [0, 0, 10], fov: 60 }}
        />
    );
}
```

## Props Reference

### CanvasBackground Props

| Prop                 | Type        | Default                           | Description               |
| -------------------- | ----------- | --------------------------------- | ------------------------- |
| `className`          | `string`    | `""`                              | Additional CSS classes    |
| `worker`             | `Worker`    | `undefined`                       | Worker instance           |
| `fallbackScene`      | `ReactNode` | required                          | Scene for fallback/Safari |
| `fallbackBackground` | `ReactNode` | `undefined`                       | Background for errors/SSR |
| `camera`             | `object`    | `{ position: [0,0,10], fov: 60 }` | Camera configuration      |
| `gl`                 | `object`    | `{ alpha: true, ... }`            | WebGL renderer options    |
| `useOffscreen`       | `boolean`   | `true`                            | Enable/disable offscreen  |
| `onError`            | `function`  | `undefined`                       | Error callback            |

## 3-Level Fallback System

`CanvasBackground` uses a smart 3-level fallback system for maximum compatibility:

### Level 1: Offscreen Canvas (Best Performance) 🚀

- Renders in web worker thread
- Main thread stays responsive
- Supported: Chrome, Firefox, Edge
- Falls back automatically if not supported

### Level 2: Main Thread Canvas (Good Performance) ✅

- Renders on main thread using `fallbackScene`
- Still uses WebGL/Three.js
- Supported: Safari and all browsers
- Automatic fallback if worker unavailable or errors

### Level 3: Simple Background (Lightweight) 💨

- Shows `fallbackBackground` if provided
- Used for: SSR, errors, or when 3D rendering fails
- Optional: set to `null` to show nothing

```tsx
const worker = useMemo(() => new Worker(new URL("./my-scene.worker.tsx", import.meta.url), { type: "module" }), []);

<CanvasBackground
    // Level 1: Worker canvas (Chrome, Firefox, Edge)
    worker={worker}
    // Level 2: Main thread canvas (Safari, worker fails)
    fallbackScene={<MyScene />}
    // Level 3: Simple gradient (SSR, errors)
    fallbackBackground={<div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />}
/>;
```

**Show nothing on SSR/errors:**

```tsx
<CanvasBackground
    fallbackBackground={null} // or omit the prop
    // ... other props
/>
```

## Error Handling

The component automatically handles errors at each level:

1. **Worker creation fails** → Caught in `useMemo` try/catch → Falls back to Level 2 (main thread canvas)
2. **Offscreen canvas errors** → Automatically uses `fallback` prop → Falls back to Level 2 (main thread canvas)
3. **Main thread canvas errors** → Caught by `onError` → Falls back to Level 3 (simple background)
4. **SSR (no client)** → Shows Level 3 (simple background)

**Important:** The `onError` callback only works on the main thread fallback canvas, not on the offscreen canvas (functions can't be serialized to workers).

```tsx
<CanvasBackground
    onError={() => console.log("Main thread canvas failed")}
    // Note: This only fires if the FallbackCanvas (Level 2) has an error
    // Worker errors are handled automatically by the fallback mechanism
/>
```

## Important Notes

### Worker Creation ⚠️

- **Worker must be created in the specific component**, not in `CanvasBackground`
    - Reason: `import.meta.url` needs to resolve relative to the component's file
    - Pattern: `new URL("./worker.tsx", import.meta.url)`
- **Always wrap in `useMemo`** to avoid recreating worker on every render
- Worker files must use `.tsx` or `.jsx` extension

### Web Worker Limitations 🚫

- **Functions can't be serialized** to workers (no `onError` on offscreen Canvas)
- **No DOM access** in worker context
- Scene components must be **self-contained**
- Use Broadcast API if you need worker ↔ main thread communication

### Performance 🚀

- Visibility detection is built-in via `useCanvasVisibility`
- Automatically pauses when scrolled out of view
- Respects `frameloop="demand"` for better battery life

### Browser Support 🌐

- Chrome, Firefox, Edge: Uses offscreen canvas (Level 1)
- Safari: Automatically falls back to main thread (Level 2)
- SSR: Shows `fallbackBackground` if provided (Level 3)
- All error handling is automatic with graceful degradation

## Migration Status

### ✅ Completed

- **WireframeBackground** - Fully working with offscreen canvas and fallback

### ⏳ Ready to Migrate

- **FluidBackground** - Can be migrated following the same pattern
- **SneaksBackground** - Can be migrated following the same pattern

### Key Learnings from WireframeBackground Migration

1. ✅ Worker creation works with `new URL("./worker.tsx", import.meta.url)`
2. ✅ Worker must be created in component, not in `CanvasBackground`
3. ✅ No `onError` on offscreen Canvas (functions can't be cloned)
4. ✅ Automatic fallback works seamlessly
5. ✅ Performance improvement visible with worker in DevTools
6. ✅ Visibility detection works with both offscreen and fallback canvas

## Troubleshooting

### "Failed to construct 'Worker': Script cannot be accessed"

**Cause:** Worker URL resolved incorrectly  
**Solution:** Create worker in the specific component, not in a generic one

```tsx
// ✅ Correct - in WireframeBackground.tsx
new URL("./wireframe.worker.tsx", import.meta.url);

// ❌ Wrong - in CanvasBackground.tsx
new URL(workerUrl, import.meta.url);
```

### "could not be cloned" error

**Cause:** Trying to pass functions to offscreen Canvas  
**Solution:** Remove `onError` from offscreen Canvas, only use on FallbackCanvas

### Worker not being used (always falls back)

**Cause:** Check browser support or worker creation error  
**Solution:** Check console for warnings, verify `useOffscreen={true}`, test in Chrome/Firefox

### Performance not improved

**Cause:** Might be on Safari (no offscreen support)  
**Solution:** Check DevTools → Performance tab → look for "Worker" thread
