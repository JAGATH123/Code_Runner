
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Always redirect to login by default
    const timeoutId = setTimeout(() => {
      router.push('/login');
      setIsChecking(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-green-400 text-center font-mono">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p>Checking Access Privileges...</p>
        {isChecking && (
          <div className="mt-4">
            <button
              onClick={() => router.push('/login')}
              className="text-xs text-green-400/60 hover:text-green-400 transition-colors"
            >
              Click here if stuck
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
