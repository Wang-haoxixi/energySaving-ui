<template>
  <div class="report-manage">
    <iep-table
      :isLoadTable="tableLoading"
      :isPagination="false"
      :pagedTable="pendingList"
      :columnsMap="columnsMap"
    >
      <template
        slot="createTime"
        slot-scope="scope"
      >{{scope.scope.row.createTime|parseToTimeMinutes}}</template>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="handleExamine(scope.row)" type="text">审核</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <!-- 审核的弹框 -->
    <iep-dialog :dialog-show="dialogShow" title="举报审核" width="800px" @close="_close()">
      <ExamineDialog
        ref="dialog"
        isDialog
        class="examine-dialog"
        @load_msg="loadMessage"
        @back_page="backPage"
        noFooter
      ></ExamineDialog>
      <template slot="footer">
        <!-- 根据不同的类型需要显示不同的按钮文字 -->
        <template v-if="dialogObj.type >= 0">
          <el-button
            v-for="item of dialogObj.obj"
            :key="item.name"
            class="button"
            :loading="loading"
            type="primary"
            @click="handleDeal(item)"
          >{{item.name}}</el-button>
        </template>
        <!-- 关闭投诉并不是关闭弹窗，是接口请求关闭词条投诉 -->
        <el-button class="button" :loading="loading" @click="handleClose">关闭投诉</el-button>
        <iep-button @click="_close()">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { fetchPage } from "@/api/dms/tip_off_manage";
import ExamineDialog from "@/views/operate/report/examine/index";
import { columnsMapReport as columnsMap } from "../options";
export default {
  components: { ExamineDialog },
  mixins: [operationMixins],
  data() {
    return {
      pendingList: [],
      dialogShow: false,
      loading: false,
      dialogObj: {},
      columnsMap,
      tableLoading: false,
    };
  },
  methods: {
    handleExamine(row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs.dialog.loadData(row);
      });
    },
    async getPage() {
      this.tableLoading = true;
      const { data } = await fetchPage({ handleStatus: 0 });
      if (data) {
        this.pendingList = data.records;
      }
      this.tableLoading = false;
    },
    loadMessage(row) {
      this.dialogObj = { ...row };
    },
    handleDeal(row) {
      this.$refs.dialog.handleDeal(row);
    },
    handleClose() {
      this.$refs.dialog.handleClose();
    },
    backPage() {
      this.dialogShow = false;
    },
    _close() {
      this.getPage();
      this.dialogShow = false;
    },
  },
  created() {
    this.getPage();
  },
};
</script>
<style lang="scss" scoped>
.examine-dialog {
  padding: 0;
  border: 0;
  ::v-deep {
    .content {
      &:last-child {
        margin: 20px 8px 0 0;
      }
    }
    .content {
      .content {
        &:last-child {
          margin: 0;
          line-height: 24px;
        }
      }
    }
    .examine-container {
      border: 0;
      padding: 0;
    }
  }
}
::v-deep .wrap-dialog {
  overflow: inherit;
}
::v-deep .dialog-footer .el-button:nth-child(1) {
  color: #ffffff;
  background-color: $--color-primary;
  border-color: $--color-primary;
  // background-color: #f74437;
  // border-color: #f74437;
  &:hover,
  &:focus {
    color: $--color-primary;
    border-color: $--color-primary;
    // color: #f74437;
    // border-color: #f74437;
    background-color: $--custom-menu-background-color;
  }
}
</style>
