<template>
  <div class="left-box">
    <div class="img">
      <iep-img :src="form.icon"></iep-img>
    </div>
    <el-button class="iep-btn-long-big" type="primary" @click="handleBuy()">获取</el-button>
    <div class="info">
      <span class="info-name">分类</span>
      <span class="info-con tag">{{form.classification}}</span>
    </div>
    <div class="info">
      <span class="info-name">开发者</span>
      <span class="info-con">{{form.developer}}</span>
    </div>
    <div class="info">
      <span class="info-name">文档</span>
      <span class="info-con">{{form.help}}</span>
    </div>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { buyAppForOrg } from "@/api/admin/app_store";
import { AppStoreEntity } from "@/views/operate/app_store/options";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  data() {
    return {
      form: new AppStoreEntity(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadData(data) {
      this.form = { ...data };
    },
    loadPage() {
      this.$emit("load-page");
    },
    handleBuy() {
      this._handleComfirm(
        { applyId: this.form.id, orgId: this.userInfo.orgId },
        buyAppForOrg,
        "购买应用",
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.left-box {
  .img {
    width: 180px;
    height: 180px;
    border-radius: 8px;
    border: 1px solid $--border-color;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 30px 0;
    text-align: left;
    .info-con {
      margin-top: 6px;
      font-size: 14px;
    }
    .tag {
      color: #e25056;
      line-height: 1;
      border-radius: 25px;
      border: 1px solid #e25056;
      margin-right: 4px;
      padding: 8px 20px;
      width: auto;
    }
  }
}
.left-box .img ::v-deep .el-image__inner {
  width: 100%;
}
</style>
