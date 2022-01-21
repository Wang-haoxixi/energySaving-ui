<template>
  <div class="pay-deposit">
    <div class="box-wrapper" v-if="show">
      <h4>缴纳保证金</h4>
      <div class="box-card" shadow="hover" style="margin-bottom:40px">
        <h3>合伙人方案</h3>
        <iep-table
          :is-pagination="false"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        >
          <el-table-column label="合伙人等级" slot="before-columns">
            <template slot-scope="scope">
              <div class="rank">{{scope.row.rank}}</div>
            </template>
          </el-table-column>
        </iep-table>
        <h3 style="margin-top:20px">选择账户</h3>
        <div class="account-wrapper">
          <div
            class="account-item"
            :class="{active:form.agentType===1}"
            @click="form.agentType = 1,form.objectId=userInfo.userId"
          >
            个人账户
            <span class="this">
              <i class="el-icon-check"></i>
            </span>
          </div>
          <!-- <el-dropdown @command="handleClickOrg">
            <div class="account-item" :class="{active:form.agentType===2}" @click="form.agentType = 2,form.objectId=null">{{orgName}}</div>
            <el-dropdown-menu slot="dropdown">
              <el-scrollbar style="width:100%;height:300px;" native>
                <el-dropdown-item v-for="(item,index) in founderList" :key="index" :command="item">{{item.orgName}}</el-dropdown-item>
              </el-scrollbar>
            </el-dropdown-menu>
          </el-dropdown>-->
        </div>
        <h3 style="margin-top:20px">支付方式</h3>
        <div class="pay-wrapper">
          <!-- <div class="pay-item" :class="{active:form.payMode===1}" @click="form.payMode = 1"><img src="../img/wx.png" alt="" /></div> -->
          <!-- <div class="pay-item" :class="{active:form.payMode===2}" @click="form.payMode = 2"><img src="../img/zfb.png" alt="" /></div> -->
          <div class="pay-item" :class="{active:form.payMode===2}" @click="form.payMode = 2">
            <img src="/img/proxy/xx.png" alt />
            <span class="this">
              <i class="el-icon-check"></i>
            </span>
          </div>
          <!-- <div class="pay-item" :class="{active:form.payMode===4}" @click="form.payMode = 4"><img src="../img/dg.png" alt="" /></div> -->
        </div>
        <h5 class="explain">请将保证金缴纳至以下账户：</h5>
        <el-card class="item-card item-card-bg" shadow="never">
          <div class="account">
            <span class="account-name">公司名称：</span>
            <span>舟山网脉科技有限公司</span>
          </div>
          <div class="account">
            <span class="account-name">公司税号：</span>
            <span>税号91330901MA28K5CM7U</span>
          </div>
          <div class="account">
            <span class="account-name">开户行：</span>
            <span>浙商银行股份有限公司舟山分行</span>
          </div>
          <div class="account">
            <span class="account-name">银行账号：</span>
            <span>3420020010120100090747</span>
          </div>
        </el-card>
        <el-checkbox
          class="txt"
          v-model="checked"
          style="margin:0 5px;color:$--color-text-primary;font-family:Microsoft YaHei;"
        >
          我已认真阅读
          <b class="clause">《合伙人协议》</b>
        </el-checkbox>
        <div class="txt">
          <span>合计：</span>
          <span>
            <b class="num">{{form.payAmount}}</b>贝
          </span>
        </div>
        <el-card shadow="never" style="margin-top:40px;background-color: #fafafa;">
          <div class="careful-txt">支持开具电子发票，如有需要，请与客服联系</div>
          <div class="careful-txt">合伙人机制，退出平台合伙人后，支持退还相应保证金；如需开具发票，平台将扣除相关税费后予以退回剩余的保证金。</div>
        </el-card>
      </div>
      <div class="box-wrapper text-center">
        <iep-operation-wrapper>
          <iep-button type="primary" :loading="submitFormLoading" @click="submitForm()">提交</iep-button>
          <iep-button @click="handlePrev()">返回上一步</iep-button>
        </iep-operation-wrapper>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { initForm, initRowForm, columnsMap } from "./options";
import { createProxyManagement } from "@/api/dms/proxy";
export default {
  data() {
    return {
      columnsMap,
      form: initForm(),
      row: initRowForm(),
      checked: false,
      submitFormLoading: false,
      founderList: [],
      orgName: "组织账户",
      show: false,
    };
  },
  computed: {
    pagedTable() {
      return [this.row];
    },
    ...mapGetters(["userInfo"]),
  },
  created() {
    // this.getFounderList();
  },
  methods: {
    async submitForm() {
      if (!this.checked) {
        this.$message("请先勾选《服务条款》");
        return;
      }
      if (this.form.agentType == 2 && this.form.objectId == null) {
        this.$message("请选择个人账户或组织！");
        return;
      }
      const data = await createProxyManagement(
        this.$mergeByFirst(initForm(this.userInfo), this.form),
      );
      if (data.data) {
        // this.$emit('next')
        this.$router.push("/channel_proxyProduct/processing");
      } else {
        this.$message(data.message);
      }
    },
    handlePrev() {
      this.show = false;
      this.$emit("prev", false);
    },
    // getFounderList() {
    //   getFounder({ userId: this.userInfo.userId }).then(data => {
    //     this.founderList = data.data.data;
    //   });
    // },
    handleClickOrg(val) {
      this.orgName = val.orgName;
      this.form.objectId = val.orgId;
      this.form.agentType = 2;
    },
  },
};
</script>
<style lang="scss" scoped>
.pay-deposit {
  width: 100%;
  background-color: #fff;
}
.box-wrapper {
  width: 1200px;
  margin: 0 auto;
  .el-button {
    padding: 12px 32px;
  }
  h4 {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 30px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    margin: 0 auto;
    padding: 30px 0;
  }
  .explain {
    margin: 50px 0 20px;
  }
  .item-card {
    margin-bottom: 35px;
    width: 400px;
    text-align: left;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0 1px 6px 0 $--background-color;
  }
  .item-card-bg {
    background-image: url("/img/front/create-org-bag3.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.box-card {
  width: 100%;
  border: 1px solid $--border-color;
  // box-shadow: 0 2px 12px 0 $--background-color;
  padding: 40px;
}

.pay-wrapper,
.account-wrapper {
  display: flex;
  margin-bottom: 40px;
  .pay-item,
  .account-item {
    position: relative;
    margin-right: 20px;
    width: 160px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid $--border-color;
    cursor: pointer;
    .this {
      position: absolute;
      top: 0;
      right: 0;
      border-color: #fff transparent transparent transparent;
      border-style: solid;
      border-width: 30px 0 34px 34px;
      height: 0;
      width: 0;
    }
    .el-icon-check {
      position: absolute;
      top: -29px;
      right: 1px;
      color: #fff;
    }
    &.active {
      box-shadow: none;
      background-color: #fff;
      border-color: $--color-primary;
      .this {
        border-color: $--color-primary transparent transparent transparent;
      }
    }
  }
  .pay-item {
    img {
      width: 97px;
      height: 26px;
    }
    .this {
      position: absolute;
      top: 0;
      right: 0;
      border-color: #fff transparent transparent transparent;
      border-style: solid;
      border-width: 30px 0 34px 34px;
      height: 0;
      width: 0;
    }
    .el-icon-check {
      position: absolute;
      top: -29px;
      right: 1px;
      color: #fff;
    }
    &.active {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-color: $--color-primary;
      &::before {
        background: url(/img/proxy/xz.png) no-repeat 0 170px;
      }
      .this {
        border-color: $--color-primary transparent transparent transparent;
      }
    }
  }
}
h3 {
  margin-bottom: 20px;
}
.clause {
  font-weight: 400;
  color: #009de4;
}
.txt {
  margin-top: 10px;
  color: $--color-text-secondary;
  .num {
    margin: 0 5px;
    font-size: 28px;
    font-weight: 400;
    color: $--color-primary;
  }
}
.careful-txt {
  font-size: 14px;
  color: $--color-text-secondary;
}
.text-center {
  text-align: center;
  margin: 20px 0;
}
.rank {
  margin-left: 10px;
  padding-top: 8px;
  text-align: center;
  width: 35px;
  height: 35px;
  font-size: 12px;
  font-weight: bold;
  background: url(/img/proxy/dj.png) no-repeat center center;
  background-size: 100% 100%;
  color: #fca051;
}
.account {
  height: 32px;
  line-height: 32px;
  .account-name {
    display: inline-block;
    width: 90px;
    text-align: right;
    color: $--color-text-regular;
  }
}
.pay-deposit ::v-deep .el-table,
.pay-deposit ::v-deep .el-table__body-wrapper {
  height: auto !important;
}
</style>
