<template>
  <div class="token">
    <iep-basic-container>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        row-id="userId"
        searchName="username"
        :loadFunction="getTokenPage"
      >
        <template #iep-crud-left>
          <iep-page-header :title="$route.meta.name"></iep-page-header>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getTokenPage, delTokenById } from "@/api/admin/token";
import { hasPermissions } from "@/util/menu";
export default {
  mixins: [operationMixins],
  data() {
    return {
      operationOptions: [
        {
          name: "强制下线",
          func: this.handleDel,
          hidden: !hasPermissions("sys_token_del"),
        },
      ],
      columnsMap: [
        {
          prop: "user_id",
          label: "用户ID",
          width: "120px",
        },
        {
          prop: "username",
          label: "用户名",
        },
        {
          prop: "access_token",
          label: "令牌",
        },
        {
          prop: "token_type",
          label: "类型",
        },
        {
          prop: "expires_in",
          label: "过期时间",
        },
      ],
    };
  },
  methods: {
    getTokenPage,
    handleDel(row) {
      this._handleComfirm(row.access_token, delTokenById, "强制用户下线");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.token ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>