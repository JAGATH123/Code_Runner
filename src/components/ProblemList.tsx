'use client';

import type { Problem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle, Zap, Target, Lock } from 'lucide-react';
import { useGlobalAudio } from '@/contexts/AudioContext';

interface ProblemListProps {
  problems: Problem[];
}

const difficultyVariant: { [key in Problem['difficulty']]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Intro: 'outline',
  Easy: 'default',
  Medium: 'secondary',
  Hard: 'destructive',
};

const difficultyColor: { [key in Problem['difficulty']]: string } = {
  Intro: 'text-neon-cyan',
  Easy: 'text-neon-green',
  Medium: 'text-neon-purple',
  Hard: 'text-plasma-pink',
};

export function ProblemList({ problems }: ProblemListProps) {
  const { playProjectTextSound } = useGlobalAudio();

  return (
    <div className="space-y-3">
        {problems.map((problem, index) => (
            <Link
                key={problem.problem_id}
                href={`/problems/${problem.problem_id}`}
                className="block"
                onClick={() => playProjectTextSound()}
            >
                <Card
                    className="hover:shadow-lg transition-all duration-300 group flex items-center border-2 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 40, 60, 0.95), rgba(0, 25, 40, 0.9))',
                        borderColor: 'rgba(0, 191, 255, 0.5)',
                        boxShadow: '0 0 15px rgba(0, 191, 255, 0.2)'
                    }}
                >
                    {/* Task Number Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>

                    <CardHeader className="flex-grow py-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Target className="h-4 w-4" style={{ color: '#00bfff' }} />
                            <span className="text-xs font-space uppercase tracking-wide font-bold" style={{ color: '#00bfff' }}>TASK {index + 1}</span>
                            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(0, 191, 255, 0.6)' }}></div>
                            <Badge
                                variant={difficultyVariant[problem.difficulty]}
                                className={`font-mono text-xs ${difficultyColor[problem.difficulty]} border-current`}
                            >
                                {problem.difficulty.toUpperCase()}
                            </Badge>
                        </div>
                        <CardTitle className="text-lg font-space transition-colors" style={{ color: '#f3ede9' }}>
                           {problem.title}
                        </CardTitle>
                    </CardHeader>

                    <CardFooter className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00bfff' }}></div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="font-space font-semibold hover:bg-blue-500/10"
                                style={{ color: '#00bfff' }}
                            >
                                <Zap className="h-4 w-4 mr-1" />
                                EXECUTE
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        ))}
    </div>
  );
}
