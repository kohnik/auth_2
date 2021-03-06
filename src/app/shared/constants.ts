import {CheckBox, CurrentUser, DataOfCard, DataOfComment} from './interface';
export const patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
export const patternForPassword = /[0-9a-zA-Z]{6,}/;
export const link = 'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/';
export const dataOfCardForUnitTest: DataOfCard = {
  title: 'string',
  text: 'string',
  tag: [],
  isModeration: true,
  author: 'sdf234sdf',
  date: 12312312312,
  isAnsweredQuestion: false,
  comments: [],
  id: '-mdfdsfsdfds',
};

export let dataOfAllCardForUnitTest: DataOfCard[] = [{
  title: 'string',
  text: 'string',
  tag: [],
  isModeration: true,
  author: 'sdf234sdf',
  date: 12312312312,
  isAnsweredQuestion: false,
  comments: [],
  id: '-mdfdsfsdfds',
}];
export const dataOfAllCardForUnitTestWithisNoModeration: DataOfCard[] = [{
  title: 'string',
  text: 'string',
  tag: [],
  isModeration: false,
  author: 'sdsdsd',
  date: 12312312312,
  isAnsweredQuestion: false,
  comments: [],
  id: '-mdfdsfsdfds',
}];
export const request = { name: 'request' };
export const dataOfComment: DataOfComment = {
  authorComment: 'string',
  dateCreateComment: 12312312312,
  textComment: 'string',
  isCorrectAnswer: true,
  idComment: 'string',
};
export const currentUserForTest: CurrentUser = {
  isAdmin: false,
  email: 'sdf234sdf',
};
export const currentUserForTest1: CurrentUser = {
  isAdmin: true,
  email: 'sdfвыаsdf',
};


export const tags = [
  'Js',
  'Nodejs',
  'Ruby',
  'C++',
  'C#',
  'Java',
  'Python',
  'Angular',
  'React',
  'Vue',
];
export const milSecInDay = 86400000;
export const typeFilteringByDate = [
  {
    name: 'last day',
    day: 1,
  },
  {
    name: 'last week',
    day: 7,
  },
  {
    name: 'last month',
    day: 30,
  },
  {
    name: 'all time',
    day: 2000,
  },
];
export const typeFilteringQuestionsForModeration = [
  {
    name: 'On Moderation',
    isModeration: true,
  },
  {
    name: 'All questions',
    isModeration: false,
  },
];
export const typeFilteringByQuestionsCompleted = [
  {
    name: 'Отвечен',
    isCompleted: true,
  },
  {
    name: 'Не отвечен',
    isCompleted: false,
  },
  {
    name: 'Все',
    isCompleted: 'All',
  },
];
export const typeFilteringByQuestionAuthor = [
  {
    name: 'My question',
    isMyQuestions: true,
  },
  {
    name: 'All questions',
    isMyQuestions: false,
  },
];
export const typeTheme = [
  {
    name: 'white',
  },
  {
    name: 'black',
  },
];

export const createSuccessfulCheckBoxList = (checkBox: CheckBox[]) => {
  return checkBox
    .filter((item) => item.isselected)
    .map((item) => item.name);
};

export const getCheckboxs = () => {
  return tags.map((item: string, i: number) => {
    return {
      id: i + 1,
      name: `${tags[i]}`,
      isselected: false,
    };
  });
};

export const onChange = (index: number, checkboxList: CheckBox[]) => {
  checkboxList[index].isselected = !checkboxList[index].isselected;
  return checkboxList;
};

export const createDateCreation = () => {
  return new Date().getTime();
};
