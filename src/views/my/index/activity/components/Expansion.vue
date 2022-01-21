<template>
  <div class="option-box">
    <!-- <el-button type="text" @click="showDetail">报名信息</el-button> -->
    <div class="btn-unfold" @click="toExpand">
      {{ticketShow ? '收起' : '展开'}}
      <i
        class="el-icon-arrow-down fold-icon"
        :class="{'unfold': ticketShow}"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ticketShow: false,
    };
  },
  watch: {
    data: {
      handler() {
        this.ticketShow = false;
      },
      deep: true,
    },
  },
  methods: {
    // showDetail() {
    //   this.$emit("show-detail", this.data.enroleId);
    // },
    toExpand() {
      this.ticketShow = !this.ticketShow;
      this.$emit("to-expand", this.data, this.ticketShow);
    },
  },
};
</script>
<style lang="scss" scoped>
.option-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn-unfold {
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.5s;
    &:hover {
      opacity: 0.7;
    }
    .fold-icon {
      transition: transform 0.5s;
      &.unfold {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>