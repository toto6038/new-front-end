declare enum ProblemType {
  OJ = 0,
  FillIn = 1,
  HandWritten = 2,
}

declare enum ProblemStatus {
  Online = 1,
  Offline = 2,
}

interface ProblemForm {
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
  type: ProblemType;
  status: ProblemStatus;
  testCase: {
    taskScore: number;
    caseCount: number;
    memoryLimit: number;
    timeLimit: number;
  }[];
}

interface Problem {
  problemName: string;
  description: {
    description: string;
    input: string;
    output: string;
    hint: string;
    sampleInput: string[];
    sampleOutput: string[];
  };
  owner: User;
  tags: string[];
  allowedLanguage: number;
  courses: string[];
  quota: number;
  defaultCode: string;
  status: ProblemStatus;
  type: ProblemType;
  testCase: {
    taskScore: number;
    caseCount: number;
    memoryLimit: number;
    timeLimit: number;
  }[];
  submitCount: number;
  highScore: number;
}

interface ProblemListItem {
  problemId: number;
  problemName: string;
  status: ProblemStatus;
  ACUser: number;
  submitter: number;
  tags: string[];
  type: ProblemType;
  quota: number;
  submitCount: number;
}

type ProblemList = ProblemListItem[];

interface ProblemStats {
  statusCount: { [key in SubmissionStatusCode]: number };
  triedUserCount: number;
  average: number;
  std: number;
  scoreDistribution: number[];
  acUserRatio: number[];
  top10RunTime: SubmissionList;
  top10MemoryUsage: SubmissionList;
}

interface MossReport {
  cpp_report: string;
  python_report: string;
}

type LangOption = { value: number; text: string; mask: number };
type ProblemUpdater = <K extends keyof ProblemForm>(key: K, value: ProblemForm[K]) => void;
