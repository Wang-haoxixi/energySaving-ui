<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`专题${methodName}`"
    width="900px"
    @close="dialogShow = false"
  >
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      @selection-change="selectionChange"
      is-mutiple-selection
    >
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="200px">
          <template slot-scope="scope">
            <div>{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">
            {{
            scope.row.updateTime | parseToDay
            }}
          </template>
        </el-table-column>
      </template>
    </iep-table>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPage } from "@/api/conm/article_controller.ts";
import { columnsMap, dictsMap } from "../DocumentManagement/options.ts";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      dictsMap,
      columnsMap,
      methodName: "创建",
      pagedTable: [],
      siteId: "",
      multipleSelection: [],
    };
  },
  // },
  created() {
    this.siteId = this.$route.params.id;
  },
  computed: {
    ...mapGetters(["permissions", "tableSize"]),
  },
  methods: {
    selectionChange(val) {
      this.multipleSelection = val;
    },
    submitForm() {
      this.$emit("load-select", this.multipleSelection);
    },
    async loadPage(param = this.searchForm) {
      await this.loadTable({ ...param, siteId: this.siteId }, getPage);
    },
  },
};
</script>
