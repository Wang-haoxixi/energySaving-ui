<template>
  <div class="penging-wrapper">
    <iep-wrapper title="待处理内容">
      <el-table :data="pendingList" style="width: 100%">
        <el-table-column prop="tipOffReasonDetails" label="举报内容"></el-table-column>
        <el-table-column prop="realName" label="举报人" width="80"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="handleExamine(scope.row)" type="text">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </iep-wrapper>

    <!-- 审核的弹框 -->
    <iep-dialog :dialog-show="dialogShow" title="举报审核" width="800px" @close="_close()">
      <ExamineDialog
        ref="dialog"
        isDialog
        noFooter
        class="examine-dialog"
        @load_msg="loadMessage"
        @back_page="backPage"
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

export default {
  components: { ExamineDialog },
  mixins: [operationMixins],
  data() {
    return {
      pendingList: [],
      dialogShow: false,
      loading: false,
      dialogObj: {},
    };
  },
  methods: {
    handleExamine(row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs.dialog.loadData(row);
      });
    },
    getPage() {
      fetchPage({ handleStatus: 0 }).then(({ data }) => {
        this.pendingList = [...data.records];
      });
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
.penging-wrapper {
  border-radius: 10px;
  background-color: inherit;
}
.penging-wrapper ::v-deep .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button {
  margin-right: 8px !important;
}
.penging-wrapper ::v-deep .operation-container {
  display: none;
}
.penging-wrapper ::v-deep .el-table th.is-leaf {
  font-family: "微软雅黑";
  background-color: rgb(242, 244, 245);
  color: $--color-text-primary;
}
.penging-wrapper ::v-deep .el-table__body td {
  padding: 3px 0;
}
.penging-wrapper ::v-deep .el-table__body-wrapper {
  height: 170px;
  overflow: auto;
  overflow-x: hidden;
}
.penging-wrapper ::v-deep .el-table::before,
.penging-wrapper ::v-deep .el-table--group::after,
.penging-wrapper ::v-deep .el-table--border::after {
  display: none;
}
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
.penging-wrapper ::v-deep .el-table__body tr,
.penging-wrapper ::v-deep .el-table--enable-row-hover .el-table__body tr,
.penging-wrapper ::v-deep .el-table__body tr.hover-row,
.penging-wrapper ::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
  box-shadow: inherit;
  td {
    border: 0;
  }
}
</style>
