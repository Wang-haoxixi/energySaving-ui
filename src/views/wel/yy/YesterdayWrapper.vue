<template>
  <div class="yesterday-wrapper" v-loading="loading">
    <iep-wrapper title="平台昨日新增数据统计">
      <data-list :value="datas"></data-list>
    </iep-wrapper>
  </div>
</template>
<script>
import DataList from "./Components/DataList";
import { getYesterdayNewCount } from "@/api/dms/comprehensive";
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
      const { data } = await getYesterdayNewCount();
      if (data) {
        this.datas = {
          user: data.userYesCount,
          so: data.soYesCount,
          task: data.taskYesCount,
          material: data.materialYesCount,
          order: data.orderYesCount,
          questionnaire: data.questionnaireYesCount,
          activity: data.activityYesCount,
          product: data.productYesCount,
          thought: data.thoughtYesCount,
          orderAmount: data.orderPriceYesCount,
          specialColumn: data.specialColumnYesCount,
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