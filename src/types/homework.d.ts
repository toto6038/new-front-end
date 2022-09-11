interface EditableHomework {
  name: string;
  start: number;
  end: number;
  markdown: string;
  problemIds: number[];
}

interface Homework extends EditableHomework {
  id: string;
  studentStatus: {
    [username: string]: {
      [pid: string]: {
        score: number;
      };
    };
  };
}
