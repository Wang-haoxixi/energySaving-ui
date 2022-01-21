
<template>
  <div :class="dialogShow?'dispaly-show':'dispaly-none'">
    <iep-basic-container>
      <iep-page-header :title="`详情`" :backOption="backOption"></iep-page-header>
      <central-word class="words-info" :information="information"></central-word>
      <iep-operation-container>
        <template slot="right">
          <iep-operation-search placeholder="请输入关键词" @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </iep-operation-search>
        </template>
      </iep-operation-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :pagination="pagination"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <template slot="before-columns">
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="标签名称">
            <template slot-scope="scope">{{scope.row.tagName}}</template>
          </el-table-column>
          <el-table-column label="属性">
            <template slot-scope="scope">{{scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="归入标签">
            <template slot-scope="scope">
              <div>{{scope.row.fallName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="合并标签">
            <template slot-scope="scope">
              <div>{{scope.row.mergeName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="190">
            <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
        </template>
      </iep-table>
    </iep-basic-container>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getSortById, getSortPageByTagId } from "@/api/tms/management";
import CentralWord from "./CentralWord";
import AdvanceSearch from "./AdvanceSearch";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  components: { CentralWord, AdvanceSearch },
  data() {
    return {
      columnsMap: [],
      backOption: {
        isBack: true,
        backPath: "",
        backFunction: () => {
          this.close();
        },
      },
      information: {},
      id: "",
      dialogShow: false,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
    loadPage(param = this.searchForm) {
      this.loadTable({ ...param }, getSortPageByTagId(this.id));
      getSortById(this.id).then(data => {
        this.information = data.data;
      });
    },
  },
};
</script>
<style scoped>
.dispaly-none {
  display: none;
}
.dispaly-show {
  width: 100%;
  height: 100%;
  padding-right: 40px;
  z-index: 99;
  position: fixed;
  top: 0;
  background: #fff;
}
.words-info {
  font-size: 14px;
}
.words-info ::v-deep .title {
  margin-bottom: 20px;
}
</style>

