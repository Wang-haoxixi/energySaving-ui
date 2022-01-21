<template>
  <div class="activity-box box" id="activity">
    <h3 class="title">
      <div class="name">所有动态</div>
      <el-button type="primary" @click="formShow = !formShow" v-if="!formShow">我要发布</el-button>
      <div class="button" @click="formShow = !formShow" v-else>取消</div>
    </h3>
    <div class="form" v-if="formShow">
      <el-input
        type="textarea"
        class="textarea"
        v-model="formData.content"
        placeholder="请输入内容"
        :rows="4"
      ></el-input>
      <div class="img-list" v-if="formData.images.length > 0">
        <div v-for="(item, index) in formData.images" :key="index" class="avatar">
          <div class="close" @click="handleDeleteImage(index)">
            <i class="el-icon-close"></i>
          </div>
          <iep-img :src="item"></iep-img>
        </div>
        <el-upload
          multiple
          v-if="formData.images.length < 3"
          class="avatar-uploader"
          action="/admin/file/sftp/upload"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          accept="image/*"
          :before-upload="beforeUpload"
          ref="upload"
          :limit="3 - formData.images.length"
          :on-exceed="()=>{$message.warning('最多可选择三张图片')}"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="footer">
        <div class="func" @click="handleImage" v-if="formData.images.length === 0">
          <el-upload
            multiple
            action="/admin/file/sftp/upload"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            :before-upload="beforeUpload"
            ref="upload"
            :limit="3"
            :on-exceed="()=>{$message.warning('最多可选择三张图片')}"
          >
            <div class="func">
              <i class="el-icon-picture-outline"></i>
              <p style="line-height: 20px;">图片</p>
            </div>
          </el-upload>
        </div>
        <el-button type="primary" class="submit" @click="handleSubmit()" :loading="loadState">发布</el-button>
      </div>
    </div>
    <div class="content" :class="getHeight()">
      <!-- 列表 -->
      <dynamic-list class="list" :dataList="dataList"></dynamic-list>
      <!-- 加载更多 -->
      <div class="paging" @click="handleMore" v-if="isMore">点击加载更多</div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import store from "@/store";
import image from "@/mixins/image";
import { uploadByCard } from "@/api/admin/appfile";
import { thoughtsCreate } from "@/api/dms/thoughts";
import { mapGetters } from "vuex";
import DynamicList from "./ActivityList";
import { getDynamicPage } from "@/api/dms/orgDynamic";

const initForm = () => {
  return {
    content: "",
    status: 0,
    images: [],
    tags: [],
  };
};

export default {
  mixins: [mixins, image],
  components: { DynamicList },
  data() {
    return {
      formData: initForm(),
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      loadState: false,
      formShow: false,
      searchData: {},
      dataList: [],
      isMore: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadPage() {
      getDynamicPage(this.searchData).then(({ data }) => {
        for (const item of data.dynamicVoList) {
          if (item.typeMold === 1) {
            const row = { ...item.thoughtsVO };
            row.id = item.id;
            this.dataList.push(row);
          }
        }
        this.isMore = data.flag;
      });
    },
    handleAvatarSuccess(row) {
      this.formData.images.push(row.data.url);
    },
    handleSubmit() {
      if (this.formData.content !== "") {
        this.loadState = true;
        const row = { ...this.formData };
        row.orgId = this.userInfo.orgId;
        thoughtsCreate(row).then(({ code, data }) => {
          if (code === 0) {
            this.resetForm();
            this.$message.success("发布成功！");
            this.loadState = false;
            this.dataList = [];
            this.searchData = {
              orgId: this.userInfo.orgId,
            };
            this.loadPage();
          } else {
            this.loadState = false;
            this.$message.error(data);
          }
        });
      } else {
        return false;
      }
    },
    resetForm() {
      this.formShow = false;
      this.formData = initForm();
    },
    handleDeleteImage(index) {
      this.formData.images.splice(index, 1);
    },
    handleMore() {
      this.searchData.id = this.dataList[this.dataList.length - 1].id;
      this.loadPage();
    },
    // 上传图片
    handleImage() {
      this.$refs["upload"].submit();
    },
    // 图片上传前回调
    beforeUpload(file) {
      this.imgPreview(file);
      return false;
    },
    // 图片的真正上传
    imageUpload(file) {
      // 此时可以自行将文件上传至服务器
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      uploadByCard(file, config).then(({ data }) => {
        if (this.formData.images.length < 3) {
          this.formData.images.push(data.url);
        }
      });
    },
    getHeight() {
      if (this.formShow) {
        if (this.formData.images.length === 0) {
          return "content2";
        } else {
          return "content3";
        }
      } else {
        return "content1";
      }
    },
    srcollTo() {
      document.getElementById("activity").scrollIntoView();
      this.formShow = true;
    },
  },
  created() {
    this.searchData.orgId = this.userInfo.orgId;
    this.loadPage();
  },
  watch: {
    "userInfo.orgId"(val) {
      this.dataList = [];
      this.searchData = {
        orgId: val,
      };
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.activity-box {
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 10px;
    line-height: 24px;
    .name {
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .button {
      color: $--color-primary;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .form {
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    .textarea {
      margin-bottom: 15px;
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
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
    }
    .footer {
      position: relative;
      display: flex;
      padding: 0 0 10px;
      min-height: 24px;
      .func {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: $--color-text-secondary;
        .el-icon-picture-outline {
          font-size: 20px;
        }
        &:hover {
          color: $--color-primary;
        }
        .symbol {
          font-size: 16px;
          font-style: normal;
        }
        p {
          margin: 0 35px 0 5px;
        }
      }
      .submit {
        position: absolute;
        right: 0;
      }
    }
  }
  .content {
    // height: 1100px;
    overflow-y: scroll;
    .list {
      // height: 1105px;
      // overflow-y: scroll;
      padding-right: 0;
    }
    .paging {
      text-align: center;
      padding: 15px 0;
      color: $--color-text-secondary;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .content1 {
    max-height: 70vh;
  }
  .content2 {
    max-height: calc(70vh - 183px);
  }
  .content3 {
    max-height: calc(70vh - 363px);
  }
}
::-webkit-scrollbar {
  border-radius: $--border-radius-base;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: $--border-radius-base;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: $--border-radius-base;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
</style>
