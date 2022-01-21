<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`文档${methodName}`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="标签：" prop="tagKeyWords">
          <iep-tag v-model="form.tagKeyWords"></iep-tag>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input v-model="form.keyWords"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：" prop="updateTime" v-show="methodName === '新增'">
          <iep-date-picker v-model="form.updateTime" type="datetime" placeholder="请选择发布时间"></iep-date-picker>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优先级：">
          <el-input-number v-model="form.priority" :min="1" :max="9"></el-input-number>
        </el-form-item>
        <el-form-item label="推荐位选择：">
          <iep-select
            v-model="form.attributeId"
            clearable
            :prefix-url="`cms/info_attribute/${siteId}`"
          ></iep-select>
        </el-form-item>
        <el-form-item label="图片：" prop="image">
          <span slot="label">图片：</span>
          <el-upload
            class="avatar-uploader"
            action="/api/admin/file/upload/avatar"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            accept="image/*"
          >
            <IepJoditRead v-if="form.image" :src="form.image" class="avatar"></IepJoditRead>
            <i v-if="form.image" class="el-icon-circle-close" @click.stop="handleRemove"></i>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章描述：">
          <el-input type="textarea" v-model="form.infoDescribe"></el-input>
        </el-form-item>
        <el-form-item label="文档内容：" prop="content">
          <iep-jodit-editor v-model="form.content"></iep-jodit-editor>
        </el-form-item>
      </el-form>
      <IepFooterBar>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>

<script>
import {
  getPageById,
  addObj,
  updateObj,
} from "@/api/conm/article_controller.ts";
import { initForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
import store from "@/store";
export default {
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      backOption: {
        isBack: true,
      },
      form: initForm(),
      rules,
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
    };
  },
  created() {
    this.loadPage();
    this.form.updateTime = this.createTimeDefault();
  },
  computed: {
    siteId() {
      return this.$route.query.siteId;
    },
    nodeId() {
      return this.$route.query.nodeId;
    },
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id ? true : false;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
    formRequestFn() {
      return this.isEdit ? updateObj : addObj;
    },
  },
  methods: {
    loadPage() {
      if (this.isEdit) {
        getPageById(this.id).then(data => {
          this.form = this.$mergeByFirst(this.form, data.data);
          // if (this.form.attributeId === '') {
          //   this.form.attributeId = 0
          // }
        });
      }
    },
    createTimeDefault() {
      const date = new Date();
      const y = date.getFullYear();
      const m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    },
    handleAvatarSuccess(row) {
      // this.handleRemove()
      this.form.image = row.data.url;
    },
    handleRemove() {
      this.form.image = "";
    },
    async submitForm() {
      if (this.form.attributeId === "") {
        this.form.attributeId = 0;
      }
      this.formRequestFn({
        id: this.id,
        nodeId: this.nodeId,
        ...this.form,
      }).then(data => {
        if (data.code === 0) {
          this.$router.history.go(-1);
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
