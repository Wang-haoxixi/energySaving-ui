<template>
  <div class="content-header-wrapper">
    <div class="title-wrapper">
      <div class="title-box">
        <h3 class="title">
          第{{data.orderNumber}}题：{{data.title}}
          <span>[{{ getType }}]</span>
        </h3>
        <span class="tips" v-if="['1','2','3','4','5'].includes(data.type)">提示：红色加粗选项为您的答案</span>
      </div>
      <div class="body" v-if="!isAll">
        <el-select v-model="value" class="menuSelect" placeholder="请选择题目" @change="changeData">
          <el-tooltip
            v-for="item in menuList"
            :open-delay="500"
            effect="light"
            :key="item.id"
            :content="item.title"
            :disabled="!(item.title&&item.title.length>11)"
            placement="top"
          >
            <el-option class="option" :label="cutString(item.title,11)" :value="item.id"></el-option>
          </el-tooltip>
        </el-select>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      buttonList: {
        bar: {
          name: "柱状图",
          type: "bar",
          data: ["2", "4", "6", "7", "8", "9"],
        },
        pie: {
          name: "饼图",
          type: "pie",
          data: ["2", "4", "6", "7", "8", "9"],
        },
        line: {
          name: "条形图",
          type: "line",
          data: ["6", "7", "9"],
        },
        pieDoughnut: {
          name: "圆形图",
          type: "pieDoughnut",
          data: ["6", "7", "9"],
        },
      },
    };
  },
  methods: {
    changeData() {
      this.$emit("change-menu-list", this.value);
    },
    tab(row) {
      this.$emit("change-chart", row);
    },
    cutString(str, length) {
      if (str.length > 11) {
        str = str.substring(0, length);
        str += "...";
      }
      return str;
    },
  },
  watch: {
    menuList: {
      handler(val) {
        if (val && val.length) {
          this.value = val[0].id;
        }
      },
      deep: true,
    },
  },
  computed: {
    getType() {
      let title = "";
      switch (this.data.type) {
        case "1":
          title = "单选题";
          break;
        case "2":
          title = "多选题";
          break;
        case "3":
          title = "图片单选";
          break;
        case "4":
          title = "图片多选";
          break;
        case "5":
          title = "下拉题";
          break;
        case "6":
          title = "填空题";
          break;
        case "7":
          title = "多项填空";
          break;
        case "8":
          title = "打分题";
          break;
        case "9":
          title = "上传题";
          break;
        case "10":
          title = "备注说明";
          break;
      }
      return title;
    },
  },
  mounted() {
    this.value = this.menuList[0] ? this.menuList[0].id : "";
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    menuList: {
      type: Array,
      default: () => [],
    },
    isAll: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 15px;
  .tips {
    font-size: 14px;
    color: $--color-text-secondary;
  }
  .title-box {
    flex: 1;
    .title {
      font-size: 16px;
      width: 100%;
      margin-bottom: 15px;
      text-align: justify;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
  .body {
    max-width: 180px;
    margin-left: 20px;
  }
}

// .body {
// display: flex;
// flex-direction: row-reverse;
// flex-direction: column;
// }
.option {
  max-width: 200px;
  overflow: hidden;
}
</style>
