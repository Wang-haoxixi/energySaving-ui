<template>
  <iep-dialog :dialog-show="dialogShow" title width="600px" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="140px" class="form-detail">
      <iep-form-item label-name="请选择合伙主体">
        <div class="span">{{formData.type === "so" ? "组织" : "个人"}}</div>
      </iep-form-item>
      <iep-form-item label-name="姓名/公司名称">
        <div class="span">{{formData.name}}</div>
      </iep-form-item>
      <iep-form-item label-name="行业">
        <div class="span">{{formData.industry}}</div>
      </iep-form-item>
      <iep-form-item label-name="职位">
        <div class="span">{{formData.position}}</div>
      </iep-form-item>
      <iep-form-item label-name="地区">
        <div class="span">{{formData.city}}</div>
      </iep-form-item>
      <iep-form-item label-name="联系方式">
        <div class="span">{{formData.mobile}}</div>
      </iep-form-item>
      <iep-form-item label-name="能力与优势">
        <div class="span">{{formData.ability}}</div>
      </iep-form-item>
      <iep-form-item label-name="具体描述">
        <div class="span" v-html="formData.describe"></div>
      </iep-form-item>
    </el-form>

    <iep-footer-bar>
      <iep-button @click="resetForm" :loading="loadState">关闭</iep-button>
    </iep-footer-bar>
  </iep-dialog>
</template>

<script>
import { initInfoForm } from "./options";
import { mapGetters } from "vuex";
import { getPartnerInfo } from "@/api/dms/recruit_query";

export default {
  components: {},
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initInfoForm(),
      rules: {},
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open(row = {}) {
      this.dialogShow = true;
      getPartnerInfo({
        applyId: row.applyId,
      }).then(({ data }) => {
        this.formData = { ...data };
      });
    },
    resetForm() {
      this.formData = initInfoForm();
      this.dialogShow = false;
    },
  },
  created() {},
};
</script>
