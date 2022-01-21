import { matterData, mockData } from "./mock";
import mixins from "@/mixins/mixins";
import { status } from "./options";
export default {
  mixins: [mixins],
  data () {
    return {
      matterData,
      mockData,
      searchOption: [
        { label: "事项名称", prop: "val1", type: "input" },
        { label: "事项类别", prop: "val2", type: "select", dicData: status.status },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "事项名称",
          prop: "val11",
        },
        {
          label: "事项编码",
          prop: "val12",
        },
        {
          label: "行政区划",
          prop: "val13",
        },
        {
          label: "实施主体",
          prop: "val1",
        },
        {
          label: "事项类别",
          prop: "val14",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "实施清单状态",
          prop: "val15",
        },
      ],
    };
  },
  mounted () {
    this.loadPage();
  },
  methods: {
    // 分页
    loadPage (fn = m => m) {
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
    // 详情
    handleDetail (row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 认领
    handleClaim () {
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
    handleStatistics () {
      this.$nextTick(() => {
        this.$refs.statisticsDialog.open();
      });
    },
  },
};