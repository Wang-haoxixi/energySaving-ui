<template>
  <el-popover
    :trigger="trigger"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    v-bind="$attrs"
    v-on="$listeners"
    @show="loadData()"
  >
    <iep-org-card ref="IepOrgCard" style="width:340px"></iep-org-card>
    <slot slot="reference"></slot>
  </el-popover>
</template>
<script>
export default {
  name: "IepPopoverOrgCard",
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
    orgId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    loadData() {
      this.$refs["IepOrgCard"].loadOrg(this.orgId);
    },
  },
};
</script>
