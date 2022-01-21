<template>
  <el-collapse-item title="日期选择器" name="8">
    <div class="component-box">
      <pre>{{dateRange}}</pre>
      <IepDatePickerWithNow :type="type" v-model="dateRange"></IepDatePickerWithNow>
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      dateRange: {
        startDate: "",
        startDateStr: "",
        endDate: "",
        endDateStr: "",
      },
      type: "month",
    };
  },
};
</script>
