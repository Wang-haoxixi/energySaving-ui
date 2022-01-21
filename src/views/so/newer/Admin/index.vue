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
        :loadFunction="getSoTaskPage"
        :isMutipleSelection="false"
      ></iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getSoTaskPage, delSoTaskById } from "@/api/qms/so_task";
export default {
  mixins: [operationMixins],
  data() {
    return {
      columnsMap: [
        {
          label: "任务名称",
          prop: "name",
        },
        {
          label: "任务编码",
          prop: "code",
        },
        {
          label: "排序",
          prop: "sort",
        },
        {
          label: "任务属性",
          prop: "property",
          type: "dict",
        },
        {
          label: "上限次数",
          prop: "number",
        },
        {
          label: "宝贝值",
          prop: "rewardAmount",
        },
        {
          label: "描述",
          prop: "description",
        },
      ],
      dictsMap: {
        property: {
          0: "单次",
          1: "多次",
        },
      },
      commonOptions: [
        {
          name: "新增",
          func: this.handleAdd,
          disabled: true,
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
    };
  },
  methods: {
    getSoTaskPage,
    handleAdd() {
      this.$router.push({
        path: "/conm/so_newer/0",
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: `/conm/so_newer/${row.id}`,
      });
    },
    handleDel(row) {
      this._handleComfirm(row.id, delSoTaskById, "删除");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
