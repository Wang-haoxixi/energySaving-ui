<template>
  <iep-basic-container class="iep-page-form">
    <div class="partner-form">
      <iep-page-header title="合伙人招募" :backOption="backOption"></iep-page-header>

      <el-form :model="formData" :rules="rules" ref="form" label-width="135px">
        <iep-form-item label-name="合伙人类型" prop="partnersType">
          <el-radio-group v-model="formData.partnersType">
            <el-radio
              :label="item.value"
              v-for="item in dictGroup.get('recruit_partners_type')"
              :key="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </iep-form-item>
        <iep-form-item label-name="合伙人主体" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="user">个人</el-radio>
            <el-radio label="so">组织</el-radio>
          </el-radio-group>
        </iep-form-item>
        <iep-form-item :label-name="formData.type === 'user' ? '姓名' : '组织'" prop="orgName">
          <el-input v-model="formData.orgName" placeholder="请输入" maxlength="40"></el-input>
        </iep-form-item>
        <iep-form-item label-name="联系人" prop="name" v-if="formData.type === 'so'">
          <el-input v-model="formData.name" placeholder="请输入"></el-input>
        </iep-form-item>
        <iep-form-item label-name="联系方式" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入"></el-input>
        </iep-form-item>
        <iep-form-item label-name="所属行业" prop="industry">
          <IndustrySelect v-model="formData.industry" class="iep-select"></IndustrySelect>
        </iep-form-item>
        <iep-form-item label-name="所属地区" prop="city">
          <CascaderCity v-model="formData.city" class="iep-select"></CascaderCity>
        </iep-form-item>
        <iep-form-item label-name="能力优势" prop="ability">
          <el-input
            v-model="formData.ability"
            type="textarea"
            :rows="3"
            placeholder="请输入"
            maxlength="100"
          ></el-input>
        </iep-form-item>
        <iep-form-item label-name="具体描述" prop="describe">
          <el-input
            v-model="formData.describe"
            type="textarea"
            :rows="5"
            placeholder="请输入"
            maxlength="500"
          ></el-input>
        </iep-form-item>
        <iep-form-item :label-name="formData.type === 'user' ? '技能证书' : '营业执照'">
          <div class="img-list">
            <div v-for="(item, index) in formData.annexes" :key="index" class="avatar">
              <div class="close" @click="handleDeleteImage(index)">
                <i class="el-icon-close"></i>
              </div>
              <iep-img :src="item.attachFile"></iep-img>
            </div>
            <el-upload
              multiple
              v-if="formData.annexes.length < imageNum"
              class="avatar-uploader"
              action="/api/admin/file/sftp/upload"
              :show-file-list="false"
              :headers="headers"
              accept="image/*"
              ref="upload"
              :on-success="handleSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="avatar examples">
              <iep-img :src="examplesImg[formData.type]"></iep-img>
            </div>
          </div>
        </iep-form-item>
      </el-form>

      <iep-footer-bar>
        <el-button type="primary" @click="handleSubmit" :loading="loadState">确认无误，提交审核</el-button>
      </iep-footer-bar>
    </div>
  </iep-basic-container>
</template>

<script>
import { rules, initFormData, dictsMap } from "./options";
import IndustrySelect from "./components/industrySelect";
import CascaderCity from "./components/CascaderCity";
import { mapGetters } from "vuex";
import { createPartners } from "@/api/dms/million";
import store from "@/store";
export default {
  components: { IndustrySelect, CascaderCity },
  data() {
    return {
      loadState: false,
      formData: initFormData(),
      rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1);
        },
      },
      headers: {
        Authorization: "Bearer " + store.getters.accessToken,
      },
      examplesImg: {
        user: "/img/recruit/ExamplesPartner.png",
        so: "/img/recruit/ExamplesOrganization.png",
      },
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
    imageNum() {
      return this.formData.type === "user" ? 10 : 1;
    },
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          createPartners(this.formData).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("申请成功！");
              this.$openPage("/channel/partner_introduce");
            }
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
    handleSuccess(res) {
      if (res.code) {
        if (!res.data) {
          this.$message.error("错了哦，请检查文件服务器");
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.$message.success("上传成功");
        if (this.formData.annexes.length < this.imageNum) {
          this.formData.annexes.push({
            original: res.data.fileName,
            attachFile: res.data.url,
            id: res.data.id,
          });
        }
      }
    },
    handleDeleteImage(index) {
      this.formData.annexes.splice(index, 1);
    },
  },
  created() {
    this.formData.name = this.userInfo.realName;
    this.formData.orgName = this.userInfo.realName;
    this.formData.mobile = this.userInfo.mobile;
  },
  watch: {
    "formData.type"(val) {
      if (val === "user") {
        this.formData.annexes = this.formData.annexes.slice(0, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.partner-form {
  width: 1200px;
  margin: auto;
  .iep-select {
    width: 100%;
    &::v-deep .el-select {
      width: 100%;
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
        background-color: #e27474;
      }
    }
  }
  .examples {
    margin-left: 20px;
    border: 0;
  }
}
</style>
