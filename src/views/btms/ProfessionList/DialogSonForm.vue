<template>
  <iep-dialog :dialog-show="dialogShow" title="专业子分类" width="700px" @close="close">
    <iep-operation-container>
      <template slot="left">
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
      </template>
    </iep-operation-container>
    <el-scrollbar style="height:400px;">
      <iep-table
        :isLoadTable="false"
        :isPagination="isPagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        isMutipleSelection
        :dictsMap="dictsMap"
        @selection-change="selectionChange"
        is-mutiple-selection
        row-key="id"
      >
        <el-table-column label="子分类" width="90px">
          <template slot-scope="scope">
            <span>{{scope.row.childrenLength?scope.row.childrenLength:0}}</span>
          </template>
        </el-table-column>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </el-scrollbar>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </iep-dialog>
</template>
<script>
import { columnsSonMap, dictsMap } from "./options";
import DialogForm from "./DialogForm";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { deleteByList, createPage, updatePage } from "@/api/dms/profession";
export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm },
  data() {
    return {
      dictsMap,
      dialogShow: false,
      isPagination: false,
      formRequestFn: () => {},
      columnsMap: columnsSonMap,
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "子分类",
          func: this.handleSonType,
          hidden: row => row.type >= 2,
        },
        {
          name: "删除",
          func: this.handleDelete,
        },
      ],
      pagedTable: [],
      multipleSelection: [],
      isLoadTable: false,
      id: "",
      parentId: "",
      type: "",
    };
  },
  methods: {
    close() {
      this.id = "";
      this.parentId = "";
      this.type = "";
      this.dialogShow = false;
      this.$emit("load-page");
    },
    selectionChange(val) {
      this.multipleSelection = val.map(m => m.id);
    },
    handleAdd() {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
      this.$refs["DialogForm"].formRequestFn = createPage;
      this.$refs["DialogForm"].form.type = this.type;
      this.$refs["DialogForm"].getValueByKey();
      this.$refs["DialogForm"].parentId = this.parentId;
      this.$refs["DialogForm"].id = null;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].id = row.id;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].formRequestFn = updatePage;
      this.$refs["DialogForm"].parentId = row.parentId;
    },
    async handleSonType(row) {
      this.isLoadTable = true;
      await this.formRequestFn(row.id).then(data => {
        this.pagedTable = data.data.children;
        this.parentId = data.data.id;
        this.id = row.id;
        this.type = Number(data.data.type) + 1;
        this.isLoadTable = false;
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将删除该项及其子分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteByList([row.id]).then(data => {
          if (data.data) {
            this.$message.success("操作成功");
            this.loadPage();
          } else {
            this.$message(data.msg);
          }
        });
      });
    },
    async loadPage() {
      this.isLoadTable = true;
      await this.formRequestFn(this.id).then(data => {
        this.pagedTable = data.data.children;
        this.parentId = data.data.id;
        this.type = Number(data.data.type) + 1;
        this.isLoadTable = false;
      });
    },
  },
};
</script>
