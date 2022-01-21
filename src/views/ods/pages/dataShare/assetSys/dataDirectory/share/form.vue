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
      <el-form-item label="信息资源名称:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.commonDataMetaName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="信息资源代码:" class="half-line">
        <el-input v-model="formData.address" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="资源提供方:" class="half-line">
        <el-input v-model="formData.Affiliated" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="资源提供方代码:" class="half-line">
        <el-input v-model="formData.department" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="信息资源格式:" class="half-line">
        <el-input v-model="formData.ApprovalDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属系统:" class="half-line">
        <el-input v-model="formData.BudgetItemName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="主题分类:" class="half-line">
        <el-input v-model="formData.budget" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="业务分类:" class="half-line">
        <el-input v-model="formData.endBudget" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="基础分类:" class="half-line">
        <el-input v-model="formData.startDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="重点领域分类:"  class="half-line">
        <el-input v-model="formData.serviceDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="涉密属性分类:" class="half-line">
        <el-input v-model="formData.status" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="层级属性分类:" class="half-line">
        <el-input v-model="formData.Source" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="更新周期:" class="half-line">
        <el-input v-model="formData.SourceFunds" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="共享属性:" class="half-line">
        <el-input v-model="formData.environment" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="共享条件:" class="half-line">
        <el-input v-model="formData.ScopeOfUse" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="共享方式:" class="half-line">
        <el-input v-model="formData.ScopeOfUseUser" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否向全社会开放:" class="half-line">
        <el-input v-model="formData.frequency" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="发布日期:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.frequencyUse" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="关联资源代码:" class="half-line">
        <el-input v-model="formData.DataGeneration" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="信息资源摘要:" class="half-line">
        <el-input v-model="formData.dataUpload" maxlength="150" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <h2>信息项管理</h2>
    <div style="width:80%;margin:0 auto;">
      <iep-table
          border
          :isPagination="false"
          :isLoadTable="false"
          :columnsMap="columnsMap"
          :pagedTable="formData.pagedTable"
        >
      </iep-table>
    </div>
    <h2>挂载数据库表</h2>
    <div style="width:80%;margin:0 auto;">
      <iep-table
          border
          :isLoadTable="false"
          :isPagination="false"
          :columnsMap="columnsMap1"
          :pagedTable="formData.pagedTable1"
        >
      </iep-table>
    </div>
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
      columnsMap: [
        {
          label: "中文名称",
          prop: "commonDataMetaName",
        },
        {
          label: "数据长度",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "数据类型",
          prop: "commonDataMetaNameEn1",
        },
        {
          label: "英文名称",
          prop: "commonDataMetaNameEn2",
        },
        {
          label: "是否向全社会开放",
          prop: "commonDataMetaNameEn3",
        },
        {
          label: "共享属性",
          prop: "commonDataMetaNameEn4",
        },
      ],
      columnsMap1: [
        {
          label: "信息资源名称",
          prop: "commonDataMetaName",
        },
        {
          label: "信息资源格式",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "共享类型",
          prop: "commonDataMetaNameEn1",
        },
        {
          label: "开放属性",
          prop: "commonDataMetaNameEn2",
        },
      ],
      columnsMap2: [
        {
          label: "版本号",
          prop: "commonDataMetaName",
        },
        {
          label: "操作时间",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "操作人",
          prop: "commonDataMetaNameEn1",
        },
      ],
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
