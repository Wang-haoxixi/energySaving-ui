<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="历史版本"></iep-page-header>
        <iep-page-header title :backOption="backOption"></iep-page-header>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
  </div>
</template>
<script>
import { mockData3 } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
export default {
  mixins: [mixins],
  components: { FormTpl },
  data() {
    return {
      columnsMap: [
        {
          label: "版本号",
          prop: "histroyNo",
        },
        {
          label: "操作者",
          prop: "userName",
        },
        {
          label: "操作时间",
          prop: "createTime",
        },
      ],
      mockData: mockData3,
      pageState: "list",
      formStatus: "detail",
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
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
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    handleDetail(row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    handleEdit(row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    handleCommit() {
      this.$confirm(`是否确认提交该数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `操作成功!`,
        });
      });
    },
  },
};
</script>
