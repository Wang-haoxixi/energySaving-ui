<template>
  <div class="iep-basic-scroll">
    <el-dialog
      class="iep-dialog"
      :class="{noScroll}"
      :width="width"
      :visible="dialogShow"
      append-to-body
      :close-on-click-modal="closeOnClickModal"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div slot="title" class="dialog-title-box">
        <span class="dialog-title" v-if="!isTitleSlot">{{ title }}</span>
        <slot name="title" v-else></slot>
      </div>
      <el-scrollbar v-if="dialogShow" wrap-class="wrap-dialog" view-class="view-dialog">
        <slot></slot>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "IepDialog",
  inheritAttrs: false,
  props: {
    dialogShow: {
      default: false,
      type: Boolean,
    },
    isTitleSlot: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      default: "30%",
      type: String,
    },
    closeOnClickModal: {
      default: false,
      type: Boolean,
    },
    noScroll: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      fullscreen: false,
    };
  },
  watch: {
    dialogShow(n) {
      if (n) {
        this.$emit("mounted");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// .iep-dialog ::v-deep .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
.noScroll ::v-deep .el-scrollbar__wrap {
  overflow-y: hidden;
}
.noScroll ::v-deep .is-vertical {
  display: none;
}
.iep-dialog ::v-deep .el-dialog__body {
  padding: 10px 20px;
}
.iep-dialog ::v-deep .el-dialog__footer {
  padding: 0 35px 30px;
  text-align: left;
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
.iep-dialog ::v-deep .wrap-dialog {
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  max-height: 55vh;
  // padding: 8px 0 30px;
  // overflow: hidden;
}
.iep-dialog ::v-deep .view-dialog {
  padding: 0 5px;
  // next-line 临时修复dialog内容高度问题，出解决方案后删除
  margin-bottom: 17px;
}
.iep-dialog ::v-deep .el-input-number__increase,
.iep-dialog ::v-deep .el-input-number__decrease {
  height: 17px;
  line-height: 17px;
}

.iep-dialog ::v-deep .el-select__tags {
  height: 36px;
  overflow-x: hidden;
  .el-tag {
    height: 30px !important;
    line-height: 30px !important;
    margin: 3px;
  }
}
.dialog-title {
  float: none;
  height: inherit;
  font-family: "微软雅黑";
  color: #303031;
  overflow: hidden;
  margin: 0;
  padding-left: 0;
  line-height: 26px;
  font-size: 16px;
}
.dialog-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 24px;
  height: 24px;
  padding-right: 20px;
}
.iep-dialog ::v-deep .el-form-item__content .el-button {
  padding: 0 20px;
  height: 36px;
  line-height: 34px;
}
.iep-dialog ::v-deep .tag-box span {
  line-height: 36px;
  height: 36px;
}
.iep-dialog ::v-deep .tag-box .button-new-tag {
  line-height: 34px;
  height: 36px;
}
.iep-dialog ::v-deep .el-input__icon {
  line-height: 36px;
}
// 迁移 element.scss
.iep-dialog ::v-deep .el-dialog {
  border-radius: $--border-radius-base;
}

.iep-dialog ::v-deep {
  .el-dialog {
    .el-input-number.is-controls-right {
      .el-input-number__increase,
      .el-input-number__decrease {
        height: 17px;
        line-height: 17px;
      }
    }
    .el-scrollbar__bar.is-horizontal,
    .el-scrollbar__bar {
      display: none;
      opacity: 0;
    }
    .item-wrapper .el-tag {
      margin-right: 5px;
    }
    .tag-box > * {
      margin-left: 5px;
    }
    .el-radio,
    .el-switch {
      height: 36px;
      line-height: 36px;
    }
    .el-input-number {
      height: 36px;
      line-height: 36px;
    }

    .el-form-item .avatar-uploader .btn-wrap .btn {
      height: 36px;
    }
    .iep-form-detail label {
      height: 36px;
    }
    .el-form-item .el-form-item__label,
    .el-switch__label,
    .el-input .el-input .el-input__icon {
      height: 36px;
      line-height: 36px;
    }
    .el-input__inner {
      height: 36px;
    }
    .el-tag--mini {
      height: 28px;
      line-height: 26px;
    }
    .el-form-item__content .el-button {
      height: 36px;
    }
    .el-input.el-input--suffix {
      height: auto;
    }
    .bei-unit::after {
      width: 56px;
      height: 34px;
      line-height: 34px;
    }
    .contacts-box > * {
      margin-top: -2px;
    }
    // 所有标签大小固定
    .el-form-item__content .el-tag {
      margin-bottom: 5px !important;
      height: 26px;
      line-height: 24px;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 5px;
    }
    // 唯有info类型的tag 改变其特定颜色
    .el-form-item__content .el-tag--info {
      height: 36px;
      line-height: 36px;
      .el-tag__close {
        font-size: 14px;
      }
    }
    .el-transfer-panel {
      width: 213px;
    }
    .el-transfer__buttons {
      padding: 0 19px;
      display: inline-flex;
      flex-direction: column;
      width: 120px;
      .el-button + .el-button {
        margin: 0;
      }
    }
    // .el-dialog__body {
    //   padding-bottom: 30px;
    // }
    ::-webkit-scrollbar,
    .el-table__body-wrapper::-webkit-scrollbar {
      border-radius: $--border-radius-base;
      width: 6px;
      height: 10px;
    }
    ::-webkit-scrollbar-track,
    .el-dialog .el-table__body-wrapper::-webkit-scrollbar-track {
      border-radius: $--border-radius-base;
      transition: 0.3s background-color;
      transition: 0.3s background-color;
    }
    ::-webkit-scrollbar-thumb,
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      border-radius: $--border-radius-base;
      background-color: #ddd;
      transition: 0.3s background-color;
      display: none;
      transition: all 0.5s;
    }
    :hover::-webkit-scrollbar-thumb,
    .el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
      display: block;
    }
  }
}

.iep-dialog ::v-deep .el-dialog .dialog-footer .el-button + .el-button {
  margin-right: 10px !important;
}
.iep-dialog
  ::v-deep
  .el-dialog
  .dialog-footer
  .el-button
  + .el-button.is-plain {
  &:hover {
    // background-color: #feeceb;
    background-color: $--color-fifth;
    color: $--color-primary;
  }
}
.iep-dialog ::v-deep .el-dialog .dialog-footer .el-button--default:hover {
  // background-color: #feeceb;
  background-color: $--color-fifth;
  color: $--color-primary;
}
.iep-dialog ::v-deep .footer-bar .el-button {
  padding: 0 20px;
  height: 36px;
  font-size: 14px;
  &:nth-child(1) {
    margin-right: 10px;
  }
}
</style>
