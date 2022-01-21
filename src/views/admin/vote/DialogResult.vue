<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="投票结果"
    width="500px"
    @close="_close()"
    @mounted="load()"
  >
    <iep-table
      :size="tableSize"
      :isLoadTable="false"
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
    ></iep-table>
  </iep-dialog>
</template>
<script>
import { getVoteResultById } from "@/api/fms/vote";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: 0,
      dialogShow: false,
      pagedTable: [],
      columnsMap: [
        {
          prop: "rotation",
          label: "投票轮次",
        },
        {
          prop: "userId",
          label: "用户ID",
        },
        {
          prop: "realName",
          label: "真实姓名",
        },
        {
          prop: "isPrize",
          label: "中奖等级",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.pagedTable = [];
      this._close();
      this.$emit("load-page");
    },
    async load() {
      const { data } = await getVoteResultById(this.id);
      this.pagedTable = data;
    },
  },
};
</script>
