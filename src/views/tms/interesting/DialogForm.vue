<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :rules="rules" :model="form" ref="form" label-width="90px">
      <iep-form-item label-name="标签名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="ICON" prop="imageUrl">
        <IepUploadAvatar v-model="form.imageUrl"></IepUploadAvatar>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { InterestTagDTO } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      methodName: "创建",
      form: new InterestTagDTO(),
      formRequestFn: () => {},
      rules: {
        name: [
          { required: true, message: "标签名称不能为空", trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "ICON不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },

    close() {
      this.form = new InterestTagDTO();
      this._close();
      this.$emit("load-page");
    },

    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
