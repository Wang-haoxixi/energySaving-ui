<template>
  <el-dialog class="dialog" :visible="dialogShow" width="450px" @close="resetForm" :modal="false">
    <div slot="title" class="dialog-title-box">
      <span class="dialog-title">{{ title }}</span>
      <span class="sub-title" v-if="this.activeType === 'reason'">（请选择举报理由）</span>
    </div>
    <div class="report-reason" v-if="activeType === 'reason'">
      <div
        class="reason-item"
        v-for="(item, index) in dictGroup.get('dms_report_type')"
        :key="index"
        @click="handleChosen(item)"
      >
        {{item.label}}
        <i class="el-icon-woneng-arrowright"></i>
      </div>
    </div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="0px"
      class="report-form"
      v-else
    >
      <el-form-item label prop="tipOffReasonDetails">
        <el-input
          type="textarea"
          :rows="5"
          v-model="formData.tipOffReasonDetails"
          placeholder="举报详细说明"
          maxlength="140"
          show-word-limit
        ></el-input>
      </el-form-item>
      <div class="button-list">
        <iep-button type="primary" @click="handleSubmit" :loading="loadState">举报</iep-button>
        <iep-button @click="handleCancel" :loading="loadState">返回</iep-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { createReport } from "@/api/dms/tip_off_manage";
import { isvalidateSpace } from "@/util/validate";

const initForm = () => {
  return {
    tipOffReason: "",
    tipOffReasonDetails: "",
    tipOffType: 0,
    tipOffContentId: 0,
  };
};

const validateSpace = (rule, value, callback) => {
  if (isvalidateSpace(value)) {
    callback(new Error("请输入举报详细信息"));
  } else {
    callback();
  }
};

export default {
  components: {},
  computed: {
    ...mapGetters(["dictGroup"]),
    ...mapState({
      dialogShow: (state) => state.user.reportDialogShow,
      reportGroup: (state) => state.user.reportGroup,
    }),
    title() {
      if (this.activeType === "reason") {
        return "举报";
      } else {
        const title = this.reason.label;
        return title;
      }
    },
  },
  data() {
    return {
      reasonList: [],
      activeType: "reason", // 弹框的内容：reason - 选择类型页，form - 填写理由页
      reason: {},
      formData: initForm(),
      loadState: false,
      rules: {
        tipOffReasonDetails: [
          {
            required: true,
            message: "请输入举报详细信息",
            trigger: "blur",
          },
          {
            validator: validateSpace,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    resetForm() {
      this.formData = initForm();
      this.handleCancel();
      this.openReportDialog({ id: 0, type: 0, show: false });
    },
    handleChosen(row) {
      this.reason = { ...row };
      this.activeType = "form";
    },
    handleCancel() {
      this.loadState = false;
      this.activeType = "reason";
      this.reason = {};
    },
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          this.formData.tipOffType = this.reportGroup.type;
          this.formData.tipOffContentId = this.reportGroup.id;
          this.formData.tipOffReason = this.reason.value;
          createReport(this.formData)
            .then(({ data }) => {
              this.loadState = false;
              if (data) {
                this.$message.success(data);
                this.resetForm();
              }
            })
            .catch(() => {
              this.loadState = false;
            });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-title-box {
  .sub-title {
    font-size: 14px;
    color: $--color-text-secondary;
  }
}
.report-reason {
  border-top: 1px solid $--border-color;
  .reason-item {
    padding: 15px 15px 15px 0;
    border-bottom: 1px solid $--border-color;
    cursor: pointer;
    .el-icon-woneng-arrowright {
      position: absolute;
      right: 15px;
      font-size: 14px;
      color: #aaa;
      line-height: 18px;
    }
  }
}
.report-form {
  .button-list {
    text-align: right;
    margin-top: 20px;
  }
}
.button-list ::v-deep .el-button + .el-button {
  margin-left: 8px;
}
.dialog ::v-deep .el-dialog__body {
  padding: 20px;
  .reason-item {
    &::after {
      right: 15px;
    }
    &:hover {
      color: $--color-primary;
      &::after {
        color: $--color-primary;
      }
    }
  }
}
</style>
