<template>
  <el-table-column v-if="options.length" prop="operation" label="操作" :width="width" fixed="right">
    <template slot-scope="scope">
      <contain :options="options" :row="scope.row" :count="count"></contain>
    </template>
  </el-table-column>
</template>
<script>
import contain from "./contain";
export default {
  name: "IepOperationTableBtnGroup",
  components: { contain },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 120,
    },
    count: {
      type: Number,
      default: 2,
    },
  },
  computed: {},
  methods: {},
};
</script>

