<template>
  <el-avatar class="avatar-wrapper" @error="errorHandler" v-bind="$attrs" v-on="$listeners">
    <img src="/img/iep/no-logo.png" />
  </el-avatar>
</template>
<script>
export default {
  name: "IepAvatar",
  inheritAttrs: false,
  methods: {
    errorHandler() {
      return true;
    },
  },
};
</script>
