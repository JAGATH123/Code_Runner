'use client';

import { Header } from '@/components/Header';
import { ProfileStats } from '@/components/ProfileStats';
import { ActivityCalendar } from '@/components/ActivityCalendar';
import { Achievements } from '@/components/Achievements';
import { SkillsTags } from '@/components/SkillsTags';
import { ProblemChart } from '@/components/ProblemChart';
import { useGlobalAudio } from '@/contexts/AudioContext';
import { useEffect, useRef } from 'react';
import { useAnimations } from '@/hooks/useAnimations';
import { usePageAudio } from '@/hooks/usePageAudio';
import { 
  User, 
  Calendar, 
  Trophy, 
  Target, 
  Activity, 
  Code, 
  Zap, 
  Star,
  GitCommit,
  TrendingUp,
  Award,
  Terminal
} from 'lucide-react';

export default function ProfilePage() {
  const { } = useGlobalAudio();
  
  // Use the new page audio hook for smooth transitions
  usePageAudio({ audioType: 'profile' });
  const {
    createMatrixRain,
    createFloatingParticles,
    animateHeroEntrance,
    isLoaded
  } = useAnimations();

  const matrixRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        if (matrixRef.current) createMatrixRain(matrixRef.current);
        if (particlesRef.current) createFloatingParticles(particlesRef.current);
        animateHeroEntrance();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, createMatrixRain, createFloatingParticles, animateHeroEntrance]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div ref={matrixRef} className="fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Enhanced Animated Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5"></div>
        <div className="absolute inset-0 data-grid-bg"></div>
        <div className="absolute inset-0 matrix-rain-css"></div>
      </div>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Profile Header */}
        <div className="hero-badge text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-6 glow-border">
            <User className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span className="text-sm font-space text-neon-cyan">OPERATOR PROFILE</span>
            <Terminal className="w-4 h-4 text-neon-cyan animate-pulse" />
          </div>
          
          <h1 className="main-title text-4xl md:text-6xl font-space font-black tracking-tight mb-4 neon-text leading-none">
            NEURAL INTERFACE
          </h1>
          <div className="hero-subtitle text-lg md:text-xl font-space text-neon-cyan mb-2 glow-text">
            CODING MATRIX DASHBOARD
          </div>
          <p className="hero-description text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            Monitor your progress through the digital realm. Track your coding journey and unlock new levels of expertise.
          </p>
        </div>

        {/* Profile Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Profile Info & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileStats />
            <Achievements />
          </div>

          {/* Middle Column - Charts & Activity */}
          <div className="lg:col-span-2 space-y-6">
            <ProblemChart />
            <ActivityCalendar />
            <SkillsTags />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center p-6 border-t border-primary/20 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-green animate-pulse" />
            <span className="font-mono">NEURAL STATUS:</span>
            <span className="text-neon-green font-semibold">ACTIVE</span>
          </div>
          <div className="w-px h-4 bg-primary/30"></div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-neon-cyan">LAST SYNC: REAL-TIME</span>
          </div>
        </div>
      </footer>
    </div>
  );
}