interface Problem {
  id?: number;
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
  allowedLanguages: number;
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
  // submitCount: number;
}
