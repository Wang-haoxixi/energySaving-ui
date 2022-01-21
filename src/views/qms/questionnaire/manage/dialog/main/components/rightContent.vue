<template>
  <div class="right-content">
    <questionnaire-setting :formData="form" ref="questionnaireSetting"></questionnaire-setting>
    <subject-setting
      :data="data"
      ref="subjectSetting"
      v-on="$listeners"
      @changeQuesData="changeQuesData"
    ></subject-setting>
  </div>
</template>
<script>
import QuestionnaireSetting from "./questionnaireSetting";
import SubjectSetting from "./subjectSetting";
export default {
  components: {
    QuestionnaireSetting,
    SubjectSetting,
  },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    submit() {
      // 未使用参数 row
      return this.$refs.questionnaireSetting.submit();
    },
    getResult() {
      return this.$refs.questionnaireSetting.getResult();
    },
    resetForm() {
      this.$refs.questionnaireSetting.resetForm();
    },
    getQuesData() {
      return this.$refs.subjectSetting.getQuesData();
    },
    changeQuesData(row) {
      this.$emit("changeQuesData", row);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>