const 聊天IDS = [10042, 10085, 10086];
const MofangIDS = [10045, 10049];
const MofangDetailIds = [10047];
const SoWelIDS = [10058, 10116, 10080];
const 说说IDS = [10094, 10095, 10096, 10097, 10098, 10099, 10100];
const TaskIDS = [
  10176,
  10177,
  10178,
  10181,
  10182,
  10183,
  10184,
  10185,
  10186,
  10187,
  10189,
  10193,
  10194,
  10195,
  10196,
  10203,
];
const 问卷列表IDS = [10173];
const 会议IDS = [10091, 10206];
const 问卷详情IDS = [10197, 10205];
const 活动IDS = [10208];
const 考试IDS = [10214];
const 课程IDS = [10246, 10247];
export const ALLIDS = [...聊天IDS, ...MofangIDS, ...SoWelIDS, ...说说IDS, ...TaskIDS, ...问卷列表IDS, ...会议IDS, ...问卷详情IDS, ...活动IDS, ...考试IDS, ...课程IDS];
export const is聊天 = (id: number) => {
  return 聊天IDS.includes(id);
};
export const isMofang = (id: number) => {
  return MofangIDS.includes(id);
};
export const isMofangDetail = (id: number) => {
  return MofangDetailIds.includes(id);
};
export const isSoWel = (id: number) => {
  return SoWelIDS.includes(id);
};
export const is说说 = (id: number) => {
  return 说说IDS.includes(id);
};
export const isTask = (id: number) => {
  return TaskIDS.includes(id);
};
export const is问卷列表 = (id: number) => {
  return 问卷列表IDS.includes(id);
};
export const is会议 = (id: number) => {
  return 会议IDS.includes(id);
};
export const is问卷详情 = (id: number) => {
  return 问卷详情IDS.includes(id);
};
export const is活动 = (id: number) => {
  return 活动IDS.includes(id);
};
export const is考试 = (id: number) => {
  return 考试IDS.includes(id);
};
export const is课程 = (id: number) => {
  return 课程IDS.includes(id);

};
