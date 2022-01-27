<template>
  <div class="bgb">
    <div class="bg-wrapper">
      <div class="container-wrapper">
        <img class="vote-topic" src="/img/banner/vote-topic.png" alt />
        <img class="vote-title" src="/img/banner/vote-title.png" alt />
        <div class="time-title">
          距离投票截止还剩下
          <flipCountdown :deadline="form.endTime"></flipCountdown>
        </div>
        <div class="endtime-title">本期投票结束时间: {{form.endTime}}</div>
        <div class="summary-wrapper">
          <div class="item-box">
            <i class="el-icon-woneng-ren-qunyou"></i>
            <div class="number">{{form.joinNumber}}</div>
            <div class="sub">本轮参与人数</div>
          </div>
          <div class="item-box">
            <i class="el-icon-woneng-caiwu9"></i>
            <div class="number">{{_showBigNumber(form.lastTotalAmount)}}元</div>
            <div class="sub">本轮资产总估值</div>
          </div>
          <div class="item-box">
            <i class="el-icon-woneng-huabanfuben"></i>
            <div class="number">{{form.lastBellAmount}} 元</div>
            <div class="sub">当前宝贝估值</div>
          </div>
        </div>
        <div class="grid-container">
          <div class="table-box">
            <el-table
              :data="form.items"
              style="width: 100%"
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column prop="name" label="指标"></el-table-column>
              <el-table-column prop="num" label="数量"></el-table-column>
              <el-table-column prop="counter" label="上轮单个数量估值（元）"></el-table-column>
              <el-table-column prop="range" label="涨跌幅度">
                <template slot-scope="scope">
                  <span v-if="scope.row.range>0" class="red">{{scope.row.range}}%</span>
                  <span v-else-if="scope.row.range<0" class="green">{{-scope.row.range}}%</span>
                  <span v-else>--</span>
                </template>
              </el-table-column>
              <el-table-column prop="valuation" label="本轮估值">
                <template slot-scope="scope">
                  <iep-input-amount
                    v-if="!form.flag"
                    :max="_setMax(scope.row)"
                    v-model="scope.row.valuation"
                    unit="元"
                  ></iep-input-amount>
                  <div v-else>{{scope.row.valuation}}</div>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              v-if="!form.flag"
              class="iep-btn-block"
              type="primary"
              :loading="submitFormLoading"
              @click="submitForm()"
            >提交</el-button>
            <el-button v-if="form.flag" class="iep-btn-block" type="primary" disabled>您已投票</el-button>
          </div>
        </div>

        <div v-if="isShowRank" class="user-box">
          <div class="user-box-title">
            <span>上轮中奖用户</span>
          </div>
          <div class="user-box-item">
            <div class="user-box-list">
              <div class="user-box-num1">
                <i></i>一等奖
              </div>
              <div v-if="!firstNameList.length">暂无</div>
              <div v-else class="name" v-for="name in firstNameList" :key="name">{{name}}</div>
            </div>
            <el-divider class="user-box-line" direction="vertical"></el-divider>
            <div class="user-box-list">
              <div class="user-box-num2">
                <i></i>二等奖
              </div>
              <div v-if="!secondNameList.length">暂无</div>
              <div v-else class="name" v-for="name in secondNameList" :key="name">{{name}}</div>
            </div>
          </div>
        </div>
        <div class="rule-box">
          <div class="rule-box-title">
            <span>节能宝规则说明</span>
          </div>
          <div class="explain">
            <p>节能宝平台资产价值是由广大平台成员（宝贝持有人）对平台各项数据/信息的心理预估单价（以人民币为计量单位），通过加权平均计算得出平台数据价值总额。</p>
            <span>
              <strong>一、活动时间</strong>
            </span>
            <span>1、有效期：长期有效</span>
            <span>2、活动周期：每周一次</span>
            <span>
              <strong>二、参与规则</strong>
            </span>
            <span>1、投票时间从周一00：00开始到周日22：00结束，下周一8：00公布结果；</span>
            <span>2、每位平台成员在每个周期内仅限参加一次；</span>
            <span>3、每项平台指标单价须为正数。</span>
            <span>
              <strong>三、奖励规则</strong>
            </span>
            <span>1、凡参与估值的成员即可获得1宝贝奖励和幸运奖抽奖机会；</span>
            <span>2、幸运奖说明</span>
            <span>①幸运奖产生方式：估值公布的当天，从参与上轮估值的成员中随机抽取产生，参与估值的总次数有利于提升抽奖概率</span>
            <span>②参与估值成员在100名以内的抽取1名幸运奖，参与估值成员在100名（含）以上的抽取2名幸运奖</span>
            <span>③每位被抽取的幸运奖成员将获得500宝贝，并在公布的5个工作日内到账</span>
          </div>
          <!-- <div class="sub-explain">投票成功即可参与抽奖</div>
            <div class="sub-explain">一等奖: {{form.firstPrize}} 宝贝 {{form.firstNumber}} 人</div>
          <div class="sub-explain">二等奖: {{form.secondPrize}} 宝贝 {{form.secondNumber}} 人</div>-->
          <!-- <div class="sub-explain">三等奖: {{form.thirdPrize}} 宝贝 {{form.thirdNumber}} 人</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showBigNumber } from "@/filters/index";
import { getVoteAll, postVote, getVoteResultById } from "@/api/fms/vote";
import flipCountdown from "./flipCountdown";
class VoteAllVo {
  firstPrize = 0;
  firstNumber = 0;
  secondPrize = 0;
  secondNumber = 0;
  thirdPrize = 0;
  thirdNumber = 0;
  endTime = "2020-01-18 22:00:00";
  joinNumber = 0;
  lastTotalAmount = 0;
  lastBellAmount = 0;
  items = [];
  rotation = 40;
  flag = false;
}
export default {
  components: {
    flipCountdown,
  },
  data() {
    return {
      isShowRank: false,
      submitFormLoading: false,
      form: new VoteAllVo(),
      firstNameList: [],
      secondNameList: [],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    _showBigNumber(n) {
      return showBigNumber(n).join("");
    },
    _setMax(row) {
      if (row.type === "7") {
        return 10000;
      } else {
        return 1000;
      }
    },
    async submitForm() {
      this.submitFormLoading = true;
      const form = this.form.items.map((m) => m.valuation);
      try {
        const data = await postVote(form);
        if (data.data) {
          this.$message.success("操作成功");
          this.loadPage();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总估值";
          return;
        }
        if (index === 1 || index === 2 || index === 3) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values
            .reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0)
            .toFixed(2);
          sums[index] += " ";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    async loadPage() {
      const { data } = await getVoteAll();
      this.form = this.$mergeByFirst(new VoteAllVo(), data);
      this.loadResult(this.form.rotation);
      this.form.items = this.form.items.map((m) => {
        return {
          ...m,
          valuation: m.counter,
        };
      });
    },
    async loadResult(id) {
      const { data } = await getVoteResultById(id);
      this.isShowRank = !!data.length;
      this.firstNameList = data
        .filter((m) => m.isPrize === "1")
        .map((m) => m.realName);
      this.secondNameList = data
        .filter((m) => m.isPrize === "2")
        .map((m) => m.realName);
    },
  },
};
</script>
<style lang="scss" scoped>
.bg-wrapper {
  padding-bottom: 25px;
  background: url("/img/banner/banner-vote.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 0;
  .vote-topic {
    margin-top: 90px;
    width: 838px;
  }
  .vote-title {
    margin-top: 30px;
    width: 1200px;
  }
  .time-title {
    margin-top: 25px;
    font-size: 22px;
    letter-spacing: 2px;
    color: #fff;
  }
  .endtime-title {
    margin-top: 20px;
    font-size: 22px;
    font-family: Microsoft YaHei;
    // font-weight: 600;
    color: #303031;
  }
}
.bgb {
  margin-bottom: -2px;
  background: #fff url("/img/banner/vote-bottomic.png");
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-size: contain;
}
.container-wrapper {
  margin: 0 auto;
  width: 1200px;
  text-align: center;

  letter-spacing: 2px;
}
.summary-wrapper {
  margin: 130px 0 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .item-box {
    padding: 40px;
    width: 250px;
    height: 240px;
    border-radius: 8px;
    i {
      display: block;
      margin: 30px auto 22px;
      width: 100px;
      height: 100px;
      font-size: 34px;
      text-align: center;
      line-height: 100px;
      border-radius: 50%;
      background-color: #ee664e;
      color: #fff;
      transition: all 0.3s;
    }
    &:hover {
      box-shadow: 0 2px 15px 0 $--background-color;
    }
    &:hover i {
      transform: scale(1.1);
    }
    .number {
      font-size: 20px;
      font-weight: 700;
    }
    .sub {
      margin-top: 5px;
      font-size: 18px;
    }
  }
}
[class$="-box"] {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(87, 87, 87, 0.08);
  border: 1px solid $--border-color;
}
.grid-container {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0;
  grid-template-areas: "table-box table-box" "user-box rule-box";
  &::v-deep .el-table__header-wrapper {
    border-radius: 10px 10px 0 0;
  }
}

.table-box {
  grid-area: table-box;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(87, 87, 87, 0.08);
  border-radius: 10px;
  &:hover {
    box-shadow: 0 2px 15px 0 $--background-color;
  }
}

.user-box {
  grid-area: user-box;
  margin-bottom: 80px;
  padding: 40px 20px;
  box-shadow: 0 2px 12px rgba(87, 87, 87, 0.08);
  border-radius: 10px;
  .user-box-title {
    position: relative;
    margin: 20px 0;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 2px;
    // background: url(/img/banner/line1.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 10px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    &::before {
      position: absolute;
      top: 50%;
      left: 26%;
      right: 26%;
      content: "";
      height: 1px;
      background-color: $--color-input-regular;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 39%;
      right: 39%;
      content: "";
      height: 1px;
      background-color: #fff;
    }
    span {
      position: relative;
      display: inline-block;
      padding: 0 20px;
      vertical-align: middle;
      background-color: #fff;
      z-index: 10;
      &::before {
        position: absolute;
        left: 0;
        top: 40%;
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: $--color-input-regular;
      }
      &::after {
        position: absolute;
        right: 0;
        top: 40%;
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: $--color-input-regular;
      }
    }
  }
  .user-box-item {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
  }
  .user-box-line {
    margin-top: 20px;
    height: 140px;
  }
  &:hover {
    box-shadow: 0 2px 15px 0 $--background-color;
  }
  i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 35px;
    height: 56px;
    background: url(/img/banner/jpyp.jpg) no-repeat;
  }
  .user-box-num1,
  .user-box-num2 {
    margin: 30px 0 10px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 2px;
  }
  .user-box-num1 {
    i {
      background-position-y: -3px;
    }
  }
  .user-box-num2 {
    i {
      background-position-y: -62px;
    }
  }
  .name {
    margin: 10px 0;
    font-size: 22px;
    letter-spacing: 2px;
  }
}

.rule-box {
  grid-area: rule-box;
  margin-bottom: 30px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(87, 87, 87, 0.08);
  border-radius: 10px;
  &:hover {
    box-shadow: 0 2px 15px 0 $--background-color;
  }
  .rule-box-title {
    position: relative;
    margin: 20px 0;
    font-size: 28px;
    font-weight: 600;
    font-family: "微软雅黑";
    letter-spacing: 2px;
    // background: url(/img/banner/line1.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 10px;
    color: $--color-text-primary;
    &::before {
      position: absolute;
      top: 50%;
      left: 26%;
      right: 26%;
      content: "";
      height: 1px;
      background-color: $--color-input-regular;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 39%;
      right: 39%;
      content: "";
      height: 1px;
      background-color: #fff;
    }
    span {
      position: relative;
      display: inline-block;
      padding: 0 20px;
      vertical-align: middle;
      background-color: #fff;
      z-index: 10;
      &::before {
        position: absolute;
        left: 0;
        top: 42%;
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: $--color-input-regular;
      }
      &::after {
        position: absolute;
        right: 0;
        top: 42%;
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: $--color-input-regular;
      }
    }
  }
  .explain {
    margin: 30px 0;
    font-size: 16px;
    span {
      display: block;
      margin-bottom: 18px;
      padding: 0 30px;
      text-align: left;
    }
    p {
      padding: 0 30px;
      text-align: left;
    }
    strong {
      font-weight: 400;
      color: #f74437;
    }
  }
  .sub-explain {
    margin: 18px 60px;
    padding: 5px 15px;
    font-family: "微软雅黑";
    border-radius: 20px;
    background-color: #fdf5c7;
    color: $--color-text-primary;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
.table-box ::v-deep .el-table thead tr,
.table-box ::v-deep .el-table th {
  font-size: 18px;
  font-weight: 400;
  background-color: #ee664e;
  color: #fff;
}

.table-box ::v-deep .cell {
  padding: 0;
}
.table-box ::v-deep .el-table th {
  padding: 20px;
  &:nth-child(3) {
    padding: 20px 0;
  }
}
.table-box ::v-deep .el-table__body td {
  padding: 20px;
  font-size: 16px;
  background-color: #fff;
}
.table-box ::v-deep .el-table__footer-wrapper td,
.table-box ::v-deep.el-table__fixed-footer-wrapper tbody td {
  padding: 20px;
  font-size: 16px;
  background-color: #fff;
  color: $--color-primary;
}
::v-deep .el-table__footer-wrapper {
  margin-top: 0;
}
.red {
  color: #f74437;
}
.green {
  color: #1bb92d;
}
.table-box .iep-btn-block {
  padding: 15px 10px;
  font-size: 16px;
}
</style>
