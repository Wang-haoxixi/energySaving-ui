<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="标准问题:" prop="question">
        <el-input v-model="formData.question"></el-input>
      </el-form-item>
      <el-form-item label="相似问法:" prop="questionList">
        <div class="full-width">
          <div class="lawTerms" v-for="(item,index) in questionList" :key="index">
            <el-input
              :disabled="formStatus=='detail'"
              v-model="questionList[index].content"
              placeholder="请输入关联条目内容"
              maxlength="200"
              clearable
            ></el-input>
            <el-button
              type="primary"
              v-show="formStatus!='detail'"
              icon="el-icon-plus"
              circle
              v-if="index===0"
              class="btnMargin"
              @click="addInput('questionList')"
            ></el-button>
            <el-button
              type="danger"
              v-show="formStatus!='detail'"
              icon="el-icon-minus"
              circle
              v-else
              class="btnMargin"
              @click="cutInput(index,'questionList')"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="官方标准回答：" prop="replyStr">
        <iep-jodit-editor v-model="formData.replyStr"></iep-jodit-editor>
      </el-form-item>
      <el-form-item label="客服回答：" prop="colloquialReplyStr">
        <iep-jodit-editor v-model="formData.colloquialReplyStr"></iep-jodit-editor>
      </el-form-item>
      <el-form-item label="问题分类:" prop="type" class="half-line">
        <el-cascader
          v-model="formData.type"
          :options="question"
          @change="handleChange"
          class="full-width"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="是否禁用:" prop="isUsed" class="half-line">
        <el-radio-group v-model="formData.isUsed" class="full-width">
          <el-radio
            :label="item.value"
            v-for="item in isUsed"
            :value="item.value"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <iep-button @click="resetForm">重置</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm, rules, status } from "./const/options";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      status,
      formData: initForm(),
      loadState: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      rules,
      questionList: [{ content: "" }],
      question: [{ label: "常见问题", value: 1 }],
      isUsed: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
    };
  },
  methods: {
    handleChange() {},
    addInput(name) {
      const obj = {
        id: null,
        lawId: null,
        content: "",
      };
      this[name].push(obj);
      this.questionList = this[name];
    },
    cutInput(idx, name) {
      this[name].splice(idx, 1);
    },
    // 打开
    open(row) {
      this.formData = row;
      // console.log(row);
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    // 提交
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // // const row = { ...this.formData };
          // this.methodList[this.methodName].requestFn(row).then(({ data }) => {
          //   this.loadState = false;
          //   if (!data) {
          //     this.$message.error(data.msg);
          //   } else {
          if (this.formStatus == "create") {
            this.$message.success("新增成功");
          } else {
            this.$message.success("编辑成功");
          }
          this.loadPage();
          this.dialogShow = false;
        }
        //   });
        // } else {
        //   this.loadState = false;
        //   return false;
        // }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.lawTerms {
  display: flex;
  width: 100%;
  .btnMargin {
    margin-left: 10px;
  }
}

.lawTerms + .lawTerms {
  margin-top: 20px;
}

.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
