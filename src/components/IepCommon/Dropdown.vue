<template>
  <el-dropdown class="dropdown">
    <span class="el-dropdown-link">
      {{val | getSearchName(list)}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in list"
        :key="index"
        @click.native="handleClick(item)"
      >{{item[item.labelName || "label"]}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: "IepDropdown",
  props: {
    value: {
      required: true,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    defaultLabel: {
      default: "",
    },
  },
  filters: {
    getSearchName(val, list) {
      for (const item of list) {
        if (item[item.valueName || "value"] === val) {
          return item[item.labelName || "label"];
        }
      }
      return this.defaultLabel;
    },
  },
  computed: {
    val() {
      return this.value;
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(row) {
      this.$emit("input", row[row.valueName || "value"]);
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
}
</style>
