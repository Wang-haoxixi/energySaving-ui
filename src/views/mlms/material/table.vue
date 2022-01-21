<template>
  <iep-table
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :pagedTable="pagedTable"
    @pagination-size-change="handlePaginationSizeChange"
    @pagination-current-change="handlePaginationCurrentChange"
    isMutipleSelection
    @selection-change="selectionChange"
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
              <!-- <el-tag type="warning" size="mini">{{scope.row.realName}}</el-tag> -->
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
    <IepOperationTableBtnGroup
      v-if="mlmsType!=='mlms'"
      :options="operationOptions"
      label="操作"
      :width="140"
    ></IepOperationTableBtnGroup>
  </iep-table>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, dictsMap } from "./option";
import { fetchSoPage, deleteDataByIds } from "@/api/dms/material";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
import { createCollection } from "@/api/dms/collection";

export default {
  props: {
    mlmsType: {
      type: String,
    },
  },
  mixins: [mixins, operationMixins],
  components: {},
  data() {
    return {
      isRoute: true,
      columnsMap: tableOption,
      dictsMap,
      selectList: [],
      operationOptions: [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
        },
        {
          name: "收藏",
          func: this.handleCollect,
          hidden: false,
        },
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: row => {
            return !(
              row.userId === this.userInfo.userId || this.MATERIAL_SO_UPDATE
            );
          },
        },
        {
          name: "删除",
          func: this.handleDeleteById,
          hidden: row => {
            return !(
              row.userId === this.userInfo.userId || this.MATERIAL_SO_DELETE
            );
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    MATERIAL_SO_UPDATE: () => hasPermissions("material_so_update"),
    MATERIAL_SO_DELETE: () => hasPermissions("material_so_delete"),
  },
  methods: {
    searchData(row = this.searchForm) {
      this.searchForm = { ...row };
      this.searchPage();
    },
    loadData(row) {
      this.pagination.current = 1;
      this.queryForm = { ...row };
      this.searchData();
    },
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      this.loadTable(param, fetchSoPage);
    },
    handleUpdate(row) {
      this.$emit("mlms-update", row);
    },
    handleDeleteById(row) {
      this._handleComfirm([row.id], deleteDataByIds, "删除这条材料");
    },
    selectionChange(val) {
      this.selectList = val;
      this.$emit("val", val);
    },
    handleDetail(row) {
      this.$emit("handle-detail", row);
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
  created() {},
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
