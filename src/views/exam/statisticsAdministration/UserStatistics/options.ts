export const initSearchForm = () => {
  return {
    realName: '',
    sort: "1",
  };
};

export const sortOptions = [
  {
    label: '参加考试数量倒序',
    value: '1',
  },
  {
    label: '合格率倒序',
    value: '2',
  },
  {
    label: '证书数量倒序',
    value: '3',
  },
];
