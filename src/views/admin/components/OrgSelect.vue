<template>
  <el-collapse-item title="组织选择" name="7">
    <div class="component-box">
      <pre>{{orgId}}</pre>
      <IepOrgSelect v-model="orgId"></IepOrgSelect>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      orgId: null,
    };
  },
};
</script>
