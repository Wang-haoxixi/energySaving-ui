<template>
  <!-- 事项认领统计 -->
  <div>
    <iep-basic-container>
      <IepPageHeader title="事项认领统计"></IepPageHeader>
      <el-radio-group v-model="type">
        <el-radio-button label="1">按行政区划</el-radio-button>
        <el-radio-button label="2">按实施主体</el-radio-button>
      </el-radio-group>
      <TableStatistics v-show="type === '1'" :data="mockdata1" />
      <TableStatistics v-show="type === '2'" :data="mockdata2" />
    </iep-basic-container>
  </div>
</template>
<script>
import TableStatistics from "./tableStatistics";
import { mockdata1, mockdata2 } from "./const/mock";
export default {
  components: {
    TableStatistics,
  },
  data() {
    return {
      mockdata1,
      mockdata2,
      type: "1",
    };
  },
};
</script>