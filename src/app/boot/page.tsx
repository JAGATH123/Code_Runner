'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BootPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Load boot screen directly with embedded logic
    const initializeBootScreen = () => {
      // Audio Manager - Simplified version
      class AudioManager {
        constructor() {
          this.stdout = new Audio('/edex-boot/audio/stdout.wav');
          this.granted = new Audio('/edex-boot/audio/granted.wav');
          this.theme = new Audio('/edex-boot/audio/theme.wav');

          // Set volume
          this.stdout.volume = 0.3;
          this.granted.volume = 0.5;
          this.theme.volume = 0.4;

          // Preload audio files
          this.stdout.preload = 'auto';
          this.granted.preload = 'auto';
          this.theme.preload = 'auto';

          // Add error handling
          [this.stdout, this.granted, this.theme].forEach(audio => {
            audio.addEventListener('error', (e) => {
              console.warn('Audio load error:', e);
            });
            audio.addEventListener('canplaythrough', () => {
              console.log('Audio loaded:', audio.src);
            });
          });
        }

        playSound(audioElement) {
          if (audioElement && typeof audioElement.play === 'function') {
            audioElement.currentTime = 0; // Reset to start
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Silently ignore autoplay errors
              });
            }
            return playPromise;
          }
        }
      }

      // Theme configuration
      window.theme = {
        r: 0,
        g: 255,
        b: 255
      };

      // Audio manager
      window.audioManager = new AudioManager();

      // Helper function for delays
      window._delay = ms => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };

      // Boot log data
      const bootLog = `Welcome to CODE RUNNER Neural Network!
vm_page_bootstrap: 987323 free pages and 53061 wired pages
kext submap [0xffffff7f8072e000 - 0xffffff8000000000], kernel text [0xffffff8000200000 - 0xffffff800072e000]
zone leak detection enabled
standard timeslicing quantum is 10000 us
mig_table_max_displ = 72
TSC Deadline Timer supported and enabled
CodeRunnerACPICPU: ProcessorId=1 LocalApicId=0 Enabled
CodeRunnerACPICPU: ProcessorId=2 LocalApicId=2 Enabled
CodeRunnerACPICPU: ProcessorId=3 LocalApicId=1 Enabled
CodeRunnerACPICPU: ProcessorId=4 LocalApicId=3 Enabled
calling mpo_policy_init for TMSafetyNet
Security policy loaded: Safety net for Rollback (TMSafetyNet)
calling mpo_policy_init for Sandbox
Security policy loaded: Seatbelt sandbox policy (Sandbox)
calling mpo_policy_init for Quarantine
Security policy loaded: Quarantine policy (Quarantine)
Copyright (c) 1982, 1986, 1989, 1991, 1993, 2025
The Regents of the Neural Network Institute. All rights reserved.

NEURAL_ Framework successfully initialized
using 16384 buffer headers and 10240 cluster IO buffer headers
IOAPIC: Version 0x20 Vectors 64:87
ACPI: System State [S0 S3 S4 S5] (S3)
PFM64 0xf10000000, 0xf0000000
[ PCI configuration begin ]
CodeRunnerIntelCPUPowerManagement: Turbo Ratios 0046
CodeRunnerIntelCPUPowerManagement: (built 13:08:12 Sep 19 2025) initialization complete
console relocated to 0xf10000000
PCI configuration changed (bridge=16 device=4 cardbus=0)
[ PCI configuration end, bridges 12 devices 16 ]
mbinit: done [64 MB total pool size, (42/21) split]
Pthread support ABORTS when sync kernel primitives misused
com.CodeRunner.NeuralNetwork kmod start
com.CodeRunner.PythonCompiler load succeeded
com.CodeRunner.CodeExecution load succeeded

CodeRunnerIntelCPUPowerManagementClient: ready
NEURAL NETWORK INTERFACE ACTIVE
Python Execution Environment: READY
Code Compiler: ONLINE
Security Sandbox: ENABLED
Waiting on neural network initialization...
Got neural device = IOService:/CodeRunnerACPIPlatformExpert/PCI0@0/
Neural Network Bootstrap: COMPLETE
BSD root: neural0s2, major 14, minor 2
Kernel is LP64
CodeRunner Neural Interface: STATUS OK
Python Environment: INITIALIZED
Code Execution Engine: READY
Security Manager: ACTIVE
Neural Network: ONLINE

System Status: ALL GREEN
Neural Network Initialization: COMPLETE`.split('\n');

      let i = 0;

      // Startup boot log
      function displayLine() {
        let bootScreen = document.getElementById("boot_screen");

        if (typeof bootLog[i] === "undefined") {
          setTimeout(displayTitleScreen, 300);
          return;
        }

        if (bootLog[i] === "Neural Network Initialization: COMPLETE") {
          window.audioManager.playSound(window.audioManager.granted);
        } else {
          window.audioManager.playSound(window.audioManager.stdout);
        }

        bootScreen.innerHTML += bootLog[i] + "<br/>";
        i++;

        switch(true) {
          case i === 2:
            bootScreen.innerHTML += `CodeRunner Kernel version 2.2.8 boot at ${Date().toString()}; root:neural-1699.22.73~1/RELEASE_X86_64<br/>`;
          case i === 4:
            setTimeout(displayLine, 500);
            break;
          case i > 4 && i < 25:
            setTimeout(displayLine, 30);
            break;
          case i === 25:
            setTimeout(displayLine, 400);
            break;
          case i === 42:
            setTimeout(displayLine, 300);
            break;
          case i > 42 && i < 82:
            setTimeout(displayLine, 25);
            break;
          case i >= bootLog.length-2 && i < bootLog.length:
            setTimeout(displayLine, 300);
            break;
          default:
            setTimeout(displayLine, Math.pow(1 - (i/1000), 3)*25);
        }
      }

      // Show "logo" and background grid
      async function displayTitleScreen() {
        let bootScreen = document.getElementById("boot_screen");
        if (bootScreen === null) {
          bootScreen = document.createElement("section");
          bootScreen.setAttribute("id", "boot_screen");
          bootScreen.setAttribute("style", "z-index: 9999999");
          document.body.appendChild(bootScreen);
        }
        bootScreen.innerHTML = "";

        window.audioManager.playSound(window.audioManager.theme);

        await window._delay(400);

        document.body.setAttribute("class", "");
        bootScreen.setAttribute("class", "center");
        bootScreen.innerHTML = "<h1>LAB OF FUTURE</h1>";
        let title = document.querySelector("section > h1");

        await window._delay(200);

        document.body.setAttribute("class", "solidBackground");

        await window._delay(100);

        title.setAttribute("style", `background-color: rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b});border-bottom: 5px solid rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b});`);

        await window._delay(300);

        title.setAttribute("style", `border: 5px solid rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b});`);

        await window._delay(100);

        title.setAttribute("style", "");
        title.setAttribute("class", "glitch");

        await window._delay(500);

        document.body.setAttribute("class", "");
        title.setAttribute("class", "");
        title.setAttribute("style", `border: 5px solid rgb(${window.theme.r}, ${window.theme.g}, ${window.theme.b});`);

        await window._delay(1000);

        // Add START EXPERIENCE button after LAB OF FUTURE title
        const startButton = document.createElement('div');
        startButton.innerHTML = `
          <div class="start-experience-container">
            <div class="shared-button-animation cursor-pointer" onclick="window.location.href='/home'">
              <svg viewBox="0 0 150 150" class="shared-btn-svg">
                <defs>
                  <filter id="svg-glow">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="5"
                      floodColor="#ffd369"
                      floodOpacity="1"
                    />
                  </filter>
                </defs>
                <path
                  d="M40 75 H110 M75 40 V110"
                  class="shared-btn-svg__line-1-path"
                />
                <path
                  d="M40 40 L110 110 M40 110 L110 40"
                  class="shared-btn-svg__line-2-path"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="72"
                  class="shared-btn-svg__yellow-circle"
                  style="filter: url(#svg-glow)"
                />
              </svg>
              <div class="shared-btn-text">START EXPERIENCE</div>
            </div>
          </div>
        `;

        bootScreen.appendChild(startButton);

        // Trigger button animation
        setTimeout(() => {
          const buttonElement = document.querySelector('.shared-button-animation');
          if (buttonElement) {
            buttonElement.classList.add('shared-button-animation--ready');
          }
        }, 500);

        console.log("Boot sequence complete!");
      }

      // Optional: Click to skip intro
      document.addEventListener('click', function() {
        i = bootLog.length; // Skip to end
      });

      // Start the boot sequence
      displayLine();
    };

    // Initialize WebGL Cyberpunk Effects
    const initializeCyberpunkWebGL = () => {
      // Create WebGL canvas for cyberpunk effects
      const webglCanvas = document.createElement('canvas');
      webglCanvas.id = 'cyberpunk-webgl';
      webglCanvas.style.position = 'fixed';
      webglCanvas.style.top = '0';
      webglCanvas.style.left = '0';
      webglCanvas.style.width = '100%';
      webglCanvas.style.height = '100%';
      webglCanvas.style.zIndex = '2';
      webglCanvas.style.pointerEvents = 'none';
      webglCanvas.style.opacity = '0.8';
      document.body.appendChild(webglCanvas);

      const gl = webglCanvas.getContext('webgl') || webglCanvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, falling back to CSS effects');
        return;
      }

      // Resize canvas to match window
      const resizeCanvas = () => {
        webglCanvas.width = window.innerWidth;
        webglCanvas.height = window.innerHeight;
        gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Vertex shader for cyberpunk grid
      const vertexShaderSource = `
        attribute vec2 a_position;
        uniform float u_time;
        uniform vec2 u_resolution;
        varying vec2 v_texCoord;

        void main() {
          vec2 position = a_position;
          v_texCoord = (position + 1.0) * 0.5;
          gl_Position = vec4(position, 0, 1);
        }
      `;

      // Fragment shader for cyberpunk effects
      const fragmentShaderSource = `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        varying vec2 v_texCoord;

        // Hash function for noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // Smooth noise
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
                     mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
        }

        // Cyberpunk grid
        float grid(vec2 uv, float scale) {
          uv *= scale;
          vec2 grid = abs(fract(uv - 0.5) - 0.5);
          float line = min(grid.x, grid.y);
          return smoothstep(0.0, 0.02, line);
        }

        // Digital glitch effect
        float glitch(vec2 uv, float time) {
          float glitchStrength = sin(time * 10.0) * 0.5 + 0.5;
          return step(0.98, noise(uv * 50.0 + time * 2.0)) * glitchStrength;
        }

        void main() {
          vec2 uv = v_texCoord;
          vec2 centeredUV = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);

          // Base color
          vec3 color = vec3(0.0);

          // Animated cyberpunk grid
          float gridPattern = grid(centeredUV + u_time * 0.1, 10.0);
          color += vec3(0.0, 1.0, 1.0) * gridPattern * 0.3;

          // Moving data streams
          float stream1 = sin(uv.x * 20.0 - u_time * 5.0) * 0.5 + 0.5;
          float stream2 = sin(uv.y * 15.0 - u_time * 3.0) * 0.5 + 0.5;
          color += vec3(0.0, 1.0, 0.5) * stream1 * stream2 * 0.2;

          // Digital noise and glitch
          float digitalNoise = noise(uv * 100.0 + u_time);
          color += vec3(0.0, 1.0, 1.0) * digitalNoise * 0.1;

          // Glitch effects
          float glitchEffect = glitch(uv, u_time);
          color += vec3(1.0, 0.0, 1.0) * glitchEffect * 0.8;

          // Vignette effect
          float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.8;
          color *= vignette;

          // Scanlines
          float scanline = sin(uv.y * u_resolution.y * 2.0) * 0.04;
          color += scanline;

          gl_FragColor = vec4(color, 0.7);
        }
      `;

      // Create and compile shader
      function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

      // Create program
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return;
      }

      // Get uniform and attribute locations
      const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
      const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
      const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

      // Create geometry (full screen quad)
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      // Render loop
      let startTime = Date.now();
      function render() {
        const currentTime = (Date.now() - startTime) / 1000;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(program);

        // Set uniforms
        gl.uniform1f(timeUniformLocation, currentTime);
        gl.uniform2f(resolutionUniformLocation, webglCanvas.width, webglCanvas.height);

        // Set up attributes
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(render);
      }
      render();
    };

    // Load CSS first
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/edex-boot/css/boot_screen.css';
    cssLink.onload = () => {
      setIsLoading(false);
      // Start cyberpunk WebGL effects
      setTimeout(initializeCyberpunkWebGL, 100);
      // Start boot sequence after CSS loads
      setTimeout(initializeBootScreen, 500);
    };
    document.head.appendChild(cssLink);

    // Cleanup function
    return () => {
      const cssLinks = document.querySelectorAll('link[href*="boot_screen.css"]');
      cssLinks.forEach(link => link.remove());
    };
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Initializing Neural Network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* CSS Variables for eDEX theme colors and fonts */}
      <style jsx global>{`
        @font-face {
          font-family: 'Fira Code';
          src: url('/edex-boot/fonts/fira_code.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Mono';
          src: url('/edex-boot/fonts/fira_mono.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'United Sans Light';
          src: url('/edex-boot/fonts/united_sans_light.woff2') format('woff2');
          font-weight: 300;
          font-style: normal;
        }

        @font-face {
          font-family: 'United Sans Medium';
          src: url('/edex-boot/fonts/united_sans_medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
        }

        :root {
          --color_r: 0;
          --color_g: 255;
          --color_b: 255;
          --font_main: 'United Sans Medium', 'Fira Code', monospace;
        }

        body {
          background: #000;
          color: rgb(var(--color_r), var(--color_g), var(--color_b));
          font-family: var(--font_main);
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        body.solidBackground {
          background: linear-gradient(135deg, #001122 0%, #000000 100%);
        }

        section#boot_screen {
          position: fixed;
          top: 0vh;
          left: 0vh;
          width: 100%;
          height: 100%;
          padding: 2vh;
          margin: 0vh;
          overflow: hidden;
          font-family: 'Fira Mono', monospace;
          font-size: 1.4vh;
          text-align: left;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          white-space: pre-wrap;
          line-height: 1.4;
        }

        section#boot_screen.center {
          align-items: center;
          justify-content: center;
        }

        section#boot_screen h1 {
          font-family: var(--font_main);
          font-size: 10vh;
          text-align: center;
          border-bottom: 0.46vh solid rgb(var(--color_r), var(--color_g), var(--color_b));
          padding-top: 2vh;
          padding-right: 2vh;
          padding-left: 1.5vh;
          background-color: transparent;
          opacity: 0;
          animation-name: fadeInTitle;
          animation-duration: 300ms;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-iteration-count: 1;
        }

        section#boot_screen h1.glitch {
          border: none;
          color: transparent;
        }

        @keyframes fadeInTitle {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        section#boot_screen h1::before {
          content: "LAB OF FUTURE";
          display: block;
          transform: translateY(100%) translateX(-2%);
          clip-path: polygon(100% 0%, 100% 40%, 0% 40%, 0% 0%);
          color: rgba(var(--color_r), var(--color_g), var(--color_b), 0.8);
          animation-name: derezzer_top;
          animation-duration: 50ms;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: alternate-reverse;
          animation-play-state: paused;
          height: 0px;
          opacity: 0;
        }

        section#boot_screen h1.glitch::before {
          height: auto;
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes derezzer_top {
          from {transform: translateY(100%) translateX(-1%);}
          to {transform: translateY(100%) translateX(-5%);}
        }

        section#boot_screen h1::after {
          content: "LAB OF FUTURE";
          display: block;
          transform: translateY(-100%) translateX(2%);
          clip-path: polygon(100% 40%, 100% 100%, 0% 100%, 0% 40%);
          color: rgba(var(--color_r), var(--color_g), var(--color_b), 0.9);
          animation-name: derezzer_bottom;
          animation-duration: 50ms;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: alternate-reverse;
          animation-play-state: paused;
          height: 0px;
          opacity: 0;
        }

        section#boot_screen h1.glitch::after {
          height: auto;
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes derezzer_bottom {
          from {transform: translateY(-100%) translateX(1%);}
          to {transform: translateY(-100%) translateX(3%);}
        }

        /* START EXPERIENCE Button Styles */
        .start-experience-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 12vh;
          opacity: 0;
          animation: fadeInButton 1s ease-in-out 1s forwards;
        }

        @keyframes fadeInButton {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .shared-button-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
        }

        .shared-btn-svg {
          width: 80px;
          height: 80px;
          fill: none;
          stroke-width: 1.5;
          transition: transform 0.3s ease-in-out;
        }

        .shared-button-animation:hover .shared-btn-svg {
          transform: scale(1.05);
        }

        .shared-btn-svg__line-1-path,
        .shared-btn-svg__line-2-path {
          stroke: rgba(238, 238, 238, 0.1);
        }

        .shared-btn-svg__yellow-circle {
          stroke-dasharray: 450;
          stroke-dashoffset: 450;
          stroke: #ffd369;
        }

        .shared-btn-svg__line-2-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          stroke: rgba(238, 238, 238, 0.3);
        }

        .shared-button-animation--ready .shared-btn-svg__line-2-path {
          animation: draw 1.5s ease-in-out forwards;
          animation-delay: 0.5s;
        }

        .shared-button-animation--ready .shared-btn-svg__yellow-circle {
          animation: draw 1.5s ease-in-out forwards;
          animation-delay: 0.8s;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .shared-btn-text {
          color: #eee;
          font-size: 0.9rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          text-shadow: 0 0 5px #ffd369, 0 0 10px #ffd369, 0 0 20px #ffd369;
          transition: transform 0.3s ease-in-out;
          font-family: var(--font_main);
        }

        .shared-button-animation:hover .shared-btn-text {
          transform: scale(1.05);
        }

        .shared-btn-text:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Boot screen container */}
      <section id="boot_screen"></section>

      {/* Skip instruction */}
      <div className="fixed bottom-4 right-4 text-green-400/60 text-xs font-mono z-50">
        Click anywhere to skip
      </div>
    </div>
  );
}