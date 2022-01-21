<template>
  <el-popover
    :trigger="trigger"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    v-bind="$attrs"
    v-on="$listeners"
    @show="loadData()"
  >
    <iep-user-card ref="IepUserCard"></iep-user-card>
    <slot slot="reference"></slot>
  </el-popover>
</template>
<script>
export default {
  name: "IepPopoverUserCard",
  inheritAttrs: false,
  props: {
    openDelay: {
      type: Number,
      default: 250,
    },
    closeDelay: {
      type: Number,
      default: 500,
    },
    trigger: {
      type: String,
      default: "hover",
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    loadData() {
      this.$refs["IepUserCard"].loadUser(this.userId);
    },
  },
};
</script>
