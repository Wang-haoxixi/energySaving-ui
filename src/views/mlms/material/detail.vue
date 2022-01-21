<template>
  <div
    :oncontextmenu="`return ${formData.secrecyLevel == 1 ? false : true}`"
    :onselectstart="`return ${formData.secrecyLevel == 1 ? false : true}`"
  >
    <iep-basic-container>
      <el-col class="left">
        <iep-page-header :title="formData.materialName" :backOption="backOption" v-if="!isBack">
          <span class="original" slot="left" v-if="formData.isOriginal === '1'">原创</span>
        </iep-page-header>
        <iep-page-header :title="formData.materialName" :backOption="{isBack: false}" v-else>
          <span class="original" slot="left" v-if="formData.isOriginal === '1'">原创</span>
        </iep-page-header>

        <el-row class="info">
          <div class="person">
            <div class="create">
              <div class="name">作者：{{formData.createUser}}</div>
            </div>
            <div class="date">{{formData.createTime}}</div>
            <div class="certified" v-if="formData.isCertified === 1">
              <i class="el-icon-woneng-banquan"></i>
            </div>
            <i class="el-icon-woneng-heart collect" @click="handleCollect"></i>
            <i class="el-icon-woneng-jubao1 collect" @click="handleReport"></i>
            <div class="views">
              <i class="el-icon-woneng-yanjing1 collect"></i>
              <span>{{formData.views}}人浏览</span>
            </div>
          </div>
        </el-row>
        <el-row class="sub-title">{{formData.materialIntro}}</el-row>
        <!-- 是否付费 -->
        <el-row class="content" v-if="formData.isPay === 1 || formData.isSoPay === 1">
          <iep-jodit-read v-model="formData.materialContent"></iep-jodit-read>
          <div class="create">
            <div class="createUser">
              <span>上传者：</span>
              <iep-popover-user-card
                :user-id="formData.createBy"
                v-if="formData.createBy"
                class="popover"
              >
                <div class="user-card-span">
                  <iep-img class="avatar-img" :src="formData.avatar"></iep-img>
                  <span>{{formData.realName}}</span>
                </div>
              </iep-popover-user-card>
            </div>
          </div>
          <div class="createUser" v-if="formData.downloadCost > 0">专栏价值：{{formData.downloadCost}}宝贝</div>
        </el-row>
        <el-row class="content" v-else>
          <!-- <div class="substance">{{formData.materialContent}}</div> -->

          <div class="pay" @click="handlePay">
            <div class="hr">----------</div>
            <div class="pay-button">
              请付费
              <span>{{formData.downloadCost}}宝贝</span>
              阅读剩余内容
            </div>
            <div class="hr">----------</div>
          </div>
        </el-row>
        <el-row class="down-load" v-if="formData.attachMultiFileList.length > 0">
          相关附件：
          <div class="file" v-for="item in formData.attachMultiFileList" :key="item.attachFile">
            <div @click="downLoad(item)">
              <i class="icon-fujian"></i>
              {{item.original}}
            </div>
          </div>
        </el-row>
        <!-- 来源说明 -->
        <el-row class="remark">
          <Remarks :formData="formData"></Remarks>
        </el-row>
        <!-- <el-row class="responsibility">
          <div>免责声明：</div>
          <p>本文版权归原作者所有，仅供学习交流使用，不构成商业目的，如涉及作品内容、版权和其它问题，请在30日内与本平台联系，我们将在第一时间处理。</p>
        </el-row>-->
        <el-row class="footer">
          <div class="footer-left">
            <!-- <iep-tag v-model="formData.tag"></iep-tag> -->
            <el-tag type="danger" v-for="(item, index) in formData.tag" :key="index">{{item}}</el-tag>
          </div>
        </el-row>
        <!-- 评论 -->
        <CommonComment type="material" :id="formData.id" v-if="formData.id"></CommonComment>
      </el-col>

      <el-col class="right" v-if="false">
        <div class="info">
          <div class="name">{{formData.creatorRealName}}</div>
          <div class="num">共{{materialTotal}}篇材料</div>
          <div class="foot">
            <iep-button @click="apprentice">向他拜师</iep-button>
          </div>
        </div>
        <div class="material">
          <h3>优秀材料</h3>
          <p
            v-for="(item, index) in greatMaterialList"
            :key="index"
            @click="handleDetail(item)"
          >{{item.name}}</p>
        </div>
      </el-col>
    </iep-basic-container>
    <!-- 支付窗口 -->
    <PayDialog ref="pay" @suceess_pay="suceessPay"></PayDialog>
  </div>
</template>

<script>
import { getDataById } from "@/api/dms/material";
import { mapGetters, mapMutations } from "vuex";
import { downloadFile } from "@/api/common";
import PayDialog from "./payDialog";
import { createCollection } from "@/api/dms/collection";
import Remarks from "./remarks";

export default {
  components: { PayDialog, Remarks },
  data() {
    return {
      formData: {
        materialContent: "",
        isPay: 1,
        attachMultiFileList: [],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          const params = this.$route.params;
          if (params.id) {
            this.$router.go(-1);
          } else {
            this.$emit("load-page", false);
          }
        },
      },
      materialTotal: 0,
      greatMaterialList: [],
      isDelete: true,
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
    isBack() {
      return window.history.length <= 1;
    },
  },
  methods: {
    // 评论
    submit() {
      if (this.comment.commentContent == "") {
        this.$message.error("请先填写评论的内容！");
        return;
      }
    },
    getDataById(row) {
      getDataById(row.id).then(({ data, msg }) => {
        if (!data) {
          this.$message.error(msg);
          this.isDelete = false;
          return;
        }
        this.formData = Object.assign({}, this.formData, data);
      });
    },
    open(id) {
      this.getDataById({ id: id });
    },
    // 订阅
    subscribe() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    // 拜师
    apprentice() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    // 分享
    handleShare() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    // 纠错
    handleWrong() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    // 评论
    handleComment() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    // 打赏
    handleReward() {
      this.$message.info("抱歉，此功能正在开发中");
    },
    getMoney(val) {
      for (const item of this.dictGroup.get("dms_download_cost")) {
        if (item.value == val) {
          return item.label;
        }
      }
    },
    // 附件下载
    downLoad(row) {
      if (this.formData.isPay === 1 || this.formData.isSoPay === 1) {
        downloadFile({
          url: row.attachFile,
          name: row.original,
        });
      }
    },
    handlePay(state) {
      this.$refs.pay.open(this.formData, state);
    },
    suceessPay(data, state) {
      this.getDataById(this.formData);
      if (state === "downLoad") {
        this.downLoad();
      }
    },
    // 收藏
    handleCollect() {
      createCollection({
        targetId: this.formData.id,
        type: this.formData.orgId ? 0 : 1,
        name: this.formData.materialName,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport() {
      this.openReportDialog({ id: this.formData.id, type: 6 });
    },
  },
  created() {
    const params = this.$route.params;
    if (params.id) {
      this.open(params.id);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.open(to.params.id);
    next();
  },
};
</script>

<style lang="scss" scoped>
.left {
  // width: calc(100% - 370px);
  width: 100%;
  min-width: 560px;
  margin-right: 20px;
  .original {
    border: 1px solid $--color-primary;
    border-radius: $--small-border-radius;
    color: $--color-primary;
    font-size: 12px;
    padding: 4px 10px;
    margin-left: 20px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-wrap: wrap;
    .person {
      flex: 1;
      display: flex;
      font-size: 14px;
      .create {
        display: flex;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          line-height: 30px;
        }
      }
      .date {
        color: $--color-text-secondary;
        line-height: 30px;
      }
      .collect {
        cursor: pointer;
        line-height: 30px;
        margin-right: 15px;
        &:hover {
          color: $--color-primary;
        }
      }
      .views {
        i {
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .certified {
        line-height: 30px;
      }
      .icon {
        line-height: 20px;
        margin-right: 5px;
      }
      > div,
      .popover {
        margin-right: 30px;
      }
    }
    .operat {
      display: flex;
      line-height: 18px;
      .button {
        margin-right: 10px;
        color: $--color-text-regular;
        i {
          font-size: 16px !important;
        }
      }
    }
    .classes {
      width: 100%;
      div {
        display: inline-block;
      }
    }
  }
  .sub-title {
    padding: 20px;
    font-size: 14px;
    line-height: 28px;
    text-align: justify;
    border-radius: 5px;
    background-color: $--background-color;
  }
  .content {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid $--border-color;
    .createUser {
      margin-top: 32px;
      font-size: 14px;
      color: $--color-text-secondary;
      .user-card-span {
        display: inline-block;
        .avatar-img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: bottom;
          margin-right: 3px;
        }
      }
    }
    .pay {
      text-align: center;
      // display: flex;
      width: 100%;
      margin: auto;
      cursor: pointer;
      .hr {
        display: inline-block;
        color: #bbb;
      }
      .pay-button {
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
        color: $--color-text-secondary;
        span {
          color: $--color-primary;
        }
      }
    }
  }
  .responsibility {
    padding: 0 20px;
    margin-bottom: 20px;
    div {
      font-size: 14px;
      margin-bottom: 5px;
    }
    p {
      margin: 0;
      line-height: 14px;
      font-size: 12px;
      color: $--color-text-secondary;
    }
  }
  .substance {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 32px;
    height: 66px;
    overflow: hidden;
  }
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    .file {
      margin-top: 15px;
      font-size: 14px;
      cursor: pointer;
      color: $--color-primary;
      &:hover {
        opacity: 0.7;
      }
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: $--color-text-secondary;
      }
      &:hover i,
      &:hover .tip {
        color: $--color-primary;
      }
    }
  }
  .footer {
    justify-content: space-between;
    margin-bottom: 50px;
    .el-button {
      margin-left: 10px;
    }
    .footer-left {
      float: left;
      text-align: left;
      margin-bottom: 10px;
      padding: 0 20px;
      .el-tag {
        margin: 0 10px 10px 0;
      }
    }
    .footer-right {
      float: right;
      .wrong {
        cursor: pointer;
        i {
          font-size: 16px !important;
        }
      }
    }
  }
  .comment {
    .form {
      .button {
        text-align: right;
        margin-top: 15px;
      }
    }
    .list {
      display: flex;
      border-bottom: 1px solid $--border-color;
      margin-bottom: 10px;
      padding: 10px 0;
      .img {
        margin-right: 5px;
        width: 50px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .comment-info {
        width: 100%;
        .name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #5473b6;
          margin-bottom: 10px;
          .rate {
            margin-left: 5px;
            font-size: 14px;
          }
        }
        p {
          margin: 0 0 10px 0;
          word-break: break-all;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          .time {
            color: $--color-text-secondary;
          }
        }
        .button {
          height: 20px;
          line-height: 20px;
          cursor: pointer;
          i {
            font-size: 16px !important;
            margin-right: 5px;
            color: $--color-text-secondary;
          }
        }
        .button-chosen {
          color: #f00;
        }
      }
      .reply {
        padding: 15px;
        background-color: #f3f3f3;
        .title {
          height: 50px;
          line-height: 30px;
          display: flex;
          .img {
            width: 40px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          span {
            margin: 0 5px;
            color: #5473b6;
          }
        }
        .info {
          margin-bottom: 10px;
        }
      }
    }
    .pagination {
      text-align: right;
    }
    .footer-button {
      margin-top: 20px;
      text-align: right;
    }
  }
}
.right {
  border: 1px solid $--border-color;
  width: 350px;
  padding: 20px;
  .info {
    border-bottom: 1px solid $--border-color;
    padding-bottom: 15px;
    .name {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .num {
      color: $--color-text-secondary;
      margin-bottom: 10px;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .material {
    padding: 20px 0;
    h3 {
      font-size: 18px;
    }
    p {
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }
}
pre {
  white-space: pre-wrap; /* css3.0 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.rate {
  width: 160px;
  display: inline-block;
  font-size: 28px;
}
</style>

<style scoped>
.footer-right >>> .five-key {
  padding: 0;
}
.footer-right >>> .icon-box {
  margin: 5px;
}
.img >>> .el-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.img >>> .el-image__inner {
  border-radius: 50%;
}
</style>
