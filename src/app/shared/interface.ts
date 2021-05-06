export interface CheckBox {
  id: number;
  name: string;
  isselected: boolean;
}
// export interface PostCard {
//   name: string;
// }
export interface DataOfCard {
  title: string;
  text: string;
  tag: string[];
  status: boolean;
  author: string;
  date: number;
  completed: boolean;
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
  comments: {};
  id: string;
}
export interface DataOfComment {
  authorComment: string;
  dateCreateComment: string;
  textComment: string;
}

export interface FilterSettings {

  completed: string;
  filteringByDate: number;
  checkBox: string[];

}
