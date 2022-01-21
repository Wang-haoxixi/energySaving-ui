<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="700px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px" :rules="rules" :disabled="disabled">
      <iep-form-item class="form-half" label-name="支付类型" prop="type">
        <el-select v-model.trim="form.type" placeholder="请填入支付类型">
          <el-option v-for="item in social_type" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </iep-form-item>
      <!-- <iep-form-item class="form-half" label-name="支付类型" prop="type">
        <el-input v-model.trim="form.type" placeholder="请填入支付类型"></el-input>
      </iep-form-item> -->

      <iep-form-item class="form-half" label-name="状态" prop="enable">
        <el-tooltip :content="dictMap.enable[form.enable]" placement="top">
          <el-switch v-model="form.enable" active-color="#13ce66" active-value="1" inactive-value="0">
          </el-switch>
        </el-tooltip>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="配置名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请填入配置名称"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="appId" prop="appId">
        <el-input v-model.trim="form.appId" placeholder="请填入appId"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="mchId" prop="mchId">
        <el-input v-model.trim="form.mchId" placeholder="请填入mchIdt"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="密钥" prop="secret">
        <el-input v-model.trim="form.secret" placeholder="请填入密钥"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="回调地址" prop="notifyUrl">
        <el-input v-model.trim="form.notifyUrl" placeholder="请填入回调地址"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules, dictMap } from "./options";
import formMixins from "@/mixins/formMixins";
import { mapGetters } from "vuex";
export default {
  mixins: [formMixins],
  data() {
    return {
      rules,
      dictMap,
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
