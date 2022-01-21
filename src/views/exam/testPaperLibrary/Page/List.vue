<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name">
        <span slot="left" class="title-desc">
          丰富题型、快速组卷、多端答题、智能批卷，轻松实现多场景考试。
          <el-button type="text" @click="useGuide">使用指南</el-button>
        </span>
      </iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :isMutipleSelection="false"
        searchName="title"
        rowId="id"
        :loadFunction="getExamtestpaperPage"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <iep-operation-wrapper>
            <el-button type="primary" icon="el-icon-plus" @click="handleFormAdd">新增</el-button>
            <el-button style="margin-left:0;" @click="handleType">试卷分类</el-button>
          </iep-operation-wrapper>
        </template>
        <template #kind="{scope}">
          <div>{{dealKindDict(scope.row.kind)}}</div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialogType
      ref="dialogType"
      @save="handleActive"
      :checkTreeMenu="propTreeMenu"
      :dialogTitle="`试卷分类`"
    ></dialogType>
    <dialogForm
      ref="dialogForm"
      @handleAdd="handleAdd"
      @handleAddRandom="handleAddRandom"
      :dialogTitle="dialogTitle"
    ></dialogForm>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import dialogType from "../../testQuestionsLibrary/Page/dialogType";
import dialogForm from "./dialogForm";
import { dictsMap, columnsMap } from "../../const/pageOptions";
import {
  getExamtestpaperPage,
  getTestDictPage,
  deleteExamtestpaperPage,
} from "@/api/qms/test_questions_library";
import mixins from "@/mixins/mixins";
import selfMixins from "../../const/selfMixin";
import operationMixins from "@/mixins/operationMixins";
export default {
  data() {
    return {
      dictsMap,
      columnsMap,
      dialogTitle: "创建试卷",
      propTreeMenu: {},
      res: {},
      type: 2,
      cn: [],
    };
  },
  components: {
    AdvanceSearch,
    dialogType,
    dialogForm,
  },
  mixins: [mixins, selfMixins, operationMixins],
  props: ["record"],
  computed: {
    operationOptions() {
      return [
        {
          name: "查看",
          func: this.handleView,
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
          name: "删除",
          func: this.handleDelete,
          hidden: false,
          disabled: false,
        },
      ];
    },
  },
  created() {
    this.loadTestDict();
  },
  methods: {
    useGuide() {
      this.$emit("onGuide");
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    getExamtestpaperPage,
    async loadTestDict() {
      const type = 2;
      const params = {};
      params.category = type;
      const { data } = await getTestDictPage(params);
      this.res = data;
      this.type = type;
      if (!this.cn.length) {
        this.cn = this.saveFlatten(this.cn, this.res.children);
      }
      this.$refs["dialogType"].data = this.res.children;
    },
    dealKindDict(row) {
      const selectArray = row.split(",").map((i) => Number(i));
      const selectCn = this.dealCn(this.cn, selectArray);
      return selectCn;
    },
    handleAdd(formData) {
      this.$emit("onEdit", {
        methodName: "创建新",
        id: "",
        edit: false,
        random: false,
        ...formData,
      });
    },
    handleAddRandom(formData) {
      this.$emit("onEdit", {
        methodName: "创建新",
        id: "",
        edit: false,
        random: true,
        ...formData,
      });
    },
    handleEdit(row) {
      this.$emit("onEdit", {
        methodName: "编辑",
        id: row.id,
        name: row.title,
        edit: false,
        random: row.generateType === "2",
      });
    },
    handleView(row) {
      this.$emit("onView", {
        methodName: "查看",
        id: row.id,
        name: row.title,
        edit: false,
        random: row.generateType === "2",
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteExamtestpaperPage(row.id);
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
    handleType() {
      this.loadTestDict();
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].type = this.type;
      this.$refs["dialogType"].data = this.res.children;
      this.$refs["dialogType"].dictId = this.res.id;
      this.$refs["dialogType"].category = this.type;
      this.$refs["dialogType"].isSure = false;
      this.$refs["dialogType"].parnId = this.res.id;
      // this.$refs["dialogType"].defalutArray = [this.res.children[0].id];
      if (this.propTreeMenu.selectCn) {
        this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
      }
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
      });
    },
    handleFormAdd() {
      this.$refs["dialogForm"].open();
      this.$refs["dialogForm"].propTreeMenu = this.propTreeMenu;
      this.$refs["dialogForm"].loadTreeMenu();
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
