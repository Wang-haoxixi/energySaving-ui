<template>
  <el-upload
    class="upload-demo"
    drag
    :headers="token"
    :action="actionUrl"
    accept=".xlsx, .xls"
    :limit="1"
    :multiple="false"
    :on-success="handleFileFinish"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <div class="el-upload__tip" slot="tip">
      只能上传xls/xlsx文件
      <el-button @click="handleModel" type="text">点击下载模板</el-button>
    </div>
  </el-upload>
</template>
<script>
import { mapGetters } from "vuex";
import { getModelExcel } from "@/api/dms/industry.ts";
export default {
  data() {
    return {
      token: {},
      actionUrl: "",
    };
  },
  props: ["importFlag", "parmasForm"],
  computed: {
    ...mapGetters(["accessToken"]),
  },
  created() {
    this.actionUrl = "/api/cpms/indusdry/upload";
    this.token.Authorization = "Bearer " + this.accessToken;
  },
  methods: {
    handleModel() {
      getModelExcel();
    },
    handleFileFinish(res) {
      setTimeout(() => {
        this.$emit("close", res);
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-demo {
  text-align: center;
}
</style>
