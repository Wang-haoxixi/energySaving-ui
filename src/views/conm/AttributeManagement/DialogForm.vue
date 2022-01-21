<template>
  <iep-dialog :dialog-show="dialogShow" :title="`推荐位${methodName}`" width="800px" @close="loadPage">
    <el-form class="form-detail" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="上级站点">
        <el-input v-model="siteId" disabled></el-input>
      </el-form-item>
      <el-form-item label="属性名称" prop="attributeName">
        <el-input v-model="form.attributeName" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="属性编码" prop="attributeNumber">
        <el-input v-model="form.attributeNumber" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <div v-if="methodName === '编辑'">
        <el-form-item label="关联文章">
          <el-button @click="handleMoreRemove">批量移除</el-button>
        </el-form-item>
        <el-scrollbar style="height:300px;margin-left: 50px">
          <iep-table
            :isLoadTable="false"
            :isPagination="false"
            :columnsMap="columnsMap"
            :pagedTable="pagedTable"
            @pagination-size-change="handlePaginationSizeChange"
            @pagination-current-change="handlePaginationCurrentChange"
            is-mutiple-selection
            @selection-change="selectionChange"
          >
            <el-table-column prop="operation" label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <iep-operation-wrapper>
                  <iep-button type="text" :plain="plain" @click="handleRemove(scope.row)">移除</iep-button>
                </iep-operation-wrapper>
              </template>
            </el-table-column>
          </iep-table>
        </el-scrollbar>
      </div>
    </el-form>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="submitForm()">提交</el-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import {
  getPageDetailById,
  getAttributeListById,
  deleteAttrByIds,
} from "@/api/conm/attribute_controller.ts";
import { initForm, dictsMap, rules, columnsTitleMap } from "./options.ts";
import formMixins from "@/mixins/formMixins";
import mixins from "@/mixins/mixins";
export default {
  mixins: [formMixins, mixins],
  data() {
    return {
      dictsMap,
      columnsMap: columnsTitleMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      rules,
      id: 0,
      siteId: 0,
      pagedTable: [],
      multipleSelection: [],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
    },
    handleRemove(row) {
      this.$confirm("此操作将移除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteAttrByIds([row.id]).then(data => {
          if (data.code === 0) {
            this.$message({
              type: "success",
              message: "移除成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `移除失败，${data.message}`,
            });
          }
          this.loadTypeList();
        });
      });
    },
    selectionChange(val) {
      this.multipleSelection = val.map(m => m.id);
    },
    handleMoreRemove() {
      this.$confirm("此操作将批量移除文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteAttrByIds(this.multipleSelection).then(data => {
          if (data.code === 0) {
            this.$message({
              type: "success",
              message: "移除成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `移除失败，${data.message}`,
            });
          }
          this.loadTypeList();
        });
      });
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
      getAttributeListById(this.id).then(data => {
        this.pagedTable = data.data;
      });
    },
    async submitForm() {
      this.formRequestFn({
        siteId: this.siteId,
        attributeId: this.id,
        ...this.form,
      }).then(data => {
        if (data.code === 0) {
          this.$message.success("操作成功");
          this.loadPage();
          this.$emit("load-page");
        } else {
          this.$message(data.message);
        }
      });
    },
  },
};
</script>
