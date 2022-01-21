<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :pagedTable="pagedTable"
    @pagination-size-change="handlePaginationSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
  >
    <template slot="before-columns">
      <el-table-column label="材料名称" min-width="300px">
        <template slot-scope="scope">
          <div class="row-tpl" @click="handleDetail(scope.row)">
            <div class="custom-name">
              <div class="name">{{scope.row.materialName}}</div>
              <div class="icon">
                <i class="el-icon-woneng-banquan" v-if="scope.row.isCertified === 1"></i>
              </div>
            </div>
            <el-col class="custom-tags">
              <el-tag
                type="info"
                size="mini"
                v-for="(item, index) in scope.row.tag"
                :key="index"
              >{{item}}</el-tag>
            </el-col>
          </div>
        </template>
      </el-table-column>
    </template>
    <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="140"></IepOperationTableBtnGroup>
  </iep-table>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { collectTableOption, dictsMap } from "./option";
import { getSharePage, deleteShareById } from "@/api/dms/material";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
import { createCollection } from "@/api/dms/collection";

export default {
  mixins: [mixins, operationMixins],
  components: {},
  data() {
    return {
      isRoute: true,
      columnsMap: collectTableOption,
      dictsMap,
      selectList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    MATERIAL_SHARE_SO_CREATE: () => hasPermissions("material_share_so_create"),
    MATERIAL_SHARE_SO_DELETE: () => hasPermissions("material_share_so_delete"),
    operationOptions() {
      return [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
        },
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: row => {
            return (
              !this.MATERIAL_SHARE_SO_CREATE || row.isAllowSecondary !== "0"
            );
          },
        },
        {
          name: "移除",
          func: this.handleDelete,
          hidden: !this.MATERIAL_SHARE_SO_DELETE,
        },
      ];
    },
  },
  methods: {
    loadDataByLevel(id) {
      this.pagination.current = 1;
      this.searchForm.materialLevelId = id;
      this.loadPage();
    },
    searchData(row = this.searchForm) {
      this.searchForm = { ...row };
      this.searchPage();
    },
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      this.loadTable(param, getSharePage);
    },
    handleUpdate(row) {
      this.$emit("collect-update", row);
    },
    handleDelete(row) {
      this._handleComfirm({ id: row.id }, deleteShareById, "移除这条材料");
    },
    selectionChange(val) {
      this.selectList = val;
      this.$emit("val", val);
    },
    handleDetail(row) {
      this.$router.push(`/mlms/material/detail/${row.id}`);
    },
    // 收藏
    handleCollect(row) {
      createCollection({
        targetId: row.id,
        type: 0,
        name: row.materialName,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
  },
  created() {
    this.queryForm.isOpen = -1;
    this.searchData();
  },
};
</script>

<style lang="scss" scoped>
.row-tpl {
  width: 100%;
  cursor: pointer;
  .custom-name {
    width: 100%;
    display: flex;
    .name {
      margin-right: 8px;
      font-size: 14px;
    }
    i {
      font-size: 14px;
    }
  }
  .custom-tags {
    margin: 0;
    .el-tag {
      margin: 5px 5px 0 0;
      height: 26px;
      line-height: 26px;
    }
  }
}
</style>
