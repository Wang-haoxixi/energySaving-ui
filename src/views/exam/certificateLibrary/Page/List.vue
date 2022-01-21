<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :isMutipleSelection="false"
        searchName="title"
        rowId="id"
        :loadFunction="getPage"
      >
        <template #iep-crud-advance-search>
          <!-- <AdvanceSearch @search-page="handleSearch"></AdvanceSearch> -->
        </template>
        <template #iep-crud-left>
          <iep-operation-wrapper>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </iep-operation-wrapper>
        </template>
        <template #relationState="{scope}">{{dictsMap.relationState[scope.row.relationState]}}</template>
        <template #previewPic="{scope}">
          <iep-img
            style="height:40px;"
            :src="scope.row.previewPic"
            :previewSrcList="[scope.row.previewPic]"
            :resizeOpt="{h:40}"
          ></iep-img>
        </template>
        <template
          #isPreview="{scope}"
        >{{scope.row.previewPic && scope.row.previewPic.length > 0 ? '已生成' : '未生成' }}</template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { dictsMap, columnsMap } from "../../const/certificateOptions.ts";
import { getPage, deleteById, generatePreview } from "@/api/qms/cerificate";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
export default {
  data() {
    return {
      dictsMap,
      columnsMap,
    };
  },
  mixins: [mixins, operationMixins],
  props: ["record"],
  computed: {
    operationOptions() {
      return [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
          disabled: false,
        },
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: false,
          disabled: false,
        },
        {
          name: "生成预览图",
          func: this.handlePreview,
          hidden: false,
          disabled: false,
        },
        {
          name: "获证人员",
          func: this.certificatePerson,
          hidden: false,
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: (val) => {
            return val.relationState != "0";
          },
          disabled: false,
        },
      ];
    },
  },
  methods: {
    handlePreview(row) {
      this.$confirm("确认生成预览图？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await generatePreview(row.id);
          if (data) {
            this.$message({
              type: "success",
              message: "生成成功",
            });
          }
          this.$refs["CrudTable"].loadPage({});
        })
        .catch(() => {});
    },
    useGuide() {
      this.$emit("onGuide");
    },
    getPage,
    handleAdd() {
      this.$emit("onEdit", {
        methodName: "新增",
        id: "",
        edit: false,
      });
    },
    handleEdit(row) {
      this.$emit("onEdit", {
        methodName: "编辑",
        id: row.id,
        edit: false,
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteById(row.id);
          if (data) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
          this.$refs["CrudTable"].loadPage({});
        })
        .catch(() => {});
    },
    handleDetail(row) {
      this.$emit("onEdit", {
        methodName: "详情",
        id: row.id,
        edit: true,
      });
    },
    certificatePerson(row) {
      this.$emit("onCertificatePersonList", {
        methodName: "证书管理",
        id: row.id,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
</style>
