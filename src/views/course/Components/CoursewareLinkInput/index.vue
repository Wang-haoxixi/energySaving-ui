<template>
  <div style="width: 100%;">
    <el-input
      :value="wareName"
      placeholder="点击选择课程"
      clearable
      @clear="handleClear()"
      @focus="handleFocus()"
    ></el-input>
    <CoursewareDialog ref="CoursewareDialog" @dialog-select="dialogSelect"></CoursewareDialog>
  </div>
</template>
<script>
import CoursewareDialog from "./coursewareDialog";
export default {
  name: "CoursewareLinkInput",
  components: {
    CoursewareDialog,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coursewareId: {
      set(val) {
        const { value } = this;
        value.coursewareId = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.coursewareId;
      },
    },
    wareName: {
      set(val) {
        const { value } = this;
        value.wareName = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.wareName;
      },
    },
  },
  methods: {
    dialogSelect(val) {
      this.coursewareId = val.id;
      this.wareName = val.wareName;
    },
    handleClear() {
      this.coursewareId = null;
      this.wareName = "";
    },
    handleFocus() {
      this.$refs["CoursewareDialog"].dialogShow = true;
      this.$refs["CoursewareDialog"].load({
        // openScope: this.value.openScope,
        current: 1,
      });
    },
  },
};
</script>
