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
      <el-form-item label="项目名称：" prop="projectName">
        <el-input v-model="formData.projectName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="申报单位：" prop="declareDept">
        <el-input v-model="formData.declareDept" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目年度计划编号：" prop="projectYearNo" class="half-line">
        <el-input v-model="formData.projectYearNo" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目内部编号：" prop="projectNo" class="half-line">
        <el-input v-model="formData.projectNo" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目起始年份：" prop="startYear" class="half-line">
        <el-date-picker v-model="formData.startYear" type="year" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目截止年份：" prop="endYear" class="half-line">
        <el-date-picker v-model="formData.endYear" type="year" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="申报资金：" prop="auditFound" class="half-line">
        <el-input v-model="formData.auditFound" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="财政审核金额：" prop="financialAuditFound" class="half-line">
        <el-input v-model="formData.financialAuditFound" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目建设模式：" prop="xmjsms" class="half-line">
        <el-select v-model="formData.xmjsms" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="项目管理分类：" prop="xmglfl" class="half-line">
        <el-select v-model="formData.xmglfl" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="是否上云：" prop="isCloud" class="half-line">
        <el-switch
          v-model="formData.isCloud"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否数据归集：" prop="isDatagj" class="half-line">
        <el-switch
          v-model="formData.isDatagj"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>
      <el-form-item label="项目建设内容：" prop="xmjsnr">
        <el-input v-model="formData.xmjsnr" maxlength="500" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人：" prop="projectLeader" class="half-line">
        <el-input v-model="formData.projectLeader"></el-input>
      </el-form-item>
      <el-form-item label="职务：" prop="zhiwu" class="half-line">
        <el-select v-model="formData.zhiwu" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="项目联系人：" prop="projectContact" class="half-line">
        <el-input v-model="formData.projectContact"></el-input>
      </el-form-item>
      <el-form-item label="部门：" prop="dept" class="half-line">
        <el-select v-model="formData.dept" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobilephone" class="half-line">
        <el-input v-model="formData.mobilephone"></el-input>
      </el-form-item>
      <el-form-item label="电话：" prop="telephone" class="half-line">
        <el-input v-model="formData.telephone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email" class="half-line">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType" class="half-line">
        <el-select v-model="formData.businessType" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="行业类型：" prop="industryType" class="half-line">
        <el-select v-model="formData.industryType" class="full-width" multiple></el-select>
      </el-form-item>
      <el-form-item label="批复函文号：" prop="pfhwh" class="half-line">
        <el-input v-model="formData.pfhwh" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="批复日期：" prop="pfrq" class="half-line">
        <el-date-picker v-model="formData.pfrq" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="资金来源：" prop="foundResource" class="half-line">
        <el-select v-model="formData.foundResource" class="full-width"></el-select>
      </el-form-item>
      <el-form-item label="项目备注：" prop="projectMark">
        <el-input v-model="formData.projectMark" maxlength="500" type="textarea"></el-input>
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
.full-width {
  width: 100%;
}
</style>
