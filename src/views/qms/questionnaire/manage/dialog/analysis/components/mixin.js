import echarts from "echarts";
export default {
  data() {
    return {
      chart: null,
      name: "",
    };
  },
  props: {
    className: {
      type: String,
      default: "charts",
    },
    data: {
      type: Object,
      default: () => { },
    },
    statisticData: {
      type: Object,
      default: () => { },
    },
  },
  watch: {
    data: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  methods: {
    init() {
      this.chart = echarts.init(this.$refs["chart"]);
      this.loadMap();
    },
    downLoad() {
      // const image = this.chart.getConnectedDataURL();
      const image = this.chart.getDataURL();
      const $a = document.createElement("a");
      $a.setAttribute("href", image);
      $a.setAttribute("download", this.data.title + `-${this.name}`);
      $a.click();
    },
    formatter(params, b, c = 10) {
      if (!params) {
        return "";
      }
      let newParamsName = "";
      const paramsNameNumber = params.length;
      const provideNumber = c;
      const rowNumber = Math.ceil(paramsNameNumber / provideNumber);
      let time = 0;
      if (paramsNameNumber > provideNumber) {
        for (let p = 0; p < rowNumber; p++) {
          let tempStr = "";
          const start = p * provideNumber;
          const end = start + provideNumber;
          time++;

          if (p == rowNumber - 1) {
            tempStr = params.substring(start, paramsNameNumber);
          } else {
            if (b && time >= b) {
              tempStr = params.substring(start, end - 1);
              newParamsName += tempStr + "......";
              return newParamsName;
            }
            tempStr = params.substring(start, end) + "\n";
          }
          newParamsName += tempStr;
        }
      } else {
        newParamsName = params;
      }
      return newParamsName;
    },
    axisLabelFormatter(l) {
      return (v) => {
        const c = Math.ceil(32 / l);
        if (v.length > c) {
          return this.formatter(v, 2, c);
        } else {
          return v;
        }
      };

    },
  },
};
