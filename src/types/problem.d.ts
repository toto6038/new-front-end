interface EditableProblem {
  problemId?: number;
  problemName: string;
  description: {
    description: string;
    input: string;
    output: string;
    hint: string;
    sampleInput: string[];
    sampleOutput: string[];
  };
  tags: string[];
  allowedLanguage: number;
  quota: number;
  type: 0 | 1 | 2;
  status: ProblemStatus;
  testCase: {
    caseCount: number;
    memoryLimit: number;
    timeLimit: number;
    taskScore: number;
  }[];
}

interface Problem extends EditableProblem {
  // owner: string;
  // defaultCode: string;
  // courses: string[];
  submitCount: number;
  highScore: number;
}

interface Stats {
  statusCount: { [key: string]: number };
  triedUserCount: number;
  average: number;
  std: number;
  scoreDistribution: number[];
  acUserRatio: number[];
  top10RunTime: any[];
  top10MemoryUsage: any[];
}

declare enum ProblemStatus {
  Online = 1,
  Offline = 2,
}

type LangOption = { value: number; text: string; mask: number };
type ProblemUpdater = <K extends keyof EditableProblem>(key: K, value: EditableProblem[K]) => void;
