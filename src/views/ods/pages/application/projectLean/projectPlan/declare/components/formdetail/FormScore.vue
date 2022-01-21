<template>
  <div style="padding: 15px 20% 25px;">
    <h2 style="color: rgb(54, 117, 170);">专业评分</h2>
    <div v-for="(item,idx) in formData" :key="idx">
      <div class="rate">
        <div style="margin: 5px 0px;">项目预审阶段专业评分({{item.score}}分)</div>
        <div class="rateBow">
          <div class="bowContent" :style="`width: ${item.score}%;`">{{item.score}}/100</div>
        </div>
        <div>
          <span>建议资金:{{item.num}} (万元),</span>
          <span>评审意见:{{item.option}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    temp: {
      type: Object,
      default: () => {},
    },
    state: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      widthScore: 86.18,
      formData: [
        {
          score: 86.16,
          num: 10,
          option: 1111,
        },
        {
          score: 26.11,
          num: 80,
          option: 971,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.rate {
  border: 1px solid #f5f5f5;
  padding: 10px 15px;
  font-weight: bold;
  .rateBow {
    margin: 5px 0 18px 0;
    height: 25px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    background-color: #f5f5f5;
    .bowContent {
      background-color: #f8ac59;
      border-radius: 3px;
      line-height: 25px;
    }
  }
}
</style>
