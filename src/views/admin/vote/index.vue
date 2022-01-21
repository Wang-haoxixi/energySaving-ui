<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        rowId="id"
        :loadFunction="getVotePage"
      ></iep-crud-table>
    </iep-basic-container>
    <DialogForm ref="DialogForm"></DialogForm>
    <DialogSetting ref="DialogSetting"></DialogSetting>
    <DialogResult ref="DialogResult"></DialogResult>
  </div>
</template>
<script>
import DialogForm from "./DialogForm";
import DialogSetting from "./DialogSetting";
import DialogResult from "./DialogResult";
import { getVotePage } from "@/api/fms/vote";
export default {
  components: {
    DialogForm,
    DialogSetting,
    DialogResult,
  },
  data() {
    return {
      columnsMap: [
        {
          prop: "id",
          label: "ID",
          width: "80",
        },
        {
          prop: "totalValue",
          label: "本轮总值",
        },
        {
          prop: "bellValue",
          label: "本轮宝贝估值",
        },
        {
          prop: "createTime",
          label: "记录产生时间",
        },
        {
          prop: "endTime",
          label: "轮次结束时间",
        },
        {
          prop: "voteNumber",
          label: "投票人次",
          width: "100",
        },
        {
          prop: "abandonedVotes",
          label: "弃票人数",
          width: "100",
        },
      ],
      commonOptions: [
        {
          name: "投票配置",
          func: this.handleSetting,
          hidden: false,
          disabled: false,
        },
        {
          name: "投票设定",
          func: this.handleSetting1,
          hidden: false,
          disabled: false,
        },
      ],
      operationOptions: [
        {
          name: "查看",
          func: this.handleResult,
          hidden: false,
          disabled: false,
        },
      ],
    };
  },
  methods: {
    getVotePage,
    handleSetting() {
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleSetting1() {
      this.$refs["DialogSetting"].dialogShow = true;
    },
    handleResult(row) {
      this.$refs["DialogResult"].id = row.id;
      this.$refs["DialogResult"].dialogShow = true;
    },
  },
};
</script>
