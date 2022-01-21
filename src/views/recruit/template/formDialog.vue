<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`${methodMaps[methodName].name}通知模板`"
    width="550px"
    @close="resetForm"
  >
    <el-form :model="formData" :rules="rules" ref="form" label-width="95px" class="form-detail">
      <iep-form-item label-name="类型">
        <el-radio-group v-model="formData.type">
          <el-radio :label="'0'">面试通知</el-radio>
          <el-radio :label="'1'">其他通知</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="模板名称" prop="name">
        <el-input v-model="formData.name" maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="标题" prop="theme">
        <el-input v-model="formData.theme" maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="正文" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          maxlength="500"
          :rows="6"
          show-word-limit
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="附带信息" v-if="formData.type === '0'">
        <div class="incidental">
          <div class="incidental-item">
            <div class="incidental-label">职位名称：</div>
            <div class="incidental-span">【职位名称】</div>
          </div>
          <div class="incidental-item">
            <div class="incidental-label">面试时间：</div>
            <div class="incidental-span">xxxx年xx月xx日xx时xx分</div>
          </div>
          <div class="incidental-item">
            <div class="incidental-label">面试地点：</div>
            <div class="incidental-span">xx市xx区xx街道xxxxxxxx</div>
          </div>
        </div>
      </iep-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm" :loading="loadState">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { initFormData, rules } from "./options";
import { createMail, updateMail } from "@/api/dms/recruit";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initFormData(),
      rules,
      methodName: "create",
      methodMaps: {
        create: {
          name: "新增",
          requestFn: createMail,
        },
        update: {
          name: "修改",
          requestFn: updateMail,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open(row = {}) {
      this.dialogShow = true;
      if (row.id) {
        this.formData = { ...row };
        this.methodName = "update";
      }
    },
    resetForm() {
      this.formData = initFormData();
      this.methodName = "create";
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.orgId = this.userInfo.orgId;
          this.methodMaps[this.methodName].requestFn(row).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("操作成功！");
              this.$emit("back-page", true);
            }
            this.resetForm();
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.incidental {
  border-radius: $--border-radius-base;
  background-color: $--background-color;
  padding: 15px;
  width: 100%;
  .incidental-item {
    font-size: 14px;
    color: $--color-text-regular;
    display: flex;
  }
}
</style>