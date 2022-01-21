<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}通知`" width="550px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" :rules="rules" label-width="85px">
      <iep-form-item label-name="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </iep-form-item>
      <iep-form-item label-name="内容" prop="text">
        <iep-input-area
          v-model="form.text"
          placeholder="请输入内容"
          :autosize="autosize"
          :maxlength="1000"
          show-word-limit
        ></iep-input-area>
        <!-- <IepJoditEditor :height="400" v-model="form.text" placeholder="请输入内容"></IepJoditEditor> -->
      </iep-form-item>
      <iep-form-item label-name="置顶通知" prop="isTop">
        <el-switch active-color="#13ce66" v-model="form.isTop"></el-switch>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">发布</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { sendNotice, updateNotice, getMessageById } from "@/api/ims/message";
import { initNoticeForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  name: "IepDialogSendNotice",
  mixins: [formMixins],
  data() {
    return {
      methodName: "新增",
      autosize: { minRows: 8 },
      form: initNoticeForm(),
      dialogShow: false,
      rules: {
        title: [
          { required: true, message: "请输入通知标题", trigger: "blur" },
          {
            max: 50,
            message: "通知标题最长50个字",
            trigger: "blur",
          },
        ],
        text: [{ required: true, message: "请输入通知内容", trigger: "blur" }],
      },
      formRequestFn: sendNotice,
    };
  },
  methods: {
    selfAdd() {
      this.methodName = "新增";
      this.formRequestFn = sendNotice;
      this.dialogShow = true;
    },
    async selfEdit(id) {
      const { data } = await getMessageById(id);
      // 后端字段不匹配
      this.form.sysInfoId = data.id;
      this.form.title = data.name;
      this.form.text = data.content;
      this.form.isTop = data.isTop;
      this.methodName = "编辑";
      this.formRequestFn = updateNotice;
      this.dialogShow = true;
    },
    _close() {
      this.methodName = "新增";
      this.dialogShow = false;
    },
    close() {
      this.form = initNoticeForm();
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
