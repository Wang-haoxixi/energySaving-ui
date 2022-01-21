<template>
  <div class="service-counter">
    <h4>全方位的服务</h4>
    <div class="service-six">
      <div class="service-list" v-for="(item,index) in dataList" :key="index">
        <div class="img">
          <img :src="item.img" alt />
        </div>
        <span>{{item.name}}</span>
        <p>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          img: "/img/about/icon1.png",
          name: "任务日历",
          desc: "轻松记录大小任务，让工作与生活从此变得简单",
        },
        {
          img: "/img/about/icon2.png",
          name: "任务优先",
          desc: "拖拽一下，让每一个任务找到它的时间归属",
        },
        {
          img: "/img/about/icon3.png",
          name: "任务管控",
          desc: "实时追踪任务进度，让合作更高效",
        },
        {
          img: "/img/about/icon4.png",
          name: "组织协作",
          desc: "跨越传统组织，以协作成就新组织方式",
        },
        {
          img: "/img/about/icon5.png",
          name: "智慧组织",
          desc: "数据化、动态化，任务驱动组织创新再造",
        },
        {
          img: "/img/about/icon6.png",
          name: "组织转型",
          desc: "数据化资产、智能化分析、标准化模板、电子化业务",
        },
        {
          img: "/img/about/icon7.png",
          name: "智能办公",
          desc: "全流程支撑、自动化关联、精准性推送、个性化配置",
        },
        {
          img: "/img/about/icon8.png",
          name: "数据投放",
          desc: "无感知采集、通用化模型、高效能处理、智能化分析",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.service-counter {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  h4 {
    margin-bottom: 80px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-family: "微软雅黑";
    text-align: center;
    font-size: 34px;
    letter-spacing: 2px;
    color: $--color-text-primary;
  }
  .service-six {
    display: grid;
    grid-auto-flow: row dense;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .service-list {
      padding: 10px;
      text-align: center;
      transition: all 0.3s;
      &:nth-of-type(1) .img,
      &:nth-of-type(2) .img,
      &:nth-of-type(5) .img,
      &:nth-of-type(4) .img {
        align-items: flex-end;
      }

      &:nth-of-type(5) img,
      &:nth-of-type(6) img {
        width: 70% !important;
      }
      &:nth-of-type(1) img,
      &:nth-of-type(4) img {
        width: 95% !important;
      }
      &:hover {
        transform: translateY(-10px);
        .img {
          transform: scale(1.1);
          transition: all 0.3s;
        }
      }
      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: $--background-color;
        overflow: hidden;
        img {
          width: 98%;
        }
      }
      span {
        display: block;
        margin-top: 20px;
        font-size: 20px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      p {
        margin: 10px auto;
        width: 80%;
        font-size: 15px;
        color: $--color-text-secondary;
      }
    }
  }
}
</style>
