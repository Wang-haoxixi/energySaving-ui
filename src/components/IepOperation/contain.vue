<template>
  <div class="flex-group">
    <template v-for="(item,k) in firstBtn">
      <el-divider v-if="k" :key="k" direction="vertical"></el-divider>
      <div :key="_dynamicName(item.name)">
        <el-button
          type="text"
          :disabled="judgeDisabled(item, row)"
          @click="item.func(row)"
        >{{_dynamicName(item.name)}}</el-button>
      </div>
    </template>
    <template v-if="isSecondBtn">
      <el-divider direction="vertical"></el-divider>
      <el-dropdown v-if="isDropDown">
        <el-button type="text" class="el-dropdown-link">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in tailBtns"
            :key="_dynamicName(item.name)"
            :disabled="judgeDisabled(item, row)"
            @click.native="item.func(row)"
          >{{_dynamicName(item.name)}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="text"
        v-else
        v-for="item in tailBtns"
        :key="_dynamicName(item.name)"
        :disabled="judgeDisabled(item, row)"
        @click="item.func(row)"
      >{{_dynamicName(item.name)}}</el-button>
    </template>
  </div>
</template>
<script>
import { take, takeRight, isFunction } from "lodash";
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    row: {
      type: Object,
      default: () => {},
    },
    // 需要修改宽度
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      optionsData: [],
    };
  },
  created() {
    this.isHide();
  },
  computed: {
    firstBtn() {
      return this.takeOneOption(this.optionsData);
    },
    tailBtns() {
      return this.tailOptions(this.optionsData);
    },
    isDropDown() {
      // this.count + 1
      return this.optionsData.length >= this.count + 1;
    },
    isSecondBtn() {
      // this.count
      return this.optionsData.length >= this.count;
    },
  },
  methods: {
    _dynamicName(name) {
      if (isFunction(name)) {
        return name(this.row);
      } else {
        return name;
      }
    },
    isHide() {
      this.optionsData = [];
      this.options.forEach(res => {
        if (
          Object.prototype.toString.call(res.hidden) == "[object Function]"
            ? res.hidden(this.row)
            : res.hidden
        ) {
          return;
        } else {
          this.optionsData.push(res);
        }
      });
    },
    takeOneOption(options) {
      // this.count - 1
      return take(options, this.count - 1);
    },
    tailOptions(options) {
      return takeRight(options, options.length - (this.count - 1));
    },
    judgeDisabled(item, row) {
      if (
        Object.prototype.toString.call(item.disabled) == "[object Function]"
          ? item.disabled(row)
          : item.disabled
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    row: {
      deep: true,
      handler: function() {
        this.isHide();
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.flex-group {
  display: flex;
  align-items: center;
}
</style>
