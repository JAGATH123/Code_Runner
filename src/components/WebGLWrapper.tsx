'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import WebGL components to prevent SSR and reduce bundle size
const SpaceWebGL = dynamic(() => import('./SpaceWebGL').then(mod => ({ default: mod.SpaceWebGL })), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan"></div>
      <p className="ml-4 text-neon-cyan font-space">Loading 3D Environment...</p>
    </div>
  )
});

const FuturisticWebGL = dynamic(() => import('./FuturisticWebGL').then(mod => ({ default: mod.FuturisticWebGL })), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan"></div>
      <p className="ml-4 text-neon-cyan font-space">Loading 3D Environment...</p>
    </div>
  )
});

const RSIStarMap = dynamic(() => import('./RSIStarMap').then(mod => ({ default: mod.RSIStarMap })), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan"></div>
      <p className="ml-4 text-neon-cyan font-space">Loading Star Map...</p>
    </div>
  )
});

interface WebGLWrapperProps {
  type: 'space' | 'futuristic' | 'starmap';
  className?: string;
}

export function WebGLWrapper({ type, className = "" }: WebGLWrapperProps) {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan"></div>
        <p className="ml-4 text-neon-cyan font-space">Initializing WebGL...</p>
      </div>
    }>
      <div className={className}>
        {type === 'space' && <SpaceWebGL />}
        {type === 'futuristic' && <FuturisticWebGL />}
        {type === 'starmap' && <RSIStarMap />}
      </div>
    </Suspense>
  );
}

export default WebGLWrapper;