<template>
  <TitleWrap v-show="activityList.length" name="强力推荐">
    <iep-activity-card v-for="(o) in activityList" :key="o.id" :activity="o"></iep-activity-card>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import { getRecommandList } from "@/api/meetting/publish";
export default {
  name: "RecommandBox",
  components: {
    TitleWrap,
  },
  data() {
    return {
      activityList: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getRecommandList();
      this.activityList = data;
    },
  },
};
</script>
