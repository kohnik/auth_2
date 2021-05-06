import { CheckBox } from './interface';
export const date = new Date();
export const patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
export const patternForPassword = /[0-9a-zA-Z]{6,}/;
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
  'Other',
];
export const milSecInDay = 86400000;

export const typeFilteringByDate = [
  {
    name: 'last day',
    id: 1,
  },
  {
    name: 'last week',
    id: 7,
  },
  {
    name: 'last month',
    id: 30,
  },
  {
    name: 'all time',
    id: 2000,
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
  let i: number;
  const listForFilter = [];
  for (i = 0; i < checkBox.length; i++) {
    if (checkBox[i].isselected) {
      listForFilter.push(`${checkBox[i].name}`);
    }
  }
  return listForFilter;
};

export const getCheckboxs = () => {
  const checkboxList = [];
  let i: number;
  for (i = 0; i < tags.length; i++) {
    checkboxList.push({
      id: i + 1,
      name: `${tags[i]}`,
      isselected: false,
    });
  }
  return checkboxList as CheckBox[];
};

export const onChange = (tag: any, index: number, checkboxList: CheckBox[]) => {
  checkboxList[index].isselected = !checkboxList[index].isselected;
  return checkboxList;
};

export const createDateCreation = () => {
  let dateCreation: number;
  return (dateCreation = new Date().getTime());
};

export const getName = () => {
  let userName: string | undefined;
  return (userName = JSON.parse( `${localStorage.getItem('user')}`).email);
};
