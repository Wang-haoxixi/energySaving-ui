<template>
  <div>
    <div class="head">
      <h1>帮助中心</h1>
    </div>
    <div class="search-box">
      <el-input placeholder="请输入关键字" v-model="searchData" class="input-with-select" clearable></el-input>
      <el-button class="iep-btn-l" type="primary" @click="handleSubmit">搜索</el-button>
    </div>
    <div class="iframe">
      <div class="content">
        <menuTpl class="left" @load_page="loadPage"></menuTpl>
        <contentTpl class="right" ref="content"></contentTpl>
      </div>
    </div>
  </div>
</template>

<script>
import menuTpl from "./menu";
import contentTpl from "./content";
export default {
  components: { menuTpl, contentTpl },
  data() {
    return {
      searchData: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["content"].searchForm(this.searchData);
    },
    loadPage(row) {
      this.$refs["content"].searchData(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  padding-top: 40px;
  height: 100px;
  background-image: url(/img/banner/help_bg.jpg);
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  h1 {
    font-size: 22px;
  }
}
.search-box {
  position: relative;
  width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: $--background-color 0px 2px 12px 0px;
  padding: 20px;
  margin: -40px auto 30px;
  border-radius: 10px;
  box-sizing: border-box;
  .input-with-select {
    width: 670px;
    ::v-deep .el-input__inner {
      border-radius: 10px;
      &:hover {
        box-shadow: 0 2px 12px 0 $--background-color;
      }
    }
  }
  .el-button {
    margin-left: 10px;
  }
}
.iframe {
  // height: 100%;
  margin: 0 auto;
  width: 1200px;
  .content {
    display: flex;
    padding: 20px 20px 40px;
    height: calc(100% - 184px);
    background-color: #fff;
    .left {
      margin-right: 40px;
      padding-left: 0;
      width: 200px;
      min-height: 600px;
      height: 100%;
    }
    .right {
      flex: 1;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid $--border-color;
    }
  }
}
</style>