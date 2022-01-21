<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}字典`" width="500px" @close="close">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="65px">
      <iep-form-item label-name="字典值" prop="value">
        <el-input v-model.trim="form.value"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字典名" prop="label">
        <el-input v-model.trim="form.label"></el-input>
      </iep-form-item>
      <iep-form-item label-name="排序" prop="sort">
        <iep-input-number :min="1" v-model="form.sort"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-operation-wrapper>
        <el-button type="primary" @click="handleSubmit()">保存</el-button>
      </iep-operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { _initRow } from "./options";
import { postChild, putChild } from "@/api/admin/dict";
export default {
  data() {
    return {
      dialogShow: false,
      form: _initRow(),
      methodName: "新增",
    };
  },
  methods: {
    handleSubmit() {
      let submitChild = null;
      if (this.form.id) {
        submitChild = putChild;
      } else {
        submitChild = postChild;
      }
      submitChild(this.form).then(() => {
        this.close();
      });
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
