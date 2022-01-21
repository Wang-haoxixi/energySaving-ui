<template>
  <div class="detail-grid" v-loading="loading">
    <order-process ref="order-process" :form="form" @loadPage="loadPage"></order-process>
    <order-info v-if="['0','1'].includes(form.status)" :form="form"></order-info>
    <product-info :form="form"></product-info>
  </div>
</template>
<script>
import OrderInfo from "./Components/OrderInfo";
import ProductInfo from "./Components/ProductInfo";
import OrderProcess from "./Components/OrderProcess";
import { getMyOrderDetail } from "@/api/fms/order";
import { OrderDetailDTO } from "./options";
export default {
  components: {
    OrderInfo,
    ProductInfo,
    OrderProcess,
  },
  data() {
    return {
      form: new OrderDetailDTO(),
      loading: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async loadPage() {
      this.loading = true;
      const { data } = await getMyOrderDetail(this.id);
      if (data) {
        this.form = this.$mergeByFirst(new OrderDetailDTO(), data);
        this.$nextTick(() => {
          this.$refs["order-process"].countdown(this.form);
        });
      }
      this.loading = false;
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.detail-grid {
  display: grid;
  grid-template-rows: fit fit fit;
  gap: 20px;
}
</style>