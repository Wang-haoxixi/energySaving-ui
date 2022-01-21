<template>
  <iep-basic-container class="iep-page-form">
    <iep-page-header :title="`${methodName === 'create' ? '新增' : '修改'}问答`" :backOption="backOption"></iep-page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="form-detail">
      <el-form-item label="标准问题：" prop="question">
        <el-input v-model="formData.question"></el-input>
      </el-form-item>
      <el-form-item label="相似问法：" class="question-list">
        <div class="similar" v-for="(item, index) in formData.questionList" :key="index">
          <el-input v-model="formData.questionList[index].key" class="question-item"></el-input>
          <iep-button class="delete-button" @click="handleDeleteQuestion(index)">
            <i class="el-icon-delete"></i>
          </iep-button>
        </div>
        <el-button type="primary" style="margin-bottom:10px" plain @click="handlePush">
          <i class="el-icon-plus"></i> 新增相似问题
        </el-button>
      </el-form-item>
      <el-form-item label="官方标准回答：" prop="replyStr">
        <iep-jodit-editor v-model="formData.replyStr"></iep-jodit-editor>
      </el-form-item>
      <el-form-item label="客服回答：" prop="colloquialReplyStr">
        <iep-jodit-editor v-model="formData.colloquialReplyStr"></iep-jodit-editor>
      </el-form-item>
      <!-- <el-form-item label="标签：" prop="tags">
        <iep-tag v-model="formData.tags" plus></iep-tag>
      </el-form-item>-->

      <el-row>
        <el-col :span="12">
          <el-form-item label="问题分类：" prop="types">
            <el-cascader
              ref="cascader"
              v-model="formData.types"
              :options="selectOption"
              :props="cascaderProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否禁用：" prop="isUsed">
            <el-radio-group v-model="formData.isUsed">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <IepFooterBar>
      <el-button class="button" type="primary" @click="submitForm('form')" :loading="loadState">保存</el-button>
      <iep-button class="button" @click="resetForm">重置</iep-button>
    </IepFooterBar>
  </iep-basic-container>
</template>

<script>
import { initFormData, rules, dictsMap } from "./options";
import { saveOrUpdateOne } from "@/api/ims/question";

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loadState: false,
      formData: initFormData(),
      rules: rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm();
          this.$emit("load_page", false);
        },
      },
      selectOption: [],
      cascaderProps: {
        checkStrictly: true,
        value: "id",
        label: "typeName",
        children: "subType",
      },
      methodName: "create",
    };
  },
  methods: {
    loadPage() {
      this.$emit("load_page", true);
    },
    resetForm() {
      this.loadState = false;
      this.formData = initFormData();
    },
    open(state, row) {
      this.methodName = state;
      if (state === "create") {
        this.formData = initFormData();
      } else {
        row.questionList = [];
        for (const key in row.likeQuestions) {
          row.questionList.push({
            key: key,
            id: row.likeQuestions[key],
          });
        }
        // 判断分类是否是多级，需要取到前一级的数据
        for (const item of this.selectOption) {
          if (item.id === row.type) {
            row.types = [row.type];
          }
        }
        if (!row.types) {
          row.types = this.getType(this.selectOption, row.type);
        }
        row.tags = row.tags || [];
        this.formData = row;
      }
    },
    getType(list, val) {
      for (const item of list) {
        if (item.subType) {
          for (const li of item.subType) {
            if (li.id === val) {
              return [item.id, li.id];
            }
          }
        }
      }
      return [];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadState = true;
          this.formData.type = this.formData.types[
            this.formData.types.length - 1
          ];
          this.formData.likeQuestions = {};
          for (const item of this.formData.questionList) {
            this.formData.likeQuestions[item.key] = item.id;
          }
          saveOrUpdateOne(this.formData).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("保存成功");
              this.resetForm();
              this.$emit("load_page", true);
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    handlePush() {
      const list = this.formData.questionList;
      if (list.length > 0 && list[list.length - 1].key === "") {
        this.$message.error("请先完善上一条相似问题");
        return;
      }
      this.formData.questionList.push({
        key: "",
        id: "",
      });
    },
    handleDeleteQuestion(index) {
      if (this.formData.questionList.length > 1) {
        this.formData.questionList.splice(index, 1);
      } else {
        this.formData.questionList[index].key = "";
      }
    },
    handleChange() {
      this.$refs["cascader"].toggleDropDownVisible();
    },
  },
  created() {},
  watch: {
    options: {
      handler(val) {
        const list = [];
        for (const item of val) {
          const row = { ...item };
          if (row.subType.length === 0) {
            delete row.subType;
          } else {
            for (const child of row.subType) {
              if (child.subType.length === 0) delete child.subType;
            }
          }
          list.push(row);
        }
        this.selectOption = list;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.question-list {
  &::v-deep .el-form-item__content {
    display: block;
  }
  .similar {
    display: flex;
    .question-item {
      margin: 0 10px 10px 0;
    }
    .delete-button {
      // margin-right: 10px;
      width: 42px;
      height: 42px;
      line-height: 14px;
    }
  }
}
.iep-page-form {
  position: relative;
  .form-detail {
    position: relative;
  }
  // .footer-toolbar {
  //   position: absolute;
  //   width: calc(100% - 48px);
  //   bottom: 0;
  //   right: 0;
  //   height: 56px;
  //   line-height: 56px;
  //   -webkit-box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  //   box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  //   background: #fff;
  //   border-top: 1px solid #e8e8e8;
  //   padding: 0 24px;
  //   z-index: 500;
  //   text-align: right;
  //   .button {
  //     margin-left: 10px;
  //     width: 90px;
  //     height: 36px;
  //     line-height: 14px;
  //     text-align: center;
  //   }
  // }
}
</style>
