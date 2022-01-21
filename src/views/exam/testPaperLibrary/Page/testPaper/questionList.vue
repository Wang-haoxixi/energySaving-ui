<template>
  <div class="question">
    <iep-basic-container>
      <div class="asy-box">
        <span class="asy">当前表格已选择 {{val}} 项</span>
        <!-- <span class="clear" @click="toggleSelection()">清空</span> -->
      </div>
      <iep-operation-container>
        <template slot="left">
          <span style="width: 230px;text-align: right;">
            当前题型：
            <iep-dict-select
              v-model="formOption.type"
              clearable
              :disabled="btnDisabled"
              placeholder="请选择题型"
              @change="levelChange"
              dict-name="exam_question_type"
            ></iep-dict-select>
          </span>
          <span style="width: 230px;text-align: right;">
            分类：
            <el-input
              @focus="handleFocus"
              v-model="form.qType"
              clearable
              @clear="clear"
              v-if="show"
            ></el-input>
          </span>
          <span style="width: 230px;text-align: right;">
            难度选择：
            <iep-dict-select
              v-model="formOption.level"
              placeholder="请选择难度"
              clearable
              @change="levelChange"
              dict-name="exam_difficulty"
            ></iep-dict-select>
          </span>
        </template>
        <template slot="right">
          <iep-operation-search placeholder="请输入关键词" prop="title" @search-page="searchPage"></iep-operation-search>
        </template>
      </iep-operation-container>
      <iep-table
        ref="CrudTable"
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :isMutipleSelection="true"
        :row-key="row=>row.id"
        @num="saveNum"
        @selection-change="handleSelectionChange"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <!-- <template #iep-crud-left>
          <iep-operation-wrapper>
            <span>当前题型：{{showType()}}</span>
          </iep-operation-wrapper>
        </template>-->
        <template #kind="{scope}">
          <div>{{dealKindDict(scope.row.kind)}}</div>
        </template>
        <template #title="{scope}">
          <div v-if="scope.row.title">{{scope.row.title}}</div>
          <div v-else style="height:60px;">
            <img :src="scope.row.titleUrl" alt style="height:100%" />
          </div>
        </template>
        <!-- <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>-->
      </iep-table>
    </iep-basic-container>
    <dialogType ref="dialogType" @save="handleActive" :checkTreeMenu="propTreeMenu"></dialogType>
  </div>
</template>
<script>
import dialogType from "../../../testQuestionsLibrary/Page/dialogType";
import { dictsMap, columnsMap } from "../../../const/options.ts";
import {
  getExamquestionPage,
  getTestDictPage,
} from "@/api/qms/test_questions_library";
import { mapGetters } from "vuex";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import selfMixins from "../../../const/selfMixin";
export default {
  data() {
    return {
      show: true,
      dictsMap,
      columnsMap,
      val: 0,
      multipleSelection: [],
      res: {},
      cn: [],
      propTreeMenu: {},
      form: {},
      searchForm: {
        level: "",
      },
    };
  },
  props: ["formOption", "btnDisabled", "selectOption"],
  mixins: [mixins, selfMixins, operationMixins],
  computed: {
    ...mapGetters(["tableSize"]),
    operationOptions() {
      return [];
    },
  },
  components: {
    dialogType,
  },
  created() {
    this.loadTestDict();
    this.loadPage();
  },
  methods: {
    async loadPage(params = { ...this.queryForm, ...this.searchForm }) {
      params.type = params.type || this.formOption.type;
      params.kind = params.kind || this.formOption.qType;
      params.level = params.level || this.formOption.level;
      params.ids = [];
      this.selectOption.forEach((element) => {
        params.ids.push(element.id);
      });
      await this.loadTable(Object.assign({}, params), getExamquestionPage);
      // if (valid) {
      //   this.loadSelectOption(valid);
      // }
    },
    async loadTestDict() {
      const type = 1;
      const params = {};
      params.category = type;
      const { data } = await getTestDictPage(params);
      this.res = data;
      this.cn = this.saveFlatten(this.cn, this.res.children);
    },
    saveNum(length) {
      this.$nextTick(() => {
        this.val = length;
      });
    },
    loadSelectOption(data) {
      if (this.selectOption.length) {
        this.$nextTick(() => {
          this.$refs["CrudTable"].toggleRowSelection(
            this.selectOption,
            data.records,
          );
          this.val = this.selectOption.length;
        });
      }
    },
    dealKindDict(row) {
      const selectArray = row.split(",").map((i) => Number(i));
      //  this.saveFlatten(cn, this.res.children);
      const selectCn = this.dealCn(this.cn, selectArray);
      return selectCn;
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleType() {
      this.$refs["dialogType"].dialogShow = true;
    },
    toggleSelection() {
      this.multipleSelection = [];
      this.val = 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val.length;
    },
    save() {
      this.$emit("save", this.multipleSelection);
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 1;
      const params = {};
      params.category = type;
      getTestDictPage(params).then((res) => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        this.$refs["dialogType"].defalutArray = [res.data.children[0].id];
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.formOption.qType = val.selectString;
        this.form.qType = val.selectCn;
        this.loadPage();
      });
    },
    levelChange() {
      this.loadPage();
    },
    clear() {
      this.show = false;
      this.$set(this.formOption, "qType", "");
      this.$set(this.form, "qType", "");
      this.show = true;
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" soped>
.asy-box {
  margin-bottom: 15px;
  font-size: 14px;
  color: $--color-primary;
  padding: 10px;
  border: 1px solid rgba(250, 236, 234);
  background-color: rgba(250, 236, 234, 0.3);
  border-radius: 5px;
}
.asy {
  margin-right: 8px;
}
.clear {
  cursor: pointer;
}
.question {
  .el-input__inner {
    width: 150px !important;
    padding-left: 0 !important;
  }
  .el-input {
    width: 150px !important;
  }
}
</style>
