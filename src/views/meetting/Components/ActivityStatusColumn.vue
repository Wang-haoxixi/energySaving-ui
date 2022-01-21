<template>
  <div>
    <span class="going" v-if="scope.row.statusFlag === '1'">进行中</span>
    <span class="remark" v-if="scope.row.statusFlag === '0'">草稿</span>
    <span class="end" v-if="scope.row.statusFlag === '2'">已结束</span>
    <span class="off" v-if="scope.row.statusFlag === '3'">被下架</span>
  </div>
</template>
<script>
export default {
  name: "ActivityStatusColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
div > span {
  border-radius: 30px;
  padding: 3px 14px;
  line-height: 28px;
  border: 1px solid;
}
.remark {
  color: #66a2cc;
}
.end {
  color: $--border-color;
}
.going {
  color: #98c68a;
}
.off {
  color: #c68498;
}
</style>
