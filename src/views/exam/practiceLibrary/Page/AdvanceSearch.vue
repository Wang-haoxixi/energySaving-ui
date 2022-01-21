<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="考试分类">
        <el-input @focus="handleFocus" v-model="form.qType" clearable @clear="clear"></el-input>
      </iep-form-item>
      <iep-form-item label-name="考试状态">
        <el-select v-model="form.state" clearable>
          <el-option :key="0" label="禁用" :value="0"></el-option>
          <el-option :key="1" label="启用" :value="1"></el-option>
        </el-select>
      </iep-form-item>
      <!-- <el-form-item label="考试类型">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>-->
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
import {
  // getExamquestionPage,
  // getDictByNumber,
  getTestDictPage,
} from "@/api/qms/test_questions_library";
import dialogType from "../../testQuestionsLibrary/Page/dialogType";
export default {
  data() {
    return {
      form: {},
      propTreeMenu: {},
    };
  },
  computed: {},
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created() {},
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
      getTestDictPage(params).then(res => {
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

