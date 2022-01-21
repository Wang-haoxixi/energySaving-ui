<template>
  <div class="answer-wrap">
    <div>正确答案: {{item.answer}}</div>
    <div>解释: {{item.quesExplain}}</div>
  </div>
</template>
<script>
export default {
  props: ["item"],
};
</script>
<style lang="scss" scoped>
.answer-wrap {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: #eee;
  border: 1px solid #eee;
}
</style>
