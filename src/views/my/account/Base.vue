<template>
  <iep-basic-container style="border:0;">
    <div class="base iep-page-form">
      <div class="title-box">
        <div class="info-title">{{$route.name}}</div>
      </div>

      <el-alert
        v-if="form.integrity!=100"
        title="您的认证信息已通过，请完善个人信息详情，获取宝贝吧！"
        type="warning"
        :description="`个人信息完善度：${form.integrity}%`"
        show-icon
        :closable="false"
      ></el-alert>
      <el-form
        class="iep-form-detail form-wrapper"
        :model="form"
        ref="form"
        :rules="rules"
        label-width="120px"
      >
        <iep-form-item label-name="头像" prop="avatar">
          <IepUploadAvatar v-model="form.avatar"></IepUploadAvatar>
        </iep-form-item>
        <iep-form-item
          label-name="姓名"
          prop="realName"
          class="iep-form-half-block"
          tip="用户名称上限设置为10个字"
        >
          <el-input class="name-input" v-model="form.realName" :maxlength="10"></el-input>
          <!-- <el-button
            class="btn-attestation"
            type="info"
            @click="$openPage('/my/account/certification')"
          >未认证</el-button>-->
        </iep-form-item>
        <iep-form-item label-name="性别" prop="sex" class="iep-form-half-block">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </iep-form-item>

        <el-divider></el-divider>

        <iep-form-item label-name="行业" prop="industry" class="iep-form-half-block">
          <IepCascaderIndustry v-model="form.industry"></IepCascaderIndustry>
        </iep-form-item>
        <iep-form-item label-name="单位" prop="company" class="iep-form-half-block">
          <el-input v-model="form.company" :maxlength="20"></el-input>
        </iep-form-item>
        <iep-form-item label-name="职位" prop="position" class="iep-form-half-block">
          <IepCascaderPosition v-model="form.position"></IepCascaderPosition>
        </iep-form-item>
        <iep-form-item label-name="工作所在地" prop="workPlace" class="iep-form-half-block">
          <CascaderCity v-model="form.workPlace"></CascaderCity>
        </iep-form-item>
        <iep-form-item label-name="外语能力" prop="languageAbilityList" class="iep-form-half-block">
          <IepDictSelect
            v-model="form.languageAbilityList"
            multiple
            dictName="languageability"
            clearable
            useLabel
          ></IepDictSelect>
        </iep-form-item>
        <iep-form-item
          :label-name="$constTagLabel.abilityTag.shortName"
          prop="abilityTag"
          class="iep-form-block"
        >
          <iep-tag-input v-model="form.abilityTag"></iep-tag-input>
        </iep-form-item>
        <iep-form-item label-name="签名" prop="sign">
          <iep-input-area
            v-model.trim="form.sign"
            :placeholder="website.slogan"
            :maxlength="30"
            show-word-limit
          ></iep-input-area>
        </iep-form-item>
        <iep-form-item label-name="自我描述" prop="introduction">
          <iep-input-area
            v-model.trim="form.introduction"
            placeholder="请输入您对自己的评价"
            :maxlength="200"
            show-word-limit
          ></iep-input-area>
        </iep-form-item>
        <el-form-item class="iep-right-form-item">
          <el-button
            class="iep-btn-submit"
            type="primary"
            :loading="submitFormLoading"
            @click="mixinsSubmitFormGen()"
          >保存</el-button>
          <el-button class="iep-btn-submit" @click="load()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </iep-basic-container>
</template>
<script>
import CascaderCity from "./components/CascaderCity";
import website from "@/const/website";
import formMixins from "@/mixins/formMixins";
import { putUser } from "@/api/admin/user";
import { mapActions, mapGetters } from "vuex";
import { UserDTOEntity } from "@/types/user";
const rules = {
  abilityTag: [
    {
      required: true,
      type: "array",
      message: "标签的添加上限最多设置10个",
      max: 10,
      trigger: "change",
    },
  ],
};
export default {
  components: {
    CascaderCity,
  },
  mixins: [formMixins],
  data() {
    return {
      rules,
      website,
      form: new UserDTOEntity(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.load();
  },
  methods: {
    ...mapActions(["userGetInfo"]),
    async submitForm() {
      const data = await putUser(this.form);
      if (data.data) {
        this.$message.success("保存成功");
        this.refresh();
      }
    },
    async refresh() {
      await this.userGetInfo();
      this.load();
    },
    async load() {
      this.form = this.$mergeByFirst(new UserDTOEntity(), this.userInfo);
      console.log(this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.form-wrapper {
  margin-top: 30px;
}
.base ::v-deep .el-alert {
  padding: 15px;
}
.name-input ::v-deep .el-input__inner:hover,
.name-input ::v-deep .el-input__inner:focus {
  // border-color: $--border-color;
  box-shadow: none;
}
.btn-attestation {
  display: inline-block;
  margin-right: -95px;
  margin-left: 10px;
  width: auto;
  height: 42px;
  vertical-align: middle;
}
.el-alert {
  display: flex;
  align-items: flex-start;
  border: 1px solid $--border-color;
}
.el-alert ::v-deep .el-alert__icon {
  margin-top: 2px;
  font-size: 20px;
  color: $--color-primary;
}
.el-alert ::v-deep .el-alert__title,
.el-alert ::v-deep .el-alert__description {
  font-size: 14px;
  font-weight: 400;
  color: $--color-text-regular;
}
.el-alert ::v-deep .el-alert__content {
  padding-left: 0;
}
.title-box {
  display: flex;
  align-items: center;
}
.title-box .info-title {
  padding-bottom: 0;
  font-size: 18px;
}

.base ::v-deep .el-alert {
  margin: 30px 0;
}
</style>
