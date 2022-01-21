<template>
  <iep-basic-container>
    <iep-page-header title="用户详情" :backOption="backOption">
      <el-button @click="handleWarning()" plain>警告</el-button>
      <el-button plain @click="changeUserLockOrUnlock()">{{lockText(form)}}</el-button>
    </iep-page-header>
    <div class="info-box" v-loading="loading">
      <div class="user-info">
        <iep-img :src="form.avatar" :resizeOpt="{l:140}"></iep-img>
        <div class="cont">
          <div class="user-name">
            {{form.realName}}
            <el-tag>{{dictsMap.lockFlag[form.lockFlag]}}</el-tag>
          </div>
          <div class="cont-box">
            <span>用户名ID：{{form.id}}</span>
            <span>性别：{{form.sex | showSex}}</span>
            <span>生日：{{form.birthday | showText}}</span>
            <span>手机号：{{form.mobile | showText}}</span>
            <span>地区：{{form.area | showText}}</span>
            <span>注册时间：{{form.createTime}}</span>
            <span>注册来源：无</span>
            <span>合伙人等级：{{form.partnerRank}}星合伙人</span>
            <span>邀请人：{{form.inviteName | showText}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="operate-group">
        <el-button type="primary">用户日志</el-button>
        <el-dropdown>
          <div class="down-it el-dropdown-link">
            <i class="el-icon-woneng-gengduo"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户动态</el-dropdown-item>
            <el-dropdown-item>用户数据</el-dropdown-item>
            <el-dropdown-item>认证材料</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>-->
    </div>
    <div class="data-wrap">
      <iep-data-item :value="form.exponent.assets" label="数据资产"></iep-data-item>
      <iep-data-item :value="form.exponent.credit" label="信用值"></iep-data-item>
      <iep-data-item :value="form.exponent.bellAssets" label="宝贝额"></iep-data-item>
      <iep-data-item :value="form.exponent.redness" label="红度"></iep-data-item>
      <iep-data-item :value="form.exponent.soCount" label="加入组织数量"></iep-data-item>
      <iep-data-item :value="form.exponent.apprentice" label="收徒数"></iep-data-item>
      <iep-data-item :value="form.exponent.invitations" label="邀请新用户数"></iep-data-item>
      <iep-data-item :value="form.exponent.materialWorth" label="专栏数"></iep-data-item>
      <iep-data-item :value="form.exponent.chatWorth" label="说说数"></iep-data-item>
      <iep-data-item :value="form.exponent.taskCount" label="任务数"></iep-data-item>
    </div>
    <iep-tabs :tabList="tabList" v-model="activeName">
      <template v-if="activeName==='reported'" v-slot:reported>
        <Reported></Reported>
      </template>
      <template v-if="activeName==='history'" v-slot:history>
        <History></History>
      </template>
      <template v-if="activeName==='redness'" v-slot:redness>
        <Redness></Redness>
      </template>
    </iep-tabs>
    <WarningDialog ref="WarningDialog" @load-page="loadPage()"></WarningDialog>
  </iep-basic-container>
</template>
<script>
import WarningDialog from "./WarningDialog";
import operationMixins from "@/mixins/operationMixins";
import { dictsMap, lockText } from "./options";
import { getStatisticsUserById } from "@/api/admin/statistics";
import { getOperateUserLockOrUnlock } from "@/api/admin/user";
import Reported from "./Components/Reported";
import History from "./Components/History";
import Redness from "./Components/Redness";
class UserExponent {
  apprentice = 0;
  assets = 0;
  bellAssets = 0;
  credit = 0;
  fan = 0;
  follow = 0;
  friend = 0;
  invitations = 0;
  redness = 0;
  materialWorth = 0;
  chatWorth = 0;
  soCount = 0;
  taskCount = 0;
}
class UserData {
  id = null;
  inviteId = null;
  mobile = null;
  partnerRank = null;
  inviteName = null;
  realName = null;
  sex = null;
  status = null;
  area = null;
  avatar = null;
  birthday = null;
  createTime = null;
  lockFlag = null;
  exponent = new UserExponent();
}
export default {
  mixins: [operationMixins],
  components: {
    WarningDialog,
    Reported,
    History,
    Redness,
  },
  data() {
    return {
      lockText,
      dictsMap,
      backOption: {
        isBack: true,
      },
      loading: false,
      tabList: [
        { label: "被举报详情", value: "reported" },
        { label: "历史操作日志", value: "history" },
        { label: "红度历史", value: "redness" },
      ],
      activeName: "reported",
      form: new UserData(),
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleWarning() {
      this.$refs["WarningDialog"].form.type = 1;
      this.$refs["WarningDialog"].form.dataId = this.form.id;
      this.$refs["WarningDialog"].dialogShow = true;
    },
    changeUserLockOrUnlock() {
      this._handleComfirm(
        this.form.id,
        getOperateUserLockOrUnlock,
        lockText(this.form),
      );
    },
    async loadPage() {
      const { data } = await getStatisticsUserById(this.$route.params.id);
      const exponent = this.$mergeByFirst(new UserExponent(), data.exponent);
      this.form = this.$mergeByFirst(new UserData(), data);
      this.form.exponent = exponent;
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
  .el-button {
    margin-left: 0;
  }
}
.info-box {
  display: flex;
  margin-bottom: 20px;
  .user-info {
    flex: 1;
    display: flex;
    .iep-image {
      width: 140px;
      height: 140px;
    }
    .cont {
      flex: 1;
      margin-left: 20px;
      .user-name {
        font-size: 18px;
        margin-bottom: 15px;
        .el-tag {
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          border-radius: $--small-border-radius;
        }
      }
      .cont-box {
        width: 100%;
        font-size: 14px;
        color: $--color-text-secondary;
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px 0;
      }
    }
  }
  .operate-group {
    .down-it {
      margin-left: 5px;
      margin-bottom: 10px;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background: rgba(243, 245, 245, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
.data-wrap {
  background: none;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  row-gap: 50px;
  justify-items: center;
  margin-bottom: 20px;
  .data-item {
    padding: 0 10px;
    width: 100%;
    border-right: 1px solid $--border-color;
    &:nth-child(5n) {
      border-right: 0;
    }
  }
}
</style>
