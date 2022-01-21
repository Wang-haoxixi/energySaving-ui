<template>
  <div class="nb">
    <iep-basic-container>
      <iep-page-header :title="`${$route.meta.name}（余额：${balance}贝）`"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getPlatformFlowPage"
        :is-mutiple-selection="false"
        searchName="remarks"
        placeholder="请输入备注进行搜索"
      >
        <template #iep-crud-left>
          <span>订单赠送</span>
          <template v-if="paramForm.status==='1'">
            <span class="iep-red">人名币与宝贝赠送比：{{paramForm.publicValue}}</span>
            <el-button type="text" @click="handleEditParam()">修改</el-button>
          </template>
          <el-switch
            :value="paramForm.status"
            active-text="启用"
            inactive-text="禁用"
            active-value="1"
            inactive-value="2"
            @change="handleToggle()"
            active-color="#13ce66"
          ></el-switch>
        </template>
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <NbRadioDialog ref="NbRadioDialog" @load-page="load()"></NbRadioDialog>
  </div>
</template>
<script>
import NbRadioDialog from "./NbRadioDialog";
import AdvanceSearch from "./AdvanceSearch";
import { dictsMap, columnsMap } from "./options";
import { getAccountVal } from "@/api/fms/account";
import { getPlatformFlowPage } from "@/api/fms/flow";
import { getParamById, putParam } from "@/api/admin/param";
export default {
  components: {
    AdvanceSearch,
    NbRadioDialog,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      balance: 0,
      paramForm: {},
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    getPlatformFlowPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleEditParam() {
      this.$refs["NbRadioDialog"].form = this.paramForm;
      this.$refs["NbRadioDialog"].formRequestFn = putParam;
      this.$refs["NbRadioDialog"].dialogShow = true;
    },
    async handleToggle() {
      this.paramForm.status = 3 - this.paramForm.status;
      const { data } = await putParam(this.paramForm);
      if (data) {
        await this.load();
      }
    },
    async load() {
      const { data } = await getAccountVal({ type: 1, id: 1 });
      this.balance = data.balance;
      const res = await getParamById(13);
      this.paramForm = res.data;
    },
  },
};
</script>
