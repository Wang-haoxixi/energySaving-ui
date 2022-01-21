<template>
  <div class="body">
    <!-- 头部banner图 -->
    <el-carousel class="banner">
      <el-carousel-item v-for="item in adList" :key="item.adId">
        <iep-img :src="item.imageUrl" class="img" @click.native="handleDetail(item)"></iep-img>
      </el-carousel-item>
    </el-carousel>
    <!-- 主体 -->
    <div class="content">
      <TaskLeft class="left" ref="left"></TaskLeft>
      <TaskRight class="right" ref="right"></TaskRight>
    </div>
  </div>
</template>
<script>
import TaskLeft from "./taskLeft/index";
import TaskRight from "./taskRight/index";
import { getInfoAdList } from "@/api/conm/ad_controller";

export default {
  components: { TaskLeft, TaskRight },
  data() {
    return {
      adList: [],
    };
  },
  methods: {
    getAdvertisement() {
      getInfoAdList("pc_recruit_hall").then(({ data }) => {
        this.adList = [...data];
      });
    },
    handleDetail(row) {
      if (row.url) this.$openPage(row.url, 2);
    },
  },
  created() {
    // 获取广告
    this.getAdvertisement();
  },
};
</script>
<style lang="scss" scoped>
.body {
  .banner {
    margin-bottom: 40px;
    .img {
      background-image: url("/img/banner/rwbanner.png");
      height: 280px;
      width: 100%;
      cursor: pointer;
    }
  }
  .content {
    margin: 20px auto 40px;
    width: 1200px;
    background-color: #fff;
    display: flex;
    .left {
      width: calc(100% - 320px);
      background-color: #fff;
      margin-right: 20px;
    }
    .right {
      width: 300px;
    }
  }
}
::v-deep .el-carousel__container {
  height: 280px;
  .el-image__inner {
    height: 100%;
  }
}
::v-deep .el-carousel__indicator.is-active button {
  background-color: $--color-input-regular;
}
</style>
