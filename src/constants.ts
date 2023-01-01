// the fourth one is handwritten, which wont show in submission list
export const LANG = ["c", "cpp", "py3", ""];
export const LANGUAGE_OPTIONS: LangOption[] = [
  { value: 0, text: "c", mask: 1 },
  { value: 1, text: "cpp", mask: 2 },
  { value: 2, text: "py", mask: 4 },
];

// the index is important
export const ROLE = ["Admin", "Teacher", "Student"];

// export const SUBMISSION_STATUS_CODES = {
//   [SubmissionStatusCodes.PENDING]: "Pending",
//   [SubmissionStatusCodes.ACCEPTED]: "Accepted",
//   [SubmissionStatusCodes.WRONG_ANSWER]: "Wrong Answer",
//   [SubmissionStatusCodes.COMPILE_ERROR]: "Compile Error",
//   [SubmissionStatusCodes.TIME_LIMIT_EXCEED]: "Time Limit Exceed",
//   [SubmissionStatusCodes.MEMORY_LIMIT_EXCEED]: "Memory Limit Exceed",
//   [SubmissionStatusCodes.RUNTIME_ERROR]: "Runtime Error",
//   [SubmissionStatusCodes.JUDGE_ERROR]: "Judge Error",
//   [SubmissionStatusCodes.OUTPUT_LIMIT_EXCEED]: "Output Limit Exceed",
// };
// export const SUBMISSION_STATUS_COLORS = {
//   [SubmissionStatusCodes.PENDING]: SubmissionStatusColors.PENDING,
//   [SubmissionStatusCodes.ACCEPTED]: SubmissionStatusColors.ACCEPTED,
//   [SubmissionStatusCodes.WRONG_ANSWER]: SubmissionStatusColors.WRONG_ANSWER,
//   [SubmissionStatusCodes.COMPILE_ERROR]: SubmissionStatusColors.COMPILE_ERROR,
//   [SubmissionStatusCodes.TIME_LIMIT_EXCEED]: SubmissionStatusColors.TIME_LIMIT_EXCEED,
//   [SubmissionStatusCodes.MEMORY_LIMIT_EXCEED]: SubmissionStatusColors.MEMORY_LIMIT_EXCEED,
//   [SubmissionStatusCodes.RUNTIME_ERROR]: SubmissionStatusColors.RUNTIME_ERROR,
//   [SubmissionStatusCodes.JUDGE_ERROR]: SubmissionStatusColors.JUDGE_ERROR,
//   [SubmissionStatusCodes.OUTPUT_LIMIT_EXCEED]: SubmissionStatusColors.OUTPUT_LIMIT_EXCEED,
// };
export const SUBMISSION_STATUS_CODES = {
  "-1": "Pending",
  0: "Accepted",
  1: "Wrong Answer",
  2: "Compile Error",
  3: "Time Limit Exceed",
  4: "Memory Limit Exceed",
  5: "Runtime Error",
  6: "Judge Error",
  7: "Output Limit Exceed",
};
export const SUBMISSION_STATUS_COLORS = {
  "-1": "#9e675a",
  0: "#00C853",
  1: "#F44336",
  2: "#DD2C00",
  3: "#9c56a8",
  4: "#FF9800",
  5: "#2196F3",
  6: "#a65a5c",
  7: "#BF360C",
};
