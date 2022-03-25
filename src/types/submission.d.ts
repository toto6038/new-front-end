interface Case {
  execTime: number;
  memoryUsage: number;
  status: number;
}

interface Task {
  cases: Case[];
  execTime: number;
  memoryUsage: number;
  score: number;
  status: number;
}

interface Submission {
  code: string;
  languageType: number;
  lastSend: number;
  memoryUsage: number;
  problemId: number;
  runTime: number;
  score: number;
  status: number;
  submissionId: string;
  tasks: Task[];
  timestamp: number;
  user: {
    displayedName: string;
    md5: string;
    role: number;
    username: string;
  };
}

interface SubmissionQuery {
  offset: number;
  count: number;
  course?: string;
  problemId?: number;
  status?: number;
  languageType?: number;
  username?: string;
}

interface UserDefinedSubmissionQuery {
  problemId?: number | null;
  status?: number | null;
  languageType?: number | null;
  username?: string | null;
}
