<template>
  <div class="no-data">
    <!-- <i class="el-icon-woneng-icanlogo" v-if="simple"></i> -->
    <template v-if="showImg">
      <div class="image" v-if="complex">
        <img src="/img/default/default-nodata.png" alt />
      </div>
      <div class="image simple" v-else>
        <img src="/img/default/default-nodata1.png" alt />
      </div>
    </template>
    <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  name: "IepNoData",
  props: {
    message: {
      type: String,
      default: "暂无数据",
    },
    complex: {
      type: Boolean,
      default: false,
    },
    showImg: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // i {
  //   font-size: 34px;
  //   margin-right: 10px;
  // }
  .image {
    img {
      height: 100%;
      vertical-align: middle;
      border-style: none;
    }
  }
  .simple {
    width: 80%;
    img {
      width: 100%;
    }
  }
}
</style>
