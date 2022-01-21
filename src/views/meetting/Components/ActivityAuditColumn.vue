<template>
  <div>
    <span v-if="scope.row.auditStatus === '0'">未提交</span>
    <span v-if="scope.row.auditStatus === '1'&&scope.row.statusFlag === '0'">未提交</span>
    <span v-if="scope.row.auditStatus === '1'&&scope.row.statusFlag !== '0'">审核中</span>
    <span class="iep-red" v-if="scope.row.auditStatus === '2'">未通过</span>
    <span class="iep-green" v-if="scope.row.auditStatus === '3'">已通过</span>
    <span class="iep-red" v-if="scope.row.auditStatus === '4'">被下架</span>
  </div>
</template>
<script>
export default {
  name: "ActivityAuditColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
};
</script>
