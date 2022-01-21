<template>
  <div class="person">
    <iep-no-data v-if="!pagedTable.length" complex></iep-no-data>
    <template v-else>
      <div class="content">
        <div class="item" v-for="(item, index) in pagedTable" :key="index">
          <div class="head" @click="handleDetail(item)">
            <div class="title">{{item.content}}</div>
            <div class="button">
              <iep-button type="primary" @click.stop="handleUnfollow(item)">取关</iep-button>
            </div>
          </div>
        </div>
      </div>
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        :page-sizes="initPageSize"
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        background
      ></iep-pagination>
    </template>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { getFollowPage, follow } from "@/api/admin/follow";
import { mapGetters } from "vuex";

export default {
  mixins: [mixins],
  data() {
    return {
      initPageSize: [10, 20, 30, 40],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    loadPage(param = { type: 3 }) {
      this.loadTable(param, getFollowPage);
    },
    handleUnfollow(row) {
      this.$confirm("是否确认取消关注此话题？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        follow({
          followId: row.topicId,
          sign: 1,
          type: 3,
          userId: this.userInfo.userId,
        }).then(({ data }) => {
          if (data) {
            this.loadPage();
          }
        });
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: "/thought/subject_list",
        query: {
          title: row.content,
          id: row.topicId,
        },
      });
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
@import "./common.scss";
</style>
