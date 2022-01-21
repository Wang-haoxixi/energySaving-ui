<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        searchName="courseName"
        :isMutipleSelection="false"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :operationOptions="operationOptions"
        :loadFunction="getCourseInfoOptPage"
      ></iep-crud-table>
      <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
    </iep-basic-container>
  </div>
</template>
<script>
import { dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import {
  getCourseInfoOptPage,
  setInfoAudit,
  setInfoRecommend,
} from "@/api/qms/course_info";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      dictsMap,
      operationOptions: [
        {
          name: "详情",
          func: this.handleDetail,
        },
        {
          name: (row) => {
            return row.isRecommend === "0" ? "推荐" : "不推荐";
          },
          func: this.handleRecommend,
        },
        {
          name: "上架",
          func: this.handleAudit,
          hidden: (row) => {
            return row.audit != "2";
          },
        },
        {
          name: "下架",
          func: this.handleAudit,
          hidden: (row) => {
            return row.audit != "1";
          },
        },
        {
          name: "审核",
          func: this.audit,
          hidden: (row) => {
            return row.audit != "3";
          },
        },
      ],
      columnsMap: [
        {
          prop: "courseName",
          label: "课程名称",
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
          prop: "createTime",
          label: "创建时间",
        },
        {
          prop: "createByName",
          label: "创建者",
        },
        {
          prop: "state",
          label: "状态",
          type: "dict",
        },
        {
          prop: "audit",
          label: "审核状态",
          type: "dict",
        },
        {
          prop: "isRecommend",
          label: "推荐状态",
          type: "dict",
        },
      ],
    };
  },
  methods: {
    getCourseInfoOptPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async handleDetail(row) {
      this.$router.push({
        path: `/exam/info_edit/${row.id}`,
        query: {
          show: true,
        },
      });
    },
    handleRecommend(row) {
      this._handleComfirm(row.id, setInfoRecommend, "更改推荐设置");
    },
    handleAudit(row) {
      this.$confirm(row.audit === "1" ? "是否下架" : "是否上架", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          setInfoAudit({
            id: row.id,
            audit: row.audit === "1" ? "2" : "1",
          }).then(() => {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.loadPage();
          });
        })
        .catch(() => {});
    },
    audit(row) {
      this.$confirm("审核课程", "提示", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning",
      })
        .then(async () => {
          setInfoAudit({ id: row.id, audit: "1" }).then(() => {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.loadPage();
          });
        })
        .catch(() => {
          setInfoAudit({ id: row.id, audit: "2" }).then(() => {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.loadPage();
          });
        });
    },
  },
};
</script>
