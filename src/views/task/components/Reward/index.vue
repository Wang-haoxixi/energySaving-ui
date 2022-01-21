<template>
  <div class="reward-content">
    <div class="top">
      <el-select
        v-model="form.allocationType"
        :disabled="isUpdate"
        placeholder="请选择"
        @change="typeChange"
      >
        <el-option
          v-for="item in dictMaps.reward"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="form.mode"
        :disabled="isUpdate"
        placeholder="请选择"
        v-if="form.allocationType === '2'"
      >
        <el-option
          v-for="item in dictMaps.mode"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <div v-if="form.allocationType !== '0'">
        <el-tooltip placement="top">
          <div slot="content" v-html="tips[form.allocationType]"></div>
          <i class="icon-info el-icon-info"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="table" v-if="form.allocationType === '2'">
      <div class="table-item">
        <div class="item-label">我要分配：</div>
        <el-input class="input" :disabled="isUpdate" v-model="form.allocationAmount"></el-input>
        <p>（当前可用宝贝：{{cost}}）</p>
      </div>
      <div class="table-item">
        <div class="item-label">支付密码：</div>
        <el-input
          class="input"
          :disabled="isUpdate"
          v-model="form.safePassword"
          type="password"
          v-if="userInfo.safePassword"
        ></el-input>
        <div class="no-password" el-else>
          <div class="no-oassword-title">请先设置支付密码</div>
          <el-button
            class="button"
            type="primary"
            size="mini"
            @click="$openPage('/my/account/security', 2)"
          >去设置</el-button>
          <el-button class="button" size="mini" @click="freshInfo">刷新</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dictMaps, tips, initForm } from "./options";
import { getAccountBalance } from "@/api/fms/account";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      dictMaps,
      tips,
      cost: 0,
      form: initForm(),
      isUpdate: false,
      isCreated: 0,
    };
  },
  methods: {
    ...mapActions(["userGetInfo"]),
    getAccountBalance() {
      getAccountBalance().then(({ data }) => {
        this.cost = data;
      });
    },
    typeChange() {
      this.form.safePassword = "";
      this.form.allocationAmount = "";
    },
    freshInfo() {
      this.userGetInfo();
    },
  },
  created() {
    this.getAccountBalance();
  },
  watch: {
    "form.allocationAmount"(val) {
      if (val === "") return;
      val = Number(val);
      if (isNaN(val)) val = 0;
      val = Math.floor(val);
      if (val < 0) {
        val = 0;
      } else if (val > 10000) {
        val = 10000;
      }
      this.form.allocationAmount = val;
    },
    form: {
      handler(row) {
        this.$emit("input", {
          allocationAmount: row.allocationAmount, // 自动分配宝贝奖励金额
          allocationType: row.allocationType, // 宝贝奖励分配模式（0：不奖励；1：手动分配；2：自动分配）
          safePassword: row.safePassword, // 支付密码
        });
      },
      deep: true,
    },
    value: {
      handler(val = {}) {
        if (val.id && this.isCreated === 0) {
          this.isUpdate = val.id && val.allocationType !== "0";
          ++this.isCreated;
        }
        this.form.allocationType = val.allocationType || "0";
        this.form.allocationAmount = val.allocationAmount || "";
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.reward-content {
  .top {
    display: flex;
    &::v-deep .el-select {
      margin-right: 10px;
      input {
        width: 120px;
      }
    }
    .icon-info {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .table {
    background-color: $--background-color;
    padding: 15px;
    width: 100%;
    margin-top: 10px;
    border-radius: $--border-radius-base;
    .table-item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      &:last-of-type {
        margin: 0;
      }
      .input {
        width: 120px;
      }
      p {
        margin: 0;
        line-height: 36px;
      }
    }
    .no-password {
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-size: 14px;
      .button {
        margin-left: 10px;
        width: auto;
        padding: 5px 15px;
        height: 30px;
        line-height: 18px;
      }
    }
  }
  &::v-deep input {
    font-size: 14px !important;
  }
}
</style>
