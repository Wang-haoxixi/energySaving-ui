<template>
  <div class="app-store-detail">
    <div class="app-store-detail-content">
      <left-box ref="LeftBox" @load-page="loadPage"></left-box>
      <right-box ref="RightBox"></right-box>
    </div>
  </div>
</template>
<script>
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import { getAppStoreById } from "@/api/admin/app_store";
import { AppStoreEntity } from "@/views/operate/app_store/options";
export default {
  components: {
    LeftBox,
    RightBox,
  },
  data() {
    return {
      form: new AppStoreEntity(),
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getAppStoreById(this.$route.params.id);
      this.form = this.$mergeByFirst(new AppStoreEntity(), data);
      this.$refs["LeftBox"].loadData(this.form);
      this.$refs["RightBox"].loadData(this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-store-detail {
  padding: 40px 0;
  background-color: #fff;
  .app-store-detail-content {
    width: 1200px;
    margin: 0 auto 65px;
    display: grid;
    margin-bottom: 15px;
    grid-auto-flow: row dense;
    grid-row-gap: 20px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 200px) minmax(100px, 975px);
  }
}
</style>
