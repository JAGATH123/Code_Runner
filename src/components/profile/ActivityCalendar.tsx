'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GitCommit, TrendingUp, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SubmissionDay {
  date: string;
  count: number;
  problems: number[];
}

const mockSubmissionData: SubmissionDay[] = [
  { date: '2024-01-01', count: 0, problems: [] },
  { date: '2024-01-02', count: 1, problems: [1] },
  { date: '2024-01-03', count: 3, problems: [2, 3, 4] },
  { date: '2024-01-04', count: 0, problems: [] },
  { date: '2024-01-05', count: 2, problems: [5, 6] },
  { date: '2024-01-06', count: 1, problems: [7] },
  { date: '2024-01-07', count: 0, problems: [] },
  { date: '2024-01-08', count: 4, problems: [8, 9, 10, 11] },
  { date: '2024-01-09', count: 2, problems: [12, 13] },
  { date: '2024-01-10', count: 1, problems: [14] },
  { date: '2024-01-11', count: 0, problems: [] },
  { date: '2024-01-12', count: 3, problems: [15, 16, 17] },
  { date: '2024-01-13', count: 1, problems: [18] },
  { date: '2024-01-14', count: 2, problems: [19, 20] },
  { date: '2024-01-15', count: 5, problems: [21, 22, 23, 24, 25] },
];

export function ActivityCalendar() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const generateYearData = () => {
    const data: SubmissionDay[] = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const existing = mockSubmissionData.find(item => item.date === dateStr);
      data.push(existing || {
        date: dateStr,
        count: Math.random() > 0.7 ? Math.floor(Math.random() * 6) : 0,
        problems: []
      });
    }
    
    return data;
  };

  const yearData = generateYearData();
  const totalSubmissions = yearData.reduce((sum, day) => sum + day.count, 0);
  const activeDays = yearData.filter(day => day.count > 0).length;
  const currentStreak = calculateCurrentStreak(yearData);

  function calculateCurrentStreak(data: SubmissionDay[]): number {
    let streak = 0;
    const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const day of sortedData) {
      if (day.count > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-card/30 border-primary/20';
    if (count === 1) return 'bg-neon-green/20 border-neon-green/40 glow-border-sm';
    if (count === 2) return 'bg-neon-green/40 border-neon-green/60 glow-border-sm';
    if (count === 3) return 'bg-neon-green/60 border-neon-green/80 glow-border';
    if (count >= 4) return 'bg-neon-green border-neon-green glow-border shadow-lg shadow-neon-green/30';
    return 'bg-card/30 border-primary/20';
  };

  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const organizeDataByWeeks = () => {
    const weeks: SubmissionDay[][] = [];
    let currentWeek: SubmissionDay[] = [];
    
    yearData.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (index === 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, problems: [] });
        }
      }
      
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, problems: [] });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeks = organizeDataByWeeks();
  const displayDate = hoveredDate || selectedDate;
  const displayDay = displayDate ? yearData.find(d => d.date === displayDate) : null;

  return (
    <Card className="mission-card enhanced-hologram cyber-card glow-border">
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-neon-green/60"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-neon-green/60"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-neon-green/60"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-neon-green/60"></div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-space font-bold text-primary flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-neon-green" />
            SUBMISSION MATRIX
          </CardTitle>
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 font-space text-xs">
            2024 CYCLE
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-space font-bold text-neon-green">{totalSubmissions}</div>
            <div className="text-xs font-space text-muted-foreground">TOTAL COMMITS</div>
          </div>
          <div>
            <div className="text-lg font-space font-bold text-neon-cyan">{activeDays}</div>
            <div className="text-xs font-space text-muted-foreground">ACTIVE DAYS</div>
          </div>
          <div>
            <div className="text-lg font-space font-bold text-neon-purple">{currentStreak}</div>
            <div className="text-xs font-space text-muted-foreground">CURRENT STREAK</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-space text-muted-foreground">2024</div>
            <div className="flex items-center gap-2 text-xs font-space text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm border ${getIntensityClass(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              <div className="flex flex-col gap-1 text-xs font-space text-muted-foreground mr-2">
                <div className="h-3"></div>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-3 flex items-center">
                    {day}
                  </div>
                ))}
              </div>
              
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  <div className="h-3 text-xs font-space text-muted-foreground text-center">
                    {weekIndex % 4 === 0 && week[0]?.date ? (
                      monthNames[new Date(week[0].date).getMonth()]
                    ) : ''}
                  </div>
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-110 ${
                        day.date ? getIntensityClass(day.count) : 'invisible'
                      } ${selectedDate === day.date ? 'ring-2 ring-neon-cyan' : ''}`}
                      onMouseEnter={() => day.date && setHoveredDate(day.date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      onClick={() => day.date && setSelectedDate(day.date === selectedDate ? null : day.date)}
                      title={day.date ? `${day.date}: ${day.count} submissions` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {displayDay && (
          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className="bg-card/50 border border-neon-cyan/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-neon-cyan" />
                <span className="font-space text-sm text-neon-cyan">
                  {new Date(displayDay.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="text-lg font-space font-bold text-primary">
                {displayDay.count} {displayDay.count === 1 ? 'Problem' : 'Problems'} Solved
              </div>
              {displayDay.count > 0 && (
                <div className="text-xs font-mono text-muted-foreground mt-1">
                  Problems: {displayDay.problems.join(', ')}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}