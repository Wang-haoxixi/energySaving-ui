<template>
  <div class="forward">
    <div class="avatar">
      <iep-img :src="contentData.avatar" class="img"></iep-img>
    </div>
    <div class="content">
      <div class="top">
        <div class="title">
          <div class="name">{{contentData.userName}}</div>
          <div class="date">
            <i class="icon-shijian"></i>
            {{contentData.createTime}}
          </div>
        </div>
      </div>
      <contentTpl class="contentTpl" :data="contentData"></contentTpl>
      <formTpl @load-page="loadPage" :transmitId="contentData.thoughtsId" v-if="forward"></formTpl>
    </div>
  </div>
</template>

<script>
import formTpl from "./form";
import contentTpl from "./content";
export default {
  components: { contentTpl, formTpl },
  props: {
    forward: {
      type: Boolean,
      default: false,
    },
    contentData: {
      type: Object,
      default: () => {
        return {
          avatar: "",
          content: "",
          images: [],
        };
      },
    },
  },
  methods: {
    loadPage() {
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
      border-radius: $--border-radius-base;
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
    }
    .contentTpl {
      margin-bottom: 15px;
    }
  }
}
</style>

<style scoped>
.contentTpl >>> .content {
  width: 100%;
}
.contentTpl >>> .span {
  width: 100%;
}
</style>
