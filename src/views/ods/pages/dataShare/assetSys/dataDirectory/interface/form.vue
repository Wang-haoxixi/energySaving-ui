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
      <el-form-item label="服务中文名称:" class="half-line">
        <el-input v-model="formData.commonDataMetaName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="服务英文名称:" class="half-line">
        <el-input v-model="formData.nameEn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="接入类型:" class="half-line">
        <el-input v-model="formData.AccessType" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属部门:" class="half-line">
        <el-input v-model="formData.Department" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" class="half-line">
        <el-input v-model="formData.contacts" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" class="half-line">
        <el-input v-model="formData.phone" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属信息资源:" class="half-line">
        <el-input v-model="formData.InformationResources" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属归集信息:" class="half-line">
        <el-input v-model="formData.commonDataMetaValue" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="服务摘要:" class="half-line">
        <el-input v-model="formData.ServiceSummary" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="调用频率:" class="half-line">
        <el-input v-model="formData.scenarioDescription" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="超时时间(秒):" class="half-line">
        <el-input v-model="formData.frequency" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="使用场景描述:" class="half-line">
        <el-input v-model="formData.scenarioDescription" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="授权方式:" class="half-line">
        <el-input v-model="formData.AuthorizationMethod" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否需要提交附件:" class="half-line">
        <el-input v-model="formData.file" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="请求示例:" class="half-line">
        <el-input v-model="formData.example" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="返回示例:" class="half-line">
        <el-input v-model="formData.Return" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="网络地址:" class="half-line">
        <el-input v-model="formData.network" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="查询条件:" class="half-line">
        <el-input v-model="formData.criteria" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="接口描述:" class="half-line">
        <el-input v-model="formData.description" maxlength="150"></el-input>
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
