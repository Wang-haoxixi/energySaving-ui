<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="数据清洗池"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
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
          <template #cleanState="{scope}">{{dictsMap.cleanState[scope.row.cleanState] || "暂无"}}</template>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                <el-button
                  type="text"
                  @click="handleResult(scope.row)"
                  v-if="scope.row.cleanState === '2'"
                >清洗结果统计</el-button>
                <el-button
                  type="text"
                  @click="handleConfig(scope.row)"
                  v-if="scope.row.cleanState === '0'"
                >匹配元数据</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <result ref="result" v-if="pageState === 'result'" @load-page="backPage"></result>
    <config ref="config" v-if="pageState === 'config'" @load-page="backPage"></config>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import result from "./result";
import config from "./config";
export default {
  mixins: [mixins],
  components: { FormTpl, result, config },
  data() {
    return {
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "部门",
          prop: "dataDeptName",
        },
        {
          label: "表名",
          prop: "dataTableName",
        },
        {
          label: "字段名称",
          prop: "dataFieldName",
        },
        {
          label: "状态",
          prop: "cleanState",
          type: "slot",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          label: "部门",
          prop: "dataDeptName",
        },
        {
          label: "表名",
          prop: "dataTableName",
        },
        {
          label: "字段名称",
          prop: "dataFieldName",
        },
        {
          label: "状态",
          prop: "cleanState",
          type: "select",
          dicData: [
            {
              label: "未清洗",
              value: "0",
            },
            {
              label: "清洗中",
              value: "1",
            },
            {
              label: "已清洗",
              value: "2",
            },
          ],
        },
      ],
      dictsMap: {
        cleanState: {
          "0": "未清洗",
          "1": "清洗中",
          "2": "已清洗",
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
    handleResult(row) {
      this.pageState = "result";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["result"].open(row);
      });
    },
    handleConfig(row) {
      this.pageState = "config";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["config"].open(row);
      });
    },
  },
};
</script>
