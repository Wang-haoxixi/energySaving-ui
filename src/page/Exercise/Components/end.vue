<template>
  <div class="end-wrap">
    <!-- 答卷成功 -->
    <div class="tip-wrap success">
      <i class="el-icon-woneng-chenggong2shixin"></i>
      <span>{{data.msg}}</span>
    </div>
    <div class="btn-group">
      <el-button v-if="history" type="default" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    history() {
      return history.length;
    },
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.end-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.tip-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    margin-bottom: 15px;
    font-size: 75px;
  }
  &.success {
    i {
      color: $--color-third;
    }
    & > span {
      margin-bottom: 10px;
      &:nth-of-type(1) {
        color: $--color-text-primary;
        font-size: 26px;
      }
      &:nth-of-type(2) {
        color: $--color-text-secondary;
        font-size: 14px;
      }
    }
  }
  &.score {
    i {
      color: $--color-input-regular;
    }
    & > span {
      margin-bottom: 10px;
      &:nth-of-type(1) {
        font-size: 14px;
        color: $--color-text-secondary;
        & > span {
          font-size: 20px;
          color: $--color-primary;
          &.pass {
            color: $--color-third;
          }
        }
      }
      &:nth-of-type(2) {
        color: $--color-text-regular;
        font-size: 16px;
      }
    }
  }
}
.btn-group {
  margin: 80px 0 100px;
  .el-button {
    margin-left: 10px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
