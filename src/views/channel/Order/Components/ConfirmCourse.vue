<template>
  <div class="order-background">
    <div class="order-container">
      <h2>订单信息</h2>
      <div class="good-info-box">
        <iep-table
          :isLoadTable="false"
          :is-pagination="false"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="false"
        >
          <template #courseName="{scope}">
            <iep-table-link-img-desc
              :img="scope.row.cover"
              :name="scope.row.courseName"
              @m-click="handleMClick"
            ></iep-table-link-img-desc>
          </template>
          <!-- 原价 -->
          <template #price="{scope}">{{_templatePrice(scope.row)}}</template>
          <!-- 打折 -->
          <template #discount="{scope}">{{_templateDiscount(scope.row)}}</template>
        </iep-table>
      </div>
    </div>
    <div class="submit-container">
      <el-button type="primary" class="iep-btn" size="medium" @click="handleSubmit()">提交确认</el-button>
    </div>
  </div>
</template>
<script>
import { decodeOrderId } from "@/util/util";
import { CourseOrderInfo, CourseOrderDTO } from "@/types/order";
import { createCourseOrder } from "@/api/qms/course_study_situation";

class GenerateOrderDTO {
  constructor({ orderNumber, isFree }) {
    this.orderNumber = orderNumber;
    this.isFree = isFree;
  }
  isToPay() {
    return this.isFree === "0";
  }
}
export default {
  data() {
    return {
      orderInfo: new CourseOrderInfo(),
      columnsMap: [
        {
          label: "课程名称",
          prop: "courseName",
          minWidth: 300,
          type: "slot",
        },
        {
          label: "原价",
          prop: "price",
          type: "slot",
        },
        {
          label: "实际支付",
          prop: "discount",
          type: "slot",
        },
      ],
    };
  },
  computed: {
    createOrder() {
      const funcMap = {
        3: createCourseOrder,
      };
      return funcMap[this.orderInfo.type];
    },
    pagedTable() {
      return [this.orderInfo];
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.orderInfo = this.$mergeByFirst(
        new CourseOrderInfo(),
        decodeOrderId(this.$route.params.id),
      );
    }
  },
  methods: {
    _templatePrice(row) {
      if (row.chargeStatus === "1") {
        return "免费";
      } else {
        return `${row.priceAmount}贝/${row.cashAmount}元`;
      }
    },
    _templateDiscount(row) {
      if (row.chargeStatus === "1") {
        return "免费";
      } else {
        return `${row.discountPrice}贝/${row.discountCash}元`;
      }
    },
    async handleSubmit() {
      const form = this.$mergeByFirst(new CourseOrderDTO(), {
        ...this.orderInfo,
        source: "1",
      });
      const { data } = await this.createOrder(form);
      if (data) {
        const result = new GenerateOrderDTO(data);
        // 不是免费去支付
        if (result.isToPay()) {
          this.$router.replace({
            path: `/channel/order/${result.orderNumber}/pay`,
          });
          // this.$openPage(`/channel/order/${result.orderNumber}/pay`);
        }
        // 免费直接到结果页面
        else {
          this.$router.replace({
            path: `/channel/order/${result.orderNumber}/result`,
          });
          // this.$openPage(`/channel/order/${result.orderNumber}/result`);
        }
      }
    },
    handleMClick() {
      this.$openPage(`/channel/course/detail/${this.orderInfo.id}`, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.good-info-box {
  margin-top: 10px;
}
</style>
