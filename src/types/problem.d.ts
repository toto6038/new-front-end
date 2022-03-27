interface Problem {
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
  status: 0 | 1;
  testCase: {
    caseCount: number;
    memoryLimit: number;
    timeLimit: number;
    taskScore: number;
  }[];
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
