<template>
  <div class="thought-page">
    <div class="page" v-show="total > 0">
      <library
        ref="library"
        @load-page="submitCallBack"
        :dataList="dataList"
        :params="params"
        @fresh-right="freshRight"
        @fresh-all="freshAll"
      ></library>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="params.current"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <div class="no-data" v-show="total === 0">
      <img src="/img/default/default-nodata1.png" alt />
      <div class="title">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import library from "./library";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    nameList: [],
  };
};

export default {
  components: { library },
  props: {
    requestFn: {
      default: () => {},
    },
    paramData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      form: initFormData(),
      dataList: [],
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    };
  },
  methods: {
    submitCallBack() {
      this.loadPage();
    },
    loadPage() {
      this.requestFn(Object.assign({}, this.params, this.paramData)).then(
        ({ data }) => {
          this.$set(this, "dataList", data.records);
          this.total = data.total;
        },
      );
    },
    currentChange(val) {
      document.getElementsByClassName("iep-basic-scroll")[0].scrollTo(0, 430);
      this.params.current = val;
      this.loadPage();
    },
    freshRight(val) {
      this.$emit("fresh-right", val);
    },
    freshAll() {
      this.$emit("fresh-all", true);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.thought-page {
  width: 100%;
  .no-data {
    img {
      margin: auto;
      display: block;
    }
    .title {
      text-align: center;
      color: $--color-text-secondary;
    }
  }
}
</style>
