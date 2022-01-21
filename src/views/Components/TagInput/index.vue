<template>
  <div class="tag-box">
    <span v-if="!value.length">暂无标签</span>
    <el-tag
      :key="tag"
      v-for="tag in value"
      :disable-transitions="false"
      type="info"
      size="default"
      effect="plain"
      :closable="!disabled"
      @close="handleDel(tag)"
    >{{tag}}</el-tag>
    <template v-if="!disabled">
      <el-autocomplete
        v-if="inputVisible"
        class="input-new-tag"
        ref="saveTagInput"
        v-model.trim="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @select="handleInputConfirm"
        @blur="handleInputClear"
        :fetch-suggestions="querySearchAsync"
        :maxlength="maxLength"
      ></el-autocomplete>
      <el-button
        v-else
        v-show="!notEdit"
        class="button-new-tag"
        icon="el-icon-edit"
        @click="showInput"
      >编辑</el-button>
    </template>
  </div>
</template>
<script>
import { getTagPage } from "@/api/tms/tag";
export default {
  name: "IepTagInput",
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notEdit: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleDel(tag) {
      const dynamicTags = [...this.value];
      dynamicTags.splice(dynamicTags.indexOf(tag), 1);
      this._save(dynamicTags);
      this.$emit("handle-del");
    },
    async querySearchAsync(queryString, cb) {
      const results = await getTagPage({ name: queryString });
      const tagList = results.data.records
        .map((m) => {
          return {
            value: m.name,
          };
        })
        .filter((m) => !this.value.includes(m.value));
      cb(tagList);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    _save(tags) {
      this.$emit("input", tags);
    },
    handleInputClear() {
      setTimeout(() => {
        this.inputVisible = false;
        this.inputValue = "";
      }, 500);
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        const dynamicTags = [...this.value];
        if (dynamicTags.includes(inputValue)) {
          this.$message("标签已存在");
          return;
        }
        dynamicTags.push(inputValue);
        this._save(dynamicTags);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.$emit("handle-input-confirm");
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: -10px;
  > * {
    margin-bottom: 5px;
    margin-left: 10px;
    height: 42px;
    line-height: 42px;
    color: $--color-text-secondary;
  }
}
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 42px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
  color: $--color-text-regular;
  &:hover {
    // border-color: rgba(247, 68, 55, 0.1) !important;
    border-color: $--color-fifth !important;
    // background-color: rgba(247, 68, 55, 0.1);
    background-color: $--color-fifth;
    color: $--color-primary;
  }
}
.input-new-tag {
  width: 180px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
