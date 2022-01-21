<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${record.methodName}试卷`" :backOption="backOption"></iep-page-header>
      <div class="withdraw-wrapper">
        <keep-alive v-if="!record.random">
          <SecondContent
            ref="SecondContent"
            @on-data="handleBack"
            :record="record"
            :isEdit="isEdit"
          ></SecondContent>
        </keep-alive>
        <keep-alive v-else>
          <ThirdContent ref="ThirdContent" @on-data="handleBack" :record="record" :isEdit="isEdit"></ThirdContent>
        </keep-alive>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import SecondContent from "./testPaper/SecondContent";
import ThirdContent from "./testPaper/ThirdContent";
export default {
  props: ["record", "isEdit"],
  components: {
    SecondContent,
    ThirdContent,
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      current: 0,
    };
  },
  methods: {
    handleBack() {
      this.back();
    },
    back() {
      this.$emit("onGoBack", {
        current: this.record.current,
        size: this.record.size,
        search: this.record.search,
      });
    },
    handleGoBack() {
      if (this.isEdit) {
        this.$confirm("此操作将不会自动保存试卷,是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("onGoBack", {
              current: this.record.current,
              size: this.record.size,
              search: this.record.search,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消返回",
            });
          });
      } else {
        this.$emit("onGoBack", {
          current: this.record.current,
          size: this.record.size,
          search: this.record.search,
        });
      }
    },
  },
};
</script>
