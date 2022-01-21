<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getMyCertificatePage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :operationWidth="150"
    ></iep-crud-table>
    <IepImgViewer ref="imgViewer"></IepImgViewer>
  </div>
</template>
<script>
import { getMyCertificatePage } from "@/api/qms/cerificate";
import { validatenull } from "@/util/validate";
import { downloadImg } from "@/api/common";
export default {
  data() {
    return {
      dictsMap: {
        level: {
          1: "初级",
          2: "中级",
          3: "高级",
        },
      },
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
          hidden: (row) => {
            return validatenull(row.imgUrl);
          },
        },
        {
          name: "下载",
          func: this.下载,
          hidden: (row) => {
            return validatenull(row.imgUrl);
          },
        },
      ],
      columnsMap: [
        {
          prop: "certificateName",
          label: "证书名称",
        },
        {
          prop: "examName",
          label: "关联考试",
        },
        {
          prop: "level",
          label: "证书级别",
          type: "dict",
        },
        {
          prop: "validTime",
          label: "证书时间",
        },
        {
          prop: "awardingOrg",
          label: "颁发机构",
        },
      ],
    };
  },
  methods: {
    getMyCertificatePage,
    查看(row) {
      this.$refs["imgViewer"].imgList = [row.imgUrl];
      this.$refs["imgViewer"].showViewer = true;
    },
    下载(row) {
      downloadImg(row.imgUrl, row.certificateName);
    },
  },
};
</script>
