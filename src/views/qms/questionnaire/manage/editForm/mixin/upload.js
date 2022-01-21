import * as types from "@/store/modules/user/mutation-types";
export default {
  data() {
    return {
      myHeaders: {
        Authorization: "Bearer " + this.$storage.get(types.SET_ACCESS_TOKEN),
      },
      header: {
        Authorization: "Bearer " + this.$storage.get(types.SET_ACCESS_TOKEN),
      },
    };
  },
  methods: {
    beforeImgUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isPNG = file.type === "image/png";
      const isLt10M = file.size / 1024 / 1024 < 10;

      // if (!isJPG && !isPNG) {
      //   this.$message.error("上传图片只能是 JPG,PNG 格式!");
      // }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      } else {
        this.$message.info("正在上传图片，请稍等");
      }
      return isLt10M;
    },
    handleError() {
      this.$message.info("上传失败！");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  },
};