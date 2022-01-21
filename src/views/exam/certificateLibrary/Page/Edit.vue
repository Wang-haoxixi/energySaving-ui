<template>
  <div class="exam-lib">
    <iep-page-header :title="`${record.methodName}证书`" :data="[10, 5]" :backOption="backOption"></iep-page-header>
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      :disabled="isDisabled"
      label-width="110px"
      :rules="rules"
    >
      <iep-form-item label-name="证书名称" prop="title">
        <el-input v-model="form.title" :maxlength="20"></el-input>
      </iep-form-item>
      <iep-form-item label-name="证书级别" prop="level">
        <iep-dict-select
          v-model="form.level"
          dict-name="exam_certificate_level"
          clearable
          placeholder
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="有效期" prop="validityPeriod">
        <iep-dict-select
          v-model="form.validityPeriod"
          dict-name="exam_validity_period"
          clearable
          placeholder
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="颁发机构" prop="awardingOrg">
        <el-input v-model="form.awardingOrg" :maxlength="20"></el-input>
      </iep-form-item>
      <iep-form-item label-name="机构缩写" prop="acronymOrg">
        <el-input class="upper-case-input" v-model="form.acronymOrg"></el-input>
      </iep-form-item>
      <iep-form-item label-name="标签" prop="tagKeyWords">
        <iep-tag-input v-model="form.tagKeyWords"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="证书logo" prop="logo">
        <div style="margin-left: 10px;">
          <IepUploadAvatar
            v-model="form.logo"
            :dialogWidth="400"
            :dialogHeight="80"
            :width="80"
            :height="80"
          ></IepUploadAvatar>
        </div>
      </iep-form-item>
      <iep-form-item label-name="证书专用章" prop="seal">
        <div style="margin-left: 10px;">
          <IepUploadAvatar
            v-model="form.seal"
            :dialogWidth="400"
            :dialogHeight="200"
            :imgTip="true"
            :width="300"
            :height="300"
          ></IepUploadAvatar>
        </div>
      </iep-form-item>
    </el-form>
    <iepFooterBar class="footer">
      <el-button class="iep-btn-l" type="primary" @click="handleSave()" v-if="!isDisabled">保存</el-button>
    </iepFooterBar>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getById, updateEntity, saveEntity } from "@/api/qms/cerificate";
export default {
  props: ["record"],
  mixins: [mixins],
  data() {
    return {
      form: {
        title: "",
        certificateLevel: "",
        validityPeriod: "",
        awardingOrg: "",
        acronymOrg: "",
        logo: "",
        seal: "",
        tagKeyWords: [],
      },
      formRequestFn: () => {},
      dataId: "",
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    };
  },
  computed: {
    rules() {
      return {
        title: [
          { required: true, message: "请输入证书名称", trigger: "blur" },
          { max: 100, message: "证书名称不允许超过100个字" },
        ],
        level: [{ required: true, message: "请选择证书级别", trigger: "blur" }],
        validityPeriod: [
          { required: true, message: "请选择有效期", trigger: "blur" },
        ],
        awardingOrg: [
          { required: true, message: "请输入颁发机构", trigger: "blur" },
          {
            max: 100,
            message: "颁发机构名称不允许超过100个字",
            trigger: "blur",
          },
        ],
        acronymOrg: [
          { required: true, message: "请输入机构缩写", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "机构缩写的长度范围2-8位",
            trigger: "blur",
          },
        ],
        logo: [{ required: true, message: "请选择证书logo", trigger: "blur" }],
        seal: [
          { required: true, message: "请选择证书专用章", trigger: "blur" },
        ],
        tagKeyWords: [
          { required: true, message: "请填写标签", trigger: ["change"] },
        ],
      };
    },
    isEdit() {
      return this.record.id ? true : false;
    },
    isDisabled() {
      return this.record.edit;
    },
  },
  created() {
    if (this.isEdit) {
      this.showEdit();
    }
  },
  methods: {
    showEdit() {
      getById(this.record.id).then((res) => {
        const { data } = res;
        this.form = data;
      });
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
    handleSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.saveData();
        } else {
          this.saveLoading = false;
        }
      });
    },
    saveData() {
      if (this.isEdit) {
        this.formRequestFn = updateEntity;
      } else {
        this.formRequestFn = saveEntity;
      }
      // 转换为大写
      this.form.acronymOrg = this.form.acronymOrg
        .replace(/[^\w/]/gi, "")
        .toUpperCase();
      this.formRequestFn(this.form).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "证书保存成功",
            type: "success",
          });
          this.$emit("onGoBack");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.item ::v-deep .el-form-item__content {
  display: inherit;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep .right-wrapper {
    float: none;
    padding: 0;
    height: auto;
    line-height: inherit;
    text-align: center;
  }
}
.upper-case-input ::v-deep input {
  text-transform: uppercase;
}
</style>
