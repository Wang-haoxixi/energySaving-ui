<template>
  <div>
    <el-table :data="data" border show-summary style="width: 100%">
      <template v-for="item in columnsMap">
        <el-table-column :key="item.value" :prop="item.value" :label="item.label"></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columnsMap: [
        { value: "val1", label: "行政区划" },
        { value: "val2", label: "应认领目录主项数" },
        { value: "val3", label: "应认领目录数" },
        { value: "val4", label: "已认领目录数" },
        { value: "val5", label: "事项目录主项数" },
        { value: "val6", label: "事项目录总数" },
        { value: "val7", label: "事项目录发布数" },
        { value: "val8", label: "事项目录主项发布数" },
        { value: "val9", label: "实施清单总数" },
        { value: "val10", label: "实施清单发布总数" },
        { value: "val11", label: "需生成实施清单总数" },
        { value: "val12", label: "拆分办理项总数" },
      ],
    };
  },
};
</script>