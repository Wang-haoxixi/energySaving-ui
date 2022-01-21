<template>
  <iep-crud-table
    class="crud-table"
    ref="CrudTable"
    :columnsMap="columnsMap"
    rowId="id"
    :loadFunction="getVoteMyPage"
    :isMutipleSelection="false"
  ></iep-crud-table>
</template>
<script>
import { getVoteMyPage } from "@/api/fms/vote";
export default {
  data() {
    return {
      columnsMap: [
        {
          prop: "id",
          label: "ID",
          width: 85,
        },
        {
          prop: "rotation",
          label: "投票轮次",
        },
        {
          prop: "amount",
          label: "投票用户宝贝金额",
          width: 150,
        },
        {
          prop: "joinNumber",
          label: "本轮参与人数",
        },
        {
          prop: "cycle",
          label: "投票周期",
        },
        {
          prop: "createTime",
          label: "记录产生时间",
        },
        {
          prop: "endTime",
          label: "轮次结束时间",
        },
      ],
    };
  },
  methods: {
    getVoteMyPage,
  },
};
</script>
<style lang="scss" scoped>
</style>
