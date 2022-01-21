<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='unsubmit'" v-slot:unsubmit>
          <unsubmit></unsubmit>
        </template>
        <template v-if="tabName ==='pending'" v-slot:pending>
          <pending></pending>
        </template>
        <template v-if="tabName ==='manage'" v-slot:manage>
          <manage></manage>
        </template>
        <template v-if="tabName ==='VideoManager'" v-slot:VideoManager>
          <VideoManager></VideoManager>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>

<script>
import unsubmit from "./Page/unsubmit";
import pending from "./Page/pending";
import manage from "./Page/manage";
import VideoManager from "./Page/VideoManager/index";
export default {
  name: "resultOrg",
  components: {
    unsubmit,
    pending,
    manage,
    VideoManager,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      tabName: "unsubmit",
      tabList: [
        {
          label: "未提交",
          value: "unsubmit",
        },
        {
          label: "待批卷",
          value: "pending",
        },
        {
          label: "成绩管理",
          value: "manage",
        },
        {
          label: "视频管理",
          value: "VideoManager",
        },
      ],
    };
  },
  methods: {
    handleClick({ name }) {
      this.$router.replace({
        query: {
          tabName: name,
        },
      });
    },
  },
  created() {
    this.$route.query.tabName && (this.tabName = this.$route.query.tabName);
  },
};
</script>
