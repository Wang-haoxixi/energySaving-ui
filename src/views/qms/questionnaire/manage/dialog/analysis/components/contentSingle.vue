<template>
  <div class="content-wrapper" v-loading="loading">
    <!-- header -->
    <div-header
      :menuList="menuList"
      @change-menu-list="changeMenuList"
      ref="divHeader"
      :data="data"
    ></div-header>
    <!-- 填空 -->
    <div-choice v-if="data.type === '6'||data.type === '7'" :data="data"></div-choice>
    <!-- 打分题 -->
    <div-rate
      v-else-if="data.type === '8'"
      :data="data"
      ref="rate"
      :statisticData="statisticData"
      @change-type="changeType"
      :defaultG="defaultG"
      :columnData="columnData"
    ></div-rate>
    <!-- 上传题 -->
    <div-uploader v-else-if="data.type === '9'" :data="data"></div-uploader>
    <div v-else>
      <div-other
        :statisticData="statisticData"
        ref="other"
        :data="data"
        :defaultG="defaultG"
        @change-type="changeType"
        :columnData="columnData"
      ></div-other>
    </div>
  </div>
</template>
<script>
import DivHeader from "./header";
import DivChoice from "./choice";
import DivRate from "./rate";
import DivOther from "./other";
import DivUploader from "./uploader";
import { statistic } from "@/api/qms/questionnaire";
// import { getQuestionAnswerPage } from "@/api/qms/answer";
export default {
  data() {
    return {
      columnData: [],
      data: {},
      defaultG: "bar",
      statisticData: {},
      value: "",
      // menuList: [],
      loading: true,
    };
  },
  props: {
    menuList: {
      type: Array,
      default: () => {},
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      if (this.menuList.length) {
        this.data = this.menuList[0];
        this.statistic(this.data.id);
      } else {
        this.loading = false;
      }
    },
    statistic(id) {
      if (!["6", "7"].includes(this.data.type)) {
        this.loading = true;
        statistic(id)
          .then(({ data }) => {
            this.statisticData = data;
            this.setColumnData(this.data, this.statisticData);
            this.init();
            this.loading = false;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    changeType(type) {
      this.defaultG = type;
    },
    changeMenuList(id) {
      this.data = this.menuList.find(v => {
        return v.id === id;
      });
      this.statistic(id);
    },
    init() {
      if (["1", "2", "3", "4", "5", "8"].includes(this.data.type)) {
        if (
          ["2", "4", "8"].includes(this.data.type) &&
          (this.defaultG === "pie" || this.defaultG === "pieDoughnut")
        ) {
          this.defaultG = "bar";
        }
        this.$nextTick(() => {
          this.data.type === "8"
            ? this.$refs.rate.init()
            : this.$refs.other.init();
        });
      }
    },
    changeChart(row) {
      this.type = row;
    },
    setColumnData(par, par2 = {}) {
      if (par.type === "8") {
        this.columnData = par.optionList.map(v => {
          const temp = {};
          par2[v.name].forEach((item, index) => {
            temp[index + "分"] = item;
          });
          return {
            name: v.name,
            ...temp,
          };
        });
      } else if ((par.type === "1" || par.type === "2") && par2.answerContent) {
        const answerContent = par2.answerContent.map(itemPeo => {
          const objAnswer = {};
          itemPeo.split(",").forEach(itemOpt => {
            // ,分割
            const arrOpt = itemOpt.split("^");
            objAnswer[arrOpt[0]] = arrOpt[1];
          });
          return objAnswer;
        });
        this.columnData = par.optionList.map(v => {
          const newAnswerCont = [];
          answerContent.forEach(item => {
            if (item[v.name]) {
              newAnswerCont.push({ answer: item[v.name] });
            }
          });
          return {
            name: v.name,
            value: par2[v.name] || 0,
            answerContent: newAnswerCont,
            eyeShow: false,
          };
        });
      } else {
        this.columnData = par.optionList.map(v => {
          return {
            name: v.name,
            value: par2[v.name] || 0,
          };
        });
      }
    },
  },
  watch: {
    defaultG() {
      this.init();
    },
  },
  components: {
    DivHeader,
    DivChoice,
    DivRate,
    DivOther,
    DivUploader,
  },
};
</script>