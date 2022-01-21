<template>
  <div class="so-wrap">
    <div class="so-data-wrapper">
      <iep-page-header class="title" title="组织数据" :backOption="backOption"></iep-page-header>
      <div class="grid-box-1">
        <div class="grid-item">
          <div class="info">组织内新增人数</div>
          <div>
            <div v-for="i of timeTypeList.slice(1)" :key="i.value">
              <span>{{datas.user[i.value]|thousandBitSeparator}}</span>人
              <div>{{i.label}}成员</div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="info">组织总成员</div>
          <div>
            <div class="total">
              <i class="el-icon-woneng-hehuorenguanli"></i>
              <span class="red">{{datas.user.count|thousandBitSeparator}}</span>人
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="info">组织宝贝新增</div>
          <div>
            <div v-for="i of timeTypeList.slice(1)" :key="i.value">
              <span>{{datas.nengbar[i.value]|thousandBitSeparator}}</span>贝
              <div>{{i.label}}宝贝</div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="info">组织宝贝总量</div>
          <div>
            <div class="total">
              <i class="el-icon-woneng-bei"></i>
              <span class="red">{{datas.nengbar.count|thousandBitSeparator}}</span>贝
            </div>
          </div>
        </div>
      </div>
      <div class="grid-box-2">
        <div class="grid-item" v-for="i of soDataTypeList" :key="i.value">
          <div class="head">
            <i :class="i.icon"></i>
            <div>{{i.label}}</div>
          </div>
          <div class="cont">
            <div v-for="m of timeTypeList" :key="i.value+m.value">
              <span>{{datas[i.value][m.value]|thousandBitSeparator}}</span>
              {{m.label}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="style-data-wrapper">
      <div class="title">风采页访问数据</div>
      <div class="content">
        <iep-charts class="echarts" :options="options" autoresize></iep-charts>
        <el-card :body-style="{width:'250px',padding:'30px 40px'}">
          <div class="visit" v-for="i of visitTypeList" :key="'visit'+i.value">
            <div>
              <span class="item-marker" :style="{backgroundColor:'#3080FF',opacity:i.opacity}"></span>
              {{i.label}}
            </div>
            <div>
              <span>访客数：23</span>
              <span>访客量：42</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { getSoData } from "@/api/dms/comprehensive";
import {
  soDataType,
  soDataTypeList,
  timeTypeList,
  visitTypeList,
} from "./options";
export default {
  data() {
    return {
      datas: {
        user: {},
        nengbar: {},
        thought: {},
        task: {},
        product: {},
        questionnaire: {},
      },
      soDataTypeList,
      timeTypeList,
      visitTypeList,
      backOption: {
        isBack: true,
      },
      chartData: {
        xAxis: [
          "2020-08-01",
          "2020-08-02",
          "2020-08-03",
          "2020-08-04",
          "2020-08-05",
          "2020-08-06",
          "2020-08-07",
        ],
        yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    options() {
      return {
        grid: {
          top: "10px",
          left: "10px",
          right: "10px",
          bottom: "10px",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: ({ name, marker, data }) => {
            return [name, marker + data].join("<br/>");
          },
        },
        xAxis: {
          type: "category",
          data: this.chartData.xAxis,
          axisLabel: {
            formatter: (v) => {
              return v
                .split("-")
                .slice(1)
                .map((m) => +m)
                .join(".");
            },
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            smooth: false,
            data: this.chartData.yAxis,
            type: "line",
          },
        ],
      };
    },
  },
  methods: {
    async loadPage() {
      const { data } = await getSoData(this.id);
      if (data) {
        data.forEach((item) => {
          this.datas[soDataType[item.soDataType]] = item;
        });
      }
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
div[class$="data-wrapper"] {
  background: none;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  padding: 20px;
}
.so-wrap {
  display: grid;
  grid-template-rows: fit fit;
  row-gap: 20px;
  .title {
    margin-bottom: 30px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    font-size: 18px;
  }
  .grid-box-1 {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    gap: 30px 20px;
    margin-bottom: 20px;
    .grid-item {
      position: relative;
      border-radius: $--border-radius-base;
      border: 1px solid $--border-color;
      line-height: 32px;
      font-size: 14px;
      padding: 20px 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      .info {
        position: absolute;
        top: -16px;
        padding: 0 10px;
        font-family: "微软雅黑";
        background-color: #fff;
        color: $--color-text-primary;
        font-size: 16px;
      }
      & > div:nth-child(2) {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          font-size: 18px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
          margin-right: 4px;
        }
      }
      .total {
        color: $--color-primary;
        i {
          font-size: 24px;
          color: $--color-input-regular;
          vertical-align: -4px;
        }
        .red {
          color: $--color-primary;
          margin: 0 5px;
        }
      }
    }
  }

  .grid-box-2 {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    .grid-item {
      border-radius: $--border-radius-base;
      border: 1px solid $--border-color;
      overflow: hidden;
      display: flex;
      .head {
        padding: 20px 30px;
        background: $--background-color;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
          font-size: 20px;
        }
        div {
          margin-top: 5px;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          right: -5px;
          top: 34px;
          background: $--background-color;
          height: 20px;
          width: 20px;
          transform: rotate(45deg);
        }
      }
      .cont {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        & > div {
          font-size: 14px;
          text-align: center;
          span {
            font-size: 18px;
            font-family: "微软雅黑";
            color: $--color-text-primary;
            display: block;
          }
        }
      }
    }
  }
  .style-data-wrapper {
    height: 300px;
    .content {
      height: calc(100% - 57px);
      display: flex;
      .echarts {
        flex: 1;
        height: 100%;
        margin-right: 20px;
      }
      .visit {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        & > div:nth-child(1) {
          display: flex;
          align-items: center;
          font-size: 14px;
          .item-marker {
            display: block;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            margin-right: 5px;
          }
          margin-bottom: 5px;
        }
        & > div:nth-child(2) {
          margin-left: 10px;
          font-size: 14px;
          color: $--color-text-secondary;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
}
</style>