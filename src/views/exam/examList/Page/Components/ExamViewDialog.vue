<template>
  <iep-dialog
    class="iep-dialog"
    :dialog-show="dialogShow"
    :title="'考试说明'"
    width="900px"
    @close="_close()"
    @mounted="loadAll()"
  >
    <exam-explain
      v-loading="loading"
      :explainData="explainData"
      :explainPartData="explainPartData"
      :situationId="situationId"
      @join="emitJoin"
      @continue="emitContinue"
      @reload="reloadPage"
    ></exam-explain>
    <template slot="footer">
      <el-button type="primary" @click="startStudy()" plain>开始学习</el-button>
      <el-button type="primary" v-if="beginStatus == 1" @click="emitJoin" :loading="loading">开始考试</el-button>
      <el-button
        type="primary"
        v-if="explainData.allowRepeat == 1"
        @click="emitJoin"
        :loading="loading"
      >再次考试</el-button>
      <el-button
        type="primary"
        v-if="beginStatus == 3 && explainData.commitState === '1'"
        @click="emitContinue"
        :loading="loading"
      >继续考试</el-button>
      <el-button
        type="primary"
        v-if="['2'].includes(explainData.commitState) && explainData.allowRepeat == 0"
        @click="emitView(explainData.id)"
        :loading="loading"
      >查看考试</el-button>
      <el-button
        type="primary"
        plain
        v-if="['3'].includes(explainData.commitState)"
        @click="emitView"
        disabled
      >试卷未批改完成</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import examExplain from "./examExplain";
import { getExamInfoV2ById, getDetailPartOne } from "@/api/qms/examList";
import { encryption } from "@/util/util";
import { checkState } from "@/api/qms/test_questions_library";

export default {
  inject: ["reload"],
  components: {
    examExplain,
  },
  data() {
    return {
      id: 0,
      situationId: 0,
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
      explainPartData: {},
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },

    loadAll() {
      this.load();
    },

    reloadPage(id) {
      this.id = id;
      this.load();
    },
    async load() {
      this.loading = true;
      try {
        await this.load1();
        await this.load2();
      } catch (error) {
        this._close();
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async load1() {
      const { data, code, message } = await getExamInfoV2ById(this.id, {
        situationId: this.situationId,
      });
      if (code) throw new Error(message);
      this.explainData = data;
      this.beginStatus = data.beginStatus;
      data.manageId && (this.manageId = data.manageId);
    },
    async load2() {
      const { data, code, message } = await getDetailPartOne(this.id);
      if (code) throw new Error(message);
      this.explainPartData = data;
    },

    emitJoin() {
      // 跳转到考试页的方法,safePassword为安全支付密码
      const cb = (value = "") => {
        this.dialogShow = false;
        this.state = "create";
        this.$router.push({
          name: "考试填报",
          params: {
            id: this.id,
            state: this.state,
            safePassword: value,
            situationId: this.situationId,
          },
        });
        this.reload();
      };
      if (this.explainData.certificateName) {
        this.$confirm(
          "当前考试会颁发证书，确认当前用户名称为真实姓名",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          },
        )
          .then(() => {
            // 如果付费 则走支付密码
            if (this.explainData.paymentStatus === 0)
              return this._handleComfirmBySafePassword(cb);
            cb();
          })
          .catch(() => {});
      } else {
        // 如果付费 则走支付密码
        if (this.explainData.paymentStatus === 0)
          return this._handleComfirmBySafePassword(cb);
        cb();
      }
    },

    emitContinue() {
      this.dialogShow = false;
      this.state = "continue";
      this.$openPage(`/exam_edit/${this.manageId}/${this.state}`);
    },
    emitView() {
      checkState({
        id: this.explainData.id,
        manageId: this.explainData.manageId,
      }).then(({ data }) => {
        if ("20" === data.code) {
          this.$message.error(data.hint);
        } else {
          this.state = "review";
          this.$openPage(`/exam_edit/${this.manageId}/${this.state}`);
        }
      });
    },

    _handleComfirmBySafePassword(cb) {
      this.$prompt("该考试为收费考试，请输入支付密码", "提示", {
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
    startStudy() {
      this.$openPage(
        `/channel/exam/study/${this.explainData.id}?name=${this.explainData.examName}`,
      );
      this.$emit("finishJumpStartStudy");
    },
  },
};
</script>
