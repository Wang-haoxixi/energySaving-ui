<template>
  <div class="material">
    <div v-show="pageState === 'list'">
      <iep-operation-container>
        <template slot="left">
          <!-- <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button> -->
          <el-checkbox v-model="lookByPay">我的付费下载</el-checkbox>
        </template>
        <template slot="right">
          <SearchForm @searchPage="searchPage"></SearchForm>
        </template>
      </iep-operation-container>
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
          <el-table-column label="标题" min-width="300px">
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
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage"></form-tpl>
    <detail-tpl ref="detail" v-if="pageState === 'detail'" @load-page="backPage" cType="1"></detail-tpl>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, dictsMap } from "./option";
import { fetchPage, deleteDataByIds, getPayPage } from "@/api/dms/material";
import FormTpl from "./form";
import DetailTpl from "@/views/mlms/material/detail";
import SearchForm from "./searchForm";
import { createCollection } from "@/api/dms/collection";

export default {
  mixins: [mixins, operationMixins],
  components: { FormTpl, DetailTpl, SearchForm },
  data() {
    return {
      columnsMap: tableOption,
      dictsMap,
      pageState: "list",
      lookByPay: false,
      isRoute: true,
    };
  },
  computed: {
    fetchPage() {
      return this.lookByPay ? getPayPage : fetchPage;
    },
    operationOptions() {
      // const 收藏 = [
      //   {
      //     name: "收藏",
      //     func: this.handleCollect,
      //   },
      // ];
      if (this.lookByPay) {
        return [
          {
            name: "详情",
            func: this.handleDetail,
          },
          // ...收藏,
        ];
      } else {
        return [
          // ...收藏,
          {
            name: "修改",
            func: this.handleUpdate,
          },
          {
            name: "删除",
            func: this.handleDeleteById,
          },
        ];
      }
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    loadPage(param = this.searchForm) {
      this.loadTable(param, this.fetchPage);
    },
    handleCreate() {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("create");
      });
    },
    handleUpdate(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("update", row);
      });
    },
    handleDeleteById(row) {
      this._handleComfirm([row.id], deleteDataByIds, "删除这条专栏");
    },
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detail"].open(row.id);
      });
    },
    // 收藏
    handleCollect(row) {
      createCollection({
        targetId: row.id,
        type: 1,
        name: row.materialName,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
  },
  watch: {
    lookByPay() {
      this.pageOption.current = 1;
      this.loadPage();
    },
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
