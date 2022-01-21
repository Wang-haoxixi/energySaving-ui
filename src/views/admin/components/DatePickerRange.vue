<template>
  <el-collapse-item title="日期时间范围选择器" name="10">
    <div class="component-box">
      <pre>{{startTime}}-{{endTime}}</pre>
      <iep-date-picker-range :startTime.sync="startTime" :endTime.sync="endTime"></iep-date-picker-range>
      <!-- <iep-date-picker-range v-model="value"></iep-date-picker-range> -->
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      value: [],
    };
  },
};
</script>