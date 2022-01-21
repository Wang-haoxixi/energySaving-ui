<template>
  <div class="wrap-box">
    <SearchPage ref="SearchPage"></SearchPage>
    <template v-if="$route.query.keyword">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item
          v-show="activeTabs.includes(+item.value)"
          v-for="item in searchOptions"
          :key="item.value"
          :index="`/channel/global_search/${item.label}`"
        >
          {{item.name}}
          <!-- <span>({{item.count}})</span> -->
        </el-menu-item>
      </el-menu>
      <router-view @loadSearchCount="loadSearchCount"></router-view>
    </template>
    <template v-else>
      <!-- 推荐人 -->
      <RecommendPersonBox></RecommendPersonBox>
      <!-- 推荐SO -->
      <RecommendOrgBox></RecommendOrgBox>
    </template>
  </div>
</template>
<script>
import RecommendPersonBox from "./Components/RecommendPersonBox/index";
import RecommendOrgBox from "./Components/RecommendOrgBox";
import { getSearchCount } from "@/api/dms/channel";
import { searchCount } from "@/api/admin/search";
import { GLOBAL_SEARCH_OPTIONS } from "@/const/env";
import SearchPage from "./SearchPage";
export default {
  components: {
    SearchPage,
    RecommendPersonBox,
    RecommendOrgBox,
  },
  data() {
    return {
      countMaps: {
        topicCount: 0,
        materialInfoCount: 0,
        orgCount: 0,
        userCount: 0,
      },
      searchOptions: GLOBAL_SEARCH_OPTIONS,
      funcSearchCount: getSearchCount,
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    },
    activeTabs() {
      const { type } = this.$route.query;
      if (type == 2) {
        return [1, 2, 4, 6, 7, 8, 9];
      } else {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
    },
  },
  methods: {
    handleSelect(index) {
      const { type, keyword } = this.$route.query;
      this.$router.push({
        path: index,
        query: { type, keyword },
      });
    },
    loadSearchCount() {
      if (this.$route.query.type == 1) {
        this.funcSearchCount = getSearchCount;
      } else {
        this.funcSearchCount = searchCount;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-box {
  background: #fff;
  display: flow-root;
  width: 980px;
  margin: 0 auto;
}
.content-box {
  width: 1200px;
  margin: 20px auto 0;
}
::v-deep .el-menu.el-menu--horizontal {
  margin: 0 -20px;
}
::v-deep .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
::v-deep .el-menu-item:hover span,
::v-deep .el-menu-item.is-active:hover,
::v-deep .el-menu-item.is-active span {
  color: $--color-primary;
}
</style>
