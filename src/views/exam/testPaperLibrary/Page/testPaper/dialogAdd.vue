<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="dialogTitle"
    :width="step === 1 ? '400px' : '1000px'"
    @close="_close()"
  >
    <div v-if="step === 1">
      <el-form ref="form" :model="form" label-width="65px" :rules="rules">
        <iep-form-item label-name="题型" prop="type">
          <iep-dict-select
            v-model="form.type"
            dict-name="exam_question_type"
            placeholder="请选择题型"
            clearable
          ></iep-dict-select>
        </iep-form-item>
        <!-- <el-form-item label="分类">
          <el-input @focus="handleFocus" style="width:60%" v-model="form.qType"></el-input>
        </el-form-item>-->
      </el-form>
    </div>
    <div v-else>
      <questionList
        ref="questionList"
        @save="save"
        :formOption="form"
        :selectOption="selectOption"
        :btnDisabled="btnDisabled"
      ></questionList>
    </div>
    <template slot="footer">
      <template v-if="step === 1">
        <el-button type="primary" @click="handleAdd">下一步</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button @click="_close">取消</el-button>
      </template>
    </template>
  </iep-dialog>
</template>
<script>
import questionList from "./questionList";
export default {
  props: {},
  components: {
    questionList,
  },
  data() {
    return {
      dialogShow: false,
      dialogTitle: "添加题型",
      form: {},
      step: 1,
      selectOption: [],
      propTreeMenu: {},
      btnDisabled: false,
      rules: {
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
    open(type) {
      this.form = {};
      this.dialogShow = true;
      this.dialogTitle = "添加题型";
      if (type == "RADIO" || type == "CHECKBOX" || type == "CHECKED") {
        this.form.type = type;
        this.btnDisabled = true;
        this.step = 2;
      } else {
        this.step = 1;
      }
    },
    handleAdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.step = 2;
          this.dialogTitle = "选择试题";
          this.btnDisabled = false;
          this.form.qType = this.propTreeMenu.selectString || null;
          this.propTreeMenu = {};
        } else {
          return false;
        }
      });
    },
    handleSave() {
      this.$refs["questionList"].save();
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.form.qType = val.selectCn;
      });
    },
    save(data) {
      this._close();
      this.$emit("save", data);
    },

    _close() {
      this.form = {};
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .basic-container {
  padding: 0;
  border: 0;
}
::v-deep .operation-container {
  justify-content: flex-start;
}
::v-deep .input-wrapper {
  text-indent: 10px !important;
}
</style>
