<template>
  <div class="grid-container">
    <div class="header-wrapper">
      <header-wrapper></header-wrapper>
    </div>
    <div class="pending-wrapper">
      <pending-wrapper></pending-wrapper>
    </div>
    <div class="quick-wrapper">
      <quick-wrapper></quick-wrapper>
    </div>
    <div class="user-wrapper">
      <user-wrapper></user-wrapper>
    </div>
    <div class="so-wrapper">
      <so-wrapper></so-wrapper>
    </div>
    <div class="order-wrapper">
      <order-wrapper></order-wrapper>
    </div>
    <div class="content-wrapper">
      <content-wrapper></content-wrapper>
    </div>
    <div class="answer-wrapper">
      <AnswerWrapper></AnswerWrapper>
    </div>
    <div class="cooperation-wrapper">
      <cooperation-wrapper></cooperation-wrapper>
    </div>
  </div>
</template>
<script>
import HeaderWrapper from "./HeaderWrapper";
import PendingWrapper from "./PendingWrapper";
import QuickWrapper from "../yy/QuickWrapper";
import SoWrapper from "./SoWrapper";
import UserWrapper from "./UserWrapper";
import OrderWrapper from "./OrderWrapper";
import ContentWrapper from "./ContentWrapper";
import AnswerWrapper from "./AnswerWrapper";
import CooperationWrapper from "./CooperationWrapper";
export default {
  components: {
    HeaderWrapper,
    PendingWrapper,
    QuickWrapper,
    UserWrapper,
    SoWrapper,
    OrderWrapper,
    ContentWrapper,
    AnswerWrapper,
    CooperationWrapper,
  },
};
</script>
<style lang="scss" scoped>
[class$="-wrapper"] {
  background-color: #fff;
  border-radius: 6px;
}
.grid-container {
  display: grid;
  overflow: hidden;
  gap: 20px;
  grid-template-columns: minmax(500px, calc((100vw - 265px) / 2)) minmax(
      500px,
      calc((100vw - 265px) / 2)
    );
  grid-template-rows: 194px 290px 430px 430px 430px;
  grid-template-areas: "header-wrapper header-wrapper" "pending-wrapper quick-wrapper" "user-wrapper so-wrapper" "order-wrapper content-wrapper" "answer-wrapper cooperation-wrapper";
  & > div {
    background: none;
    border: 1px solid $--border-color;
    border-radius: 10px;
  }
}
.header-wrapper {
  grid-area: header-wrapper;
}
.pending-wrapper {
  grid-area: pending-wrapper;
}
.quick-wrapper {
  grid-area: quick-wrapper;
}
.user-wrapper {
  grid-area: user-wrapper;
}
.so-wrapper {
  grid-area: so-wrapper;
}
.content-wrapper {
  grid-area: content-wrapper;
}
.answer-wrapper {
  grid-area: answer-wrapper;
}
.cooperation-wrapper {
  grid-area: cooperation-wrapper;
}
</style>
