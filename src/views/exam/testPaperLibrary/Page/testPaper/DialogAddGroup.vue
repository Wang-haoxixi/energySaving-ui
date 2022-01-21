<template>
  <iep-dialog :dialog-show="dialogShow" title="添加题型" width="600px" @close="_close()">
    <el-alert
      v-if="isShowTip"
      style="margin-bottom:10px;"
      title="部分类型试题库数量不足，无法完成抽题"
      type="warning"
    ></el-alert>
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="题型" prop="quesType">
        <IepDictSelect
          v-model="form.quesType"
          dictName="exam_question_type"
          :disabledIds="existQuesType"
          @change="loadConfig()"
        ></IepDictSelect>
      </iep-form-item>
      <iep-form-item label-name="试题分类" prop="kind">
        <el-input v-model="form.quesKind" @focus="handleFocus"></el-input>
      </iep-form-item>
      <el-form-item class="num-form-item" label-width="0">
        <div>
          <span>普通题数量</span>
          <span>{{result.simple}}</span>
          <span>题</span>
        </div>
        <div>
          <span>抽题数量</span>
          <iep-input-number
            v-model="form.simpleNum"
            :max="maxSimpleScore"
            :disabled="!maxSimpleScore"
          ></iep-input-number>
        </div>
        <div>
          <span>每题分值</span>
          <iep-input-number v-model="form.simpleScore" :max="100" :disabled="!form.simpleNum"></iep-input-number>
        </div>
      </el-form-item>
      <el-form-item class="num-form-item" label-width="0">
        <div>
          <span>较难题数量</span>
          <span>{{result.general}}</span>
          <span>题</span>
        </div>
        <div>
          <span>抽题数量</span>
          <iep-input-number
            v-model="form.middleNum"
            :max="maxGeneralScore"
            :disabled="!maxGeneralScore"
          ></iep-input-number>
        </div>
        <div>
          <span>每题分值</span>
          <iep-input-number v-model="form.middleScore" :max="100" :disabled="!form.middleNum"></iep-input-number>
        </div>
      </el-form-item>
      <el-form-item class="num-form-item" label-width="0">
        <div>
          <span>困难题数量</span>
          <span>{{result.difficult}}</span>
          <span>题</span>
        </div>
        <div>
          <span>抽题数量</span>
          <iep-input-number
            v-model="form.difficultNum"
            :max="maxDifficultScore"
            :disabled="!maxDifficultScore"
          ></iep-input-number>
        </div>
        <div>
          <span>每题分值</span>
          <iep-input-number v-model="form.difficultScore" :max="100" :disabled="!form.difficultNum"></iep-input-number>
        </div>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="handleAdd()">保存</el-button>
    </template>
    <dialogType ref="dialogType" @save="handleActive" :checkTreeMenu="propTreeMenu"></dialogType>
  </iep-dialog>
</template>
<script>
import dialogType from "@/views/exam/testQuestionsLibrary/Page/dialogType";
import { getTestDictPage } from "@/api/qms/test_questions_library";
import { getRandomConfig } from "@/api/exam/exam_ques_config";
const initForm = () => {
  return {
    testPaperId: "",
    quesType: null,
    quesKind: "",
    quesKindStr: "",
    simpleNum: 0,
    simpleScore: 0,
    middleNum: 0,
    middleScore: 0,
    difficultNum: 0,
    difficultScore: 0,
  };
};
export default {
  props: ["existQuesType"],
  components: {
    dialogType,
  },
  data() {
    return {
      result: {
        difficult: 0,
        general: 0,
        simple: 0,
      },
      propTreeMenu: {},
      form: initForm(),
      dialogShow: false,
      isEdit: false,
    };
  },
  computed: {
    isShowTip() {
      return (
        !this.maxSimpleScore || !this.maxGeneralScore || !this.maxDifficultScore
      );
    },
    maxSimpleScore() {
      const score = Math.floor(this.result.simple * 0.9);
      if (score >= 100) {
        return 100;
      } else {
        return score;
      }
    },
    maxGeneralScore() {
      const score = Math.floor(this.result.general * 0.9);
      if (score >= 100) {
        return 100;
      } else {
        return score;
      }
    },
    maxDifficultScore() {
      const score = Math.floor(this.result.difficult * 0.9);
      if (score >= 100) {
        return 100;
      } else {
        return score;
      }
    },
  },
  methods: {
    resetScore() {
      this.form.simpleNum = 0;
      this.form.simpleScore = 0;
      this.form.middleNum = 0;
      this.form.middleScore = 0;
      this.form.difficultNum = 0;
      this.form.difficultScore = 0;
    },
    handleAdd() {
      if (this.isEdit) {
        this.$emit("edit-ques", this.form);
      } else {
        this.$emit("add-ques", this.form);
      }
      this.close();
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },

    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.form.quesKind = val.selectCn;
        this.form.quesKindStr = val.selectString;
        this.loadConfig();
      });
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 1;
      const params = {};
      params.category = type;
      getTestDictPage(params).then((res) => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
    async loadConfig(
      quesType = this.form.quesType,
      quesKind = this.form.quesKindStr,
    ) {
      const params = {
        quesType,
        quesKind,
      };
      const { data } = await getRandomConfig(params);
      this.result = data;
      this.resetScore();
    },
  },
};
</script>
<style lang="scss" scoped>
.num-form-item ::v-deep .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.num-form-item ::v-deep .el-input-number {
  width: 100px;
}
</style>
