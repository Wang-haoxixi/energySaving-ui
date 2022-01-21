<template>
  <div>
    <iep-no-data v-if="!value.length" complex style="width:100%;"></iep-no-data>
    <div v-else class="list-wrapper">
      <div v-for="(item) in value" :key="item.id" @click="goTo(item)" class="list-box">
        <div class="top iep-ellipsis">
          <span>{{item.name}}</span>
        </div>
        <div class="bottom">
          <span>
            <i class="el-icon-woneng-shijian"></i>
            <span>{{item.startTime|parseToDay}} 至 {{item.endTime|parseToDay}}</span>
          </span>
          <span v-if="item.city||item.field">
            <i class="el-icon-woneng-zuobiao"></i>
            <span class="iep-ellipsis">{{item.city}} {{item.field}}</span>
          </span>
        </div>
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
  methods: {
    goTo({ id }) {
      this.$router.push({ path: `/channel/activity/detail/${id}` });
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
      margin-bottom: 10px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .bottom {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $--color-input-regular;
      i {
        font-size: 14px;
      }
      & > span {
        margin-right: 10px;
        &:first-child {
          width: 170px;
        }
        &:last-child {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > span {
          margin-left: 3px;
        }
      }
    }
    &:hover {
      .top {
        color: $--color-primary;
      }
    }
  }
}
</style>