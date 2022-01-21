<template>
  <component
    @onGoBack="handleGoBack"
    @onGuide="handeleGuide"
    :record="record"
    :is="currentComponet"
  ></component>
</template>

<script>
// 动态切换组件
import List from "./Page/List";
import Guide from "../testQuestionsLibrary/Page/guide";
export default {
  name: "TableListWrapper",
  components: {
    List,
    Guide,
  },
  data() {
    return {
      currentComponet: "List",
      record: null,
    };
  },
  methods: {
    handeleGuide() {
      this.currentComponet = "Guide";
    },
    handleGoBack(record) {
      this.record = record;
      this.currentComponet = "List";
    },
  },
  watch: {
    "$route.path"() {
      this.record = null;
      this.currentComponet = "List";
    },
  },
};
</script>
