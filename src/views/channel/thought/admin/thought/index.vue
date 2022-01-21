<template>
  <div class="thought-box">
    <div v-show="pageState=='list'">
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        searchName="content"
        :loadFunction="getManagePage"
        :useRoutePage="false"
      >
        <template #isTop="{scope}">
          <el-switch
            v-model="scope.row.isTop"
            active-color="#13ce66"
            active-value="2"
            inactive-color="#ddd"
            inactive-value="1"
            @change="handleTop(scope.row)"
          ></el-switch>
        </template>
      </iep-crud-table>
    </div>
    <open-select ref="optenSelect" @opten-select="optenSelct"></open-select>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, dictsMap } from "./option";
import {
  getManagePage,
  thoughtsDelete,
  topUpThoughts,
  postStatusBatch,
  lowerShelfById,
} from "@/api/dms/thoughts";
import { mapGetters } from "vuex";
import OpenSelect from "./OpenSelect";

export default {
  mixins: [mixins, operationMixins],
  components: { OpenSelect },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
  },
  data() {
    return {
      pageState: "list",
      dictsMap,
      columnsMap: tableOption,
      firstClass: [],
      searchForm: {
        content: "",
      },
      status: "",
      ids: "",
      openStatus: ["生态开放", "关闭", "对组织开放", "对联盟开放"],
      operationOptions: [
        {
          name: "查看",
          func: this.handleDetail,
        },
        {
          name: "下架",
          func: this.handleShelf,
          disabled: row => {
            return row.isOpen === "2";
          },
        },
      ],
    };
  },
  methods: {
    getManagePage,
    searchPage() {},
    // loadPage(param = this.searchForm, state) {
    //   if (!state) {
    //     this.pageState = "list";
    //   }
    //   this.loadTable(
    //     Object.assign({}, param, this.searchForm),
    //     this.getTableDataFn,
    //   );
    // },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    // 详情
    handleDetail(row) {
      this.$emit("handleDetail", row, "thought");
    },
    // 置顶
    handleTop(row) {
      // 使用开关的时候会改变status，切记这里获取到的数据是改完的数据
      topUpThoughts({
        id: row.thoughtsId,
        type: row.isTop,
      }).then(() => {
        this.loadPage();
      });
    },
    // 删除
    handleDeleteById(row) {
      this._handleComfirm([row.thoughtsId], thoughtsDelete, "删除");
    },
    // 清空搜索
    clearSearchParam() {},
    // 更改公开状态
    handleOpen(row) {
      if (row.isTop === 2) {
        this.$message.error("请先取消置顶状态！");
        return;
      }
      this.$refs["optenSelect"].dialogShow = true;
      this.$refs["optenSelect"].form.isOpen = row.status;
      this.ids = [row.thoughtsId];
    },
    // 下架说说
    handleShelf(row) {
      this.$confirm("是否确认下架这条说说？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          lowerShelfById(row.thoughtsId).then(({ data }) => {
            if (data) {
              this.$message.success("下架说说成功！");
              this.loadPage();
            }
          });
        })
        .catch(() => {});
    },
    optenSelct(status) {
      this.status = status;
      postStatusBatch({
        status: this.status,
        ids: this.ids,
      }).then(() => {
        this.loadPage();
        this.$message.success("更改成功");
        this.status = "";
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.thought-box ::v-deep {
  .operation-container {
    position: absolute;
    top: -56px;
    right: 0;
  }
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>
