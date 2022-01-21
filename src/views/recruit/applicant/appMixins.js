import { inviteUserSo } from "@/api/admin/org";
import { mapActions, mapGetters } from "vuex";
import {
  recruitOperationReject,
  checkRecruit
} from "@/api/dms/recruit_operation";
import { transformString } from "@/util/dataDeal";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"]),
    getColumns() {
      return this[`${this.tabName}TableColumns`];
    },
    personalOperationOptions() {
      return [
        {
          name: "直聊",
          func: this.handleSendMsg,
          hidden: false
        },
        {
          name: "不合适",
          func: this.handleReject,
          hidden: row => {
            return row.status === "3";
          }
        },
        {
          name: "查看详情",
          func: this.handlePartnerDetail,
          hidden: !(this.tabName === "partner")
        },
        {
          name: "发送通知",
          func: this.handleEmail,
          hidden: false
        },
        {
          name: "邀请加入组织",
          func: this.handleInviteSoUsers,
          hidden: false
        },
        // {
        //   name: "加入花名册",
        //   func: this.handleUpdate,
        //   hidden: !(this.tabName === "position"),
        // },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: false
        }
      ];
    }
  },
  methods: {
    transformString,
    handleSelectionChange() {},
    tabClick(row) {
      this.pagedTable = [];
      this.queryForm.recruitType = this.tabList[row.index].type;
      this.searchPage();
    },
    // 直聊
    ...mapActions(["imcOpenConversionByTargetId"]),
    handleSendMsg(row) {
      const url = `${window.location.host}/channel/${
        row.type === "0" ? "recruit_detail" : "partner_detail"
      }/${row.applyId}`;
      const msg = `你好，我觉得你很合适我们公司的${row.name}，希望能和你进一步沟通～↵职位链接：${url}`;
      if (this.userInfo.userId === row.createBy) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: row.createBy + "",
          type: 1,
          messageContent: msg
        });
      }
    },
    // 不合适
    handleReject(row) {
      recruitOperationReject({
        orgId: this.userInfo.orgId,
        applyObj: [
          {
            applyId: row.applyId,
            type: row.type
          }
        ]
      }).then(({ data }) => {
        if (data) this.loadPage();
      });
    },
    // 发送通知
    handleEmail(row) {
      this.$refs.email.open({
        userId: row.createBy,
        realName: row.realName,
        recruitId: row.recruitId
      });
    },
    // 邀请加入组织
    handleInviteSoUsers(row) {
      inviteUserSo({
        userId: row.createBy,
        orgId: this.userInfo.orgId
      }).then(({ data }) => {
        if (data) this.$message.success("邀请成功！");
      });
    },
    // 查看合伙人信息
    handlePartnerDetail(row) {
      this.$refs.partnerInfo.open(row);
    },
    handleRealName(row) {
      this.$openPage(`/channel/styles/user/${row.createBy}/index`, 2);
      checkRecruit({
        type: row.type,
        applyId: row.applyId
      }).then(({ data }) => {
        if (data) this.loadPage();
      });
    }
  }
};
