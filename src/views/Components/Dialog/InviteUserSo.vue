<template>
  <iep-dialog
    title="邀请加入组织"
    :dialogShow="dialogShow"
    @close="close()"
    width="500px"
    @mounted="load()"
  >
    <p>请选择您邀请对方加入的组织</p>
    <el-input
      ref="searchInput"
      v-model="searchText"
      size="medium"
      class="input-with-search"
      prefix-icon="el-icon-search"
      placeholder="请输入内容"
      clearable
    ></el-input>
    <el-scrollbar style="height:300px">
      <template v-for="item in currentUserOrg">
        <div v-if="_isShow(item, searchText)" :key="item.orgId" class="org-item">
          <el-avatar shape="square" :src="item.avatar"></el-avatar>
          <div class="name">
            <div>{{item.name}}</div>
            <el-button v-if="!!item.isJoinShow" type="text" :disabled="!!item.isJoinShow">已加入</el-button>
            <template v-else>
              <el-button
                type="text"
                v-if="!form.orgIds.includes(item.orgId)"
                @click="handleSelect(item)"
              >选择</el-button>
              <el-button v-else type="text" @click="handleUnSelect(item)">取消选择</el-button>
            </template>
          </div>
        </div>
      </template>
    </el-scrollbar>
    <template slot="footer">
      <el-button type="primary" @click="submitForm()" :disabled="!this.form.orgIds.length">邀请</el-button>
      <el-button @click="close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { inviteSoUsersBatch } from "@/api/admin/org";
class InviteUserSoDto {
  constructor(orgIds = [], userId = 0) {
    this.orgIds = orgIds;
    this.userId = userId;
  }
  orgIds = [];
  userId = 0;
}

export default {
  name: "IepDialogInviteUserSo",
  data() {
    return {
      searchText: "",
      currentUserOrg: [],
      form: new InviteUserSoDto(),
      dialogShow: false,
    };
  },
  created() {
    this.form = new InviteUserSoDto();
  },
  methods: {
    load() {
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    _isShow(item, searchText) {
      return item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    },
    handleSelect(item) {
      this.form.orgIds.push(item.orgId);
    },
    handleUnSelect(item) {
      this.form.orgIds = this.form.orgIds.filter((m) => m !== item.orgId);
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new InviteUserSoDto();
      this._close();
    },
    async submitForm() {
      const { data } = await inviteSoUsersBatch(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.org-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
  .name {
    line-height: 36px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    padding: 10px 0;
    border-bottom: 1px solid $--border-color;
  }
}
.input-with-search {
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
