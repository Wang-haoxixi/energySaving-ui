<template>
  <iep-dialog title="转让组织" :dialogShow="dialogShow" @close="_close()" width="500px">
    <p>一旦转让组织，您在组织的权限将自动降级为用户（即组织普通成员），您将无权管理（{{orgName}}）并失去相应操作权限！</p>
    <el-form ref="form" :model="form" label-position="top" :rules="rules">
      <iep-form-item label-name="请选择你转让组织所有者权限的对象" prop="userId">
        <el-select v-model="form.userId" placeholder="请选择活动区域" class="input-box">
          <el-option :label="item.name" :value="item.id" v-for="item in magistrates" :key="item.id"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="验证码" prop="code">
        <div class="v-code-wrapper check-box">
          <el-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.code"
            autocomplete="new-password"
          ></el-input>
          <el-button
            class="sms-btn"
            :disabled="msgKey"
            @click="handleSMSSend(userInfo.mobile)"
          >{{msgText}}</el-button>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">确定</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import mobileMixins from "@/mixins/mobileMixins";
import formMixins from "@/mixins/formMixins";
import { transferSo } from "@/api/admin/org";
import { mapActions, mapGetters } from "vuex";
import store from "@/store";
const initForm = () => {
  return {
    orgId: 0,
    userId: 0,
    code: "",
  };
};
export default {
  name: "IepDialogTransferSo",
  mixins: [mobileMixins, formMixins],
  data() {
    const userIdCannotMyself = (label) => {
      return function (rule, value, callback) {
        if (!value) {
          callback(new Error(`${label}不能为空`));
        }
        if (value === store.getters.userInfo.userId) {
          callback(new Error(`${label}不能为自己`));
        }
        callback();
      };
    };
    return {
      orgId: 0,
      orgName: "",
      dialogShow: false,
      magistrates: [],
      form: initForm(),
      rules: {
        userId: [{ validator: userIdCannotMyself("转让人"), trigger: "blur" }],
        code: [
          { required: true, trigger: "change", message: "请输入短信验证码" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentMenuGroup"]),
  },
  methods: {
    ...mapActions(["menuRouterSet", "userGetInfo", "orgChangeAction"]),
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.form = initForm();
      this.$emit("load-page");
    },
    async submitForm() {
      this.form.orgId = this.orgId;
      const { data } = await transferSo(this.form);
      if (data) {
        this.$message.success("操作成功");
        await this.orgChangeAction(this.orgId);
        this.$openPage(`/wel/${this.currentMenuGroup.path}`);
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mobile.scss";
.change-form {
  margin: 20px;
}
.sms-btn {
  margin-top: 2px;
  height: 34px !important;
}
.input-box {
  margin-top: 5px;
  width: 100%;
}
.check-box {
  display: flex;
  margin-top: 5px;
  width: 100%;
  .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
