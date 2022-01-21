import { matterData, mockData } from "./mock";
import mixins from "@/mixins/mixins";
// import { status } from "./options";
export default {
  mixins: [mixins],
  data() {
    return {
      matterData,
      mockData,
      searchOption: [
        { label: "事项名称", prop: "val1", type: "input" },
        { label: "实施主体", prop: "val2", type: "input" },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "事项/办理项名称",
          prop: "val11",
        },
        {
          label: "事项/办理项实施编码",
          prop: "val12",
        },
        {
          label: "实施主体",
          prop: "val13",
        },
        {
          label: "清单类型",
          prop: "val1",
        },
        {
          label: "认领状态",
          prop: "val14",
        },
        {
          label: "审核状态",
          prop: "status",
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
    // 详情
    handleDetail(row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 审核
    handleExamine() {

    },
    handleStatistics() {
      this.$nextTick(() => {
        this.$refs.statisticsDialog.open();
      });
    },
  },
};
