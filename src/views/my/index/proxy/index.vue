<template>
  <iep-basic-container class="router-box">
    <div class="dynamic-wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="proxy">
          <proxy></proxy>
        </el-tab-pane>
        <!-- <el-tab-pane label="记录" name="recording">
            <recording></recording>
        </el-tab-pane>-->
      </el-tabs>
    </div>
  </iep-basic-container>
</template>

<script>
import proxy from "./proxy";
// import recording from "./recording";

export default {
  name: "attention",
  components: {
    proxy,
    // recording
  },
  data() {
    return {
      activeName: "proxy",
      personList: [],
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../router-box";
.dynamic-wrapper {
  padding-top: 0;
  width: 100%;
  height: 100%;
}
.router-box ::v-deep .el-tabs__header {
  display: none;
}
</style>
