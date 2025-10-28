'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Crown, 
  Shield, 
  Award, 
  Target, 
  Zap, 
  Clock,
  Code,
  TrendingUp,
  Flame,
  Medal
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Achievement } from '@/lib/types';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Blood',
    description: 'Solved your first problem',
    icon: 'target',
    unlockedAt: new Date('2024-01-15'),
    rarity: 'COMMON',
    category: 'MILESTONE'
  },
  {
    id: '2',
    name: 'Speed Runner',
    description: 'Solved a problem in under 5 minutes',
    icon: 'zap',
    unlockedAt: new Date('2024-02-01'),
    rarity: 'RARE',
    category: 'SPEED'
  },
  {
    id: '3',
    name: 'Streak Master',
    description: 'Maintained a 30-day coding streak',
    icon: 'flame',
    unlockedAt: new Date('2024-02-14'),
    rarity: 'EPIC',
    category: 'STREAK'
  },
  {
    id: '4',
    name: 'Problem Crusher',
    description: 'Solved 100 problems',
    icon: 'trophy',
    unlockedAt: new Date('2024-03-10'),
    rarity: 'EPIC',
    category: 'MILESTONE'
  },
  {
    id: '5',
    name: 'Hard Mode',
    description: 'Solved 10 Hard problems',
    icon: 'crown',
    unlockedAt: new Date('2024-03-25'),
    rarity: 'LEGENDARY',
    category: 'SOLVING'
  },
  {
    id: '6',
    name: 'Night Owl',
    description: 'Solved problems at 3 AM',
    icon: 'clock',
    unlockedAt: new Date('2024-04-01'),
    rarity: 'RARE',
    category: 'MASTERY'
  }
];

export function Achievements() {
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getAchievementIcon = (icon: string, rarity: Achievement['rarity']) => {
    const iconProps = {
      className: `w-8 h-8 ${getRarityIconColor(rarity)}`
    };

    switch (icon) {
      case 'target': return <Target {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'flame': return <Flame {...iconProps} />;
      case 'trophy': return <Trophy {...iconProps} />;
      case 'crown': return <Crown {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      case 'medal': return <Medal {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      default: return <Award {...iconProps} />;
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'COMMON': return 'text-gray-400 border-gray-400/50 bg-gray-400/10';
      case 'RARE': return 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10';
      case 'EPIC': return 'text-neon-purple border-neon-purple/50 bg-neon-purple/10';
      case 'LEGENDARY': return 'text-plasma-pink border-plasma-pink/50 bg-plasma-pink/10';
      default: return 'text-primary border-primary/50 bg-primary/10';
    }
  };

  const getRarityIconColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'COMMON': return 'text-gray-400';
      case 'RARE': return 'text-neon-cyan';
      case 'EPIC': return 'text-neon-purple';
      case 'LEGENDARY': return 'text-plasma-pink';
      default: return 'text-primary';
    }
  };

  const getRarityGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'COMMON': return 'hover:shadow-lg hover:shadow-gray-400/20';
      case 'RARE': return 'hover:shadow-lg hover:shadow-neon-cyan/30 glow-border-sm';
      case 'EPIC': return 'hover:shadow-lg hover:shadow-neon-purple/30 glow-border';
      case 'LEGENDARY': return 'hover:shadow-xl hover:shadow-plasma-pink/40 glow-border shadow-lg shadow-plasma-pink/20';
      default: return 'hover:shadow-lg';
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'SOLVING': return <Code className="w-3 h-3" />;
      case 'STREAK': return <Flame className="w-3 h-3" />;
      case 'SPEED': return <Zap className="w-3 h-3" />;
      case 'MASTERY': return <Star className="w-3 h-3" />;
      case 'MILESTONE': return <TrendingUp className="w-3 h-3" />;
      default: return <Award className="w-3 h-3" />;
    }
  };

  const totalPoints = achievements.reduce((sum, achievement) => {
    switch (achievement.rarity) {
      case 'COMMON': return sum + 10;
      case 'RARE': return sum + 25;
      case 'EPIC': return sum + 50;
      case 'LEGENDARY': return sum + 100;
      default: return sum;
    }
  }, 0);

  const rarityCount = achievements.reduce((acc, achievement) => {
    acc[achievement.rarity] = (acc[achievement.rarity] || 0) + 1;
    return acc;
  }, {} as Record<Achievement['rarity'], number>);

  return (
    <Card className="mission-card enhanced-hologram cyber-card glow-border">
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-plasma-pink/60"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-plasma-pink/60"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-plasma-pink/60"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-plasma-pink/60"></div>

      <CardHeader>
        <CardTitle className="text-xl font-space font-bold text-primary flex items-center gap-2">
          <Trophy className="w-5 h-5 text-plasma-pink" />
          ACHIEVEMENTS
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 rounded bg-card/50 border border-plasma-pink/30">
            <div className="text-lg font-space font-bold text-plasma-pink">{achievements.length}</div>
            <div className="text-xs font-space text-muted-foreground">UNLOCKED</div>
          </div>
          <div className="text-center p-2 rounded bg-card/50 border border-neon-purple/30">
            <div className="text-lg font-space font-bold text-neon-purple">{totalPoints}</div>
            <div className="text-xs font-space text-muted-foreground">POINTS</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg bg-card/30 border cursor-pointer transition-all duration-300 ${
                getRarityColor(achievement.rarity).includes('border-') 
                  ? getRarityColor(achievement.rarity).split(' ').find(c => c.includes('border-'))
                  : 'border-primary/30'
              } ${getRarityGlow(achievement.rarity)} hover:scale-105 ${
                selectedAchievement?.id === achievement.id ? 'ring-2 ring-neon-cyan scale-105' : ''
              }`}
              onClick={() => setSelectedAchievement(
                selectedAchievement?.id === achievement.id ? null : achievement
              )}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  {getAchievementIcon(achievement.icon, achievement.rarity)}
                  {achievement.rarity === 'LEGENDARY' && (
                    <div className="absolute inset-0 animate-pulse rounded-full bg-plasma-pink/20"></div>
                  )}
                </div>
                
                <div>
                  <div className="text-sm font-space font-semibold text-primary mb-1">
                    {achievement.name}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Badge className={`font-space text-xs ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    {getCategoryIcon(achievement.category)}
                    <span className="font-mono">{achievement.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAchievement && (
          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className={`bg-card/50 border rounded-lg p-3 ${
              getRarityColor(selectedAchievement.rarity).includes('border-')
                ? getRarityColor(selectedAchievement.rarity).split(' ').find(c => c.includes('border-'))
                : 'border-primary/30'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {getAchievementIcon(selectedAchievement.icon, selectedAchievement.rarity)}
                <div>
                  <h3 className="font-space font-bold text-primary">{selectedAchievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAchievement.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Badge className={`font-space ${getRarityColor(selectedAchievement.rarity)}`}>
                    {selectedAchievement.rarity}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getCategoryIcon(selectedAchievement.category)}
                    <span className="font-mono">{selectedAchievement.category}</span>
                  </div>
                </div>
                <span className="font-mono text-muted-foreground">
                  {selectedAchievement.unlockedAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="text-xs font-space text-muted-foreground mb-2">RARITY BREAKDOWN</div>
          <div className="space-y-1">
            {Object.entries(rarityCount).map(([rarity, count]) => (
              <div key={rarity} className="flex items-center justify-between text-xs">
                <span className={`font-space ${getRarityIconColor(rarity as Achievement['rarity'])}`}>
                  {rarity}
                </span>
                <span className="font-mono text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}