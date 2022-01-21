<template>
  <iep-dialog :dialog-show="dialogShow" title="添加备注" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" :rules="rules" ref="form" label-width="65px">
      <iep-form-item label-name="备注" prop="remarks">
        <iep-input-area v-model="form.remarks" placeholder="请输入备注"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { updateOrderByIdByType } from "@/api/fms/order";
import { RemarksFormDTO, typeMap } from "./options";
import formMixins from "@/mixins/formMixins";
import { mapGetters } from "vuex";
export default {
  mixins: [formMixins],
  data() {
    return {
      orderNumber: "",
      dialogShow: false,
      form: new RemarksFormDTO(),
      rules: {
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    updateOrderById() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return updateOrderByIdByType(suffer);
    },
  },
  methods: {
    async submitForm() {
      const { data } = await this.updateOrderById(this.orderNumber, this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new RemarksFormDTO();
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-form-detail {
  margin-top: 30px;
}
</style>
