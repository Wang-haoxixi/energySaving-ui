<template>
  <div class="content-wrapper">
    <DivContentALLItem v-for="item of menuList" isAll :key="item.id" :menuListItem="item"></DivContentALLItem>
  </div>
</template>
<script>
import DivContentALLItem from "./contentAllItem";
export default {
  data() {
    return {};
  },
  props: {
    isAll: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    DivContentALLItem,
  },
};
</script>