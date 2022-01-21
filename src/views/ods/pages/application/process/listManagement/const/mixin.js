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
        { label: "状态", prop: "val2", type: "select", dicData: status.status },
        { label: "认领状态", prop: "val4", type: "select", dicData: status.claim_status },
        // { label: "实施主体", prop: "val3", type: "input" },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "事项/办理项名称",
          prop: "val1",
        },
        {
          label: "事项/办理项实施编码",
          prop: "val82",
        },
        {
          label: "实施主体",
          prop: "val7",
        },
        {
          label: "清单类型",
          prop: "val81",
        },
        {
          label: "认领状态",
          prop: "val83",
        },
        {
          label: "审核状态",
          prop: "val84",
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
    // 创建
    handleCreate () {
      this.pageState = "form";
      this.formStatus = "create";
      this.$nextTick(() => {
        this.$refs["form"].open(null);
      });
    },
    // 详情
    handleDetail (row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 取消发布
    handlePublish () {
      this.$confirm(`是否取消发布`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `取消发布成功!`,
        });
      });
    },
    // 历史记录
    handleHistory () {
      this.$nextTick(() => {
        this.$refs.historyDialog.open();
      });
    },
    // 新增办理项
    handleAddHandlingItems () {
      this.$nextTick(() => {
        this.$refs.handlingItemsDialog.open();
      });
    },
  },
};