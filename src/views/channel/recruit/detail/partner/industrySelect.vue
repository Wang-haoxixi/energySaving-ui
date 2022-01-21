<template>
  <div class="industry-select">
    <el-select v-model="realVal" placeholder="请选择行业" @change="handleChange">
      <el-option v-for="item in industryTree" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      realVal: "",
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    ...mapGetters(["industryTree"]),
  },
  watch: {
    value(val) {
      this.realVal = val;
    },
  },
};
</script>

<style>
</style>