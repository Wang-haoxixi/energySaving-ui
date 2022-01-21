<template>
  <div class="end-wrapper">
    <div class="end-inner">
      <img src="/img/front/ques_success.png" alt="问卷提交成功" />
      <p>
        <!-- {{data.optionList[0].name || '答卷成功，感谢您的帮助与支持！'}} -->
        {{endMessage.content&&`答卷成功，${endMessage.content}` ||endMessage.participateText|| '答卷成功，感谢您的帮助与支持！'}}
      </p>
      <div class="btn-wrapper" v-if="isTourist">
        <el-button type="primary" @click="goTo" class="btn">前往登录</el-button>
      </div>
      <div class="btn-wrapper" v-else>
        <el-button type="primary" @click="open" class="btn">查看分析报告</el-button>
        <!-- <el-button type="primary" plain @click="onTo" class="btn">返回问卷频道页</el-button> -->
      </div>
    </div>
    <!-- 分析报告 -->
    <dialog-analysis ref="dialogAnalysis"></dialog-analysis>
  </div>
</template>
<script>
import DialogAnalysis from "@/views/qms/questionnaire/manage/dialog/analysis/dialog";
export default {
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
    endMessage: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isTourist: true,
    };
  },
  components: {
    DialogAnalysis,
  },
  methods: {
    open() {
      const id = this.$route.params.id;
      this.$nextTick(() => {
        this.$refs.dialogAnalysis.open({ id });
      });
    },
    onTo() {
      this.$router.push("/channel/questionnaire");
    },
    goTo() {
      this.$router.push("/login");
    },
  },
  mounted() {
    if (this.$storage.get("SET_ACCESS_TOKEN")) {
      this.isTourist = false;
    } else {
      this.isTourist = true;
    }
  },
};
</script>
<style lang="scss" scoped>
.end-wrapper {
  // height: 60vh;
  // display: flex;
  // align-items: center;
  display: flex;
  align-items: center;
  min-height: 80vh;
  .end-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #e6a23c;
    // width: 100%;
    text-align: center;
  }
}
.btn {
  font-size: 16px;
  height: 45px;
  width: 140px;
  margin: 10px 20px;
}
</style>
