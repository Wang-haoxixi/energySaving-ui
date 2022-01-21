<template>
  <div>
    <iep-dialog :dialog-show="dialogShow" title="参数管理" width="650px" @close="_close()">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        class="iep-form-detail"
        label-width="120px"
        :disabled="disabled"
      >
        <iep-form-item class="iep-form-half" label-name="名称" prop="publicName">
          <el-input v-model.trim="form.publicName"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="键" prop="publicKey">
          <el-input v-model.trim="form.publicKey"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="值" prop="publicValue">
          <el-input v-model.trim="form.publicValue"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="编码" prop="validateCode">
          <el-input v-model.trim="form.validateCode"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="作用" prop="system">
          <IepDictsMapSelect v-model="form.system" :dictsMap="dictsMap.system"></IepDictsMapSelect>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="状态" prop="status">
          <IepDictsMapSelect v-model="form.status" :dictsMap="dictsMap.status"></IepDictsMapSelect>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="类型" prop="publicType">
          <IepDictsMapSelect v-model="form.publicType" :dictsMap="dictsMap.publicType"></IepDictsMapSelect>
        </iep-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
        <el-button @click="close">取消</el-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { initForm, dictsMap } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    const validateValue = (rule, value, callback) => {
      const reg = /^[A-Z_]*$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入大写英文、下划线"));
      }
    };
    return {
      dictsMap,
      disabled: false,
      form: initForm(),
      dialogShow: false,
      formRequestFn: () => {},
      rules: {
        publicKey: [
          { required: true, message: "请输入键", trigger: "blur" },
          {
            validator: validateValue,
            trigger: "blur",
          },
        ],
        publicValue: [{ required: true, message: "请输入值", trigger: "blur" }],
        publicType: [
          { required: true, message: "请输入类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>