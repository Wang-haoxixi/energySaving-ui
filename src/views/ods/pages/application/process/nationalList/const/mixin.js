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
        { label: "中央业务指导(实施)部门", prop: "val2", type: "input" },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "事项名称",
          prop: "val1",
        },
        {
          label: "基层目录编码",
          prop: "val4",
        },
        {
          label: "事项类型",
          prop: "val2",
        },
        {
          label: "中央业务指导(实施)部门",
          prop: "val3",
          type: "dict",
        },
        {
          label: "是否对应",
          prop: "val7",
          type: "dict",
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
    // 对应
    handleRelation(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 对应清单
    handleRelationList() {
      this.$refs.listDialog.open();
    },
  },
};
