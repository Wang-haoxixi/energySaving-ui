<template>
  <div class="remark">
    <!-- 原创 -->
    <div
      class="remark-text"
      v-if="formData.isOriginal === '1' && formData.beenModifiedTwice === '0'"
    >
      <p>本文由</p>
      <span
        @click="$openPage(`/channel/styles/user/${formData.createBy}/index`)"
      >{{formData.realName}}</span>
      <p>发布于节能保平台，未经许可，禁止转载。</p>
    </div>
    <!-- 转载 -->
    <div
      class="remark-text"
      v-else-if="formData.isOriginal === '0' && formData.beenModifiedTwice === '0'"
    >
      <span v-if="formData.originalLink" @click="handleUrlPush">原文</span>
      <p v-else>原文</p>
      <p>由{{formData.createUser}}发布于{{formData.platformSource || '其他平台'}}，由</p>
      <span
        @click="$openPage(`/channel/styles/user/${formData.createBy}/index`)"
      >{{formData.realName}}</span>
      <p>转载至节能保平台，未经许可，禁止转载。如涉及作品内容、版权和其它问题，请在30日内与本平台联系，我们将在第一时间处理。</p>
    </div>
    <!-- 二次修改原创内容 -->
    <div
      class="remark-text"
      v-if="formData.isOriginal === '1' && formData.beenModifiedTwice === '2'"
    >
      <span v-if="formData.originalLink" @click="handleUrlPush">原文</span>
      <p>由{{formData.oldCreateUploadName}}发布于节能保平台，由</p>
      <span
        @click="$openPage(`/channel/styles/user/${formData.createBy}/index`)"
      >{{formData.realName}}</span>
      <p>二次创作后发布,未经许可，禁止转载。如涉及作品内容、版权和其它问题，请在30日内与本平台联系，我们将在第一时间处理。</p>
    </div>
    <!-- 二次修改转载内容 -->
    <div
      class="remark-text"
      v-if="formData.isOriginal === '1' && formData.beenModifiedTwice === '1'"
    >
      <span v-if="formData.originalLink" @click="handleUrlPush">原文</span>
      <p>由{{formData.oldCreateUploadName}}转载至节能保平台，由</p>
      <span
        @click="$openPage(`/channel/styles/user/${formData.createBy}/index`)"
      >{{formData.realName}}</span>
      <p>二次创作后发布，未经许可，禁止转载。如涉及作品内容、版权和其它问题，请在30日内与本平台联系，我们将在第一时间处理。</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  methods: {
    transfUrl(url) {
      if (url.slice(0, 4) === "http") {
        return url;
      } else {
        return `http://${url}`;
      }
    },
    handleUrlPush() {
      if (this.formData.originalMaterialId === 0) {
        this.$confirm("您即将访问外部网站，是否确定要继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$openPage(this.transfUrl(this.formData.originalLink), 2);
          })
          .catch(() => {});
      } else {
        this.$openPage(this.formData.originalLink, 2);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remark {
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 14px;
  span {
    color: $--color-secondary;
    cursor: pointer;
  }
  p {
    display: inline;
  }
}
</style>
