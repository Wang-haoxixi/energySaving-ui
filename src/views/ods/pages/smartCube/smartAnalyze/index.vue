<template>
  <div>
    <iep-basic-container>
      <div class="know_padding">
        <h1 class="title">
          <span class="title-font">智能分析</span>
        </h1>
        <div>
          <h2 class="h2-font">
            告别重复劳动力   <span style="margin-left: 20px;">人人都是数据达人</span>
          </h2>
        </div>
      </div>
      <el-row :gutter="20">
        <div class="analyze_bg">
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg1.png">
            </span>
            <span class="analyze_content">
              <h2>一站式数据管理和分析平台</h2>
              <p>从数据接入整合,到数据处理、分析、挖掘,再到多终端可视化,对数据进行全价值链管理</p>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg2.png">
            </span>
            <span class="analyze_content">
              <h2>全方位数据接入</h2>
              <p>从内部数据,到各种saas应用、互联网平台、再到需要监控的各类外部数据,上百种数据源、一键对接</p>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg3.png">
            </span>
            <span class="analyze_content">
              <h2>拖拽完成数据处理</h2>
              <p>数据处理不在需求求助于程序员和数据分析师,简单拖拽即可通过数据获得业务洞察,业务人员也能自助分析数据</p>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg4.png">
            </span>
            <span class="analyze_content">
              <h2>拖拽生成酷炫图表</h2>
              <p>几十种实用酷炫的可视化图表,只需拖拽维度(X轴)和数值(Y轴)即可实时生成</p>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg5.png">
            </span>
            <span class="analyze_content">
              <h2>灵活的多维度分析</h2>
              <p>灵活实时的多维度分析,支持数据多层级下钻,让你从各切面了解业务数据,一目了然看出变化和问题</p>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="analyze_padding">
            <span class="analyze_title">
              <img src="./pic/pg6.png">
            </span>
            <span class="analyze_content">
              <h2>图表数据实时更新</h2>
              <p>原始数据更新,图表随之更新。例行的周报月报,只需更新数据,即可迅速完成报表,工作效率成倍提升。</p>
            </span>
          </div>
        </el-col>
        </div>
      </el-row>
    </iep-basic-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.analyze_bg {
  background-image: url(./pic/bg-znfx.png);
  height: 700px;
  background-repeat: no-repeat;
  background-position: center;
}
.title {
  text-align: center;
  .title-font {
    font-size: 25px;
    font-weight: 500;
  }
}
.h2-font {
  width: 70%;
  text-align: center;
  margin: 0 auto 20px auto;
}
.analyze_title {
  display:inline-block;
  background: #f0f1f5;
  border-radius: 45px;
  width: 80px;
  height: 80px;
  img {
    width: 50px;
    margin:20px 15px;
  }
}
.analyze_padding {
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 0;
  min-height: 120px;
  p {
    margin: 0;
  }
  .analyze_content {
    width: 60%;
  }
}
</style>