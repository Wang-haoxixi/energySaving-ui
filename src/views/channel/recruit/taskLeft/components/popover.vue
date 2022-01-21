<template>
  <div class="iep-popover">
    <div class="popover-content">
      <el-popover
        ref="popover"
        placement="bottom"
        :width="list.length > 10 ? 400 : 300"
        trigger="hover"
      >
        <div class="search-form">
          <div
            class="item-label"
            v-for="item in list"
            :key="item.key"
            @click="handleClick(item)"
          >{{item.value}}</div>
        </div>
        <div class="title" slot="reference">
          <div class="name">{{v || "不限"}}</div>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    value: {
      default: "",
    },
  },
  computed: {
    v: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange() {},
    handleClick(row) {
      this.v = row.value;
      this.$refs.popover.doClose();
    },
  },
};
</script>

<style  lang="scss" scoped>
.iep-popover {
  display: inline-block;
  width: calc(100% - 50px);
  .title {
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    width: 93%;
    display: flex;
    .name {
      max-width: calc(100% - 20px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    i {
      line-height: 22px;
    }
  }
}
.search-form {
  display: flex;
  flex-wrap: wrap;
  .item-label {
    width: calc(50% - 10px);
    padding: 5px;
    cursor: pointer;
    &:hover {
      // color: #f9695f;
      color: $--color-primary;
      // background-color: #feeceb;
      background-color: $--color-fifth;
    }
  }
}
</style>
