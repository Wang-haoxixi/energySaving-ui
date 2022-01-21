<template>
  <div class="right">
    <div class="tpl">
      <iep-img src="/img/banner/thought.jpg"></iep-img>
    </div>
    <HottestTpl ref="hottest" class="tpl"></HottestTpl>
    <ExcellentTpl ref="excellent" class="tpl"></ExcellentTpl>
  </div>
</template>

<script>
import HottestTpl from "./hottest";
import ExcellentTpl from "./excellent";
export default {
  components: { HottestTpl, ExcellentTpl },
  methods: {
    loadData() {
      this.$refs["hottest"].loadData();
    },
  },
};
</script>

<style lang="scss" scoped>
.tpl {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
}
</style>
