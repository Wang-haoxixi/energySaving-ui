<template>
  <div style="width: 100%;">
    <iep-table
      :isLoadTable="false"
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      isIndex
    >
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <el-button class="iep-btn-block add-btn" icon="el-icon-plus" @click="handleAdd()" plain>增加</el-button>
    <DialogVersion ref="DialogVersion" @load-page="loadPage()"></DialogVersion>
  </div>
</template>
<script>
import {
  getAppStoreVersionListById,
  postAppStoreVersion,
  putAppStoreVersion,
  delAppStoreVersionById,
} from "@/api/admin/app_store";
import DialogVersion from "./DialogVersion";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  components: {
    DialogVersion,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "versionNumber",
          label: "版本号",
        },
        {
          prop: "description",
          label: "描述",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
      ],
      pagedTable: [],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleEdit(row) {
      this.$refs.DialogVersion.form = { ...row };
      this.$refs.DialogVersion.methodName = "修改版本";
      this.$refs.DialogVersion.formRequestFn = putAppStoreVersion;
      this.$refs.DialogVersion.dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.relationId, delAppStoreVersionById, "删除");
    },
    handleAdd() {
      this.$refs.DialogVersion.load(this.$route.params.id);
      this.$refs.DialogVersion.methodName = "新增版本";
      this.$refs.DialogVersion.formRequestFn = postAppStoreVersion;
      this.$refs.DialogVersion.dialogShow = true;
    },
    async loadPage() {
      const { data } = await getAppStoreVersionListById(this.$route.params.id);
      this.pagedTable = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.add-btn {
  border-color: $--border-color;
}
</style>