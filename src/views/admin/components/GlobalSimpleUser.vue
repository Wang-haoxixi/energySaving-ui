<template>
  <el-collapse-item title="全局单用户" name="3">
    <div class="component-box">
      <pre>{{user}}</pre>
      <IepUserInput v-model="user"></IepUserInput>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    };
  },
};
</script>
