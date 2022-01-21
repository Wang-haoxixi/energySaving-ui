<template>
  <div>
    <el-row>
      <el-col :span="24" style="height:300px">
        <pie :list="list"></pie>
      </el-col>
      <el-col :span="24">
        <columnar :data="data2"></columnar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pie from "./echart/pie";
import columnar from "./echart/columnar";
export default {
  components: { pie, columnar },
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data1: [
        {
          name: "诊断字段数量比率",
          value: 42,
        },
        {
          name: "异常字段数量比率",
          value: 44,
        },
        {
          name: "脏数据数量比率",
          value: 35,
        },
      ],
      data2: {
        title: [],
        value: [],
      },
    };
  },
  created() {
    this.list.list.forEach((element, index) => {
      if (index < 5) {
        // if(element.dataFieldName.length > 20){
        //     this.data2.title.push(element.dataFieldName.substr(0,17) + '...')
        // }else{
        this.data2.title.push(element.dataFieldName);
        // }
        this.data2.value.push((element.errorTotal / element.total) * 100);
      }
    });
  },
};
</script>
<style lang="scss" scoped>
</style>