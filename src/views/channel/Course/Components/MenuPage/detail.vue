<template>
  <IepJoditRead :value="content"></IepJoditRead>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
