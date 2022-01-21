<template>
  <el-card class="program-item" shadow="hover">
    <div @click="handleToDetail()">
      <div class="top-item">
        <div class="img">
          <iep-img :resizeOpt="{l:80}" :src="program.imageUrl"></iep-img>
        </div>
        <div class="txt">
          <h4 class="title">
            <span class="sub-name" :title="program.name">{{program.name}}</span>
            <OfficialIcon v-if="program.isOfficial==='1'"></OfficialIcon>
          </h4>
          <span class="sub" :title="program.synopsis">{{program.synopsis}}</span>
        </div>
      </div>
      <div class="relation">
        <div class="relation-program">
          <span class="label">关联产品：</span>
          <span class="no-product" v-if="!program.productList || !program.productList.length">暂无产品</span>
          <span
            class="tag iep-ellipsis-flex"
            v-for="(pdt) in program.productList.slice(0,3)"
            @click.stop="handleToProducts(pdt.id)"
            :title="pdt.name"
            :key="pdt.id"
          >{{pdt.name}}</span>
        </div>
        <div class="subName" :title="program.orgName">{{program.orgName}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import OfficialIcon from "./OfficialIcon";
export default {
  components: {
    OfficialIcon,
  },
  props: {
    program: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleToDetail() {
      this.$openPage(`/channel/mo_fang/detail/${this.program.id}`);
    },
    handleToProducts(id) {
      this.$openPage(`/channel/mo_fang/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.program-item {
  padding: 15px;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  box-sizing: border-box;
  cursor: pointer;
  .top-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
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
    min-width: 460px;
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 16px;
      .sub-name {
        display: inline-block;
        max-width: 400px;
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
      max-width: 450px;
      height: 48px;
      font-size: 14px;
      line-height: 24px;
      color: $--color-text-secondary;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.relation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 14px;
  color: $--color-text-secondary;
  .relation-program {
    display: flex;
    .label {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      &:last-child {
        margin-right: 0;
      }
    }
    .no-product {
      font-size: 14px;
      color: $--color-input-regular;
    }
    .tag {
      max-width: 74px;
      margin-right: 15px;
      font-size: 12px;
      color: $--color-secondary;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .subName {
    min-width: 39%;
    font-size: 14px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: $--color-text-secondary;
  }
}
.program-item ::v-deep .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
</style>
