<template>
  <IepDialogMessage title="新增运维" ref="IepDialogMessage" @close="_close()">
    <p slot="desc">是否确认邀请 {{usersName}} 加入运维工作台？</p>
    <div slot="button" class="btn-wrapper">
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
      <el-button @click="_close()" plain>上一步</el-button>
    </div>
  </IepDialogMessage>
</template>
<script>
import { postDevOpsUser } from "@/api/admin/dev_ops";
export default {
  data() {
    return {
      dialogShow: false,
      userIds: [],
      userNames: [],
    };
  },
  computed: {
    usersName() {
      return this.userNames.join("、");
    },
  },
  methods: {
    open(userNames, userIds) {
      this.userNames = userNames;
      this.userIds = userIds;
      this.$refs["IepDialogMessage"].dialogShow = true;
    },
    _close() {
      this.$emit("load-page");
    },
    async handleSubmit() {
      const { data } = await postDevOpsUser(this.userIds);
      if (data) {
        this.$message("操作成功");
        this._close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
}
</style>
