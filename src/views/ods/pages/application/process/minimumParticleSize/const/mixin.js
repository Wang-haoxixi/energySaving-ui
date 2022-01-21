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
        { label: "信息项名称", prop: "val1", type: "input" },
        // { label: "编号", prop: "val3", type: "input" },
        { label: "状态", prop: "val2", type: "select", dicData: status.status },
        { label: "信息项种类", prop: "val4", type: "select", dicData: status.kinds },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "编号",
          prop: "val8",
        },
        {
          label: "信息项名称",
          prop: "val1",
        },
        {
          label: "数据种类",
          prop: "val2",
          type: "dict",
        },
        {
          label: "状态",
          prop: "status",
          type: "dict",
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
        this.$refs["form"].open({});
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
    // 编辑
    handleEdit (row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(Object.assign({}, row));
      });
    },
    // 删除
    handleDeleteById () {
      this.$confirm(`是否删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `删除成功!`,
        });
      });
    },
    // 历史记录
    handleHistory () {
      this.$nextTick(() => {
        this.$refs.historyDialog.open();
      });
    },
  },
};