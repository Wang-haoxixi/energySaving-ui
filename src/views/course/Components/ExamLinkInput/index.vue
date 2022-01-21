<template>
  <div style="width: 100%;">
    <el-input
      :value="examName"
      placeholder="点击选择考试"
      clearable
      @clear="handleClear()"
      @focus="handleFocus()"
    ></el-input>
    <ExamDialog ref="ExamDialog" @dialog-select="dialogSelect" :id="id"></ExamDialog>
  </div>
</template>
<script>
import ExamDialog from "./examDialog.vue";
export default {
  name: "ExamLinkInput",
  components: {
    ExamDialog,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  computed: {
    examId: {
      set(val) {
        const { value } = this;
        value.examId = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.examId;
      },
    },
    examName: {
      set(val) {
        const { value } = this;
        value.examName = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.examName;
      },
    },
  },
  methods: {
    dialogSelect(val) {
      this.examId = val.id;
      this.examName = val.examName;
      this.$emit("update-data");
    },
    handleClear() {
      this.examId = null;
      this.examName = "";
      this.$emit("clear-data");
    },
    handleFocus() {
      this.$refs["ExamDialog"].dialogShow = true;
      this.$refs["ExamDialog"].load({
        openScope: this.value.openScope,
        current: 1,
      });
    },
  },
};
</script>
