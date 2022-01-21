<template>
  <div>
    <iep-basic-container>
      <iep-page-header title="文档管理详情" :backOption="backOption"></iep-page-header>
      <iep-operation-container
        style="border-bottom: 1px solid $--border-color;padding-bottom:15px;"
      >
        <template slot="left">
          <span>标题：{{ form.title }}</span>
          <span>发布日期：{{ form.createTime | parseToDay }}</span>
        </template>
      </iep-operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">浏览数</div>
          <iep-div-detail class="content" :value="form.views"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">图片</div>
          <iep-img :src="form.image" class="avatar"></iep-img>
        </div>
        <div class="con-item">
          <div class="title">文档内容</div>
          <IepJoditRead v-model="form.content"></IepJoditRead>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import { getPageById } from "@/api/conm/article_controller.ts";
function initForm() {
  return {
    title: "",
    image: "",
    createTime: "",
    views: "",
    content: "",
  };
}
export default {
  data() {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.loadPage();
  },
  methods: {
    loadPage() {
      getPageById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 18px;
    .title {
      margin-bottom: 10px;
      font-size: 15px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
