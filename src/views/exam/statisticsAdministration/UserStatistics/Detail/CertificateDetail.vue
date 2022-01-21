<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getExamCertificationPage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :useRoutePage="false"
    ></iep-crud-table>
    <IepImgViewer ref="imgViewer"></IepImgViewer>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
import { getCertificateDetailPageById } from "@/api/exam/exam_statistics";
import { mapGetters } from "vuex";
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
      dictsMap: {
        level: {
          1: "初级",
          2: "中级",
          3: "高级",
        },
      },
      // TODO 更换接口
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
          label: "证书等级",
          type: "dict",
        },
        {
          prop: "validTime",
          label: "获证时间",
        },
        {
          prop: "validityPeriod",
          label: "有效期",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    getExamCertificationPage() {
      const type = this.isPlatform ? "operate" : "org";
      return getCertificateDetailPageById(this.$route.params.id, type);
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
