<template>
  <div class="statistics-wrapper" v-loading="pdfLoading">
    <div-header
      title="分析报告"
      @back="onBack"
      isAnalysis
      @change-isAll="onChangeIsAll"
      :isAll="isAll"
      isBack
      @html2pdf="html2pdf"
    ></div-header>
    <div ref="contentPDF">
      <p v-if="pdfLoading&&name" class="title">{{name}}</p>
      <div-content ref="divContent" :isAll="isAll"></div-content>
    </div>
  </div>
</template>
<script>
import DivHeader from "../components/header";
import DivContent from "./components/content";
import html2pdf from "./html2pdf";

export default {
  components: {
    DivHeader,
    DivContent,
  },
  data() {
    return {
      isAll: false,
      loading: false,
      pdfLoading: false,
      name: "",
    };
  },
  methods: {
    open({ id, name }) {
      //获得问卷的回答率
      this.name = name;
      this.$refs.divContent.getData(id);
    },
    onBack() {
      this.$emit("close");
    },
    onChangeIsAll() {
      //切换显示全部/显示单题
      this.$refs.divContent.loading = true;
      clearTimeout(this.timer);
      // 题量高时渲染会卡顿导致loading无法展示，需要延迟加载一下
      this.timer = setTimeout(() => {
        this.isAll = !this.isAll;
        clearTimeout(this.timer);
        this.$refs.divContent.loading = false;
      }, 100);
    },
    html2pdf() {
      this.pdfLoading = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const html = this.$refs["contentPDF"];
        const result = await html2pdf(html, true);
        this.pdfLoading = false;
        clearTimeout(this.timer);
        result.save(`${this.name}分析报告.pdf`);
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.sealect-wrap {
  display: flex;
  flex-direction: row-reverse;
}
.title {
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
}
</style>
