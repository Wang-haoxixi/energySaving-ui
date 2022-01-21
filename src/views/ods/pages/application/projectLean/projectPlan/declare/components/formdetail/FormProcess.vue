<template>
  <div class="step-box">
    <el-steps direction="vertical" :active="1">
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :icon="step.icon"
        :title="step.title"
        :description="step.description"
      >
        <template v-slot:icon>
          <div class="icon-box" :style="getColor">
            <i class="iconfont" :class="step.icon"></i>
          </div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default() {
        return [];
      },
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  computed: {
    getColor() {
      return {
        backgroundColor: this.$store.getters.theme,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.step-box {
  .icon-box {
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
  }
}
</style>
