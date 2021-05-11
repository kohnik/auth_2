import { CheckBox } from './interface';
export const patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
export const patternForPassword = /[0-9a-zA-Z]{6,}/;
export const link = 'https://fir-auth-9b2a0-default-rtdb.firebaseio.com/';
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
  let listForFilter: any; // Вопрос с типом, либо я не правильно сделал map. Ибо тут тип string не получится, только такой тип string | null
  listForFilter = checkBox.map((item) => {
    if (item.isselected) {
      return item.name;
    } else {
      return null;
    }
  });
  return listForFilter;
};

export const getCheckboxs = () => {
  let checkboxList: CheckBox[];
  checkboxList = tags.map((item: string, i: number) => {
    return {
      id: i + 1,
      name: `${tags[i]}`,
      isselected: false,
    };
  });
  return checkboxList as CheckBox[];
};

export const onChange = (tag: any, index: number, checkboxList: CheckBox[]) => {
  checkboxList[index].isselected = !checkboxList[index].isselected;
  return checkboxList;
};

export const createDateCreation = () => {
  return new Date().getTime();
};
