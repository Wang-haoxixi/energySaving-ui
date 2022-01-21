<template>
  <iep-dialog :dialog-show="dialogShow" :title="`关联目录`" width="80%" @close="close">
    <div style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        filterable
        :titles="['待选目录', '已选目录']"
        :button-texts="['删除选择', '确认选择']"
        :data="data"
        v-model="checked"
        @change="handleChange"
      ></el-transfer>
    </div>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template #materialKind="{scope}">{{dictsMap.materialKind[scope.row.materialKind] || "暂无"}}</template>
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <template slot="footer">
      <iep-operation-wrapper>
        <el-button type="primary" @click="handleSubmit()">保存</el-button>
      </iep-operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      methodName: "新增",
      data: [
        { key: 3813, label: "项目评审结论" },
        { key: 3811, label: "环保局" },
        { key: 3793, label: "扶贫信息" },
      ],
      checked: [],
      columnsMap: [
        {
          prop: "name",
          label: "信息资源名称",
        },
        {
          prop: "status",
          label: "目录状态",
          slot: true,
        },
        {
          prop: "collectStatus",
          label: "归集状态",
          slot: true,
        },
        {
          prop: "nameEn",
          label: "表英文名",
        },
        {
          prop: "createTime",
          label: "归集时间",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  props: {
    dialogStatus: {
      type: String,
      default: "detail",
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleChange() {},
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = {
        records: [],
        total: 2,
        size: 10,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1,
      };
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    handleSubmit() {
      this.close();
    },
    open(row) {
      this.form = row;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
