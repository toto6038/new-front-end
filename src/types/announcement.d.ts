interface AnnouncementForm {
  title: string;
  markdown: string;
  pinned: boolean;
}

interface Announcement extends AnnouncementForm {
  id: string;
  creator: User;
  updateTime: number;
  createTime: number;
}

interface AnnouncementListItem {
  annId: string;
  createTime: number;
  creator: UserInfo;
  markdown: string;
  pinned: boolean;
  title: string;
  updateTime: number;
  updater: UserInfo;
}

type AnnouncementList = AnnouncementListItem[];
