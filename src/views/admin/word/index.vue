<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        rowId="wordId"
        :loadFunction="getWordPage"
        :isMutipleSelection="false"
      ></iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
// import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import { getWordPage, putWord, delWordById, postWord } from "@/api/admin/word";
import { columnsMap, initForm } from "./options";

export default {
  components: {
    DialogForm,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  computed: {},
  methods: {
    getWordPage,
    handleAdd() {
      this.$refs["DialogForm"].form = initForm();
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postWord;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), row);
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putWord;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm([row.wordId], delWordById, "删除敏感词");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
