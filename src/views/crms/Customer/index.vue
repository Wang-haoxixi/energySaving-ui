<template>
  <div class="custom">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='MyCustomer'" v-slot:MyCustomer>
          <my-customer></my-customer>
        </template>
        <template v-if="tabName ==='ColCustomer'" v-slot:ColCustomer>
          <col-customer></col-customer>
        </template>
        <template v-if="tabName ==='AllCustomer'" v-slot:AllCustomer>
          <all-customer></all-customer>
        </template>
        <template v-if="tabName ==='HighSeas'" v-slot:HighSeas>
          <high-seas></high-seas>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import AllCustomer from "./AllCustomer/";
import ColCustomer from "./ColCustomer/";
import MyCustomer from "./MyCustomer/";
import HighSeas from "./HighSeas";
import { hasPermissions } from "@/util/menu";
export default {
  components: { AllCustomer, ColCustomer, MyCustomer, HighSeas },
  data() {
    return {
      disabled: true,
      tabName: "MyCustomer",
      tabList: [
        {
          label: "我的客户",
          value: "MyCustomer",
        },
        {
          label: "协作客户",
          value: "ColCustomer",
        },
        {
          label: "全部客户",
          value: "AllCustomer",
          disabled: this.client_info_all,
        },
        {
          label: "客户公海",
          value: "HighSeas",
        },
      ],
    };
  },
  computed: {
    client_info_all: () => hasPermissions("client_info_all"),
  },
};
</script>
<style lang="scss" scoped>
.custom {
  position: relative;
}
.custom ::v-deep {
  .el-tabs__header {
    width: 50%;
    background: none;
  }
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>