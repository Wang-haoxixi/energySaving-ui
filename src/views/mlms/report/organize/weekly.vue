<template>
  <div class="weekly">
    <div class="update-page" v-if="pageState">
      <div class="head">
        <div class="title" v-show="formData.index">
          {{`第${formatDig(formData.index)}周组织工作周报`}}
          <span
            class="date"
          >（{{`${formData.startTime} ~ ${formData.endTime}`}}）</span>
        </div>
        <div class="tips" v-if="dialogState!=='detail'">
          记不清楚做什么？
          <a class="href" @click="changePage">参考本组织成员本周周报</a>
        </div>
        <div class="tips update" v-else-if="permission_edit" @click="handleUpdate">
          <i class="el-icon-edit"></i>
        </div>
      </div>
      <div class="content">
        <el-form ref="form" v-if="dialogState!=='detail'" :rules="rules" :model="formData">
          <div class="title">领导指示</div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.leaderIndication"
              rows="5"
              placeholder="此处填写领导指示"
              maxlength="500"
            ></el-input>
          </el-form-item>
          <div class="title validate">本周工作总结</div>
          <el-form-item prop="workSummary">
            <el-input
              type="textarea"
              v-model="formData.workSummary"
              rows="5"
              placeholder="此处填写本周工作总结"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title validate">下周工作计划</div>
          <el-form-item prop="workPlan">
            <el-input
              type="textarea"
              v-model="formData.workPlan"
              rows="5"
              placeholder="此处填写下周工作计划"
              maxlength="5000"
            ></el-input>
          </el-form-item>
          <div class="title">总结与感悟</div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="formData.summarySentiment"
              rows="5"
              placeholder="此处填写总结与感悟"
              maxlength="10000"
            ></el-input>
          </el-form-item>
          <!-- <div class="relation-item">
            <div class="relation-head">市场拓展：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('summary')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.meetingSummary" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.meetingSummary.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>
          <div class="relation-item">
            <div class="relation-head">相关产品：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('product')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.productList" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.productList.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>
          <div class="relation-item">
            <div class="relation-head">相关项目：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('project')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.projectList" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.projectList.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>-->
          <el-form-item>
            <el-button class="iep-btn-l" @click="submit" type="primary" :loading="loadState">保存</el-button>
          </el-form-item>
        </el-form>
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本周工作总结</div>
          <pre>{{formData.workSummary}}</pre>
          <div class="title">下周工作计划</div>
          <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
          <!-- <div class="title">市场拓展</div>
          <pre><el-tag v-for="(item, index) in formData.meetingSummary" :key="index" type="info">{{item.name}}</el-tag></pre>
          <div class="title">相关产品</div>
          <pre><el-tag v-for="(item, index) in formData.productList" :key="index" type="info">{{item.name}}</el-tag></pre>
          <div class="title">相关项目</div>
          <pre><el-tag v-for="(item, index) in formData.projectList" :key="index" type="info">{{item.name}}</el-tag></pre>-->
        </div>
      </div>
    </div>

    <reference
      ref="reference"
      v-else
      :type="0"
      :time="formData.timeStamp"
      @load_reference="loadReference"
    ></reference>

    <!-- <relation-dialog ref="relation" :type="relationType" @submit-success="relationSuccess"></relation-dialog> -->
  </div>
</template>

<script>
import { toChinesNum, getDateStr, getWeekStartAndEnd } from "../util";
import { updateData, createData } from "@/api/dms/report_so_org_week_month";
// import RelationDialog from "./relationDialog";
import reference from "./reference";
import { mapGetters } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
    permission_edit() {
      return this.userInfo.isAdmin !== 0;
    },
  },
  components: { reference },
  data() {
    return {
      pageState: true,
      loadState: false,
      formData: {},
      dialogState: "detail",
      rules: {
        workSummary: [{ required: true, message: "必填", trigger: "blur" }],
        workPlan: [{ required: true, message: "必填", trigger: "blur" }],
      },
      relationType: "summary",
      relationObj: {
        summary: "meetingSummary",
        project: "projectList",
        product: "productList",
      },
      submitMsg: "",
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          // 判断这条数据是否在系统中已经生成
          let fn = () => {};
          const row = this.formData;
          if (row.createTime) {
            fn = updateData;
          } else {
            fn = createData;
            row.reportType = 0;
            row.createTime = getDateStr(row.timeStamp);
          }
          row.nowOrgId = this.userInfo.orgId;
          row.startDateTime = row.createTime;
          row.title = `第${this.formatDig(row.index)}周组织工作周报`;
          delete row.updateTime;
          delete row.startTime;
          delete row.endTime;
          delete row.createTime;
          // row.meetingSummaryId = row.meetingSummary.map(m => m.id);
          // row.projectIds = row.projectList.map(m => m.id);
          // row.productIds = row.productList.map(m => m.id);
          fn(row).then(() => {
            this.loadState = false;
            this.$message.success(this.submitMsg);
            this.pageState = true;
            this.$emit("success-submit", true);
          });
        } else {
          return false;
        }
      });
    },
    handleUpdate() {
      this.dialogState = "update";
      // 需要根据当前时间和内容判断提示语言
      if (this.formData.workSummary !== "") {
        // 首先判断是新增还是修改
        this.submitMsg = "保存成功";
      } else {
        const date = getWeekStartAndEnd(new Date());
        if (
          this.formData.timeStamp + 7 * 24 * 3600 * 1000 <
          +new Date(date.startYear)
        ) {
          // 在本周时间内 - 正在填写的结束时间小于本周的开始时间
          this.submitMsg = "恭喜您完成周报补写，继续努力！";
        } else {
          this.submitMsg = "恭喜您完成本周周报，继续努力！";
        }
      }
    },
    formatDig(index) {
      return toChinesNum(index);
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    getRelation(type) {
      this.relationType = type;
      this.$nextTick(() => {
        this.$refs["relation"].open(this.formData[this.relationObj[type]]);
      });
    },
    // 提交关联
    relationSuccess(list, type) {
      this.formData[this.relationObj[type]] = list;
    },
    // 参考本SO下成员本周的周报
    changePage() {
      this.pageState = false;
    },
    // 查看本SO下成员周报后保存
    loadReference(row) {
      this.formData.workSummary += row;
      this.pageState = true;
    },
  },
  created() {},
  watch: {
    data(newVal) {
      this.pageState = true;
      this.formData = {
        leaderIndication: "",
        workSummary: "",
        workPlan: "",
        summarySentiment: "",
        meetingSummaryId: [],
        meetingSummary: [],
        projectIds: [],
        projectList: [],
        productIds: [],
        productList: [],
      };
      this.formData = Object.assign({}, this.formData, newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly {
  .update-page {
    .head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $--border-color;
      padding: 20px 0;
      .title {
        font-size: 16px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        .date {
          font-size: 14px;
          color: $--color-text-secondary;
          font-weight: 500;
        }
      }
      .tips {
        font-size: 14px;
        line-height: 24px;
        margin-right: 3px;
        color: $--color-text-secondary;
        .href {
          color: $--color-primary;
          cursor: pointer;
        }
      }
      .update {
        font-size: 16px;
        cursor: pointer;
      }
    }
    .content {
      .title {
        margin-bottom: 20px;
        font-size: 14px;
      }
      .detail {
        pre {
          padding-left: 20px;
          line-height: 20px;
          margin: 0;
          min-height: 50px;
          .el-tag {
            margin: 0 10px 10px 0;
          }
        }
        .title {
          margin-top: 10px;
          font-size: 14px;
          color: $--color-text-regular;
        }
      }
      .relation-item {
        display: flex;
        .relation-head {
          width: 80px;
        }
        .relation-list {
          ul {
            padding: 15px 0 0;
            li {
              list-style: none;
              margin-bottom: 15px;
              i {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .detail-page {
    .footer {
      margin-top: 20px;
    }
  }
}
.footer ::v-deep .el-button:nth-child(1) {
  margin-right: 10px;
}
.validate::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
