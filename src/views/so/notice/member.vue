<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        searchName="title"
        :loadFunction="getNoticePageByOrgId(userInfo.orgId)"
        :isMutipleSelection="false"
      >
        <template #name="{scope}">
          <div @click="handleShow(scope.row)" style="cursor: pointer;">
            <iep-div-detail :value="scope.row['name']"></iep-div-detail>
          </div>
        </template>
        <template #isRead="{scope}">
          <div v-if="scope.row['isRead']">已读</div>
          <div v-else>未读</div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <IepDialogSendNotice ref="IepDialogSendNotice" @load-page="loadPage()"></IepDialogSendNotice>
  </div>
</template>
<script>
import { getNoticePageByOrgId } from "@/api/ims/message";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dictsMap: {},
      columnsMap: [
        {
          prop: "name",
          label: "主题",
          type: "slot",
        },
        {
          prop: "time",
          label: "时间",
          width: 200,
        },
        {
          prop: "isRead",
          label: "状态",
          type: "slot",
          width: 200,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getNoticePageByOrgId,
    handleShow(row) {
      this.$openPage(`/spa/notice/${row.id}`);
    },
    handleAdd() {
      this.$refs["IepDialogSendNotice"].selfAdd();
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
