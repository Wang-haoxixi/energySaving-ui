<template>
  <iep-basic-container>
    <iep-page-header title="面试日程"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <div class="search-form">
          <div class="search-item">
            <div class="search-label">面试职位：</div>
            <div class="search-span">
              <el-input v-model="searchForm.recruitName" placeholder="请输入职位名称"></el-input>
            </div>
          </div>
          <div class="search-item">
            <div class="search-label">面试职位：</div>
            <div class="search-span">
              <el-select v-model="searchForm.state" placeholder="请选择" clearable>
                <el-option
                  v-for="item in searchOptions.state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-button @click="searchPage(searchForm)" type="primary">搜索</el-button>
        </div>
      </template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <template slot="invitation" slot-scope="scope">
          <div>{{scope.scope.row.invitationTime | parseToDay}}</div>
        </template>
        <template slot="time" slot-scope="scope">
          <div>{{scope.scope.row.invitationTime | parseDate("HH:mm")}}</div>
        </template>
        <template slot="recruitName" slot-scope="scope">
          <div>{{transformString(scope.scope.row.recruitName)}}</div>
        </template>
        <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="100"></IepOperationTableBtnGroup>
      </iep-table>
    </div>
  </iep-basic-container>
</template>

<script>
import mixins from "@/mixins/mixins";
import {
  tableOption,
  dictsMap,
  initSearchForm,
  searchOptions,
} from "./options";
import { mapGetters, mapActions } from "vuex";
import { getInvitationBySoId } from "@/api/dms/recruit";
import { transformString } from "@/util/dataDeal";

export default {
  props: {
    mlmsType: {
      type: String,
    },
  },
  mixins: [mixins],
  components: {},
  data() {
    return {
      columnsMap: tableOption,
      dictsMap: dictsMap,
      selectList: [],
      operationOptions: [
        {
          name: "发消息",
          func: this.handleSendMsgMsg,
          hidden: false,
        },
      ],
      searchOptions,
      searchForm: initSearchForm(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    transformString,
    searchData(row) {
      this.searchForm = { ...row };
      this.searchPage();
    },
    loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      this.loadTable(param, getInvitationBySoId);
    },
    // 直聊
    ...mapActions(["imcOpenConversionByTargetId"]),
    handleSendMsgMsg(row) {
      this.imcOpenConversionByTargetId({
        targetId: row.receiveId + "",
        type: 1,
      });
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  .search-item {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    .search-label,
    .search-span {
      display: inline-block;
    }
    &::v-deep input {
      height: 35px;
      width: 150px;
      padding-left: 0;
      &::placeholder {
        font-size: 14px;
        padding: 0;
      }
    }
  }
}
</style>
