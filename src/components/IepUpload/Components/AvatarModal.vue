<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :noScroll="options.isScale"
    title="裁剪图片"
    :width="`${width+200}px`"
    @close="close()"
  >
    <div class="content" :style="[{height: `${height}px`},{transform:isScale()}]">
      <vue-cropper
        ref="cropper"
        :img="options.img"
        :info="true"
        :autoCrop="options.autoCrop"
        :autoCropWidth="options.autoCropWidth"
        :autoCropHeight="options.autoCropHeight"
        :canMoveBox="options.canMoveBox"
        :fixedNumber="options.fixedNumber"
        :fixed="options.fixed"
        :fixedBox="options.fixedBox"
        @realTime="realTime"
        outputType="png"
      ></vue-cropper>
    </div>
    <template slot="footer">
      <el-row style="padding-bottom:10px">
        <el-col :span="6">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="beforeUpload"
            :auto-upload="false"
            :show-file-list="false"
            :accept="accept"
          >
            <el-button slot="trigger">选择图片</el-button>
          </el-upload>
        </el-col>
        <el-col style="display:flex;justify-content: center;" :span="14">
          <el-button icon="el-icon-plus" @click="changeScale(1)" />
          <el-button icon="el-icon-minus" @click="changeScale(-1)" />
          <el-button icon="el-icon-refresh-left" @click="rotateLeft" />
          <el-button icon="el-icon-refresh-right" @click="rotateRight" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :loading="loadingUpload" @click="finish('blob')">保存</el-button>
        </el-col>
      </el-row>
    </template>
  </iep-dialog>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { sftpSingleImageUploadUrl } from "@/api/admin/file";
import request from "@/router/axios";
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    accept: {
      type: String,
      default: "image/*",
    },
    option: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VueCropper,
  },
  data() {
    return {
      loadingUpload: false,
      dialogShow: false,
      fileName: "",
      fileList: [],
      options: {
        img: "",
        autoCrop: true,
        fixedBox: false,
        canMoveBox: false,
        autoCropWidth: this.width,
        autoCropHeight: this.width,
        fixed: true,
        fixedNumber: [1, 1],
        isScale: false,
      },
      previews: {},
    };
  },
  methods: {
    edit(img = "") {
      this.dialogShow = true;
      this.options.img = img;
      /* 获取原始头像 */
    },
    close() {
      // this.options.img = "";
      this.dialogShow = false;
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    beforeUpload(file) {
      this.fileName = file.name;
      const reader = new FileReader();
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.options.img = reader.result;
      };
      // 转化为blob
      // reader.readAsArrayBuffer(file)
      return false;
    },
    // 上传图片（点击上传按钮）
    finish(type) {
      this.loadingUpload = true;
      const formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          if (data.size / 1024 / 1024 > 2) {
            this.$message("图片过大，请裁剪或更换图片");
            return;
          }
          const img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          request({
            url: sftpSingleImageUploadUrl,
            method: "post",
            data: formData,
          }).then(res => {
            if (res.code) {
              this.dialogShow = false;
              this.loadingUpload = false;
              return;
            }
            this.$emit("ok", res.data);
            this.dialogShow = false;
            this.$message.success("上传成功");
            this.loadingUpload = false;
          });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.loadingUpload = false;
          if (data.size / 1024 / 1024 > 2) {
            this.$message("图片过大，请裁剪或更换图片");
            return;
          }
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    realTime(data) {
      this.previews = data;
    },
    isScale() {
      if (this.options.isScale)
        return `scale(${Math.floor((window.outerHeight / 1038) * 100) / 100})`;
      return "";
    },
  },
  watch: {
    dialogShow(val) {
      if (val === false) {
        if (this.$refs.cropper) {
          this.$refs.cropper.cancelScale();
        }
      }
    },
  },
  created() {
    this.options = this.$mergeByFirst(this.options, this.option);
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 20px;
  transform-origin: top;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
