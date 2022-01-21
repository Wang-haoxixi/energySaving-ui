<template>
  <el-collapse-item title="单通讯录选择" name="6">
    <div class="component-box">
      <pre>{{contact}}</pre>
      <IepContactInput v-model="contact" :limitUserIds="[1]" :showFriend="true"></IepContactInput>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      contact: {},
    };
  },
};
</script>
