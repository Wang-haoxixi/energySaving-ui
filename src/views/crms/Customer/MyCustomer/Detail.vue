<template>
  <div class="my-customer">
    <iep-basic-container>
      <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
      <div class="tags">{{tags.join(" / ")}}</div>
      <div class="wraper">
        <div>
          <iep-tabs v-model="tabName" :tab-list="tabList">
            <template v-if="tabName ==='CustomerInfo'" v-slot:CustomerInfo>
              <customer-info ref="CustomerInfo"></customer-info>
            </template>
            <template v-if="tabName ==='Linker'" v-slot:Linker>
              <linker :title="title"></linker>
            </template>
            <template v-if="tabName ==='FollowRecords'" v-slot:FollowRecords>
              <follow-records></follow-records>
            </template>
            <template v-if="tabName ==='Programme'" v-slot:Programme>
              <programme></programme>
            </template>
            <template v-if="tabName ==='Information'" v-slot:Information>
              <information></information>
            </template>
          </iep-tabs>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import CustomerInfo from "../Components/CustomerInfo";
import Linker from "../Components/Linker";
import FollowRecords from "../Components/FollowRecords";
import Programme from "../Components/Programme";
import Information from "../Components/Information";
import { getPageById } from "@/api/dms/custom";
export default {
  components: {
    CustomerInfo,
    Linker,
    FollowRecords,
    Programme,
    Information,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      title: "",
      tags: [],
      tabName: "CustomerInfo",
      tabList: [
        {
          label: "客户信息",
          value: "CustomerInfo",
        },
        {
          label: "联系人",
          value: "Linker",
        },
        {
          label: "跟进记录",
          value: "FollowRecords",
        },
        {
          label: "方案",
          value: "Programme",
        },
        {
          label: "资讯",
          value: "Information",
        },
      ],
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  },
  methods: {
    load() {
      getPageById(this.id).then(res => {
        this.$refs["CustomerInfo"].form = res.data;
        this.title = res.data.name;
        this.tags = res.data.tagKeywords;
      });
    },
  },
  watch: {
    tabName(val) {
      if (val === "CustomerInfo") {
        this.load();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.my-customer {
  .tags {
    margin-bottom: 25px;
    font-size: 14px;
    color: $--color-text-secondary;
  }
  // .wraper {
  //   display: grid;
  //   grid-template-columns: 2fr 1fr;
  // }
}
</style>
