<template>
  <div class="header-box">
    <iep-img class="img-box" :src="form.cover"></iep-img>
    <div class="info-box">
      <div class="title">{{form.courseName}}</div>
      <div class="tag-list iep-ellipsis-flex">
        <span class="tag" v-for="item in tag" :key="item">{{item}}</span>
      </div>
      <div class="text-box">
        <template v-if="form.credit">
          <span>学分：{{form.credit}}分</span>
          <el-divider direction="vertical"></el-divider>
        </template>
        <span>难度：{{getDictGroupLevel()[form.level]}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>课时：{{form.classCount}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>学习人数：{{form.studyNumber}}</span>
      </div>
      <div class="charge-status">
        <div class="free" v-if="form.chargeStatus==='1'">免费</div>
        <div class="charge" v-else>
          <i :class="`el-icon-woneng-v${form.rank}`"></i>
          <div class="coin1">
            特权价：
            <span class="num">{{ form.discountPrice }} 贝/</span>
            <span class="num">{{ form.discountCash }} 元</span>
          </div>
          <div class="coin">
            <del>
              <span>{{ form.priceAmount }} 贝/</span>
            </del>
            <del>
              <span>{{ form.cashAmount }} 元</span>
            </del>
          </div>
        </div>
      </div>
      <div class="opt-box">
        <template v-if="form.situationId===0">
          <el-button
            v-if="form.chargeStatus==='1'"
            type="primary"
            size="medium"
            class="iep-btn-l2"
            @click="handleOrder()"
          >报名学习</el-button>
          <el-button
            class="iep-btn-l2"
            v-else
            type="primary"
            size="medium"
            @click="handleOrder()"
          >购买课程</el-button>
        </template>
        <template v-else>
          <div>已报名</div>
        </template>
        <IepCollectionBtn
          class="collection-btn"
          :collect="form.collect"
          :name="form.courseName"
          :id="form.id"
          :type="9"
          @update-data="updateData()"
        ></IepCollectionBtn>
      </div>
    </div>
  </div>
</template>
<script>
import { getDictGroupLevel } from "../options";
export default {
  props: ["form", "tag"],
  data() {
    return {};
  },
  methods: {
    getDictGroupLevel,
    updateData() {
      this.$emit("update-data");
    },
    handleOrder() {
      this.$generateOrderPage({
        type: 3,
        source: "1",
        id: this.form.id,
        courseName: this.form.courseName,
        cover: this.form.cover,
        chargeStatus: this.form.chargeStatus,
        priceAmount: this.form.priceAmount,
        cashAmount: this.form.cashAmount,
        discountPrice: this.form.discountPrice,
        discountCash: this.form.discountCash,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header-box {
  display: flex;
  .opt-box {
    display: flex;
    .collection-btn {
      margin-left: 20px;
      align-self: center;
    }
  }
  .img-box {
    flex: 0 0 450px;
    width: 450px;
    height: 270px;
    border: 1px solid $--border-color;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 20px;
    .title {
      margin: 5px 0;
      color: $--color-text-primary;
      font-size: 24px;
    }
    .tag-list {
      margin: 10px 0;
      .tag {
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        height: 20px;
        font-size: 12px;
        line-height: 12px;
        border-radius: 5px;
        background-color: #f4f5f6;
        color: $--color-text-secondary;
        box-sizing: border-box;
      }
    }
    .text-box {
      margin: 5px 0 10px;
      font-size: 14px;
    }
  }
  .charge-status {
    margin: 20px 0 30px;
    .free {
      color: #3cd489;
      font-size: 18px;
    }
    .charge {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        color: #f74437;
      }
      .coin,
      .coin1 {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: $--color-text-secondary;
        strong {
          font-size: 16px;
          font-weight: 400;
        }
        .num {
          margin-right: 3px;
          font-size: 16px;
          color: $--color-primary;
        }
      }
      .coin1 {
        margin: 0 10px;
      }
      .serve {
        margin-top: 15px;
      }
    }
  }
}
</style>
