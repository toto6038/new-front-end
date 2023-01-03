// the fourth one is handwritten, which wont show in submission list
export const LANG = ["c", "cpp", "py3", ""];
export const LANGUAGE_OPTIONS: LangOption[] = [
  { value: 0, text: "c", mask: 1 },
  { value: 1, text: "cpp", mask: 2 },
  { value: 2, text: "py", mask: 4 },
];

// the index is important
export const ROLE = ["Admin", "Teacher", "Student"];

// the order of the submission status & color is important
// we access both arrays by index submission.status + 1
export const SUBMISSION_STATUS = [
  "Pending",
  "Accepted",
  "Wrong Answer",
  "Compile Error",
  "Time Limit Exceed",
  "Memory Limit Exceed",
  "Runtime Error",
  "Judge Error",
  "Output Limit Exceed",
];
export const SUBMISSION_ALIAS = ["PE", "AC", "WA", "CE", "TLE", "MLE", "RE", "JE", "OLE"];
export const SUBMISSION_COLOR = [
  "#9e675a",
  "#00C853",
  "#F44336",
  "#DD2C00",
  "#9c56a8",
  "#FF9800",
  "#2196F3",
  "#a65a5c",
  "#BF360C",
];
