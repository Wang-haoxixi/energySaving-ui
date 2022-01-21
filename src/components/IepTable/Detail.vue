<template>
  <iep-div-detail-switch :value="row[item.prop]" :nullmsg="item.nullmsg"></iep-div-detail-switch>
</template>
<script>
export default {
  props: ["row", "item"],
};
</script>
