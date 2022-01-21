<template>
  <div class="grid-container">
    <div class="general-wrapper">
      <general-wrapper></general-wrapper>
    </div>
    <div class="quick-wrapper">
      <quick-wrapper></quick-wrapper>
    </div>
    <div class="pending-wrapper">
      <pending-wrapper></pending-wrapper>
    </div>
    <div class="yesterday-wrapper">
      <yesterday-wrapper></yesterday-wrapper>
    </div>
    <div class="total-wrapper">
      <total-wrapper></total-wrapper>
    </div>
    <div class="access-wrapper">
      <access-wrapper></access-wrapper>
    </div>
    <div class="share-wrapper">
      <share-wrapper></share-wrapper>
    </div>
  </div>
</template>
<script>
import GeneralWrapper from "./GeneralWrapper";
import QuickWrapper from "./QuickWrapper";
import PendingWrapper from "./PendingWrapper";
import YesterdayWrapper from "./YesterdayWrapper";
import TotalWrapper from "./TotalWrapper";
import AccessWrapper from "./AccessWrapper";
import ShareWrapper from "./ShareWrapper";
export default {
  components: {
    QuickWrapper,
    GeneralWrapper,
    PendingWrapper,
    YesterdayWrapper,
    TotalWrapper,
    AccessWrapper,
    ShareWrapper,
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  overflow: hidden;
  gap: 20px;
  grid-template-columns: minmax(500px, calc((100vw - 265px) / 2)) minmax(
      500px,
      calc((100vw - 265px) / 2)
    );
  grid-template-rows: 280px 325px 305px 500px;
  grid-template-areas: "general-wrapper quick-wrapper" "pending-wrapper pending-wrapper" "yesterday-wrapper total-wrapper" "access-wrapper share-wrapper";
  & > div {
    background: none;
    border: 1px solid $--border-color;
    border-radius: 10px;
    overflow: hidden;
  }
}
.general-wrapper {
  grid-area: general-wrapper;
}
.quick-wrapper {
  grid-area: quick-wrapper;
}
.pending-wrapper {
  grid-area: pending-wrapper;
}
.yesterday-wrapper {
  grid-area: yesterday-wrapper;
}
.total-wrapper {
  grid-area: total-wrapper;
}
.access-wrapper {
  grid-area: access-wrapper;
}
.share-wrapper {
  grid-area: share-wrapper;
}
</style>