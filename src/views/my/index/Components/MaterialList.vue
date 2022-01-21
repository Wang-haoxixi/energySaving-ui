<template>
  <div>
    <iep-no-data v-if="!value.length" complex style="width:100%;"></iep-no-data>
    <div v-else class="list-wrapper">
      <div
        v-for="(item) in value"
        :key="item.id"
        @click="$openPage(`/my/index/material/${item.id}`)"
        class="list-box"
      >
        <div class="top">
          <span class="iep-ellipsis">{{item.createUser||"佚名"}}：{{item.materialName}}</span>
          <span>{{item.createTime|parseToDay}}</span>
        </div>
        <div class="bottom iep-ellipsis">{{item.materialIntro.trim()}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MaterialList",
  props: {
    value: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .list-box {
    font-size: 14px;
    color: $--color-text-regular;
    cursor: pointer;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      span:first-child {
        flex: 1;
      }
      span:last-child {
        flex: 0 0 90px;
        width: 70px;
        font-size: 12px;
        text-align: right;
        color: $--color-text-secondary;
      }
    }
    .bottom {
      color: #666769;
    }
    &:hover {
      .bottom,
      .top span:first-child {
        color: $--color-primary;
      }
    }
  }
}
</style>
