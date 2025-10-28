'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Code, 
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ActivityEntry } from '@/lib/types';

const mockActivities: ActivityEntry[] = [
  {
    id: '1',
    type: 'SOLVED',
    problemId: 1,
    problemTitle: 'Two Sum',
    difficulty: 'Easy',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'SUCCESS'
  },
  {
    id: '2',
    type: 'ATTEMPTED',
    problemId: 15,
    problemTitle: '3Sum',
    difficulty: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'FAILED'
  },
  {
    id: '3',
    type: 'ACHIEVEMENT',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'SUCCESS'
  },
  {
    id: '4',
    type: 'SOLVED',
    problemId: 42,
    problemTitle: 'Trapping Rain Water',
    difficulty: 'Hard',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    status: 'SUCCESS'
  },
  {
    id: '5',
    type: 'ATTEMPTED',
    problemId: 23,
    problemTitle: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    status: 'PARTIAL'
  },
  {
    id: '6',
    type: 'STREAK',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'SUCCESS'
  },
  {
    id: '7',
    type: 'SOLVED',
    problemId: 101,
    problemTitle: 'Symmetric Tree',
    difficulty: 'Easy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'SUCCESS'
  },
  {
    id: '8',
    type: 'SOLVED',
    problemId: 234,
    problemTitle: 'Palindrome Linked List',
    difficulty: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: 'SUCCESS'
  }
];

export function RecentActivity() {
  const [activities] = useState<ActivityEntry[]>(mockActivities);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getActivityIcon = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'SOLVED':
        return <CheckCircle className="w-4 h-4 text-neon-green" />;
      case 'ATTEMPTED':
        return <Code className="w-4 h-4 text-neon-cyan" />;
      case 'ACHIEVEMENT':
        return <Trophy className="w-4 h-4 text-plasma-pink" />;
      case 'STREAK':
        return <Zap className="w-4 h-4 text-neon-purple" />;
      default:
        return <Target className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusIcon = (status: ActivityEntry['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-3 h-3 text-neon-green" />;
      case 'PARTIAL':
        return <AlertCircle className="w-3 h-3 text-yellow-400" />;
      case 'FAILED':
        return <XCircle className="w-3 h-3 text-red-400" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 border-green-400/50 bg-green-400/10';
      case 'Medium':
        return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
      case 'Hard':
        return 'text-red-400 border-red-400/50 bg-red-400/10';
      default:
        return 'text-primary border-primary/50 bg-primary/10';
    }
  };

  const getActivityDescription = (activity: ActivityEntry) => {
    switch (activity.type) {
      case 'SOLVED':
        return (
          <div className="flex items-center gap-2">
            <span className="text-neon-green font-semibold">Solved</span>
            <span className="text-primary font-mono">#{activity.problemId}</span>
            <span className="text-primary">{activity.problemTitle}</span>
          </div>
        );
      case 'ATTEMPTED':
        return (
          <div className="flex items-center gap-2">
            <span className="text-neon-cyan font-semibold">Attempted</span>
            <span className="text-primary font-mono">#{activity.problemId}</span>
            <span className="text-primary">{activity.problemTitle}</span>
          </div>
        );
      case 'ACHIEVEMENT':
        return (
          <div className="flex items-center gap-2">
            <span className="text-plasma-pink font-semibold">Unlocked Achievement</span>
            <span className="text-primary">Problem Solver Badge</span>
          </div>
        );
      case 'STREAK':
        return (
          <div className="flex items-center gap-2">
            <span className="text-neon-purple font-semibold">Maintained Streak</span>
            <span className="text-primary">15 days coding streak!</span>
          </div>
        );
      default:
        return <span className="text-primary">Activity logged</span>;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <Card className="mission-card enhanced-hologram cyber-card glow-border">
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-neon-cyan/60"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-neon-cyan/60"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-neon-cyan/60"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-neon-cyan/60"></div>

      <CardHeader>
        <CardTitle className="text-xl font-space font-bold text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-neon-cyan" />
          ACTIVITY LOG
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-card/30 border border-primary/20 hover:border-neon-cyan/50 transition-all duration-200 hover:bg-card/50"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getActivityDescription(activity)}
                  {activity.difficulty && (
                    <Badge className={`font-space text-xs ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono">{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {getStatusIcon(activity.status)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-space font-bold text-neon-green">24</div>
              <div className="text-xs font-space text-muted-foreground">THIS WEEK</div>
            </div>
            <div>
              <div className="text-lg font-space font-bold text-neon-purple">96.3%</div>
              <div className="text-xs font-space text-muted-foreground">SUCCESS RATE</div>
            </div>
            <div>
              <div className="text-lg font-space font-bold text-neon-cyan">3.2</div>
              <div className="text-xs font-space text-muted-foreground">AVG/DAY</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}