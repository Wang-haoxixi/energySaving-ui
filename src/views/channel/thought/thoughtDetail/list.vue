<template>
  <div class="library">
    <library ref="library" @load-page="loadPage" :dataList="dataList" :params="params"></library>
  </div>
</template>

<script>
import library from "../library/";
export default {
  components: { library },
  props: {
    dataList: {
      type: Array,
    },
  },
  data() {
    return {
      params: {
        current: 1,
      },
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    loadPage() {
      this.$emit("load-page");
    },
  },
  created() {
    
  },
};
</script>
