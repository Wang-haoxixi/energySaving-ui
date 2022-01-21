<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item v-if="form.type!=='0'" label-name="上级分类" prop="parentId">
        <el-select v-model="form.parentId" filterable placeholder="请选择上级分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="分类名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入分类名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="分类编码" prop="number">
        <el-input v-model.trim="form.number" placeholder="请输入分类编码"></el-input>
      </iep-form-item>
      <iep-form-item label-name="排序" prop="sort">
        <iep-input-number v-model="form.sort" placeholder="请输入排序"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
import formMixins from "@/mixins/formMixins";
import { postCategory, putCategory } from "@/api/admin/category";
export default {
  props: {
    parentId: {
      type: Number,
      default: -1,
    },
  },
  mixins: [formMixins],
  data() {
    return {
      form: initForm(this.parentId),
      methodName: "创建",
      dialogShow: false,
      formRequestFn: () => {},
      options: [],
    };
  },
  methods: {
    add(row, myTree) {
      this.form = initForm(this.parentId);
      if (row) {
        this.form.parentId = row.id;
      }
      this.methodName = "添加";
      this.formRequestFn = postCategory;
      this.options = myTree;
      this.dialogShow = true;
    },
    edit(row, myTree) {
      this.form = this.$mergeByFirst(initForm(this.parentId), row);
      this.form.categoryId = row.id;
      this.methodName = "编辑";
      this.formRequestFn = putCategory;
      this.options = myTree;
      this.dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm(this.parentId);
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
