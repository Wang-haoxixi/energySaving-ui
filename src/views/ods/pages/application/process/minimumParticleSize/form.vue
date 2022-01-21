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
      <el-form-item label="信息项名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据种类:" prop="val2" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val2" placeholder>
          <el-option
            v-for="item in status.kinds"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否存在表内名称:" prop="val3" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val3" placeholder>
          <el-option
            v-for="item in status.is_not"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信息项是否必填:" prop="val4" class="half-line">
        <el-radio-group v-model="formData.val4">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="同义词:" prop="val5" class="half-line">
        <el-input v-model="formData.val5" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="组合类型:" prop="val6" class="half-line">
        <el-select style="width: 100%;" v-model="formData.val6" placeholder>
          <el-option
            v-for="item in status.combination"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="共享属性:" prop="val6" class="half-line">
        <el-radio-group v-model="formData.val6">
          <el-radio
            :label="item.value"
            v-for="item in status.share"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:" prop="val7" class="half-line">
        <el-input v-model="formData.val7" autosize type="textarea" maxlength="150"></el-input>
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