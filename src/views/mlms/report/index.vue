<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='dailyTab'" v-slot:dailyTab>
          <daily-dialog></daily-dialog>
        </template>
        <template v-if="tabName ==='personalTab'" v-slot:personalTab>
          <personal-dialog></personal-dialog>
        </template>
        <template v-if="tabName ==='organizeTab'" v-slot:organizeTab>
          <organize-dialog></organize-dialog>
        </template>
        <!-- <template v-if="tabName ==='projectTab'" v-slot:projectTab>
        <project-dialog></project-dialog>
      </template>
      <template v-if="tabName ==='customTab'" v-slot:customTab>
        <custom-dialog></custom-dialog>
        </template>-->
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import DailyDialog from "./daily/";
import PersonalDialog from "./personal/";
import OrganizeDialog from "./organize/";
// import ProjectDialog from "./project/";
// import CustomDialog from "./custom/";
import { mapGetters } from "vuex";

export default {
  name: "report",
  mixins: [mixins],
  components: {
    DailyDialog,
    PersonalDialog,
    OrganizeDialog,
    // ProjectDialog,
    // CustomDialog,
  },
  data() {
    return {
      tabName: "dailyTab",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tabList() {
      return [
        {
          label: "日报",
          value: "dailyTab",
        },
        {
          label: "个人周/月报",
          value: "personalTab",
        },
        {
          label: "组织周/月报",
          value: "organizeTab",
        },
        // {
        //   label: "项目周报",
        //   value: "projectTab",
        // },
      ];
    },
  },
  created() {
    if (this.$route.query.type == "thoughts") {
      this.tabName = "thoughtsTab";
    }
  },
};
</script>

