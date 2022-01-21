<template>
  <el-card
    class="item-con"
    shadow="hover"
    @click.native="$openPage(`/channel/course/detail/${item.id}`)"
  >
    <iep-img class="img" :src="item.cover"></iep-img>
    <div class="txt">
      <div class="title iep-ellipsis-2-flex" :title="item.courseName">{{item.courseName}}</div>
      <div class="opt">
        <div class="cost">
          <template v-if="item.chargeStatus==='1'">
            <span>免费</span>
          </template>
          <template v-else>
            <span class="m-r">{{item.discountCash}}元</span>
            <span class="line-through">{{item.discountPrice}}贝</span>
          </template>
        </div>
        <span class="num">{{item.studyNumber}}人学习</span>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: ["item"],
};
</script>
<style lang="scss" scoped>
.item-con {
  width: 285px;
  height: 280px;
  background: #fff;
  border: 1px solid #eff0f1;
  border-radius: 10px;
  cursor: pointer;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .img {
    width: 100%;
    height: 170px;
    border-radius: 10px 10px 0 0;
  }
  .txt {
    padding: 10px 15px 15px;
    background-color: #fff;
    border-top: 1px solid $--border-color;
    transition: transform 0.5s ease;
    .title {
      margin-bottom: 10px;
      height: 52px;
      font-size: 14px;
      font-weight: 400;
      color: #303031;
      line-height: 26px;
      text-align: justify;
    }
  }
  &:hover .txt {
    transform: translateY(-30px);
  }
  .opt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #919397;
    .cost {
      color: #919397;
      line-height: 24px;
      span {
        &:nth-of-type(1) {
          font-size: 16px;
          color: #f74437;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          color: #919397;
        }
      }
      .m-r {
        margin-right: 8px;
      }
      // .line-through {
      //   text-decoration: line-through;
      // }
    }
    .num {
      line-height: 24px;
    }
  }
}
</style>
