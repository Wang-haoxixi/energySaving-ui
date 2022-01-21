<template>
  <iep-basic-container>
    <el-col class="left">
      <iep-page-header :title="formData.title" :backOption="backOption">
        <div slot="sub" class="tags">
          <!-- <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail> -->
        </div>
        <i class="el-icon-woneng-zhuanfa button" @click="handleShare"></i>
        <i class="el-icon-woneng-heart button" @click="handleCollect"></i>
      </iep-page-header>

      <div class="detail">
        <div class="content">
          <h3 class="title">会议内容</h3>
          <iep-jodit-read v-model="formData.meetingContent"></iep-jodit-read>
        </div>
        <div class="content">
          <h3 class="title">会议总结</h3>
          <pre>{{formData.meetingCon}}</pre>
        </div>
        <div class="content">
          <h3 class="title">感想与困惑</h3>
          <pre>{{formData.thoughtsProblem}}</pre>
        </div>
      </div>
    </el-col>

    <el-col class="right">
      <div class="icon">
        <i class="el-icon-woneng-huiyi1"></i>
      </div>
      <h3 class="title">会议时间</h3>
      <p class="content" v-text="formData.meetingTime"></p>
      <h3 class="title">会议地点</h3>
      <p class="content" v-text="formData.meetingLocation"></p>
      <h3 class="title">发送人</h3>
      <p class="content" v-text="formData.creatorRealName"></p>
      <h3 class="title">主持人</h3>
      <p class="content" v-text="formData.hostName"></p>
      <h3 class="title">参会人</h3>
      <p class="content" v-text="formData.attendeeName"></p>
      <h3 class="title">抄送人</h3>
      <p class="content" v-text="formData.receiverName"></p>
    </el-col>
    <!-- 返回顶部 -->
    <el-backtop
      target=".container .iep-basic-scroll"
      :visibility-height="1500"
      :bottom="200"
      :right="180"
    >
      <div class="cancel-top">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-backtop>
    <!-- 分享 -->
    <ShareDialog ref="share" :orgId="formData.orgId" v-if="formData.orgId"></ShareDialog>
  </iep-basic-container>
</template>
<script>
import { getDataById } from "@/api/dms/meeting_summary";
import { mapGetters } from "vuex";
import { createCollection } from "@/api/dms/collection";
import ShareDialog from "./share";

export default {
  components: { ShareDialog },
  props: {
    detailState: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      formData: {
        meetingContent: "",
        list: [
          { id: 1, name: "项目管理" },
          { id: 2, name: "营商环境" },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          if (this.detailState) {
            this.$emit("backPage", false);
          } else {
            this.$router.history.go(-1);
          }
        },
      },
      previewState: false,
    };
  },
  methods: {
    open(id) {
      this.loadDetail(id);
    },
    loadDetail(id) {
      getDataById(id).then(({ data, msg }) => {
        if (!data) {
          this.$message.error(msg);
          return;
        }
        this.handleDealData(data);
      });
    },
    // 处理数据，展示数据
    handleDealData(data, state) {
      this.previewState = state;
      data.hostName = data.host.name || "无";
      // 获取人物
      const fn = row => {
        let list = [];
        if (Array.isArray(row)) {
          list = row.map(m => m.name);
        } else {
          for (const key in row) {
            list = list.concat(row[key].map(m => m.name));
          }
        }
        if (list.length === 0) {
          return "无";
        } else {
          return list.join("、");
        }
      };
      data.attendeeName = fn(data.attendeeList || data.attendee); // 参会人
      data.receiverName = fn(data.receiverList || data.receiver); // 抄送人
      this.formData = { ...data };
    },
    // 收藏
    handleCollect() {
      createCollection({
        targetId: this.formData.id,
        type: 4,
        name: this.formData.title,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
    // 分享
    handleShare() {
      this.$refs.share.open(this.formData);
    },
  },
  created() {
    const params = this.$route.params;
    if (params.id) {
      this.loadDetail(params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: calc(100% - 370px);
  margin-right: 20px;
  .tags {
    .el-tag {
      margin-right: 10px;
    }
  }
  .button {
    margin-right: 25px;
    cursor: pointer;
  }
  .detail {
    border-bottom: 1px solid $--border-color;
    margin-bottom: 30px;
    .content {
      margin-bottom: 30px;
      color: $--color-text-regular;
      .title {
        font-size: 18px;
        color: $--color-text-primary;
      }
      pre {
        line-height: 25px;
        color: $--color-text-regular;
        white-space: pre-wrap; /* css3.0 */
        white-space: -moz-pre-wrap; /* Firefox */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
      }
    }
  }
}
.right {
  border: 1px solid $--border-color;
  width: 350px;
  padding: 20px 10px;
  text-align: center;
  .icon {
    width: 100px;
    height: 100px;
    border: 1px solid $--border-color;
    border-radius: 50%;
    text-align: center;
    margin-left: 115px;
    line-height: 140px;
    i {
      font-size: 66px !important;
      color: #bbb;
    }
  }
  .title {
    font-weight: 700;
    font-size: 16px;
    margin: 20px 0 10px;
  }
  .content {
    margin-bottom: 50px;
  }
}
.top {
  position: fixed;
  bottom: 100px;
  right: 250px;
  z-index: 100;
  background-color: #f3f3f3;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 3px 3px #c8c8c8;
  i {
    width: 20px;
    height: 20px;
  }
}
.cancel-top {
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 44px;
  color: $--color-primary;
}
</style>

<style scoped>
.img >>> .el-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.img >>> .el-image__inner {
  border-radius: 50%;
}
.button-list >>> .five-key {
  padding: 0;
}
.button-list >>> .icon-box {
  margin: 5px;
}
</style>
