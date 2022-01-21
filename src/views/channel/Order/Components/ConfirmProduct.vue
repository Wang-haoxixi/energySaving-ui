<template>
  <div class="order-background">
    <div class="order-container">
      <h2>订单信息</h2>
      <div class="contact-wrap">
        <iep-no-data v-if="!receiveAddressList.length" message="请添加收货信息" complex></iep-no-data>
        <div class="contact-box">
          <div
            class="contact-item"
            :class="{active:item.id===activeContactId}"
            v-for="item in addressList"
            :key="item.id"
            @click="activeContactId=item.id"
          >
            <i class="hook el-icon-woneng-gou1"></i>
            <div class="info">
              <span class="label">收货人：</span>
              <span class="value">{{item.consignee}}</span>
            </div>
            <div class="info">
              <span class="label">手 机：</span>
              <span class="value">{{item.phone}}</span>
            </div>
            <div class="info">
              <span class="label">邮 箱：</span>
              <span class="value">{{item.mail}}</span>
            </div>
            <div class="info">
              <span class="label">邮 编：</span>
              <span class="value">{{item.zipCode}}</span>
            </div>
            <div class="info">
              <span class="label">地 址：</span>
              <span
                class="value iep-ellipsis"
                :title="`${item.cityArea} ${item.address}`"
              >{{item.cityArea}} {{item.address}}</span>
            </div>
            <div class="edit">
              <div></div>
              <el-link
                type="primary"
                class="edit-link"
                :underline="false"
                @click="handleEdit(item)"
              >编辑</el-link>
            </div>
          </div>
        </div>
        <div class="contact-opt">
          <div class="left">
            <el-link
              type="primary"
              class="iep-btn"
              v-if="receiveAddressList.length>=4"
              :underline="false"
              @click="isMore=!isMore"
            >
              {{isMore?'收起':'展开'}}全部收货信息
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-link>
          </div>
          <div class="right">
            <el-button type="danger" class="iep-btn" @click="handleAdd()" plain>添加收货信息</el-button>
            <el-button class="iep-btn" @click="$openPage('/my/account/more')">管理收货信息</el-button>
          </div>
        </div>
      </div>
      <div class="good-info-box">
        <iep-table
          :isLoadTable="false"
          :is-pagination="false"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="false"
        >
          <template #name="{scope}">
            <iep-table-link-img-desc
              :img="scope.row.avatar"
              :desc="scope.row.orgName"
              :name="scope.row.name"
            ></iep-table-link-img-desc>
          </template>
          <template #amount="{scope}">
            <div v-if="scope.row.category!=='5'">{{scope.row.amount}}</div>
            <iep-input-number v-else v-model="scope.row.amount"></iep-input-number>
          </template>
          <!-- 原价 -->
          <template #price="{scope}">{{_templatePrice(scope.row)}}</template>
          <!-- 打折 -->
          <template #discount="{scope}">{{_templateDiscount(scope.row,true)}}</template>
        </iep-table>
      </div>
    </div>
    <div class="submit-container">
      <el-button type="primary" class="iep-btn" size="medium" @click="handleSubmit()">提交确认</el-button>
    </div>
    <AddressDialogForm ref="AddressDialogForm" @load-page="loadPage()"></AddressDialogForm>
  </div>
</template>
<script>
import { AddressDTO } from "@/views/my/account/components/options";
import { decodeOrderId } from "@/util/util";
import { OrderInfo, OrderDTO } from "@/types/order";
import {
  getReceiveAddressList,
  createReceiveAddress,
  updateReceiveAddress,
} from "@/api/admin/receive_address";
// 魔方的生成订单
import { createProductOrder } from "@/api/dms/product";
import AddressDialogForm from "@/views/my/account/components/AddressDialogForm";
import {
  _templateDiscount,
  _templatePrice,
} from "@/views/my/index/order/options";

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
  components: {
    AddressDialogForm,
  },
  data() {
    return {
      isMore: false,
      orderInfo: new OrderInfo(),
      receiveAddressList: [],
      activeContactId: null,
      columnsMap: [
        {
          label: "名称",
          prop: "name",
          type: "slot",
          minWidth: 300,
        },
        {
          label: "数量",
          prop: "amount",
          type: "slot",
        },
        {
          label: "商品原价",
          prop: "price",
          type: "slot",
        },
        {
          label: "优惠后实际支付",
          prop: "discount",
          type: "slot",
        },
      ],
    };
  },
  computed: {
    createOrder() {
      const funcMap = {
        1: createProductOrder,
      };
      return funcMap[this.orderInfo.type];
    },
    addressList() {
      const length = this.isMore ? this.receiveAddressList.length : 3;
      return this.receiveAddressList.slice(0, length);
    },
    pagedTable() {
      return [this.orderInfo];
    },
  },
  created() {
    if (this.$route.params.id) {
      this.orderInfo = this.$mergeByFirst(
        new OrderInfo(),
        decodeOrderId(this.$route.params.id),
      );
    }
    this.loadPage();
  },
  methods: {
    _templateDiscount,
    _templatePrice,
    async loadPage() {
      const { data } = await getReceiveAddressList();
      this.receiveAddressList = data;
      const idx = this.receiveAddressList.findIndex((m) => m.isDefault === "1");
      if (idx >= 0) {
        this.activeContactId = this.receiveAddressList[idx].id;
      } else {
        this.activeContactId = 0;
      }
    },
    handleAdd() {
      this.$refs.AddressDialogForm.dialogTitle = "新增";
      this.$refs.AddressDialogForm.dialogShow = true;
      this.$refs.AddressDialogForm.form = new AddressDTO();
      this.$refs.AddressDialogForm.formRequestFn = createReceiveAddress;
    },

    handleEdit(row) {
      this.$refs.AddressDialogForm.dialogTitle = "修改";
      this.$refs.AddressDialogForm.dialogShow = true;
      this.$refs.AddressDialogForm.form = this.$mergeByFirst(
        new AddressDTO(),
        row,
      );
      this.$refs.AddressDialogForm.formRequestFn = updateReceiveAddress;
    },
    async handleSubmit() {
      const form = this.$mergeByFirst(new OrderDTO(), {
        ...this.orderInfo,
        source: "1",
        contactId: this.activeContactId,
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
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.contact-wrap {
  .contact-opt {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }
}
.contact-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  .contact-item {
    position: relative;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    padding: 10px 15px;
    cursor: pointer;
    overflow: hidden;
    .hook {
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 12px;
      color: #fff;
    }
    .info {
      margin-bottom: 3px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      &:last-child,
      &:nth-last-child(2) {
        margin-bottom: 0;
      }
      span {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
      }
      .label {
        width: 56px;
        text-align: justify;
        color: $--color-text-secondary;
        &::after {
          display: inline-block;
          width: 100%;
          height: 0;
          content: "";
        }
      }
      .value {
        max-width: 250px;
      }
    }
    .edit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 24px;
      .edit-link {
        display: none;
        margin-right: 5px;
      }
    }
    &:hover {
      border-color: $--color-primary;
      .edit-link {
        display: inline-block;
      }
    }
    &.active,
    &:hover {
      position: relative;
      border-color: $--color-primary;
      cursor: pointer;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 32px solid $--color-primary;
        border-left: 32px solid transparent;
      }
    }
    &.active {
      cursor: default;
    }
  }
}
.good-info-box {
  margin-top: 30px;
}
</style>
