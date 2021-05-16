export interface CheckBox {
  id: number;
  name: string;
  isselected: boolean;
}
export interface PostCard {
  name: string;
}
export interface AdminsEmails {
  email: string[];
}
export interface CurrentUser {
  isAdmin: boolean;
  email: string;
}

export interface DataOfCard {
  title: string;
  text: string;
  tag: string[];
  isModeration: boolean;
  author: string;
  date: number;
  isAnsweredQuestion: boolean;
  comments: DataOfComment[];
  id: string;
}

export interface DataOfCardBase {
  title: string;
  text: string;
  tag: string[];
  status: boolean;
  author: string;
  date: number;
  completed: boolean;
  comments: { [key: string]: DataOfComment };
  id: string;
}
export interface DataOfComment {
  authorComment: string;
  dateCreateComment: number;
  textComment: string;
  isCorrectAnswer: boolean;
  idComment: string;
}

export interface FilterSettings {
  completed: string;
  filteringByDate: number;
  checkBox: (string | null)[];
  onModeration: boolean;
  myQuestion: boolean;
}
