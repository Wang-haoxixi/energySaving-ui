<template>
  <iep-dialog
    :title="`${dialogTitle}收货信息`"
    :dialogShow="dialogShow"
    @close="_close()"
    width="600px"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="auto">
      <iep-form-item label-name="收货人" prop="consignee">
        <el-input v-model.trim="form.consignee" :maxlength="50" placeholder="请输入收货人姓名"></el-input>
      </iep-form-item>
      <iep-form-item label-name="联系电话" prop="phone">
        <el-input v-model.trim="form.phone" :maxlength="11" placeholder="请输入您的联系电话"></el-input>
      </iep-form-item>
      <iep-form-item label-name="邮箱" prop="mail">
        <el-input v-model.trim="form.mail" :maxlength="50" placeholder="请输入您的邮箱"></el-input>
      </iep-form-item>
      <iep-form-item label-name="邮编" prop="zipCode">
        <el-input v-model.trim="form.zipCode" :maxlength="6" placeholder="请输入您的邮编"></el-input>
      </iep-form-item>
      <iep-form-item label-name="地址信息" prop="cityArea">
        <CascaderCity v-model="form.cityArea"></CascaderCity>
      </iep-form-item>
      <iep-form-item label-name="详细地址" prop="address">
        <iep-input-area
          v-model.trim="form.address"
          placeholder="请输入详细地址"
          :maxlength="50"
          show-word-limit
        ></iep-input-area>
      </iep-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import CascaderCity from "./CascaderCity";
import formMixins from "@/mixins/formMixins";
import { AddressDTO } from "./options";
export default {
  components: {
    CascaderCity,
  },
  mixins: [formMixins],
  data() {
    return {
      dialogTitle: "新增",
      dialogShow: false,
      form: new AddressDTO(),
      formRequestFn: () => {},
      rules: {
        consignee: [
          { required: true, trigger: "blur", message: "请输入收货人姓名" },
        ],
        phone: [
          { required: true, trigger: "blur", message: "请输入您的联系电话" },
        ],
        mail: [{ required: true, trigger: "blur", message: "请输入您的邮箱" }],
        zipCode: [
          { required: true, trigger: "blur", message: "请输入您的邮编" },
        ],
        cityArea: [
          { required: true, trigger: "blur", message: "请输入地址信息" },
        ],
        address: [
          { required: true, trigger: "blur", message: "请输入详细地址" },
        ],
      },
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new AddressDTO();
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
