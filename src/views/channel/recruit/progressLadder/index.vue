<template>
  <div class="body">
    <!-- 头部banner图 -->
    <el-carousel indicator-position="outside" class="banner">
      <el-carousel-item v-for="item in adList" :key="item.adId">
        <iep-img :src="item.imageUrl" class="img" @click.native="handleDetail(item)"></iep-img>
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <FileTree class="file" ref="file" @load-data="loadData"></FileTree>
      <table-tpl class="table" ref="table"></table-tpl>
    </div>
  </div>
</template>
<script>
import FileTree from "./file";
import TableTpl from "./table";
import { getInfoAdList } from "@/api/conm/ad_controller";
export default {
  components: { FileTree, TableTpl },
  data() {
    return {
      adList: [],
    };
  },
  methods: {
    loadData(id) {
      this.$refs.table.searchData({ materialLevelId: id });
    },
    getAdvertisement() {
      getInfoAdList("pc_recruit_ladder").then(({ data }) => {
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
    height: 350px;
    .img {
      background-image: url("/img/banner/rwbanner.png");
      height: 280px;
      width: 100%;
      cursor: pointer;
    }
  }
  .content {
    width: 1200px;
    margin: auto;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    .file {
      width: 200px;
      margin-right: 20px;
    }
    .table {
      width: calc(100% - 220px);
    }
  }
}
</style>
