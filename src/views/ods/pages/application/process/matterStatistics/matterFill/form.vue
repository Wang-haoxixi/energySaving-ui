<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="事项名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项类别:" prop="val2" class="half-line">
        <el-input v-model="formData.val2" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="实施主体:" prop="val3" class="half-line">
        <el-input v-model="formData.val3" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="实施主体性质:" prop="val4" class="half-line">
        <el-input v-model="formData.val4" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="实施清单编码:" prop="val5" class="half-line">
        <el-input v-model="formData.val5" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="设定依据:" prop="val6" class="half-line">
        <el-input v-model="formData.val6" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="权力来源:" prop="val7" class="half-line">
        <el-input v-model="formData.val7" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="行使层级:" prop="val8" class="half-line">
        <el-radio-group v-model="formData.val8">
          <el-radio
            :label="item.value"
            v-for="item in status.level"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="事项状态:" prop="val9" class="half-line">
        <el-radio-group v-model="formData.val9">
          <el-radio
            :label="item.value"
            v-for="item in status.matter_status"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="法定办结时限:" prop="val10" class="half-line">
        <el-input v-model="formData.val10" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="承诺办结时限:" prop="val11" class="half-line">
        <el-input v-model="formData.val11" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="计划生效日期:" prop="val12" class="half-line">
        <el-input v-model="formData.val12" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="计划取消日期:" prop="val13" class="half-line">
        <el-input v-model="formData.val13" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否进驻政务大厅:" prop="val14" class="half-line">
        <el-radio-group v-model="formData.val14">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持预约办理:" prop="val15" class="half-line">
        <el-radio-group v-model="formData.val15">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持网上支付:" prop="val16" class="half-line">
        <el-radio-group v-model="formData.val16">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持自助终端办理:" prop="val17" class="half-line">
        <el-radio-group v-model="formData.val17">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持物流快递:" prop="val18" class="half-line">
        <el-radio-group v-model="formData.val18">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否网办:" prop="val19" class="half-line">
        <el-radio-group v-model="formData.val19">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否收费:" prop="val20" class="half-line">
        <el-radio-group v-model="formData.val20">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="resetForm">重置</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm } from "./const/options";
import { status } from "./const/options";
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