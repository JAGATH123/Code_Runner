'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code2, 
  Brain, 
  Database, 
  Lightbulb,
  Star,
  TrendingUp,
  Hash,
  Binary,
  Layers
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Skill } from '@/lib/types';

const mockSkills: Skill[] = [
  {
    name: 'Python',
    level: 8,
    problemCount: 45,
    category: 'LANGUAGE'
  },
  {
    name: 'JavaScript',
    level: 7,
    problemCount: 32,
    category: 'LANGUAGE'
  },
  {
    name: 'Arrays',
    level: 9,
    problemCount: 38,
    category: 'DATA_STRUCTURE'
  },
  {
    name: 'Dynamic Programming',
    level: 6,
    problemCount: 18,
    category: 'ALGORITHM'
  },
  {
    name: 'Binary Search',
    level: 7,
    problemCount: 24,
    category: 'ALGORITHM'
  },
  {
    name: 'Linked Lists',
    level: 8,
    problemCount: 22,
    category: 'DATA_STRUCTURE'
  },
  {
    name: 'Trees',
    level: 7,
    problemCount: 31,
    category: 'DATA_STRUCTURE'
  },
  {
    name: 'Graphs',
    level: 5,
    problemCount: 15,
    category: 'DATA_STRUCTURE'
  },
  {
    name: 'Recursion',
    level: 8,
    problemCount: 26,
    category: 'CONCEPT'
  },
  {
    name: 'Two Pointers',
    level: 9,
    problemCount: 28,
    category: 'CONCEPT'
  },
  {
    name: 'C++',
    level: 6,
    problemCount: 19,
    category: 'LANGUAGE'
  },
  {
    name: 'Sorting',
    level: 9,
    problemCount: 21,
    category: 'ALGORITHM'
  }
];

export function SkillsTags() {
  const [skills] = useState<Skill[]>(mockSkills.sort((a, b) => b.level - a.level));
  const [selectedCategory, setSelectedCategory] = useState<Skill['category'] | 'ALL'>('ALL');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getCategoryIcon = (category: Skill['category']) => {
    switch (category) {
      case 'LANGUAGE': return <Code2 className="w-4 h-4" />;
      case 'ALGORITHM': return <Brain className="w-4 h-4" />;
      case 'DATA_STRUCTURE': return <Database className="w-4 h-4" />;
      case 'CONCEPT': return <Lightbulb className="w-4 h-4" />;
      default: return <Hash className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'LANGUAGE': return 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10';
      case 'ALGORITHM': return 'text-neon-purple border-neon-purple/50 bg-neon-purple/10';
      case 'DATA_STRUCTURE': return 'text-neon-green border-neon-green/50 bg-neon-green/10';
      case 'CONCEPT': return 'text-plasma-pink border-plasma-pink/50 bg-plasma-pink/10';
      default: return 'text-primary border-primary/50 bg-primary/10';
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 9) return 'text-plasma-pink';
    if (level >= 7) return 'text-neon-green';
    if (level >= 5) return 'text-neon-cyan';
    return 'text-yellow-400';
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 9) return 'EXPERT';
    if (level >= 7) return 'ADVANCED';
    if (level >= 5) return 'PROFICIENT';
    return 'LEARNING';
  };

  const filteredSkills = selectedCategory === 'ALL' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const categories: (Skill['category'] | 'ALL')[] = ['ALL', 'LANGUAGE', 'ALGORITHM', 'DATA_STRUCTURE', 'CONCEPT'];

  const categoryStats = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<Skill['category'], number>);

  const totalProblems = skills.reduce((sum, skill) => sum + skill.problemCount, 0);
  const avgLevel = skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length;

  return (
    <Card className="mission-card enhanced-hologram cyber-card glow-border">
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-neon-green/60"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-neon-green/60"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-neon-green/60"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-neon-green/60"></div>

      <CardHeader>
        <CardTitle className="text-xl font-space font-bold text-primary flex items-center gap-2">
          <Layers className="w-5 h-5 text-neon-green" />
          SKILL MATRIX
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-space font-bold text-neon-green">{skills.length}</div>
            <div className="text-xs font-space text-muted-foreground">SKILLS</div>
          </div>
          <div>
            <div className="text-lg font-space font-bold text-neon-cyan">{totalProblems}</div>
            <div className="text-xs font-space text-muted-foreground">PROBLEMS</div>
          </div>
          <div>
            <div className="text-lg font-space font-bold text-neon-purple">{avgLevel.toFixed(1)}</div>
            <div className="text-xs font-space text-muted-foreground">AVG LEVEL</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer font-space text-xs transition-all duration-200 flex items-center gap-1 ${
                selectedCategory === category
                  ? category === 'ALL'
                    ? 'bg-primary/20 text-primary border-primary/50'
                    : getCategoryColor(category as Skill['category'])
                  : 'bg-card text-muted-foreground border-primary/30 hover:border-primary/50'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category !== 'ALL' && getCategoryIcon(category as Skill['category'])}
              {category === 'ALL' ? 'ALL' : category}
              {category !== 'ALL' && (
                <span className="ml-1 text-xs">
                  ({categoryStats[category as Skill['category']] || 0})
                </span>
              )}
            </Badge>
          ))}
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-card scrollbar-thumb-primary/30">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-3 rounded-lg bg-card/30 border border-primary/20 hover:border-neon-green/50 transition-all duration-200 hover:bg-card/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(skill.category)}
                    <span className="font-space font-semibold text-primary">{skill.name}</span>
                  </div>
                  <Badge className={`font-space text-xs ${getCategoryColor(skill.category)}`}>
                    {skill.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-sm font-space font-bold ${getSkillLevelColor(skill.level)}`}>
                      {getSkillLevelText(skill.level)}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {skill.problemCount} problems
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className={`w-4 h-4 ${getSkillLevelColor(skill.level)}`} />
                    <span className={`font-space font-bold ${getSkillLevelColor(skill.level)}`}>
                      {skill.level}/10
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <Progress value={skill.level * 10} className="h-2 bg-card/50 border border-primary/30">
                  <div 
                    className={`h-full transition-all duration-500 rounded-sm ${
                      skill.level >= 9 ? 'bg-plasma-pink glow-text' :
                      skill.level >= 7 ? 'bg-neon-green' :
                      skill.level >= 5 ? 'bg-neon-cyan' :
                      'bg-yellow-400'
                    }`}
                    style={{ width: `${Math.min(skill.level * 10, 100)}%` }}
                  />
                </Progress>
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Level {skill.level}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {skill.level < 10 ? `${10 - skill.level} to max` : 'Maxed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-primary/20">
          <div className="text-xs font-space text-muted-foreground mb-2">TOP SKILLS</div>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 5).map((skill) => (
              <Badge
                key={skill.name}
                className={`font-space text-xs ${getCategoryColor(skill.category)} cursor-default`}
              >
                {skill.name} ({skill.level}/10)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}