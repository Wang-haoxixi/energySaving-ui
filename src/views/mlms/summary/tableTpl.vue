<template>
  <div class="table">
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      @selection-change="handleSelectionChange"
      is-mutiple-selection
    >
      <template slot="before-columns">
        <el-table-column label="会议标题">
          <template slot-scope="scope">
            <div class="row-tpl" @click="handleDetail(scope.row)">
              <div class="custom-name">{{scope.row.title}}</div>
              <el-col class="custom-tags">
                <el-tag
                  type="info"
                  size="mini"
                  v-for="(item, index) in scope.row.tagKeyWords"
                  :key="index"
                  @click="handleTagDetail(item)"
                >{{item}}</el-tag>
              </el-col>
            </div>
          </template>
        </el-table-column>
      </template>

      <iep-operation-table-btn-group
        :width="140"
        v-if="tabName === 'personal'"
        :options="personalOperationOptions"
      ></iep-operation-table-btn-group>

      <iep-operation-table-btn-group v-if="tabName === 'manage'" :options="manageOperationOptions"></iep-operation-table-btn-group>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { columnsMap } from "./options";
import {
  copyData,
  meetingSend,
  deleteData,
  deleteDataByAdmin,
  fetchPersonalPage,
  fetchInvolvedPage,
  fetchReceivedPage,
  fetchAdminPage,
} from "@/api/dms/meeting_summary";
import { mapGetters } from "vuex";
import operationMixins from "@/mixins/operationMixins";
import { hasPermissions } from "@/util/menu";
import { createCollection } from "@/api/dms/collection";

export default {
  mixins: [mixins, operationMixins],
  components: {},
  data() {
    return {
      columnsMap,
      personalOperationOptions: [
        {
          name: "修改草稿",
          func: this.handleUpdate,
          hidden: row => {
            return !(this.meeting_summary_update && row.status === 1);
          },
        },
        {
          name: "修改",
          func: this.handleUpdate,
          hidden: row => {
            return !(this.meeting_summary_update && row.status !== 1);
          },
        },
        {
          name: "收藏",
          func: this.handleCollect,
          hidden: row => {
            return !(row.status !== 1);
          },
        },
        {
          name: "删除",
          func: this.handleDeleteById,
          hidden: () => {
            return !this.meeting_summary_delete;
          },
        },
        {
          name: "复制",
          func: this.handleCopy,
          hidden: () => {
            return !this.meeting_summary_copy;
          },
        },
      ],
      manageOperationOptions: [
        {
          name: "修改",
          func: this.handleUpdate,
        },

        {
          name: "收藏",
          func: this.handleCollect,
        },
        {
          name: "删除",
          func: this.handleDeleteById,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "dictGroup"]),
    getTableData() {
      const fnList = {
        personal: fetchPersonalPage, // 我发布的
        involved: fetchInvolvedPage, // 我参与的
        received: fetchReceivedPage, // 我收到的
        manage: fetchAdminPage,
      };
      return fnList[this.tabName];
    },
    meeting_summary_update: () => hasPermissions("meeting_summary_update"),
    meeting_summary_copy: () => hasPermissions("meeting_summary_copy"),
    meeting_summary_send: () => hasPermissions("meeting_summary_send"),
    meeting_summary_delete: () => hasPermissions("meeting_summary_delete"),
  },
  props: {
    tabName: {
      type: String,
      default: "personal",
    },
    paramForm: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    loadPage(param = this.paramForm) {
      this.pageState = "list";
      param = Object.assign(param, this.paramForm, {
        nowOrgId: this.userInfo.orgId,
      });
      this.loadTable(param, this.getTableData);
    },
    handleUpdate(row) {
      // this.$router.push(`/mlms_spa/summary/update/${row.id}`);
      this.$emit("handleUpdate", row);
    },
    handleDetail(row) {
      this.$emit("handleDetail", row);
    },
    // id删除
    handleDeleteById(row) {
      // this._handleGlobalDeleteById(row.id, deleteData);
      this._handleComfirm(
        [row.id],
        this.tabName === "manage" ? deleteDataByAdmin : deleteData,
        "删除这条纪要",
      );
    },
    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    },
    // 收藏
    handleCollection(row) {
      this.$emit("handleCollection", row);
    },
    // 分享
    handleShare(row) {
      this.$emit("handleShare", row);
    },
    // 下载为图片
    handleDownload() {
      this.$message.error("抱歉，此功能尚未开发！");
    },
    // 复制
    handleCopy(row) {
      copyData(row.id).then(({ data }) => {
        if (data) {
          this.$message.success("复制成功！");
        }
        this.loadPage();
      });
    },
    // 发送
    handleSent(row) {
      meetingSend(row.id).then(({ data }) => {
        this.$message.success(data.msg);
        if (data.data) {
          this.loadPage();
        }
      });
    },
    // 导出为文本
    handleExport() {
      this.$message.error("抱歉，此功能尚未开发！");
    },
    handleTagDetail(val) {
      this.$openTagDetail(val);
    },
    // 收藏
    handleCollect(row) {
      createCollection({
        targetId: row.id,
        type: 4,
        name: row.title,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  cursor: pointer;
}
.row-tpl {
  width: 100%;
  cursor: pointer;
  .custom-name {
    width: 100%;
  }
  .custom-tags {
    margin-top: 10px;
    .el-tag {
      margin: 0 5px 5px 0;
      height: 26px;
      line-height: 26px;
    }
  }
}
.el-button {
  margin-right: 10px;
}
</style>
