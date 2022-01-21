<template>
  <el-collapse-item title="多通讯录选择" name="5">
    <div class="component-box">
      <pre>{{contacts}}</pre>
      <IepContactsInput v-model="contacts" :showFriend="true" :limitUserIds="[1]" :onlyOnlineOrg="false"></IepContactsInput>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      contacts: [],
    };
  },
};
</script>
