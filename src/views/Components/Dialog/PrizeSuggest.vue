<template>
  <iep-dialog title="新增建议" :dialogShow="dialogShow" @close="_close()" width="500px">
    <el-form class="iep-form-detail" :model="form" ref="form" :rules="rules" label-width="65px">
      <iep-form-item label-name="主题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </iep-form-item>
      <!-- <iep-form-item label-name="类型" prop="type">
        <el-select v-model="form.type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>-->
      <iep-form-item label-name="内容" prop="content">
        <iep-input-area show-word-limit :maxlength="500" v-model="form.content" placeholder="请输入内容"></iep-input-area>
      </iep-form-item>
      <!-- <iep-form-item label-name="附件" prop="files">
        <iep-upload v-model="form.files"></iep-upload>
      </iep-form-item>-->
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { suggestTypeOptions, PrizeSuggestDTO, toRequestObj } from "./options";
import { postSuggest } from "@/api/admin/suggest";
import formMixins from "@/mixins/formMixins";

const rules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  // type: [{ required: true, message: "请选择建议类型", trigger: "blur" }],
  content: [
    { required: true, message: "请输入内容", trigger: "blur" },
    {
      min: 10,
      message: "内容至少10个字",
      trigger: "blur",
    },
  ],
};
export default {
  mixins: [formMixins],
  name: "IepDialogPrizeSuggest",
  data() {
    return {
      rules,
      dialogShow: false,
      form: new PrizeSuggestDTO(),
      options: suggestTypeOptions,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new PrizeSuggestDTO();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await postSuggest(toRequestObj(this.form));
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
