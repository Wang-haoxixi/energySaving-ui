<template>
  <!-- 关联元素 -->
  <div class="attach" v-if="data.attach" @click.stop="handleAttach(data.attach)">
    <div class="icon">
      <i
        v-if="attachList[data.attach.type]"
        :class="[attachList[data.attach.type].icon]"
        :style="`color: ${attachList[data.attach.type].color}`"
      ></i>
    </div>
    <div class="attach-item">
      <h3 v-if="attachList[data.attach.type]">{{attachList[data.attach.type].name}}</h3>
      <div class="item">{{data.attach.title}}</div>
    </div>
  </div>
</template>
<script>
import { attachList } from "./options";
export default {
  props: ["data"],
  data() {
    return {
      attachList,
    };
  },
  methods: {
    handleAttach(row) {
      this.$openPage(attachList[row.type].link + row.relationId, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.attach {
  margin: 15px 0;
  padding: 15px;
  border-radius: 15px;
  background-color: $--background-color;
  display: flex;
  cursor: pointer;
  .icon {
    width: 38px;
    height: 38px;
    margin-right: 10px;
    i {
      font-size: 38px;
    }
  }
  .attach-item {
    width: calc(100% - 50px);
    h3 {
      font-size: 14px;
      margin-bottom: 5px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .item {
      font-size: 12px;
      color: $--color-text-regular;
    }
  }
}
</style>
