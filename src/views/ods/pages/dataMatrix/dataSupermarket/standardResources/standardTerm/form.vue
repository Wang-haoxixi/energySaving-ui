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
      <el-form-item label="1级序号：" prop="indexFirst" class="half-line">
        <el-input v-model="formData.indexFirst" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="1级分类：" prop="classificationFirst" class="half-line">
        <el-input v-model="formData.classificationFirst" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="2级序号：" prop="indexSecond" class="half-line">
        <el-input v-model="formData.indexSecond" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="2级分类：" prop="classificationSecond" class="half-line">
        <el-input v-model="formData.classificationSecond" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="3级序号：" prop="indexThird" class="half-line">
        <el-input v-model="formData.indexThird" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="3级分类：" prop="classificationThird" class="half-line">
        <el-input v-model="formData.classificationThird" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="序号：" prop="orderNumber" class="half-line">
        <el-input v-model="formData.orderNumber" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="术语：" prop="terminology" class="half-line">
        <el-input v-model="formData.terminology" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="术语(英文)：" prop="terminologyEn">
        <el-input v-model="formData.terminologyEn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="定义：" prop="define">
        <el-input v-model="formData.define" maxlength="500" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="标准文件名称：" prop="name">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="标准号：" prop="number">
        <el-input v-model="formData.number" maxlength="150" disabled></el-input>
      </el-form-item>
      <el-form-item label="版本(年代)号：" prop="version">
        <el-input v-model="formData.version" maxlength="150" disabled></el-input>
      </el-form-item>
      <el-form-item label="ICS编码：" prop="icsCodeFirst">
        <el-input v-model="formData.icsCodeFirst" maxlength="150" disabled></el-input>
      </el-form-item>
      <el-form-item label="CCS编码：" prop="ccsCodeFirst">
        <el-input v-model="formData.ccsCodeFirst" maxlength="150" disabled></el-input>
      </el-form-item>
      <el-form-item label="发布机构：" prop="pubAgency">
        <el-input v-model="formData.pubAgency" maxlength="150" disabled></el-input>
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
