<template>
  <iep-basic-container class="examine-container">
    <div class="ques-edit-container">
      <div-view :isHeader="true" :isFooter="false" :disabled="disabled" ref="view"></div-view>
    </div>
  </iep-basic-container>
</template>
<script>
import DivView from "@/views/qms/questionnaire/manage/dialog/view";

export default {
  props: {
    data: {
      default: () => {},
    },
  },
  components: {
    DivView,
  },
  data() {
    return {
      disabled: true,
    };
  },
  mounted() {
    // console.log("data: ", this.data);
    this.$refs.view.data = this.data;
  },
};
</script>
<style lang="scss" scoped>
.ques-edit-container {
  background-color: #fff;
  width: 100%;
  padding: 20px 30px;
  margin: 0 auto;
}
</style>
