<template>
  <component
    @onView="handleView"
    @onEdit="handleEdit"
    @onGoBack="handleGoBack"
    @onGuide="handeleGuide"
    :record="record"
    :isEdit="isEdit"
    :is="currentComponet"
  ></component>
</template>

<script>
// 动态切换组件
import List from "./Page/List";
import Edit from "./Page/Edit";
import Guide from "../testQuestionsLibrary/Page/guide";

export default {
  name: "TableListWrapper",
  components: {
    List,
    Edit,
    Guide,
  },
  data() {
    return {
      currentComponet: "List",
      record: null,
      isEdit: true,
    };
  },
  methods: {
    handeleGuide() {
      this.currentComponet = "Guide";
    },
    handleView(record) {
      this.record = record;
      this.currentComponet = "Edit";
      this.isEdit = false;
    },
    handleEdit(record) {
      this.record = record;
      this.currentComponet = "Edit";
      this.isEdit = true;
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
