<template>
  <iep-basic-container style="border:0;">
    <div class="base-more">
      <div class="title-box">
        <div class="info-title">{{$route.name}}</div>
      </div>
      <el-form
        class="iep-form-detail form-wrapper"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item class="iep-nomargin-form-item" prop="workExperience">
          <WorkExperience v-model="form.workExperience"></WorkExperience>
        </el-form-item>
        <el-form-item class="iep-nomargin-form-item" prop="learningSituation">
          <LearningSituation v-model="form.learningSituation"></LearningSituation>
        </el-form-item>

        <iep-form-item class="iep-form-half" label-name="生日" prop="birthday">
          <iep-date-picker
            v-model="form.birthday"
            valueFormat="yyyy-MM-dd"
            type="date"
            placeholder="请选择生日"
          ></iep-date-picker>
        </iep-form-item>
        <iep-form-item class="iep-form-half" label-name="家乡" prop="householdRegister">
          <CascaderCity v-model="form.householdRegister"></CascaderCity>
        </iep-form-item>
        <iep-form-item class="iep-form-half" prop="mobile" label-name="手机">
          <el-input class="mobile-input" v-model="form.mobile" :readonly="true"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" prop="weiXin" label-name="微信">
          <el-input v-model.trim="form.weiXin" :maxlength="30"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" prop="qq" label-name="QQ">
          <el-input v-model.trim="form.qq" :maxlength="20"></el-input>
        </iep-form-item>
        <iep-form-item class="iep-form-half" prop="mail" label-name="邮箱">
          <el-input v-model.trim="form.mail" :maxlength="30"></el-input>
        </iep-form-item>

        <el-form-item class>
          <el-button
            class="iep-btn-submit"
            type="primary"
            :loading="submitFormLoading"
            @click="mixinsSubmitFormGen()"
          >保存</el-button>
        </el-form-item>
      </el-form>
      <ReceiveAddress></ReceiveAddress>
    </div>
  </iep-basic-container>
</template>
<script>
import CascaderCity from "./components/CascaderCity";
import formMixins from "@/mixins/formMixins";
import { rules } from "./options";
import WorkExperience from "./components/WorkExperience";
import LearningSituation from "./components/LearningSituation";
import { putUserMoreInfo } from "@/api/admin/user";
import { mapActions, mapGetters } from "vuex";
import { UserDTOEntity } from "@/types/user";
import ReceiveAddress from "./components/ReceiveAddress";

export default {
  components: {
    WorkExperience,
    LearningSituation,
    ReceiveAddress,
    CascaderCity,
  },
  mixins: [formMixins],
  data() {
    return {
      rules,
      activeNames: ["1"],
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
      const data = await putUserMoreInfo(this.form);
      if (data.data) {
        this.$message.success("保存成功");
        this.refresh();
      }
    },
    async refresh() {
      await this.userGetInfo();
      this.load();
    },
    load() {
      this.form = this.$mergeByFirst(new UserDTOEntity(), this.userInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.form-wrapper {
  margin-top: 20px;
}
.base-more {
  margin-bottom: 20px;
  // padding: 20px;
  background-color: #fff;
}
.base-more ::v-deep .el-form-item__content > div {
  width: 100%;
}
.base-more ::v-deep .el-form-item__content .el-cascader:hover .el-input__inner {
  border-color: $--color-primary;
}
.base-more ::v-deep .el-collapse {
  border: none;
}
.base-more ::v-deep .el-collapse-item__header {
  font-family: "微软雅黑";
  color: $--color-text-primary;
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
}
.base-more ::v-deep .el-collapse-item__wrap {
  border: none;
}
.mobile-input ::v-deep .el-input__inner {
  background: $--background-color;
  color: $--color-input-regular;
}
.mobile-input ::v-deep .el-input__inner:hover,
.mobile-input ::v-deep .el-input__inner:focus {
  border-color: $--border-color;
  box-shadow: none;
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-box .info-title {
  padding-bottom: 0;
}
::v-deep .item-primary {
  padding: 0;
}
.iep-nomargin-form-item ::v-deep .title:before {
  top: 12px;
}
</style>
