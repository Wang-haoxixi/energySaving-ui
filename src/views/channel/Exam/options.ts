const searchTypeList = [
  {
    label: '全部',
    value: '1',
  },
  {
    label: '课程',
    value: '2',
  },
  {
    label: '考试',
    value: '3',
  },
  {
    label: '练习',
    value: '4',
  },
];

const isAll = (value: string) => {
  return !['2', '3', '4'].includes(value);
};

const breadcrumbText = (value: string) => {
  if (!isAll(value)) {
    const i = searchTypeList.findIndex(m => m.value === value);
    return searchTypeList[i].label;
  } else {
    return '搜索结果';
  }
};

export {
  searchTypeList,
  isAll,
  breadcrumbText,
};
