<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :loadFunction="getNoticePage"
      ></iep-crud-table>
    </iep-basic-container>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </div>
</template>

<script>
import {
  postNotice,
  putNotice,
  getNoticePage,
  getNoticeById,
  deleteNoticeById,
  publishNoticeById,
} from "@/api/admin/notice";
import DialogForm from "./DialogForm";
import operationMixins from "@/mixins/operationMixins";
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
        {
          name: "查看",
          func: this.handleShow,
        },
        // {
        //   name: "编辑",
        //   func: this.handleEdit,
        // },
        {
          name: "发布",
          func: this.handlePublish,
          hidden: row => {
            return row.status === "2";
          },
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      columnsMap: [
        {
          prop: "id",
          label: "ID",
          width: 85,
        },
        {
          prop: "title",
          label: "主题",
        },
        {
          prop: "createTime",
          label: "发送时间",
          width: 150,
        },
      ],
    };
  },
  methods: {
    getNoticePage,
    async handleShow(row) {
      const { data } = await getNoticeById(row.id);
      this.$refs["DialogForm"].form = { ...data };
      this.$refs["DialogForm"].disabled = true;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const { data } = await getNoticeById(row.id);
      this.$refs["DialogForm"].form = { ...data };
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].formRequestFn = putNotice;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, deleteNoticeById, "删除");
    },
    handlePublish(row) {
      this._handleComfirm(row.id, publishNoticeById, "发布");
    },
    handleAdd() {
      this.$refs["DialogForm"].disabled = false;
      this.$refs["DialogForm"].resetForm();
      this.$refs["DialogForm"].formRequestFn = postNotice;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDeal(row) {
      this.$openPage(`/operate/suggest_detail/${row.id}`);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
