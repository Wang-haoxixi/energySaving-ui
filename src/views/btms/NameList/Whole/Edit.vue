
<template>
  <div class="name-list">
    <iep-basic-container>
      <iep-page-header class="header" :title="`${methodName}人名`" :backOption="backOption">
        <iep-button v-if="isEdit" @click="handleDelete">取消认证</iep-button>
      </iep-page-header>
      <el-form class="iep-form-detail" :model="form" ref="form" :rules="rules" label-width="120px">
        <iep-form-item class="form-half" label-name="姓名" prop="name" tip="请填写真实的姓名">
          <el-input v-model="form.name"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="身份证号" tip="请勿必与本人身份证信息一致">
          <el-input v-model="form.idCard"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="头像">
          <iep-upload-avatar v-model="form.image"></iep-upload-avatar>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="身份证正面" tip="请上传身份证人像面照片">
          <iep-upload-avatar v-model="form.idCardFace"></iep-upload-avatar>
        </iep-form-item>
        <iep-form-item label-name="身份证国徽面" tip="请上传身份证国徽面照片">
          <iep-upload-avatar v-model="form.idCardEmblem"></iep-upload-avatar>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="性别">
          <el-select v-model="form.sex">
            <el-option v-for="(v,k) in dictsMap.sex" :key="k+v" :label="v" :value="+k"></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="出生年月" tip="请填写身份证上年月">
          <el-date-picker v-model="form.birthDate" type="date" placeholder="选择日期"></el-date-picker>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="民族" tip="请准确填写，后缀含“族”，即汉族、满族、维吾尔族等">
          <el-input v-model="form.nation"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="政治面貌" tip="请根据实际情况选择">
          <iep-dict-select v-model="form.politicsStatus" dict-name="common_politics_face"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="婚姻状况" tip="请根据实际情况选择">
          <iep-dict-select v-model="form.marriageStatus" dict-name="common_marriage_status"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="生育状况" tip="请根据实际情况选择">
          <iep-dict-select v-model="form.birthStatus" dict-name="common_birth_status"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="户口类别">
          <iep-dict-select v-model="form.residentType" dict-name="common_resident_type"></iep-dict-select>
        </iep-form-item>
        <iep-form-item
          class="form-half"
          label-name="户籍地址"
          tip="请精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号"
          prop="residenceAddress"
        >
          <div style="display:flex;">
            <iep-select-city style="flex:2;" v-model="form.birthCityArr"></iep-select-city>
            <el-input style="flex:3;margin-left:10px;" v-model="form.residenceAddress"></el-input>
          </div>
        </iep-form-item>
        <iep-form-item
          class="form-half"
          label-name="家庭地址"
          tip="请精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号"
          prop="currentAddress"
        >
          <div style="display:flex;">
            <iep-select-city style="flex:2;" v-model="form.cityArr"></iep-select-city>
            <el-input style="flex:3;margin-left:10px;" v-model="form.currentAddress"></el-input>
          </div>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="最高学历" tip="请根据实际情况选择">
          <iep-dict-select
            v-model="form.education"
            dict-name="common_highest_educational"
            clearable
          ></iep-dict-select>
        </iep-form-item>
        <iep-form-item
          class="form-half"
          label-name="毕业学校"
          tip="请填写与本人最高学历对应学校全称，并确保与毕业证书中一致，而非通用简称"
        >
          <el-input v-model="form.university"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="QQ" tip="请填写本人常用的QQ号码">
          <el-input v-model="form.qq"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="专业" tip="请填写与本人最高学历对应的专业全称并确保与毕业证中专业一致，禁专业简称">
          <el-input v-model="form.major"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="联系电话" tip="请填写可联系上的常用电话号码" prop="phone">
          <el-input v-model="form.phone" @blur="checkMobile()"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="毕业时间" tip="请选择与本人最高学历对应的毕业时间，精准至年月日">
          <el-date-picker v-model="form.graduateTime" type="date" placeholder="选择日期"></el-date-picker>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="微信" tip="请填写本人常用的微信号码">
          <el-input v-model="form.wechat"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="邮箱" tip="请填写本人常用的邮箱账号">
          <el-input v-model="form.email"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="外部头衔" tip="请填写本人在组织内外部的头衔称号，指所任官职或所得的名誉等">
          <el-input v-model="form.socialRela"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="任职机构" tip="请填写本人当前在职的机构名全称">
          <el-input v-model="form.agency"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="职称/职务" tip="请填写本人当前任职的职务/职称">
          <el-input v-model="form.job"></el-input>
        </iep-form-item>
        <iep-form-item
          label-name="简介"
          prop="describe"
          tip="请填写本人的简要介绍信息，介绍自己的专业水平、能力及综合素质，或突出自己过去的成就等"
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
import mixins from "@/mixins/mixins";
import {
  deleteMoreRealPage,
  insertOrUpdate,
  getDetailPageById,
} from "@/api/dms/name_list";
export default {
  mixins: [formMixins, mixins],
  data() {
    return {
      dictsMap,
      backOption: {
        isBack: true,
      },
      form: initForm(),
      rules,
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
    checkMobile() {
      const partten = /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i;
      const flag = partten.test(this.form.phone);
      if (!flag) this.$message("请输入正确的手机号码");
    },
    loadPage() {
      if (this.isEdit) {
        getDetailPageById(this.id).then(data => {
          this.form = this.$mergeByFirst(initForm(), data.data);
          this.form.politicsStatus = this.form.politicsStatus.toString();
          this.form.marriageStatus = this.form.marriageStatus.toString();
          this.form.birthStatus = this.form.birthStatus.toString();
          this.form.residentType = this.form.residentType.toString();
          this.form.education = this.form.education.toString();
        });
      }
    },
    async handleDelete() {
      try {
        await this.$confirm("此操作将该用户取消认证, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          const { data } = await deleteMoreRealPage([this.id]);
          if (data.data) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$router.push("/tms/standard_library/nameList");
          } else {
            this.$message(data.msg);
          }
        } catch (error) {
          this.$message("似乎出现了一些问题");
        }
      } catch (error) {
        this.$message("操作取消");
      }
    },
    async submitForm() {
      if (this.isEdit) {
        const data = await insertOrUpdate({
          ...formToDto(this.form),
          id: this.id,
        });
        if (data.data) {
          this.$router.history.go(-1);
        } else {
          this.$message(data.msg);
        }
      } else {
        const data = await insertOrUpdate(formToDto(this.form));
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
