import {
  parseDate,
} from "@/filters/index.ts";

export const isUpdate = () => {
  return {
    isLoad: false,
    isEdit: false,
  };
};

// 0：材料、1：问卷、2：活动、3：纪要
export const relationType = {
  0: "material",
  1: "questionnaire",
  2: "activity",
  3: "summary",
};

// 新增的formData
export const initForm = () => {
  return {
    title: "",
    userSet: [],
    finishTime: parseDate(new Date(), 'yyyy-MM-DD ') + '23:59:59',
    annexes: [],
    urgency: "0",
    type: "0",
  };
};

// 详情的formData，和上面的有些区别，但是具体啥忘了
export const initFormData = () => {
  return {
    title: "",
    orgId: 0,
    userSet: [],
    finishTime: "",
    state: 0,
    publisherObj: {},
    cooperationTaskUserVOList: [],
    id: 0,
    timeDifference: {},
    taskState: "0",
    annexes: [],
    material: [],
    type: "0",
    cycle: "",
  };
};

// 详情 - 头部tag
export const taskState = {
  0: {
    name: "未接受",
    type: "success",
  },
  1: {
    name: "标记完成",
    type: "info",
  },
  2: {
    name: "已完成",
    type: "success",
  },
  3: {
    name: "已拒绝",
    type: "warning",
  },
  4: {
    name: "已关闭",
    type: "danger",
  },
};

// 紧急程度
export const urgencyList = [{
  value: "0",
  name: "一般",
}, {
  value: "1",
  name: "紧急",
}, {
  value: "2",
  name: "非常紧急",
}];

// 重复任务
export const repeatList = [{
  name: "不重复",
  value: "0",
}, {
  name: "每日重复",
  value: "1",
}, {
  name: "每周重复",
  value: "2",
}, {
  name: "每月重复",
  value: "3",
}, {
  name: "自定义重复",
  value: "4",
}];

export const urgencyTransf = (val) => {
  for (const item of urgencyList) {
    if (val === item.value) {
      return item.name;
    }
  }
};

export const stateObj = {
  "0": {
    icon: "el-icon-woneng-gengduoshixin",
    name: "进行中",
    color: '#3cd589',
  },
  "1": {
    icon: "el-icon-woneng-chenggong2shixin",
    name: "已完成",
    color: '#2e81ff',
  },
  "2": {
    icon: "el-icon-woneng-guanbihuozheshibaishixin",
    name: "已关闭",
    color: '#666769',
  },
};

export const rules = {
  title: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  orgId: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  finishTime: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
};

// 详情修改页面中各表单元素的显示状态
export const formStateObj = () => {
  return {
    user: -1,
    userHidden: true,
    descHidden: true,
  };
};

// 获取字符串的实际字符数量
export const getStringLength = (str = "") => {
  let b = 0;
  if (str.length > 0) { // 如果存在字符串，则执行计划
    for (let i = 0; i < str.length; i++) { // 遍历字符串，枚举每个字符
      if (str.charCodeAt(i) > 255) { // 字符编码大于255，说明是双字节字符
        b += 2; // 则累加2个
      } else {
        b++; // 否则递加一次
      }
    }
    return b; // 返回字节数
  } else {
    return 0; // 如果参数为空，则返回0个
  }
};

/**
 * 获取文本内容的实际行数
 * @param {*} str 文本内容
 * @param {*} num 一行的数量
 */
export const getContentRows = (str = "", num = 30) => {
  // 每num个字符一行，遇到回车加一
  if (str.length === 0) return 0;
  let count = 0;
  let rows = 1;
  for (let i = 0; i < str.length; ++i) {
    if (str.charCodeAt(i) === 10) {
      rows++;
      count = 0;
    } else if (str.charCodeAt(i) > 255) { // 字符编码大于255，说明是双字节字符
      count += 2; // 则累加2个
      if (count > num) {
        count = 0;
        rows++;
      }
    } else {
      count++; // 否则递加一次
      if (count > num) {
        count = 0;
        rows++;
      }
    }
  }
  return rows;
};
