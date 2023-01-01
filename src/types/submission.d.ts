declare enum SubmissionStatusCodes {
  PENDING = "-1",
  ACCEPTED = "0",
  WRONG_ANSWER = "1",
  COMPILE_ERROR = "2",
  TIME_LIMIT_EXCEED = "3",
  MEMORY_LIMIT_EXCEED = "4",
  RUNTIME_ERROR = "5",
  JUDGE_ERROR = "6",
  OUTPUT_LIMIT_EXCEED = "7",
}
// TODO: derived below type from SubmissionStatusCodes
declare type SubmissionStatusCode =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | "-1"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7";

declare enum SubmissionStatusColors {
  PENDING = "#9e675a",
  ACCEPTED = "#00C853",
  WRONG_ANSWER = "#F44336",
  COMPILE_ERROR = "#DD2C00",
  TIME_LIMIT_EXCEED = "#9c56a8",
  MEMORY_LIMIT_EXCEED = "#FF9800",
  RUNTIME_ERROR = "#2196F3",
  JUDGE_ERROR = "#a65a5c",
  OUTPUT_LIMIT_EXCEED = "#BF360C",
}

interface Case {
  execTime: number;
  memoryUsage: number;
  status: SubmissionStatusCode;
}

interface Task {
  cases: Case[];
  execTime: number;
  memoryUsage: number;
  score: number;
  status: SubmissionStatusCode;
}

interface SubmissionListItem {
  languageType: number;
  lastSend: number;
  memoryUsage: number;
  problemId: number;
  runTime: number;
  score: number;
  status: SubmissionStatusCode;
  submissionId: string;
  timestamp: number;
  user: Pick<User, "username" | "displayedName" | "role" | "md5">;
}

interface Submission extends SubmissionListItem {
  code: string;
  tasks: Task[];
}

interface GetSubmissionListResponse {
  submissions: SubmissionListItem[];
  submissionCount: number;
}

interface SubmissionListQuery {
  offset: number;
  count: number;
  course?: string;
  problemId?: string;
  status?: string;
  languageType?: string;
  username?: string;
}

interface SubmissionListFilter {
  problemId?: string;
  status?: string;
  languageType?: string;
  username?: string;
}
