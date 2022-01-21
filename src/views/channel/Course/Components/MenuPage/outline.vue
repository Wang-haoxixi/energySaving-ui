<template>
  <div class="sec-content">
    <iep-no-data v-if="!treeList.length" complex></iep-no-data>
    <div class="large-sec" v-for="lSec in treeList" :key="lSec.sectionNumber">
      <div class="title">第{{nzhCn(lSec.sectionNumber)}}章：{{lSec.sectionName}}</div>
      <SectionListItem
        class="mini-sec"
        v-for="mSec in lSec.children"
        :key="mSec.id"
        :item="mSec"
        :canStudy="canStudy"
      ></SectionListItem>
    </div>
  </div>
</template>
<script>
import nzhcn from "nzh/cn";
import { getInfoOutlineById } from "@/api/qms/course_info_section";
import SectionListItem from "../SectionListItem";
export default {
  props: {
    canStudy: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SectionListItem,
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
  mounted() {
    this.loadPage();
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
.sec-content {
  margin-top: 10px;
  .large-sec {
    margin: 10px 0;
    .title {
      margin: 10px 0;
      font-weight: 600;
      font-size: 16px;
      color: $--color-text-regular;
    }
  }
}
</style>
