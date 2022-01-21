<template>
  <div class="content">
    <tabsTpl v-model="tabName" :tab-list="tabList" class="content-left">
      <!-- 最新说说 - 全部说说 -->
      <template v-if="tabName ==='allThought'" v-slot:allThought>
        <pageTpl
          ref="allThought"
          :requestFn="getAllPage"
          :paramData="paramData"
          @fresh-right="freshRight"
        ></pageTpl>
      </template>

      <!-- 热门说说 -->
      <template v-if="tabName ==='hotThought'" v-slot:hotThought>
        <!-- 活跃用户 -->
        <ActiveListTpl></ActiveListTpl>
        <pageTpl
          ref="hotThought"
          :requestFn="getHitPage"
          :paramData="paramData"
          @fresh-right="freshRight"
        ></pageTpl>
      </template>

      <!-- 关注列表 -->
      <template v-if="tabName ==='followThought'" v-slot:followThought>
        <pageTpl
          ref="followThought"
          :requestFn="getFollowPage"
          :paramData="paramData"
          @fresh-right="freshRight"
        ></pageTpl>
      </template>

      <!-- 话题列表 -->
      <template v-if="tabName ==='subject'" v-slot:subject>
        <subjectPage ref="subject"></subjectPage>
      </template>

      <!-- 专栏 -->
      <template v-if="tabName ==='material'" v-slot:material>
        <MaterialTpl ref="material" isAll></MaterialTpl>
      </template>

      <!-- 搜索 -->
      <template v-slot:search>
        <!-- 热门 -->
        <searchHotTought @load-page="searchPage" ref="search" v-if="isSearchShow === 'hotThought'"></searchHotTought>
        <!-- 最新 - 全部 -->
        <searchThought @load-page="searchPage" ref="search" v-if="isSearchShow === 'allThought'"></searchThought>
        <!-- 关注 -->
        <searchFollow @load-page="searchPage" ref="search" v-if="isSearchShow === 'followThought'"></searchFollow>
        <!-- 话题 -->
        <searchSubject @load-page="searchPage" ref="search" v-if="isSearchShow === 'subject'"></searchSubject>
        <!-- 专栏 -->
        <searchMaterial @load-page="searchPage" ref="search" v-if="isSearchShow === 'material'"></searchMaterial>
      </template>
    </tabsTpl>
  </div>
</template>

<script>
import { getHitPage, getFollowPage, getAllPage } from "@/api/dms/thoughts";
import subjectPage from "./subjectPage/";
import tabsTpl from "./tabsTpl";
import searchThought from "./search/thought";
import searchMaterial from "./search/material";
import searchSubject from "./search/subject";
import searchFollow from "./search/follow";
import searchHotTought from "./search/hotTought";
import pageTpl from "./page/";
import MaterialTpl from "@/views/my/index/dynamic/material/allIndex";
import ActiveListTpl from "./library/activeList";
import { tabList } from "./options";

export default {
  components: {
    subjectPage,
    tabsTpl,
    pageTpl,
    MaterialTpl,
    searchSubject,
    searchMaterial,
    ActiveListTpl,
    searchThought,
    searchFollow,
    searchHotTought,
  },
  data() {
    return {
      getFollowPage,
      getHitPage,
      getAllPage,
      tabList,
      tabName: tabList[0].value, // tab值
      isSearchShow: tabList[0].value,
      paramData: {},
    };
  },
  watch: {
    tabName(newVal) {
      this.isSearchShow = newVal;
      this.paramData = {
        userId: "",
      };
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      this.paramData = {};
      // this.$refs["search"].clearSearchParam();
      this.tabName = "allThought";
      if (this.$route.query.id) {
        this.paramData.userId = this.$route.query.id;
      } else {
        this.paramData.userId = "";
      }
      this.$nextTick(() => {
        this.loadPage();
      });
    });
    next();
  },
  methods: {
    // 搜素
    searchPage(params, state) {
      if (state === "subject") {
        this.$refs.subject.search(params);
      } else if (state === "material") {
        this.$refs.material.searchData(params);
      } else {
        if (params) {
          this.paramData = Object.assign({}, this.paramData, params);
        }
        this.$nextTick(() => {
          this.$refs[state].loadPage();
        });
      }
    },
    freshRight() {
      // this.$refs["contentRight"].loadData();
    },
    loadPage() {
      if (this.tabName === "allThought") {
        this.$refs["allThought"].loadPage();
      } else if (this.tabName === "material") {
        this.$refs.material.loadPage();
      }
      // this.$refs["contentRight"].loadData();
    },
  },
  created() {
    if (this.$route.query.id) {
      this.paramData.userId = this.$route.query.id;
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  margin: auto;
  .content-left {
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    .content-top {
      border-bottom: 1px solid $--border-color;
    }
    .explain {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $--border-color;
      margin-bottom: 30px;
      padding-bottom: 10px;
      h3 {
        font-size: 18px;
        color: #303031;
        margin-right: 5px;
        margin-bottom: 0;
        font-family: Microsoft YaHei;
      }
      span {
        color: $--color-text-secondary;
        font-size: 12px;
      }
    }
    .material {
      width: 100%;
      margin: 0 auto;
    }
  }
}
.content ::v-deep .el-tabs__nav {
  padding-bottom: 17px;
  line-height: 16px;
}
.content-left ::v-deep .el-tabs__header {
  margin: 0 0 15px;
}
.content ::v-deep .el-tabs__item {
  padding: 0 15px;
  font-size: 14px;
}
.content ::v-deep .el-tabs__item.is-active {
  height: 16px;
  font-size: 16px;
  line-height: 16px;
}
</style>