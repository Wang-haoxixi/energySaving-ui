<template>
  <div>
    <div class="title">好友印象</div>
    <div class="impression">
      <div class="tag-list">
        <el-tag
          type="info"
          :key="item.id"
          v-for="item in signList"
          :disable-transitions="false"
          :data-text="item.number"
          title="点赞"
          @click="handleAgree(item)"
        >{{item.sign}}</el-tag>
      </div>
      <div class="add-tags">
        <el-input
          class="input-new-tag"
          v-model="inputValue"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          placeholder="发表您对TA的印象标记"
        ></el-input>
        <el-button class="button-new-tag" type="primary" @click="showInput">添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getUserSignListById,
  postUserSign,
  agreeSignById,
} from "@/api/dms/sign";
export default {
  data() {
    return {
      signList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  mounted() {
    this.loadSign();
  },
  methods: {
    async loadSign() {
      const { data } = await getUserSignListById(this.$route.params.id);
      this.signList = data;
    },
    async handleAgree(item) {
      const { data } = await agreeSignById(item.id);
      if (data) {
        this.$message("操作成功");
        this.loadSign();
      }
    },
    handleClose(item) {
      this.signList.splice(this.signList.indexOf(item), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        const { data } = await postUserSign({
          userId: this.$route.params.id,
          sign: inputValue,
        });
        if (data) {
          this.$message("操作成功");
          this.loadSign();
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.impression {
  margin-right: -30px;
  .add-tags ::v-deep {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .input-new-tag,
    .el-input__inner {
      margin-right: 10px;
      width: 400px;
      height: 36px;
    }
    .button-new-tag {
      padding: 0 20px;
      height: 36px;
    }
  }
}
.el-tag {
  cursor: pointer;
  position: relative;
  margin-right: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0 16px;
  height: 36px;
  line-height: 34px;
  font-size: 14px;
  color: $--color-text-regular;
  &::after {
    content: attr(data-text);
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 0 5px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    background-color: $--color-input-regular;
    border-radius: 8px;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>
