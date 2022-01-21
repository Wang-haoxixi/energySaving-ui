<template>
  <!-- 材料目录 -->
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
      <el-form-item label="材料名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="材料分类:" prop="val2" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val2" placeholder>
          <el-option
            v-for="item in status.classify"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="材料类型:" prop="val3" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val3" placeholder>
          <el-option
            v-for="item in status.type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="材料形式:" prop="val4" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val4" placeholder>
          <el-option
            v-for="item in status.form"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="空白表格:" prop="val5" class="half-line">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
          :file-list="formData.val5"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="示例表格:" prop="val6" class="half-line">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
          :file-list="formData.val6"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="来源渠道:" prop="val7" class="half-line">
        <el-input v-model="formData.val7" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="来源渠道说明:" prop="val8" class="half-line">
        <el-input v-model="formData.val8" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="纸质材料份数:" prop="val9" class="half-line">
        <el-input v-model="formData.val9" type="number"></el-input>
      </el-form-item>
      <el-form-item label="来源渠道说明:" prop="val10" class="half-line">
        <el-input v-model="formData.val10" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="纸质材料规格:" prop="val11" class="half-line">
        <el-input v-model="formData.val11" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="填报须知:" prop="val12" class="half-line">
        <el-input v-model="formData.val12" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="受理标准:" prop="val13" class="half-line">
        <el-input v-model="formData.val13" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="val14" class="half-line">
        <el-input autosize v-model="formData.val14" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="resetForm">重置</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm, rules, status } from "./const/options";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      status,
      formData: {},
      loadState: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      rules,
    };
  },
  methods: {
    // 打开
    open(row) {
      this.formData = row;
      console.log(row);
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    // 提交
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
};
</script>
<style lang="scss" scoped>
</style>