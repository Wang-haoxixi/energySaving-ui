<template>
  <div class="avatar-uploader">
    <div class="btn-wrap">
      <el-button
        class="btn"
        icon="el-icon-woneng-shangchuan"
        @click="handleCropper()"
      >{{value?"修改图片":"点击上传"}}</el-button>
      <slot name="btn"></slot>
      <el-tooltip v-if="tip" effect="dark" :content="tip" placement="top">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </div>
    <div class="no-avatar-wrapper" :style="{width:`${width}px`,height:`${height}px`}">
      <div class="no-img" v-if="!value">
        <i class="el-icon-picture"></i>
        <div v-if="imgTip" class="text">建议图片尺寸{{dialogWidth}}*{{dialogHeight}}, 大小不超过2M</div>
      </div>
      <iep-img v-else :src="value"></iep-img>
      <div class="delete" title="移除" @click="handleRemove()">
        <i class="el-icon-woneng-shanchu"></i>
      </div>
    </div>
    <avatar-modal
      ref="modal"
      :width="dialogWidth"
      :height="dialogHeight"
      :accept="accept"
      @ok="setAvatar"
      v-bind="$attrs"
    ></avatar-modal>
  </div>
</template>
<script>
import AvatarModal from "./Components/AvatarModal.vue";
const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
export default {
  name: "IepUploadAvatar",
  components: {
    AvatarModal,
  },
  props: {
    value: {
      required: true,
      validator: prop => typeof prop === "string" || prop === null,
    },
    tip: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 108,
    },
    dialogWidth: {
      type: Number,
      default: 500,
    },
    dialogHeight: {
      type: Number,
      default: 250,
    },
    imgTip: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 108,
    },
    accept: {
      type: String,
      default: "image/*",
    },
  },
  methods: {
    handleRemove() {
      this.$emit("input", "");
    },
    handleCropper() {
      this.$refs.modal.options.fixedNumber = [this.width / this.height, 1];
      toDataURL(`${this.value}`)
        .then(dataUrl => {
          this.$refs.modal.edit(dataUrl);
        })
        .catch(() => {
          this.$refs.modal.edit("");
        });
    },
    setAvatar(data) {
      this.$emit("input", data.url);
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  overflow: hidden;
  border: none;
  border: 0;
  background: none;
  .no-avatar-wrapper {
    cursor: pointer;
    border: 1px solid $--border-color;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .no-img {
      background-color: $--background-color;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      i {
        color: $--color-text-secondary;
        font-size: 40px;
      }
      .text {
        margin-top: 20px;
        color: $--color-text-secondary;
      }
    }
    &:hover {
      opacity: 0.7;
      .delete {
        display: flex;
      }
    }
    .delete {
      display: none;
      position: absolute;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(48, 48, 49, 0.5);
      i {
        color: #fff;
      }
    }
    .intro-text {
      display: flex;
      margin-left: 20px;
      font-size: 14px;
      color: $--color-text-regular;
      flex-direction: column;
      align-items: flex-start;
      > div {
        line-height: 30px;
      }
      .upload-text {
        color: $--color-primary;
      }
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    i {
      color: $--color-text-regular;
      margin-left: 10px;
      font-size: 14px;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: 110px;
      height: 42px;
    }
  }
}
.btn ::v-deep i {
  margin-right: 3px;
  font-size: 16px !important;
}
</style>
