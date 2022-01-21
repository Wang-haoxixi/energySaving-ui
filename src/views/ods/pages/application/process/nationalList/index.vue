<template>
  <!-- 国家目录对应 -->
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <IepPageHeader title="国家目录对应" @row-click="onRowClick"></IepPageHeader>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
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
              <el-table-column prop="operation" label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <iep-operation-wrapper>
                    <el-button type="text" @click="handleRelation(scope.row)">对应</el-button>
                    <el-button type="text" @click="handleRelationList(scope.row)">对应清单</el-button>
                  </iep-operation-wrapper>
                </template>
              </el-table-column>
            </iep-table>
          </el-col>
        </el-row>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage"></form-tpl>
    <ListDialog ref="listDialog" />
  </div>
</template>
<script>
import currentMixin from "./const/mixin";
import { mapGetters } from "vuex";
import SideBar from "../../components/sidebar";
import FormTpl from "./form";
import { dictsMap } from "./const/options";
import ListDialog from "./listDialog";
export default {
  mixins: [currentMixin],
  components: {
    SideBar,
    FormTpl,
    ListDialog,
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