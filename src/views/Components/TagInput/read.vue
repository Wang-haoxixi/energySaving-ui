<template>
  <iep-div-detail :value="tagString"></iep-div-detail>
</template>
<script>
export default {
  name: "IepTagRead",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tagString() {
      return this.value.join(" / ");
    },
  },
};
</script>
