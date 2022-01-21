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
        <div class="item-box" v-for="item in pagedTable" :key="item.id">
          <iep-popover-user-card :user-id="item.id">
            <iep-img class="avatar" :resizeOpt="{l:70}" :src="item.avatar"></iep-img>
          </iep-popover-user-card>
          <div class="info">
            <div class="real-name" @click="openStyle(item,'id')">
              <span>{{item.realName}}</span>
              <span>{{item.position}}</span>
              <IepRednessIcon :redness="item.redness"></IepRednessIcon>
            </div>
            <IepTagRead class="tag" :value="item.tagKeyWords"></IepTagRead>
            <iep-div-detail v-if="item.sign" class="sign" :value="item.sign" :title="item.sign"></iep-div-detail>
          </div>
        </div>
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
import { searchUser } from "@/api/admin/search";
import mixins from "@/mixins/mixins";
import followMixins from "@/mixins/followMixins";
import Nodata from "./Nodata";
export default {
  components: {
    Nodata,
  },
  mixins: [mixins, followMixins],
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
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(param, searchUser);
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
</style>
