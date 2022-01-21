<template>
  <div>
    <div v-show="pageState=='list'">
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        searchName="content"
        :loadFunction="getTableData"
        :useRoutePage="false"
      >
        <template #status="{scope}">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :active-value="2"
            inactive-color="#ddd"
            :inactive-value="1"
            @change="handleTop(scope.row)"
          ></el-switch>
        </template>
      </iep-crud-table>
    </div>
    <FormDialog ref="form" @load-page="loadPage"></FormDialog>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, dictsMap } from "./option";
import {
  getTableData,
  deleteData,
  handleTopUp,
  // handleHide,
} from "@/api/dms/commontopic";
import { mapGetters } from "vuex";
import FormDialog from "./form";

export default {
  components: { FormDialog },
  mixins: [mixins, operationMixins],
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
  },
  data() {
    return {
      pageState: "list",
      dictsMap,
      columnsMap: tableOption,
      selectList: [],
      firstClass: [],
      getTableDataFn: getTableData,
      operationOptions: [
        {
          name: "查看",
          func: this.handleDetail,
        },
        {
          name: "编辑",
          func: this.handleUpdate,
        },
        {
          name: "删除",
          func: this.handleDeleteById,
          disabled: row => {
            return row.status === "0";
          },
        },
      ],
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleCreate,
        },
      ],
    };
  },
  // created() {
  //   this.loadPage();
  // },
  methods: {
    getTableData,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    // 详情
    handleDetail(row) {
      this.$emit("handleDetail", row, "subject");
    },
    // 修改
    handleUpdate(row) {
      this.$refs.form.open(row, "update");
    },
    // 置顶
    handleTop(row) {
      // 使用开关的时候会改变status，切记这里获取到的数据是改完的数据
      handleTopUp({ id: row.topicId, type: row.status }).then(() => {
        this.loadPage();
      });
    },
    // 删除
    handleDeleteById(row) {
      this._handleComfirm(row.topicId, deleteData, "删除");
    },
    // 新增
    handleCreate() {
      this.$refs.form.open();
    },
    // 清空搜索
    clearSearchParam() {},
  },
};
</script>
