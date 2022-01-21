<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="`间隔:当前${currentLabelValue.label},切换为${nextLabelValue.label}`"
      placement="top"
    >
      <el-button :icon="currentLabelValue.icon" @click="handleInput(nextLabelValue.value)"></el-button>
    </el-tooltip>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { SET_TABLE_SIZE } from "@/store/modules/common/mutation-types";
const TABLESIZE_LIST = [
  {
    label: "大",
    value: "meduim",
    icon: "el-icon-menu",
  },
  {
    label: "中",
    value: "small",
    icon: "el-icon-s-grid",
  },
  {
    label: "小",
    value: "mini",
    icon: "el-icon-woneng-density",
  },
];
export default {
  name: "IepTableDensity",
  computed: {
    ...mapGetters(["tableSize"]),
    currentLabelValue() {
      return TABLESIZE_LIST.find(m => m.value === this.tableSize);
    },
    nextLabelValue() {
      let nextIdx = 0;
      const idx = TABLESIZE_LIST.findIndex(m => m.value === this.tableSize);
      nextIdx = idx + 1;
      if (nextIdx === TABLESIZE_LIST.length) {
        nextIdx = 0;
      }
      return TABLESIZE_LIST[nextIdx];
    },
  },
  methods: {
    ...mapMutations({
      setTableSize: SET_TABLE_SIZE,
    }),
    handleInput(value) {
      this.setTableSize(value);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-woneng-density {
  font-size: 14px;
}
</style>
