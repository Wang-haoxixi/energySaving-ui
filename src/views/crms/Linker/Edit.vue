<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${methodName}联系人`" :backOption="backOption"></iep-page-header>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        class="iep-form-detail"
        style="margin-right: 16%;"
      >
        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item v-if="isShow" label-name="所属客户" prop="clientId">
              <IepCommonSelect v-model="form.clientId" prefixUrl="dms/client/page" id="clientId"></IepCommonSelect>
            </iep-form-item>
          </el-col>

          <el-col :span="12">
            <iep-form-item label-name="联系人姓名" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item label-name="手机" prop="mobile">
              <el-input v-model="form.mobile"></el-input>
            </iep-form-item>
          </el-col>

          <el-col :span="12">
            <iep-form-item label-name="处室/部门" prop="dept">
              <el-input v-model="form.dept"></el-input>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item label-name="联系人职务" prop="position">
              <el-input v-model="form.position"></el-input>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item label-name="电话" prop="telephone">
              <el-input v-model="form.telephone"></el-input>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item label-name="传真" prop="fax">
              <el-input v-model="form.fax"></el-input>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item label-name="QQ" prop="qq">
              <el-input v-model="form.qq"></el-input>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item label-name="微信" prop="weiXin">
              <el-input v-model="form.weiXin"></el-input>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item label-name="邮箱" prop="mail">
              <el-input v-model="form.mail"></el-input>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="12">
            <iep-form-item label-name="生日">
              <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </iep-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <iep-form-item label-name="联系人标签" prop="tagKeywords">
            <IepTagInput v-model="form.tagKeywords"></IepTagInput>
          </iep-form-item>
        </el-col>

        <el-col :span="24">
          <iep-form-item label-name="地址" prop="residenceAddress">
            <div style="display:flex;width:100%">
              <iep-select-city style="flex:2;margin-right:10px" v-model="form.cityCode"></iep-select-city>
              <el-input style="flex:3;" v-model="form.address"></el-input>
            </div>
          </iep-form-item>
        </el-col>
        <el-col :span="24">
          <iep-form-item label-name="其它说明" prop="remark">
            <el-input v-model="form.remark"></el-input>
          </iep-form-item>
        </el-col>
      </el-form>
      <IepFooterBar>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>
<script>
import { initForm, rules } from "./options.ts";
import {
  updatePage,
  createPage,
  getContactById,
} from "@/api/dms/custom_contact.ts";
export default {
  data() {
    return {
      rules,
      form: initForm(),
      backOption: {
        isBack: true,
      },
      isShow: true,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id ? true : false;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
    isMy() {
      return this.$route.query.my;
    },
    clientId() {
      return this.$route.query.clientId;
    },
    title() {
      return this.$route.query.title;
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      if (this.isMy) {
        this.isShow = false;
        // this.form.clientId = this.title;
      }
      if (this.isEdit) {
        this.loadDetailPage();
      }
    },
    loadDetailPage() {
      getContactById(this.id).then(res => {
        this.form = this.$mergeByFirst(this.form, res.data);
        this.form.cityCode = this.form.cityCode.split(",").map(i => Number(i));
        this.form.tagKeywords = res.data.tags;
      });
    },
    async submitForm() {
      const fnRequest = this.isEdit ? updatePage : createPage;
      if (this.isMy) {
        this.form.clientId = this.clientId;
      }
      fnRequest(this.form).then(res => {
        try {
          if (res.data) {
            this.$message({
              type: "success",
              message: `${this.methodName}成功!`,
            });
            this.$router.go(-1);
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.form >>> .el-select {
  width: 100%;
}
.form >>> .el-cascader {
  width: 100%;
}
</style>
