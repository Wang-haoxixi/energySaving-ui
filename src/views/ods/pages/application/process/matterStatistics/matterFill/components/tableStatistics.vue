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
        { value: "val2", label: "事项目录" },
        { value: "val3", label: "实施清单" },
        { value: "val4", label: "公共服务" },
        { value: "val5", label: "行政许可" },
        { value: "val6", label: "行政处罚" },
        { value: "val7", label: "行政强制" },
        { value: "val8", label: "行政征收" },
        { value: "val9", label: "行政给付" },
        { value: "val10", label: "行政监察" },
        { value: "val11", label: "行政确认" },
        { value: "val12", label: "行政奖励" },
        { value: "val13", label: "行政裁决" },
        { value: "val14", label: "其他行政权力" },
      ],
    };
  },
};
</script>