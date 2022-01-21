<template>
  <component
    @onEdit="handleEdit"
    @onGoBack="handleGoBack"
    @onGuide="handeleGuide"
    @onManage="handleManage"
    :record="record"
    :is="currentComponet"
  ></component>
</template>

<script>
// 动态切换组件
import List from "./Page/List";
import Edit from "./Page/Edit";
import Manage from "./Page/scoreManage";
import Guide from "../testQuestionsLibrary/Page/guide";

export default {
  name: "TableListWrapper",
  components: {
    List,
    Edit,
    Guide,
    Manage,
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
    handleEdit(record) {
      this.record = record;
      this.currentComponet = "Edit";
    },
    handleGoBack(record) {
      this.record = record;
      this.currentComponet = "List";
    },
    handleManage(record) {
      this.record = record;
      this.currentComponet = "Manage";
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
