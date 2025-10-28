# Pygame Interactive Play - Implementation Plan

## Overview
Add client-side pygame execution for interactive games using Pygbag.

## Architecture

```
User Code → Pygbag Builder → Static HTML/WASM → User's Browser → Interactive Game
            (Server-side)      (Served once)    (Client-side)
```

## Benefits
- **Cost**: Almost free vs $5000/month for server streaming
- **Scale**: Infinite users, no server load
- **Experience**: Real 60 FPS interactive games
- **Latency**: <50ms (local execution)

## Implementation Steps

### 1. Backend API (2 days)

Create `/api/pygbag/build/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Create temp directory
    const tempId = `pygame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const tempDir = path.join('/tmp', tempId);
    await fs.mkdir(tempDir, { recursive: true });

    // Save pygame code as main.py
    await fs.writeFile(path.join(tempDir, 'main.py'), code);

    // Build with pygbag (takes 10-30 seconds)
    const buildDir = path.join('/tmp', 'builds', tempId);
    await execAsync(`pygbag --build ${tempDir}/main.py --output ${buildDir}`);

    // Return URL to the built game
    const gameUrl = `/pygbag-builds/${tempId}/index.html`;

    return NextResponse.json({
      success: true,
      gameUrl,
      message: 'Game built successfully!'
    });

  } catch (error) {
    console.error('Pygbag build error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
```

### 2. Frontend Button (1 day)

Update `CompilerUI.tsx`:

```typescript
// Add new state
const [isBuilding, setIsBuilding] = useState(false);
const [gameUrl, setGameUrl] = useState<string | null>(null);

// Add build function
const handlePlayInteractive = async () => {
  setIsBuilding(true);

  try {
    const response = await fetch('/api/pygbag/build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const result = await response.json();

    if (result.success) {
      // Open game in new window
      window.open(result.gameUrl, '_blank', 'width=800,height=600');

      toast({
        title: "Game Ready!",
        description: "Your pygame game is running in a new window"
      });
    }
  } catch (error) {
    toast({
      title: "Build Failed",
      description: error.message,
      variant: "destructive"
    });
  } finally {
    setIsBuilding(false);
  }
};

// Add button in UI
<div className="flex gap-2">
  <Button onClick={handleRun}>
    <Play className="h-4 w-4 mr-2" />
    Run (Server)
  </Button>

  {code.includes('pygame') && (
    <Button
      onClick={handlePlayInteractive}
      disabled={isBuilding}
      variant="outline"
    >
      {isBuilding ? (
        <><Loader className="h-4 w-4 mr-2 animate-spin" />Building...</>
      ) : (
        <><Gamepad2 className="h-4 w-4 mr-2" />Play Interactive</>
      )}
    </Button>
  )}
</div>
```

### 3. Server Setup (1 day)

Install pygbag in your environment:

```bash
# In Dockerfile or server
pip install pygbag

# Serve built games as static files
# Add to next.config.ts:
async rewrites() {
  return [
    {
      source: '/pygbag-builds/:path*',
      destination: '/tmp/builds/:path*'
    }
  ]
}
```

### 4. Testing (1 day)

Test with sample pygame code:
```python
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

x = 400
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]: x -= 5
    if keys[pygame.K_RIGHT]: x += 5

    screen.fill((0, 0, 0))
    pygame.draw.circle(screen, (255, 0, 0), (x, 300), 50)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
```

## Timeline

- Day 1-2: Backend API + Pygbag setup
- Day 3: Frontend button + UI
- Day 4: Testing + bug fixes
- Day 5: Documentation + polish

**Total: 1 week to MVP**

## Cost Analysis

### Server Streaming (Current Alternative)
- 100 concurrent users = 100 Docker containers
- Each container: 1 CPU, 2GB RAM
- Cost: ~$500-1000/month

### Pygbag Client-Side (Recommended)
- 100,000 concurrent users = same cost
- Just static file serving
- Cost: ~$10/month (CDN)

**Savings: 99% reduction in infrastructure costs**

## User Experience

### Server Mode (Current)
```
Click Run → Wait 2s → See Screenshots ✓
Good for: Quick testing, visualization
```

### Interactive Mode (New)
```
Click Play Interactive → Wait 10s (first time) → Full Game! 🎮
Good for: Actually playing games, testing controls
```

## Future Enhancements

1. **Cache builds** - Same code = instant reload
2. **Pre-load Pyodide** - Reduce wait time to 2-3s
3. **Multiplayer** - Add WebSocket for multi-player games
4. **Mobile support** - Touch controls for mobile devices
5. **Code hot-reload** - Update game without rebuild

## Conclusion

Client-side execution with Pygbag is the **best solution** for multi-user pygame games:

✅ 99% cost reduction
✅ Infinite scalability
✅ Real interactive games
✅ Low complexity
✅ Great user experience

**Recommendation: Implement Pygbag within 1 week**
