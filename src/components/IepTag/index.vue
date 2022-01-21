<template>
  <div class="tag">
    <el-tag
      :key="tag"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{`${tag.slice(0, 20)}${tag.length > 20 ? '...' : ''}`}}</el-tag>
    <el-input
      v-if="inputVisible"
      class="input-new-tag"
      v-model="inputValue"
      ref="input"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" @click="showInput">添加标签</el-button>
  </div>
</template>
<script>
// import TagDialog from "./TagDialog";
export default {
  name: "IepTag",
  // components: { TagDialog },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  computed: {
    tags: {
      // getter
      get: function() {
        return this.value;
      },
      // setter
      set: function(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    handleSelectTag(name) {
      let tags = this.tags;
      if (name && tags.indexOf(name) === -1) {
        tags = [...tags, name];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },

    loadPage() {},

    handleMore() {
      this.$refs["TagDialog"].selectedTags = this.tags;
      this.$refs["TagDialog"].loadPage();
      this.$refs["TagDialog"].dialogShow = true;
    },

    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
  },
};
</script>
<style scoped lang="scss">
.tag ::v-deep .el-tag {
  margin-right: 10px;
}
.tag ::v-deep .button-new-tag {
  height: 42px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
  color: $--color-text-regular;
}
.tag ::v-deep .input-new-tag {
  width: 90px;
  // margin-right: 10px;
  vertical-align: bottom;
}
.tag ::v-deep .el-tag {
  height: 30px;
  line-height: 30px;
}
</style>
