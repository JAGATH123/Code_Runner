'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Calendar, 
  Trophy, 
  Target, 
  TrendingUp, 
  Zap, 
  Star,
  Shield,
  Crown,
  Award
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';

// Mock data - in real app, this would come from your database/API
const mockUserProfile: UserProfile = {
  id: '1',
  username: 'CodeRunner_Neo',
  email: 'neo@matrix.com',
  avatar: '/avatars/neo.jpg',
  joinDate: new Date('2024-01-15'),
  lastActive: new Date(),
  rank: 'ADVANCED',
  level: 42,
  experience: 15420,
  streak: {
    current: 15,
    longest: 28,
    lastSubmissionDate: new Date()
  },
  stats: {
    totalSolved: 187,
    easySolved: 89,
    mediumSolved: 73,
    hardSolved: 25,
    totalSubmissions: 342,
    acceptanceRate: 54.7
  },
  contestRating: 1847,
  achievements: [],
  skills: [],
  recentActivity: [],
  submissionCalendar: []
};

export function ProfileStats() {
  const [profile] = useState<UserProfile>(mockUserProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextLevelXP = (profile.level + 1) * 500;
  const currentLevelXP = profile.level * 500;
  const progressXP = profile.experience - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  const progressPercentage = (progressXP / neededXP) * 100;

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'NOVICE': return <Shield className="w-5 h-5 text-neon-cyan" />;
      case 'ADVANCED': return <Star className="w-5 h-5 text-neon-purple" />;
      case 'EXPERT': return <Trophy className="w-5 h-5 text-neon-green" />;
      case 'MASTER': return <Crown className="w-5 h-5 text-plasma-pink" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'NOVICE': return 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10';
      case 'ADVANCED': return 'text-neon-purple border-neon-purple/50 bg-neon-purple/10';
      case 'EXPERT': return 'text-neon-green border-neon-green/50 bg-neon-green/10';
      case 'MASTER': return 'text-plasma-pink border-plasma-pink/50 bg-plasma-pink/10';
      default: return 'text-primary border-primary/50 bg-primary/10';
    }
  };

  return (
    <Card className="mission-card enhanced-hologram cyber-card glow-border">
      {/* Corner indicators */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-neon-cyan/60"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-neon-cyan/60"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-neon-cyan/60"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-neon-cyan/60"></div>
      
      <CardHeader className="text-center space-y-4">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-20 h-20 border-2 border-neon-cyan glow-border">
            <AvatarImage src={profile.avatar} alt={profile.username} />
            <AvatarFallback className="bg-card text-neon-cyan font-space text-xl">
              {profile.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-space font-bold text-primary">{profile.username}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              {getRankIcon(profile.rank)}
              <Badge className={`font-space text-xs ${getRankColor(profile.rank)}`}>
                {profile.rank} OPERATIVE
              </Badge>
            </div>
          </div>
        </div>

        {/* Level & Experience */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-space text-muted-foreground">LEVEL</span>
            <span className="font-space font-bold text-neon-cyan">{profile.level}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-card border border-primary/30">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-500 rounded-sm glow-text"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </Progress>
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>{progressXP} XP</span>
            <span>{neededXP} XP</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-card/50 border border-neon-cyan/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-4 h-4 text-neon-cyan" />
              <span className="text-xs font-space text-neon-cyan">SOLVED</span>
            </div>
            <div className="text-2xl font-space font-bold text-primary">{profile.stats.totalSolved}</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-card/50 border border-neon-purple/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-neon-purple" />
              <span className="text-xs font-space text-neon-purple">STREAK</span>
            </div>
            <div className="text-2xl font-space font-bold text-primary">{profile.streak.current}</div>
          </div>
        </div>

        {/* Problem Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-space text-muted-foreground flex items-center gap-2">
            <Award className="w-4 h-4" />
            PROBLEM MATRIX
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded bg-green-500/10 border border-green-500/30">
              <div className="text-lg font-space font-bold text-green-400">{profile.stats.easySolved}</div>
              <div className="text-xs font-space text-green-400/80">EASY</div>
            </div>
            
            <div className="text-center p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
              <div className="text-lg font-space font-bold text-yellow-400">{profile.stats.mediumSolved}</div>
              <div className="text-xs font-space text-yellow-400/80">MEDIUM</div>
            </div>
            
            <div className="text-center p-2 rounded bg-red-500/10 border border-red-500/30">
              <div className="text-lg font-space font-bold text-red-400">{profile.stats.hardSolved}</div>
              <div className="text-xs font-space text-red-400/80">HARD</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-2 pt-2 border-t border-primary/20">
          <div className="flex justify-between items-center text-sm">
            <span className="font-space text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-3 h-3" />
              ACCURACY
            </span>
            <span className="font-space font-semibold text-neon-green">{profile.stats.acceptanceRate}%</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="font-space text-muted-foreground flex items-center gap-2">
              <Trophy className="w-3 h-3" />
              RATING
            </span>
            <span className="font-space font-semibold text-neon-purple">{profile.contestRating}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="font-space text-muted-foreground flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              JOINED
            </span>
            <span className="font-space text-muted-foreground">
              {profile.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}