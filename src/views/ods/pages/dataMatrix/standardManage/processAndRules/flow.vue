<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <img src="./pic/flow.png" />
  </div>
</template>
<script>
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
  },
};
</script>