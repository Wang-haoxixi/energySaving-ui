<template>
  <el-collapse-item title="文件上传" name="1">
    <div class="component-box">
      <pre>{{files}}</pre>
      <iep-upload v-model="files" action="/api/admin/file/oss/upload"></iep-upload>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      files: [],
    };
  },
};
</script>
