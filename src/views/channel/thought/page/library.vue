<template>
  <div class="library">
    <div class="items" v-for="(item, index) in thoughtList" :key="index">
      <ThoughtColumn :data="item" @fresh-right="freshRight" @load-page="loadPage"></ThoughtColumn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ThoughtColumn from "./column";

export default {
  components: { ThoughtColumn },
  props: {
    dataList: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      activeIndex: -1,
      thoughtList: [],
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
    freshRight(val) {
      this.$emit("fresh-right", val);
    },
  },
  watch: {
    dataList: {
      handler(val) {
        this.thoughtList = [];
        this.$nextTick(() => {
          this.thoughtList = [...val];
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.library {
  margin-top: 20px;
}
</style>
