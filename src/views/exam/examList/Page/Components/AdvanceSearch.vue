<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <el-form-item label="名称">
        <el-input v-model="form.examName" placeholder="请输入名称关键词"></el-input>
      </el-form-item>
      <iep-form-item label-name="分类">
        <el-input @focus="handleFocus" v-model="form.qType" clearable @clear="clear"></el-input>
      </iep-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.testStatus">
          <el-radio v-for="(v, i) in dictsMap.testStatus" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="select" label="收费状态">
        <el-radio-group v-model="form.chargeStatus">
          <el-radio v-for="(v, i) in dictsMap.chargeStatus" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <iep-operation-wrapper>
          <el-button type="primary" @click="searchPage">搜索</el-button>
          <iep-button @click="clearSearchParam">清空</iep-button>
        </iep-operation-wrapper>
      </el-form-item>
    </el-form>
    <dialogType
      ref="dialogType"
      @save="handleActive"
      :checkTreeMenu="propTreeMenu"
      :dialogTitle="`试卷分类`"
    ></dialogType>
  </div>
</template>
<script>
import { getTestDictPage } from "@/api/qms/test_questions_library";
import dialogType from "../../../testQuestionsLibrary/Page/dialogType";
import { dictsMap, initSearchForm } from "@/views/channel/Exam/const/option";
export default {
  data() {
    return {
      dictsMap,
      form: initSearchForm(),
      propTreeMenu: {},
    };
  },
  components: {
    dialogType,
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = {};
      this.$emit("clear-search-param");
    },
    clear() {},
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.$set(this.form, "qTypeString", val.selectString);
        this.$set(this.form, "qType", val.selectCn);
        this.searchPage();
      });
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 2;
      const params = {};
      params.category = type;
      getTestDictPage(params).then((res) => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        this.$refs["dialogType"].defalutArray = [res.data.children[0].id];
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

