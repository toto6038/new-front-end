interface EditablePost {
  title: string;
  markdown: string;
  pinned: boolean;
}

interface Post extends EditablePost {
  id: string;
  creator: Session;
  updateTime: number;
  createTime: number;
}
