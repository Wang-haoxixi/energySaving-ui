<template>
  <!-- 预览 -->
  <div class="view-wrapper">
    <div-header v-if="isFooter" @back="close" isBack></div-header>
    <view-header :data="data" v-if="isHeader"></view-header>
    <view-content :data="data" :statusType="statusType" v-loading="loading" :disabled="disabled"></view-content>
    <!-- <view-footer @submit="submit" @close="close" :isSave="false" v-if="isFooter"></view-footer> -->
  </div>
</template>
<script>
import ViewHeader from "./components/header";
import ViewContent from "./components/content";
import DivHeader from "../components/header";
// import ViewFooter from "../components/footer";
import currentMixin from "./mixins/index";
const TYPE = {
  view: "view",
  edit: "edit",
};
export default {
  mixins: [currentMixin],
  components: {
    ViewHeader,
    ViewContent,
    DivHeader,
    // ViewFooter,
  },
  data() {
    return {
      data: {},
      title: TYPE.view,
    };
  },
  watch: {
    type(newVal) {
      this.title =
        newVal === "" || newVal === TYPE.view ? TYPE.view : TYPE.edit;
    },
  },
  methods: {
    open(obj, flag = 1) {
      if (typeof obj === "number") {
        flag ? this._open(obj) : this.getList(obj);
      } else if (Object.prototype.toString.call(obj) === "[object Object]") {
        if (obj.type === "answer") {
          this.getQusAndAnswer(obj.id, obj.batch_no);
        } else {
          this.data = obj;
        }
      }
    },
    close() {
      this.data = {};
      this.$emit("close");
    },
    getResult() {
      return this.data;
    },
    setAnswer(arr) {
      this._setAnswer(arr);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>