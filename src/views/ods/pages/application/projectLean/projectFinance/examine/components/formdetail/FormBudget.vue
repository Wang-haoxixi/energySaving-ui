<template>
  <div>
    <el-row class="el_row">
      <el-col :span="18" :offset="3" class="el_col">
        <div style="width: 10%; margin-right: 24px;">
          <span class="green plan_title">项目总投资</span>
        </div>
        <div style="width: 72%;">
          <div style="margin-bottom: 4px;">
            信息化建设专项(政府投资类)
            <span style="float: right;">100%</span>
          </div>
          <el-progress :percentage="90" color="rgb(35, 198, 200)" :show-text="false"></el-progress>
        </div>
        <div style="margin-left: 24px;">
          <span class="green plan_title">110万</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="el_row">
      <el-col :span="18" :offset="3" class="el_col">
        <div style="width: 10%; margin-right: 24px; ">
          <span class="orange plan_title">2011</span>
        </div>
        <div style="width: 72%;">
          <div style="margin-bottom: 4px;">
            当年预算安排（按110万元立项，剩余100万元在下一年及以后年度安排）
            <span style="float: right;">9.09%</span>
          </div>
          <el-progress :percentage="9.09" color="rgb(248, 172, 89)" :show-text="false"></el-progress>
        </div>
        <div style="margin-left: 24px;">
          <span class="orange plan_title">10万</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    temp: {
      type: Object,
      default: () => {},
    },
    state: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      formData: this.temp,
    };
  },
};
</script>

<style lang="" scoped>
</style>
