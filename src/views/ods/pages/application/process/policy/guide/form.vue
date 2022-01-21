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
      <el-form-item label="办事指南模板:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="选择事项:" prop="val2" class="half-line">
        <el-input v-model="formData.val2" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项类别:" prop="val3" class="half-line">
        <el-cascader
          :props="{emitPath: true}"
          style="width: 100%;"
          v-model="formData.val3"
          :options="status.matter_type"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="事项代码:" prop="val4" class="half-line">
        <el-input v-model="formData.val4" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项原代码:" prop="val5" class="half-line">
        <el-input v-model="formData.val5" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="服务对象:" prop="val6" class="half-line">
        <el-checkbox-group v-model="formData.val6">
          <el-checkbox
            name="val6"
            v-for="item in status.server"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="办件类型:" prop="val7" class="half-line">
        <el-radio-group v-model="formData.val7">
          <el-radio
            :label="item.value"
            v-for="item in status.certificates"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通办范围:" prop="val8" class="half-line">
        <el-radio-group v-model="formData.val8">
          <el-radio
            :label="item.value"
            v-for="item in status.certificates"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设定依据:" prop="val9" class="half-line">
        <el-input v-model="formData.val9" maxlength="150" autosize type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="实施机构名称:" class="half-line" label-width="150px">
            <el-select placeholder v-model="formData.val10" style="width: 100%;">
              <el-option
                v-for="item in status.deptName"
                :key="item.value"
                :value="item.value"
              >{{item.label}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任处（科）室或单位:" prop="val11" class="half-line" label-width="170px">
            <el-input v-model="formData.val11" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="实施主体性质:" prop="val12" class="half-line">
        <el-radio-group v-model="formData.val12">
          <el-radio
            :label="item.value"
            v-for="item in status.subject"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="在联办机构:" prop="val113" class="half-line">
            <el-switch
              v-model="formData.val13"
              active-value="1"
              inactive-value="0"
              active-color="#f74437"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="isShow">
          <el-form-item label="联办机构:" class="half-line" label-width="150px">
            <el-select placeholder v-model="formData.val14" style="width: 100%;">
              <el-option
                v-for="item in status.deptName"
                :key="item.value"
                :value="item.value"
              >{{item.label}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="行使类型:" prop="val15" class="half-line">
        <el-radio-group v-model="formData.val15">
          <el-radio
            :label="item.value"
            v-for="item in status.exercise_type"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="行使层级:" prop="val16" class="half-line">
        <el-checkbox-group v-model="formData.val16">
          <el-checkbox
            name="val16"
            v-for="item in status.level"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="运行系统:" prop="val17" class="half-line">
        <el-checkbox-group v-model="formData.val17">
          <el-checkbox
            name="val17"
            v-for="item in status.operating_system"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="权限划分:" prop="val18" class="half-line">
        <el-input v-model="formData.val18" maxlength="150" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="行使内容:" prop="val19" class="half-line">
        <el-input v-model="formData.val19" maxlength="150" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="数量限制:" prop="val20" class="half-line">
        <el-input v-model="formData.val20" maxlength="150" type="textarea" autosize></el-input>
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
      // 联办机构显示隐藏
      isShow: false,
      status,
      formData: {
        val6: [],
        val16: [],
        val17: [],
        val12: 0,
      },
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
  watch: {
    "formData.val13": {
      handler(newVal) {
        this.isShow = newVal === "1";
      },
    },
  },
  methods: {
    // 打开
    open(row) {
      this.formData = Object.assign(this.formData, row);
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