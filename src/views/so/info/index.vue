<template>
  <iep-basic-container class="iep-page-form">
    <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
    <!-- <el-alert
      v-if="form.integrity!=100"
      show-icon
      :title="`<${form.name}> 的认证信息已通过，请完善组织信息详情，获取宝贝吧！组织信息完善度：${form.integrity}%`"
      type="warning"
    ></el-alert>-->
    <el-form
      class="iep-form-detail form-wrapper"
      :rules="rules"
      :model="form"
      ref="form"
      label-width="120px"
    >
      <iep-form-item label-name="LOGO" prop="avatar">
        <iep-upload-avatar-wrapper v-model="form.avatar"></iep-upload-avatar-wrapper>
      </iep-form-item>
      <iep-form-item label-name="名称" prop="name" class="iep-form-half-block">
        <el-input class="name-input" v-model.trim="form.name" :maxlength="15"></el-input>
        <el-button
          class="btn-attestation"
          type="info"
          @click="$openPage('/my/account/certification')"
        >未认证</el-button>
      </iep-form-item>
      <iep-form-item label-name="成立时间" prop="establishmentTime" class="iep-form-half-block">
        <iep-date-picker v-model="form.establishmentTime" type="date" placeholder="请选择成立时间"></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="行业" prop="industry" class="iep-form-half-block">
        <IepCascaderIndustry v-model="form.industry"></IepCascaderIndustry>
      </iep-form-item>
      <iep-form-item label-name="联系电话" prop="contactInformation" class="iep-form-half-block">
        <el-input v-model.trim="form.contactInformation" placeholder="座机号如: 0580-2615007"></el-input>
      </iep-form-item>
      <iep-form-item label-name="所在地" prop="region" class="iep-form-half-block">
        <!-- <IepCascaderCity v-model="form.region"></IepCascaderCity> -->
        <CascaderCity v-model="form.region"></CascaderCity>
      </iep-form-item>
      <iep-form-item label-name="详细地址" prop="contactAddress">
        <el-input v-model.trim="form.contactAddress"></el-input>
      </iep-form-item>
      <el-divider></el-divider>
      <iep-form-item
        :label-name="$constTagLabel.abilityTag.soName"
        prop="abilityTag"
        class="iep-form-block"
      >
        <iep-tag-input v-model="form.abilityTag"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="口号" prop="slogan">
        <el-input v-model="form.slogan" placeholder="以人为本，数据赋能，智慧组织成就未来！" :maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="简介" prop="introduction">
        <iep-input-area v-model="form.introduction" :maxlength="1000"></iep-input-area>
      </iep-form-item>
    </el-form>

    <IepFooterBar>
      <el-button
        class="iep-btn-submit"
        type="primary"
        :loading="submitFormLoading"
        @click="mixinsSubmitFormGen()"
      >保存</el-button>
    </IepFooterBar>
  </iep-basic-container>
</template>
<script>
import { checkPhone } from "@/util/rules";
import CascaderCity from "@/views/my/account/components/CascaderCity";
import formMixins from "@/mixins/formMixins";
import { mapGetters, mapActions } from "vuex";
import { getOrgById, putOrg } from "@/api/admin/org";
import { OrgEntity } from "@/types/org";
export default {
  components: {
    CascaderCity,
  },
  mixins: [formMixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      rules: {
        contactInformation: [{ validator: checkPhone, trigger: "blur" }],
      },
      form: new OrgEntity(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage() {
      const { data } = await getOrgById(this.userInfo.orgId);
      this.form = this.$mergeByFirst(new OrgEntity(), data);
    },
    async submitForm() {
      this.form.slogan =
        this.form.slogan.trim() || "以人为本，数据赋能，智慧组织成就未来！";
      const { data } = await putOrg(this.form);
      if (data) {
        this.$message.success("保存成功");
        this.orgChangeAction(this.userInfo.orgId);
        this.loadPage();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-attestation {
  display: inline-block;
  margin-right: -95px;
  margin-left: 10px;
  width: auto;
  height: 42px;
  vertical-align: middle;
}
.form-wrapper {
  padding-top: 20px;
}
.iep-page-form {
  position: relative;
}
</style>
