<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="520px" @close="handleCancel" center>
    <div class="center-box">
      <el-radio-group v-model="projectStatus" class="projectStatus">
        <el-radio :label="'3'">审核通过</el-radio>
        <el-radio :label="'4'">审核不通过</el-radio>
      </el-radio-group>
      <iep-input-area v-if="projectStatus === '4' && isContent" class="content" v-model="content">
      </iep-input-area>
    </div>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="handleSubmit">提交</el-button>
      <iep-button @click="handleCancel">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
// import { getProjectAnnouncement } from "@/api/fams/investment";
export default {
  name: "IepReviewConfirm",
  props: {
    isContent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: "",
      formRequestFn: () => {},
      dialogShow: false,
      projectStatus: "3", // 待审核
      content: "",
      id: null,
      ids: [],
      projectInformation: {},
      announcementSelection: [],
    };
  },
  computed: {
    currentIds() {
      if (this.id) {
        return [this.id];
      } else {
        return this.ids;
      }
    },
  },
  methods: {
    loadPage() {
      this.projectStatus = "3";
      this.content = "";
      this.dialogShow = false;
      this.$emit("load-page");
    },
    handleSubmit() {
      if (this.content.length > 2000) {
        this.$message("字数不得超过 2000 !");
        return;
      }
      this.formRequestFn({
        ids: this.currentIds,
        projectStatus: this.projectStatus, // 用来变更状态
        content: this.content,
      }).then(res => {
        if (res.data) {
          this.$message({
            message: "成功",
            type: "success",
          });
          /*
          if (this.projectStatus == "3") {
            const announcement = `公司公告：${
              this.projectInformation.applicantName
            }与${
              this.projectInformation.attendeeByName
                ? this.projectInformation.attendeeByName
                : ""
            }${
              this.projectInformation.relatedClientList
                ? this.projectInformation.relatedClientList.name
                : ""
            }签订了${
              this.projectInformation.projectName
            }，签订时间为${new Date().toLocaleDateString()}`;
            if (this.id) {
              // getProjectAnnouncement([
              //   { content: announcement, orgId: this.projectInformation.orgId },
              // ]).then(() => {});
            } else {
              const announcementSelectionEnd = this.announcementSelection.map(
                m => {
                  return {
                    content: `公司公告：${m.applicantName}与${
                      m.attendeeByName ? m.attendeeByName : ""
                    }${
                      m.relatedClientList ? m.relatedClientList.name : ""
                    }签订了${
                      m.projectName
                    }，签订时间为${new Date().toLocaleDateString()}`,
                    orgId: m.orgId,
                  };
                },
              );
              // getProjectAnnouncement(announcementSelectionEnd).then(() => {});
            }
          }
          */
        }
        this.loadPage();
      });
    },
    handleCancel() {
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.center-box {
  text-align: center;
  padding: 0 20px;
  .projectStatus {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
