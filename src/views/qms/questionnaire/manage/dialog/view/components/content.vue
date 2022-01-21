<template>
  <div class="content-wrapper">
    <div v-for="(item,index) in questionData" :key="index">
      <single-election
        class="item"
        v-if="item.type === '1'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
        @changeDisplay="changeDisplay"
      ></single-election>
      <multiple-election
        class="item"
        v-if="item.type === '2'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
        @changeDisplay="changeDisplay"
      ></multiple-election>
      <img-select
        class="item"
        v-if="item.type === '3'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
        @changeDisplay="changeDisplay"
      ></img-select>
      <multiple-img-select
        class="item"
        v-if="item.type === '4'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
        @changeDisplay="changeDisplay"
      ></multiple-img-select>
      <select-election
        class="item"
        v-if="item.type === '5'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
        @changeDisplay="changeDisplay"
      ></select-election>
      <fill-blank
        class="item"
        v-if="item.type === '6'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
      ></fill-blank>
      <multiple-fill-blank
        class="item"
        v-if="item.type === '7'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
      ></multiple-fill-blank>
      <scoring
        class="item"
        v-if="item.type === '8'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
      ></scoring>
      <file-upload
        class="item"
        v-if="item.type === '9'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
      ></file-upload>
      <remarks
        class="item"
        v-if="item.type === '10'"
        :data="item"
        :index="quesIndex(index)"
        :type="statusType"
        :disabled="disabled"
      ></remarks>
      <!-- <concluding class="item" v-if="item.type === '11'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></concluding> -->
    </div>
  </div>
</template>
<script>
import singleElection from "../../../editForm/singleElection";
import multipleElection from "../../../editForm/multipleElection";
import imgSelect from "../../../editForm/imgSelect";
import multipleImgSelect from "../../../editForm/multipleImgSelect";
import selectElection from "../../../editForm/select";
import fillBlank from "../../../editForm/fillBlank";
import multipleFillBlank from "../../../editForm/multipleFillBlank";
import scoring from "../../../editForm/scoring";
import fileUpload from "../../../editForm/fileUpload";
import remarks from "../../../editForm/remarks";
// import concluding from "../../../editForm/concluding";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    statusType: {
      type: String,
      default: "editable",
    },
  },
  components: {
    singleElection,
    multipleElection,
    imgSelect,
    multipleImgSelect,
    selectElection,
    fillBlank,
    multipleFillBlank,
    scoring,
    fileUpload,
    remarks,
    // concluding,
  },
  computed: {
    questionData() {
      return this.data.quesQuestionDTO || [];
    },
  },
  methods: {
    //改变题目的显示与否
    changeDisplay(arr, value) {
      arr.forEach(i => {
        const item = this.questionData.find(m => m.orderNumber === i);
        item && this.$set(item, "isShow", value);
        if (item && value === "2") {
          if (["2", "4", "9"].includes(item.type)) {
            item.answer.value = [];
          } else {
            item.answer = {};
          }
        }
      });
    },
    // 判断前面是否有备注题
    quesIndex(index = 0) {
      let newIndex = +index + 1;
      for (let i = 0; i < index; i++) {
        if (this.questionData[i].type === "10") newIndex -= 1;
        if (this.questionData[i].isShow === "2" && !this.disabled)
          newIndex -= 1;
      }
      return newIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.content-wrapper {
  margin-bottom: 30px;
}
.item {
  margin: 0;
  margin-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>