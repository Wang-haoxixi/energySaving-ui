<template>
  <div class="detail-wrapper" v-loading="loading">
    <div v-if="activity.id===0">
      <iep-wrong height="400px" message="暂无该活动或已被删除"></iep-wrong>
    </div>
    <div v-else-if="activity.statusFlag==='3'">
      <iep-wrong height="400px" message="该活动内容涉嫌违规，已被下架"></iep-wrong>
    </div>
    <div v-else>
      <activity-detail
        :activity="activity"
        @handleChange="handleChangeSubmitForm"
        @handleOrder="handleOrder"
        @loadPage="loadPage"
      ></activity-detail>
      <div class="tags">
        活动标签：
        <el-tag v-for="o of activity.label" :key="o" type="info">{{o}}</el-tag>
      </div>
      <div class="detail-content">
        <activity-content :activity="activity"></activity-content>
        <div class="detail-other">
          <el-card class="code-box" shadow="never">
            <iep-img class="img" :src="qrCodeUrl"></iep-img>
            <div class="txt-code">
              <span>微信扫一扫</span>
              <span>分享活动给朋友</span>
            </div>
          </el-card>
          <hot-tags></hot-tags>
          <guess-like></guess-like>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 活动详情
import ActivityDetail from "./Components/ActivityDetail";
import ActivityContent from "./Components/ActivityContent";
import HotTags from "./Components/HotTags";
import GuessLike from "./Components/GuessLike";
import { getAppletsQRCode } from "@/api/admin/social";
import { getActivityById } from "@/api/meetting/publish";
import { ActivityDetailDTO } from "./options";
import { documentSetTitle } from "@/util/util";

const initForm = () => {
  return {
    conferenceId: 0,
    orderNum: 1,
    ticketingId: 0,
  };
};
export default {
  name: "Detail",
  components: {
    ActivityDetail,
    ActivityContent,
    HotTags,
    GuessLike,
  },
  data() {
    return {
      qrCodeUrl: "/img/back/code.jpg",
      activity: new ActivityDetailDTO(),
      submitForm: initForm(),
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  watch: {
    id() {
      this.loadPage();
    },
  },
  created() {
    this.loadPage();
    this.loadQrCode();
    this.submitForm.conferenceId = this.id;
  },
  methods: {
    async loadQrCode() {
      const { data } = await getAppletsQRCode(this.id);
      this.qrCodeUrl = data;
    },
    async loadPage(id = this.id) {
      this.loading = true;
      const { data } = await getActivityById(id);
      if (data) {
        this.activity = this.$mergeByFirst(new ActivityDetailDTO(), data);
        documentSetTitle(this.activity.name);
      }
      this.loading = false;
    },
    handleChangeSubmitForm(p, v) {
      this.submitForm[p] = v;
    },
    // 跳转至核对订单
    handleOrder() {
      const {
        city,
        field,
        startTime,
        endTime,
        id,
        ticketingManagements,
      } = this.activity;
      const ticketingRemarks = ticketingManagements.find(
        (m) => m.id === this.submitForm.ticketingId,
      ).remarks;
      this.$generateOrderPage({
        type: 2,
        source: "1",
        conferenceId: id,
        ticketingId: this.submitForm.ticketingId,
        amount: this.submitForm.orderNum,
        startTime,
        endTime,
        city,
        field,
        ticketingRemarks,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-wrapper {
  width: 1200px;
  margin: 40px auto;
  .tags {
    margin: 20px 0 10px;
    font-size: 14px;
    ::v-deep .el-tag {
      margin-left: 10px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 28px;
      font-size: 14px;
      background: $--background-color;
      border-radius: 5px;
      color: #666769;
    }
  }
  .detail-content {
    display: grid;
    grid-template-columns: 1fr 274px;
    gap: 20px;
    .detail-other {
      display: grid;
      gap: 20px;
      grid-template-rows: 140px 270px 296px;
    }
  }
}
.code-box {
  ::v-deep .el-card__body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .img {
    width: 100px;
    height: 100px;
    border-radius: 0;
  }
  .txt-code {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    span {
      &:nth-child(1) {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        color: #303031;
      }
      &:nth-child(2) {
        font-size: 14px;
        color: $--color-text-secondary;
      }
    }
  }
}
</style>
