<template>
  <div class="product-select">
    <div>
      <el-button @click="handleAdd()" icon="el-icon-woneng-jiahao"></el-button>
    </div>
    <div class="list">
      <iep-no-data v-if="!value.length" complex message="暂无关联产品"></iep-no-data>
      <div class="products-grid" v-else>
        <el-card
          v-for="item in value"
          :key="item.id"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="image">
            <iep-img :src="item.imageUrl"></iep-img>
          </div>
          <div class="txt-box">
            <span :title="item.name">{{item.name}}</span>
            <div class="bottom clearfix">
              <time class="time" :title="item.synopsis">{{ item.synopsis }}</time>
              <el-button type="text" class="button" @click="handleRemove(item)">移除</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <DialogProducts :relateProducts="value" ref="DialogProducts" @input="input"></DialogProducts>
  </div>
</template>
<script>
import _ from "lodash";
import DialogProducts from "./DialogProducts";
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  components: {
    DialogProducts,
  },
  methods: {
    handleAdd() {
      this.$refs["DialogProducts"].dialogShow = true;
    },
    handleRemove(item) {
      const newValue = this.value.filter(m => m.id !== item.id);
      this.$emit("input", newValue);
    },
    input(v) {
      const value = [...this.value, ...v];
      const newValue = _.uniqBy(value, "id");
      this.$emit("input", newValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.product-select {
  width: 100%;
  .list {
    margin-top: 15px;
  }
}
.products-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.time {
  display: block;
  font-size: 12px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: $--color-text-secondary;
}

.button {
  float: right;
  padding: 0;
  height: 24px;
}

.image {
  display: block;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid $--border-color;
  ::v-deep .el-image {
    border-radius: 10px 10px 0 0 !important;
  }
}
.txt-box {
  padding: 15px;
  > span {
    display: block;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
