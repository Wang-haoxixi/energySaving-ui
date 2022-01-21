<template>
  <iep-basic-container class="router-box">
    <div class="dynamic-wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关注的人" name="person">
          <person-tpl v-if="activeName === 'person'"></person-tpl>
        </el-tab-pane>
        <el-tab-pane label="关注的组织" name="organize">
          <organize-tpl v-if="activeName === 'organize'"></organize-tpl>
        </el-tab-pane>
        <el-tab-pane label="关注的话题" name="subject">
          <subject-tpl v-if="activeName === 'subject'"></subject-tpl>
        </el-tab-pane>
      </el-tabs>
    </div>
  </iep-basic-container>
</template>

<script>
import PersonTpl from "./person";
import OrganizeTpl from "./organize";
import SubjectTpl from "./subject";

export default {
  name: "attention",
  components: { PersonTpl, OrganizeTpl, SubjectTpl },
  data() {
    return {
      activeName: "person",
      personList: [],
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../router-box";
.dynamic-wrapper {
  margin-top: -10px;
  width: 100%;
  height: 100%;
}
.router-box {
  min-height: 471px;
}
</style>