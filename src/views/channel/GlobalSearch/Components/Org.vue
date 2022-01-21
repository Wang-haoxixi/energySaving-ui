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
          <IepPopoverOrgCard :org-id="item.id">
            <iep-img class="avatar" :resizeOpt="{l:70}" :src="item.avatar"></iep-img>
          </IepPopoverOrgCard>
          <div class="info">
            <div class="first-line">
              <iep-div-detail
                class="org-name"
                :value="item.orgName"
                @click.native="handleShow(item)"
              ></iep-div-detail>
              <IepRednessIcon :redness="item.redness"></IepRednessIcon>
            </div>
            <IepTagRead class="tag" :value="item.tagKeyWords"></IepTagRead>
            <div class="org-real-name">
              <span>负责人：{{item.realName}}</span>
              <iep-div-detail v-if="item.sign" class="sign" :value="item.sign" :title="item.sign"></iep-div-detail>
            </div>
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
import { SO_JOIN_TIP } from "@/const/env";
import { searchOrg } from "@/api/admin/search";
import mixins from "@/mixins/mixins";
import Nodata from "./Nodata";
export default {
  components: {
    Nodata,
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
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(param, searchOrg);
      this.loading = false;
    },
    handleShow(item) {
      if (item.isOpen) {
        this.$openPage(`${this.$pathPrefix_SoStyle}${item.id}`);
      } else {
        this.$message(SO_JOIN_TIP);
      }
    },
  },
  watch: {
    $route: {
      handler: function () {
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
