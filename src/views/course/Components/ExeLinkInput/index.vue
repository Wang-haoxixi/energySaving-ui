<template>
  <div style="width: 100%;">
    <el-input
      :value="exerciseName"
      placeholder="点击选择练习"
      clearable
      @clear="handleClear()"
      @focus="handleFocus()"
    ></el-input>
    <ExeDialog ref="ExeDialog" :infoId="infoId" :id="value.id" @dialog-select="dialogSelect"></ExeDialog>
  </div>
</template>
<script>
import ExeDialog from "./exeDialog.vue";
export default {
  name: "ExeLinkInput",
  components: {
    ExeDialog,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    infoId: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    exerciseId: {
      set(val) {
        const { value } = this;
        value.exerciseId = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.exerciseId;
      },
    },
    exerciseName: {
      set(val) {
        const { value } = this;
        value.exerciseName = val;
        this.$emit("input", value);
      },
      get() {
        return this.value.exerciseName;
      },
    },
  },
  methods: {
    dialogSelect(val) {
      this.exerciseId = val.id;
      this.exerciseName = val.examName;
    },
    handleClear() {
      this.exerciseId = null;
      this.exerciseName = "";
    },
    handleFocus() {
      this.$refs["ExeDialog"].dialogShow = true;
      this.$refs["ExeDialog"].load({
        openScope: this.value.openScope,
        current: 1,
      });
    },
  },
};
</script>
