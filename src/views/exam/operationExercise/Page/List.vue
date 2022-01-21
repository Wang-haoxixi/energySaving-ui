<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        searchName="examName"
        :isMutipleSelection="true"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :loadFunction="getOperatePage"
      ></iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import { getOperatePage, audit } from "@/api/qms/exam_exercise";
export default {
  mixins: [operationMixins],
  data() {
    return {
      dictsMap,
      operationOptions: [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
          disabled: false,
        },
        {
          name: (row) => {
            return row.audit === "2" ? "上架" : "下架";
          },
          func: this.handleAudit,
        },
      ],
      columnsMap: [
        {
          prop: "examName",
          label: "练习名称",
        },
        {
          prop: "orgName",
          label: "发布组织",
        },
        {
          prop: "openScope",
          label: "开放范围",
          type: "dict",
        },
        {
          prop: "beginStatus",
          label: "练习状态",
          type: "dict",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
        {
          prop: "createByName",
          label: "创建者",
        },
        {
          prop: "audit",
          label: "审核状态",
          type: "dict",
        },
      ],
      commonOptions: [
        {
          name: "批量上架",
          func: this.handleUp,
          batchOperation: true,
        },
        {
          name: "批量下架",
          func: this.handleDown,
          batchOperation: true,
        },
      ],
    };
  },
  methods: {
    getOperatePage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleUp() {
      this.handleAuditBatch(2);
    },
    handleDown() {
      this.handleAuditBatch(1);
    },
    handleAuditBatch(type) {
      const ids = this.$refs["CrudTable"].multipleSelection;
      this.$confirm(
        type === "2" ? "请确认是否批量上架" : "请确认是否批量下架",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          audit({ ids: ids, audit: type }).then((res) => {
            if (res.code === 0) {
              if (res.data === false) {
                this.$message({
                  type: "warning",
                  message: "操作失败!",
                });
              } else {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
              this.$refs.CrudTable.loadPage();
            }
          });
        })
        .catch(() => {});
    },
    handleDetail(row) {
      this.$emit("onEdit", {
        methodName: "详情",
        id: row.id,
        testPaperId: row.testPaperId,
        edit: true,
      });
    },
    handleAudit(row) {
      this.$confirm(
        row.audit === "1" ? "请确认是否下架" : "请确认是否上架",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          audit({ ids: [row.id], audit: row.audit }).then((res) => {
            if (res.code === 0) {
              if (res.data === false) {
                this.$message({
                  type: "warning",
                  message: "操作失败!",
                });
              } else {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
              this.$refs.CrudTable.loadPage();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
