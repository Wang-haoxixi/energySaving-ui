<template>
  <el-popover placement="left" width="220" trigger="hover">
    <div class="btn-group">
      <div class="btn-box" @click="QuestionAndAnswer(true)">
        <i class="icon-btn el-icon-service"></i>
        <div class="text">
          <div class="title">智能客服</div>
          <div class="desc">有问题找我们，提供只能诊断</div>
        </div>
      </div>
      <div class="btn-box" @click="handleOpenPrizeSuggest()">
        <i class="icon-btn el-icon-edit"></i>
        <div class="text">
          <div class="title">意见反馈</div>
          <div class="desc">我们还不够完美，渴望您的建议</div>
        </div>
      </div>
      <div class="btn-box" @click="$openPage('/my/help_center')">
        <i class="icon-btn el-icon-woneng-bangzhu"></i>
        <div class="text">
          <div class="title">帮助中心</div>
          <div class="desc">提供指南让你快速上手、高效无忧</div>
        </div>
      </div>
      <div class="btn-box" @click="$openPage('/channel/partner_introduce')">
        <i class="icon-btn el-icon-woneng-hehuorenguanli"></i>
        <div class="text">
          <div class="title">节能宝合伙人</div>
          <div class="desc">成为节能宝百万合伙人</div>
        </div>
      </div>
      <!-- 客服框组件 -->
      <consultation></consultation>
      <IepDialogPrizeSuggest ref="IepDialogPrizeSuggest"></IepDialogPrizeSuggest>
    </div>
    <div class="fixed-btn" slot="reference">
      <img src="/img/icons/android-chrome-maskable-192x192.png" alt="logo" />
      <div class="text-vertical iep-red">联系我们</div>
    </div>
  </el-popover>
</template>
<script>
import consultation from "@/views/ics/service/consultation.vue";
import { mapActions } from "vuex";
export default {
  components: {
    consultation,
  },
  data() {
    return {
      showCloseIcon: false,
    };
  },
  methods: {
    ...mapActions(["QuestionAndAnswer"]),
    handleOpenPrizeSuggest() {
      this.$refs["IepDialogPrizeSuggest"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  display: flex;
  flex-direction: column;
  .btn-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 0;
    &:hover {
      background: rgb(250, 250, 250);
    }
    .icon-btn {
      font-size: 30px;
      padding: 5px;
    }
    .text {
      .desc {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
.fixed-btn {
  margin-top: -1px;
  border-radius: 0 0 $--border-radius-base $--border-radius-base;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  // right: 15px;
  // bottom: 180px;
  // position: fixed;
  width: 40px;
  padding: 10px 0;
  border: 1px solid $--border-color;
  background: rgba(255, 255, 255, 0.6);
  &:hover {
    background: #fff;
  }
  & > img {
    width: 70%;
  }
  & > .text-vertical {
    font-size: 15px;
    margin-top: 10px;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
}
</style>
