<template>
  <iep-basic-container class="basic-container">
    <div class="page" v-show="pageState === 'list'">
      <iep-operation-container>
        <template slot="left">
          <iep-page-header title="任务"></iep-page-header>
        </template>
        <template slot="right">
          <div class="sort">
            <el-dropdown class="org-dropdown">
              <span class="el-dropdown-link">
                {{sortName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in dictMaps.sort"
                  :key="index"
                  @click.native="handleSort(item)"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <SearchTpl @searchPage="loadPage"></SearchTpl>
        </template>
      </iep-operation-container>
      <tableTemplate ref="tableTpl" @handleDetail="handleDetail" :paramForm="paramForm"></tableTemplate>
    </div>
    <DetailTpl
      class="detail"
      ref="detail"
      v-if="pageState === 'detail'"
      @backPage="backPage"
      isBack
    ></DetailTpl>
  </iep-basic-container>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import tableTemplate from "./tableTpl";
import SearchTpl from "./searchForm";
import DetailTpl from "../detail/index.vue";
import { dictMaps } from "./options";

export default {
  mixins: [mixins],
  components: { tableTemplate, SearchTpl, DetailTpl },
  data() {
    return {
      dictMaps,
      sortName: dictMaps.sort[0].label,
      data: [0, 0], // 头部
      paramForm: {
        sort: dictMaps.sort[0].value,
      },
      selectList: [],
      pageState: "list",
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    loadPage(params = {}) {
      let obj = { current: 1, size: 10 };
      obj = Object.assign({}, obj, params);
      this.$refs["tableTpl"].loadPage(obj);
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detail"].loadData(row.id);
      });
    },
    handleSort(row) {
      this.paramForm.sort = row.value;
      this.sortName = row.label;
      this.loadPage(this.paramForm);
    },
  },
  created() {
    this.paramForm.orgId = this.userInfo.orgId;
  },
};
</script>
<style scoped lang="scss">
.basic-container {
  .button {
    height: 36px;
    border-radius: 10px;
  }
  .sort {
    cursor: pointer;
  }
  &::v-deep .left {
    width: auto;
  }
}
</style>
