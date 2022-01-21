<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`友情链接分类${methodName}`"
    width="700px"
    @close="loadPage"
  >
    <el-form class="form-detail" :model="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="分类名称" prop="typeName">
        <el-input v-model="form.typeName" maxlength="150" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="分类编码" prop="typeNumber">
        <el-input v-model="form.typeNumber" maxlength="150" show-word-limit></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTypePageDetailById } from "@/api/conm/f_link_type_controller.ts";
import { initTypeForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initTypeForm(),
      rules,
      id: 0,
      siteId: 0,
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.form = initTypeForm();
      this.dialogShow = false;
    },
    loadTypeList() {
      getTypePageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
    },
    async submitForm() {
      this.formRequestFn({ siteId: this.siteId, ...this.form }).then(data => {
        if (data.code === 0) {
          this.$message.success("操作成功");
          this.loadPage();
          this.$emit("load-page");
        } else {
          this.$message(data.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &:hover .el-icon-circle-close {
    visibility: visible;
  }
}
.el-icon-circle-close {
  position: absolute;
  visibility: hidden;
  top: -7px;
  right: -7px;
  font-size: 16px;
  color: $--color-input-regular;
  &:hover {
    color: $--color-primary;
  }
}
.avatar-uploader:hover {
  border-color: $--color-primary;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: $--color-text-secondary;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
