
<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${methodName}机构`" :backOption="backOption"></iep-page-header>
      <el-form class="iep-form-detail" :model="form" ref="form" :rules="rules" label-width="120px">
        <iep-form-item
          class="form-half"
          label-name="机构名称"
          tip="请填写与营业执照/事业单位法人证书/社会团体法人登记证书/民办非企业单位登记证书上等对应机构全称"
          prop="orgName"
        >
          <el-input v-model="form.orgName"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="机构简称">
          <el-input v-model="form.orgAbrName"></el-input>
        </iep-form-item>
        <iep-form-item
          class="form-half"
          label-name="社会信用代码"
          tip="请填写与营业执照/事业单位法人证书/社会团体法人登记证书/民办非企业单位登记证书上等对应的统一社会信用代码"
        >
          <el-input v-model="form.creditCode"></el-input>
        </iep-form-item>
        <iep-form-item
          label-name="营业执照"
          prop="license"
          tip="请上传营业执照/事业单位法人证书/社会团体法人登记证书/民办非企业单位登记证书等证件扫描件"
        >
          <iep-upload-avatar v-model="form.licence"></iep-upload-avatar>
        </iep-form-item>
        <iep-form-item label-name="LOGO" prop="logo">
          <iep-upload-avatar v-model="form.logo"></iep-upload-avatar>
        </iep-form-item>
        <iep-form-item
          class="form-half"
          label-name="成立时间"
          tip="请填写与营业执照/事业单位法人证书/社会团体法人登记证书/民办非企业单位登记证书上等对应的机构成立时间"
        >
          <iep-date-picker v-model="form.establishedTime" type="date" placeholder="选择日期"></iep-date-picker>
        </iep-form-item>
        <!-- <el-form-item class="form-half" label="标签：" prop="tagKeyWords">
          <iep-tag v-model="form.tagKeyWords"></iep-tag>
        </el-form-item>-->
        <iep-form-item class="form-half" label-name="机构分类">
          <el-select v-model="form.type">
            <el-option v-for="(v,k) in dictsMap.type" :key="k+v" :label="v" :value="+k"></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="机构层级">
          <el-select v-model="form.level">
            <el-option v-for="(v,k) in dictsMap.level" :key="k+v" :label="v" :value="+k"></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="行业">
          <iep-dict-select v-model="form.line" dict-name="common_industry"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="机构官网" tip="请填写机构单位网址，如http://www.123456.com">
          <el-input v-model="form.orgUrl"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="联系人" tip="请填写本机构常用联系人">
          <el-input v-model="form.link"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="联系电话" tip="请填写可联系上的常用联系电话" prop="phone">
          <el-input v-model="form.phone" @blur="checkMobile()"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="传真" tip="请填写可联系上的常用传真电话">
          <el-input v-model="form.fax"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="邮箱" tip="请填写本机构常用的邮箱账号">
          <el-input v-model="form.email"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="机构住址" tip="请精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号">
          <!-- <iep-cascader v-model="form.adress" prefix-url="admin/city" clearable></iep-cascader> -->
          <div style="display:flex;">
            <iep-select-city style="flex:2;" v-model="form.current"></iep-select-city>
            <el-input style="flex:3;margin-left:10px" v-model="form.address"></el-input>
          </div>
        </iep-form-item>
        <iep-form-item
          label-name="机构简介"
          prop="describe"
          tip="介绍机构的工作性质、业务范围、组织构成、经营方向、发展历史、市场前景等，以及其他有关情况的说明介绍"
        >
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </iep-form-item>
      </el-form>
      <IepFooterBar>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>

<script>
import { initForm, dictsMap, rules, formToDto } from "../options";
import formMixins from "@/mixins/formMixins";
import {
  addPage,
  updatePage,
  getDetailPage,
} from "@/api/dms/organization_list";

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
      preData: {},
      preType: "",
      preLine: "",
      preLevel: "",
    };
  },
  created() {
    this.loadPage();
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id !== 0 ? true : false;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
  },
  methods: {
    //验证手机
    checkMobile() {
      const partten = /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i;
      const flag = partten.test(this.form.phone);
      if (!flag) this.$message("请输入正确的手机号码");
    },
    loadPage() {
      if (this.isEdit) {
        getDetailPage(this.id).then(data => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { type, line, level, province, city } = data.data;
          this.preType = type;
          this.preLevel = level;
          this.form = this.$mergeByFirst(initForm(), data.data);
          this.form.type = this.dictsMap.type[type];
          this.form.level = this.dictsMap.level[level];
          this.form.line = this.form.line.toString();
        });
      }
    },
    async submitForm() {
      if (this.isEdit) {
        if (this.form.type === this.dictsMap.type[this.preType])
          this.form.type = this.preType;
        if (this.form.level === this.dictsMap.level[this.preLevel])
          this.form.level = this.preLevel;
        const data = await updatePage(formToDto(this.form));
        if (data.data) {
          this.$router.history.go(-1);
        } else {
          this.$message(data.msg);
        }
      } else {
        const data = await addPage(formToDto(this.form));
        if (data.data) {
          this.$router.history.go(-1);
        } else {
          this.$message(data.msg);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  // border: 1px dashed #d9d9d9;
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
  // border-color: #409eff;
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

