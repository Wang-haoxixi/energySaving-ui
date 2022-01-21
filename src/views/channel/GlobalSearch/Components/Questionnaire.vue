<template>
  <div class="list-box" v-loading="loading">
    <Nodata v-if="!pagedTable.length"></Nodata>
    <template v-else>
      <p>
        共
        <span>{{pagination.total}}</span>
        条数据
      </p>
      <div class="grid-box">
        <list-item class="item-wrap" v-for="item of pagedTable" :key="item.id" :data="item"></list-item>
      </div>
      <div class="pages" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          prev-text="上一页"
          next-text="下一页"
          background
        ></iep-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getChannelPage } from "@/api/qms/questionnaire";
import Nodata from "./Nodata";
import ListItem from "@/views/channel/questionnaire/components/listItem.vue";
export default {
  components: {
    Nodata,
    ListItem,
  },
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      layout: "prev,pager,next",
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(
      param = {
        keyword: this.$route.query.keyword,
        type: this.$route.query.type,
      },
    ) {
      let params;
      if (param.type === "1") {
        params = {
          name: param.keyword,
        };
      } else if (param.type === "2") {
        params = {
          tagName: param.keyword,
        };
      }
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(params, getChannelPage);
      this.loading = false;
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.grid-box {
  ::v-deep .title .plain {
    max-width: 215px !important;
  }
}
.item-wrap {
  border-radius: $--border-radius-base;
  transition: all 0.3s;
  border: 1px solid $--border-color;
  overflow: hidden;
  &:hover {
    box-shadow: 0 2px 12px 0 $--background-color;
    transform: translateY(-5px);
  }
}
</style>
