<template>
  <iep-dialog :dialog-show="dialogShow" title="新增话题" width="600px" @close="_close()">
    <el-form :model="formData" :rules="rules" ref="form" label-width="95px" class="form-detail">
      <iep-form-item label-name="话题名称" prop="content">
        <el-input v-model="formData.content" :readonly="state === 'update'"></el-input>
      </iep-form-item>
      <iep-form-item label-name="话题类型" prop="topicType">
        <el-radio-group v-model="formData.topicType">
          <el-radio :label="1">普通话题</el-radio>
          <el-radio :label="2">专项话题</el-radio>
          <el-radio :label="3">官方话题</el-radio>
        </el-radio-group>
      </iep-form-item>

      <iep-form-item label-name="话题内容">
        <el-input type="textarea" v-model="formData.introduction"></el-input>
      </iep-form-item>
      <el-form-item label>
        <div v-if="formData.imageUrl" class="avatar">
          <div class="close" @click="()=>{this.formData.imageUrl = ''}">
            <i class="el-icon-close"></i>
          </div>
          <iep-img :src="formData.imageUrl"></iep-img>
        </div>
        <el-upload
          v-else
          class="avatar-uploader"
          action="/admin/file/sftp/upload"
          :show-file-list="false"
          :headers="headers"
          accept="image/*"
          :before-upload="beforeUpload"
          ref="upload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-form-item__error" v-if="isImage">官方话题必须上传图片</div>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="submitForm">{{this.state === "create" ? "发布" : "保存"}}</el-button>
      <el-button @click="_close">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { topicCreate, topicUpdate, getTopicById } from "@/api/dms/thoughts";
import { initForm, rules } from "./option";
import store from "@/store";
import { uploadByCard } from "@/api/admin/appfile";
import image from "@/mixins/image";

export default {
  mixins: [image],
  components: {},
  data() {
    return {
      dialogShow: false,
      formData: initForm(),
      rules,
      state: "create",
      requestFn: topicCreate,
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      isImage: false,
    };
  },
  methods: {
    open(row, state = "create") {
      this.dialogShow = true;
      this.state = state;
      if (state === "update") {
        this.requestFn = topicUpdate;
        getTopicById(row.topicId).then(({ data }) => {
          this.formData = Object.assign({}, this.formData, { ...data });
        });
      } else {
        this.requestFn = topicCreate;
      }
    },
    _close() {
      this.dialogShow = false;
      this.formData = initForm();
    },
    close() {
      this._close();
      this.$emit("load-page", true);
    },
    beforeUpload(file) {
      this.imgPreview(file, true);
      return false;
    },
    imageUpload(file) {
      uploadByCard(file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(({ data }) => {
        this.formData.imageUrl = data.url;
      });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        const row = { ...this.formData };
        if (valid && !this.isImage) {
          this.requestFn(row).then(({ data, msg }) => {
            this.loadState = false;
            if (!data) {
              this.$message.error(msg);
            } else {
              this.$message.success(
                this.state == "create" ? "发布成功！" : "编辑成功！",
              );
              this.close();
            }
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
  watch: {
    formData: {
      handler(val) {
        // 官方话题一定要上传对应的图片
        this.isImage = val.topicType === 3 && !val.imageUrl;
      },
      deep: true,
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
  overflow: hidden;
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
  position: relative;
  margin-right: 20px;
  .close {
    position: absolute;
    z-index: 100;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    font-size: 20px !important;
    background-color: #ddd;
    color: #fff;
    border-radius: 50%;
    line-height: 18px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #e27474;
    }
  }
}
</style>
