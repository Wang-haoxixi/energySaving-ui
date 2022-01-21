<template>
  <!-- 事项目录 -->
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <IepPageHeader title="事项目录" @row-click="onRowClick"></IepPageHeader>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <iep-button type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button>
          </template>
        </iep-operation-container>
        <el-row :gutter="20">
          <el-col :span="6">
            <SideBar :data="matterData" />
          </el-col>
          <el-col :span="18">
            <iep-table
              :size="tableSize"
              :isLoadTable="isLoadTable"
              border
              :dictsMap="dictsMap"
              :pagination="pagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              @pagination-size-change="handlePaginationSizeChange"
              @pagination-current-change="handlePaginationCurrentChange"
            >
              <el-table-column prop="operation" label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                  <iep-operation-wrapper>
                    <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>
                    <el-button type="text" @click="handleHistory(scope.row)">历史版本</el-button>
                    <el-button
                      type="text"
                      @click="handleSubmit(scope.row)"
                      v-if="scope.row.status === '1'"
                    >提交</el-button>
                  </iep-operation-wrapper>
                </template>
              </el-table-column>
            </iep-table>
          </el-col>
        </el-row>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <HistoryDialog ref="historyDialog" />
  </div>
</template>
<script>
import currentMixin from "./const/mixin";
import { mapGetters } from "vuex";
import SideBar from "../../components/sidebar";
import FormTpl from "./form";
import { dictsMap } from "./const/options";
import HistoryDialog from "../components/historyDialog";
export default {
  mixins: [currentMixin],
  components: {
    SideBar,
    FormTpl,
    HistoryDialog,
  },
  data() {
    return {
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    // 事项点击事件
    onRowClick(row) {
      console.log("事项点击事件", row);
    },
    // 表单与页面也换
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>