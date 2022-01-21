<template>
  <div class="data-item" :class="{active}">
    <div class="num">{{noData&&!value?'--':value}}</div>
    <div class="name">
      {{label}}
      <IepCardBtn
        v-if="iconUrl"
        :title="value.title"
        icon="el-icon-woneng-youfangxiangshixin"
        @click="$openPage(iconUrl)"
      ></IepCardBtn>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepDataItem",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: [String, Number],
      required: true,
    },
    noData: {
      type: Boolean,
      default: false,
    },
    iconUrl: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.data-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  & > div:nth-of-type(1) {
    margin-bottom: 5px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  & > div:nth-of-type(2) {
    font-size: 14px;
    color: $--color-text-secondary;
    display: flex;
  }
}
.active {
  cursor: pointer;
  &:hover .num,
  &:hover .name {
    color: $--color-primary;
  }
}
</style>
