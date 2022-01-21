<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        searchName="name"
        :loadFunction="getRulePage"
      ></iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
import { RuleDTO, dictsMap } from "./options";
import DialogForm from "./DialogForm.vue";
import {
  getRulePage,
  postRule,
  putRule,
  getRuleById,
  delRuleById,
} from "@/api/fms/rule";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      dictsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
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
          prop: "ruleName",
          label: "规则名称",
        },
        {
          prop: "number",
          label: "规则编码",
        },
        {
          prop: "action",
          label: "动作",
          type: "dictGroup",
          dictName: "fms_block_chain_flow",
        },
        {
          prop: "type",
          label: "分类",
          type: "dictGroup",
          dictName: "fms_block_chain_rule",
        },
        {
          prop: "score",
          label: "宝贝值",
        },
        {
          prop: "payObject",
          label: "奖励对象类型",
          type: "dict",
          width: 110,
        },
        {
          prop: "isFirstReward",
          label: "是否首次奖励",
          type: "dict",
          width: 110,
        },
        {
          prop: "dailyLimit",
          label: "每日上限次数",
          width: 110,
        },
        {
          prop: "remarks",
          label: "描述",
        },
      ],
    };
  },
  methods: {
    getRulePage,
    handleDel(row) {
      this._handleComfirm(row.ruleId, delRuleById, "删除");
    },
    handleAdd() {
      this.$refs["DialogForm"].form = new RuleDTO();
      this.$refs["DialogForm"].methodName = "新增规则";
      this.$refs["DialogForm"].formRequestFn = postRule;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const { data } = await getRuleById(row.ruleId);
      this.$refs["DialogForm"].form = this.$mergeByFirst(new RuleDTO(), data);
      this.$refs["DialogForm"].methodName = "编辑规则";
      this.$refs["DialogForm"].formRequestFn = putRule;
      this.$refs["DialogForm"].dialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
