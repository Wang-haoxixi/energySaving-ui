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
        { label: "项目名称", prop: "val1", type: "input" },
        { label: "项目状态", prop: "val2", type: "select", dicData: status.status },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "项目名称",
          prop: "val1",
        },
        {
          label: "开始时间",
          prop: "val2",
        },
        {
          label: "截止时间",
          prop: "val3",
        },
        {
          label: "指标体系",
          prop: "val4",
        },
        {
          label: "项目状态",
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
    handleResult() {
      this.pageState = "form";
      this.formStatus = "create";
      this.$nextTick(() => {
        this.$refs["form"].typeSelect = "result";
      });
    },

    handleAnalysis() {
      this.pageState = "form";
      this.formStatus = "create";
      this.$nextTick(() => {
        this.$refs["form"].typeSelect = "analysis";
      });
    },
  },
};