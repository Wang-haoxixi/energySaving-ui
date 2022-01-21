<template>
  <div class="grid-container">
    <div class="summary-wrapper">
      <summary-wrapper></summary-wrapper>
    </div>
    <div class="cycle-wrapper">
      <photo-show></photo-show>
    </div>
    <div class="fenbu-wrapper">
      <pie-chart></pie-chart>
    </div>
    <div class="daily-wrapper">
      <line-chart></line-chart>
    </div>
    <div class="weekly-wrapper">
      <tag-group></tag-group>
    </div>
    <div class="chart-wrapper">
      <waterfall-chart></waterfall-chart>
    </div>
  </div>
</template>
<script>
import SummaryWrapper from "./summary-wrapper";
import WaterfallChart from "./waterfall-chart";
import PhotoShow from "./photo-show";
import PieChart from "./pie-chart";
import LineChart from "./line-chart";
import TagGroup from "./tag-group";
export default {
  components: {
    SummaryWrapper,
    WaterfallChart,
    PhotoShow,
    PieChart,
    LineChart,
    TagGroup,
  },
};
</script>
<style lang="scss" scoped>
[class$="-wrapper"] {
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: $--small-border-radius;
}
[class$="-box"] {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
}

.grid-container {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 140px 400px 400px 500px;
  grid-template-areas:
    "summary-wrapper summary-wrapper"
    "daily-wrapper weekly-wrapper"
    "fenbu-wrapper cycle-wrapper"
    "chart-wrapper chart-wrapper";
}

.summary-wrapper {
  grid-area: summary-wrapper;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.daily-wrapper {
  grid-area: daily-wrapper;
  border-radius: 10px;
}

.weekly-wrapper {
  grid-area: weekly-wrapper;
  border-radius: 10px;
}

.fenbu-wrapper {
  grid-area: fenbu-wrapper;
  border-radius: 10px;
}

.cycle-wrapper {
  grid-area: cycle-wrapper;
  border-radius: 10px;
}

.chart-wrapper {
  grid-area: chart-wrapper;
  border-radius: 10px;
}
</style>
