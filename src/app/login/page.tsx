'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTerminalEffect, setShowTerminalEffect] = useState(false);
  const [p5Loaded, setP5Loaded] = useState(false);

  useEffect(() => {
    // Clear any existing authentication on login page
    if (typeof window !== 'undefined') {
      localStorage.clear(); // Clear all localStorage
      sessionStorage.clear(); // Clear all sessionStorage
    }

    // Terminal typing effect for title
    setShowTerminalEffect(true);
  }, []);

  // Initialize p5.js animation when library loads
  const initializeMatrixAnimation = () => {
    if (typeof window !== 'undefined' && window.p5) {
      const phrases = [
        "Lab of Future", "مختبر المستقبل",
        "Space 2040", "الفضاء 2040",
        "Computer Science", "علوم الحاسوب",
        "Robotics", "الروبوتات",
        "Space and Astronamy", "الفضاء وعلم الفلك",
        "Aero Space", "الفضاء الجوي",
        "Summer Camp", "المخيم الصيفي",
        "Python", "بايثون"
      ];

      let charSize = 20;
      let streams;

      class Char {
        constructor(value, x, y, speed) {
          this.value = value;
          this.x = x;
          this.y = y;
          this.speed = speed;
        }

        draw() {
          const flick = Math.random() * 100;
          if (flick < 10) {
            fill(120, 50, 90); // Brighter flickering numbers
            text(Math.round(Math.random() * 9), this.x, this.y);
          } else {
            text(this.value, this.x, this.y);
          }
          this.y = this.y > height ? 0 : this.y + this.speed;
        }
      }

      class Stream {
        constructor(text, x) {
          const y = Math.random() * text.length * 4;
          const speed = Math.random() * 8 + 2;
          this.chars = [];
          this.isHighlighted = (text === "Lab of Future");

          for (let i = 0; i < text.length; i++) {
            this.chars.push(
              new Char(text[i], x, (y + i) * charSize, speed)
            );
          }
        }

        draw() {
          if (this.isHighlighted) {
            fill(180, 100, 100); // Bright cyan for "Lab of Future"
          } else {
            fill(120, 100, 80); // Brighter green for other text
          }

          this.chars.forEach((c, i) => {
            const lit = Math.random() * 100;
            if (lit < 30) {
              if (i === this.chars.length - 1) {
                if (this.isHighlighted) {
                  fill(200, 100, 100); // Bright cyan tail
                } else {
                  fill(120, 80, 90); // Brighter green tail
                }
              } else {
                if (this.isHighlighted) {
                  fill(180, 100, 95); // Very bright cyan
                } else {
                  fill(120, 100, 85); // Brighter green
                }
              }
            } else {
              if (this.isHighlighted) {
                fill(180, 100, 100); // Bright cyan
              } else {
                fill(120, 100, 80); // Brighter green
              }
            }
            c.draw();
          });
        }
      }

      function createStreams() {
        streams = [];
        for (let i = 0; i < width; i += charSize) {
          streams.push(new Stream(phrases[Math.floor(Math.random() * phrases.length)], i));
        }
      }

      function reset() {
        streams = [];
        createStreams();
      }

      window.setup = function() {
        const canvas = createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('matrix-canvas');
        reset();
        frameRate(30);
        colorMode(HSB);
        noStroke();
        textSize(charSize);
        textFont("monospace");
        background(0);
      };

      window.draw = function() {
        background(0, 0, 0, 0.1); // Slight fade for trailing effect
        streams.forEach((s) => s.draw());
      };

      window.windowResized = function() {
        resizeCanvas(window.innerWidth, window.innerHeight);
        background(0);
        reset();
      };

      // Start the animation
      new window.p5();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation (in real app, this would be proper authentication)
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      if (credentials.username.length > 0 && credentials.password.length > 0) {
        // Store login state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', credentials.username);

        // Redirect to boot screen
        router.push('/boot');
      } else {
        setError('Invalid credentials');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center relative overflow-hidden">
      {/* p5.js Script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"
        onLoad={() => {
          setP5Loaded(true);
          initializeMatrixAnimation();
        }}
      />

      {/* Matrix falling text background */}
      <div id="matrix-canvas" className="fixed inset-0 opacity-80" style={{ zIndex: 1 }}></div>

      {/* Scanning lines */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md bg-black/98 border-green-400 border-2 backdrop-blur-md shadow-2xl shadow-green-400/40 relative animate-pulse" style={{
        zIndex: 10,
        boxShadow: '0 0 30px rgba(0, 255, 0, 0.3), 0 0 60px rgba(0, 255, 0, 0.1), inset 0 0 20px rgba(0, 255, 0, 0.05)'
      }}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Terminal className="h-12 w-12 text-green-400" />
              <div className="absolute -inset-2 bg-green-400/20 rounded-full blur animate-pulse"></div>
            </div>
          </div>

          <CardTitle className="text-2xl font-mono text-green-400 mb-2">
            {showTerminalEffect ? (
              <span className="typing-effect">NEURAL ACCESS TERMINAL</span>
            ) : (
              'NEURAL ACCESS TERMINAL'
            )}
          </CardTitle>

          <CardDescription className="text-green-400/80 font-mono text-sm">
            CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 border border-red-500/50 bg-red-500/10 rounded">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-mono">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-400 font-mono flex items-center gap-2">
                <User className="w-4 h-4" />
                USER ID
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/50 border-green-400/50 text-green-400 font-mono focus:border-green-400 focus:ring-green-400/20"
                placeholder="Enter your user ID..."
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-400 font-mono flex items-center gap-2">
                <Lock className="w-4 h-4" />
                ACCESS CODE
              </Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-black/50 border-green-400/50 text-green-400 font-mono focus:border-green-400 focus:ring-green-400/20"
                placeholder="Enter access code..."
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-900/50 border border-green-400/50 text-green-400 font-mono hover:bg-green-800/50 hover:border-green-400 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  AUTHENTICATING...
                </div>
              ) : (
                'INITIATE ACCESS'
              )}
            </Button>
          </form>

          {/* System info */}
          <div className="mt-6 pt-4 border-t border-green-400/30">
            <div className="text-xs font-mono text-green-400/60 space-y-1">
              <div>SYSTEM: NEURAL-NET v2.847.x</div>
              <div>PROTOCOL: SECURE-SHELL</div>
              <div>STATUS: MONITORING</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes matrix-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }

        .typing-effect {
          overflow: hidden;
          border-right: 2px solid #00ff00;
          white-space: nowrap;
          animation: typing 2s steps(20, end), blink-caret 1s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #00ff00; }
        }
      `}</style>
    </div>
  );
}