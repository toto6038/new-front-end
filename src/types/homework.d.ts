interface EditableHomework {
  name: string;
  start: number;
  end: number;
  markdown: string;
  problemIds: number[];
}

interface Homework extends EditableHomework {
  studentStatus: {
    [username: string]: {
      [pid: string]: {
        score: number;
      };
    };
  };
}

interface HomeworkListItem extends Homework {
  id: string;
}
