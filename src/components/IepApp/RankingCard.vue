<template>
  <div class="ranking">
    <div v-if="dataList.length !== 0">
      <div v-if="isReference">
        <el-popover
          v-for="(item,index) in dataList"
          :key="index"
          placement="right-end"
          title
          :width="width"
          trigger="hover"
          :content="item[name]"
        >
          <div class="piece" @click="handleDetail(item)" slot="reference">
            <span class="count" :class="index==0||index==1||index==2?'red':''">{{index+1}}</span>
            <span class="name">{{item[name]}}</span>
            <span class="grade" :class="index==0||index==1||index==2?'red-color':''">{{item[grade]}}</span>
          </div>
        </el-popover>
      </div>

      <div v-else>
        <div
          class="piece"
          v-for="(item,index) in dataList"
          :key="index"
          @click="handleDetail(item)"
        >
          <span class="count" :class="index==0||index==1||index==2?'red':''">{{index+1}}</span>
          <span class="name">{{item[name]}}</span>
          <span class="grade" :class="index==0||index==1||index==2?'red-color':''">{{item[grade]}}</span>
        </div>
      </div>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
export default {
  name: "IepAppRankingCard",
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
    grade: {
      type: String,
      default: "grade",
    },
    width: {
      default: 300,
    },
    isReference: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDetail(row) {
      this.$emit("click", row);
    },
  },
};
</script>
<style lang="scss" scoped>
.ranking {
  padding: 2px 0;
  .piece {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    transition-duration: 0.3s;
    transition: 0.5s;
    cursor: pointer;
    .name {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60%;
      display: inline-block;
      vertical-align: middle;
    }
    .count {
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-right: 12px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid $--border-color;
      color: $--color-text-secondary;
      display: inline-block;
    }
    .red {
      background-color: $--color-primary;
      background-color: #fff;
      border: 1px solid $--color-primary;
      color: $--color-primary;
    }
    .grade {
      float: right;
      color: $--color-text-secondary;
      width: 68px;
      text-align: right;
    }
    .red-color {
      color: $--color-primary;
    }
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>

