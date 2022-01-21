<template>
  <el-form :model="paramForm" label-width="80px" class="search-form">
    <iep-form-item label-name="举报人">
      <el-input v-model="paramForm.realName"></el-input>
    </iep-form-item>
    <iep-form-item label-name="内容分类">
      <el-select v-model="paramForm.tipOffType" clearable placeholder="请选择内容分类">
        <el-option
          v-for="item in dictGroup.get('dms_report_content_type')"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="举报类型">
      <el-select v-model="paramForm.tipOffReason" clearable placeholder="请选择举报类型">
        <el-option
          v-for="item in dictGroup.get('dms_report_type')"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </iep-form-item>
    <el-form-item class="footer">
      <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
      <el-button @click="clearSearchParam">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { initSearchForm } from "./options";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      paramForm: initSearchForm(),
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
  },
  methods: {
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  &::v-deep .el-form-item__label {
    line-height: 38px;
  }
}
.footer ::v-deep .el-form-item__content {
  margin-left: 0 !important;
}
</style>
