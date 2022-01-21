<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :isInitLoad="false"
      :isMutipleSelection="false"
      :columnsMap="columnsMap"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      searchName="wareName"
      :loadFunction="getCourseCoursewarePage"
    >
      <!-- <template #iep-crud-advance-search>
        <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
      </template>-->
      <template #kind="{scope}">
        <div>{{getTextByKind(scope.row.kind)}}</div>
      </template>
    </iep-crud-table>
    <DialogForm ref="DialogForm" @load-page="loadDict()"></DialogForm>
    <CategoryDialog ref="CategoryDialog"></CategoryDialog>
  </div>
</template>
<script>
// import AdvanceSearch from "./AdvanceSearch";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm";
import {
  delCoursewareById,
  getCourseCoursewarePage,
  getCoursewareById,
  getTestDictPage,
} from "@/api/qms/course_courseware";
import CategoryDialog from "../Components/Category/Dialog";
import { filterNodeNilChildren, getTextByTreeNode } from "@/util/tree";
import { CourseCategory } from "../options";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
    // AdvanceSearch,
    CategoryDialog,
  },
  data() {
    return {
      commonOptions: [
        {
          name: "上传课件",
          func: this.handleAdd,
        },
        {
          name: "课件分类",
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
      ],
      columnsMap: [
        {
          prop: "wareName",
          label: "文件名",
        },
        {
          prop: "type",
          label: "类型",
          type: "dictGroup",
          dictName: "course_ware_type",
        },
        {
          prop: "wareSize",
          label: "大小",
        },
        {
          prop: "kind",
          label: "课件分类",
          type: "slot",
        },
        {
          prop: "createTime",
          label: "上传时间",
        },
        {
          prop: "createByName",
          label: "创建者",
        },
      ],
      dictOptions: [],
    };
  },
  created() {
    this.loadDict();
  },
  methods: {
    getCourseCoursewarePage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async loadDict() {
      const { data } = await getTestDictPage({
        category: CourseCategory.COURSEWARE,
      });
      // 给表格显示
      this.dictOptions = filterNodeNilChildren(data.children);
      this.loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    async handleDetail(row) {
      const { data } = await getCoursewareById(row.id);
      this.$refs["DialogForm"].show(data);
    },
    handleAdd() {
      this.$refs["DialogForm"].add();
    },
    async handleEdit(row) {
      const { data } = await getCoursewareById(row.id);
      this.$refs["DialogForm"].edit(data);
    },
    handleDel(row) {
      this._handleComfirm(row.id, delCoursewareById, "删除讲师");
    },
    handleCategory() {
      this.$refs["CategoryDialog"].open(CourseCategory.COURSEWARE);
    },
    getTextByKind(kind) {
      const kindArr = kind.split(",").map((i) => Number(i));
      const textArr = getTextByTreeNode(this.dictOptions, kindArr);
      return textArr.join("/");
    },
  },
};
</script>
