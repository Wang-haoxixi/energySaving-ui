<template>
  <div class="attentions-box">
    <div class="title">关注的组织</div>
    <div class="attentions-so">
      <div
        class="so-item"
        v-for="item of pagedTable.slice(0,5)"
        :key="item.orgId"
        @click="handleClick(item.orgId)"
      >
        <iep-img :src="item.avatar"></iep-img>
        <div class="org-name iep-ellipsis-flex" :title="item.name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getFollowSoById } from "@/api/admin/follow";

export default {
  mixins: [mixins],
  // data() {
  //   return {};
  // },
  computed: {
    getFollowPage() {
      return getFollowSoById(+this.$route.params.id);
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      await this.loadTable(param, this.getFollowPage);
    },
    handleClick(id) {
      this.$router.push({ path: `/channel/styles/so/${id}/index` });
    },
  },
};
</script>
<style lang="scss" scoped>
.attentions-box {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}

.attentions-so {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  .so-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .iep-image {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
    .org-name {
      margin-top: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
