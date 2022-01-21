<template>
  <iep-dialog title="好友申请" :dialogShow="dialogShow" @close="close()" width="500px">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="90px">
      <div class="user-box">
        <div class="avatar">
          <iep-img class="img" :src="form.avatar" :resizeOpt="{l:70}"></iep-img>
        </div>
        <div class="info">
          <div class="name">
            {{form.realName}}
            <span>{{form.position}}</span>
          </div>
          <div>{{form.company}}</div>
        </div>
      </div>
      <iep-form-item label-name="申请理由" prop="remarks">
        <iep-input-area
          v-model="form.remarks"
          placeholder="请输入申请理由"
          :maxlength="50"
          show-word-limit
        ></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">发送</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { createFriend } from "@/api/admin/friend";
const initForm = () => {
  return {
    remarks: "",
    receiveId: "0",
    userId: 0,
    avatar: "",
    realName: "",
    position: "",
    company: "",
  };
};
export default {
  name: "IepDialogCreateFriend",
  data() {
    return {
      dialogShow: false,
      form: initForm(),
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await createFriend(this.form);
      if (data) {
        this.$message.success("发送成功");
        this.close();
      } else {
        // 当拉黑或者被拉黑无法加好友时关闭dialog
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./MentorFriend.scss";
</style>
