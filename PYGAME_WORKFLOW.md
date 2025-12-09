# Pygame Workflow in Code Runner

Complete documentation of how Pygame works in the Code Runner platform, from student code to live interactive output.

---

## Complete Pygame Flow

### 1. **Student Writes Pygame Code**

```python
import pygame
fuel = 80
print(f"Fuel: {fuel}")  # Student's print statement
pygame.display.set_mode((600, 400))
# ... game loop with graphics
```

---

### 2. **Backend: Python to WebAssembly Compilation**

**File: `src/lib/execution/gpu-container-pool.ts` (Lines 801-821)**

When student clicks "Run":

```typescript
// Step 1: Add stdout interceptor BEFORE student's code
const stdoutInterceptor = `
import sys
if platform.system() == 'Emscripten':  // Check if in browser
    import js
    class Out:
        def write(self, s):
            # Print to browser console
            # Send to parent window via postMessage
            js.eval(f"window.parent.postMessage(...)")
    sys.stdout = Out()  // Replace stdout
`;

// Step 2: Combine interceptor + student code
const instrumentedCode = stdoutInterceptor + code;

// Step 3: Save as main.py
await writeFile('main.py', instrumentedCode);

// Step 4: Run Pygbag compiler in Docker
docker run pygbag --build /app/game
```

**Pygbag (v0.9.2) compiles:**
- `main.py` → `game.apk` (WebAssembly binary)
- Generates `index.html` (game loader)
- Creates WASM files for Python interpreter

**Output:**
```javascript
{
  html: "base64_encoded_html",
  wasm: "base64_encoded_apk",
  data: "...",
  js: "..."
}
```

---

### 3. **Frontend: Rendering the Game**

**File: `src/components/editor/PygameCanvas.tsx` (Lines 32-63)**

```typescript
// Step 1: Decode base64 files
const decodedHTML = atob(bundle.html);
const apkBinary = Uint8Array.from(atob(bundle.wasm));

// Step 2: Create blob URLs (in-memory URLs)
const apkBlob = new Blob([apkBinary]);
const apkUrl = URL.createObjectURL(apkBlob);  // blob:http://...

// Step 3: Replace game.apk reference in HTML
modifiedHTML = html.replace('game.apk', apkUrl);

// Step 4: Create HTML blob URL
const htmlBlob = new Blob([modifiedHTML]);
const htmlUrl = URL.createObjectURL(htmlBlob);

// Step 5: Load in iframe
iframeRef.current.src = htmlUrl;
```

---

### 4. **Live Print Output Capture**

**File: `src/components/editor/PygameCanvas.tsx` (Lines 18-30)**

```typescript
// Listen for messages from iframe
useEffect(() => {
  const handler = (e: MessageEvent) => {
    if (e.data?.type === 'pygame-console') {
      // Student pressed arrow key → print() executed
      const msg = e.data.message;  // "Fuel: 70, Oxygen: 90"
      onConsoleOutput(msg);  // Send to CONSOLE OUTPUT
    }
  };
  window.addEventListener('message', handler);
}, []);
```

**Inside the iframe (browser):**
```python
# When student presses LEFT arrow:
fuel = max(0, fuel - 10)
print(f"Fuel: {fuel}, Oxygen: {oxygen}")
# ↓
# Our stdout interceptor catches it
# ↓
js.eval("window.parent.postMessage({
    type: 'pygame-console',
    message: 'Fuel: 70, Oxygen: 90'
}, '*')")
# ↓
# Parent window receives message
# ↓
# Displays in CONSOLE OUTPUT section
```

---

### 5. **Display in UI**

**File: `src/components/editor/CompilerUI.tsx` (Lines 260-274)**

```tsx
{/* Pygame Canvas */}
<PygameCanvas
  bundle={result.pygameBundle}
  onConsoleOutput={(msg) => {
    setPygameConsoleOutput(prev => [...prev, msg]);
  }}
/>

{/* Console Output */}
<div>
  <span>CONSOLE OUTPUT</span>
  <pre>
    {pygameConsoleOutput.join('\n')}
    // Shows:
    // Fuel: 80, Oxygen: 90
    // Fuel: 70, Oxygen: 90
    // Fuel: 70, Oxygen: 100
  </pre>
</div>
```

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────┐
│ Student writes Pygame code                      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ Backend: gpu-container-pool.ts                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 1. Add stdout interceptor to code          │ │
│ │ 2. Save as main.py                         │ │
│ │ 3. Run Pygbag compiler in Docker           │ │
│ │ 4. Get: HTML + APK (WebAssembly)           │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ Frontend: PygameCanvas.tsx                      │
│ ┌─────────────────────────────────────────────┐ │
│ │ 1. Decode base64 HTML + APK                │ │
│ │ 2. Create blob URLs                        │ │
│ │ 3. Load in iframe sandbox                  │ │
│ │ 4. Listen for postMessage events           │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ Browser Iframe (WASM)                           │
│ ┌─────────────────────────────────────────────┐ │
│ │ Python code runs in WebAssembly            │ │
│ │ - Pygame renders graphics on canvas        │ │
│ │ - print() → stdout interceptor             │ │
│ │ - Interceptor → postMessage to parent      │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ UI Display: CompilerUI.tsx                      │
│ ┌─────────────────────────────────────────────┐ │
│ │ ┌──────────────────────────────────────┐   │ │
│ │ │ [Pygame Canvas - Graphics Display]  │   │ │
│ │ │  FUEL: 80      OXYGEN: 90            │   │ │
│ │ │  ████████████  ████████████████      │   │ │
│ │ └──────────────────────────────────────┘   │ │
│ │                                             │ │
│ │ CONSOLE OUTPUT                              │ │
│ │ ┌──────────────────────────────────────┐   │ │
│ │ │ Fuel: 80, Oxygen: 90                 │   │ │
│ │ │ Fuel: 70, Oxygen: 90  ← arrow press  │   │ │
│ │ │ Fuel: 70, Oxygen: 100 ← arrow press  │   │ │
│ │ └──────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## Key Technologies

1. **Pygbag 0.9.2**: Compiles Python/Pygame → WebAssembly
2. **WebAssembly (WASM)**: Runs Python in the browser
3. **Blob URLs**: In-memory URLs for serving compiled files
4. **iframe sandbox**: Isolated environment for running WASM
5. **postMessage API**: Communication between iframe ↔ parent window
6. **Emscripten**: Python platform check (`platform.system() == 'Emscripten'`)

---

## Key Files

### Backend
- **`src/lib/execution/gpu-container-pool.ts`**
  - Lines 801-821: Python stdout interceptor injection
  - Pygbag compilation logic
  - Docker container execution

### Frontend
- **`src/components/editor/PygameCanvas.tsx`**
  - Lines 18-30: postMessage event listener
  - Lines 32-63: Bundle decoding and iframe rendering
  - Blob URL creation and cleanup

- **`src/components/editor/CompilerUI.tsx`**
  - Lines 260-274: Canvas and console output display
  - State management for console output

---

## How It Works

### Step-by-Step Execution

1. **Student writes code**
   ```python
   import pygame
   fuel = 80
   print(f"Fuel: {fuel}")
   ```

2. **Backend intercepts and modifies**
   - Adds stdout interceptor before student code
   - Saves combined code as `main.py`
   - Runs Pygbag in Docker container

3. **Pygbag compiles**
   - Python → WebAssembly binary
   - Creates `game.apk` and `index.html`
   - Returns base64 encoded files

4. **Frontend renders**
   - Decodes base64 files
   - Creates blob URLs for in-memory serving
   - Loads HTML in sandboxed iframe

5. **Student interacts**
   - Sees graphics rendered on canvas
   - Presses arrow keys
   - Python code executes in WASM

6. **Print statements captured**
   - `print()` → stdout interceptor
   - Interceptor → `postMessage` to parent
   - Parent receives and displays in CONSOLE OUTPUT

---

## Why It Works

✅ **Graphics render**: Pygame canvas displays in iframe
✅ **Interactive**: Students use arrow keys to control game
✅ **Live output**: print() statements appear in real-time
✅ **Safe**: iframe sandbox prevents malicious code
✅ **No server needed**: Everything runs in browser after compilation

---

## Example: Problem 233 (Responding to Key Inputs)

```python
import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Fuel & Oxygen Control")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)

fuel = 80
oxygen = 90

# Initial print - appears immediately
print(f"Fuel: {fuel}, Oxygen: {oxygen}")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                fuel = max(0, fuel - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")  # Live update
            elif event.key == pygame.K_RIGHT:
                fuel = min(100, fuel + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")  # Live update
            elif event.key == pygame.K_DOWN:
                oxygen = max(0, oxygen - 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")  # Live update
            elif event.key == pygame.K_UP:
                oxygen = min(100, oxygen + 10)
                print(f"Fuel: {fuel}, Oxygen: {oxygen}")  # Live update

    screen.fill((50, 50, 50))

    fuel_text = font.render(f"FUEL: {fuel}", True, (0, 255, 0))
    oxygen_text = font.render(f"OXYGEN: {oxygen}", True, (100, 200, 255))

    screen.blit(fuel_text, (50, 50))
    screen.blit(oxygen_text, (50, 120))

    pygame.draw.rect(screen, (0, 255, 0), (50, 200, fuel * 4, 40))
    pygame.draw.rect(screen, (100, 200, 255), (50, 260, oxygen * 4, 40))

    pygame.display.flip()
    clock.tick(30)

pygame.quit()
sys.exit()
```

**Student sees:**
- Graphics: Fuel and oxygen bars updating visually
- Console:
  ```
  Fuel: 80, Oxygen: 90
  Fuel: 70, Oxygen: 90   ← pressed LEFT
  Fuel: 70, Oxygen: 100  ← pressed UP twice
  ```

---

## Troubleshooting

### Graphics not rendering?
- Check iframe sandbox permissions: `allow-scripts allow-same-origin allow-modals`
- Verify blob URLs are created correctly
- Check browser console for CORS errors

### Print statements not appearing?
- Verify stdout interceptor is injected before student code
- Check postMessage event listener is active
- Look for JavaScript errors in browser console
- Ensure message type is `'pygame-console'`

### Performance issues?
- Reduce `clock.tick()` value (lower FPS)
- Minimize DOM updates in message handler
- Use `useCallback` for event handlers

---

## Future Improvements

- [ ] Add error boundary for iframe crashes
- [ ] Implement loading indicator during compilation
- [ ] Add fullscreen mode for game canvas
- [ ] Support for audio in Pygame
- [ ] Add download option for compiled game
- [ ] Implement game state reset button

---

**Last Updated**: 2025-12-09
**Pygbag Version**: 0.9.2
**Status**: ✅ Working - Graphics render + Live print output capture
