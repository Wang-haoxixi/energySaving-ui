export const columnsMap = [
  { width: 85, label: "序号", prop: "jobId" },
  { width: 160, label: "任务名称", prop: "jobName" },
  { width: 160, label: "任务组名", prop: "jobGroup" },
  { width: 160, label: "任务状态", prop: "jobStatus", type: "dict" },
  { width: 160, label: "执行状态", prop: "jobExecuteStatus", type: "dict" },
  { width: 160, label: "首次执行时间", prop: "startTime" },
  { width: 160, label: "上次执行时间", prop: "previousTime" },
  { width: 160, label: "下次执行时间", prop: "nextTime" },
  { width: 160, label: "类型", prop: "jobType" },
  { width: 160, label: "执行路径", prop: "executePath" },
  { width: 160, label: "执行文件", prop: "className" },
  { width: 160, label: "执行方法", prop: "methodName" },
  { width: 160, label: "执行参数值", prop: "methodParamsValue" },
  { width: 160, label: "cron表达式", prop: "cronExpression" },
  { width: 160, label: "错失执行策略", prop: "misfirePolicy" },
  { width: 160, label: "备注信息", prop: "remark" },
];

export const dictsMap = {
  jobType: {
    1: "java类",
    2: "spring bean",
    3: "Rest 调用",
    4: "jar",
    9: "其他",
  },
  misfirePolicy: {
    1: "错失周期立即执行",
    2: "错失周期执行一次",
    3: "下周期执行",
  },
  jobStatus: {
    1: "未发布",
    2: "运行中",
    3: "暂停",
  },
  jobExecuteStatus: {
    0: "正常",
    1: "异常",
  },
};

export const initForm = () => {
  return {
    jobName: "",//任务名称
    jobGroup: "",//任务组名
    jobType: "",//类型
    executePath: "",//执行路径
    className: "",//执行文件
    methodName: "",//执行方法
    methodParamsValue: "",//执行参数值
    cronExpression: "",//cron表达式
    misfirePolicy: "",//错失执行策略
    // 错失周期立即执行1
    // 错失周期执行一次2
    // 下周期执行3

    remark: "",//备注信息
  };
};
