<template>
  <iep-basic-container>
    <iep-page-header title="生态精选"></iep-page-header>
    <iep-operation-container class="operation-container">
      <template slot="left">
        <iep-button plain @click="handleCollect" class="button">收藏</iep-button>
        <div class="tip-content">
          <div class="tip-block">
            <div>以下材料如果不是你要找的，请前往</div>
            <p @click="$openPage('/channel/material')">材料频道页</p>
            <div>查找或点击</div>
            <p @click="handleSearch">搜索</p>
            <div>收藏更多的材料</div>
          </div>
        </div>
        <el-button plain @click="$router.go(-1)" class="button iep-back-btn">返回</el-button>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      isMutipleSelection
      @selection-change="selectionChange"
      :isPagination="false"
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
      <template slot="downloadCost" slot-scope="{scope}">
        <div>{{scope.row.downloadCost > 0 ? `${scope.row.downloadCost}宝贝` : '免费'}}</div>
      </template>
    </iep-table>
    <payDialog ref="pay" @suceess_pay="suceessPay"></payDialog>
    <!-- 生态搜索 -->
    <SearchDialog ref="ecologicalSearch"></SearchDialog>
  </iep-basic-container>
</template>

<script>
import mixins from "@/mixins/mixins";
import { getSelectedPage, freePayment } from "@/api/dms/material";
import payDialog from "../payDialog";
import SearchDialog from "../search/index";
export default {
  mixins: [mixins],
  components: { payDialog, SearchDialog },
  data() {
    return {
      columnsMap: [
        {
          label: "材料名称",
          prop: "materialName",
        },
        {
          label: "上传者",
          prop: "realName",
          width: "180",
        },
        {
          label: "价格",
          prop: "downloadCost",
          type: "slot",
          width: "180",
        },
      ],
      list: [],
    };
  },
  methods: {
    loadPage() {
      this.isLoadTable = true;
      getSelectedPage().then(({ data }) => {
        this.pagedTable = [...data];
        this.isLoadTable = false;
      });
    },
    selectionChange(val) {
      this.list = [...val];
    },
    handleCollect() {
      if (this.list.length === 0) {
        this.$message.warning("请先选择材料！");
        return;
      }
      let cost = 0;
      for (const item of this.list) {
        cost += item.downloadCost;
      }
      if (cost > 0) {
        let ids = this.list.map((m) => m.id);
        ids = ids.join(",");
        this.$refs.pay.open({
          id: ids,
          downloadCost: cost,
          payTitle: "购买专栏",
          isSo: true,
        });
      } else {
        const ids = this.list.map((m) => m.id);
        freePayment({ idsList: ids }).then(({ data }) => {
          if (data) {
            this.$message.success("收藏成功！");
            this.loadPage();
          }
        });
      }
    },
    suceessPay() {
      this.loadPage();
    },
    handleDetail(row) {
      this.$router.push(`/mlms/material/detail/${row.id}`);
    },
    handleSearch() {
      this.$refs.ecologicalSearch.open();
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.operation-container {
  &::v-deep > div {
    &:first-of-type {
      width: 100%;
    }
    &:last-of-type {
      width: 0;
    }
  }
}
.tip-content {
  .tip-block {
    display: flex;
    font-size: 12px;
    line-height: 28px;
    width: 620px;
    justify-content: center;
    margin: auto;
    background-color: #fdf7ec;
    p {
      margin: 0 10px;
      color: $--color-secondary;
      cursor: pointer;
      line-height: 28px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
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
