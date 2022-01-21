<template>
  <iep-dialog :dialog-show="show" title="插入题目" width="50%" @close="close">
    <div class="question-wrapper">
      <div class="item">
        <p class="title">选择题</p>
        <div class="body">
          <p
            class="text"
            v-for="item in selectData"
            :key="item.type"
            @click="addSubject(item)"
          >{{item.name}}</p>
        </div>
      </div>
      <div class="item">
        <p class="title">填空题</p>
        <div class="body">
          <p
            class="text"
            v-for="item in inputData"
            :key="item.type"
            @click="addSubject(item)"
          >{{item.name}}</p>
        </div>
      </div>
      <div class="item">
        <p class="title">其他</p>
        <div class="body">
          <template v-for="item in otherData">
            <p class="text" :key="item.type" @click="addSubject(item)">{{item.name}}</p>
          </template>
        </div>
      </div>
    </div>
  </iep-dialog>
</template>
<script>
import { selectData, inputData, otherData } from "../const/base";
export default {
  data() {
    return {
      selectData,
      inputData,
      otherData,
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    addSubject(item) {
      this.$emit("pushQuestion", item);
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.question-wrapper {
  .item {
    .title {
      font-size: 20px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      font-weight: 700;
      margin-top: 10px;
    }
    .body {
      .text {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>