interface Post {
  id?: string;
  title: string;
  markdown: string;
  pinned: boolean;
  creator: Session;
  updateTime: number;
  createTime: number;
}
