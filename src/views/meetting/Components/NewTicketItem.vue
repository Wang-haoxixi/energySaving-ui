<template>
  <el-card shadow="never" :body-style="{padding:'40px 30px 40px 0px'}">
    <el-form class="ticket-form" :model="value" ref="form" label-width="120px">
      <el-row>
        <el-col :span="8">
          <iep-form-item
            label-name="票务种类"
            :rules="{required: true, message: '票务种类不能为空', trigger: 'change'}"
            prop="ticketingType"
          >
            <iep-dict-select
              v-model="value.ticketingType"
              dict-name="qms_ticket_type"
              @change="handleSetPayMethodlist"
              :disabled="isEnroll"
            ></iep-dict-select>
          </iep-form-item>
        </el-col>
        <el-col :span="16">
          <iep-form-item
            label-name="票务名称"
            :rules="{required: true, message: '票务名称不能为空', trigger: 'blur'}"
            prop="ticketingName"
          >
            <el-input placeholder="如早鸟票、普通票、VIP票" v-model="value.ticketingName" :maxlength="20"></el-input>
          </iep-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <iep-form-item
            label-name="票种数量"
            :rules="{required: true, message: '票种数量不能为空', trigger: 'blur'}"
            prop="number"
          >
            <iep-input-number
              v-model="value.number"
              :max="10000"
              :min="minNumber"
              placeholder="请输入数量"
              :precision="0"
            ></iep-input-number>
          </iep-form-item>
        </el-col>
        <el-col :span="8">
          <iep-form-item
            label-name="单次购票数量"
            :rules="{required: true, message: '单次购票数量不能为空', trigger: 'change'}"
            prop="limitTicket"
          >
            <iep-input-number
              v-model="value.limitTicket"
              :max="maxNumber"
              :min="1"
              placeholder="请输入数量"
              :precision="0"
            ></iep-input-number>
          </iep-form-item>
        </el-col>
        <el-col :span="4" v-if="value.ticketingType==='1'">
          <iep-form-item label-name="票种审核" prop="needAudit" tip="开启后报名人员将被审核，您可以在人员管理中进行允许/拒绝的操作。">
            <el-switch v-model="value.needAudit" active-color="#13ce66"></el-switch>
          </iep-form-item>
        </el-col>
        <el-col :span="4" v-if="value.ticketingType==='2' && !isEnroll">
          <iep-form-item label-name="允许退票" prop="allowedRefund" tip="是否允许退款">
            <el-switch v-model="value.allowedRefund" active-color="#13ce66"></el-switch>
          </iep-form-item>
        </el-col>
      </el-row>
      <iep-form-item
        label-name="票务金额"
        v-if="value.ticketingType==='2'"
        prop="payMethodList"
        :rules="{ required: true, validator:payMethodValidate,message: '票务金额不能为空', trigger: 'change' }"
      >
        <div class="pay-method">
          <div v-for="(t,i) in value.payMethodList" :key="'payMethod'+i">
            <el-checkbox
              :disabled="_checkSwitchDisabled(t.typeBoolean)||isEnroll"
              v-model="t.typeBoolean"
            >{{t.name}}</el-checkbox>
            <IepInputAmount
              v-model="t.amount"
              :disabled="!t.typeBoolean||isEnroll"
              :unit="unitMap[t.type]"
              :min="0.01"
              :precision="2"
            ></IepInputAmount>
          </div>
        </div>
      </iep-form-item>
      <iep-form-item label-name="票种备注">
        <iep-input-area
          v-model="value.remarks"
          show-word-limit
          placeholder="请输入备注内容"
          :maxlength="50"
        ></iep-input-area>
      </iep-form-item>
    </el-form>
    <div class="operate" v-if="isDraft">
      <i v-if="!isEnroll" class="el-icon-woneng-shuaxin" title="重置" @click="_handleReset"></i>
      <i class="el-icon-woneng-shanchu" title="删除" @click="_handleDelete"></i>
    </div>
  </el-card>
</template>
<script>
import { setWeCanPayValue, setOfflinePayValue, unitMap } from "../options";
import formMixins from "@/mixins/formMixins";

export default {
  mixins: [formMixins],
  props: {
    value: {
      type: Object,
      required: true,
    },
    isEnroll: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  name: "TicketItem",
  data() {
    return {
      unitMap,
      minNumber: 1,
    };
  },
  mounted() {
    // 如果有人报名，设置最低票数为已购人数
    if (this.isEnroll) {
      this.minNumber = this.value.number - this.value.surplus;
    }
  },
  computed: {
    ticket: {
      // getter
      get: function () {
        return this.value;
      },
      // setter
      set: function (value) {
        this.$emit("input", value);
      },
    },
    maxNumber() {
      if (this.value.number) return this.value.number;
      return 1;
    },
  },
  watch: {
    "value.number": {
      handler(v) {
        if (v) {
          if (v < this.value.limitTicket) {
            this.value.limitTicket = v;
          }
        } else {
          this.value.limitTicket = 1;
        }
      },
    },
  },
  methods: {
    // 初始化票种
    handleSetPayMethodlist(v) {
      const { ticket } = this;
      if (v === "1") {
        ticket.payMethodList = [];
        ticket.ticketingName = "免费票";
        ticket.money = 0;
        ticket.canMoney = 0;
        ticket.paymentMethod = 3;
      } else {
        const weCanPayValue =
          ticket.payMethodList.find((m) => m.type === "WeCanPay")?.amount || 0;
        const offlinePayValue =
          ticket.payMethodList.find((m) => m.type === "OfflinePay")?.amount ||
          0;
        ticket.payMethodList = [
          setWeCanPayValue(weCanPayValue),
          setOfflinePayValue(offlinePayValue),
        ];
        ticket.money = 1;
        ticket.canMoney = 1;
        ticket.paymentMethod = 3;
        ticket.ticketingName = "付费票";
        ticket.needAudit = false;
        ticket.allowedRefund = false;
      }
    },
    // 判断该支付方式是否启用
    _checkSwitchDisabled(value) {
      const tbL = this.ticket.payMethodList.map((m) => m.typeBoolean);
      return tbL[0] !== tbL[1] && value;
    },
    // 调用外部重置
    _handleReset() {
      this.$emit("reset");
    },
    // 调用外部删除
    _handleDelete() {
      this.$emit("delete");
    },
    // 调用外部提交 用于mixinsSubmitFormGen
    async submitForm() {
      this.$emit("submitForm");
      return true;
    },
    // 校验票务表单
    async _formValidate() {
      const res = await this.mixinsSubmitFormGen();
      return res;
    },
    // 票务金额的自定义表单校验
    payMethodValidate(rule, value, callback) {
      if (!value) return callback(new Error("票务金额不能为空"));
      for (const item of value) {
        if (!item.typeBoolean) break;
        if (!item.amount) return callback(new Error("票务金额不能为空"));
      }
      callback();
    },
  },
};
</script>
<style lang="scss" scoped>
.ticket-form {
  width: 100% !important;
  margin-top: 0 !important;
  & > div:last-of-type {
    margin-bottom: 0;
  }
}
.pay-method {
  width: 100%;
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  & > div {
    display: flex;
    align-items: center;
    .el-checkbox {
      margin-right: 10px;
    }
  }
}
.el-card {
  position: relative;
  .operate {
    position: absolute;
    top: 5px;
    right: 10px;
    i {
      cursor: pointer;
      margin-left: 10px;
      color: $--color-input-regular;
      font-size: 16px;
    }
  }
}
</style>
