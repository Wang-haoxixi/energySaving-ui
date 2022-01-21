<template>
  <div class="customers-box">
    <div>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" icon="el-icon-plus" @click="showInput">新增客户</el-button>
    </div>
    <div v-if="value.length" class="current-customer">
      <div class="customer-item" v-for="(item,i) in value" :key="i">
        <div class="name iep-ellipsis" :title="item.name">{{item.name}}</div>
        <i class="el-icon-error" title="移除" @click="handleRemove(item)"></i>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addProductCustomer,
  getProductCustomerList,
  removeProductCustomer,
} from "@/api/dms/square_customer";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    async loadData() {
      const { data } = await getProductCustomerList(this.id);
      this.$emit("input", data);
    },
    async handleRemove(item) {
      const { data } = await removeProductCustomer(item.id);
      if (data) {
        this.loadData();
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleInputConfirm() {
      const name = this.inputValue;
      if (name) {
        try {
          const { data } = await addProductCustomer({
            id: this.id,
            name,
          });
          if (data) {
            this.loadData();
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.inputVisible = false;
          this.inputValue = "";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.button-new-tag {
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 120px;
  vertical-align: bottom;
}
.customers-box {
  width: 100%;
  .current-customer {
    width: 100%;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    margin-top: 15px;
    padding: 10px;
    .customer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        line-height: 25px;
        max-width: 200px;
      }
      .el-icon-error {
        color: $--color-text-regular;
        cursor: pointer;
        &:hover {
          color: $--color-text-secondary;
        }
      }
    }
  }
}
</style>
