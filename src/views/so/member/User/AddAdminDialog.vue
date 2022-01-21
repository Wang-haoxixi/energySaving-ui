<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="添加管理员"
    width="1000px"
    @close="_close()"
    @mounted="load()"
  >
    <div class="admin-wrapper">
      <iep-operation-container>
        <template slot="left">
          <h2>组织管理员</h2>
        </template>
        <template slot="right">
          <iep-operation-search
            @search-page="searchPage"
            prop="realName"
            placeholder="请输入用户真实姓名进行搜索"
          ></iep-operation-search>
        </template>
      </iep-operation-container>
      <div class="content">
        <el-scrollbar class="select-wrapper">
          <div class="user-item" v-for="item in adminList" :key="item.id">
            <div class="info">
              <iep-img
                class="iep-avatar-margin-right avatar"
                :resizeOpt="{l:40}"
                :src="item['avatar']"
              ></iep-img>
              <iep-div-detail :value="item['name']" style="width: 72px;"></iep-div-detail>
              <span v-if="userInfo.userId === item.id">[自己]</span>
            </div>
            <el-button
              v-if="userInfo.userId !== item.id"
              type="text"
              icon="el-icon-close"
              @click="handleDelSelect(item)"
            ></el-button>
          </div>
        </el-scrollbar>
        <div class="table-wrapper">
          <iep-table
            :isLoadTable="isLoadTable"
            :pageOptionSize="4"
            :pagination="pagination"
            :columnsMap="columnsMap"
            :dictsMap="dictsMap"
            :pagedTable="pagedTable"
            @pagination-size-change="handlePaginationSizeChange"
            @pagination-current-change="handlePaginationCurrentChange"
          >
            <template #realName="{scope}">
              <iep-img
                class="iep-avatar-margin-right"
                :resizeOpt="{l:40}"
                :src="scope.row['avatar']"
              ></iep-img>
              <iep-div-detail class="name" :value="scope.row['realName']"></iep-div-detail>
            </template>
            <iep-operation-table-btn-group :options="operationOptions" :width="100"></iep-operation-table-btn-group>
          </iep-table>
        </div>
      </div>
    </div>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { columnsMap, dictsMap } from "./options";
import mixins from "@/mixins/mixins";
import {
  getOrgUserPage,
  getOrgAdminList,
  setOrgAdminBatch,
} from "@/api/admin/org";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      iepPageSize: 5,
      adminList: [],
      dictsMap,
      columnsMap,
      dialogShow: false,
      submitFormLoading: false,
      operationOptions: [
        {
          name: "添加",
          func: this.handleAddSelect,
          hidden: false,
          disabled: row => {
            const ids = this.adminList.map(m => m.id);
            // 如果认证中
            return ids.includes(row.userId);
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async submitForm() {
      try {
        this.submitFormLoading = true;
        const id = this.adminList.map(m => m.id);
        // const aId = this.readyAdminList.map(m => m.id);
        const data = await setOrgAdminBatch(id);
        // const data = await this.formRequestFn(this.form);
        if (data.data) {
          this.$message.success("操作成功");
          this.close();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
      }
    },
    handleDelSelect(item) {
      this.adminList = this.adminList.filter(m => m.id !== item.id);
    },
    handleAddSelect(row) {
      this.adminList.push({
        id: row.userId,
        name: row.realName,
        avatar: row.avatar,
      });
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    load() {
      this.loadUserList();
      this.loadPage();
    },
    async loadUserList() {
      const { data } = await getOrgAdminList();
      this.adminList = data;
    },
    async loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      await this.loadTable(param, getOrgUserPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-wrapper {
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 16px;
  }
}
.content {
  display: flex;
  .select-wrapper {
    flex: 0 0 200px;
    margin-bottom: 20px;
    height: 48vh;
    border: 1px solid $--border-color;
    border-radius: 10px;
    ::v-deep .el-scrollbar__wrap {
      margin-right: 0 !important;
    }
    .user-item {
      padding: 10px 0;
      margin: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $--border-color;
      justify-content: space-between;
      &:last-child {
        padding-bottom: 30px;
        border-bottom: 0;
      }
      .info {
        display: flex;
        align-items: center;
        width: 164px;
        overflow-y: hidden;
      }
    }
  }
  .table-wrapper {
    margin-left: 20px;
    flex: 1;
    ::v-deep .name {
      max-width: 100px;
    }
  }
}
.user-item {
  &:last-child {
    border-bottom: 0;
  }
  .avatar {
    margin-right: 10px;
    height: 40px;
    width: 40px;
    border: 1px solid $--border-color;
  }
}
.user-item ::v-deep .el-button--text {
  color: $--color-text-secondary;
  &:hover {
    color: $--color-primary;
  }
}
</style>
