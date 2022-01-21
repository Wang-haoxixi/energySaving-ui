<template>
  <el-collapse-item title="富文本" name="11">
    <div class="component-box">
      <pre>{{content}}</pre>
      <IepJoditEditor v-model="content"></IepJoditEditor>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
};
</script>
