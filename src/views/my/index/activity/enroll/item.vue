<template>
  <div class="activity-item">
    <el-table class="down-table" style="width: 100%" :data="data.conferenceTicketingEnroleVOs">
      <el-table-column prop="ticketingName" label="票种名称"></el-table-column>
      <el-table-column prop="mremarks" label="票种备注"></el-table-column>
      <el-table-column prop="price" label="票价">
        <template v-slot="scope">
          <TicketMoney :scope="scope"></TicketMoney>
        </template>
      </el-table-column>
      <el-table-column porp="orderNum" label="购买数量">
        <template v-slot="scope">
          <div>{{scope.row.orderNum}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="总票价">
        <template v-slot="scope">
          <TicketMoney :scope="scope" strikethrough :orderNum="scope.row.orderNum"></TicketMoney>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="实际支付">
        <template v-slot="scope">
          <div>{{orderTotal(scope.row)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="130">
        <template v-slot="scope">
          <div :style="{color: getOrderStatus(scope.row).color}">{{getOrderStatus(scope.row).label}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="审核状态">
        <template v-slot="scope">{{getFromDictsMap("auditStatus",scope.row.auditStatus)}}</template>
      </el-table-column>
      <!-- <el-table-column prop="status" label="核销状态">
        <template v-slot>
          <div class="cancelStatus" v-if="data.orderStatus==='0'">/</div>
          <div class="cancelStatus" v-else>{{data.cancelNum}}/{{data.orderNum}}</div>
        </template>
      </el-table-column>-->
      <el-table-column prop="info" label="报名信息">
        <template v-slot="scope">
          <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="option" label="操作" width="120">
        <template v-slot="scope">
          <div class="btn-box">
            <!-- <el-button
              v-if="scope.row.orderStatus === '0'"
              @click="toPay(scope.row.id)"
              type="primary"
              plain
            >立即支付</el-button>
            <el-button
              v-if="scope.row.orderStatus === '0' ||scope.row.paymentMethod === '0'&& scope.row.orderStatus === '1'"
              @click="toCancel(scope.row.id)"
              plain
            >取消订单</el-button>
            <el-button
              v-if="scope.row.orderStatus === '3'"
              @click="toDelete(scope.row.id)"
              plain
            >删除订单</el-button>-->
            <el-button
              v-if="scope.row.orderStatus === '1'&&['0','2'].includes(scope.row.auditStatus)"
              @click="toCheck(scope.row)"
              plain
            >查看签到码</el-button>
            <el-button
              v-if="scope.row.orderStatus === '1'&&scope.row.auditStatus==='3'"
              @click="handleReason(scope.row)"
            >查看理由</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import TicketMoney from "./TicketMoney";
import { dcitsMapPersonnel } from "@/views/meetting/personnel/options";
export default {
  components: { TicketMoney },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ticketShow: false,
    };
  },
  methods: {
    getFromDictsMap(key, value) {
      const map = dcitsMapPersonnel[key];
      if (map) {
        if (map[value]) return map[value];
      }
      return "暂无";
    },
    // toDelete(id) {
    //   this.$emit("to-delete", id);
    // },
    // toPay(id) {
    //   this.$emit("to-pay", id);
    // },
    // toCancel(id) {
    //   this.$emit("to-cancel", id);
    // },
    toCheck({ id }) {
      this.$emit("to-check", id);
    },
    showDetail(row) {
      this.$emit("show-detail", row);
    },
    handleReason(row) {
      this.$alert(row.auditRemark || "", "驳回理由", {
        confirmButtonText: "确定",
        callback: () => {},
      });
    },
    orderTotal(data) {
      if (data.orderStatus === "1") {
        if (data.paymentMethod === "0") {
          return "0元";
        } else {
          if (data.paymentMethod === "1") {
            return data.orderTotal + "贝";
          } else if (data.paymentMethod === "2") {
            return data.orderTotal + "元";
          } else {
            return data.orderTotal;
          }
        }
      } else {
        return "未支付";
      }
    },
    getOrderStatus(data) {
      const { orderStatus, paymentMethod } = data;
      if (orderStatus === "0") {
        return {
          label: "待支付",
          color: "#f74437",
        };
      } else if (orderStatus === "1") {
        if (paymentMethod === "1") {
          return {
            label: "宝贝支付-已支付",
            color: "#3cd489",
          };
        } else if (paymentMethod === "2") {
          return {
            label: "微信支付-已支付",
            color: "#3cd489",
          };
        } else if (paymentMethod === "0") {
          return {
            label: "免费",
            color: "#3cd489",
          };
        }
      } else if (orderStatus === "2") {
        return {
          label: "支付失败",
          color: "#919397",
        };
      } else if (orderStatus === "3") {
        return {
          label: "订单已被取消",
        };
      }
      return {
        label: "其他",
        color: "#919397",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.down-table ::v-deep .el-table th > .cell {
  font-family: Microsoft YaHei;
  color: #303031;
}
.activity-item {
  align-items: center;
  .btn-box {
    display: flex;
    align-items: center;
  }
}

.down-table {
  margin-bottom: 10px;
  padding: 0;
  border-bottom: 1px solid #eff0f1;
  ::v-deep .el-table__row:hover td {
    border-color: transparent !important;
  }
}
::v-deep {
  .cell {
    max-height: 100px;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /*显示的行数*/
    overflow: hidden;
    word-break: break-all; /*可择*/
  }
}
.cancelStatus {
  text-align: center;
}
</style>
