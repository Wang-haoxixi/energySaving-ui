<template>
  <component
    @onEdit="handleEdit"
    @onGoBack="handleGoBack"
    @onGuide="handeleGuide"
    @onCertificatePersonList="handelePersonList"
    :record="record"
    :is="currentComponet"
  ></component>
</template>

<script>
// 动态切换组件
import List from "./Page/List";
import Edit from "./Page/Edit";
import Guide from "../testQuestionsLibrary/Page/guide";
import CertificatePersonList from "./Page/CertificatePersonList";
export default {
  name: "TableListWrapper",
  components: {
    List,
    Guide,
    CertificatePersonList,
    Edit,
  },
  data() {
    return {
      currentComponet: "List",
      record: null,
    };
  },
  methods: {
    handleEdit(record) {
      this.record = record;
      this.currentComponet = "Edit";
    },
    handeleGuide() {
      this.currentComponet = "Guide";
    },
    handleGoBack(record) {
      this.record = record;
      this.currentComponet = "List";
    },
    handelePersonList(record) {
      this.record = record;
      this.currentComponet = "CertificatePersonList";
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
