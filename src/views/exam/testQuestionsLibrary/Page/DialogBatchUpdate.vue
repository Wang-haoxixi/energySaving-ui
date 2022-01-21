<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="批量更新"
    width="500px"
    @close="_close()"
    @mounted="initDict()"
  >
    <el-form class="iep-form-detail" ref="form" :model="form" :rules="rules" label-width="80px">
      <iep-form-item label-name="分类" prop="kind">
        <el-select v-model="form.kind" placeholder="请选择分类" clearable>
          <el-option
            v-for="item in dictOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="难度" prop="level">
        <IepDictSelect v-model="form.level" dictName="exam_difficulty" clearable></IepDictSelect>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import {
  getTestDictPage,
  updateQuestionBatchByIds,
} from "@/api/qms/test_questions_library";
import { customTree } from "@/util/util";
const initForm = () => {
  return {
    ids: [],
    kind: "",
    level: "",
  };
};
export default {
  mixins: [formMixins],
  data() {
    return {
      rules: {
        kind: [{ message: "请选择分类", trigger: "change" }],
        level: [{ message: "请选择难度", trigger: "change" }],
      },
      form: initForm(),
      dialogShow: false,
      dictOptions: [],
    };
  },
  methods: {
    async submitForm() {
      const { data } = await updateQuestionBatchByIds(this.form);
      if (data) {
        this._close();
      }
    },
    async initDict() {
      const params = { category: 1 };
      const {
        data: { children: data },
      } = await getTestDictPage(params);
      this.dictOptions = customTree(data, { label: "label", value: "value" });
    },
    open(ids) {
      this.form = initForm();
      this.form.ids = [...ids];
      this.dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
