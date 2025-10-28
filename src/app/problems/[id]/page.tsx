'use client';

import { Header } from '@/components/Header';
import { CompilerUI } from '@/components/CompilerUI';
import type { Problem } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useGlobalAudio } from '@/contexts/AudioContext';
import { useEffect, useState } from 'react';
import MemoryLoadingScreen from '@/components/MemoryLoadingScreen';

interface ProblemPageProps {
  params: {
    id: string;
  };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const { forcePlayMissionMusic, forcePlayBackgroundMusic, getCurrentMusicType } = useGlobalAudio();

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const { id } = resolvedParams;

        const response = await fetch(`/api/problems/${id}`);
        if (!response.ok) {
          notFound();
        }

        const data = await response.json();
        setProblem(data.problem);

        // Store age group in localStorage for theme persistence
        if (data.problem.age_group) {
          localStorage.setItem('currentAgeGroup', data.problem.age_group);
        }

        // Check if this is a special mission that should use scott-buckley music
        const problemTitle = data.problem.title?.toLowerCase() || '';
        const isGalacticMission = problemTitle.includes('galactic') || problemTitle.includes('code quest');
        const requiredMusicType = isGalacticMission ? 'mission' : 'background';
        const currentMusicType = getCurrentMusicType();

        // Only change music if we need to switch to a different type
        if (currentMusicType !== requiredMusicType) {
          if (isGalacticMission) {
            // Force switch to scott-buckley music for special missions
            await forcePlayMissionMusic();
          } else {
            // Force switch to base background music for regular problems
            await forcePlayBackgroundMusic();
          }
        }

      } catch (error) {
        console.error('Error loading problem:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params, forcePlayMissionMusic, forcePlayBackgroundMusic, getCurrentMusicType]);

  if (loading) {
    return (
      <MemoryLoadingScreen
        isVisible={loading}
        text="// Loading problem data..."
        duration={2000}
      />
    );
  }

  if (!problem) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <Header />
      <main className="flex-grow relative z-10 overflow-hidden">
        <CompilerUI problem={problem} />
      </main>

      {/* Audio Control - Fixed Bottom Left */}
    </div>
  );
}
