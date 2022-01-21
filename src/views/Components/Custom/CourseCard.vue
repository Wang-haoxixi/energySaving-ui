<template>
  <el-card
    :class="small?'course-card-small':'course-card'"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <div @click="$openPage(`/channel/course/detail/${course.id}`)">
      <iep-img :resizeOpt="(small?{l:248}:{l:285})" :src="course.cover" class="image" />
      <div class="content-box">
        <div class="main">
          <div class="title" :title="course.name">{{course.courseName}}</div>
          <div class="bottom">
            <template v-if="course.chargeStatus==='1'">
              <span class="time">免费</span>
            </template>
            <template v-else>
              <span class="time">{{course.discountPrice}}贝</span>
            </template>
            <span class="address iep-ellipsis" :class="{small}">{{course.studyNumber}} 人学习</span>
          </div>
        </div>
        <div class="more" v-if="course.ticketingManagements&&course.ticketingManagements[0]">
          <span class="iep-ellipsis-flex" :title="`限额${totalNum}人`">限额{{totalNum}}人</span>
          <span v-if="amount" class="money iep-ellipsis-flex" :title="amount">{{amount}}</span>
          <span v-else>免费</span>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
// 课程卡片-用于课程大厅-课程列表等
import { unitMap } from "@/views/meetting/options";

export default {
  name: "IepCourseCard",
  props: {
    course: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    amount() {
      const { money, canMoney } = this.course.ticketingManagements[0];
      const arr = [];
      canMoney &&
        arr.push({
          amount: canMoney,
          type: "WeCanPay",
        });
      money &&
        arr.push({
          amount: money,
          type: "OfflinePay",
        });
      return arr
        .map((m) => {
          return `${m.amount}${unitMap[m.type]}`;
        })
        .join("/");
    },
    totalNum() {
      return this.course.ticketingManagements.reduce((a, b) => a + b.number, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
$--card-width: 285px;
$--card-height: 263px;
$--card-width-samll: 248px;
$--card-height-samll: 238px;
.course-card {
  width: $--card-width;
  height: $--card-height;
}
.course-card,
.course-card-small {
  overflow: hidden;
  cursor: pointer;
  .image {
    width: $--card-width;
    height: 170px;
    display: block;
  }
  .content-box {
    box-sizing: border-box;
    padding: 13px;
    width: $--card-width;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 126px;
    background: #ffffff;
    transition: transform 0.5s ease;

    .main {
      height: 77px;
    }
    .title {
      height: 42px;
      font-size: 14px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .bottom {
      margin-top: 5px;
      font-size: 12px;
      color: $--color-text-secondary;
      height: 22px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .address {
        margin-left: 20px;
        width: 170px;
      }
      .small {
        width: 130px;
      }
    }
    .more {
      font-size: 12px;
      color: $--color-text-secondary;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money {
        font-size: 14px;
        color: $--color-primary;
      }
    }
  }
}
.course-card-small {
  width: $--card-width-samll;
  height: $--card-height-samll;
  .image {
    width: $--card-width-samll;
    height: 150px;
    display: block;
  }
  .content-box {
    padding: 12px;
    width: $--card-width-samll;
    height: 120px;
    .main {
      height: 64px;
    }
    .title {
      height: 40px;
    }
    .bottom {
      margin-top: 4px;
      height: 20px;
    }
  }
}
.course-card-small:hover .content-box,
.course-card:hover .content-box {
  transform: translateY(-30px);
}
</style>
