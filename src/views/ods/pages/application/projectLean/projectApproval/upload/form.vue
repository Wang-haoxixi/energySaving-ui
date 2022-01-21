<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="项目编号：" prop="projectNo" class="half-line">
        <el-input v-model="formData.projectNo" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目年度计划编号：" prop="projectYearNo" class="half-line">
        <el-input v-model="formData.projectYearNo" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：" prop="projectName" class="half-line">
        <el-input v-model="formData.projectName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="建设单位：" prop="deptName" class="half-line">
        <el-input v-model="formData.deptName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="预算类型：" prop="budgetType" class="half-line">
        <el-input v-model="formData.budgetType" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="财政审核资金(万元)：" prop="financialAuditFund" class="half-line">
        <el-input v-model="formData.financialAuditFund" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="立项批复资金(万元)：" prop="projectApprovalFund" class="half-line">
        <el-input v-model="formData.projectApprovalFund" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人：" prop="projectLeader" class="half-line">
        <el-input v-model="formData.projectLeader" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="上报情况：" prop="uploadState" class="half-line">
        <el-input v-model="formData.uploadState" maxlength="150"></el-input>
      </el-form-item>
    </el-form>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
  </div>
</template>
<script>
import { initForm, rules, dictsMap } from "./option";

import { mapGetters } from "vuex";

export default {
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      loadState: false,
      dialogShow: false,
      methodName: "create",
      methodList: {
        create: {
          name: "新增",
          //requestFn: createForm,
        },
        update: {
          name: "编辑",
          //requestFn: updateForm,
        },
      },
      formData: initForm(),
      rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
    };
  },
  methods: {
    open(row) {
      this.formData = row;
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // // const row = { ...this.formData };
          // this.methodList[this.methodName].requestFn(row).then(({ data }) => {
          //   this.loadState = false;
          //   if (!data) {
          //     this.$message.error(data.msg);
          //   } else {
          if (this.formStatus == "create") {
            this.$message.success("新增成功");
          } else {
            this.$message.success("编辑成功");
          }
          this.loadPage();
          this.dialogShow = false;
        }
        //   });
        // } else {
        //   this.loadState = false;
        //   return false;
        // }
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.download {
  cursor: pointer;
}
.isCertified-tip {
  position: absolute;
  top: 25px;
  font-size: 12px;
  color: $--color-primary;
}
.half-line {
  width: 50%;
  display: inline-block;
}
</style>
