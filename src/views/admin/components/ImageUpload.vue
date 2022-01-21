<template>
  <el-collapse-item title="图片上传" name="9">
    <div class="component-box">
      <pre>{{imgUrl}}</pre>
      <IepUploadAvatar v-model="imgUrl"></IepUploadAvatar>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
};
</script>
