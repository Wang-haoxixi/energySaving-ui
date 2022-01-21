<template>
  <iep-dialog :dialog-show="dialogShow" :title="`字段新增`" width="80%" @close="close">
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      label-width="120px"
      :rules="rules2"
      :disabled="dialogStatus==='detail'"
    >
      <iep-form-item label-name="字段中文名" prop="dataCn" class="half-line">
        <el-input v-model.trim="form.dataCn"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字段英文名" prop="dataEn" class="half-line">
        <el-input v-model.trim="form.dataEn"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字段类型" prop="dataType" class="half-line">
        <el-select v-model.trim="form.dataType">
          <el-option
            v-for="item in dataTypeDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="默认值" prop="defaults" class="half-line">
        <el-input v-model="form.defaults"></el-input>
      </iep-form-item>
      <iep-form-item label-name="是否主键" prop="isPrimaryKey" class="half-line">
        <el-select v-model.trim="form.isPrimaryKey">
          <el-option
            v-for="item in yesNoDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="是否为空" prop="isNull" class="half-line">
        <el-select v-model.trim="form.isNull">
          <el-option
            v-for="item in yesNoDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="长度" prop="dataLength" class="half-line">
        <iep-input-number v-model="form.dataLength"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="排序" prop="sort" class="half-line">
        <iep-input-number v-model="form.sort"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="注释" prop="notes">
        <el-input v-model="form.notes" type="textarea"></el-input>
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
.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
