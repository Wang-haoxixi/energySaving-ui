<template>
  <div class="concerned">
    <el-card v-for="(item, index) in list" :key="index" class="card">
      <div class="head-title nowrap">{{item.title}}</div>
      <div class="head-desc nowrap">{{item.desc}}</div>
      <div class="tabs">
        <!-- 信息 -->
        <div class="info">
          <div class="org nowrap">来自：{{item.orgName}}</div>
          <div class="user">
            <iep-img :src="item.avatar" class="img"></iep-img>
            <div class="userName nowrap">{{item.userName}}</div>
            <div class="time">
              <i class="el-icon-woneng-shijian1"></i>
              <div class="date">{{item.finishTime}}</div>
            </div>
          </div>
        </div>
        <!-- 进度 -->
        <div class="progress tab">
          <div class="head">88%</div>
          <div class="title">进度</div>
        </div>
        <!-- 协作人数 -->
        <div class="collaborator tab">
          <div class="head">9</div>
          <div class="title">协作人数</div>
        </div>
      </div>
      <div class="footer">
        <div class="progress">
          <i class="el-icon-woneng-gengduoshixin"></i>
          <div class="title">进行中</div>
        </div>
        <iep-button class="button">加入任务</iep-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title:
            "智慧中国年会议策划智慧中国年会议策划智慧中国年会议策划智慧中国年会议策划",
          desc:
            "IT资产管理动态化。加强全市IT资产和信息化项目IT资产管理动态化。加强全市IT资产和信息化项目",
          avatar:
            "//183.131.134.242:10031/upload/20200430/7ff2437d-c0bb-4a33-b0ed-5634aadad4a1.jpg",
          orgName: "国脉集团研发中心国脉集团研发中心",
          userName: "迷你胡迷你胡迷你胡",
          finishTime: "2020-05-02",
        },
        {},
        {},
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.concerned {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: auto;
  font-size: 14px;
  .nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .card {
    width: 32%;
    .head-title {
      color: #303031;
      margin-bottom: 20px;
      font-family: Microsoft YaHei;
    }
    .head-desc {
      color: $--color-text-regular;
      margin-bottom: 30px;
    }
    .tabs {
      display: flex;
      margin-bottom: 20px;
      .info {
        width: calc(100% - 150px);
        .org {
          color: $--color-text-secondary;
          margin-bottom: 11px;
        }
        .user {
          color: $--color-text-secondary;
          display: flex;
          .img {
            width: 25px;
            height: 25px;
            margin-right: 4px;
            margin-top: -3px;
          }
          .userName {
            width: 80px;
          }
          .time {
            width: 140px;
            display: flex;
            i {
              line-height: 21px;
              margin-right: 3px;
            }
          }
        }
      }
      .progress {
        width: 70px;
      }
      .collaborator {
        width: 80px;
      }
      .tab {
        border-left: 1px solid $--border-color;
        text-align: center;
        .head {
          margin-bottom: 10px;
          font-weight: 600;
        }
        .title {
          color: $--color-text-secondary;
        }
      }
    }
    .footer {
      border-top: 1px solid $--border-color;
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      line-height: 34px;
      .progress {
        display: flex;
        i {
          color: $--color-third;
          line-height: 34px;
          margin-right: 5px;
          font-size: 16px;
        }
      }
      .button {
        background-color: $--color-primary;
        color: #fff;
      }
    }
  }
}
</style>