<template>
  <div class="content-wrapper" v-loading="loading">
    <div-content-single v-if="menuList.length&&!isAll" :menuList="menuList"></div-content-single>
    <div-content-all v-else-if="menuList.length&&isAll" isAll :menuList="menuList"></div-content-all>
    <div v-else class="no-data">{{loading?"正在努力读取数据...":"很抱歉，没有检索到数据..."}}</div>
  </div>
</template>
<script>
// import DivHeader from "./header";
// import DivChoice from "./choice";
// import DivRate from "./rate";
// import DivOther from "./other";
import DivContentSingle from "./contentSingle.vue";
import DivContentAll from "./contentAll.vue";
import { getDataById } from "@/api/qms/questionnaire";
// import { getQuestionAnswerPage } from "@/api/qms/answer";
export default {
  data() {
    return {
      menuList: [],
      loading: true,
    };
  },
  props: {
    isAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getData(id) {
      this.loading = true;
      getDataById(id)
        .then(({ data }) => {
          this.menuList = data.quesQuestionDTO;
          this.menuList = this.menuList.filter(v => {
            return v.type !== "10";
          });
          this.loading = false;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          this.loading = false;
        });
    },
  },
  watch: {},
  components: {
    // DivHeader,
    // DivChoice,
    // DivRate,
    // DivOther,
    DivContentSingle,
    DivContentAll,
  },
};
</script>
<style lang="scss" scoped>
.content-wrapper {
  margin-top: 20px;
  .no-data {
    text-align: center;
    line-height: 100px;
    font-size: 20px;
    color: $--color-text-secondary;
  }
  ::v-deep .title {
    font-size: 16px;
  }
  ::v-deep .tips {
    display: block;
    margin-top: 5px;
  }
}
</style>