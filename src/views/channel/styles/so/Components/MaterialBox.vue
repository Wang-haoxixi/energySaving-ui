<template>
  <div class="box-wrapper">
    <div class="title">材料</div>
    <div class="material-main" v-if="itemList.length">
      <iep-material-item v-for="item of itemList" :key="item.id" :value="item"></iep-material-item>
    </div>
    <iep-no-data v-else complex style="width:100%;"></iep-no-data>
  </div>
</template>
<script>
import { getMaterialListByOrgId } from "@/api/dms/material";
export default {
  data() {
    return {
      itemList: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      getMaterialListByOrgId(this.$route.params.id).then(({ data }) => {
        this.itemList = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.box-wrapper {
  justify-content: flex-start;
}
.material-main {
  width: 100%;
}
</style>
