<template>
  <iep-dialog :dialog-show="dialogShow" :title="`项目预审审核`" width="60%" @close="close">
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      label-width="120px"
      :rules="rules2"
      :disabled="dialogStatus==='detail'"
    >
      <iep-form-item label-name="项目建议资金(万):" prop="wangluoanquan">
        <el-input v-model.trim="form.wangluoanquan"></el-input>
      </iep-form-item>

      <iep-form-item label-name="审核意见:" prop="shujuanquan">
        <el-input v-model="form.shujuanquan" type="textarea"></el-input>
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
import { rules2, initForm } from "./option";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      methodName: "新增",
      dataTypeDict: [
        { label: "VARCHAR", value: "1" },
        { label: "DATE", value: "2" },
        { label: "INT", value: "3" },
        { label: "TEXT", value: "4" },
        { label: "FLOAT", value: "5" },
        { label: "YEAR", value: "6" },
        { label: "DOUBLE", value: "7" },
        { label: "LONGBLOB", value: "8" },
        { label: "BIGINT", value: "9" },
        { label: "TIMESTAMP", value: "10" },
        { label: "CHAR", value: "11" },
        { label: "DECIMAL", value: "12" },
        { label: "TINYINT", value: "13" },
        { label: "DATETIME", value: "14" },
        { label: "LONGTEXT", value: "15" },
        { label: "MEDIUMTEXT", value: "16" },
        { label: "BLOB", value: "17" },
        { label: "VARBINARY", value: "18" },
        { label: "GEOMETRY", value: "19" },
        { label: "TINYBLOB", value: "20" },
        { label: "TINYTEXT", value: "21" },
        { label: "SMALLINT", value: "22" },
      ],
      yesNoDict: [
        { label: "是", value: "1" },
        { label: "否", value: "2" },
      ],
      rules2,
    };
  },
  props: {
    dialogStatus: {
      type: String,
      default: "detail",
    },
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.close();
        }
      });
    },
    open(row) {
      this.form = row;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
