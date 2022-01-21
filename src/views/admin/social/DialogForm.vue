<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="650px" @close="_close()">
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      label-width="120px"
      :rules="rules"
      :disabled="disabled"
    >
      <iep-form-item class="form-half" label-name="类型" prop="type">
        <el-select v-model.trim="form.type" placeholder="请填入类型">
          <el-option
            v-for="item in social_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="描述" prop="remark">
        <el-input v-model.trim="form.remark" placeholder="请填入描述"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="appId" prop="appId">
        <el-input v-model.trim="form.appId" placeholder="请填入appId"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="appSecret" prop="appSecret">
        <el-input v-model.trim="form.appSecret" placeholder="请填入appSecret"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="回调地址" prop="redirectUrl">
        <el-input v-model.trim="form.redirectUrl" placeholder="请填入回调地址"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from "./options";
import formMixins from "@/mixins/formMixins";
import { mapGetters } from "vuex";
export default {
  mixins: [formMixins],
  data() {
    return {
      rules,
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    social_type() {
      return this.dictGroup.get("social_type");
    },
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
