<template>
  <div class="tag-data-box">
    <el-row :gutter="20">
      <el-col :md="8" :xs="24" :sm="12" v-for="(item,index) in option" :key="index">
        <div class="item">
          <div class="item-icon" :style="{backgroundColor:item.color}">
            <i :class="item.icon"></i>
          </div>
          <div class="item-info">
            <div :style="{color:item.color}" class="title">{{item.count}}</div>
            <div class="info">{{item.title}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTagStatistics } from "@/api/tms/statistics";
export default {
  name: "SummaryWrapper",
  data() {
    return {
      option: {
        app: {
          title: "应用系统",
          count: 0,
          icon: "el-icon-mobile",
          color: "rgb(56, 161, 242)",
        },
        sum: {
          title: "标签总量",
          count: 0,
          icon: "el-icon-pie-chart",
          color: "rgb(49, 180, 141)",
        },
        newWeek: {
          title: "本周新增",
          count: 0,
          icon: "el-icon-folder-add",
          color: "rgb(117, 56, 199)",
        },
      },
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const data = await getTagStatistics();
      for (const key in this.option) {
        if (Object.prototype.hasOwnProperty.call(this.option, key)) {
          const element = this.option[key];
          element.count = data[key] || 0;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-data-box {
  .item {
    display: flex;
  }
  .item-icon {
    display: flex;
    width: 100px;
    height: 100px;
    color: #fff;
    text-align: center;
    line-height: 100px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    i {
      font-size: 48px !important;
    }
  }
  .item-info {
    display: flex;
    border-left: none;
    background-color: #fff;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    .title {
      font-size: 30px;
      line-height: 40px;
      text-align: center;
    }
    .info {
      color: $--color-text-secondary;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
