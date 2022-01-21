<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/channel/exam/index' }">考试</el-breadcrumb-item>
    <el-breadcrumb-item>{{bcText}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { breadcrumbText } from "../options";
export default {
  data() {
    return {};
  },
  computed: {
    bcText() {
      return breadcrumbText(this.$route.params.type);
    },
  },
};
</script>
