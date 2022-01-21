<template>
  <iep-dialog :dialog-show="show" :title="title" width="80%" @close="close">
    <view-header :data="data"></view-header>
    <view-content :data="data" :statusType="statusType" v-loading="loading" :disabled="disabled"></view-content>
    <!-- <template slot="footer">
      <el-button type="danger" @click="submit">保存</el-button>
      <el-button @click="close">取消</el-button>
    </template> -->
  </iep-dialog>
</template>
<script>
import ViewHeader from "./components/header";
import ViewContent from "./components/content";
import currentMixin from "./mixins/index";
export default {
  mixins: [currentMixin],
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: {},
      show: false,
    };
  },
  components: {
    ViewHeader,
    ViewContent,
  },
  methods: {
    open(obj) {
      this.show = true;
      if (typeof obj === "number") {
        this._open(obj);
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
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>