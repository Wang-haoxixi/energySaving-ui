<template>
  <div class="iep-popover">
    <div class="popover-content">
      <el-popover
        ref="popover"
        placement="bottom"
        :width="option.itemList.length > 10 ? 400 : 300"
        trigger="click"
      >
        <div class="search-form">
          <el-checkbox-group v-model="v" @change="handleChange">
            <el-checkbox
              class="label"
              style="margin-bottom: 10px;width: 40%;"
              :label="item.value"
              v-for="item in option.itemList"
              :key="item.key"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="title" slot="reference">
          <div class="name">{{option.conditionName}}：{{v.length > 0 ? v.join("、") : "不限"}}</div>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    value: {
      default: "",
    },
  },
  computed: {
    v: {
      get: function() {
        if (this.value === "") {
          return [];
        } else {
          return this.value.split(",");
        }
      },
      set: function(value) {
        this.$emit("input", value.join(","));
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange(row) {
      if (row[row.length - 1] === "不限") {
        this.v = ["不限"];
      } else if (row[0] === "不限") {
        this.v = this.v.slice(1);
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
.iep-popover {
  width: 100%;
  .search-form {
    &::v-deep .el-checkbox {
      margin-bottom: 10px;
    }
  }
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
</style>