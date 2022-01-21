<template>
  <iep-dialog :dialog-show="dialogShow" title="申请成为我的联系人" width="500px" @close="dialogShow=false">
    <el-form class="form-detail" :model="form" ref="form" label-width="95px" :rules="rules">
      <iep-form-item label-name="客户名称" prop="clientName">
        <el-input v-model="form.clientName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="联系人" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="申请理由" prop="applyReason">
        <el-input v-model="form.applyReason" type="textarea"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="handleSave()">保存</el-button>
    </template>
  </iep-dialog>
</template>
<script>
const initForm = () => {
  return {
    clientName: "",
    contactName: "",
    applyReason: "",
  };
};
const rules = {
  clientName: [{ required: true, message: "请输入", trigger: "blur" }],
  contactName: [{ required: true, message: "请输入", trigger: "blur" }],
  applyReason: [{ required: true, message: "请输入", trigger: "blur" }],
};
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      rules,
      fnRequest: () => {},
    };
  },
  methods: {
    handleSave() {
      this.fnRequest(this.form).then(res => {
        if (res.data) {
          this.$message({
            message: "申请成功",
            type: "success",
          });
          this.$emit("save");
          this.dialogShow = false;
        }
      });
    },
  },
};
</script>
