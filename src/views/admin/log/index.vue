<template>
  <div class="log">
    <iep-basic-container>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        rowId="id"
        :loadFunction="getLogPage"
        searchName="title"
        :isMutipleSelection="false"
      >
        <template #iep-crud-left>
          <iep-page-header :title="$route.meta.name"></iep-page-header>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { getLogPage } from "@/api/admin/log";
export default {
  data() {
    return {
      dictsMap: {
        type: {
          0: "正常",
        },
      },
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "类型",
          prop: "type",
          type: "dict",
        },
        {
          label: "标题",
          prop: "title",
        },
        {
          label: "IP地址",
          prop: "remoteAddr",
        },
        {
          label: "请求方式",
          prop: "method",
        },
        {
          label: "客户端",
          prop: "serviceId",
        },
        {
          label: "请求时间(ms)",
          prop: "time",
        },
        {
          width: 180,
          label: "创建时间",
          prop: "createTime",
        },
      ],
    };
  },
  methods: {
    getLogPage,
  },
};
</script><style lang="scss" scoped>
::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>