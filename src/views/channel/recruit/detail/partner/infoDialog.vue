<template>
  <iep-dialog :dialog-show="dialogShow" title="请完善以下信息" width="600px" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="140px" class="form-detail">
      <el-form-item label="请选择合伙主体：">
        <el-radio-group v-model="formData.type">
          <el-radio label="user">个人</el-radio>
          <el-radio label="so">组织</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名/公司名称：" prop="name">
        <el-input v-model="formData.name" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="行业：" prop="industry">
        <IndustrySelect v-model="formData.industry"></IndustrySelect>
      </el-form-item>
      <el-form-item label="职位：" prop="position">
        <el-input v-model="formData.position" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="地区：" prop="city">
        <IepCascaderCity v-model="formData.city"></IepCascaderCity>
      </el-form-item>
      <el-form-item label="联系方式：" prop="mobile">
        <el-input v-model="formData.mobile" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="能力与优势：" prop="ability">
        <el-input v-model="formData.ability" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="具体描述：" prop="describe">
        <el-input
          v-model="formData.describe"
          type="textarea"
          maxlength="500"
          :rows="3"
          show-word-limit
          placeholder="请在此具体描述您的个人能力与合作优势，如资源清单、能力清单、合作意向等"
        ></el-input>
      </el-form-item>
    </el-form>

    <iep-footer-bar>
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm" :loading="loadState">取消</iep-button>
    </iep-footer-bar>
  </iep-dialog>
</template>

<script>
import { initInfoForm, rules } from "./options";
import { mapGetters } from "vuex";
import { deliveryPartner } from "@/api/dms/recruit_operation";
import IndustrySelect from "./industrySelect";

export default {
  components: { IndustrySelect },
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initInfoForm(),
      rules,
      loading: false,
      recruitData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open(row = {}) {
      this.dialogShow = true;
      this.recruitData = { ...row };
    },
    resetForm() {
      this.recruitData = {};
      this.formData = initInfoForm();
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.recruitId = this.recruitData.recruitId;
          if (this.recruitData.sendNotification) {
            const { sendNotification, targeId, senderId } = this.recruitData;
            row.sendNotification = sendNotification;
            row.targeId = targeId;
            row.senderId = senderId;
          }
          deliveryPartner(row).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("发送成功！");
            }
            this.resetForm();
            this.$emit("callback");
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
  created() {},
};
</script>
