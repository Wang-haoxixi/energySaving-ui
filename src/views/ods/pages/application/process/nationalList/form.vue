<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-row :gutter="20">
      <el-col :span="12">
        <h2 class="text-center">国家事项</h2>
        <el-form
          :model="formData"
          :rules="rules"
          ref="form"
          label-width="150px"
          class="form-detail"
          disabled
        >
          <el-form-item label="事项名称:" prop="val1" class="half-line">
            <el-input v-model="formData.val1" maxlength="150"></el-input>
          </el-form-item>
          <el-form-item label="事项类型:" prop="val2" class="half-line">
            <el-input v-model="formData.val2" maxlength="150"></el-input>
          </el-form-item>
          <el-form-item label="中央业务指导（实施）部门:" prop="val3" class="half-line">
            <el-select style="width: 100%;" v-model="formData.val3" placeholder>
              <el-option
                v-for="item in status.dept"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基层目录编码:" prop="val4" class="half-line">
            <el-input v-model="formData.val4" maxlength="150"></el-input>
          </el-form-item>
          <el-form-item label="行使层级:" prop="val5" class="half-line">
            <el-select style="width: 100%;" v-model="formData.val5" placeholder>
              <el-option
                v-for="item in status.level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法律依据:" prop="val6" class="half-line">
            <el-input autosize v-model="formData.val6" maxcloselength="150" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <h2 class="text-center">地方事项</h2>
        <div class="text-center">
          <el-button>添加事项</el-button>
        </div>
      </el-col>
    </el-row>
    <iep-footer-bar>
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="close">取消</iep-button>
    </iep-footer-bar>
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
    close() {
      this.loadPage();
      this.dialogShow = false;
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
          this.$message.success("新增成功");
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
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>