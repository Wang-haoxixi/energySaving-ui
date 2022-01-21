export const sortList = [
  {
    name: '任务类型',
    value: 'isOfficial',
    list: [
      {
        label: '全部',
        value: '',
      },
      {
        label: '官方任务',
        value: '1',
      },
      {
        label: '普通任务',
        value: '0',
      },
    ],
  },
  {
    name: '排序',
    value: 'sort',
    list: [
      {
        label: '按截止时间最近',
        value: '0',
      },
      {
        label: '按创建时间最晚',
        value: '1',
      },
      {
        label: '按创建时间最早',
        value: '2',
      },
      {
        label: '按优先级',
        value: '3',
      },
    ],
  },
];

export const initSearchData = () => {
  return {
    isOfficial: '',
    sort: "1",
  };
};