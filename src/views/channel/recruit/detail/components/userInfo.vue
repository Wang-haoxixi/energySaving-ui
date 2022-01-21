<template>
  <div class="user-info">
    <div class="avatar">
      <IepPopoverOrgCard :org-id="orgId" v-if="orgId">
        <iep-img class="avatar" :src="formData.avatar"></iep-img>
      </IepPopoverOrgCard>
    </div>
    <div class="info">
      <div class="name nowrap" :title="formData.name">{{formData.name}}</div>
      <div class="desc nowrap" :title="formData.introduction">{{formData.introduction}}</div>
    </div>
    <div class="tags">
      <div class="tag" v-for="(item, index) in formData.tags" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getOrgById } from "@/api/admin/org";

export default {
  props: {
    orgId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(["dictGroup"]),
  },
  data() {
    return {
      followState: false,
      formData: {},
    };
  },
  methods: {
    loadData() {
      getOrgById(this.orgId).then(({ data }) => {
        data.tags = data.abilityTag.slice(0, 2);
        data.tags = this.formData = { ...data };
      });
    },
  },
  watch: {
    orgId: {
      handler(val) {
        if (val) this.loadData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  padding: 20px;
  background-color: #fff;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: $--border-radius-base;
    margin-right: 20px;
    border: 1px solid $--border-color;
    cursor: pointer;
    margin: auto;
    margin-bottom: 20px;
  }
  .info {
    .name {
      text-align: center;
      margin-bottom: 10px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .desc {
      color: $--color-text-regular;
      font-size: 14px;
      margin-bottom: 15px;
      text-align: center;
    }
  }
  .tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-right: -10px;
    .tag {
      margin-bottom: 10px;
      height: 24px;
      background: $--background-color;
      border-radius: 5px;
      font-size: 12px;
      color: $--color-text-regular;
      line-height: 24px;
      margin-right: 10px;
      padding: 0 11px;
    }
  }
}
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
