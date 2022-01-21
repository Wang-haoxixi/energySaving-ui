<template>
  <iep-dialog
    class="iep-dialog"
    :dialog-show="dialogShow"
    :title="'试题反馈'"
    width="600px"
    @close="_close()"
  >
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      :disabled="false"
      label-width="95px"
      :rules="rules"
    >
      <el-form-item label="纠错类型：" label-width="100px" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="item.value" :key="item.value" v-for="item in typeDic">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容说明：" label-width="100px" prop="explanation">
        <el-input v-model="form.explanation" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <iepFooterBar class="footer">
      <el-button class="iep-btn-l" type="primary" @click="handleSave()">提交</el-button>
    </iepFooterBar>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { saveFeedback } from "@/api/qms/feedback";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      questionId: 0,
      form: {
        questionId: 0,
        type: "",
        explanation: "",
      },
      typeDic: [
        {
          label: "错别字",
          value: "1",
        },
        {
          label: "答案错误",
          value: "2",
        },
        {
          label: "题目不完整",
          value: "3",
        },
        {
          label: "其他",
          value: "4",
        },
      ],
    };
  },
  computed: {
    rules() {
      return {
        type: [{ required: true, message: "请选择", trigger: "blur" }],
        explanation: [
          { required: true, message: "请输入", trigger: "blur" },
          { max: 500, message: "内容说明不允许超过500个字" },
        ],
      };
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveData();
        } else {
          this.saveLoading = false;
        }
      });
    },
    saveData() {
      this.form.questionId = this.questionId;
      saveFeedback(this.form).then(res => {
        if (res.code === 0) {
          this.$message({
            message: "提交成功",
            type: "success",
          });
          this.$refs.form.resetFields();
          this.dialogShow = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 2%;
  float: right;
}
</style>
