<template>
  <iep-dialog :dialog-show="dialogShow" title="个人信息" width="450px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="父级" prop="parentId">
        <el-select v-model="form.parentId" filterable placeholder="请选择父级">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="管理者" prop="charger">
        <el-input v-model="form.charger" placeholder="请输入管理者"></el-input>
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
import { initDeptForm } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      form: initDeptForm(),
      options: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initDeptForm();
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
