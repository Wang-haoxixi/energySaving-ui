<template>
  <div class="ques-footer">
    <el-button @click="report" :loading="loading" v-if="$storage.get('SET_ACCESS_TOKEN')">举报</el-button>
    <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    report() {
      this.openReportDialog({ id: +this.$route.params.id, type: 12 });
    },
  },
};
</script>
<style lang="scss" scoped>
.ques-footer {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
  text-align: right;
}
</style>