<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <!-- 样例 -->
      <iep-table
        :size="tableSize"
        :isLoadTable="false"
        :isPagination="false"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
      >
        <template #name="{scope}">
          <iep-img class="iep-avatar-margin-right" :resizeOpt="{l:40}" :src="scope.row['icon']"></iep-img>
          <iep-div-detail :value="scope.row['name']"></iep-div-detail>
        </template>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { getOrgAppList, enableApplication } from "@/api/admin/app_store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      columnsMap: [
        {
          prop: "name",
          label: "应用",
          width: 240,
          type: "slot",
        },
        {
          prop: "developer",
          label: "开发者信息",
          width: 180,
        },
        {
          prop: "introduction",
          label: "介绍",
        },
      ],
      pagedTable: [],
      operationOptions: [
        {
          name: "启用",
          func: this.handleDeal,
          hidden: (row) => {
            return row.isDisable !== 1;
          },
        },
        {
          name: "停用",
          func: this.handleDeal,
          hidden: (row) => {
            return row.isDisable !== 0;
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getOrgAppList();
      this.pagedTable = data;
    },
    async handleDeal(row) {
      if (row.roleNames && row.roleNames.length) {
        const str = (() => {
          const roleStr = row.roleNames.join("、");
          if (row.isDisable) {
            return `欢迎使用 ${row.name} 应用！该应用默认预设角色 ${roleStr} 可供配置，立刻前往角色管理开始使用吧！`;
          } else {
            return `一旦停用 ${row.name}，你在当前组织中赋予成员的预设角色 ${roleStr} 将被全部撤回。是否确认停用应用？`;
          }
        })();
        try {
          const r = await this.$confirm(str, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          if (r === "confirm") {
            const { data } = await enableApplication(row.id);
            if (data) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.loadPage();
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message.warning("应用暂无角色，请刷新");
      }
    },
  },
};
</script>
