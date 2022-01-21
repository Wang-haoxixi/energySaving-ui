<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`友情链接${methodName}`"
    width="700px"
    @close="loadPage"
  >
    <el-form class="form-detail" :model="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="分类管理" prop="typeId">
        <iep-select v-model="form.typeId" :prefix-url="`cms/info_friendlinktype/${siteId}`"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="网站名称" prop="name">
        <el-input v-model="form.name" maxlength="150" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="网站地址" prop="url">
        <el-input v-model="form.url" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="图片logo">
        <span slot="label">图片logo：</span>
        <el-upload
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          accept="image/*"
        >
          <iep-img v-if="form.logo" :src="form.logo" class="avatar"></iep-img>
          <i v-if="form.logo" class="el-icon-circle-close" @click.stop="handleRemove"></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </iep-form-item>
      <iep-form-item label-name="站长email">
        <el-input v-model="form.email" maxlength="150" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="网站描述">
        <el-input v-model="form.description" type="textarea" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="推荐">
        <el-radio-group v-model="form.recommend">
          <el-radio v-for="(item, i) in dictsMap.recommend" :key="i" :label="+i">{{ item }}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="状态">
        <el-radio-group v-model="form.status">
          <el-radio v-for="(item, i) in dictsMap.status" :key="i" :label="+i">
            {{
            item
            }}
          </el-radio>
        </el-radio-group>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from "@/api/conm/f_link_controller.ts";
import { initForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
import store from "@/store";
export default {
  mixins: [formMixins],
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
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleAvatarSuccess(row) {
      this.form.logo = row.data.url;
    },
    handleRemove() {
      this.form.withLogo = "";
    },
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
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
