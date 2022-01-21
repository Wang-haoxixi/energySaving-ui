<template>
  <div class="table">
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      @row-click="handleDetail"
    >
      <template slot="before-columns">
        <el-table-column :label="`共${pagination.total}个任务`">
          <template slot-scope="scope">
            <div class="row-title">
              <div class="nowrap" :title="scope.row.title">{{scope.row.title}}</div>
              <i class="el-icon-woneng-qian1"></i>
            </div>
            <div class="row-desc nowrap">{{scope.row.description}}</div>
          </template>
        </el-table-column>
      </template>
      <template slot="urgency" slot-scope="scope">
        <div class="row-urgency">{{urgency[scope.scope.row.urgency]}}</div>
      </template>
      <template slot="finishTime" slot-scope="{scope}">
        <div
          class="row-finishTime"
          v-if="scope.row.type === '0'"
        >{{scope.row.finishTime|parseToTimeMinutes}}</div>
        <div class="row-finishTime" v-else>{{`已重复${scope.row.repeatTime}次`}}</div>
      </template>
      <template slot="creater" slot-scope="scope">
        <iep-img class="row-img" :src="scope.scope.row.avatar"></iep-img>
      </template>
    </iep-table>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { columnsMap, urgency } from "./options";
import { getSoTaskPage } from "@/api/qms/cooperation_list";
import { mapGetters } from "vuex";

export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      urgency,
      columnsMap,
      searchData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "dictGroup"]),
  },
  props: {
    paramForm: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    loadPage(param = this.paramForm) {
      this.pageState = "list";
      this.searchData = Object.assign({}, this.paramForm, param);
      this.loadTable(this.searchData, getSoTaskPage);
    },
    handleDetail(row) {
      this.$emit("handleDetail", row);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.table {
  .row-title,
  .row-desc {
    width: 100%;
  }
  .row-title {
    font-size: 14px;
    color: $--color-text-regular;
    display: flex;
    i {
      line-height: 27px;
      margin-left: 10px;
      color: $--color-primary;
    }
  }
  .row-desc {
    font-size: 12px;
    color: $--color-text-secondary;
  }
  .row-img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  &::v-deep .el-table__row {
    cursor: pointer;
  }
}
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
