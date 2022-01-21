<template>
  <div class="daily">
    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <iep-button type="info" @click="handleSearch">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line
          ref="timeline"
          @actively="actively"
          @load_data="loadList"
          @changeYear="changeYear"
          :timeLineOption="timeLineOption"
          :lineChosen="lineChosen"
          title="个人"
        ></time-line>
      </div>
      <div class="form">
        <weekly-form
          ref="dialog"
          v-if="contentType==='week'"
          :data="formData"
          @success-submit="successSubmit"
        ></weekly-form>
        <monthly-form ref="dialog" v-else :data="formData" @success-submit="successSubmit"></monthly-form>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLine from "../timeline";
import weeklyForm from "./weekly";
import monthlyForm from "./monthly";
import { formatDig, getMonday } from "../util";
import { getTableData } from "@/api/dms/report_personal_week_month";
import { mapGetters } from "vuex";

export default {
  name: "daily",
  computed: {
    ...mapGetters(["userInfo"]),
  },
  components: { TimeLine, weeklyForm, monthlyForm },
  data() {
    return {
      timeLineOption: [],
      formData: {},
      validate: false,
      searchData: {
        date: "",
        title: "",
      },
      contentType: "week",
      params: "",
      today: new Date(), // 时间轴开始的时间
      lineChosen: false, // 是否自动选中
    };
  },
  methods: {
    submit() {},
    handleSearch() {
      const date = this.searchData.date
        ? new Date(this.searchData.date)
        : new Date();
      // 获取到选中的时间，解析出来年月周
      const monday = new Date(getMonday(date).timeStamp);
      this.$refs.timeline.loadPage(monday, "search");
    },
    /**
     * 时间轴点击事件
     * @item 点击对象（时间轴对象）
     * @type 点击类型（周、月）
     */
    actively(item, type) {
      if (type) {
        this.contentType = type;
      }
      this.$nextTick(() => {
        this.$refs["dialog"].dialogState = "detail";
        this.formData = item; // 赋值 formData 来进行详情显示
      });
      // 点击月份进行数据的获取
      if (type === "month") {
        this.params = new Date(item.timeStamp);
        this.loadList(this.params);
      }
    },
    /**
     * 接口获取数据
     * @date 获取数据的时间点
     * @type 是否是初次获取或者搜索
     */
    loadList(date, type = false) {
      getTableData({
        nowOrgId: this.userInfo.orgId,
        newYearMonthTime: `${date.getFullYear()}-${formatDig(
          date.getMonth() + 1,
        )}`,
      }).then(({ data }) => {
        // 获取 date 时间点的数据，可能无
        this.timeLineOption = [...data.records];
        // 是否是初次或者搜索，自动将时间轴选中
        this.lineChosen = type;
      });
    },
    successSubmit() {
      this.loadList(new Date(this.params));
      this.$refs["dialog"].dialogState = "detail";
    },
    changeYear(year) {
      this.loadPage(new Date(`${year}-01-01`), "year");
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.daily {
  margin-right: 16%;
  padding: 20px 0 0;
  .search {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .item {
      display: inline-block;
      width: 220px;
    }
  }
  .content {
    display: flex;
    .timeline {
      width: 180px;
    }
    .form {
      // flex: 1;
      width: calc(100% - 180px);
    }
  }
}
.search .item ::v-deep .el-input__inner {
  border-radius: 10px 0 0 10px;
  text-indent: 20px;
}
.search ::v-deep .el-button {
  margin-left: -1px;
  height: 42px;
  border-radius: 0 10px 10px 0;
}
</style>
