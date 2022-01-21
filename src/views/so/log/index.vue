<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :columnsMap="columnsMap"
        rowId="id"
        :loadFunction="getLogPage"
        searchName="title"
        placeholder="按照事件详情搜索"
      >
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { getOrgLogPage, getOrgLogPageById } from "@/api/admin/org";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsMap: [
        {
          prop: "type",
          label: "事件类型",
          type: "dictGroup",
          dictName: "so_log_event_type",
          width: "180",
        },
        {
          prop: "title",
          label: "事件详情",
          width: "320",
        },
        {
          prop: "realName",
          label: "操作人",
          width: "150",
        },
        {
          prop: "createTime",
          label: "日期",
        },
        {
          prop: "operationIp",
          label: "操作IP地址",
          width: "120",
        },
      ],
    };
  },
  computed: {
    id() {
      if (this.$route.params.id) {
        return +this.$route.params.id;
      }
      return null;
    },
    getLogPage() {
      if (this.id) {
        return getOrgLogPageById(this.id);
      } else {
        return getOrgLogPage;
      }
    },
  },
  methods: {
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
