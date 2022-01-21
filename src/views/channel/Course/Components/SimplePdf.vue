<template>
  <div class="pdf-wrap iep-basic-scroll">
    <pdf ref="pdf" class="pdf-page" v-for="i in numPages" :key="i" :src="src" :page="i"></pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  name: "SimplePdf",
  props: ["src"],
  components: {
    pdf,
  },
  data() {
    return {
      numPages: null, // pdf 总页数
    };
  },
  mounted() {
    this.getNumPages();
  },
  methods: {
    // 计算pdf页码总数
    getNumPages() {
      const loadingTask = pdf.createLoadingTask(this.src);
      loadingTask.promise
        .then(pdf => {
          this.numPages = pdf.numPages;
        })
        .catch(err => {
          console.error("pdf 加载失败", err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.pdf-wrap {
  height: calc(100vh - 230px);
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 5px;
  .pdf-page {
    border: 1px solid #aaa;
    margin: 10px;
  }
}
</style>
