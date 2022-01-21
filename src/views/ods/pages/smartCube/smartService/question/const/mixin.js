import { matterData, mockData } from "./mock";
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      matterData,
      mockData,
      searchOption: [
        { label: "标准问题", prop: "val1", type: "input" },
      ],
      pageState: "list",
      columnsMap: [
        {
          label: "标准问题",
          prop: "question",
        },
        {
          label: "分类",
          prop: "type",
          type: "dict",
        },
        {
          label: "最后编辑时间",
          prop: "modifiedTime",
        },
        {
          label: "反馈满意度",
          prop: "goodReview",
          type: "slot",
        },
        {
          label: "状态",
          prop: "isUsed",
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
    // 创建
    handleCreate() {
      this.pageState = "form";
      this.formStatus = "create";
      this.$nextTick(() => {
        this.$refs["form"].open({ replyStr: "", colloquialReplyStr: "" });
      });
    },
    // // 详情
    // handleDetail(row) {
    //   this.pageState = "form";
    //   this.formStatus = "detail";
    //   this.$nextTick(() => {
    //     this.$refs["form"].open(row);
    //   });
    // },
    // 编辑
    handleEdit(row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
  },
};