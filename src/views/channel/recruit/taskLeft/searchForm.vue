<template>
  <div class="search">
    <div
      class="dropdown"
      v-for="(item, index) in list"
      :key="index"
      v-show="item.type === tab || item.type === 'all'"
    >
      {{item.label}}：
      <PopoverSearch
        v-model="searchForm[item.value]"
        :list="item.list"
        v-if="item.componentType === 'popover'"
      ></PopoverSearch>
      <el-dropdown v-else>
        <span class="el-dropdown-link">
          {{searchForm[item.value] | getSearchName(item.list)}}
          <i
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(t, i) in item.list"
            :key="i"
            @click.native="handleClick(item.value, t.key)"
          >{{t.value}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { initSearchFormData, searchOptions } from "./options";
import { mapGetters } from "vuex";
import PopoverSearch from "./components/popover";

export default {
  components: { PopoverSearch },
  props: {
    tab: {
      type: String,
      default: "job",
    },
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo", "industryTree"]),
  },
  data() {
    return {
      list: searchOptions,
      searchForm: initSearchFormData(),
    };
  },
  filters: {
    getSearchName(val, list) {
      for (const item of list) {
        if (item.key === val) {
          return item.value;
        }
      }
      return list[0].value;
    },
  },
  methods: {
    handleClick(key, val) {
      this.searchForm[key] = val;
    },
    initSearch() {
      this.searchForm = initSearchFormData();
    },
  },
  created() {
    const query = this.$route.query;
    for (const key in this.searchForm) {
      this.searchForm[key] = query[key] || "";
    }
  },
  watch: {
    searchForm: {
      handler(val) {
        const row = { ...val };
        for (const key in row) {
          if (row[key] === "0") {
            row[key] = "";
          }
        }
        this.$emit("searchPage", row);
      },
      deep: true,
    },
  },
};
</script>
 
<style lang="scss" scoped>
.search {
  margin-bottom: 14px;
  padding: 14px 20px;
  border: 1px solid $--border-color;
  border-radius: 10px;
  display: flex;
  .dropdown {
    font-size: 14px;
    width: 25%;
    ::v-deep .el-dropdown {
      cursor: pointer;
    }
    ::v-deep i {
      color: $--color-input-regular;
    }
  }
}
</style>