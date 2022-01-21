<template>
  <iep-dialog :dialog-show="dialogShow" :title="`新增`" width="80%" @close="close">
    <div style="width:100%;">
      <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
    </div>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :isMutipleSelection="true"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    ></iep-table>
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
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "元数据标识符",
          prop: "complexNumber",
        },
        {
          label: "元数据中文名称",
          prop: "complexName",
        },
        {
          label: "元数据英文名称",
          prop: "complexNameEn",
        },
      ],
      searchOption: [{ label: "元数据中文名称", prop: "complexName" }],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPages();
  },
  methods: {
    handleSubmit() {
      this.close();
    },
    loadPages(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = {
        records: [],
        total: 0,
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
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
