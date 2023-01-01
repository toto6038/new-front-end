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

interface PostListItem {
  annId: string;
  createTime: number;
  creator: UserInfo;
  markdown: string;
  pinned: boolean;
  title: string;
  updateTime: number;
  updater: UserInfo;
}

type PostList = PostListItem[];
