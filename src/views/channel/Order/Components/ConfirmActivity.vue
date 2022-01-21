<template>
  <div class="order-background">
    <template v-if="hasInfo">
      <div class="order-container" v-loading="loading">
        <Header title="请核对订单信息" isFakeBack @fakeBack="fakeBack"></Header>
        <div class="order-content">
          <div class="order-info">
            <div class="info-title">联系方式</div>
            <div class="contact">
              <ConcactCard
                v-for="(item,index) of activityOrderDTO.infoFormConfigList"
                :key="'card'+index+Math.random()"
                :value="item"
                :index="index"
                :contactList="activityOrderDTO.infoFormConfigList"
                @delConcact="delConcact"
                @updateValue="updateValue"
              ></ConcactCard>
            </div>
          </div>
          <div class="order-info">
            <div class="info-title">交易信息</div>
            <iep-table
              :is-pagination="false"
              :isLoadTable="false"
              :columnsMap="columnsMap"
              :pagedTable="newOrderData"
              :dictsMap="dictsMaps"
              style="margin-top: 15px;"
            >
              <template #detail="{scope}">
                <ActivityInfoColumn :scope="scope"></ActivityInfoColumn>
              </template>
              <template #count="{scope}">
                <div>{{scope.row.amount}} 张</div>
              </template>
              <!-- 单价 -->
              <template #total="{scope}">
                <div v-if="scope.row.ticketingType==='2'">
                  <div v-if="scope.row.canMoney">{{scope.row.canMoney}} 贝</div>
                  <div v-if="scope.row.money">{{scope.row.money}} 元</div>
                </div>
                <div v-else>免费</div>
              </template>
              <!-- 折扣后的总价 -->
              <template #rate="{scope}">
                <div v-if="scope.row.ticketingType==='2'">
                  <div v-if="scope.row.canMoney">{{scope.row.totalCanMoney||0}} 贝</div>
                  <div v-if="scope.row.money">{{scope.row.totalMoney||0}} 元</div>
                </div>
                <div v-else>
                  <div>0贝</div>
                  <div>0元</div>
                </div>
              </template>
            </iep-table>
          </div>
        </div>
      </div>
      <div class="submit-container">
        <el-button type="primary" class="iep-btn" size="medium" @click="handleSubmit()">提交确认</el-button>
      </div>
    </template>
    <div class="order-container" v-show="!hasInfo">
      <Header title="请输入报名信息"></Header>
      <ConcactForm ref="concactForm" :form="activityOrderDTO">
        <div class="submit-container" slot="footer">
          <el-button type="primary" class="iep-btn" size="medium" @click="handleSave">保存</el-button>
        </div>
      </ConcactForm>
    </div>
  </div>
</template>
<script>
// 核对活动订单信息
import Header from "./Header";
import ActivityInfoColumn from "@/views/meetting/Components/ActivityInfoColumnV2";
import ConcactForm from "@/views/channel/Activity/Components/ConcactForm.vue";
import ConcactCard from "@/views/channel/Activity/Components/ConcactCard.vue";
import { columnsMap, dictsMaps } from "@/views/channel/Activity/options";
// import { checkPhone, checkEmail } from "@/util/rules";
import { decodeOrderId } from "@/util/util";
import { ActivityOrderInfo, ActivityOrderDTO } from "@/types/order";
import { getConfirmOrder } from "@/api/meetting/publish";
// import { createEnrollForm } from "@/api/meetting/enroll";
import { createEnrollFormALL } from "@/api/meetting/form";
class GenerateOrderDTO {
  constructor({ orderNumber, orderType }) {
    this.orderNumber = orderNumber;
    this.orderType = orderType;
  }
  isToPay() {
    return this.orderType === 2; // 1 免费票   2 付费票
  }
}
export default {
  name: "CheckOrder",
  components: {
    Header,
    ActivityInfoColumn,
    ConcactForm,
    ConcactCard,
  },
  data() {
    return {
      hasInfo: false,
      columnsMap,
      dictsMaps,
      paymentMethod: 0,
      orderData: new ActivityOrderInfo(),
      activityOrderDTO: new ActivityOrderDTO(),
      loading: false,
    };
  },
  computed: {
    newOrderData() {
      const newData = [this.orderData];
      return newData;
    },
    id() {
      return decodeOrderId(this.$route.params.id);
    },
    createOrder() {
      const funcMap = {
        2: createEnrollFormALL,
      };
      return funcMap[this.orderData.type];
    },
  },
  methods: {
    async loadPage() {
      this.loading = true;
      const { amount, ticketingId } = this.id;
      const { data } = await getConfirmOrder({
        amount,
        ticketingId,
      });
      if (data) {
        this.orderData = this.$mergeByFirst(new ActivityOrderInfo(), {
          ...this.id,
          ...this.activityOrderDTO,
          ...data,
        });
      }
      this.loading = false;
    },
    async handleSubmit() {
      const { data } = await this.createOrder(this.activityOrderDTO);
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
    handleSave() {
      const { code, message } = this.$refs["concactForm"]._validate();
      if (!code) {
        this.hasInfo = true;
      } else {
        this.$message.warning(message || "信息填写有误");
      }
    },
    fakeBack() {
      this.hasInfo = false;
    },
    delConcact(index = -1) {
      if (index === -1) return;
      if (this.activityOrderDTO.infoFormConfigList.length > 1) {
        this.activityOrderDTO.infoFormConfigList.splice(index, 1);
      } else {
        this.$message.warning("至少保留一个联系人");
      }
    },
    updateValue({ form, index }) {
      if (form && form.length) {
        this.activityOrderDTO.infoFormConfigList.splice(index, 1, form);
        this.$message.success("修改信息成功");
      }
    },
  },
  created() {
    if (this.id) {
      this.activityOrderDTO = this.$mergeByFirst(
        new ActivityOrderDTO(),
        this.id,
      );
      this.activityOrderDTO.orderNum = this.activityOrderDTO.amount;
      this.loadPage();
    } else {
      this.$message({ type: "warning", message: "订单信息有误，请重新报名" });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.order-content {
  .order-info {
    margin-top: 35px;
    .info-title {
      margin-bottom: 25px;
      font-size: 16px;
    }
    ::v-deep .el-table th > .cell {
      padding: 0 20px;
      color: #666769;
    }
    ::v-deep .el-table .cell {
      padding: 0 20px;
    }
    .contact {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
.tip-box {
  margin: 30px;
  .tip {
    font-size: 14px;
    color: #666769;
    i {
      margin-right: 5px;
    }
  }
  .btn-group {
    margin-top: 20px;
    font-size: 14px;
    .iep-btn-l {
      padding: 0 16px;
      &.active {
        color: #de3d32;
        border-color: #de3d32;
        outline: none;
      }
    }
  }
}
.order-info-pay {
  margin-top: 50px;
  text-align: center;
}
</style>
