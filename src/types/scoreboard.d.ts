interface ScoreboardHeader {
  title: string;
  selector: (row: ScoreboardRow) => string | number;
}

type ScoreCell = {
  avg: number;
  count: number;
  max: number;
  min: number;
  pid: number;
};

type ScoreboardRow = {
  user: {
    displayedName: string;
    md5: string;
    role: number;
    username: string;
  };
  avg: number;
  sum: number;
} & {
  [key: string]: ScoreCell;
};
