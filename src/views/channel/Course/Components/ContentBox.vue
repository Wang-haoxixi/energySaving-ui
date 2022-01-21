<template>
  <div>
    <div class="content-title">课程目录</div>
    <div class="content-wrap">
      <div class="large-sec" v-for="lSec in treeList" :key="lSec.sectionNumber">
        <div class="title">第{{nzhCn(lSec.sectionNumber)}}章：{{lSec.sectionName}}</div>
        <ContentListItem class="mini-sec" v-for="mSec in lSec.children" :key="mSec.id" :item="mSec"></ContentListItem>
      </div>
    </div>
  </div>
</template>
<script>
import nzhcn from "nzh/cn";
import { getInfoOutlineById } from "@/api/qms/course_info_section";
import ContentListItem from "./ContentListItem";
export default {
  components: {
    ContentListItem,
  },
  data() {
    return {
      treeList: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    nzhCn(number) {
      return nzhcn.encodeS(number);
    },
    async loadPage() {
      const { data } = await getInfoOutlineById(this.id);
      this.treeList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.content-title {
  margin-bottom: 20px;
  font-size: 16px;
  color: $--color-text-primary;
}
.large-sec {
  font-size: 14px;
  color: $--color-text-primary;
  .title {
    margin: 10px 0;
  }
}
</style>
