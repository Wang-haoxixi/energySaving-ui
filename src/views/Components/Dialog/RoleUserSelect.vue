<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="角色授权"
    width="650px"
    @close="_close()"
    @mounted="load()"
  >
    <IepSelectCommonList
      style="margin-bottom:10px;"
      v-model="roleId"
      :prefixUrl="prefixUrl"
      :props="{label:'name',value:'id'}"
    ></IepSelectCommonList>
    <el-transfer
      style="margin-bottom:20px"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入关键字"
      v-model="userIds"
      :data="data"
      :titles="['所有用户', '已有用户']"
      :props="{label:'name',key:'id'}"
      :button-texts="['移除用户', '添加用户']"
    >
      <span slot-scope="{ option }">{{ option.id }} - {{ option.name }}</span>
    </el-transfer>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  name: "IepDialogRoleUserSelect",
  data() {
    return {
      prefixUrl: "admin/role/org",
      submitFormLoading: false,
      dialogShow: false,
      roleId: null,
      data: [],
      userIds: [],
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1;
      },
      获取该角色已有的用户列表方法: () => {},
      保存该角色用户列表方法: () => {},
      获取角色的所有用户列表方法: () => {},
    };
  },
  watch: {
    roleId(n) {
      if (n) {
        this.loadRoleUserList();
      }
    },
  },
  methods: {
    load() {
      this.loadOrgUserList();
      this.loadRoleUserList();
    },
    async loadOrgUserList() {
      const { data } = await this.获取角色的所有用户列表方法();
      this.data = data;
    },
    async loadRoleUserList() {
      if (this.roleId) {
        const { data } = await this.获取该角色已有的用户列表方法(this.roleId);
        this.userIds = data;
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      if (this.roleId) {
        this.submitFormLoading = true;
        const { data } = await this.保存该角色用户列表方法({
          roleId: this.roleId,
          userIds: this.userIds,
        });
        if (data) {
          this.$message.success("操作成功");
          this.close();
        }
        this.submitFormLoading = false;
      } else {
        this.$message.warning("请先选择角色");
      }
    },
  },
};
</script>
