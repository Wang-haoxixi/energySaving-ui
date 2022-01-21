export const dictMaps = {
  reward: [
    {
      name: "不设置奖励",
      value: "0"
    },
    {
      name: "自动分配",
      value: "2"
    },
    {
      name: "手动分配",
      value: "1"
    }
  ],
  mode: [
    {
      name: "平均分配",
      value: "1"
    }
  ]
};

export const tips = {
  2: "分配规则：<br/>1、设置后会在您的账户中将输入的分配宝贝暂时锁定；<br/>2、在您确认完成后，将平均分配给还处于参与任务的并且标记任务完成的所有成员。<br/>请注意：<br/>1、如果任务结束前，参与任务并完成的人员只剩余1人，会将全部的宝贝分配给该成员；<br/>2、若完成前，所有参与人员退出，那么您设置的宝贝将在您选择完成后完整退回您的账户。",
  1: "分配规则：<br/>1.选择手动分配，您在确认完成任务时可进行批量打赏。<br/>请注意：<br/>1.在任务结束前，请确保您的任务有参与人员，若参与人员全部退出任务，那么将在任务完成时不再提醒奖励分配。"
};

export const initForm = () => {
  return {
    allocationType: "0",
    mode: "1",
    allocationAmount: "",
    safePassword: ""
  };
};
