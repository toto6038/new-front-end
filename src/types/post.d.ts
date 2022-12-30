interface EditablePost {
  title: string;
  markdown: string;
  pinned: boolean;
}

interface Post extends EditablePost {
  id: string;
  creator: User;
  updateTime: number;
  createTime: number;
}
