<template>
  <div class="sec-content">
    <iep-no-data v-if="!treeList.length" complex></iep-no-data>
    <div class="large-sec" v-for="lSec in treeList" :key="lSec.sectionNumber">
      <div class="title">第{{nzhCn(lSec.sectionNumber)}}章：{{lSec.sectionName}}</div>
      <ExerciseListItem
        class="mini-sec"
        v-for="mSec in lSec.children"
        :key="mSec.id"
        :item="mSec"
        :situationId="formData.situationId"
      ></ExerciseListItem>
    </div>
  </div>
</template>
<script>
import nzhcn from "nzh/cn";
import { getInfoTestingById } from "@/api/qms/course_info_section";
import ExerciseListItem from "../ExerciseListItem";
export default {
  props: ["formData"],
  components: {
    ExerciseListItem,
  },
  data() {
    return {
      treeList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    nzhCn(number) {
      return nzhcn.encodeS(number);
    },
    async loadPage() {
      const { data } = await getInfoTestingById(this.formData.id);
      this.treeList = data;
    },
  },
};
</script>
