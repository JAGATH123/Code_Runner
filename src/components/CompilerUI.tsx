'use client';

import type { Problem, ExecutionResult, SubmissionResult, TestCase } from '@/lib/types';
import { useState, useTransition, useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useGlobalAudio } from '@/contexts/AudioContext';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader, Play, Send, CheckCircle, XCircle, Clock, FileInput, FileOutput, Terminal, Target, Zap, Database, Activity, Cpu, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useProgress } from '@/lib/progress';
import Link from 'next/link';

interface CompilerUIProps {
  problem: Problem;
}

const statusColors = {
  Success: 'bg-neon-green',
  Error: 'bg-red-500',
  Accepted: 'bg-neon-green',
  'Wrong Answer': 'bg-red-500',
  '': 'bg-transparent',
};

const difficultyColor: { [key in Problem['difficulty']]: string } = {
  Intro: 'text-neon-cyan border-neon-cyan/40',
  Easy: 'text-neon-green border-neon-green/40',
  Medium: 'text-neon-purple border-neon-purple/40',
  Hard: 'text-plasma-pink border-plasma-pink/40',
};

export function CompilerUI({ problem }: CompilerUIProps) {
  const [code, setCode] = useState<string>(problem.example_code);
  const [customInput, setCustomInput] = useState<string>(problem.sample_input);
  const [result, setResult] = useState<ExecutionResult>({
    stdout: '',
    stderr: '',
    status: '',
    executionTime: null,
  });
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const { playProjectTextSound } = useGlobalAudio();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('customInput');
  const [problemTestCases, setProblemTestCases] = useState<TestCase[]>([]);
  const { toast } = useToast();
  const progress = useProgress();

  useEffect(() => {
    async function loadTestCases() {
      try {
        const response = await fetch(`/api/problems/${problem.problem_id}/test-cases`);
        if (response.ok) {
          const cases = await response.json();
          setProblemTestCases(cases);
        } else {
          console.error('Failed to load test cases:', response.status);
        }
      } catch (error) {
        console.error('Failed to load test cases:', error);
      }
    }
    loadTestCases();
  }, [problem.problem_id]);

  const handleRunCode = () => {
    startTransition(async () => {
      setResult({ stdout: '', stderr: '', status: 'Running', executionTime: null });
      setSubmissionResult(null);
      setActiveTab('result');

      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input: customInput, language: 'python' }),
      });
      const data: ExecutionResult = await response.json();
      setResult(data);
    });
  };

  const handleSubmitCode = () => {
     startTransition(async () => {
      setResult({ stdout: '', stderr: '', status: 'Submitting', executionTime: null });
      setSubmissionResult(null);
      setActiveTab('result');

      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: problem.problem_id, code, language: 'python' }),
        });
        const data = await response.json();
        if (response.ok) {
          setSubmissionResult(data.summary);
          
          // Mark problem and level as completed if all tests pass
          if (data.summary.status === 'Accepted') {
            progress.markProblemComplete(problem.problem_id);
            progress.markLevelComplete(problem.age_group, problem.level_number);
          }
          
          toast({
            title: `Submission ${data.summary.status}`,
            description: `Passed ${data.summary.passed}/${data.summary.total} test cases.`,
            variant: data.summary.status === 'Accepted' ? 'default' : 'destructive',
          });
        } else {
            throw new Error(data.error || 'Failed to submit.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        setResult({ stdout: '', stderr: errorMessage, status: 'Error', executionTime: null });
        toast({
          title: 'Submission Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    });
  };

  const renderResult = () => {
    if (isPending && (result.status === 'Running' || result.status === 'Submitting')) {
      return (
        <div className="flex flex-col items-center justify-center p-6 h-full space-y-4">
          <div className="relative">
            <Cpu className="h-10 w-10 text-neon-cyan animate-pulse" />
            <div className="absolute -inset-2 bg-neon-cyan/20 rounded-full blur animate-ping"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-space text-neon-cyan glow-text">{result.status.toUpperCase()}...</p>
            <p className="text-sm font-mono text-muted-foreground">Neural processors active</p>
          </div>
        </div>
      );
    }
    
    if (submissionResult) {
       const isAccepted = submissionResult.status === 'Accepted';
       return (
         <Alert variant={isAccepted ? 'default' : 'destructive'} className={`h-full border-2 ${isAccepted ? 'border-neon-green/50 bg-neon-green/10' : 'border-red-400/50 bg-red-400/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isAccepted ? <CheckCircle className="h-5 w-5 text-neon-green" /> : <XCircle className="h-5 w-5 text-red-400" />}
              <span className="font-space text-xs text-neon-cyan uppercase tracking-wide">SUBMISSION STATUS</span>
            </div>
           <AlertTitle className="text-lg font-space text-primary">{submissionResult.status}</AlertTitle>
           <AlertDescription className="text-foreground mt-2">
             Mission progress: {submissionResult.passed}/{submissionResult.total} protocols executed successfully.
           </AlertDescription>
         </Alert>
       );
    }

    if (result.status === 'Success' || result.status === 'Error') {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-space-gray/30 border border-primary/20">
            <div className="flex items-center gap-3">
              <Badge className={`${
                result.status === 'Success' 
                  ? 'bg-neon-green/20 text-neon-green border-neon-green/40' 
                  : 'bg-destructive/20 text-red-400 border-red-400/40'
              } font-space`}>
                {result.status === 'Success' ? 'EXECUTION SUCCESS' : 'RUNTIME ERROR'}
              </Badge>
              {result.executionTime !== null && (
                <div className="flex items-center gap-1 text-xs font-mono text-neon-cyan">
                  <Clock className="h-3 w-3" />
                  <span>{result.executionTime.toFixed(3)}s</span>
                </div>
              )}
            </div>
            <Terminal className="h-4 w-4 text-primary/60" />
          </div>

          {result.stdout && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-space text-neon-green">
                <FileOutput className="h-3 w-3" />
                <span>SYSTEM OUTPUT</span>
              </div>
              <div className="terminal-glow rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="font-code text-sm text-neon-green whitespace-pre-wrap leading-relaxed">
                  {result.stdout}
                </pre>
              </div>
            </div>
          )}
          
          {result.stderr && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-space text-red-400">
                <Zap className="h-3 w-3" />
                <span>ERROR LOG</span>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="font-code text-sm text-red-300 whitespace-pre-wrap leading-relaxed">
                  {result.stderr}
                </pre>
              </div>
            </div>
          )}
          
          {result.plots && result.plots.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-space text-neon-purple">
                <Target className="h-3 w-3" />
                <span>PLOT VISUALIZATION</span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-3">
                {result.plots.map((plot, index) => (
                  <div key={index} className="bg-space-gray/20 border border-neon-purple/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-neon-purple">Plot {index + 1}</span>
                    </div>
                    <div className="max-h-48 overflow-auto">
                      <img
                        src={plot}
                        alt={`Plot ${index + 1}`}
                        className="w-full h-auto rounded border border-neon-purple/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
        <Terminal className="h-12 w-12 text-muted-foreground" />
        <div>
          <p className="font-space text-muted-foreground">AWAITING EXECUTION</p>
          <p className="text-xs font-mono text-muted-foreground/60 mt-1">
            Initialize neural compiler to display results
          </p>
        </div>
      </div>
    );
  };

  const difficultyVariant: { [key in Problem['difficulty']]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    Intro: 'outline',
    Easy: 'default',
    Medium: 'secondary',
    Hard: 'destructive',
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="md:w-1/3 lg:w-2/5 p-6 overflow-y-auto border-r border-primary/20 bg-card">
        {/* Back to Sessions Button */}
        <Link href={`/levels/${problem.age_group}/${problem.level_number}#session-${problem.session_id}`}>
          <Button variant="ghost" className="mb-6 hover:bg-blue-500/10 font-space font-semibold uppercase tracking-wide text-sm" style={{ color: 'rgb(0, 191, 255)' }}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sessions
          </Button>
        </Link>

        {/* Problem Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <Target className="h-8 w-8 text-neon-purple" />
            <div className="absolute -inset-1 bg-neon-purple/20 rounded-full blur animate-pulse"></div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-neon-cyan" />
              <span className="text-xs font-space text-neon-cyan uppercase tracking-wide">
                TASK PROTOCOL
              </span>
            </div>
            <h1 className="text-2xl font-space font-bold text-primary mb-3">
              {problem.case_title || problem.title}
            </h1>
            <Badge
              variant={difficultyVariant[problem.difficulty]}
              className={`font-mono text-xs ${difficultyColor[problem.difficulty]} font-semibold`}
            >
              {problem.difficulty.toUpperCase()}
            </Badge>
          </div>
        </div>

        <Separator className="my-6 border-primary/30" />

        {/* Session Introduction - REMOVED: Now only shown at session level, not per problem */}

        {/* Question (Main Task) */}
        {problem.question && (
          <div className="mb-6 p-5 rounded-lg border-2 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" style={{ borderColor: 'rgba(0, 191, 255, 0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5" style={{ color: 'rgb(0, 191, 255)' }} />
              <span className="font-space text-sm font-bold uppercase tracking-wide" style={{ color: 'rgb(0, 191, 255)' }}>QUESTION</span>
            </div>
            <div className="text-foreground text-base leading-relaxed whitespace-pre-wrap font-medium">{problem.question}</div>
          </div>
        )}

        {/* Case Overview (for educational problems) */}
        {problem.case_overview && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-neon-cyan" />
              <span className="font-space text-sm text-neon-cyan uppercase tracking-wide">OVERVIEW</span>
            </div>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">{problem.case_overview}</div>
          </div>
        )}

        {/* Case Code Example (for educational problems) */}
        {problem.case_code && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="h-4 w-4 text-neon-green" />
              <span className="font-space text-sm text-neon-green uppercase tracking-wide">CODE</span>
            </div>
            <div className="terminal-glow rounded-lg p-4">
              <pre className="font-code text-sm text-neon-green whitespace-pre-wrap">{problem.case_code}</pre>
            </div>
          </div>
        )}

        {/* Case Explanation (for educational problems) */}
        {problem.case_explanation && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-neon-cyan" />
              <span className="font-space text-sm text-neon-cyan uppercase tracking-wide">EXPLANATION</span>
            </div>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">
              {problem.case_explanation.includes('|') && problem.case_explanation.includes('---') ? (
                // Render as table if markdown table detected
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-sm border border-neon-cyan/20">
                    <thead>
                      <tr className="border-b-2 border-neon-cyan/30 bg-neon-cyan/5">
                        {problem.case_explanation.split('\n').find(line => line.includes('|'))?.split('|').filter(cell => cell.trim()).map((header, i) => (
                          <th key={i} className="text-left py-2 px-4 text-neon-cyan font-semibold border-r border-neon-cyan/20 last:border-r-0">{header.trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {problem.case_explanation.split('\n')
                        .filter(line => line.includes('|') && !line.includes('---'))
                        .slice(1)
                        .map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b border-neon-cyan/20 hover:bg-neon-cyan/5">
                            {row.split('|').filter(cell => cell.trim()).map((cell, cellIndex) => (
                              <td key={cellIndex} className="py-2 px-4 border-r border-neon-cyan/20 last:border-r-0">{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="mt-4 whitespace-pre-wrap">
                    {problem.case_explanation.split('\n\n').slice(1).join('\n\n')}
                  </div>
                </div>
              ) : (
                problem.case_explanation
              )}
            </div>
          </div>
        )}

        {/* Mission Briefing (for traditional problems without case structure) */}
        {!problem.case_overview && problem.description && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-neon-green" />
              <span className="font-space text-sm text-neon-green uppercase tracking-wide">MISSION BRIEFING</span>
            </div>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{problem.description}</p>
          </div>
        )}

        {problem.objectives && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-neon-purple" />
              <span className="font-space text-sm text-neon-purple uppercase tracking-wide">OBJECTIVES</span>
            </div>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">{problem.objectives}</div>
          </div>
        )}

        {problem.concepts && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-neon-cyan" />
              <span className="font-space text-sm text-neon-cyan uppercase tracking-wide">CONCEPTS</span>
            </div>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">{problem.concepts}</div>
          </div>
        )}

        <Tabs defaultValue="sample" className="mt-6">
            <TabsList className="bg-space-gray/30 border border-primary/20">
                <TabsTrigger 
                  value="sample" 
                  className="font-space data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan"
                >
                  <FileInput className="w-4 h-4 mr-1" />
                  SAMPLE DATA
                </TabsTrigger>
                <TabsTrigger 
                  value="cases" 
                  className="font-space data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green"
                >
                  <Database className="w-4 h-4 mr-1" />
                  TEST PROTOCOLS
                </TabsTrigger>
            </TabsList>
            <TabsContent value="sample" className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileInput className="h-3 w-3 text-neon-cyan" />
                    <span className="font-space text-xs text-neon-cyan uppercase tracking-wide">INPUT DATA</span>
                  </div>
                  <div className="terminal-glow rounded-lg p-3">
                    <pre className="font-code text-sm text-neon-cyan whitespace-pre-wrap">{problem.sample_input}</pre>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileOutput className="h-3 w-3 text-neon-green" />
                    <span className="font-space text-xs text-neon-green uppercase tracking-wide">EXPECTED OUTPUT</span>
                  </div>
                  <div className="terminal-glow rounded-lg p-3">
                    <pre className="font-code text-sm text-neon-green whitespace-pre-wrap">{problem.sample_output}</pre>
                  </div>
                </div>
            </TabsContent>
            <TabsContent value="cases">
                <Card className="bg-card border-primary/30">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-primary/20">
                                    <TableHead className="font-space text-neon-cyan">INPUT</TableHead>
                                    <TableHead className="font-space text-neon-green">EXPECTED OUTPUT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {problemTestCases.slice(0, 5).map((testCase, index) => (
                                <TableRow key={index} className="border-primary/10">
                                    <TableCell className="font-code text-xs">
                                        <pre className="whitespace-pre-wrap text-neon-cyan">{testCase?.input ? String(testCase.input).replace(/\\n/g, '\n') : ''}</pre>
                                    </TableCell>
                                    <TableCell className="font-code text-xs">
                                        <pre className="whitespace-pre-wrap text-neon-green">{testCase?.expected_output ? String(testCase.expected_output).replace(/\\n/g, '\n') : ''}</pre>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

      <div className="md:w-2/3 lg:w-3/5 flex flex-col overflow-y-auto bg-card">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-card/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-neon-cyan" />
            <span className="font-space text-sm text-neon-cyan uppercase tracking-wide">NEURAL CODE EDITOR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-neon-green">READY</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col min-h-0 flex-shrink-0">
          <div className="p-1 bg-space-gray/30 border-b border-primary/20 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-neon-green rounded-full"></div>
            <span className="ml-2 font-mono text-xs text-muted-foreground">neural_task.py</span>
          </div>
          <div className="flex-grow">
            <CodeEditor language="python" value={code} onChange={(v) => setCode(v || '')} />
          </div>
        </div>
        <div className="flex-shrink-0 p-4 border-t border-primary/20 bg-card/20">
          <div className="flex justify-end gap-3 mb-3">
            <Button 
              variant="secondary" 
              onClick={() => {
                playProjectTextSound();
                handleRunCode();
              }}
              disabled={isPending}
              className="bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50 font-space font-semibold"
            >
              {isPending && result.status === 'Running' ? 
                <Loader className="mr-2 h-4 w-4 animate-spin" /> : 
                <Play className="mr-2 h-4 w-4" />
              }
              TEST RUN
            </Button>
            <Button 
              onClick={() => {
                playProjectTextSound();
                handleSubmitCode();
              }}
              disabled={isPending}
              className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/50 font-space font-semibold glow-border"
            >
               {isPending && result.status === 'Submitting' ? 
                 <Loader className="mr-2 h-4 w-4 animate-spin" /> : 
                 <Send className="mr-2 h-4 w-4" />
               }
              SUBMIT MISSION
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-space-gray/30 border border-primary/20">
              <TabsTrigger 
                value="customInput" 
                className="font-space data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan"
              >
                <FileInput className="w-4 h-4 mr-1" />
                INPUT
              </TabsTrigger>
              <TabsTrigger 
                value="result" 
                className="font-space data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green"
              >
                <FileOutput className="w-4 h-4 mr-1" />
                OUTPUT
              </TabsTrigger>
            </TabsList>
            <TabsContent value="customInput" className="mt-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileInput className="h-3 w-3 text-neon-cyan" />
                  <span className="font-space text-xs text-neon-cyan uppercase tracking-wide">SYSTEM INPUT</span>
                </div>
                <Textarea
                  placeholder="// Enter input data for your program
// Each line represents one input() call"
                  className="font-code h-32 bg-deep-space border border-neon-cyan/30 text-neon-cyan placeholder:text-muted-foreground/60 terminal-glow resize-none"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="result" className="mt-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileOutput className="h-3 w-3 text-neon-green" />
                  <span className="font-space text-xs text-neon-green uppercase tracking-wide">EXECUTION RESULTS</span>
                </div>
                <Card className="flex-grow overflow-hidden bg-card">
                  <CardContent className="p-4 h-full overflow-y-auto">
                      {renderResult()}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
