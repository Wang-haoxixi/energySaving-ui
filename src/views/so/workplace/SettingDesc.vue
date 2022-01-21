<template>
  <div class="setting-box">
    <div class="setting-item" v-for="item in data" :key="item.name">
      <div class="title">{{item.name}}</div>
      <div class="operation-wrapper">
        <div class="desc">{{item.desc}}</div>
        <div class="operation">
          <template v-if="item.extra">
            <el-button
              class="btn"
              :disabled="item.extraOpt.disabled"
              type="text"
              @click="item.extraOpt.func"
            >{{item.extraOpt.text}}</el-button>
          </template>
          <el-switch
            :value="item.on"
            active-color="#13ce66"
            @change="item.onChange"
            :disabled="item.disabled"
          ></el-switch>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.setting-box {
  width: 100%;
  .title {
    font-size: 15px;
    margin: 5px 0;
  }
  .desc {
    color: $--color-text-secondary;
    font-size: 14px;
  }
  .btn {
    margin-right: 10px;
    &:hover {
      opacity: 0.7;
    }
  }
  .setting-item {
    display: flex;
    flex-direction: column;
    padding: 10px 5px 5px;
  }
  .operation-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
