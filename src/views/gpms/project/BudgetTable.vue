<template>
  <div class="budget-table">
    <div class="budget-top">
      <div>成本类型</div>
      <div>金额</div>
      <el-button type="text" class="add" @click="addBudgetList()">添加</el-button>
    </div>
    <div class="budget-bottom" v-for="(item,index) in newValue" :key="index">
      <div>
        <el-select v-model="item.relationId" placeholder="请选择">
          <el-option
            v-for="item in dictBudget"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div style="display: flex;align-items: center;">
        <el-input v-model="item.money" style="width:90%;">
          <template slot="append">元</template>
        </el-input>
      </div>
      <el-button type="text" class="delete" @click="lessBudgetList(index)">删除</el-button>
    </div>
    <div class="budget-down">
      <div>
        项目成本合计:
        <iep-input-number v-model="newProjectBudget"></iep-input-number>
      </div>
      <div>
        项目预估利润:
        <iep-input-number v-model="newForecastProfits"></iep-input-number>
      </div>
      <div>
        项目利润率:
        <iep-input-number v-model="newProfitMargin"></iep-input-number>
      </div>
    </div>
  </div>
</template>
<script>
import { dictMap } from "./option";
export default {
  props: {
    dictBudget: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
    costTotal: {
      type: Number,
    },
    forecastProfits: {
      type: Number,
    },
    profit: {
      type: Number,
    },
  },
  data() {
    return {
      dictMap,
    };
  },
  computed: {
    newValue: {
      get: function () {
        return this.value;
      },
      set: function (event) {
        this.$emit("input", event);
      },
    },
    newProjectBudget: {
      get: function () {
        return this.costTotal;
      },
      set: function (value) {
        this.$emit("update:costTotal", value);
      },
    },
    newForecastProfits: {
      get: function () {
        return this.forecastProfits;
      },
      set: function (value) {
        this.$emit("update:forecastProfits", value);
      },
    },
    newProfitMargin: {
      get: function () {
        return this.profit;
      },
      set: function (value) {
        this.$emit("update:profit", value);
      },
    },
  },
  methods: {
    addBudgetList() {
      const newItem = { costType: "", amount: "" };
      this.value.push(newItem);
    },
    lessBudgetList(index) {
      this.value.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
/*成本预算开始 */
.budget-top {
  border-radius: 10px 10px 0 0;
}
.budget-down {
  border-radius: 0 0 10px 10px;
}
.budget-top,
.budget-bottom {
  height: 44px;
  line-height: 42px;
  font-size: 14px;
  background-color: $--background-color;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(2, 1fr) 80px;
  border-left: 1px solid $--border-color;
  border-top: 1px solid $--border-color;
  > div {
    border-right: 1px solid $--border-color;
    border-bottom: 1px solid $--border-color;
    padding-left: 20px;
  }
  .add {
    border-radius: 0 10px 0 0;
  }
  .delete {
    border-radius: 0;
  }
  .delete,
  .add {
    border-right: 1px solid $--border-color;
    border-bottom: 1px solid $--border-color;
  }
}
.budget-bottom {
  height: 80px;
  line-height: 80px;
  text-align: left;
  background-color: #fff;
  border-top: 0;
}
.budget-down {
  display: flex;
  margin: 0 0 20px 0;
  font-size: 14px;
  border-left: 1px solid $--border-color;
  border-right: 1px solid $--border-color;
  border-bottom: 1px solid $--border-color;
  > div {
    padding: 20px;
  }
}
</style>
