<template>
  <iep-dialog-message title="欢迎加入节能宝！" :dialogShow="dialogShow" @close="_close()">
    <p
      slot="desc"
    >我们将以开放、赋能、协作的精神，为您提供顶层设计、信息储备、多维链接、流程再造、智能分析、开放交流、数据复用、有效激励、展示培训等系列服务，实现您聚焦面向未来的能力建设目标，赋能您开启数字人生！立即了解平台规则，开启智慧之旅！</p>
    <div slot="button" class="btn-wrapper">
      <el-button type="primary" class="iep-btn-block" @click="dialogShow=false">开启我的智慧之旅</el-button>
      <el-button
        type="primary"
        class="last-btn iep-btn-block"
        @click="handleToCreateOrg()"
        plain
      >立即创建我的智慧组织</el-button>
    </div>
  </iep-dialog-message>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  created() {
    if (this.$route.query.welcome) {
      this.dialogShow = true;
    }
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleToCreateOrg() {
      this.$openPage("/my/create_org");
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.last-btn {
  margin-left: 0;
  margin-top: 10px;
}
</style>
