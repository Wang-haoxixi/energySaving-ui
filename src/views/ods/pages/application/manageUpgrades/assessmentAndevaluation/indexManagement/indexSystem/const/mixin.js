import { matterData, mockData } from "./mock";
import mixins from "@/mixins/mixins";
import { status } from "./options";
export default {
  mixins: [mixins],
  data() {
    return {
      matterData,
      mockData,
      searchOption: [
        { label: "指标体系名称", prop: "val1", type: "input" },
        { label: "指标类型", prop: "val2", type: "select", dicData: status.status },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "指标体系名称",
          prop: "val1",
        },
        {
          label: "指标类型",
          prop: "val4",
        },
        {
          label: "评测细则",
          prop: "val5",
        },
      ],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    // 分页
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    //新增
    handleAdd() {
      this.pageState = "form";
      this.formStatus == "create";
      this.$nextTick(() => {
        this.$refs["form"].open();
      });
    },
    // 详情
    handleDetail(row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 编辑
    handleEdit(row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 认领
    handleClaim() {
      this.$confirm(`是否认领`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `认领成功!`,
        });
      });
    },
    handleStatistics() {
      this.$nextTick(() => {
        this.$refs.statisticsDialog.open();
      });
    },
  },
};
