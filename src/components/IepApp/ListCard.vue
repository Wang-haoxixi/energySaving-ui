<template>
  <div class="list">
    <div v-if="dataList.length !== 0">
      <div
        v-for="(item,index) in dataList"
        :key="index"
        class="piece"
        @click="clicked(item)"
      >{{typeof item === 'object' ? item[name] : item}}</div>
      <slot></slot>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
export default {
  name: "IepAppListCard",
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    name: {
      type: String,
      default: "name",
    },
  },
  methods: {
    clicked(item) {
      this.$emit("click", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .piece {
    font-size: 14px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    position: relative;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    transition-duration: 0.3s;
    transition: 0.5s;
    &:nth-child(1) {
      margin-top: -7px;
    }
    &:hover {
      color: $--color-primary;
      &:before {
        background-color: $--color-primary;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      top: 12px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #dcdcdc;
    }
  }
}
</style>
