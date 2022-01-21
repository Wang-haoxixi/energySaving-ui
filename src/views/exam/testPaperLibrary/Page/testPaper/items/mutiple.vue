<template>
  <div class="questionItemMutiple">
    <div class="itemTitle">
      {{itemData.index+1}}. {{itemData.title}}
      <span
        style="margin-left: 15px;vertical-align: middle;"
        v-if="itemData.titleUrl"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="itemData.titleUrl"
          :preview-src-list="[itemData.titleUrl]"
        ></el-image>
      </span>
    </div>
    <div class="itemValue" v-for="(item,index) of answerList || []" :key="index">
      <el-checkbox style="height:42px;line-height:42px" :value="false" :label="item.key">
        {{item.key}}: {{item.value}}
        <el-image
          v-if="item.optionUrl"
          style="width: 100px; height: 100px"
          :src="item.optionUrl"
          :preview-src-list="[item.optionUrl]"
        ></el-image>
      </el-checkbox>
    </div>
    <div class="answer">答案： {{answer(itemData.answer)}}</div>
    <div class="answer" v-if="checkUse">解析： {{itemData.quesExplain}}</div>
    <div class="hidden" v-if="!checkUse">
      <i class="el-icon-delete curP" @click="handleDelete" v-if="isEdit"></i>
      <i class="el-icon-top curP" @click="handleTop" v-if="index !== 0 && isEdit"></i>
      <i
        class="el-icon-bottom curP"
        @click="handleBottom"
        v-if="index !== leng-1 && leng !== 1 && isEdit"
      ></i>
      <br />
      <el-input-number
        size="small"
        style="margin:10px"
        v-model="itemData.score"
        type="number"
        :step="1"
        step-strictly
        :min="0"
        @input="changeScore"
        :disabled="!isEdit"
      ></el-input-number>
      <span class="unit">分</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    leng: {
      type: Number,
      default: 0,
    },
    itemData: {
      type: Object,
      default: () => {
        return {
          title: "",
          index: 1,
          answerList: [],
          answer: "",
        };
      },
    },
    checkUse: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      enDic: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    };
  },
  computed: {
    answerList() {
      if (this.itemData.options) {
        return JSON.parse(this.itemData.options);
      } else {
        return [];
      }
    },
  },
  methods: {
    changeScore(score) {
      this.$emit("changeScore", score, this.itemData.index);
    },
    answer(row) {
      return JSON.parse(row).join(",");
    },
    handleDelete() {
      this.$emit("handleDelete", this.itemData.index);
    },
    handleTop() {
      this.$emit("handleTop", this.itemData.index);
    },
    handleBottom() {
      this.$emit("handleBottom", this.itemData.index);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
.itemTitle {
  margin-bottom: 15px;
  width: 100%;
  padding-right: 150px;
  box-sizing: border-box;
}
.questionItemMutiple {
  position: relative;
  .answer {
    margin-top: 10px;
    font-size: 13px;
    width: 100%;
    padding-right: 150px;
    box-sizing: border-box;
  }
  .hidden {
    text-align: center;
    position: absolute;
    right: -20px;
    top: 10px;
    visibility: hidden;
  }
  &:hover .hidden {
    visibility: visible;
  }
  .curP {
    margin: 0 10px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
  .unit {
    font-size: 14px;
  }
}
</style>
