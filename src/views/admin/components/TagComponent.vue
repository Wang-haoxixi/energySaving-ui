<template>
  <el-collapse-item title="标签组件" name="2">
    <div class="component-box">
      <pre>{{tags}}</pre>
      <IepTagInput v-model="tags"></IepTagInput>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      tags: [],
    };
  },
};
</script>
