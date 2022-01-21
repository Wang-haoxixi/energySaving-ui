<template>
  <iep-dialog :dialog-show="dialogShow" title="评论" width="500px" @close="_close()">
    <el-form :model="form" ref="form" :rules="rules">
      <h2 class="sub-title">对{{form.name}}的评论</h2>
      <el-form-item prop="content">
        <IepInputArea
          v-model="form.content"
          :maxlength="maxWords"
          placeholder="说明和喜欢和不喜欢 的功能。为了保护你的隐私，请 不要发布任何个人信息，例如电子邮件地址、电话号 码、产品密钥、密码或信用卡号码。"
        ></IepInputArea>
      </el-form-item>
      <div class="rate-box">
        <el-form-item prop="rank">
          <el-rate v-model="form.rank" :texts="texts" show-text></el-rate>
        </el-form-item>
        <div>{{form.content.length}}(共{{maxWords}})</div>
      </div>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { rateTexts } from "@/config/defaultSettings";
import formMixins from "@/mixins/formMixins";
import { postComment } from "@/api/dms/shop_comment";
class CommentDTO {
  content = "";
  orderId = 0;
  name = "";
  rank = 5;
  targetId = 0;
}
export default {
  name: "IepDialogComment",
  mixins: [formMixins],
  data() {
    return {
      maxWords: 200,
      dialogShow: false,
      form: new CommentDTO(),
      texts: rateTexts,
      rules: {
        content: [
          { required: true, message: "请输入评论内容", trigger: "blur" },
        ],
        rank: [{ required: true, message: "请评分", trigger: "blur" }],
      },
    };
  },

  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.form = new CommentDTO();
      this.$emit("load-page");
    },
    async submitForm() {
      delete this.form.name;
      const { data } = await postComment(this.form);
      if (data) {
        this.$message.success("评论成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rate-box {
  display: flex;
  justify-content: space-between;
}
.sub-title {
  font-size: 14px;
}
</style>
