<template>
  <el-collapse-item title="海报图库" name="12">
    <div class="component-box">
      <pre>{{url}}</pre>
      <iep-gallery v-model="url"></iep-gallery>
      <!-- <iep-date-picker-range v-model="value"></iep-date-picker-range> -->
    </div>
  </el-collapse-item>
</template>
<script>
export default {
  data() {
    return {
      url: "",
    };
  },
};
</script>