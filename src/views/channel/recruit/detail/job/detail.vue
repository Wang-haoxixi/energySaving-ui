<template>
  <div class="detail-container">
    <div class="detail-content">
      <div class="detail-head">
        <div class="detail-head-top">
          <div class="title-top">
            <div class="title">
              <div class="name">{{transformString(formData.name)}}</div>
              <div class="salary" v-if="formData.salaryStart === 0 && formData.salaryEnd === 0">面议</div>
              <div class="salary" v-else>{{formData.salaryStart}}K—{{formData.salaryEnd}}K</div>
              <div class="reward" v-if="formData.reward">
                <div class="icon">荐</div>
                <div class="money">+{{formData.reward}}贝</div>
              </div>
            </div>
            <el-button class="iep-back-btn" @click="handleBack">返回</el-button>
          </div>
          <div class="head-middle">
            <div class="tags">
              <div class="tag" v-for="(item, index) in formData.tags" :key="index">{{item}}</div>
            </div>
            <div class="button-list">
              <el-button class="text" @click="handleProgress">进步阶梯</el-button>
              <el-button
                class="primary"
                @click="handleApply"
                v-if="formData.createBy !== userInfo.userId"
              >立即申请</el-button>
            </div>
          </div>
          <div class="func">
            <div class="func-item">
              <div class="func-icon">
                <i class="el-icon-woneng-shijian"></i>
                <span>{{formData.createDate}}</span>
              </div>
              <!-- 红度 -->
              <div class="func-icon" v-if="formData.rednessDemand">
                <span>红度 {{formData.rednessDemand === 5 ? '=' : '≥'}} {{formData.rednessDemand}}</span>
              </div>
              <!-- 浏览量 -->
              <div class="func-icon">
                <i class="el-icon-woneng-yanjing1"></i>
                <span>{{formData.browseNum || 0}}人</span>
              </div>
              <div class="func-icon button" @click="handleCollect">
                <i class="el-icon-woneng-shoucang" v-if="formData.collect"></i>
                <i class="el-icon-woneng-heart" v-else></i>
                <span>收藏</span>
              </div>
              <!-- <div class="func-icon button">
                <i class="el-icon-woneng-zhuanfa"></i>
                <span>转发</span>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <div class="info-item" v-for="(item, index) in infomationList" :key="index">
          <div class="label">{{item.name}}：</div>
          <div class="span" v-if="item.type === 'cut'">{{getCutValue(formData[item.value]) || "不限"}}</div>
          <div class="span" v-else>{{formData[item.value] || "不限"}}</div>
        </div>
      </div>
      <!-- 福利待遇 -->
      <div class="detail-desc">
        <div class="title">福利待遇：</div>
        <div class="desc-tags">
          <div class="desc-tag" v-for="(item, index) in formData.welfareList" :key="index">{{item}}</div>
        </div>
      </div>
      <!-- 具体描述 -->
      <div class="detail-desc">
        <div class="title">职位描述：</div>
        <div class="desc-content" v-html="formData.describe"></div>
      </div>
      <!-- 工作地址 -->
      <div class="detail-desc" v-if="formData.longitude && formData.latitude">
        <div class="title">工作地址：</div>
        <div class="address">
          <div class="address-title">{{formData.workplace}}-{{formData.detailedAddress}}</div>
          <div class="is-show" @click="showMap = !showMap" v-if="!showMap">
            <i class="el-icon-woneng-zuobiao"></i>
            <div class="show-title">点击查看地图</div>
          </div>
          <div class="is-show" v-else @click="showMap = !showMap">
            <i class="el-icon-woneng-arrowup"></i>
            <div class="show-title">收起地图</div>
          </div>
        </div>
        <IepMap class="iep-map" ref="amap" :options="mapOptons" v-if="showMap"></IepMap>
      </div>
      <!-- 关联考试 -->
      <div class="exam-list" v-if="formData.exam && formData.exam.length > 0">
        <div class="exam-head">
          <div class="title">关联考试</div>
          <div class="sub-title">完成考试就业更有竞争力！</div>
        </div>
        <div class="exam-item" v-for="item in formData.exam" :key="item.examId">
          <div class="item-name">
            {{item.examName}}
            <i class="el-icon-woneng-zhengshu" v-if="item.haveCertificate"></i>
          </div>
          <div class="item-href is-effective" v-if="item.effective === '0'">已失效</div>
          <div class="item-href" @click="handleJoinExam(item)" v-else>立即参与</div>
        </div>
      </div>
    </div>
    <!-- 工作地点地图 -->
    <!-- <div class="detail-contact" v-if="formData.longitude && formData.latitude">
      <div class="title">工作地点</div>
      <div class="address">
        <i class="el-icon-woneng-ditu"></i>
        {{formData.workplace}}-{{formData.detailedAddress}}
      </div>
      <IepMap class="iep-map" ref="amap" :options="mapOptons"></IepMap>
    </div>-->
    <!-- 名片 -->
    <div class="detail-contact">
      <div class="title">职位发布者</div>
      <div class="content">
        <iep-img :src="formData.avatar" class="avatar"></iep-img>
        <div class="info-content">
          <div class="info">
            <div class="head">
              <div class="name">{{formData.realName}}</div>
              <span v-if="formData.position">/</span>
              <div class="position" v-if="formData.position">{{transformString(formData.position)}}</div>
            </div>
            <div class="desc">
              <div class="infomation">
                <div class="desc-item" v-if="isEmail(formData.mail)">
                  <div class="label">邮箱：</div>
                  <div class="span">{{formData.mail}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="desc-button" v-if="this.formData.createBy !== this.userInfo.userId">
            <iep-button class="button" @click="handleSendMsg(formData)">立即沟通</iep-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 更新个人信息 -->
    <infoDialog ref="infomation" @apply="applyFn"></infoDialog>
    <!-- 考试详情 -->
    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>

<script>
import { getRecruitDetail } from "@/api/dms/recruit_query";
import { deliveryPosition } from "@/api/dms/recruit_operation";
import { initFormData, infomationList } from "./options";
import { mapActions, mapGetters } from "vuex";
import InfoDialog from "./infoDialog";
import { createCollection, deleteCollectionById } from "@/api/dms/collection";
import { postMsgCustomInitiate } from "@/api/ims/rong";
import { ifUserLinkUp } from "@/api/dms/recruit_linkup";
import { transformString } from "@/util/dataDeal";
import { isEmail } from "@/util/validate";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";

export default {
  components: { InfoDialog, ExamViewDialog },
  computed: {
    ...mapGetters(["userInfo"]),
    mapOptons() {
      return {
        center: [this.formData.longitude, this.formData.latitude],
        zoom: 16,
        isCode: true,
        isClick: false,
      };
    },
  },
  data() {
    return {
      infomationList,
      formData: initFormData(),
      transformString,
      showMap: false,
    };
  },
  methods: {
    isEmail,
    loadData(id) {
      getRecruitDetail({ recruitId: id }).then(({ data }) => {
        this.formData = { ...data };
        this.$emit("changeOrg", this.formData.orgId);
      });
    },
    // 直聊
    ...mapActions(["imcOpenConversionByTargetId"]),
    async handleSendMsg(row) {
      if (row.createBy === this.userInfo.userId) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: row.createBy + "",
          type: 1,
        });
        const params1 = {
          targetId: row.createBy,
          recruitId: row.recruitId,
        };
        const { data } = await ifUserLinkUp(params1);
        if (!data) {
          const params2 = {
            dataId: row.recruitId,
            targetId: row.createBy,
            beforePage: 0,
          };
          await postMsgCustomInitiate(params2);
        }
      }
    },
    // 申请
    handleApply() {
      // 个人资料完善度低于 80% 的，给出提示，先进行完善
      if (this.userInfo.integrity < 80) {
        this.$confirm(
          "您的个人信息尚未完善，完善后可提高申请成功率哦",
          "信息提示",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "直接申请",
            cancelButtonText: "完善信息",
            type: "warning",
          },
        )
          // 直接申请
          .then(() => {
            this.applyFn();
          })
          // 去完善
          .catch(() => {
            this.$refs.infomation.open();
          });
      } else {
        this.applyFn();
      }
    },
    applyFn() {
      this.$confirm("是否确认进行此职位的投递？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deliveryPosition({
            recruitId: this.formData.recruitId,
          }).then(({ data }) => {
            if (data) this.$message.success("申请成功！");
          });
        })
        .catch(() => {});
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleProgress() {
      this.$openPage("/channel/progress_ladder", 2);
    },
    getCutValue(val) {
      if (!val) {
        return "";
      } else {
        const index = val.lastIndexOf("-");
        return val.slice(index + 1);
      }
    },
    handleCollect() {
      if (this.formData.collect) {
        deleteCollectionById({
          targetIds: [this.formData.recruitId],
          type: 7,
        }).then(({ data }) => {
          if (data) this.loadData(this.formData.recruitId);
        });
      } else {
        createCollection({
          targetId: this.formData.recruitId,
          type: 7,
          name: this.formData.name,
        }).then(({ data }) => {
          if (data) this.loadData(this.formData.recruitId);
        });
      }
    },
    // 参加考试
    handleJoinExam(row) {
      this.$refs.ExamViewDialog.id = row.examId;
      this.$refs.ExamViewDialog.dialogShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  .detail-content {
    background-color: #fff;
    padding: 20px;
    border-radius: $--large-border-radius;
    .detail-head {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .detail-head-top {
        width: 100%;
        .title-top,
        .head-middle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .title {
          display: flex;
          .name {
            font-family: "微软雅黑";
            color: $--color-text-primary;
            font-size: 20px;
            max-width: 400px;
          }
          .salary {
            color: $--color-primary;
            text-align: right;
            line-height: 30px;
            margin-left: 15px;
          }
          .reward {
            margin-left: 15px;
            display: flex;
            font-size: 14px;
            line-height: 30px;
            .icon {
              margin-top: 4px;
              width: 22px;
              height: 22px;
              line-height: 22px;
              border-radius: 50%;
              background-color: $--color-secondary;
              color: #fff;
              text-align: center;
              font-size: 12px;
            }
            .money {
              color: $--color-secondary;
              margin-left: 2px;
            }
          }
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-right: -10px;
          margin-bottom: -10px;
          max-width: 620px;
          .tag {
            background: $--background-color;
            border-radius: $--small-border-radius;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 5px 10px;
            font-size: 14px;
          }
        }
        .func {
          .func-item {
            display: flex;
            font-size: 14px;
            .func-icon {
              margin-right: 20px;
              i {
                margin-right: 5px;
                color: $--color-text-secondary;
              }
              span {
                color: $--color-text-secondary;
              }
            }
            .button {
              cursor: pointer;
              &:hover i,
              &:hover span {
                color: $--color-primary;
              }
            }
          }
        }
      }
      .button-list {
        text-align: right;
        .text {
          color: $--color-primary;
          border-color: $--color-primary;
          &:hover {
            background-color: $--custom-menu-background-color;
            color: $--color-primary;
          }
        }
        .primary {
          color: #fff;
          background-color: $--color-primary;
          border-color: $--color-primary;
          margin-left: 10px;
          &:hover {
            background: #f9695f;
            border-color: #f9695f;
          }
        }
      }
    }
    .detail-info {
      margin-top: 20px;
      padding: 16px 25px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: $--background-color;
      border-radius: $--border-radius-base;
      .info-item {
        display: flex;
        color: $--color-text-regular;
        width: calc(100% / 3);
        font-size: 14px;
        line-height: 32px;
        .label {
          width: 80px;
        }
        .span {
          width: calc(100% - 80px);
        }
      }
    }
    .detail-desc {
      margin-top: 30px;
      .title {
        font-size: 16px;
        color: $--color-text-regular;
        margin-bottom: 15px;
      }
      .desc-tags {
        display: flex;
        flex-wrap: wrap;
        margin-right: -10px;
        .desc-tag {
          background: $--custom-menu-background-color;
          color: $--color-primary;
          border-radius: $--small-border-radius;
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
      .desc-content {
        white-space: pre-wrap;
        font-size: 14px;
        line-height: 30px;
      }
      .address {
        margin-bottom: 20px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        .address-title {
          width: 700px;
          text-align: justify;
        }
        .show-title {
          color: $--color-secondary;
          cursor: pointer;
        }
        .is-show {
          display: flex;
          font-size: 14px;
          &:hover {
            i,
            .show-title {
              opacity: 0.7;
            }
          }
          i {
            display: inline-block;
            margin-right: 5px;
            line-height: 21px;
            vertical-align: middle;
          }
        }
      }
      .iep-map {
        height: 400px;
      }
    }
  }
  .detail-contact {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    border-radius: $--large-border-radius;
    font-size: 14px;
    .title {
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      margin-bottom: 25px;
      font-weight: 400;
    }
    .content {
      display: flex;
      .avatar {
        width: 65px;
        height: 65px;
        margin-right: 30px;
        border-radius: $--border-radius-base;
        border: 1px solid $--border-color;
      }
      .info-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .info {
          flex: 1;
          .head {
            display: flex;
            align-items: center;
            color: $--color-text-regular;
            margin-bottom: 10px;
            .name {
              font-size: 18px;
              font-family: "微软雅黑";
              color: $--color-text-primary;
            }
            span {
              margin: 0 10px;
            }
          }
          .desc {
            color: $--color-text-regular;
            display: flex;
            justify-content: space-between;
            .infomation {
              width: calc(100% - 100px);
              .desc-item {
                width: 50%;
                display: flex;
                margin-bottom: 10px;
              }
            }
          }
        }
        .desc-button {
          // width: 100px;
          .button {
            color: #fff;
            background-color: $--color-primary;
            border-color: $--color-primary;
            &:hover {
              background: #f9695f;
              border-color: #f9695f;
            }
          }
        }
      }
    }
  }
  .exam-list {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    .exam-head {
      display: flex;
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        color: $--color-text-primary;
      }
      .sub-title {
        font-size: 14px;
        color: $--color-text-secondary;
        height: 24px;
        line-height: 28px;
        margin-left: 20px;
      }
    }
    .exam-item {
      display: flex;
      font-size: 14px;
      margin-bottom: 20px;
      color: $--color-text-regular;
      &:last-of-type {
        margin: 0;
      }
      .item-name {
        flex: 1;
        i {
          color: $--color-primary;
          font-size: 16px;
        }
      }
      .item-href {
        color: $--color-secondary;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
      .is-effective {
        color: $--color-text-secondary;
        cursor: no-drop;
      }
    }
  }
}
</style>
