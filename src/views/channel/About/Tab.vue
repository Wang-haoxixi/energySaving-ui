<template>
  <div class="tab-container">
    <div class="tab-container-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人中心" name="first">
          <div class="img">
            <iep-img src="/img/about/personalcenter.jpg"></iep-img>
          </div>
        </el-tab-pane>
        <el-tab-pane label="组织赋能台" name="second">
          <div class="img">
            <iep-img src="/img/about/sofnt.jpg"></iep-img>
          </div>
        </el-tab-pane>
        <el-tab-pane label="运营工作台" name="third">
          <div class="img">
            <iep-img src="/img/about/yygzt.jpg"></iep-img>
          </div>
        </el-tab-pane>
        <el-tab-pane label="调查问卷" name="fourth">
          <div class="img">
            <iep-img src="/img/about/dcwj.jpg"></iep-img>
          </div>
        </el-tab-pane>
        <el-tab-pane label="后台表格" name="fifth">
          <div class="img">
            <iep-img src="/img/about/htbg.jpg"></iep-img>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>
<style lang="scss" scoped>
.tab-container {
  background-color: #fffefe;
  &:hover .img {
    box-shadow: 0 2px 16px 0 $--background-color;
    transform: translateY(10px);
  }
}
.tab-container-box {
  margin: 80px auto 40px;
  width: fit-content;
  .img {
    margin: 30px auto;
    width: 70%;
    transition: all 0.3s;
    box-shadow: 0 2px 12px 0 $--background-color;
    &:hover {
      box-shadow: 0 2px 16px 0 $--background-color;
      transform: translateY(-10px);
    }
  }
}
.tab-container-box ::v-deep .el-tabs__nav-wrap::after,
.tab-container-box ::v-deep .el-tabs__active-bar {
  display: none;
}
.tab-container-box ::v-deep .el-tabs__item {
  margin: 0 25px;
  padding: 0;
  width: 156px;
  height: 44px;
  font-size: 20px;
  text-align: center;
  line-height: 44px;
  border-radius: $--border-radius-base;
  transition: all 0.3s;
}
.tab-container-box ::v-deep .el-tabs__item.is-active,
.tab-container-box ::v-deep .el-tabs__item:hover {
  background-color: $--background-color;
}
.tab-container-box ::v-deep .el-tabs__content {
  position: relative;
  height: 600px;
  &::after {
    position: absolute;
    content: "";
    top: 20%;
    left: 0;
    width: 108px;
    height: 347px;
    background-image: url(/img/about/leftcpbg.png);
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  &::before {
    position: absolute;
    content: "";
    top: 20%;
    right: 0;
    width: 218px;
    height: 293px;
    background-image: url(/img/about/rightcpbg.png);
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
