<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <div class="order-detail">
        <div class="info-box">
          <h3>基本信息</h3>
          <div class="info-grid-box">
            <div class="info">
              <span class="label">订单号：</span>
              <span class="value">{{form.orderNumber}}</span>
            </div>
            <div class="info">
              <span class="label">订单状态：</span>
              <span class="value">{{dictsMap.status[form.status]}}</span>
            </div>
            <div class="info">
              <span class="label">订单金额：</span>
              <span class="value">{{price}}</span>
            </div>
            <div class="info">
              <span class="label">订单创建时间：</span>
              <span class="value">{{form.createTime}}</span>
            </div>
            <div class="info">
              <span class="label">订单完成时间：</span>
              <span class="value">{{form.finishTime | showText}}</span>
            </div>
          </div>
        </div>
        <div class="info-box">
          <h3>用户信息</h3>
          <div class="info-grid-box">
            <div class="info">
              <span class="label">用户账户：</span>
              <span class="value">{{form.createBy}}</span>
            </div>
            <div class="info">
              <span class="label">收货人：</span>
              <span class="value">{{form.consignee}}</span>
            </div>
            <div class="info">
              <span class="label">联系方式：</span>
              <span class="value">{{form.contact}}</span>
            </div>
            <div class="info">
              <span class="label">邮箱：</span>
              <span class="value">{{form.mail}}</span>
            </div>
            <div class="info">
              <span class="label">邮编：</span>
              <span class="value">{{form.zipCode}}</span>
            </div>
            <div class="info">
              <span class="label">地址：</span>
              <span class="value">{{form.address}}</span>
            </div>
          </div>
        </div>
        <div class="info-box">
          <h3>订单信息</h3>
          <iep-table
            :size="tableSize"
            :isLoadTable="false"
            :columnsMap="columnsMap"
            :pagedTable="pagedTable"
            :is-pagination="false"
          >
            <template #goods="{scope}">
              <iep-table-link-img-desc
                :img="scope.row.goodsImg"
                :name="scope.row.goods"
                @m-click="handleDetail(scope.row.goodsId)"
              ></iep-table-link-img-desc>
            </template>
            <template #secondType="{scope}">
              <div>{{ calculateDict(scope)}}</div>
            </template>
            <template #price="{scope}">{{scope.row.priceAmount}}贝/{{scope.row.cashAmount}}元</template>
            <template
              #priceToDiscount="{scope}"
            >{{scope.row.deductiblePrice}}贝/{{scope.row.deductibleCash}}元</template>
            <template #discount="{scope}">{{scope.row.discountPrice}}贝/{{scope.row.discountCash}}元</template>
          </iep-table>
        </div>
        <div class="info-box">
          <h3>支付信息</h3>
          <div class="info-grid-box">
            <div class="info">
              <span class="label">支付方式：</span>
              <span class="value">{{dictsMap.paymentMethod[form.paymentMethod]}}</span>
            </div>
            <div class="info">
              <span class="label">流水单号：</span>
              <span class="value">{{form.paymentNumber | showText}}</span>
            </div>
            <div class="info">
              <span class="label">支付时间：</span>
              <span class="value">{{form.finishTime | parseToTimeSeconds | showText}}</span>
            </div>
            <div class="info">
              <span class="label">支付状态：</span>
              <span class="value">{{dictsMap.payStatus[form.payStatus]}}</span>
            </div>
          </div>
        </div>
        <div class="info-box">
          <h3>操作日志</h3>
          <iep-table
            :size="tableSize"
            :isLoadTable="false"
            :columnsMap="logColumnMap"
            :pagedTable="form.logs"
            :is-pagination="false"
          ></iep-table>
        </div>
        <div class="info-box">
          <h3>备注</h3>
          <div
            class="info-remark"
          >{{form[currentMenuGroup.id===1?'soRemarks':'remarks'] | showText}}</div>
          <el-button type="primary" @click="handleRemark()">添加备注</el-button>
        </div>
      </div>
    </iep-basic-container>
    <RemarkDialogForm ref="RemarkDialogForm" @load-page="loadPage()"></RemarkDialogForm>
  </div>
</template>
<script>
import { dictsMap, typeMap, OrderDetailDTO, calculateDict } from "./options";
import { getOrderByIdByType } from "@/api/fms/order";
import { mapGetters } from "vuex";
import RemarkDialogForm from "./RemarkDialogForm";
import { _templateDiscount } from "@/views/my/index/order/options";
export default {
  components: {
    RemarkDialogForm,
  },
  data() {
    return {
      calculateDict,
      backOption: {
        isBack: true,
      },
      dictsMap,
      form: new OrderDetailDTO(),
      columnsMap: [
        {
          prop: "goods",
          label: "商品名称",
          minWidth: 200,
          type: "slot",
        },
        {
          // 根据不同的商品
          prop: "secondType",
          label: "类型",
          type: "slot",
        },
        {
          prop: "goodsAmount",
          label: "数量",
        },
        {
          prop: "price",
          label: "原价",
          type: "slot",
        },
        {
          prop: "priceToDiscount",
          label: "合伙人优惠",
          type: "slot",
        },
        {
          prop: "discount",
          label: "实付金额 ",
          type: "slot",
        },
      ],
      logColumnMap: [
        {
          prop: "description",
          label: "操作类型",
        },
        {
          prop: "createUser",
          label: "操作人",
        },
        {
          prop: "createTime",
          label: "操作时间",
        },
      ],
      logList: [],
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup", "tableSize"]),
    orderId() {
      return this.$route.params.id;
    },
    price() {
      return _templateDiscount(this.form);
    },
    getOrderById() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return getOrderByIdByType(suffer);
    },
    pagedTable() {
      return [
        {
          orderType: this.form.orderType,
          goods: this.form.goods,
          goodsId: this.form.goodsId,
          goodsImg: this.form.goodsImg,
          secondType: this.form.secondType,
          goodsAmount: this.form.goodsAmount,
          discountCash: this.form.discountCash,
          discountPrice: this.form.discountPrice,
          priceAmount: this.form.priceAmount,
          cashAmount: this.form.cashAmount,
          deductiblePrice: this.form.deductiblePrice,
          deductibleCash: this.form.deductibleCash,
        },
      ];
    },
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleDetail(id) {
      console.log(id);
      if (this.form.orderType === "1") {
        // 是魔方产品
        this.$openPage(`/channel/mo_fang/detail/${id}`);
      }
    },
    handleRemark() {
      this.$refs["RemarkDialogForm"].orderNumber = this.form.orderNumber;
      this.$refs["RemarkDialogForm"].form.remarks = this.form.remarks;
      this.$refs["RemarkDialogForm"].dialogShow = true;
    },
    async loadPage() {
      const { data } = await this.getOrderById(this.orderId);
      this.form = this.$mergeByFirst(new OrderDetailDTO(), data);
    },
  },
};
</script>
<style lang="scss" scoped>
.order-detail {
  padding: 0 10px;
  h3 {
    font-family: "微软雅黑";
    color: $--color-text-primary;
    font-size: 16px;
  }
  .info-box {
    margin-bottom: 40px;
    .info-remark {
      color: $--color-text-regular;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  .info-grid-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    color: $--color-text-regular;
    font-size: 14px;
  }
}
</style>
