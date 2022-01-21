<template>
  <div class="see-project iep-basic-scroll">
    <keep-alive>
      <iep-basic-container>
        <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
        <!-- <div class="btn-group">
          <iep-button class="first-btn" type="primary" command="grade">代理商等级</iep-button>
          <el-button command="attest">认证状态</el-button>
        </div>-->
        <iep-card class="partner-top">
          <div class="avatar">
            <div class="avatar-img">
              <iep-img :src="formData.avatar"></iep-img>
            </div>
            <div class="avatar-txt">
              <div>
                {{formData.agentType==1?formData.realName:formData.objectName}}
                <span
                  class="state"
                >状态：待处理</span>
              </div>
              <span class="set-time">创建时间：{{formData.createTime | parseToDay}}</span>
            </div>
          </div>
          <div class="avatar-right">
            <div>
              <div class="data-wrapper">
                <div class="data-item">
                  <div class="value">{{formData.rankId}}</div>
                  <div class="label">代理商等级</div>
                </div>
                <!-- <div class="data-item">
                  <div class="value">{{formData.bailSum}}</div>
                  <div class="label">保证金</div>
                </div>-->
              </div>
            </div>
            <div class="operation-wrapper">
              <el-button type="primary">变更</el-button>
              <el-button type="primary" plain>缴纳状态</el-button>
            </div>
          </div>
        </iep-card>
        <el-col :span="24">
          <iep-tabs v-model="activeTab" :tab-list="tabList">
            <template v-if="activeTab ==='BasicInform'" v-slot:BasicInform>
              <basic-inform
                :formData="formData"
                @load-page="loadPage"
                v-loading="activeTab !=='BasicInform'"
                :id="id"
                :createBy="formData.createBy"
                :agentType="formData.agentType"
              ></basic-inform>
            </template>
            <!-- <template v-if="activeTab ==='RecognizanceRecord'" v-slot:RecognizanceRecord>
              <recognizance-record
                @load-page="loadPage"
                v-loading="activeTab !=='RecognizanceRecord'"
                :id="id"
                :createBy="formData.createBy"
                :agentType="formData.agentType"
              ></recognizance-record>
            </template>-->
            <template v-if="activeTab ==='OrderRecord'" v-slot:OrderRecord>
              <order-record
                @load-page="loadPage"
                v-loading="activeTab !=='OrderRecord'"
                :id="id"
                :createBy="formData.createBy"
                :agentType="formData.agentType"
              ></order-record>
            </template>
            <template v-if="activeTab ==='ExaminationRecord'" v-slot:ExaminationRecord>
              <examination-record
                @load-page="loadPage"
                v-loading="activeTab !=='ExaminationRecord'"
                :id="id"
                :createBy="formData.createBy"
                :agentType="formData.agentType"
              ></examination-record>
            </template>
            <template v-if="activeTab ==='Training'" v-slot:Training>
              <training
                @load-page="loadPage"
                v-loading="activeTab !=='Training'"
                :id="id"
                :createBy="formData.createBy"
                :agentType="formData.agentType"
              ></training>
            </template>
          </iep-tabs>
        </el-col>
      </iep-basic-container>
    </keep-alive>
    <grade-dialog ref="GradeDialog" @load-page="loadPage"></grade-dialog>
  </div>
</template>

<script>
import BasicInform from "./detailTab/BasicInform.vue";
import OrderRecord from "./detailTab/OrderRecord.vue";
// import RecognizanceRecord from "./detailTab/RecognizanceRecord.vue";
import ExaminationRecord from "./detailTab/ExaminationRecord.vue";
import Training from "./detailTab/Training.vue";
import { getProxyManagementById } from "@/api/dms/proxy";
import GradeDialog from "./GradeDialog";
export default {
  components: {
    BasicInform,
    OrderRecord,
    // RecognizanceRecord,
    GradeDialog,
    ExaminationRecord,
    Training,
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close();
        },
      },
      tabList: [
        {
          label: "详情",
          value: "BasicInform",
        },
        // {
        //   label: "保证金记录",
        //   value: "RecognizanceRecord",
        // },
        {
          label: "订单记录",
          value: "OrderRecord",
        },
        {
          label: "考试记录",
          value: "ExaminationRecord",
        },
        {
          label: "培训记录",
          value: "Training",
        },
      ],
      activeTab: "BasicInform",
      id: this.$route.params.id,
      formData: {},
    };
  },
  created() {
    this.loadPage();
  },
  computed: {},
  methods: {
    close() {
      if (this.$route.params.id) {
        this.$router.history.go(-1);
      } else {
        this.$emit("onGoBack");
      }
    },
    loadPage() {
      getProxyManagementById(this.id).then(res => {
        this.formData = res.data;
      });
    },
    handleCommand(command) {
      if (command == "attest") {
        this.activeTab = "AttestRecord";
      } else if (command == "bail") {
        this.activeTab = "RecognizanceRecord";
      } else if (command == "grade") {
        this.$refs["GradeDialog"].dialogShow = true;
        this.$refs["GradeDialog"].id = this.id;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base {
  margin-bottom: 20px;
  padding: 20px;
}
.see-project ::v-deep .el-card__body {
  position: relative;
}
.see-project {
  .btn-group {
    position: absolute;
    top: 0;
    right: 60px;
    .first-btn {
      margin-right: 10px;
    }
  }
  .avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid $--border-color;
  }
  .partner-top {
    margin-bottom: 30px;
    box-shadow: 0 2px 12px 0 $--background-color;
    .avatar {
      display: flex;
      align-items: center;
      .state {
        display: inline-block;
        margin-left: 15px;
        font-size: 12px;
        vertical-align: bottom;
        color: $--color-text-secondary;
      }
      .set-time {
        font-size: 12px;
        color: $--color-text-secondary;
      }
    }
    .avatar-txt {
      margin-left: 20px;
    }
  }
  .avatar-right {
    display: flex;
    align-items: center;
  }
}
.data-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-right: 20px;
  width: 100%;
  font-size: 14px;
  .data-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-right: 1px solid rgb(233, 233, 233);
    &:nth-of-type(1) {
      padding-left: 0;
    }
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 20px;
    }
    .label {
      color: $--color-text-secondary;
    }
  }
}
.avatar-img ::v-deep img,
.avatar-img ::v-deep.iep-image {
  border-radius: 50%;
}
.partner-top ::v-deep .el-card__body > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.see-project ::v-deep .el-tabs__content {
  margin-top: 30px;
}
</style>
