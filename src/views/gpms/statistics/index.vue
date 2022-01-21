<template>
  <div>
    <iep-basic-container>
      <iep-page-header title="项目数据"></iep-page-header>
      <el-tabs class="tab-nav" v-model="infoType" @tab-click="handleClick">
        <el-tab-pane label="我的项目" name="my"></el-tab-pane>
        <el-tab-pane label="全部项目" name="all"></el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col class="location" :span="24" v-if="infoType ==='my'">
          <iep-card :title="'我的定位'">
            <div class="sub-title" v-if="myData.exponent>0">
              您的个人项目(参与度)指数为
              <span class="iep-red" style="font-size:24px;">{{myData.exponent}}</span>
              ！您是一个
              <span class="iep-font-color-2">{{myData.badge}}</span>
              的
              <span class="iep-font-color-2">{{myData.dignity}}</span>
              ，尤其擅长
              <span class="iep-font-color-2">{{myData.projectTagList}}</span>
              主题的项目。
            </div>
            <span v-else style="font-size:14px;color:$--color-primary;margin-right:30px;">您还未参与任何项目</span>
            <span class="iep-font-color-2">请继续努力，发挥自身价值，成为更优秀的国脉人！</span>
          </iep-card>
        </el-col>
        <el-col class="all" :span="24">
          <iep-card :title="'项目总览'">
            <type-list :dataObject="myData"></type-list>
            <overview ref="overview" :infoType="infoType"></overview>
          </iep-card>
        </el-col>
      </el-row>
    </iep-basic-container>
  </div>
</template>
<script>
import { getInfoMy, getInfoAll } from "@/api/gpms/statistics";
import { mapGetters } from "vuex";
import TypeList from "./TypeList";
import overview from "./overview";
export default {
  components: { TypeList, overview },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      myData: {
        exponent: 0,
        getUnapprovedCount: 0,
        guidanceAllCount: 0,
        guidanceExternalAllCount: 0,
        getUnapprovedExternalCount: 0,
        statistics: {
          participateCount: 0,
          projectEnd: 0,
          failure: 0,
          processing: 0,
        },
      },
      infoType: "my",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.infoType === "my") {
        getInfoMy().then(res => {
          this.myData = res;
        });
      } else {
        getInfoAll().then(res => {
          this.myData = res;
        });
      }
    },
    handleClick() {
      this.getData();
      this.$refs["overview"].infoType = this.infoType;
      this.$refs["overview"].getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.location {
  font-size: 14px;
}
.location ::v-deep .el-card__body {
  font-size: 14px;
}
.sub-title {
  display: inline-block;
  color: $--color-text-regular;
}
::v-deep .title {
  font-size: 16px;
}
.all ::v-deep .smallTitle {
  font-size: 14px;
}
.tab-nav ::v-deep .el-tabs__item {
  font-size: 14px;
}
.tab-nav ::v-deep .el-tabs__item.is-active {
  font-size: 16px;
}
</style>
