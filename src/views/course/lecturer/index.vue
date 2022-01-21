<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      searchName="lecturerName"
      :loadFunction="getCourseLecturerPage"
    ></iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import {
  delLecturerById,
  getCourseLecturerPage,
  getLecturerById,
} from "@/api/qms/course_lecturer";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        // {
        //   name: "查看",
        //   func: this.handleDetail,
        // },
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      columnsMap: [
        {
          prop: "lecturerName",
          label: "讲师名称",
        },
        {
          prop: "courseNumber",
          label: "课程数量",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
      ],
    };
  },
  methods: {
    getCourseLecturerPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async handleDetail(row) {
      const { data } = await getLecturerById(row.id);
      this.$refs["DialogForm"].show(data);
    },
    handleAdd() {
      this.$refs["DialogForm"].add();
    },
    async handleEdit(row) {
      const { data } = await getLecturerById(row.id);
      this.$refs["DialogForm"].edit(data);
    },
    handleDel(row) {
      this._handleComfirm(row.id, delLecturerById, "删除讲师");
    },
  },
};
</script>
