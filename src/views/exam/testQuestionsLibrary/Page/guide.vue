<template>
  <div>
    <iep-page-header :backOption="backOption" :title="``"></iep-page-header>
    <h1 class="title">考试使用指南</h1>
    <hr />
    <div class="text">简单3步，即可轻松考试</div>
    <iep-img src="/img/exam/pg1.png" />
    <div class="text">一、新建试题</div>
    <div class="text-small">进入题库管理页面，点击【新增】按钮，根据页面填写试题信息，支持批量导入</div>
    <iep-img src="/img/exam/pg2.png" style="width: 80%" />
    <div class="text">二、新建试卷</div>
    <div class="text-small">进入试卷管理页面，点击【新增】按钮</div>
    <iep-img src="/img/exam/pg3.png" />
    <div class="text-small">点击【添加题型】按钮,弹出试题选择页面</div>
    <iep-img src="/img/exam/pg4.png" />
    <div class="text-small">选择题型和分类，点【下一步】按钮，选择试题</div>
    <iep-img src="/img/exam/pg5.png" />
    <div class="text-small">选择后如图</div>
    <iep-img src="/img/exam/pg6.png" style="width: 80%" />
    <div class="text">三、新建考试</div>
    <div class="text-small">进入考试列表页面，点击【新增】按钮，创建考试</div>
    <iep-img src="/img/exam/pg7.png" style="width: 80%" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    };
  },
  methods: {
    /**
     * 返回
     */
    handleGoBack() {
      this.$emit("onGoBack");
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 24px;
}
.text {
  font-size: 18px;
}
.text-small {
  padding: 10px 0px;
}
.iep-image {
  justify-content: flex-start;
}
</style>