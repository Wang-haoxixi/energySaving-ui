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
      <el-button v-if="!importFlag" @click="handleMoreModel" type="text">点击下载模板数据</el-button>
    </div>
  </el-upload>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getModelExcel,
  getOrgExcelExport,
  getOrgExcelExportInfo,
} from "@/api/dms/organization_list";
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
    // this.actionUrl = '/api/tms/excel/import'
    this.importFlag
      ? (this.actionUrl = "/api/crm/organization_excel/upload")
      : (this.actionUrl = "/api/crm/organization_excel/require_upload");
    this.token.Authorization = "Bearer " + this.accessToken;
  },
  methods: {
    handleModel() {
      this.importFlag ? getModelExcel() : getOrgExcelExport();
    },
    handleMoreModel() {
      !this.importFlag ? getOrgExcelExportInfo(this.parmasForm) : "";
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
