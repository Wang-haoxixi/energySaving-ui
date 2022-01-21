<template>
  <el-collapse-item title="全局多用户" name="4">
    <div class="component-box">
      <pre>{{users}}</pre>
      <IepUsersInput v-model="users"></IepUsersInput>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
};
</script>
