<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="规范事项数据请求"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <iep-button plain @click="batchComfirme">批量确认</iep-button>
          </template>
        </iep-operation-container>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="true"
          @selection-change="handleSelectionChange"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template #isChecked="{scope}">{{dictsMap.isChecked[scope.row.isChecked] || "暂无"}}</template>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                <!-- <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>-->
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
import { mockData } from "./const/mock";
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
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "需求部门",
          prop: "deptName",
        },
        {
          label: "事项名称",
          prop: "taskName",
        },
        {
          label: "基本编码",
          prop: "catalogCode",
        },
        {
          label: "材料数量",
          prop: "materialCount",
        },
        {
          label: "状态",
          prop: "isChecked",
          type: "slot",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          label: "需求部门",
          prop: "deptName",
        },
        {
          label: "事项名称",
          prop: "taskName",
        },
        {
          label: "状态",
          prop: "isChecked",
          type: "select",
          dicData: [
            { label: "未勾选", value: "0" },
            { label: "已勾选", value: "1" },
          ],
        },
      ],
      dictsMap: {
        isChecked: {
          "0": "未勾选",
          "1": "已勾选",
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
    batchComfirme() {
      this.$confirm(`已勾选的无法再次勾选,是否继续?`, "提示", {
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
    handleSelectionChange() {
      // console.log(val);
    },
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
  },
};
</script>
