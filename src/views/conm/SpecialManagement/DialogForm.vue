<template>
  <iep-dialog :dialog-show="dialogShow" :title="`专题${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" :model="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="站点id">
        <el-input v-model="siteId" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="专题名称" prop="title">
        <el-input v-model="form.title" maxlength="150" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="描述">
        <el-input v-model="form.description" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="选择文章">
        <iep-operation-wrapper class="contact-wrapper">
          <el-tag class="wrapper" v-for="item in titleColumn" :key="item">
            {{
            item
            }}
          </el-tag>
        </iep-operation-wrapper>
        <iep-button @click="handleSelect">选择文章</iep-button>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
    <dialog-select-form ref="DialogSelectForm" @load-select="loadSelect"></dialog-select-form>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from "@/api/conm/special_controller.ts";
import { initForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
import DialogSelectForm from "./DialogSelectForm";
export default {
  mixins: [formMixins],
  components: {
    DialogSelectForm,
  },
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      rules,
      id: 0,
      siteId: 0,
      value: "",
      titleColumn: "",
    };
  },
  methods: {
    loadSelect(val) {
      this.form.articleIds = val.map(m => m.id);
      this.titleColumn = val.map(m => m.title);
      this.$refs["DialogSelectForm"].dialogShow = false;
    },
    loadPage() {
      this.form = initForm();
      this.titleColumn = "";
      this.dialogShow = false;
    },
    handleSelect() {
      this.$refs["DialogSelectForm"].dialogShow = true;
      this.$refs["DialogSelectForm"].methodName = "选择";
      this.$refs["DialogSelectForm"].loadPage();
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
        this.titleColumn = this.form.relations.map(m => m.title);
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
<style scoped></style>
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
<style scoped>
.form-detail >>> .el-input-number {
  width: 30%;
}
</style>
