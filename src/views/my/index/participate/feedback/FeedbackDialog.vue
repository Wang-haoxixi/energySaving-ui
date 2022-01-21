<template>
  <iep-dialog :dialog-show="dialogShow" title="查看纠错" width="600px" @close="_close()">
    <h2>{{data.id}}. {{data.title}}</h2>
    <iep-img
      style="width: 192px;"
      v-if="data.titleUrl"
      :src="data.titleUrl"
      :preview-src-list="[data.titleUrl]"
    ></iep-img>
    <div v-for="item in data.optionsJson" :key="item.key">
      {{item.key}}. {{item.value}}
      <iep-img v-if="item.optionUrl" style="width:100px;" :src="item.optionUrl"></iep-img>
    </div>
    <div class="answer">
      <div>纠错类型: {{dictsMap.type[data.type]}}</div>
      <div>内容说明: {{data.explanation}}</div>
    </div>
  </iep-dialog>
</template>
<script>
import { dictsMap } from "./options";
const initForm = () => {
  return {
    id: "",
    title: "",
    optionsJson: [],
    type: "1",
    explanation: "",
    titleUrl: "",
  };
};
export default {
  data() {
    return {
      dictsMap,
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
