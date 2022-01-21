<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="投票配置"
    width="600px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :dictsMap="dictsMap"
      :isPagination="false"
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <DialogSettingForm ref="DialogSettingForm" @load-page="loadPage()"></DialogSettingForm>
  </iep-dialog>
</template>
<script>
import { getVoteSettingList, switchVoteSetting } from "@/api/fms/vote";
import DialogSettingForm from "./DialogSettingForm";
import { VoteSettingDTO } from "./options";
import { mapGetters } from "vuex";
export default {
  components: {
    DialogSettingForm,
  },
  data() {
    return {
      dialogShow: false,
      isLoadTable: false,
      pagedTable: [],
      dictsMap: {
        status: {
          0: "启用",
          1: "禁用",
        },
      },
      operationOptions: [
        {
          name: row => {
            return row.status == 1 ? "启用" : "禁用";
          },
          func: this.handleSwitch,
        },
        {
          name: "编辑",
          func: this.handleEdit,
        },
      ],
      columnsMap: [
        {
          prop: "typeName",
          label: "指标类型",
        },
        {
          prop: "minimumValue",
          label: "最低值",
        },
        {
          prop: "maximumValue",
          label: "最高值",
        },
        {
          prop: "status",
          label: "指标状态",
          type: "dict",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    async handleSwitch(row) {
      const { data } = await switchVoteSetting(row.id, 1 - +row.status + "");
      if (data) {
        this.loadPage();
      }
    },
    handleEdit(row) {
      this.$refs["DialogSettingForm"].form = this.$mergeByFirst(
        new VoteSettingDTO(),
        row,
      );
      this.$refs["DialogSettingForm"].dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
    },
    async loadPage() {
      const { data } = await getVoteSettingList();
      this.pagedTable = data;
    },
  },
};
</script>
