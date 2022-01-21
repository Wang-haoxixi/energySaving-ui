<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      searchName="videoName"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      :loadFunction="getExamVideoPage"
      :isMutipleSelection="false"
    ></iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </div>
</template>

<script>
import DialogForm from "./DialogForm";
import {
  getExamVideoPageById,
  updateExamVideo,
  addExamVideo,
} from "@/api/qms/exam_examination_video";
export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap: [
        {
          label: "ID",
          prop: "id",
        },
        {
          label: "视频名称",
          prop: "videoName",
        },
        {
          label: "视频地址",
          prop: "videoUrl",
        },
        {
          label: "视频截图地址",
          prop: "videoPicUrl",
        },
        {
          label: "集号",
          prop: "number",
        },
      ],
    };
  },
  computed: {
    getExamVideoPage() {
      return getExamVideoPageById(this.$route.params.id);
    },
    commonOptions() {
      return [
        {
          name: "新增",
          func: this.addVideo,
        },
      ];
    },
    operationOptions() {
      return [
        {
          name: "查看",
          func: this.handleDetail,
          disabled: false,
        },
        {
          name: "编辑",
          func: this.editVideo,
        },
      ];
    },
  },
  methods: {
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleDetail(row) {
      this.$refs["DialogForm"].methodName = "查看";
      this.$refs["DialogForm"].form = { ...row };
      this.$refs["DialogForm"].disabled = true;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async editVideo(row) {
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = updateExamVideo;
      this.$refs["DialogForm"].form = { ...row };
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async addVideo() {
      this.$refs["DialogForm"].methodName = "新增";
      this.$refs["DialogForm"].formRequestFn = addExamVideo;
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].dialogShow = true;
    },
  },
};
</script>
