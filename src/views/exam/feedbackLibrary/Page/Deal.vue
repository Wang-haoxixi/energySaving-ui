<template>
  <iep-dialog :dialog-show="dialogShow" title="反馈详情" width="640px" @close="_close()">
    <single
      ref="single"
      v-if="singleItems.length >= 1"
      :leng="singleItems.length"
      :itemData="singleItems[0]"
      :checkUse="true"
    ></single>
    <mutiple
      ref="mutiple"
      v-if="mutipleItems.length >= 1"
      :leng="mutipleItems.length"
      :itemData="mutipleItems[0]"
      :checkUse="true"
    ></mutiple>
    <judge
      ref="judge"
      v-if="judgeItems.length >= 1"
      :leng="judgeItems.length"
      :itemData="judgeItems[0]"
      :checkUse="true"
    ></judge>
    <fillBlank
      ref="judge"
      v-if="fillBlankItems.length >= 1"
      :leng="fillBlankItems.length"
      :itemData="fillBlankItems[0]"
      :checkUse="true"
    ></fillBlank>
    <qa
      ref="qa"
      v-if="qaItems.length >= 1"
      :leng="qaItems.length"
      :itemData="qaItems[0]"
      :checkUse="true"
    ></qa>
    <hr />
    <div class="div-content" style="margin-top: 8px;">
      <span v-if="form.type">纠错类型：{{getTypeName(form.type)}}</span>
    </div>
    <div class="div-content">
      <span>反馈时间：{{form.createTime}}</span>
    </div>
    <div class="div-content">
      <span>内容说明：</span>
      <el-input v-model="form.explanation" :rows="5" type="textarea" disabled></el-input>
    </div>
    <div v-if="form.result != 0" class="div-content">
      <span>处理意见：{{getResult(form.result)}}</span>
    </div>
    <div v-else>
      处理意见：
      <el-radio-group v-model="form.resultData">
        <el-radio :label="'1'">采纳</el-radio>
        <el-radio :label="'2'">未采纳</el-radio>
      </el-radio-group>
    </div>
    <iepFooterBar class="footer">
      <el-button
        class="iep-btn-l"
        type="primary"
        @click="handleSave()"
        v-if="form.result === '0'"
      >保存</el-button>
    </iepFooterBar>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getById, solve } from "@/api/qms/feedback";
import single from "../../testPaperLibrary/Page/testPaper/items/single";
import mutiple from "../../testPaperLibrary/Page/testPaper/items/mutiple";
import judge from "../../testPaperLibrary/Page/testPaper/items/judge";
import fillBlank from "../../testPaperLibrary/Page/testPaper/items/fillBlank";
import qa from "../../testPaperLibrary/Page/testPaper/items/qa";
import { dictsMap } from "../../const/feedbackOptions.ts";
export default {
  props: ["record"],
  mixins: [mixins],
  components: { single, mutiple, judge, fillBlank, qa },
  data() {
    return {
      dialogShow: false,
      form: {},
      formRequestFn: () => {},
      isDisabled: false,
      dataId: "",
      singleItems: [],
      mutipleItems: [],
      judgeItems: [],
      fillBlankItems: [],
      qaItems: [],
      dictsMap,
    };
  },
  computed: {},
  methods: {
    getResult(result) {
      return this.dictsMap.result[result];
    },
    getTypeName(type) {
      return this.dictsMap.type[type];
    },
    _close() {
      this.singleItems = [];
      this.mutipleItems = [];
      this.judgeItems = [];
      this.fillBlankItems = [];
      this.qaItems = [];
      this.dialogShow = false;
    },
    open(editData) {
      this.isDisabled = editData.edit;
      this.dataId = editData.id;
      if (editData.id != "") {
        getById(editData.id).then((res) => {
          const { data } = res;
          if (data.quesType === "RADIO") {
            data.index = 0;
            this.singleItems.push(data);
          }
          if (data.quesType === "CHECKBOX") {
            data.index = 0;
            this.mutipleItems.push(data);
          }
          if (data.quesType === "CHECKED") {
            data.index = 0;
            this.judgeItems.push(data);
          }
          if (data.quesType === "GAPFILLING") {
            data.index = 0;
            this.fillBlankItems.push(data);
          }
          if (data.quesType === "ESSAYQUESTION") {
            data.index = 0;
            this.qaItems.push(data);
          }
          this.form = data;
        });
      } else {
        this.form = {};
      }
    },
    handleSave() {
      if (!this.form.resultData) {
        this.$message.error("请选择处理意见");
        return;
      }
      const data = { id: this.form.id, result: this.form.resultData };
      solve(data).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.dialogShow = false;
          this.$emit("loadPage");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.item ::v-deep .el-form-item__content {
  display: inherit;
}
.footer {
  margin-top: 2%;
  ::v-deep .right-wrapper {
    float: none !important;
    padding: 0;
    text-align: center;
  }
}
.div-content {
  margin-bottom: 8px;
  ::v-deep .el-textarea {
    margin-top: 15px;
  }
}
</style>
