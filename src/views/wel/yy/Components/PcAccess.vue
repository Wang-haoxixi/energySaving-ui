<template>
  <iep-table
    :isLoadTable="loading"
    :isPagination="false"
    :pagedTable="accessList"
    :columnsMap="columnsMap"
  ></iep-table>
</template>
<script>
import { columnsMapAccess as columnsMap } from "../options";
const mock = [
  {
    name: "魔方首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "工场首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "动态首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "活动首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "问卷首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "组织风采页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "个人风采页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
  {
    name: "组织工作台首页",
    yestoday: 134,
    lastWeek: 735,
    lastMonth: 3540,
  },
];
export default {
  data() {
    return {
      accessList: mock,
      columnsMap,
      loading: false,
    };
  },
};
</script>