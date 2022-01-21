<template>
  <div class="wrapper">
    <div class="title">{{explainData.examName}}</div>
    <el-row>
      <el-col class="colBlock" :span="12">
        时间：
        <span v-if="explainData.beginTime">
          {{explainData.beginTime}} 至
          {{explainData.endTime}}
        </span>
        <span v-else>长期有效</span>
      </el-col>
      <el-col class="colBlock" :span="12">题数：共{{explainData.choiceNum}}题</el-col>
      <el-col class="colBlock" :span="12">时长：{{explainData.answerTime}}分钟(答卷时间)</el-col>
      <el-col class="colBlock" :span="12">难度：{{levelName(explainData.level)}}</el-col>
      <el-col class="colBlock" :span="12">标准：满分{{explainData.score}}分，{{explainData.passScore}}分及格</el-col>

      <el-col
        class="colBlock"
        :span="12"
        v-if="explainData.chargeStatus === '2' || explainData.chargeStatus === '3'"
      >费用：{{explainData.consume}}贝</el-col>

      <el-col
        class="colBlock"
        :span="12"
        v-if="explainData.rewardStatus === '2'"
      >奖励：前{{explainData.rewardScope}}名合格者，每人奖励{{explainData.reward}}贝</el-col>
    </el-row>
    <div class="description" v-if="explainData.examExplain" v-html="explainData.examExplain"></div>
    <div class="matarial">
      <div
        class="smallTitle"
        v-if="explainPartData.certificateList&&explainPartData.certificateList.length"
      >
        获得证书：
        <div style="display:flex;justify-content: space-around;">
          <div
            v-for="item in explainPartData.certificateList"
            :key="item.id"
            style="display: flex;  flex-direction: column;  align-items: center;"
          >
            <iep-img
              :src="item.previewPic"
              style="width: 200px;"
              :preview-src-list="[item.previewPic]"
            ></iep-img>
            <div class="label-txt">{{item.title}}</div>
          </div>
        </div>
        <hr />
      </div>
      <div
        class="smallTitle"
        v-if="explainPartData.certificateUser&&explainPartData.certificateUser.length"
      >
        <div class="flex-title">
          <div>已获证人员：</div>
          <el-button type="text" @click="openMore(getMoreCertUser)">更多</el-button>
        </div>
        <div class="user-item-wrap">
          <div
            v-for="item in explainPartData.certificateUser"
            :key="item.userId"
            style="display: flex;  flex-direction: column;  align-items: center;"
          >
            <iep-popover-user-card :user-id="item.userId">
              <iep-img :src="item.avatar" style="width: 100px;"></iep-img>
            </iep-popover-user-card>
            <div class="label-span">{{item.realName}}</div>
          </div>
        </div>
        <hr />
      </div>
      <div
        class="smallTitle"
        v-if="explainPartData.expertsList&&explainPartData.expertsList.length"
      >
        <div class="flex-title">
          <div>专家：</div>
          <el-button type="text" @click="openMore(getMoreExpert)">更多</el-button>
        </div>
        <div class="user-item-wrap">
          <div
            v-for="item in explainPartData.expertsList"
            :key="item.userId"
            style="display: flex;  flex-direction: column;  align-items: center;"
          >
            <iep-popover-user-card :user-id="item.userId">
              <iep-img :src="item.avatar" style="width: 100px;height: 100px;"></iep-img>
            </iep-popover-user-card>
            <div class="label-span">{{item.realName}}</div>
          </div>
        </div>
        <hr />
      </div>
      <div
        class="smallTitle"
        v-if="explainPartData.certificateList&&explainPartData.certificateList.length"
      >认证流程：</div>
      <div
        class="content"
        v-if="explainPartData.certificateList&&explainPartData.certificateList.length"
      >
        <iep-img class="img" src="/img/exam/exam_cert_process.png"></iep-img>
      </div>
      <hr />
    </div>

    <div class="description" style="display: flex;">
      <IepPopoverOrgCard :orgId="explainPartData.orgId||0">
        <iep-img :src="explainPartData.soAvatar" class="img"></iep-img>
      </IepPopoverOrgCard>
      <div class="txt">
        <div>{{explainPartData.orgName}}</div>
        <div>考证: {{explainPartData.textualResearchNum}}个</div>
      </div>
    </div>
    <hr />
    <div class="text" v-if="explainData.relatedExamList&&explainData.relatedExamList.length">
      <div class="smallTitle">相关考证：</div>
      <div class="relevant-content">
        <div
          class="contentItem"
          v-for="item in explainData.relatedExamList"
          :key="item.id"
          @click="handleExam(item.id)"
        >
          <div class="con">{{item.examName}}</div>
          <span class="num">{{item.testNumber}}人已考</span>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <el-button type="primary" v-if="explainData.beginStatus == 1" @click="beigin">开始考试</el-button>
      <el-button type="primary" v-if="explainData.beginStatus == 3" @click="continueItem">继续考试</el-button>
      <el-button type="primary" v-if="explainData.beginStatus == 2" @click="viewItem">查看考试</el-button>
    </div>-->
    <material-dialog ref="materialDialog"></material-dialog>
    <MoreUserDialog
      :examId="explainData.id"
      :certId="explainPartData.certificateList&&explainPartData.certificateList.length&&explainPartData.certificateList[0].id"
      ref="MoreUserDialog"
    ></MoreUserDialog>
  </div>
</template>
<script>
import { getMoreExpert, getMoreCertUser } from "@/api/qms/cerificate";
import MaterialDialog from "./materialDialog";
import MoreUserDialog from "./MoreUserDialog";
export default {
  components: {
    MaterialDialog,
    MoreUserDialog,
  },
  props: {
    situationId: {
      type: Number,
      default: 0,
    },
    explainData: {
      type: Object,
      required: true,
      default: () => {
        return {
          orgId: 0,
        };
      },
    },
    explainPartData: {
      type: Object,
      required: true,
      default: () => {
        return {
          orgId: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleExam(id) {
      if (this.situationId) {
        return;
      }
      this.$emit("reload", id);
    },
    getMoreCertUser,
    getMoreExpert,
    openMore(method) {
      this.$refs["MoreUserDialog"].reqFunction = method;
      this.$refs["MoreUserDialog"].dialogShow = true;
    },
    levelName(level) {
         if (level) {
        const dictsMap = {
          SIMPLE: "简单",
          GENERAL: "较难",
          DIFFICULT: "很难",
        };
        return dictsMap[level];
      } else {
        return "暂无难度";
      }
    },
    // beigin() {
    //   this.$emit("join");
    // },
    // continueItem() {
    //   this.$emit("continue");
    // },
    // viewItem() {
    //   this.$emit("view");
    // },
    handleLink(id) {
      this.$refs["materialDialog"].open(id);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-item-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: $--background-color;
  border-radius: 10px;
  padding: 20px 5px;
}
.smallTitle .label-txt {
  margin-top: 5px;
  width: 400px;
  font-size: 14px;
  text-align: center;
}
.smallTitle .label-span {
  margin-top: 5px;
  width: 100px;
  height: 38px;
  font-size: 14px;
  text-align: center;
}
.flex-title {
  display: flex;
  justify-content: space-between;
}
.wrapper {
  margin-bottom: 17px;
}
.title {
  text-align: center;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 25px;
}
.colBlock {
  padding: 5px 0;
}
.matarial {
  margin: 30px 0 10px;
}
.description {
  background: #f5f4f7;
  padding: 15px;
  border-radius: 15px;
  margin: 10px 0;
  line-height: 26px;
  font-size: 14px !important;
  .img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    border: 1px solid $--border-color;
    box-sizing: border-box;
  }
  .txt {
    margin-left: 20px;
    div {
      margin: 10px 0;
    }
  }
}
.smallTitle {
  margin: 20px 0 10px;
  font-size: 14px;
}
.footer {
  text-align: center;
}
.contentItem {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 5px;
  background: #f5f4f7;
  padding: 20px;
  margin-bottom: 10px;
  color: #666769;
  &:hover {
    &:after {
      border-color: transparent !important;
    }
  }
  .iconItem {
    float: right;
    line-height: 20px;
  }
  .con {
    max-width: 700px;
    text-align: justify;
  }
  .num {
    display: inline-block;
    margin-left: 10px;
    text-align: right;
    vertical-align: middle;
    color: #919397;
  }
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 50%;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.user-item-wrap ::v-deep .iep-image {
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
