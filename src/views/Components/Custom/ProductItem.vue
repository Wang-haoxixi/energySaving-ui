<template>
  <div class="product-item" @click="handleToDetail()">
    <div class="top-item">
      <div class="img">
        <iep-img :src="product.imageUrl"></iep-img>
      </div>
      <div class="txt">
        <h4 class="title">
          <span
            class="sub-name iep-ellipsis-flex"
            :style="{fontSize:isComplex?'16px':'14px'}"
            :title="product.name"
          >{{product.name}}</span>
          <el-tag
            v-if="isComplex"
            size="mini"
            type="primary"
            style="margin-left:5px;"
          >{{typeMap[product.type]}}</el-tag>
          <span
            class="official"
            v-if="product.isOfficial==='1'"
            :class="{textBox:isText}"
            title="官方认证"
          >
            <i class="el-icon-woneng-icon_guanfang"></i>
            <span v-if="isText">官方认证</span>
          </span>
        </h4>
        <span
          class="sub iep-ellipsis-2-flex"
          :class="{isComplex}"
          :title="product.synopsis"
        >{{product.synopsis}}</span>
        <iep-tag-read class="tag" v-if="isComplex" :value="product.tagKeywords"></iep-tag-read>
      </div>
    </div>
  </div>
</template>
<script>
import { typeMap } from "@/views/channel/MoFang/options";

export default {
  name: "IepProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
    isText: {
      type: Boolean,
      default: false,
    },
    isComplex: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      typeMap,
    };
  },
  methods: {
    handleToDetail() {
      this.$openPage(`/channel/mo_fang/detail/${this.product.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.product-item {
  cursor: pointer;
  &:hover .top-item .title .sub-name {
    color: $--color-primary;
  }
  &:hover ::v-deep .el-image__inner {
    transition: 0.5s;
    transform: scale(1.1);
  }
  .top-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    width: 80px;
    min-width: 80px;
    height: 80px;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    box-sizing: border-box;
  }
  .txt {
    // min-width: 460px;
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 14px;
      .sub-name {
        display: inline-block;
        max-width: 400px;
        font-family: "微软雅黑";
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: $--color-text-primary;
      }
    }
    .sub {
      height: 48px;
      font-size: 14px;
      line-height: 24px;
      color: $--color-text-regular;
      &.isComplex {
        -webkit-line-clamp: 1;
        height: 24px;
      }
    }
    .tag {
      max-width: 500px;
      margin-top: 10px;
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
.product-item ::v-deep .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
.official {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  height: 18px;
  margin-left: 5px;
  span {
    font-size: 14px;
    color: $--color-text-regular;
  }
  i {
    margin-right: 5px;
    font-size: 20px;
    color: $--color-secondary;
  }
}
</style>
