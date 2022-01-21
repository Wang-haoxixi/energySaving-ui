<template>
  <div>
    <span v-if="scope.row.ticketingType=='1'">免费票</span>
    <span v-if="scope.row.ticketingType=='2'">付费票</span>
    <span>/</span>
    <span>{{scope.row.ticketingName}}</span>
  </div>
</template>
<script>
export default {
  name: "TicketTypeColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
};
</script>
