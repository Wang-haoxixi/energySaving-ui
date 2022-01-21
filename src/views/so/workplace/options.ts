const initForm = () => {
  return {
    orgId: 0,
    name: "",
    avatar: "",
    createBy: 0,
    sort: 0,
    establishmentTime: "",
    createTime: "",
    updateTime: "",
    parentId: 0,
    delFlag: "",
    creator: "",
    memberNum: 0,
    deptNum: 0,
    administrators: [],
    owner: { id: 0, name: "", avatar: "" }
  };
};

const actionBtnGroup = (that: any) => {
  return [
    {
      name: "新建部门",
      icon: "el-icon-woneng-bumenguanli",
      color: "#e8b177",
      func: () => {}
    },
    {
      name: "邀请用户",
      icon: "el-icon-woneng-ren-jia",
      color: "#e3797d",
      func: that.inviteSoUser
    },
    {
      name: "分享组织",
      icon: "el-icon-woneng-send1",
      color: "#77b4e3",
      func: that.inviteMember
    },
    {
      name: "新建通知",
      icon: "el-icon-woneng-xiaoxi1",
      color: "#e7a2a5",
      func: that.notice
    }
  ];
};
export { initForm, actionBtnGroup };
