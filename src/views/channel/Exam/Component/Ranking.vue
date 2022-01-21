<template>
  <TitleWrap title="排行榜">
    <div class="grid-container">
      <el-card class="item-con" shadow="hover">
        <div class="headline">课程榜</div>
        <div class="content">
          <div
            class="item-con-list"
            v-for="(item,idx) in courseInfoRank"
            :key="idx"
            @click="$openPage(`/channel/course/detail/${item.id}`)"
          >
            <span class="num">{{item.no}}</span>
            <iep-img class="img" :src="item.cover"></iep-img>
            <div class="txt">
              <div class="title" :title="item.courseName">{{item.courseName}}</div>
              <div class="info">
                <span class="name">{{item.orgName}}</span>
                <span class="done">{{item.studyNumber}}人已学习</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="item-con" shadow="hover">
        <div class="headline">考试榜</div>
        <div class="content">
          <div class="item-con-list" v-for="(item,idx) in examRank" :key="idx">
            <div class="status">
              <span class="num">{{item.no}}</span>
              <iep-popover-user-card :user-id="item.userId">
                <iep-img class="img2" :resizeOpt="{l:50}" :src="item.avatar"></iep-img>
              </iep-popover-user-card>
              <span class="name" :title="item.realName">{{item.realName}}</span>
            </div>
            <div class="list-info">
              <span class="list-info-num">{{item.number}}</span>
              <span class="list-info-name">考试次数</span>
            </div>
            <div class="list-info">
              <span class="list-info-num">{{item.passPercent}}</span>
              <span class="list-info-name">合格率</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="item-con" shadow="hover">
        <div class="headline">证书榜</div>
        <div class="content">
          <div class="item-con-list" v-for="(item,idx) in certificateRank" :key="idx">
            <div class="status">
              <span class="num">{{item.no}}</span>
              <iep-popover-user-card :user-id="item.userId">
                <iep-img class="img2" :resizeOpt="{l:50}" :src="item.avatar"></iep-img>
              </iep-popover-user-card>
              <span class="name" :title="item.realName">{{item.realName}}</span>
            </div>
            <div class="list-info">
              <span class="list-info-num">{{item.number}}</span>
              <span class="list-info-name">证书数量</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import {
  getExamRankList,
  getCertificateRankList,
} from "@/api/exam/exam_statistics";
import { getCourseInfoRankList } from "@/api/qms/course_info";
export default {
  components: {
    TitleWrap,
  },
  data() {
    return {
      examRank: [],
      certificateRank: [],
      courseInfoRank: [],
    };
  },
  mounted() {
    this.loadExamList();
    this.loadCertificateList();
    this.loadCourseInfoList();
  },
  methods: {
    async loadExamList() {
      const { data } = await getExamRankList();
      this.examRank = data.topTen.slice(0, 5);
    },
    async loadCertificateList() {
      const { data } = await getCertificateRankList();
      this.certificateRank = data.topTen.slice(0, 5);
    },
    async loadCourseInfoList() {
      const { data } = await getCourseInfoRankList();
      this.courseInfoRank = data.slice(0, 5);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 385fr 385fr 385fr;
  grid-template-rows: 565fr;
  gap: 30px 20px;
  grid-template-areas:
    ". . . ."
    ". . . .";
  .item-con {
    padding: 20px;
    width: 385px;
    height: 565px;
    background: #fff;
    border: 1px solid #eff0f1;
    border-radius: 10px;
    box-sizing: border-box;
    ::v-deep .el-card__body {
      padding: 0;
    }
    .headline {
      margin-bottom: 25px;
      font-size: 16px;
      font-weight: 400;
      color: #303031;
      line-height: 26px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 470px;
      .item-con-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover .txt .title,
        &:hover .status {
          color: $--color-primary;
        }
        .status {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        &:last-child {
          margin-bottom: 0;
        }
        .img {
          cursor: pointer;
          margin: 0 15px;
          width: 130px;
          height: 78px;
          min-width: 130px;
          border-radius: 10px;
          border: 1px solid $--border-color;
        }
        .img2 {
          margin: 0 15px;
          width: 50px;
          height: 50px;
          min-width: 50px;
          border-radius: 10px;
          border: 1px solid $--border-color;
        }
        .num {
          display: inline-block;
          width: 20px;
          height: 20px;
          min-width: 20px;
          font-size: 12px;
          text-align: center;
          background: #fff;
          border: 1px solid $--border-color;
          border-radius: 5px;
          color: #919397;
        }
        &:nth-child(-n + 3) .num {
          border-color: #f74437;
          color: #f74437;
        }
        .name {
          width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .txt {
          width: 160px;
          height: 78px;
          max-width: 160px;
          background-color: #fff;
          .title {
            margin: 0 0 5px;
            height: 26px;
            font-size: 16px;
            font-weight: 400;
            color: #303031;
            line-height: 26px;
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: transform 0.5s ease;
          }
          .info {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            font-size: 14px;
            line-height: 24px;
            color: #919397;
          }
        }
        .list-info {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: center;
          margin: 0 5px;
          width: 80px;
          min-width: 80px;
          font-size: 14px;
          &:last-child {
            margin-right: 0;
          }
          .list-info-num {
            color: $--color-text-primary;
          }
          .list-info-name {
            color: #919397;
          }
        }
      }
    }
  }
}
</style>
