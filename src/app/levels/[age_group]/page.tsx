
'use client';

import { Header } from '@/components/Header';
import { LevelList } from '@/components/LevelList';
import type { Level } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Terminal, Zap, Target, Activity } from 'lucide-react';
import { useGlobalAudio } from '@/contexts/AudioContext';
import { usePageAudio } from '@/hooks/usePageAudio';
import { useAnimations } from '@/hooks/useAnimations';
import { useEffect, useState } from 'react';
import MemoryLoadingScreen from '@/components/MemoryLoadingScreen';

interface LevelPageProps {
    params: {
        age_group: string;
    };
}

export default function LevelPage({ params }: LevelPageProps) {
    const [levelsData, setLevelsData] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);
    const [ageGroup, setAgeGroup] = useState<string>('');
    const { } = useGlobalAudio();

    // Use the new page audio hook for smooth transitions
    usePageAudio({ audioType: 'background' });

    const {
        animateHeroEntrance,
        animateCardsEntrance,
        addGlitchEffect,
        isLoaded
    } = useAnimations();

    useEffect(() => {
        async function loadData() {
            try {
                const resolvedParams = await params;
                const { age_group } = resolvedParams;
                setAgeGroup(age_group);

                const response = await fetch(`/api/levels/${age_group}`);
                if (!response.ok) {
                    notFound();
                }

                const data = await response.json();
                setLevelsData(data.levels);
            } catch (error) {
                console.error('Error loading levels:', error);
                notFound();
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params]);

    // Initialize animations and background when loaded
    useEffect(() => {
        if (isLoaded && !loading) {
            let cleanup: (() => void) | undefined;

            const timer = setTimeout(async () => {
                animateHeroEntrance();
                animateCardsEntrance();
                addGlitchEffect();
                cleanup = await initializeBackgroundEffects();
            }, 500);

            return () => {
                clearTimeout(timer);
                if (cleanup) cleanup();
            };
        }
    }, [isLoaded, loading]);

    // Initialize Three.js background effects
    const initializeBackgroundEffects = async () => {
        try {
            // Dynamically import Three.js
            const THREE = await import('three');
            const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

            // Initialize floating particles
            initFloatingParticles();

            // Initialize Three.js scene
            const container = document.getElementById('three-container');
            if (!container) return;

            // Clear any existing canvas
            container.innerHTML = '';

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x0a0e17, 0.05);

            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 10;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.enableZoom = false;

            // Create animated anomaly object
            const anomalyObject = new THREE.Group();
            const radius = 2;
            const geometry = new THREE.IcosahedronGeometry(radius, 2);

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color: { value: new THREE.Color(0x00ffff) } // Neon cyan for training
                },
                vertexShader: `
                    uniform float time;
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        vec3 pos = position;
                        float noise = sin(position.x * 2.0 + time) * 0.1;
                        pos += normal * noise;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 color;
                    varying vec3 vNormal;
                    void main() {
                        float fresnel = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
                        float pulse = 0.8 + 0.2 * sin(time * 2.0);
                        vec3 finalColor = color * fresnel * pulse;
                        gl_FragColor = vec4(finalColor, fresnel * 0.7);
                    }
                `,
                wireframe: true,
                transparent: true
            });

            const mesh = new THREE.Mesh(geometry, material);
            anomalyObject.add(mesh);
            scene.add(anomalyObject);

            // Add lights
            const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
            scene.add(ambientLight);

            const pointLight1 = new THREE.PointLight(0x00ffff, 1, 10);
            pointLight1.position.set(2, 2, 2);
            scene.add(pointLight1);

            // Animation loop
            const clock = new THREE.Clock();
            let animationFrameId: number;
            const animate = () => {
                const time = clock.getElapsedTime();

                controls.update();
                material.uniforms.time.value = time;
                anomalyObject.rotation.y += 0.005;
                anomalyObject.rotation.z += 0.002;

                renderer.render(scene, camera);
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();

            // Handle window resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            // Return cleanup function
            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                geometry.dispose();
                material.dispose();
                if (container && renderer.domElement) {
                    container.removeChild(renderer.domElement);
                }
            };

        } catch (error) {
            console.error('Error initializing background effects:', error);
            return undefined;
        }
    };

    // Initialize floating particles
    const initFloatingParticles = () => {
        const container = document.getElementById('floating-particles');
        if (!container) return;

        const numParticles = 800;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        container.innerHTML = '';
        const particles: any[] = [];

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '1.5px';
            particle.style.height = '1.5px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';

            // Cyan/green colors for training theme
            const cyanValue = Math.floor(Math.random() * 100) + 155;
            const opacity = Math.random() * 0.5 + 0.2;
            particle.style.backgroundColor = `rgba(0, ${cyanValue}, ${cyanValue}, ${opacity})`;

            const x = Math.random() * windowWidth;
            const y = Math.random() * windowHeight;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            const particleObj = {
                element: particle,
                x: x,
                y: y,
                speed: Math.random() * 0.5 + 0.1,
                angle: Math.random() * Math.PI * 2,
                size: 1.5
            };

            particles.push(particleObj);
            container.appendChild(particle);
        }

        // Animate particles
        let time = 0;
        const animateParticles = () => {
            time += 0.01;
            particles.forEach((particle) => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;

                if (particle.x < 0) particle.x = windowWidth;
                if (particle.x > windowWidth) particle.x = 0;
                if (particle.y < 0) particle.y = windowHeight;
                if (particle.y > windowHeight) particle.y = 0;

                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
            requestAnimationFrame(animateParticles);
        };
        requestAnimationFrame(animateParticles);
    };

    if (loading) {
        return (
            <MemoryLoadingScreen
                isVisible={loading}
                text={`// Loading ${ageGroup} mission data...`}
                duration={2000}
            />
        );
    }

    const formattedAgeGroup = ageGroup.replace('-', '–');

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0e17', color: '#f3ede9' }}>
            {/* Space Background Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: 'url("/technological-exploration-settlement.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>

            {/* Grid Overlay - Same as Home Page */}
            <div
                className="fixed inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            ></div>

            {/* Three.js Container */}
            <div id="three-container" className="fixed inset-0" style={{ zIndex: 2 }}></div>

            {/* Floating Particles Container */}
            <div id="floating-particles" className="fixed inset-0 pointer-events-none" style={{ zIndex: 3 }}></div>

            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                {/* Navigation Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm font-mono mb-8 text-neon-cyan">
                    <Link href="/home" className="hover:text-primary transition-colors flex items-center gap-1">
                        <Terminal className="h-3 w-3" />
                        <span>HOME_BASE</span>
                    </Link>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-neon-green">TRAINING_PROTOCOLS</span>
                </nav>

                {/* Mission Header */}
                <div className="text-center mb-12 space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="relative">
                            <Target className="h-12 w-12 text-neon-green" />
                            <div className="absolute -inset-2 bg-neon-green/20 rounded-full blur animate-pulse"></div>
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl md:text-4xl font-space font-bold text-primary glow-text">
                                OPERATIVE TRAINING
                            </h1>
                            <p className="text-lg font-mono text-neon-cyan opacity-80">
                                Ages {formattedAgeGroup} | Advanced Protocols
                            </p>
                        </div>
                    </div>

                    {/* Mission Briefing */}
                    <div className="max-w-3xl mx-auto relative">
                        {/* SVG Filter for Electric Border */}
                        <svg className="absolute" style={{ width: 0, height: 0 }}>
                            <defs>
                                <filter
                                    id="briefing-turbulent-displace"
                                    colorInterpolationFilters="sRGB"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                >
                                    <feTurbulence
                                        type="turbulence"
                                        baseFrequency="0.02"
                                        numOctaves="10"
                                        result="noise1"
                                        seed="1"
                                    />
                                    <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                                        <animate
                                            attributeName="dy"
                                            values="700; 0"
                                            dur="6s"
                                            repeatCount="indefinite"
                                            calcMode="linear"
                                        />
                                    </feOffset>
                                    <feTurbulence
                                        type="turbulence"
                                        baseFrequency="0.02"
                                        numOctaves="10"
                                        result="noise2"
                                        seed="1"
                                    />
                                    <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                                        <animate
                                            attributeName="dy"
                                            values="0; -700"
                                            dur="6s"
                                            repeatCount="indefinite"
                                            calcMode="linear"
                                        />
                                    </feOffset>
                                    <feComposite in="offsetNoise1" in2="offsetNoise2" result="combinedNoise" />
                                    <feDisplacementMap
                                        in="SourceGraphic"
                                        in2="combinedNoise"
                                        scale="15"
                                        xChannelSelector="R"
                                        yChannelSelector="B"
                                    />
                                </filter>
                            </defs>
                        </svg>

                        {/* Electric Border Container */}
                        <div
                            className="relative p-0.5 rounded-2xl"
                            style={{
                                background: 'linear-gradient(-30deg, rgba(0, 255, 255, 0.4), transparent, rgba(0, 255, 255, 0.4)), linear-gradient(to bottom, rgba(10, 14, 23, 1), rgba(10, 14, 23, 1))'
                            }}
                        >
                            {/* Inner Container */}
                            <div className="relative">
                                {/* Border Outer */}
                                <div
                                    className="border-2 rounded-2xl pr-1 pb-1"
                                    style={{ borderColor: 'rgba(0, 255, 255, 0.5)' }}
                                >
                                    {/* Main Briefing Card */}
                                    <div
                                        className="w-full rounded-2xl border-2 -mt-1 -ml-1 relative overflow-hidden p-6"
                                        style={{
                                            borderColor: '#00ffff',
                                            background: 'rgba(10, 14, 23, 0.95)'
                                        }}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <Zap className="h-5 w-5 text-neon-cyan" />
                                            <span className="font-space text-sm text-neon-cyan font-bold">MISSION BRIEFING</span>
                                        </div>
                                        <p className="text-lg font-medium" style={{ color: '#f3ede9', opacity: 0.8 }}>
                                            Select your training module to begin advanced neural programming protocols.
                                            Each mission is designed to enhance your computational abilities.
                                        </p>
                                    </div>
                                </div>

                                {/* Glow Layers */}
                                <div
                                    className="absolute inset-0 w-full h-full border-2 rounded-2xl"
                                    style={{
                                        borderColor: 'rgba(0, 255, 255, 0.6)',
                                        filter: 'blur(1px) url(#briefing-turbulent-displace)'
                                    }}
                                ></div>
                                <div
                                    className="absolute inset-0 w-full h-full border-2 rounded-2xl"
                                    style={{
                                        borderColor: '#00ffff',
                                        filter: 'blur(4px) url(#briefing-turbulent-displace)'
                                    }}
                                ></div>
                            </div>

                            {/* Overlay Effects */}
                            <div
                                className="absolute inset-0 w-full h-full rounded-2xl opacity-100 scale-110"
                                style={{
                                    mixBlendMode: 'overlay',
                                    filter: 'blur(16px)',
                                    background: 'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)'
                                }}
                            ></div>
                            <div
                                className="absolute inset-0 w-full h-full rounded-2xl opacity-50 scale-110"
                                style={{
                                    mixBlendMode: 'overlay',
                                    filter: 'blur(16px)',
                                    background: 'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)'
                                }}
                            ></div>

                            {/* Background Glow */}
                            <div
                                className="absolute inset-0 w-full h-full rounded-2xl -z-10 scale-110 opacity-30"
                                style={{
                                    filter: 'blur(32px)',
                                    background: 'linear-gradient(-30deg, #00ffff, transparent, #00ffff)'
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="flex items-center justify-center gap-4">
                        {/* Modules Count Badge */}
                        <div
                            className="flex items-center gap-2 px-3 py-1 rounded border-2 font-space font-semibold text-xs"
                            style={{
                                background: 'linear-gradient(135deg, rgba(10, 14, 23, 0.95), rgba(0, 50, 40, 0.9))',
                                borderColor: 'rgb(0, 255, 136)',
                                color: 'rgb(0, 255, 136)',
                                boxShadow: 'rgba(0, 255, 136, 0.3) 0px 0px 20px'
                            }}
                        >
                            <Activity className="w-3 h-3 text-neon-green animate-pulse" />
                            <span>{levelsData.length} MODULES</span>
                        </div>
                    </div>
                </div>

                <LevelList levels={levelsData} />
            </main>

            <footer className="text-center p-6 text-muted-foreground text-sm font-mono relative z-10 border-t border-neon-cyan/20 bg-space-gray/20 backdrop-blur-sm">
                <p>NEURAL NETWORK v2.847.x | Training Protocol Active</p>
            </footer>

            {/* Audio Control - Fixed Bottom Left */}
        </div>
    );
}
