<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>

      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='BasicInform'" v-slot:BasicInform>
          <el-col :span="24" style="font-size:14px;">
            <h3>基本信息</h3>
            <el-row>
              <el-col :span="24">项目名称：{{formData.projectName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                项目标签：
                <el-tag
                  v-for="(t,index) in formData.projectTagList"
                  :key="index"
                  style="margin-right:10px;"
                >{{t}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">项目编号：{{formData.serialNo}}</el-col>
              <el-col :span="12">客户名称：{{formData.relatedClientName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">项目类型：{{formData.projectName}}</el-col>
              <el-col :span="12">业务类型：{{formData.projectName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                项目阶段：
                <span v-if="formData.projectStage==1">初步意向</span>
                <span v-else-if="formData.projectStage==2">方案提交</span>
                <span v-else-if="formData.projectStage==3">正在执行</span>
                <span v-else>项目完结</span>
              </el-col>
              <el-col :span="12">
                项目等级：
                <span v-if="formData.projectLevel==1">重要项目</span>
                <span v-else-if="formData.projectLevel==2">中级项目</span>
                <span v-else>一般项目</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">立项时间：{{formData.projectTime|parseToDay}}</el-col>
              <el-col :span="12">结束时间：{{formData.endTime|parseToDay}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">签约时间：{{formData.estimatedSigntime|parseToDay}}</el-col>
              <el-col :span="12">项目金额：{{formData.contractAmount}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="24">所属组织：{{formData.attendeeByName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="24">项目描述：{{formData.projectExplain}}</el-col>
            </el-row>
            <h3>成本预算</h3>
            <div class="budget-list">
              <span>成本类型</span>
              <span>金额（人民币）</span>
            </div>
            <div
              class="budget-list"
              v-for="(item,index) in formData.projectBudgetRelationList"
              :key="index"
            >
              <span>{{item.dictValue}}</span>
              <span>{{item.money}}</span>
            </div>
            <div class="budget-list last">
              <span>项目成本合计：{{formData.costTotal}}</span>
              <span>项目预估利润：{{formData.forecastProfits}}</span>
              <span>项目利润率：{{formData.profit}}</span>
            </div>
          </el-col>
          <!-- <el-col :span="9" style="padding-left:30px;">
            <div class="title">
              项目团队信息
              <span class="more">查看人员列表</span>
            </div>
            <div v-for="(item,index) in formData.userType" :key="index">
              {{item}}
            </div>
          </el-col>-->
        </template>
        <template v-if="activeTab ==='OperationRecord'" v-slot:OperationRecord>
          <operation-record :projectId="formData.id"></operation-record>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import { getDataDetail } from "@/api/gpms/index";
import OperationRecord from "./OperationRecord";
export default {
  components: { OperationRecord },
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
          label: "基本信息",
          value: "BasicInform",
        },
        {
          label: "操作记录",
          value: "OperationRecord",
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
      getDataDetail(this.id).then(res => {
        this.formData = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-row {
  margin: 15px 0;
  padding-left: 15px;
}
h3 {
  padding-left: 15px;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  line-height: 40px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  background-color: rgb(242, 244, 245);
}
.title {
  font-size: 16px;
  .more {
    font-size: 12px;
    color: $--color-text-regular;
    float: right;
  }
}
.budget-list {
  height: 32px;
  line-height: 32px;
  padding-left: 15px;
  color: $--color-text-regular;
  overflow: hidden;
  border-bottom: 1px solid #f1f1f1;
  > span {
    display: inline-block;
    width: 50%;
  }
}
.budget-list.last {
  > span {
    width: 33%;
  }
}
</style>