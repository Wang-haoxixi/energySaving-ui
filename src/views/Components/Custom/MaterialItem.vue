<template>
  <div class="material-box">
    <h5
      :class="{isComplex}"
      @click="$openPage(`/my/index/material/${value.id}`)"
      :title="value.materialName"
    >
      <span class="iep-ellipsis-flex">{{value.materialName}}</span>
      <i class="iconfont el-icon-woneng-qian" v-if="value.downloadCost > 0"></i>
    </h5>
    <p class="iep-ellipsis-flex">{{value.materialIntro}}</p>
    <div class="opt">
      <div class="person" v-if="!noCreator">
        <span>发布人：{{value.realName}}</span>
        <iep-popover-user-card :user-id="value.userId">
          <i class="el-icon-woneng-ren-ziliao1" title="点击查看名片"></i>
        </iep-popover-user-card>
      </div>
      <span class="time">发布时间：{{value.createTime|parseToDay}}</span>
      <div class="tag-list">
        <el-tag type="info" size="small" v-for="item in value.tag" :key="item">{{item}}</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepMaterialItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
    noCreator: {
      type: Boolean,
      default: false,
    },
    isComplex: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.material-box {
  margin-top: -5px;
  h5 {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 24px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    &:hover {
      color: $--color-primary;
    }
    &.isComplex {
      font-size: 16px;
    }
    span {
      max-width: 90%;
    }
    i {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 20px;
      color: $--color-text-secondary;
    }
  }
  p {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 24px;
    color: $--color-text-regular;
  }
  .opt {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 25px;
    span {
      margin-right: 20px;
      font-size: 14px;
      line-height: 24px;
      color: $--color-text-secondary;
      &:nth-child(1) {
        margin-right: 5px;
      }
    }
    .tag-list {
      margin-bottom: -10px;
    }
    .el-tag {
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: $--color-text-regular;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  i[class^="el-icon-"] {
    cursor: pointer;
  }
}
</style>
