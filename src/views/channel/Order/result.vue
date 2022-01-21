<template>
  <div class="order-background" v-loading="loading">
    <ResultProduct v-if="form.type==='1'" :form="form"></ResultProduct>
    <ResultActivity v-else-if="form.type==='2'"></ResultActivity>
    <ResultCourse v-else-if="form.type==='3'" :form="form"></ResultCourse>
    <iep-no-data style="height:70vh" v-else complex></iep-no-data>
  </div>
</template>
<script>
import ResultProduct from "./Components/ResultProduct";
import ResultActivity from "./Components/ResultActivity";
import ResultCourse from "./Components/ResultCourse";
import { getResultOrderDetail } from "@/api/fms/order";
class ResultOrderDTO {
  consignee = "";
  contact = "";
  createTime = "";
  discountCash = 0;
  discountPrice = 0;
  mail = "";
  zipCode = "";
  address = "";
  orderNumber = "";
  paymentMethod = "";
  status = "";
  type = "";
  id = 0;
}
export default {
  components: {
    ResultProduct,
    ResultActivity,
    ResultCourse,
  },
  data() {
    return {
      form: new ResultOrderDTO(),
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.loading = true;
      const { data } = await getResultOrderDetail(this.$route.params.id);
      this.form = this.$mergeByFirst(new ResultOrderDTO(), data);
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.tip-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  i {
    margin-bottom: 15px;
    font-size: 75px;
    color: #3cd489;
  }
  span {
    font-size: 20px;
    font-family: Microsoft YaHei;
    color: #303031;
  }
}
.result-wrap {
  margin-bottom: 60px;
  padding: 0 140px;
  font-size: 14px;
  color: $--color-text-regular;
  .detail-wrap {
    .result-list {
      display: grid;
      gap: 10px 20px;
      grid-template-columns: auto auto;
      margin: 40px auto;
      width: 700px;
      .result-item {
        span {
          display: inline-block;
          vertical-align: top;
          text-align: right;
          &:nth-child(1) {
            width: 70px;
          }
          &:nth-child(2) {
            max-width: 260px;
            text-align: left;
          }
        }
      }
    }

    .you-can {
      margin: 0 auto;
      width: 700px;
      span {
        display: inline-block;
        text-align: right;
        height: 14px;
        line-height: 14px;
        &:nth-child(1) {
          width: 70px;
        }
        &:nth-child(n + 2) {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>
