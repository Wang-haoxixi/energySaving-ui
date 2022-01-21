<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      searchName="courseName"
      :isInitLoad="false"
      :isMutipleSelection="false"
      :dictsMap="dictsMap"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      :loadFunction="getCourseInfoPage"
    >
      <template #iep-crud-advance-search>
        <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
      </template>
      <template #kind="{scope}">
        <div>{{getTextByKind(scope.row.kind)}}</div>
      </template>
    </iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
    <CategoryDialog ref="CategoryDialog"></CategoryDialog>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import {
  delInfoById,
  getCourseInfoPage,
  setInfoAudit,
} from "@/api/qms/course_info";
import { getTestDictPage } from "@/api/qms/course_courseware";
import CategoryDialog from "../Components/Category/Dialog";
import { filterNodeNilChildren, getTextByTreeNode } from "@/util/tree";
import { CourseCategory } from "../options";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
    CategoryDialog,
    AdvanceSearch,
  },
  data() {
    return {
      dictsMap,
      dictOptions: [],
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "课程分类",
          func: this.handleCategory,
        },
      ],
      operationOptions: [
        {
          name: "查看",
          func: this.handleDetail,
        },
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
        {
          name: "课件目录",
          func: this.handleDirectory,
        },
        {
          name: "学习名单",
          func: this.handleStudyList,
        },
        {
          name: "提交审核",
          func: this.handleCommit,
          hidden: (row) => {
            return row.audit != "4" && row.audit != "2";
          },
        },
      ],
      columnsMap: [
        {
          prop: "courseName",
          label: "课程名称",
        },
        {
          prop: "openScope",
          label: "开放范围",
          type: "dict",
        },
        {
          prop: "kind",
          label: "课程分类",
          type: "slot",
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
      ],
    };
  },
  created() {
    this.loadDict();
  },
  methods: {
    getCourseInfoPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    async loadDict() {
      const { data } = await getTestDictPage({
        category: CourseCategory.INFO,
      });
      // 给表格显示
      this.dictOptions = filterNodeNilChildren(data.children);
      this.loadPage();
    },
    async handleDetail(row) {
      this.$router.push({
        path: `/exam/info_edit/${row.id}`,
        query: {
          show: true,
        },
      });
    },
    handleAdd() {
      this.$router.push({
        path: "/exam/info_edit/0",
      });
    },
    async handleEdit(row) {
      this.$router.push({
        path: `/exam/info_edit/${row.id}`,
      });
    },
    handleDel(row) {
      this._handleComfirm(row.id, delInfoById, "删除");
    },
    handleDirectory(row) {
      this.$router.push({
        path: `/exam/info_section/${row.id}`,
      });
    },
    handleStudyList(row) {
      this.$router.push({
        path: `/exam/study_list/${row.id}`,
      });
    },
    handleCategory() {
      this.$refs["CategoryDialog"].open(CourseCategory.INFO);
    },
    getTextByKind(kind) {
      const kindArr = kind.split(",").map((i) => Number(i));
      const textArr = getTextByTreeNode(this.dictOptions, kindArr);
      return textArr.join("/");
    },
    handleCommit(row) {
      this.$confirm("是否提交审核", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          setInfoAudit({
            id: row.id,
            audit: "3",
          }).then((data) => {
            console.log(data);
            if (data.code === 0) {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.loadPage();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
