<template>
  <div style="width: 100%;">
    <el-input
      :value="lecturerName"
      placeholder="点击选择讲师"
      clearable
      @clear="handleClear()"
      @focus="handleFocus()"
    ></el-input>
    <LecturerDialog ref="LecturerDialog" @dialog-select="dialogSelect"></LecturerDialog>
  </div>
</template>
<script>
import LecturerDialog from "./lecturerDialog";
export default {
  name: "LecturerLinkInput",
  components: {
    LecturerDialog,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lecturerId: {
      set(val) {
        const { value } = this;
        value.lecturerId = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.lecturerId;
      },
    },
    lecturerName: {
      set(val) {
        const { value } = this;
        value.lecturerName = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.lecturerName;
      },
    },
  },
  methods: {
    dialogSelect(val) {
      this.lecturerId = val.id;
      this.lecturerName = val.lecturerName;
    },
    handleClear() {
      this.lecturerId = null;
      this.lecturerName = "";
    },
    handleFocus() {
      this.$refs["LecturerDialog"].dialogShow = true;
      this.$refs["LecturerDialog"].load({
        openScope: this.value.openScope,
        current: 1,
      });
    },
  },
};
</script>
