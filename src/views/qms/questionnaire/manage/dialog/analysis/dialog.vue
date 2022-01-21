<template>
  <iep-dialog :dialog-show="show" :title="title" width="900px" @close="close">
    <div class="dialog-wrapper" v-loading="pdfLoading">
      <el-button type="primary" @click="onChangeIsAll">{{isAll?"显示单题":"显示全部"}}</el-button>
      <el-button @click="html2pdf">导出成PDF</el-button>
      <!-- <div-content :isAll="isAll" ref="divContent"></div-content> -->
      <div ref="contentPDF">
        <p v-if="pdfLoading&&name" class="title">{{name}}</p>
        <div-content ref="divContent" :isAll="isAll"></div-content>
      </div>
    </div>
  </iep-dialog>
</template>
<script>
import DivContent from "./components/content";
import html2pdf from "./html2pdf";

export default {
  components: {
    DivContent,
  },
  data() {
    return {
      show: false,
      title: "分析报告",
      isAll: false,
      pdfLoading: false,
      name: "",
    };
  },
  methods: {
    open({ id, name }) {
      this.show = true;
      if (id) {
        this.$nextTick(() => {
          this.$refs.divContent.getData(id);
        });
      }
      this.name = name;
    },
    close() {
      this.show = false;
    },
    back() {
      this.$emit("close");
    },
    onChangeIsAll() {
      //切换显示全部/显示单题
      this.$refs.divContent.loading = true;
      this.timer = null;
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
::v-deep .el-table__footer-wrapper tbody td {
  background-color: #fff;
}
.title {
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
}
</style>
