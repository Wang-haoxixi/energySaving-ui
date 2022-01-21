<template>
  <iep-dialog :dialog-show="dialogShow" title="查看错题" width="600px" @close="_close()">
    <h2>{{data.id}}. {{data.title}}</h2>
    <div v-for="item in data.optionsJson" :key="item.key">
      {{item.key}}. {{item.value}}
      <iep-img v-if="item.optionUrl" style="width:100px;" :src="item.optionUrl"></iep-img>
    </div>
    <div class="answer">
      <div>正确答案: {{data.answerJson.join('')}}</div>
      <div>答案解析: {{data.quesExplain}}</div>
    </div>
  </iep-dialog>
</template>
<script>
const initForm = () => {
  return {
    id: "",
    title: "",
    optionsJson: [],
    answerJson: [],
    quesExplain: "",
  };
};
export default {
  data() {
    return {
      dialogShow: false,
      data: initForm(),
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.answer {
  background-color: #eee;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
}
</style>
