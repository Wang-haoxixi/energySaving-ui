<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :loadFunction="getInterestTagPage"
      ></iep-crud-table>
    </iep-basic-container>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { InterestTagDTO } from "./options";
import {
  getInterestTagPage,
  postInterestTag,
  putInterestTag,
  delInterestTagById,
} from "@/api/tms/interest_tag";
import DialogForm from "./DialogForm";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "id",
          label: "ID",
        },
        {
          prop: "name",
          label: "标签名称",
        },
        {
          prop: "refers",
          label: "被选择次数",
        },
        {
          prop: "imageUrl",
          label: "ICON",
        },
      ],
      operationOptions: [
        {
          name: "修改",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      commonOptions: [
        {
          name: "新增",
          icon: "el-icon-plus",
          func: this.handleAdd,
        },
      ],
    };
  },
  methods: {
    getInterestTagPage,
    handleAdd() {
      this.$refs["DialogForm"].form = new InterestTagDTO();
      this.$refs["DialogForm"].methodName = "新增兴趣标签";
      this.$refs["DialogForm"].formRequestFn = postInterestTag;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(
        new InterestTagDTO(),
        row,
      );
      this.$refs["DialogForm"].methodName = "修改兴趣标签";
      this.$refs["DialogForm"].formRequestFn = putInterestTag;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delInterestTagById, "删除");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
