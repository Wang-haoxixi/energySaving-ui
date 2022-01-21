<template>
  <el-card class="product-item" shadow="hover" @click.native="handleDetail()">
    <div class="img">
      <iep-img :resizeOpt="{l:150}" :src="product.imageUrl"></iep-img>
    </div>
    <div class="txt">
      <h4 class="title iep-ellipsis-flex">
        <span class="sub-name" :title="product.name">{{product.name}}</span>
        <OfficialIcon v-if="product.isOfficial==='1'"></OfficialIcon>
      </h4>
      <span class="sub" :title="product.synopsis">{{product.synopsis}}</span>
      <div class="info">
        <!-- <el-tag>{{typeMap[product.type]}}</el-tag> -->
        <span>{{typeMap[product.type]}}</span>
        <span>{{product.score}}分</span>
        <span :title="product.viewTimes">{{product.viewTimes}}浏览次数</span>
      </div>
      <template v-if="product.payCurrency==='9'">
        <span class="price">{{product.price}}贝</span>
        <span class="cash">{{product.cash}}元</span>
      </template>
      <template v-if="product.payCurrency==='1'">
        <span class="price">{{product.price}}贝</span>
      </template>
      <template v-if="product.payCurrency==='2'">
        <span class="cash">{{product.cash}}元</span>
      </template>
    </div>
  </el-card>
</template>
<script>
import OfficialIcon from "./OfficialIcon";
import { typeMap } from "../options";
export default {
  components: {
    OfficialIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeMap,
    };
  },
  methods: {
    handleDetail() {
      this.$openPage(`/channel/mo_fang/detail/${this.product.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.product-item {
  padding: 15px;
  height: 326px;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  box-sizing: border-box;
  cursor: pointer;
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
  }
  .txt {
    width: 100%;
    text-align: left;
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 16px;
      line-height: 16px;
      max-width: 150px;
      .sub-name {
        display: inline-block;
        // max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
    }
    .sub {
      margin: 10px 0;
      font-size: 12px;
      line-height: 14px;
      color: $--color-text-secondary;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    overflow: hidden;
    span {
      display: inline-block;
      vertical-align: middle;
      margin: 0 3px;
      font-size: 12px;
      color: $--color-text-secondary;
      &:last-child {
        margin-right: 0;
        // max-width: 68px;
        // width: 50px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-inline-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &:first-child {
        margin-left: 0;
        padding: 0 5px;
        // max-width: 38px;
        // min-width: 38px;
        max-width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: $--color-primary;
        // background: #FEECEB;
        background: $--color-fifth;

        text-overflow: ellipsis;
        display: -webkit-inline-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .price,
  .cash {
    display: block;
    font-size: 14px;
    line-height: 24px;
  }
  .price {
    color: $--color-primary;
  }
  .cash {
    color: $--color-text-secondary;
  }
}

.product-item ::v-deep .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
</style>
