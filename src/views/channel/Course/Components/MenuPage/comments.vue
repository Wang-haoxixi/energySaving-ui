<template>
  <div v-if="id">
    <CommonComment type="course" :id="id" :canComment="canComment"></CommonComment>
  </div>
</template>
<script>
export default {
  props: ["id", "canComment"],
};
</script>
