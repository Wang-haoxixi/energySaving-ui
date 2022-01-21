<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}视频`" width="600px" @close="_close()">
    <el-form :model="form" ref="form" label-width="120px" :disabled="disabled" :rules="rules">
      <iep-form-item label-name="视频名称" prop="videoName">
        <el-input v-model="form.videoName" :maxlength="20"></el-input>
      </iep-form-item>
      <iep-form-item label-name="视频地址" prop="videoUrl">
        <IepOssUploadSelect v-model="form.videoUrl" accept=".mp4"></IepOssUploadSelect>
      </iep-form-item>
      <!-- <iep-form-item label-name="外部视频地址" prop="videoOutsideUrl">
        <el-input v-model="form.videoOutsideUrl" :maxlength="500"></el-input>
      </iep-form-item>-->
      <iep-form-item label-name="视频封面" prop="videoPicUrl">
        <IepUploadAvatar v-model="form.videoPicUrl"></IepUploadAvatar>
      </iep-form-item>
      <iep-form-item label-name="集号" prop="number">
        <iep-input-number v-model="form.number" :max="99"></iep-input-number>
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
const initForm = (examId = null) => {
  return {
    id: null,
    examId,
    videoName: "",
    videoUrl: "",
    //videoOutsideUrl: "",
    videoPicUrl: "",
    formRequestFn: () => {},
    number: 1,
  };
};
export default {
  mixins: [formMixins],
  data() {
    return {
      disabled: false,
      dialogShow: false,
      methodName: "新增",
      form: initForm(this.$route.params.id),
      rules: {
        videoName: [
          { required: true, message: "请输入", trigger: "blur" },
          { max: 20, message: "视频名称不允许超过20个字" },
        ],
        number: [{ required: true, message: "请选择", trigger: "blur" }],
        // videoOutsideUrl: [
        //   {
        //     required: true,
        //     message: "请输入网址",
        //     trigger: "blur",
        //     type: "url",
        //   },
        // ],
        videoUrl: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        videoPicUrl: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm(this.$route.params.id);
      this.$emit("load-page");
      this._close();
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
