<template>
  <iep-dialog :dialog-show="dialogShow" title="转发说说" width="50%" @close="resetForm">
    <forwardContent forward :contentData="contentData" @load-page="loadPage"></forwardContent>
  </iep-dialog>
</template>

<script>
import forwardContent from "./library/forwardContent";
export default {
  components: { forwardContent },
  data() {
    return {
      dialogShow: false,
      loadState: false,
      row: {
        images: [],
      },
      contentData: {},
    };
  },
  methods: {
    open(row) {
      this.dialogShow = true;
      this.contentData = row;
    },
    resetForm() {
      this.dialogShow = false;
    },
    loadPage() {
      this.dialogShow = false;
      this.$emit("load-page", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.forward {
  display: flex;
  .avatar {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    .img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .content {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .contentTpl {
      margin-bottom: 15px;
    }
  }
}
.title {
  display: flex;
  align-items: center;
  .name {
    font-size: 14px;
    color: #2f80ff;
  }
  .date {
    padding-left: 15px;
    color: $--color-text-regular;
    i {
      font-size: 14px !important;
    }
    &:nth-child(2) {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
</style>
