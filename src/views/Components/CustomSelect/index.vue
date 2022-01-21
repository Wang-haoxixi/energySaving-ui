<template>
  <div class="crms-select">
    <el-autocomplete
      class="inline-input"
      v-model="newValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "IepCustomSelect",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      restaurants: [],
    };
  },
  computed: {
    newValue: {
      get: function() {
        return this.value;
      },
      set: function(event) {
        this.$emit("input", event);
      },
    },
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return res => {
        return res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    loadAll() {
      return [
        { id: 1, value: "十二泷町" },
        { id: 2, value: "星移浓缩咖啡" },
        { id: 3, value: "阿姨奶茶/豪大大" },
        { id: 4, value: "新麦甜四季甜品炸鸡" },
      ];
    },
    handleSelect(item) {
      this.$emit("update-id", item.id);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
</style>
