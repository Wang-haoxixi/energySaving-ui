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
          label: "办事指南名称",
          prop: "val1",
        },
        {
          label: "事项名称",
          prop: "val2",
        },
        {
          label: "事项编码",
          prop: "val3",
        },
        {
          label: "事项类别",
          prop: "val4",
        },
        {
          label: "实施机构",
          prop: "val5",
        },
        {
          label: "项目状态",
          prop: "status",
        },
        {
          label: "事项状态",
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
        this.$refs["form"].open(row);
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
    // 提交
    handleSubmit () {
      this.$confirm(`是否提交`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `提交成功!`,
        });
      });
    },
  },
};