<template>
  <TitleWrap v-show="activityList.length" name="猜你喜欢">
    <iep-activity-card v-for="(o) in activityList" :key="o.id" :activity="o"></iep-activity-card>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import { getLoveList } from "@/api/meetting/publish";
export default {
  name: "YouLike",
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
      const { data } = await getLoveList();
      this.activityList = data;
    },
  },
};
</script>
