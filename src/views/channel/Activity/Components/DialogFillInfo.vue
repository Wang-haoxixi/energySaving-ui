<template>
  <iep-dialog :title="title" :dialogShow="dialogShow" @close="dialogShow=false" width="600px">
    <el-form class="dialog-form" ref="form" :rules="rules" :model="form" label-width="65px">
      <iep-form-item label-name="姓名" prop="name">
        <el-input
          v-model.trim="form.name"
          :disabled="isDisable"
          :maxlength="50"
          placeholder="请输入您的姓名"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="手机" prop="phone">
        <el-input
          v-model.trim="form.phone"
          :disabled="isDisable"
          :maxlength="11"
          placeholder="请输入您的手机号码"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="邮箱" prop="email">
        <el-input
          v-model.trim="form.email"
          :disabled="isDisable"
          :maxlength="50"
          placeholder="请输入您的电子邮箱"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="单位" prop="company">
        <el-input
          v-model.trim="form.company"
          :disabled="isDisable"
          :maxlength="50"
          placeholder="请输入您的单位名称"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="职务" prop="position">
        <el-input
          v-model.trim="form.position"
          :disabled="isDisable"
          :maxlength="50"
          placeholder="请输入您的职务"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="remarks">
        <el-input
          type="textarea"
          :rows="4"
          resize="none"
          show-word-limit
          v-model.trim="form.remarks"
          :disabled="isDisable"
          :maxlength="50"
          placeholder="您还需要什么，请告诉我们"
        ></el-input>
      </iep-form-item>
      <div class="btn-group" v-if="!isDisable">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" plain @click="handleReset">重置</el-button>
      </div>
    </el-form>
  </iep-dialog>
</template>
<script>
import { createEnroll } from "@/api/meetting/enroll";
import { checkPhone, checkEmail } from "@/util/rules";
import { mapGetters } from "vuex";
const initForm = () => {
  return {
    name: "",
    phone: "",
    email: "",
    company: "",
    position: "",
    remarks: "",
  };
};
export default {
  name: "DialogFillInfo",
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    activityForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入您的姓名" }],
        phone: [
          { required: true, trigger: "blur", message: "请输入您的手机号码" },
          { validator: checkPhone, trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    activityForm(data) {
      const { name, phone, email, company, position, remarks } = data;
      this.form = {
        name,
        phone,
        email,
        company,
        position,
        remarks,
      };
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
    },
    init() {
      const { realName, mobile, mail, company, position } = this.userInfo;
      this.form = {
        name: realName,
        phone: mobile,
        email: mail,
        company: company,
        position: position,
      };
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { code, data } = await createEnroll({
            ...this.form,
            ...this.activityForm,
          });
          if (!code) {
            this.$router.push({
              path: `/channel/activity/order/${data.enroleId}`,
            });
            this.dialogShow = false;
          }
        } else {
          this.$message.warning("请填写正确信息");
        }
      });
    },
    handleReset() {
      this.form = initForm();
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.dialog-form {
  margin: 0 20px;
}
.btn-group {
  width: 100%;
  text-align: center;
  .el-button {
    margin: 0 8px;
    padding: 10px 20px;
  }
}
</style>
