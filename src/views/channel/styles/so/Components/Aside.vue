<template>
  <div class="grid-container" v-loading="loading">
    <div class="main-box">
      <MainBox :value="form" />
    </div>
    <div class="info-box">
      <InfoBox :value="form" />
    </div>
    <div class="data-box">
      <DataBox />
    </div>
    <!-- <div v-if="false" class="relation-box">
      <RelationBox />
    </div>-->
  </div>
</template>
<script>
import { getOrgShowById } from "@/api/admin/org";
import { OrgEntity } from "@/types/org";
import MainBox from "./MainBox";
import InfoBox from "./InfoBox";
import DataBox from "./DataBox";
// import RelationBox from "./RelationBox";
export default {
  components: {
    MainBox,
    InfoBox,
    DataBox,
    // RelationBox,
  },
  data() {
    return {
      loading: false,
      form: new OrgEntity(),
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(id = this.$route.params.id) {
      this.loading = true;
      try {
        const { data } = await getOrgShowById(id);
        if (data) {
          this.form = this.$mergeByFirst(new OrgEntity(), data);
          // this.$router.replace({ query: { isJoin: this.form.isJoin } });
          this.$emit("changeIsJoin", this.form.isJoin);
        } else {
          this.$router.go(-1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 370px 380px 240px;
  gap: 20px;
  grid-template-areas: "main-box" "info-box" "data-box";
}
[class$="-box"] {
  background: #fff;
  border-radius: $--border-radius-base;
  padding: 20px;
}
.main-box {
  grid-area: main-box;
}

.info-box {
  grid-area: info-box;
}

.data-box {
  grid-area: data-box;
}

// .relation-box {
//   grid-area: relation-box;
// }
</style>
