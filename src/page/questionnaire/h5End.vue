<template>
  <div class="end-wrapper">
    <div class="end-top" v-if="successArr.includes(endMessage.status)">
      <i class="el-icon-woneng-chenggong2shixin success"></i>
      <span>提交成功{{successMoreArr.includes(endMessage.status)&&"，感谢作答。"||""}}</span>
    </div>
    <div class="end-top" v-else-if="errorArr.includes(endMessage.status)">
      <i class="el-icon-woneng-guanbihuozheshibaishixin error"></i>
      <span>提交失败</span>
    </div>
    <div>{{endMessage.content}}</div>
    <div class="tips" v-if="successArr.includes(endMessage.status)">返回列表，刷新查看结果</div>
  </div>
</template>
<script>
const errorArr = [4, 5, 6];
const successArr = [1, 2, 3];
const successMoreArr = [1, 2];
export default {
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
    endMessage: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isTourist: true,
      errorArr,
      successArr,
      successMoreArr,
    };
  },
};
</script>
<style lang="scss" scoped>
.end-wrapper,
.end-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.end-wrapper {
  height: calc(100vh - 250px);
  justify-content: center;
  .end-top {
    i {
      margin-bottom: 15px;
      font-size: 75px;
      &.success {
        color: $--color-third;
      }
      &.error {
        color: $--color-text-regular;
      }
    }
  }
  .tips {
    margin-top: 30px;
  }
}
</style>
