<template>
  <div>
    <iep-page-header :title="title" :backOption="backOption">
      <el-switch v-model="isOpen" active-color="#13ce66" inactive-text="项目赋能" style="width:140px;"></el-switch>
    </iep-page-header>
    <div class="main">
      <slot name="left"></slot>
      <div class="right" :class="isOpen?'open':''" v-if="isOpen">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepEmpowerment",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    backOption: {
      type: Object,
      default: () => {
        return {
          isBack: false,
          backPath: "",
          backFunction: () => {},
        };
      },
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    isOpen: {
      get: function() {
        return this.value;
      },
      set: function(event) {
        this.$emit("input", event);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  border-top: 1px solid $--border-color;
  padding-top: 20px;
  font-size: 14px;
  .right {
    width: 0;
    transition: width 0.8s;
    padding-left: 20px;
    // border-left: 1px solid $--border-color;
  }
  .open {
    width: 25%;
    transition: width 0.8s;
  }
}
</style>