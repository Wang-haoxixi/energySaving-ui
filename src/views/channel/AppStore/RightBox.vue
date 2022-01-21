<template>
  <div class="right-box">
    <div class="title">
      <h1>{{form.name}}</h1>
      <span class="cost" :class="{classA:form.type==1,classB: form.type==2}">{{typeMap[form.type]}}</span>
    </div>
    <div class="custom-tags">
      <el-tag v-for="(tag, idx) in form.tags" :key="idx">{{tag}}</el-tag>
    </div>
    <div class="introduce">{{form.introduction}}</div>
    <edition></edition>
    <preview ref="Preview"></preview>
  </div>
</template>
<script>
import Edition from "./Edition";
import Preview from "./Preview";
import { AppStoreEntity } from "@/views/operate/app_store/options";
export default {
  components: {
    Edition,
    Preview,
  },
  data() {
    return {
      typeMap: {
        1: "免费",
        2: "收费",
      },
      form: new AppStoreEntity(),
      classObject: [
        {
          classA: true,
          classB: false,
        },
      ],
      tags: ["规则量化", "任务流程", "绩效统计", "任务协作", "进度追踪"],
    };
  },
  methods: {
    loadData(data) {
      this.form = { ...data };
      this.$refs.Preview.fileList = this.form.file;
    },
  },
};
</script>
<style lang="scss" scoped>
.right-box {
  .title {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    h1 {
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
  .custom-tags {
    margin: 0 -5px 0 0;
    .el-tag {
      margin: 0 5px 5px 0;
      height: 26px;
      line-height: 24px;
    }
  }
  .introduce {
    margin-top: 20px;
    padding-bottom: 25px;
    font-size: 14px;
    line-height: 28px;
    border-bottom: 1px solid $--border-color;
    color: $--color-text-regular;
  }
  .cost {
    padding: 1px 10px;
    font-size: 14px;
    line-height: 1.4;
    border: 1px solid;
    border-radius: 25px;
  }
  .classA {
    border-color: #44bf58;
    color: #44bf58;
  }
  .classB {
    border-color: $--color-primary;
    color: $--color-primary;
  }
}
</style>
