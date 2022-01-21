<template>
  <iep-dialog :dialog-show="dialogShow" title="完善个人资料" width="600px" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="205px" class="form-detail">
      <iep-form-item label-name="工作所在地" prop="workPlace">
        <IepCascaderCity v-model="formData.workPlace"></IepCascaderCity>
      </iep-form-item>
      <iep-form-item label-name="单位" prop="company">
        <el-input v-model="formData.company"></el-input>
      </iep-form-item>
      <iep-form-item label-name="生日" prop="birthday">
        <iep-date-picker
          v-model="formData.birthday"
          valueFormat="yyyy-MM-dd"
          type="date"
          placeholder="请选择生日"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="家乡" prop="householdRegister">
        <CascaderCity v-model="formData.householdRegister"></CascaderCity>
      </iep-form-item>
      <iep-form-item label-name="邮箱" prop="mail">
        <el-input v-model="formData.mail"></el-input>
      </iep-form-item>
      <iep-form-item label-name="签名" prop="sign">
        <el-input type="textarea" :rows="3" v-model="formData.sign"></el-input>
      </iep-form-item>
    </el-form>

    <iep-footer-bar>
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm" :loading="loadState">取消</iep-button>
    </iep-footer-bar>
  </iep-dialog>
</template>

<script>
import { initInfoForm, rules } from "./options";
import { mapGetters, mapActions } from "vuex";
import { updateInfomationByApp } from "@/api/admin/user";
import CascaderCity from "./CascaderCity";
import { UserDTOEntity } from "@/types/user";

export default {
  components: { CascaderCity },
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initInfoForm(),
      rules,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open() {
      this.dialogShow = true;
      // 获取当前登陆用户信息，进行赋值
      const {
        workPlace,
        company,
        birthday,
        householdRegister,
        mail,
        sign,
      } = this.userInfo;
      this.formData = {
        workPlace,
        company,
        birthday,
        householdRegister,
        mail,
        sign,
      };
    },
    resetForm() {
      this.formData = initInfoForm();
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          updateInfomationByApp(row).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("修改成功！");
              // 更新个人信息
              this.refresh();
              // 信息完善后提交申请
              this.$emit("apply", true);
            }
            this.resetForm();
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
    ...mapActions(["userGetInfo"]),
    async refresh() {
      await this.userGetInfo();
      this.load();
    },
    load() {
      this.form = this.$mergeByFirst(new UserDTOEntity(), this.userInfo);
    },
  },
  created() {},
};
</script>
