<template>
  <div class="total-wrapper" v-loading="loading">
    <iep-wrapper title="平台数据总量概览">
      <data-list :value="datas"></data-list>
    </iep-wrapper>
  </div>
</template>
<script>
import DataList from "./Components/DataList";
import { getWholeCount } from "@/api/dms/comprehensive";

export default {
  components: {
    DataList,
  },
  data() {
    return {
      loading: false,
      datas: {
        user: 0,
        so: 0,
        task: 0,
        material: 0,
        order: 0,
        questionnaire: 0,
        activity: 0,
        product: 0,
        thought: 0,
        orderAmount: 0,
        specialColumn: 0,
        quesPartNum: 0,
        activityPersonNum: 0,
      },
    };
  },
  methods: {
    async loadPage() {
      const { data } = await getWholeCount();
      if (data) {
        this.datas = {
          user: data.userCount,
          so: data.soCount,
          task: data.taskCount,
          material: data.materialCount,
          order: data.orderCount,
          questionnaire: data.questionnaireCount,
          activity: data.activityCount,
          product: data.productCount,
          thought: data.thoughtCount,
          orderAmount: data.orderPriceCount,
          specialColumn: data.specialColumnCount,
          quesPartNum: data.quesPartNumCount,
          activityPersonNum: data.activityPersonNumCount,
        };
      }
    },
  },
  created() {
    this.loadPage();
  },
};
</script>