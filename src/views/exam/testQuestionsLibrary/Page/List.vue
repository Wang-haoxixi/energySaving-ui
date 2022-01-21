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
        rowId="id"
        searchName="title"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :isMutipleSelection="true"
        :commonOptions="commonOptions"
        :loadFunction="getExamquestionPage"
        :operationOptions="operationOptions"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #kind="{scope}">
          <div>{{dealKindDict(scope.row.kind)}}</div>
        </template>
        <template #title="{scope}">
          <div
            v-if="scope.row.title"
            style="	overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >{{scope.row.title}}</div>
          <div v-else style="height:60px;">
            <img :src="scope.row.titleUrl" alt style="height:100%" />
          </div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialogType ref="dialogType" @save="handleActive" :checkTreeMenu="propTreeMenu"></dialogType>
    <DialogBatchUpdate ref="DialogBatchUpdate" @load-page="loadPage()"></DialogBatchUpdate>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import DialogBatchUpdate from "./DialogBatchUpdate";
import dialogType from "./dialogType";
import { dictsMap, columnsMap } from "../../const/options";
import {
  getExamquestionPage,
  deleteExamquestion,
  getTestDictPage,
  deleteQuestionBatchByIds,
} from "@/api/qms/test_questions_library";
import selfMixins from "../../const/selfMixin";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [selfMixins, operationMixins],
  props: ["record"],
  components: {
    DialogBatchUpdate,
    dialogType,
    AdvanceSearch,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      propTreeMenu: {},
      res: {},
      type: 1,
      cn: [],
      commonOptions: [
        {
          name: "新增",
          func: this.handleAdd,
          icon: "el-icon-plus",
        },
        {
          name: "批量更新",
          func: this.handleUpdateBatch,
          batchOperation: true,
        },
        {
          name: "批量删除",
          func: this.handleDelBatch,
          batchOperation: true,
        },
        {
          name: "试题分类",
          func: this.handleType,
        },
      ],
    };
  },
  computed: {
    operationOptions() {
      return [
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
    handleUpdateBatch() {
      const ids = this.$refs["CrudTable"].multipleSelection;
      this.$refs["DialogBatchUpdate"].open(ids);
    },
    handleDelBatch() {
      const ids = this.$refs["CrudTable"].multipleSelection;
      this._handleComfirm(ids, deleteQuestionBatchByIds, "批量删除");
    },
    useGuide() {
      this.$emit("onGuide");
    },
    getExamquestionPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    async loadTestDict() {
      const type = 1;
      const params = {};
      params.category = type;
      const { data } = await getTestDictPage(params);
      this.res = data;
      this.type = type;
      if (!this.cn.length) {
        console.log(this.cn, this.res.children);
        this.cn = this.saveFlatten(this.cn, this.res.children);
      }
      this.$refs["dialogType"].data = this.res.children;
    },
    dealKindDict(row) {
      const selectArray = row.split(",").map((i) => Number(i));
      // console.log(selectArray, this.cn);
      const selectCn = this.dealCn(this.cn, selectArray);
      return selectCn;
    },
    handleAdd() {
      this.$emit("onEdit", {
        methodName: "新增",
        id: "",
        edit: false,
        propTreeMenu: this.propTreeMenu,
      });
    },
    handleEdit(row) {
      this.$emit("onEdit", {
        methodName: "编辑",
        name: row.title,
        id: row.id,
        edit: false,
        propTreeMenu: this.propTreeMenu,
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteExamquestion(row.id);
          if (data) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
          this.loadPage();
        })
        .catch(() => {});
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleType() {
      this.loadTestDict();
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].type = this.type;
      this.$refs["dialogType"].data = this.res.children;
      this.$refs["dialogType"].dictId = this.res.id;
      this.$refs["dialogType"].parnId = this.res.id;
      this.$refs["dialogType"].category = this.type;
      this.$refs["dialogType"].isSure = false;
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
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
</style>
