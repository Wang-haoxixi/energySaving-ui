<template>
  <div class="head">
    <el-form :model="formData" :rules="rules" ref="form" class="input">
      <div class="header-top">
        <p class="slogan-2">
          早晚五分钟，为
          <span class="highlight">智慧</span>加油
        </p>
        <p class="slogan-3">
          <!-- 是否开放 -->
          <el-select v-model="formData.status" class="status" placeholder="请选择">
            <el-option
              v-for="item in dictMaps.status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
      </div>
      <!-- 正文输入框 -->
      <el-form-item class="item-content" prop="content">
        <el-input
          @click.native="handleCancal"
          id="keyupStart"
          ref="content"
          type="textarea"
          rows="5"
          :placeholder="subjectPlaceholder"
          v-model="formData.content"
          class="textarea"
          maxlength="1000"
          @keyup.native="handleKeyup"
        ></el-input>
        <div class="yincang">
          <el-autocomplete
            ref="autocomplete"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            placement="top-end"
          ></el-autocomplete>
        </div>
      </el-form-item>
      <!-- 图片 -->
      <div class="img-list" v-if="formData.images.length > 0">
        <div v-for="(item, index) in formData.images" :key="index" class="avatar">
          <div class="close" @click="handleDeleteImage(index)">
            <i class="el-icon-close"></i>
          </div>
          <iep-img :src="item"></iep-img>
        </div>
        <el-upload
          multiple
          v-if="formData.images.length < 9"
          class="avatar-uploader"
          action="/admin/file/sftp/upload"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          accept="image/*"
          :before-upload="beforeUpload"
          ref="upload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 按钮列表 -->
      <div class="button-list">
        <div
          class="func"
          @click="handleImage"
          v-if="formData.images.length === 0 && transmitId === -1"
        >
          <el-upload
            multiple
            action="/admin/file/sftp/upload"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            :before-upload="beforeUpload"
            ref="upload"
          >
            <div class="func">
              <i class="el-icon-picture-outline blue"></i>
              <p style="line-height: 17px;">图片</p>
            </div>
          </el-upload>
        </div>
        <div class="func" v-if="formData.images.length > 0 && transmitId === -1">
          <i class="el-icon-picture-outline blue"></i>
          <p>图片</p>
        </div>
        <div class="func" @click="handleAnt">
          <i class="symbol green">@</i>
          <p>提醒</p>
        </div>
        <div class="func" @click="handleSubject">
          <i class="symbol orange">#</i>
          <p>话题</p>
        </div>
        <div class="func" @click="handleSpecial" v-if="isSpecial">
          <i class="el-icon-woneng-file-survey red" style="line-height: 24px;"></i>
          <p>文章</p>
        </div>
        <div class="func tag-list">
          <i class="el-icon-woneng-biaoqianguanli1 light-blue"></i>
          <div class="label">标签</div>
          <iep-tag-input v-model="formData.tags" class="tags" :notEdit="formData.tags.length === 3"></iep-tag-input>
        </div>
        <el-button
          type="primary"
          class="submit iep-btn-l"
          @click="handleSubmit('form')"
          :loading="loadState"
        >发布</el-button>
      </div>
    </el-form>
    <MaterialDialog ref="mlms" @load-page="backPage"></MaterialDialog>
  </div>
</template>

<script>
import { thoughtsCreate } from "@/api/dms/thoughts";
import store from "@/store";
import { getSubjectList, getName } from "./util";
import keyup from "./keyup";
import { uploadByCard } from "@/api/admin/appfile";
import image from "@/mixins/image";
import MaterialDialog from "./materialDialog";
import { isvalidateSpace } from "@/util/validate";

let initForm = () => {
  return {
    content: "",
    status: 0,
    images: [],
    tags: [],
  };
};

const dictMaps = {
  status: [
    {
      label: "开放",
      value: 0,
    },
    {
      label: "隐私",
      value: 1,
    },
  ],
};

const validateSpace = (rule, value, callback) => {
  if (isvalidateSpace(value)) {
    callback(new Error("必填"));
  } else {
    callback();
  }
};

const rules = {
  content: [
    { required: true, message: "必填", trigger: "change" },
    { validator: validateSpace, trigger: "change" },
  ],
};

export default {
  mixins: [keyup, image],
  components: { MaterialDialog },
  props: {
    subject: {
      type: String,
      default: "",
    },
    transmitId: {
      type: Number,
      default: -1,
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      subjectPlaceholder: "工作之余，分享下今天的感受吧~",
      formData: initForm(),
      rules,
      limit: 3,
      loadState: false,
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      dictMaps,
    };
  },
  methods: {
    handleAvatarSuccess(row) {
      this.formData.images.push(row.data.url);
    },
    // 上传图片
    handleImage() {
      this.$refs["upload"].submit();
    },
    resetForm() {
      this.formData = initForm();
      // this.$nextTick(() => {
      //   this.$refs["form"].clearValidate();
      // });
    },
    handleDeleteImage(index) {
      this.formData.images.splice(index, 1);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadState = true;
          // 判断是否是转发
          if (this.transmitId > -1) {
            this.formData.transmitId = this.transmitId;
          }
          // 判断说说中是否存在话题
          const subjectObj = getSubjectList(this.formData.content);
          if (subjectObj.type) {
            this.formData.topics = subjectObj.list.map(m => m.name);
          }
          // 判断说说中是否存在人名
          const nameObj = getName(this.formData.content);
          if (nameObj.type) {
            this.formData.nameList = nameObj.list.map(m => m.name);
          }
          thoughtsCreate(this.formData).then(({ code, data }) => {
            if (code === 0) {
              this.resetForm();
              this.$message.success("恭喜您发表了一篇说说，继续努力");
              this.loadState = false;
              this.$emit("load-page");
            } else {
              this.loadState = false;
              this.$message.error(data);
            }
          });
        } else {
          return false;
        }
      });
    },
    isSubject() {
      let subject = "";
      if (this.subject) {
        subject = this.subject;
      } else {
        subject = "";
      }
      this.subjectPlaceholder = subject;
      initForm = () => {
        return {
          content: this.subject,
          status: 0,
          images: [],
          tags: [],
        };
      };
      this.formData = initForm();
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
        if (this.formData.images.length < 9) {
          this.formData.images.push(data.url);
        }
      });
    },
    handleSpecial() {
      this.$refs["mlms"].loadData();
    },
    backPage() {
      this.$emit("load-page");
    },
  },
  created() {
    this.isSubject();
  },
  watch: {
    subject() {
      this.isSubject();
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  border-radius: 10px;
  .input {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .slogan-2 {
        margin: 0;
        height: 14px;
        line-height: 14px;
        color: $--color-text-regular;
        font-size: 14px;
        .highlight {
          color: $--color-primary;
        }
      }
      .slogan-3 {
        margin-top: 0;
        height: 14px;
        line-height: 14px;
        .status {
          width: 76px;
          height: 14px;
          line-height: 14px;
          ::v-deep .el-input,
          ::v-deep .el-select__caret {
            height: 14px;
            line-height: 14px;
          }
        }
        .status ::v-deep .el-input__inner {
          height: 14px;
          line-height: 14px;
          border: none;
          font-size: 14px;
        }
      }
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
      > div {
        margin-bottom: 20px;
      }
      .avatar-uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 10px;
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
        border: 1px solid $--border-color;
        border-radius: 10px;
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
            // background-color: #e27474;
            background-color: $--color-third;
          }
        }
      }
    }
    // .textarea {
    // margin-bottom: 15px;
    // }
    .button-list {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0;
      .func {
        display: flex;
        align-items: center;
        height: 36px;
        cursor: pointer;
        color: $--color-text-secondary;
        .symbol {
          font-size: 16px;
          font-style: normal;
        }
        > p {
          margin: 0 12px 0 5px;
          font-size: 14px;
          line-height: 25px;
          color: $--color-text-regular;
        }
        .blue {
          color: #2f80ff;
        }
        .orange {
          color: #ff9600;
        }
        .green {
          color: #3cd489;
        }
        .red {
          color: #f74437;
        }
        .light-blue {
          color: #78c8e5;
        }
      }
      .tag-list {
        flex: 1;
        display: flex;
        text-align: left;
        margin-top: 1px;
        font-size: 14px;
        .label {
          width: 53px;
          height: 42px;
          line-height: 42px;
          font-size: 14px;
          color: $--color-text-regular;
          margin: 0 0 0 5px;
        }
        .tags {
          font-size: 14px;
          ::v-deep > span {
            margin-bottom: 0;
          }
          ::v-deep .el-button {
            width: 36px;
            height: 36px;
            line-height: normal;
            border: 1px solid $--border-color;
            border-radius: 10px;
            margin-bottom: 0px;
            span {
              display: none;
              height: 36px;
              line-height: 36px;
            }
          }
          ::v-deep .el-tag {
            background-color: #fff;
            height: 36px;
            line-height: 34px;
            font-size: 14px;
            border: 1px solid $--border-color;
            border-radius: 10px;
            .el-tag__close {
              top: 0;
              background-color: $--color-text-secondary;
              color: #fff;
            }
            .el-tag__close:hover {
              opacity: 0.7;
            }
          }
        }
      }
      .submit {
        right: 0;
        width: 60px;
        height: 36px;
        padding: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.item-content {
  // position: relative;
  margin-bottom: 15px;
  // height: 120px;
}
.item-content .textarea {
  // position: absolute;
  // height: 120px;
  // top: 0;
  // left: 0;
  z-index: 2;
}
.item-content .textarea ::v-deep textarea {
  resize: none;
}
.yincang {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  opacity: 0;
  z-index: 0;
}
</style>
<style scoped>
.yincang >>> .el-input__inner {
  /* width: 10px; */
  padding: 0;
}
.yincang >>> .el-autocomplete {
  width: 160px;
}
</style>

