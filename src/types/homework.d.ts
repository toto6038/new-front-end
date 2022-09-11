interface Homework {
  id?: string;
  name: string;
  markdown: string;
  start: number;
  end: number;
  problemIds: number[];
  studentStatus: {
    [username: string]: {
      [pid: string]: {
        score: number;
      };
    };
  };
}
