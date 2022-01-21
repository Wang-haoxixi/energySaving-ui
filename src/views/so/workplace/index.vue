<template>
  <div class="console-grid-container">
    <div class="header-wrapper">
      <div class="info-wrapper">
        <iep-img class="info-img" :src="form.avatar"></iep-img>
        <div class="title-detail-wrapper">
          <div class="title-wrapper">
            <div class="title-box">
              <h1 class="title" :title="form.name">{{form.name}}</h1>
              <el-button
                class="perfect"
                icon="el-icon-edit"
                title="修改组织"
                @click="$openPage('/so/info')"
              ></el-button>
            </div>
            <el-button type="primary">组织认证</el-button>
          </div>
          <div class="detail-wrapper">
            <div>
              组织所属：
              <label>{{form.creator}}</label>
            </div>
            <div>
              成员数量：
              <label>{{form.memberNum}}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="type-wrapper">
        <div>
          <div class="title-box">
            <h3 class="text">最新日志：</h3>
            <el-link class="see" :underline="false" @click="$openPage('/so/log')">查看更多</el-link>
          </div>
        </div>
        <div class="desc-wrapper">
          <iep-no-data v-if="!logList.length" complex :showImg="false"></iep-no-data>
          <div class="li" v-for="item in logList" :key="item.id">
            <el-link :underline="false" @click="$openPage('/so/log')">{{item.title}}</el-link>
            <div class="times">{{item.createTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="operation-wrapper">
      <template v-for="item in actionBtnGroup">
        <div class="action-box" v-if="!item.hidden" :key="item.name" @click="item.func()">
          <IepIcon :icon="item.icon" :aColor="item.aColor" :bColor="item.bColor"></IepIcon>
          <span class="title">{{item.name}}</span>
        </div>
      </template>
      <IepDialogInviteSoUser ref="IepDialogInviteSoUser"></IepDialogInviteSoUser>
      <IepDialogSendNotice ref="IepDialogSendNotice"></IepDialogSendNotice>
      <IepDialogInviteMember ref="IepDialogInviteMember"></IepDialogInviteMember>
    </div>
    <div class="setting-wrapper">
      <iep-wrapper title="相关设置">
        <setting-desc :data="settingList"></setting-desc>
      </iep-wrapper>
      <IepDialogSecurityStrategy ref="IepDialogSecurityStrategy" @load-page="loadPage()"></IepDialogSecurityStrategy>
      <IepDialogInviteSetting ref="IepDialogInviteSetting"></IepDialogInviteSetting>
      <IepDialogOrgCharge ref="IepDialogOrgCharge" @load-page="chargeLoadPage()"></IepDialogOrgCharge>
    </div>
    <div class="for-wrapper">
      <iep-wrapper title="组织归属" style="padding-bottom:0;">
        <div class="space-wrapper">
          <user-show-item :user="form.owner" :need-del="false"></user-show-item>
          <el-button
            class="move-so-btn"
            type="primary"
            plain
            @click="handleTransferSo()"
            v-show="(form.owner.id===userInfo.userId)"
          >转让组织</el-button>
        </div>
      </iep-wrapper>
      <IepDialogTransferSo ref="IepDialogTransferSo" @load-page="loadPage()"></IepDialogTransferSo>
    </div>
    <div class="admin-wrapper">
      <iep-wrapper title="管理员">
        <el-link type="primary" slot="right" :underline="false" @click="$openPage('/so/member')">管理</el-link>
        <div class="wrap-flex-wrapper iep-basic-scroll">
          <user-show-item
            v-for="item in form.administrators"
            :need-del="item.id!=form.owner.id"
            :key="item.id"
            :user="item"
            @on-del="handleDel(item.id)"
          ></user-show-item>
        </div>
      </iep-wrapper>
    </div>
    <div class="delete-wrapper" v-show="false">
      <div class="wrapper">
        <div class="title">解散组织</div>
        <div class="desc">一旦解散组织，组织内部所有项目、部门、成员等内容都将会永久删除。这是一个不可恢复的操作，请谨慎对待！</div>
      </div>
      <el-button type="primary" plain disabled>解散组织</el-button>
    </div>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import SettingDesc from "./SettingDesc";
import UserShowItem from "./UserShowItem";
import {
  getOrgById,
  delOrgAdminByUserId,
  orgOpenAllow,
  getOrgLogList,
} from "@/api/admin/org";
import { OrgEntity } from "@/types/org";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: {
    SettingDesc,
    UserShowItem,
  },
  data() {
    return {
      form: new OrgEntity(),
      logList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    settingList() {
      return [
        {
          name: "对外开放",
          desc: "对平台用户公开组织风采页",
          on: this.form.isOpen,
          disabled: false,
          extra: true,
          // extra: false,
          onChange: this.getFunction("isOpen"),
          extraOpt: {
            text: "安全策略",
            disabled: false,
            func: this.handleSecurityStrategy,
          },
        },
        {
          name: "允许加入",
          desc: "允许平台用户加入组织",
          on: this.form.allowJoin,
          disabled: false,
          extra: false, // TODO: 暂时隐藏
          onChange: this.getFunction("allowJoin"),
          extraOpt: {
            text: "邀请设置",
            disabled: false,
            func: this.inviteSetting,
          },
        },
        {
          name: "加入免审",
          desc: "自动审核通过用户加入组织的申请",
          on: this.form.isExempt,
          disabled: !this.form.allowJoin,
          extra: false,
          onChange: this.getFunction("isExempt"),
          extraOpt: {
            text: "",
            disabled: true,
            func: {},
          },
        },
        {
          name: "入组收费",
          desc: "对申请加入组织的用户设置收费规则",
          on: this.form.isCharge,
          disabled: !this.form.allowJoin,
          // disabled: true, // TODO: 暂时隐藏
          extra: true,
          onChange: this.handleCharge,
          extraOpt: {
            text: "收费设置",
            disabled: !this.form.isCharge || !this.form.allowJoin,
            // disabled: true, // TODO: 暂时隐藏
            func: this.orgChargeSetting,
          },
        },
      ];
    },
    actionBtnGroup() {
      return [
        {
          name: "新手任务",
          icon: "el-icon-woneng-fuxuan",
          aColor: "rgba(147,255,195,1)",
          bColor: "rgba(19,206,102,1)",
          func: this.newerTask,
          hidden: false,
        },
        {
          name: "邀请用户",
          icon: "el-icon-woneng-ren-jiashixin",
          aColor: "rgba(144,220,255,1)",
          bColor: "rgba(20,116,255,1)",
          func: this.inviteSoUser,
          hidden: false,
        },
        {
          name: "分享组织",
          icon: "el-icon-woneng-send1-sx",
          aColor: "rgba(255,226,144,1)",
          bColor: "rgba(255,160,20,1)",
          func: this.inviteMember,
          hidden: !this.form.allowJoin,
        },
        {
          name: "新建通知",
          icon: "el-icon-woneng-gonggaoshixin",
          aColor: "rgba(255,175,196,1)",
          bColor: "rgba(255,51,84,1)",
          func: this.notice,
          hidden: false,
        },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    newerTask() {
      this.$openPage("/so/newer");
    },
    handleTransferSo() {
      if (!this.form.magistrates.length) {
        this.$message.warning("您没有知事!");
        return;
      }
      this.$refs["IepDialogTransferSo"].orgId = this.form.orgId;
      this.$refs["IepDialogTransferSo"].orgName = this.form.name;
      this.$refs["IepDialogTransferSo"].magistrates = this.form.magistrates;
      this.$refs["IepDialogTransferSo"].dialogShow = true;
      this.$refs["IepDialogTransferSo"].form.userId =
        this.form.magistrates[0].id;
    },
    chargeLoadPage() {
      if (!this.form.isCharge) {
        this.getFunction("isCharge")();
      } else {
        this.loadPage();
      }
    },
    handleCharge(value) {
      if (value) {
        this.orgChargeSetting();
      } else {
        this.getFunction("isCharge")();
      }
    },
    getFunction(optName) {
      return async () => {
        const value = this.form[optName] ? 0 : 1;
        const { data } = await orgOpenAllow({
          [optName]: value,
        });
        if (data) {
          this.loadPage();
        }
      };
    },
    handleSecurityStrategy() {
      this.$refs["IepDialogSecurityStrategy"].value = this.form.visibleRange;
      this.$refs["IepDialogSecurityStrategy"].dialogShow = true;
    },
    inviteSetting() {
      this.$refs["IepDialogInviteSetting"].dialogShow = true;
    },
    orgChargeSetting() {
      this.$refs["IepDialogOrgCharge"].dialogShow = true;
      this.$refs["IepDialogOrgCharge"].form.cost = this.form.cost;
    },
    inviteSoUser() {
      if (this.form.isCharge) {
        this.$message.warning(
          "当前组织限外部用户主动申请加入，组织管理员不可定向邀请外部用户加入组织。",
        );
      } else {
        this.$refs["IepDialogInviteSoUser"].form = {
          orgId: this.form.orgId,
          orgName: this.form.name,
          users: [],
        };
        this.$refs["IepDialogInviteSoUser"].dialogShow = true;
      }
    },
    inviteMember() {
      this.$refs["IepDialogInviteMember"].form = { ...this.form };
      this.$refs["IepDialogInviteMember"].dialogShow = true;
    },
    notice() {
      this.$refs["IepDialogSendNotice"].selfAdd();
    },
    handleDel(id) {
      this._handleComfirm(id, delOrgAdminByUserId, "删除该管理员");
    },
    async loadPage() {
      this.loadLog();
      const { data } = await getOrgById(this.userInfo.orgId);
      this.form = this.$mergeByFirst(new OrgEntity(), data);
    },
    async loadLog() {
      const { data } = await getOrgLogList();
      this.logList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
