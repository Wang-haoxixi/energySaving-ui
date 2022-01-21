<template>
  <div class="confirm-background">
    <ConfirmProduct v-if="id.type===1"></ConfirmProduct>
    <ConfirmActivity v-else-if="id.type===2"></ConfirmActivity>
    <ConfirmCourse v-else-if="id.type===3"></ConfirmCourse>
  </div>
</template>
<script>
import ConfirmProduct from "./Components/ConfirmProduct";
import ConfirmActivity from "./Components/ConfirmActivity";
import ConfirmCourse from "./Components/ConfirmCourse";
import { decodeOrderId } from "@/util/util";
export default {
  components: {
    ConfirmProduct,
    ConfirmActivity,
    ConfirmCourse,
  },
  computed: {
    id() {
      return decodeOrderId(this.$route.params.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.confirm-background {
  background-color: $--background-color;
}
</style>
