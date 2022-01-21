<template>
  <iep-dialog :dialog-show="dialogShow" title="团队邀请设置" width="500px" @close="_close()">
    <el-alert title="普通员工(非管理员)可直接邀请他人加入组织" type="warning"></el-alert>
    <el-form class="iep-form-detail" :model="form" ref="form">
      <div class="switch-box">
        <div>允许非管理员邀请员工</div>
        <el-switch v-model="form.allowNonAdInEm" active-color="#13ce66"></el-switch>
      </div>
      <h3>加入部门</h3>
      <el-radio v-model="form.joinDepType" label="1">邀请人所在部门</el-radio>
      <div class="switch-box">
        <el-radio v-model="form.joinDepType" label="2">指定部门</el-radio>
        <el-select class="flex-select" v-model="form.dept" placeholder="请选择指定部门">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="switch-box">
        <div>邀请过期时间</div>
        <el-select class="flex-select" v-model="form.invitExpireTime" placeholder="请选择邀请过期时间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="switch-box">默认显示：欢迎加入xxx组织</div>
      <iep-input-area v-model="form.welcomeWord" placeholder="成员欢迎词"></iep-input-area>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initInviteSettingForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  name: "IepDialogInviteSetting",
  mixins: [formMixins],
  data() {
    return {
      form: initInviteSettingForm(),
      dialogShow: false,
      options: [
        {
          value: "1",
          label: "国脉",
        },
        {
          value: "2",
          label: "互联",
        },
      ],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initInviteSettingForm();
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-form-detail {
  margin: 0 10px;
}
.switch-box {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .flex-select {
    flex: 0 0 250px;
  }
}
</style>
