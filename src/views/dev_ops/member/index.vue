<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='user'" v-slot:user>
          <User></User>
        </template>
        <template v-if="tabName ==='role'" v-slot:role>
          <Role></Role>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import User from "./User/index";
import Role from "./Role/index";
export default {
  components: {
    User,
    Role,
  },
  data() {
    return {
      tabName: "user",
      tabList: [
        {
          label: "成员",
          value: "user",
        },
        {
          label: "角色",
          value: "role",
        },
      ],
    };
  },
};
</script>
