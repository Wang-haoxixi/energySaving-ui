<template>
  <iep-dialog
    class="iep-dialog"
    :dialog-show="dialogShow"
    :title="'练习说明'"
    width="900px"
    @close="_close()"
    @mounted="loadAll()"
  >
    <exerciseExplain
      v-loading="loading"
      :explainData="explainData"
      @join="emitJoin"
      @continue="emitContinue"
      @reload="reload"
    ></exerciseExplain>
    <template slot="footer">
      <el-button type="primary" v-if="beginStatus == 1" @click="emitJoin" :loading="loading">开始练习</el-button>
      <el-button
        type="primary"
        v-if="explainData.allowRepeat == 1"
        @click="emitJoin"
        :loading="loading"
      >再次练习</el-button>
      <el-button
        type="primary"
        v-if="beginStatus == 3 && explainData.commitState === '1'"
        @click="emitContinue"
        :loading="loading"
      >继续练习</el-button>
      <el-button
        type="primary"
        v-if="['2'].includes(explainData.commitState) && explainData.allowRepeat == 0"
        @click="emitView(explainData.id)"
        :loading="loading"
      >查看练习</el-button>
      <el-button
        type="primary"
        plain
        v-if="['3'].includes(explainData.commitState)"
        @click="emitView"
        disabled
      >练习未批改完成</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import exerciseExplain from "./exerciseExplain";
import { getExerciseInfoById } from "@/api/qms/exam_exercise";
import { encryption } from "@/util/util";

export default {
  name: "ExerciseViewDialog",
  components: {
    exerciseExplain,
  },
  data() {
    return {
      id: 0,
      studySectionId: 0,
      manageId: 0,
      beginStatus: 1,
      dialogShow: false,
      explainData: {
        orgid: 0,
        commitState: "1",
        relatedExamList: [],
      },
      state: "create",
      loading: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },

    loadAll() {
      this.load();
    },
    reload(id) {
      this.id = id;
      this.load();
    },
    async load() {
      this.loading = true;
      try {
        const { data, code, message } = await getExerciseInfoById(
          this.id,
          this.studySectionId
            ? { studySectionId: this.studySectionId }
            : undefined,
        );
        if (code) throw new Error(message);
        this.explainData = data;
        this.beginStatus = data.beginStatus;
        data.manageId && (this.manageId = data.manageId);
      } catch (error) {
        this._close();
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    emitJoin() {
      // 跳转到考试页的方法,safePassword为安全支付密码
      const cb = (value = "") => {
        this.dialogShow = false;
        this.state = "create";
        this.$router.push({
          name: "练习填报",
          params: {
            id: this.id,
            state: this.state,
            safePassword: value,
            studySectionId: this.studySectionId,
          },
        });
        // this.$openPage(`/exam_edit/${this.id}/${this.state}`);
      };
      if (this.explainData.certificateName) {
        this.$confirm(
          "当前练习会颁发证书，确认当前用户名称为真实姓名",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          },
        )
          .then(() => {
            // 如果付费 则走支付密码
            if (
              this.explainData.chargeStatus === "2" &&
              this.explainData.paymentStatus === 0
            )
              return this._handleComfirmBySafePassword(cb);
            cb();
          })
          .catch(() => {});
      } else {
        // 如果付费 则走支付密码
        if (
          this.explainData.chargeStatus === "2" &&
          this.explainData.paymentStatus === 0
        )
          return this._handleComfirmBySafePassword(cb);
        cb();
      }
    },

    emitContinue() {
      this.dialogShow = false;
      this.state = "continue";
      this.$openPage(`/exercise_edit/${this.manageId}/${this.state}`);
    },
    emitView() {
      this.state = "review";
      this.$openPage(`/exercise_show/${this.manageId}/${this.state}`);
    },

    _handleComfirmBySafePassword(cb) {
      this.$prompt("该考试为收费练习，请输入支付密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputType: "password",
        inputPlaceholder: `请输入支付密码`,
        inputValidator: (val) => {
          return val ? true : `请输入支付密码`;
        },
        closeOnClickModal: false,
      })
        .then(({ value }) => {
          const res = encryption({ data: { value }, param: ["value"] });
          cb && cb(res.value);
        })
        .catch(() => {});
    },
  },
};
</script>
