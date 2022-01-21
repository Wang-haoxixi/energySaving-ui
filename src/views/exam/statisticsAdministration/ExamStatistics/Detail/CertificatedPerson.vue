<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :columnsMap="columnsMap"
      :loadFunction="getExamCertificationPage"
      :operationOptions="operationOptions"
      searchName="realName"
      placeholder="请输入人员姓名进行搜索"
      :isMutipleSelection="false"
      :useRoutePage="false"
    ></iep-crud-table>
    <IepImgViewer ref="imgViewer"></IepImgViewer>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
import { getExamCertificationPageById } from "@/api/exam/exam_statistics";
export default {
  data() {
    return {
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
          hidden: (row) => {
            return validatenull(row.imgUrl);
          },
        },
      ],
      // TODO 更换接口
      columnsMap: [
        {
          prop: "certificateName",
          label: "证书名称",
        },
        {
          prop: "realName",
          label: "姓名",
        },
        {
          prop: "validTime",
          label: "获证时间",
        },
        {
          prop: "number",
          label: "证书编号",
        },
      ],
    };
  },
  computed: {
    getExamCertificationPage() {
      return getExamCertificationPageById(this.$route.params.id);
    },
  },
  methods: {
    查看(row) {
      this.$refs["imgViewer"].imgList = [row.imgUrl];
      this.$refs["imgViewer"].showViewer = true;
    },
  },
};
</script>
