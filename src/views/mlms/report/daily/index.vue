<template>
  <div class="daily">
    <div class="fillin">
      <el-input
        type="textarea"
        rows="5"
        v-model="createData"
        placeholder="请按照规范要求，重点记录今日工作，如有感悟更好。"
        maxlength="1000"
      ></el-input>
      <div class="footer">
        <el-button
          class="iep-btn-l"
          type="primary"
          @click="submit('create')"
          :loading="loadState"
        >保存</el-button>
        <div class="error" v-if="createValidate">日报内容不能为空</div>
      </div>
    </div>

    <div class="timeline">
      <el-col class="search">
        <div class="item">
          <el-date-picker
            v-model="searchData.date"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <iep-button type="info" @click="search">搜索</iep-button>
      </el-col>
      <el-col>
        <time-line :list="list" ref="timeline" @getMore="getMore" @getUpMore="getUpMore">
          <template #content="{row, index, today}">
            <el-collapse v-model="activeIndex" @change="activeChange">
              <el-collapse-item :title="today ? '今日日报' : row.title" :name="index">
                <template slot="title" v-if="row.code == 1 && !today">
                  <!-- 补写按钮 -->
                  <div class="writing" @click="writing(index)">{{row.title}}</div>
                </template>
                <div class="content" v-if="dailyState=='detail'">
                  <div class="left">
                    <pre>{{row.content}}</pre>
                  </div>
                  <div class="right">
                    <!-- 编辑按钮 -->
                    <i class="el-icon-edit" @click="update(index, row.content)" v-if="row.code==0"></i>
                  </div>
                </div>
                <div class="content" v-else-if="updateIndex == index">
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="updateData"
                    placeholder="请按照规范要求，重点记录今日工作，如有感悟更好。"
                    maxlength="1000"
                  ></el-input>
                  <div class="footer">
                    <el-button
                      class="iep-btn-l"
                      type="primary"
                      @click="submit(dailyState, row.createTime, index)"
                      :loading="loadState"
                    >保存</el-button>
                    <div class="error" v-if="updateValidate">日报内容不能为空</div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </template>
        </time-line>
      </el-col>
    </div>
  </div>
</template>

<script>
import TimeLine from "./timeline";
import {
  getTableData,
  createData,
  updateData,
} from "@/api/dms/report_personal_daily";
import { getDays, formatYear } from "../util";
import { mapGetters } from "vuex";

export default {
  name: "daily",
  components: { TimeLine },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      loadState: false,
      tipContent: "请按照规范要求，重点记录今日工作，如有感悟更好。",
      activeIndex: [1],
      list: [],
      searchData: {
        date: "",
        title: "",
      },
      createData: "",
      updateData: "",
      createValidate: false,
      updateValidate: false,
      startIndex: -1,
      distanceToday: 0, // 距离今天的天数
      dailyState: "detail",
      updateIndex: -1,
      stateList: {
        create: {
          data: "createData",
          validate: "createValidate",
          fn: createData,
          methodsName: "新增",
        },
        update: {
          data: "updateData",
          validate: "updateValidate",
          fn: updateData,
          methodsName: "修改",
        },
        writing: {
          data: "updateData",
          validate: "updateValidate",
          fn: createData,
          methodsName: "补写",
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      submitTips: {
        // create: '恭喜您完成今日日报，成功获得1个国脉贝！',
        create: "恭喜您完成今日日报",
        writing: "恭喜您完成日报补写，继续加油！",
        update: "编辑成功！",
      },
    };
  },
  methods: {
    activeChange(val) {
      this.activeIndex = [val[val.length - 1]];
      this.$refs["timeline"].active = this.activeIndex[0];
      this.dailyState = "detail";
      this.updateValidate = "";
    },
    submit(state, time, index) {
      const data = this[this.stateList[state].data];
      const validate = this.stateList[state].validate;
      const fn = this.stateList[state].fn;
      if (data === "") {
        this[validate] = true;
        return;
      }
      this.loadState = true;
      this[validate] = false;
      const formData = {
        nowOrgId: this.userInfo.orgId,
        workContent: data,
      };
      // 若是补写的日报，则需要传一个当天的时间到后台
      if (state === "writing") {
        formData.createTime = time;
      } else if (state === "update") {
        formData.createTime = time;
        formData.id = this.list[index].id;
      }
      fn(formData)
        .then(({ data }) => {
          if (!data) {
            this.$message.error(data);
            this.loadState = false;
          } else {
            this.loadState = false;
            // this.$message.success(
            //   this.submitTips[state] +
            //     (state === "create" ? `，${msg}请继续努力！` : ""),
            // );
            this.$message.success(this.submitTips[state]);
            this[this.stateList[state].data] = "";
            this.dailyState = "detail";
            /********************************************************** 提交成功后要刷新 - 一直都没做 - 仅仅刷新当前的数据就行了，不需要重置时间轴 */
            this.list = [];
            this.loadPage(0, 10);
          }
        })
        .catch(() => {
          this.loadState = false;
        });
    },
    search() {
      const startTime = this.searchData.date
        ? +new Date(this.searchData.date)
        : +new Date();
      const index = parseInt((new Date() - startTime) / (24 * 3600 * 1000));
      this.list = [];
      this.loadPage(index, 10);
    },
    loadPage(distanceToday, range, type) {
      // 若距离今天为0天，即时间轴重新开始
      const firstDayObj = getDays(-distanceToday);
      if (this.list.length === 0) {
        this.list = [
          {
            month: firstDayObj.year + "年" + firstDayObj.month + "月",
            date: `${firstDayObj.year}-${firstDayObj.month}`,
          },
        ];
      }
      // 若为向上加载，则需要判断第一个的月份是否正确
      if (this.list[0].date !== `${firstDayObj.year}-${firstDayObj.month}`) {
        this.list[0] = {
          month: firstDayObj.year + "年" + firstDayObj.month + "月",
          date: `${firstDayObj.year}-${firstDayObj.month}`,
        };
      }
      // 首先获取时间轴
      const dateList = [];
      for (let index = 0; index < range; ++index) {
        const getDay = getDays(-distanceToday - index);
        const obj = {
          time: getDay.year + "-" + getDay.month + "-" + getDay.day,
        };
        obj.date = getDay.tDay + "日";
        dateList.push(obj);
        if (getDay.day == 1) {
          // 若为1号，则插入一个月份
          dateList.push({
            month:
              getDays(-index - distanceToday - 1).year +
              "年" +
              getDays(-index - distanceToday - 1).month +
              "月",
            date: `${getDays(-index - distanceToday - 1).year}-${
              getDays(-index - distanceToday - 1).month
            }`,
          });
        }
      }
      // 获取数据
      const getListStartIndex = dateList[dateList.length - 1].month ? 2 : 1;
      getTableData({
        startTime:
          dateList[dateList.length - getListStartIndex].time + " 00:00:00",
        endTime: dateList[0].time + " 23:59:59",
        nowOrgId: this.userInfo.orgId,
      }).then(res => {
        // 根据获取到的数据进行数据的匹配
        const fn = (time, list) => {
          let msg = {
            id: "",
            code: 1,
            content: "",
            title: "点击补写日报",
            createTime: time + " 00:00:00",
          };
          for (const work of list) {
            if (work.createTime.indexOf(time) >= 0) {
              msg = {
                code: 0,
                content: work.workContent,
                title: time + "日报",
                createTime: work.createTime,
                id: work.id,
              };
              break;
            }
          }
          return msg;
        };
        // 遍历数据，完成时间轴数据的插入
        for (const index in dateList) {
          if (dateList[index].month) {
            // 根据日期匹配
            if (type) {
              this.list.splice(parseInt(index) + 1, 0, dateList[index]);
            } else {
              this.list.push(dateList[index]);
            }
          } else {
            const msg = fn(dateList[index].time, res.data.records);
            const obj = {
              date: dateList[index].date,
              title: msg.title,
              content: msg.content,
              code: msg.code,
              createTime: msg.createTime,
              id: msg.id,
            };
            // 根据日期匹配
            if (type) {
              this.list.splice(parseInt(index) + 1, 0, obj);
            } else {
              this.list.push(obj);
            }
          }
        }
      });
      if (!type) {
        this.distanceToday = distanceToday + 10;
      }
    },
    getMore() {
      this.loadPage(this.distanceToday, 10);
    },
    getUpMore() {
      // 向上取十天，首先需要判断是否到达顶点
      const firstDate = this.list[1].createTime;
      const timeDifference = +new Date() - +new Date(formatYear(firstDate));
      let range = 10;
      const days = parseInt(timeDifference / (24 * 3600 * 1000));
      let distanceToday = days - 10;
      if (days < 10) {
        range = days;
        distanceToday = 0;
      }
      this.loadPage(distanceToday, range, "up");
    },
    // 编辑
    update(index, data) {
      this.$nextTick(() => {
        this.dailyState = "update";
        this.updateIndex = index;
        this.updateData = data;
      });
    },
    // 补写
    writing(index) {
      this.updateData = "";
      setTimeout(() => {
        this.dailyState = "writing";
        this.updateIndex = index;
        this.$nextTick(() => {
          this.activeIndex = [index];
        });
      });
    },
  },
  created() {
    this.loadPage(0, 10);
  },
};
</script>

<style lang="scss" scoped>
.daily {
  margin-right: 16%;
  .fillin {
    padding: 10px 0 20px;
    border-bottom: 1px solid $--border-color;
    .footer {
      margin-top: 20px;
      text-align: right;
      .error {
        display: inline-block;
        font-size: 12px;
        color: red;
        margin-left: 10px;
      }
    }
  }
  .timeline {
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
    .writing {
      color: $--color-primary;
      &:hover {
        opacity: 0.7;
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      .el-collapse {
        position: relative;
        padding: 0 20px;
        border-left: 1px solid $--border-color;
        border-right: 1px solid $--border-color;
        border-radius: $--border-radius-base;
        &::before {
          content: "";
          position: absolute;
          left: -16px;
          top: 8px;
          width: 29px;
          height: 18px;
          // background: #fafafa url(../img/sanjiao.jpg) no-repeat;
        }
      }
      .left {
        width: calc(100% - 30px);
      }
      .right {
        position: absolute;
        top: 15px;
        right: 40px;
        text-align: right;
        padding-right: 4px;
        width: 30px;
        i {
          cursor: pointer;
          font-size: 18px;
        }
      }
      .footer {
        width: 100%;
        margin-top: 15px;
        .error {
          display: inline-block;
          font-size: 12px;
          color: red;
          margin-left: 10px;
        }
      }
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
