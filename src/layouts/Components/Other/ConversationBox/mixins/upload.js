import * as types from "@/store/modules/user/mutation-types";
export default {
  data() {
    return {
      uploadUrl: "/api/admin/file/sftp/upload",
      header: {
        Authorization: "Bearer " + this.$storage.get(types.SET_ACCESS_TOKEN),
      },
    };
  },
  methods: {
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG,PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      } else if (!isLt1M) {
        this.$message("图片较大，正在努力发送中");
      }
      return isLt2M;
    },
    handleError() {
      this.$message.info("上传失败！");
    },
    //图片转base64 可压缩宽高
    getBase64Image(img, ratio = 1) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width / ratio;
      canvas.height = img.height / ratio;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");  // 可选其他值 image/jpeg
      return dataURL;

    },
    //压缩方法
    compress(img, { cRatio, returnLimit, submitLimit }) {
      let dataURL = this.getBase64Image(img);//第一次读取图片base64
      let fileSize = this.countBase64Size(dataURL);//查看base64大小
      // console.log("原大小", fileSize);
      let ratio = fileSize / 1024 / submitLimit;//以百KB转化为比率
      // console.log(ratio, returnLimit);
      if (ratio > returnLimit) {
        // 倍率限制
        this.$message.error("图片过大无法发送!");
        return "";
      }
      let isLt100K = ratio < 1;//是否符合提交大小
      if (isLt100K) {
        return dataURL;
      } else {
        ratio = ratio < 2 ? ratio + 1 : ratio;
        dataURL = this.getBase64Image(img, cRatio || ratio);
        fileSize = this.countBase64Size(dataURL);
        // console.log("压缩后大小", fileSize);
        ratio = fileSize / 1024 / submitLimit;
        isLt100K = ratio < 1;
        if (isLt100K) {
          return dataURL;
        } else {
          this.$message.error("图片过大无法发送!");
          return "";
        }
      }
    },
    // 读取base64大小
    countBase64Size(dataURL) {
      const eqTagIndex = dataURL.indexOf("=");
      const baseStr = eqTagIndex != -1 ? dataURL.substring(0, eqTagIndex) : dataURL;
      const strLen = baseStr.length;
      const fileSize = strLen - (strLen / 8) * 2;
      return fileSize;
    },
    // 图片转base64 带压缩
    imgToBase64(src, options, cb) {
      const index = src.lastIndexOf("?");
      src = index !== -1 ? (src.substring(0, index)) : (src);
      src += "?x-oss-process=image/resize,m_lfit,h_150,w_150";
      const image = new Image();
      // image.src = src + '?v=' + Math.random(); // 处理缓存
      image.src = src;
      image.crossOrigin = "*";  // 支持跨域图片
      image.onload = () => {
        const base64 = this.compress(image, options);
        cb && cb(base64);
      };
    },
  },
};