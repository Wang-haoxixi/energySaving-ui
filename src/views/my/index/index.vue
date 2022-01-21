<template>
  <div class="index-wrapper">
    <el-alert class="notice-wrapper">
      <span class="label">公告</span>
      {{userInfo.newestContent}}
      <span class="btn" @click="handleShow()">【详情】</span>
    </el-alert>
    <div class="router-box">
      <RecentTasks></RecentTasks>
      <div class="data-box" v-loading="loading">
        <el-card shadow="never">
          <iep-wrapper title="我的数据">
            <!-- <span class="left-sub" slot="left">已超过90%的用户</span> -->
            <el-button-group class="all" slot="right">
              <el-button icon="el-icon-woneng-arrowleft" @click="handleM()"></el-button>
              <el-button icon="el-icon-woneng-arrowright" @click="handleP()"></el-button>
            </el-button-group>
            <div class="data-wrapper">
              <div class="wrapper-box" v-for="(item,index) in personCorePairs" :key="index">
                <span class="num">{{item[1]}}</span>
                <span class="name">
                  {{nameMap[item[0]]}}
                  <IepCardBtn
                    v-if="item[0]==='assetsWorth'&&item[1]>0"
                    title="数据资产总体分析"
                    icon="el-icon-woneng-youfangxiangshixin"
                    @click="$openPage('/my/index/data_summary')"
                  ></IepCardBtn>
                  <IepCardBtn
                    v-if="item[0]==='cooperationWorth'&&item[1]>0"
                    title="任务"
                    icon="el-icon-woneng-youfangxiangshixin"
                    @click="$openPage('/my/index/cooperation')"
                  ></IepCardBtn>
                  <IepCardBtn
                    v-if="item[0]==='bellAssets'&&item[1]>0"
                    title="宝贝"
                    icon="el-icon-woneng-youfangxiangshixin"
                    @click="$openPage('/my/index/nengbar')"
                  ></IepCardBtn>
                  <IepCardBtn
                    v-if="item[0]==='soWorth'&&item[1]>0"
                    title="组织"
                    icon="el-icon-woneng-youfangxiangshixin"
                    @click="$openPage('/my/account/org')"
                  ></IepCardBtn>
                  <IepCardBtn
                    v-if="item[0]==='creditWorth'&&item[1]>0"
                    title="我的信用值"
                    icon="el-icon-woneng-youfangxiangshixin"
                    @click="$openPage('/my/index/my_credit')"
                  ></IepCardBtn>
                </span>
                <!-- <p>
                  较上周
                  <span v-if="item.float>0" class="red">↑{{item.float}}%</span>
                  <span v-else-if="item.float<0" class="green">↓{{-item.float}}%</span>
                  <span>--</span>
                </p>-->
              </div>
            </div>
          </iep-wrapper>
        </el-card>
      </div>
      <!-- <OrgAvatars></OrgAvatars> -->
      <div class="bottom">
        <el-card shadow="never" body-style="height:100%">
          <GuessLike></GuessLike>
        </el-card>
        <el-card shadow="never">
          <SuggestFollows @refresh="loadPersonCore" :userInfo="userInfo"></SuggestFollows>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import toPairsIn from "lodash/toPairsIn";
import chunk from "lodash/chunk";
// import OrgAvatars from "./Components/OrgAvatars";
import SuggestFollows from "./Components/SuggestFollows";
import GuessLike from "./Components/GuessLike";
import RecentTasks from "./Components/RecentTasks/index";
import { getPersonCore } from "@/api/dms/comprehensive";
import { mapGetters, mapMutations } from "vuex";

class PersonCoreDTO {
  creditWorth = 0; //信用值数
  bellAssets = 0; //宝贝
  cooperationWorth = 0; // 任务
  soWorth = 0; //SO
  assetsWorth = 0; //数据资产
  friendWorth = 0; // 好友
  fanWorth = 0; //粉丝
  followWorth = 0; //关注
  upWorth = 0; //点赞数
  chatWorth = 0; //说说
}
export default {
  components: {
    // OrgAvatars,
    SuggestFollows,
    GuessLike,
    RecentTasks,
  },
  data() {
    return {
      loading: false,
      total: 0,
      current: 0,
      personCoreChunk: [],
      nameMap: {
        creditWorth: "信用值",
        bellAssets: "宝贝",
        cooperationWorth: "任务",
        soWorth: "组织",
        assetsWorth: "数据资产",
        friendWorth: "好友",
        fanWorth: "粉丝",
        followWorth: "关注",
        upWorth: "点赞数",
        chatWorth: "说说",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    personCorePairs() {
      return this.personCoreChunk[this.current];
    },
  },
  created() {
    this.loadPersonCore();
  },
  methods: {
    ...mapMutations({
      setNoticeDialogShow: "SET_NOTICE_DIALOGSHOW",
    }),
    handleM() {
      const { current } = this;
      if (current > 0) {
        this.current--;
      } else {
        this.current = this.total - 1;
      }
    },
    handleP() {
      const { current } = this;
      if (current === this.total - 1) {
        this.current = 0;
      } else {
        this.current++;
      }
    },

    handleShow() {
      this.setNoticeDialogShow(true);
    },
    async loadPersonCore() {
      this.loading = true;
      const { data } = await getPersonCore();
      const personCore = this.$mergeByFirst(new PersonCoreDTO(), data);
      const personCorePairs = toPairsIn(personCore);
      this.personCoreChunk = chunk(personCorePairs, 5);
      this.total = this.personCoreChunk.length;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.router-box {
  padding: 0 !important;
  border: 0;
  border-radius: $--border-radius-base;
  ::v-deep .wrapper {
    margin: 0;
  }
}
.notice-wrapper {
  font-size: 14px;
  margin-bottom: 20px;
  padding: 7px 20px;
  background-color: $--border-color;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  color: $--color-text-regular;
  ::v-deep .el-alert__description {
    margin-top: 0;
    font-size: 14px;
    color: $--color-text-regular;
  }
  ::v-deep .el-alert__closebtn {
    top: 11px;
    font-size: 20px;
    color: $--color-text-secondary;
    &:hover {
      color: $--color-primary;
    }
  }
  .label {
    font-size: 16px;
    margin-right: 10px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .btn {
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.data-box {
  margin-bottom: 20px;
  .data-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ::v-deep .content-wrapper {
    display: block !important;
  }
  .left-sub {
    margin-left: 10px;
    font-size: 14px;
    color: $--color-text-secondary !important;
  }
  .all {
    .el-button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: 24px;
      height: 24px;
      border-color: $--border-color;
      ::v-deep i {
        font-size: 12px;
        color: $--color-text-secondary;
      }
      ::v-deep &:hover i,
      ::v-deep &:focus i {
        color: $--color-primary;
      }
    }
  }
}
.bottom {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 294px;
  .all {
    color: $--color-text-secondary;
    &:hover {
      color: $--color-primary;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
  }
}
.bottom:last-child {
  margin-bottom: 0 !important;
}
.bottom ::v-deep .content-wrapper {
  padding-bottom: 5px;
}
.data-box {
  .wrapper-box {
    width: 25%;
    text-align: center;
    .num {
      display: block;
      font-size: 22px;
      line-height: 40px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .name {
      display: inline-flex;
      font-size: 14px;
      color: $--color-text-secondary;
      .perfect {
        margin-left: 5px;
        ::v-deep i {
          color: $--color-text-secondary;
          transition: color 0.3s;
        }
        &:hover ::v-deep {
          i {
            // color: #f74437;
            color: $--color-primary;
          }
        }
      }
    }
    p {
      margin: 10px;
      font-size: 12px;
      color: $--color-text-regular;
      .red {
        color: $--color-primary;
      }
      .green {
        color: #1bb92d;
      }
    }
  }
}
.data-box ::v-deep .content-wrapper {
  width: 100%;
}
.data-box ::v-deep .wrapper {
  padding: 20px;
}
.bottom ::v-deep .wrapper {
  padding: 20px;
}
.index-wrapper ::v-deep .el-card__body {
  padding: 0;
  border-radius: $--border-radius-base;
  .bottom {
    .wrapper {
      margin: 0;
    }
  }
}
</style>
