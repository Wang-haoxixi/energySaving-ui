<template>
  <iep-operation-wrapper v-if="options.length">
    <el-button
      v-for="item in firstBtn"
      :disabled="judgeDisabled(item)"
      :key="item.name"
      :icon="item.icon"
      :type="firstBtnType(item.type)"
      @click="item.func()"
    >{{item.name}}</el-button>
    <template v-if="isSecondBtn">
      <el-dropdown v-if="isDropDown">
        <iep-button class="el-dropdown-link">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </iep-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="sitem in tailBtns"
            :disabled="judgeDisabled(sitem)"
            :key="sitem.name"
            :icon="sitem.icon"
            @click.native="sitem.func()"
          >{{sitem.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <iep-button
        v-else
        v-for="titem in tailBtns"
        :disabled="judgeDisabled(titem)"
        :key="titem.name"
        :icon="titem.icon"
        :type="otherBtnType(titem.type)"
        @click="titem.func()"
      >{{titem.name}}</iep-button>
    </template>
  </iep-operation-wrapper>
</template>
<script>
import { take, tail } from "lodash";
export default {
  name: "IepOperationCommonGroup",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    multipleSelection: {
      type: Array,
      default: () => [],
    },
    usePrimary: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    optionsData() {
      return this.options.filter((m) => !m.hidden);
    },
    firstBtn() {
      return this.takeOneOption(this.optionsData);
    },
    tailBtns() {
      return this.tailOptions(this.optionsData);
    },
    isDropDown() {
      return this.optionsData.length >= 3;
    },
    isSecondBtn() {
      return this.optionsData.length >= 2;
    },
    isNeedBatchOperation() {
      return this.multipleSelection.length > 0;
    },
  },
  methods: {
    judgeDisabled(item) {
      if (item.disabled) {
        return true;
      } else {
        if (!item.batchOperation) {
          return false;
        } else {
          if (this.isNeedBatchOperation) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    takeOneOption(options) {
      return take(options);
    },
    tailOptions(options) {
      return tail(options);
    },
    firstBtnType(type) {
      if (this.usePrimary) {
        return type || "primary";
      } else {
        return type || "default";
      }
    },
    otherBtnType(type) {
      return type || "default";
    },
  },
};
</script>
