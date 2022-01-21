<template>
  <div>
    <div class="title">Ta的材料</div>
    <iep-no-data v-if="!itemList.length" complex></iep-no-data>
    <template v-else>
      <iep-material-item noCreator v-for="item of itemList" :key="item.id" :value="item"></iep-material-item>
      <load-more v-if="itemList.length>=3" path="material"></load-more>
    </template>
  </div>
</template>
<script>
import { getMaterialListByUserId } from "@/api/dms/material";
import LoadMore from "./LoadMore";
export default {
  components: {
    LoadMore,
  },
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
      getMaterialListByUserId(this.$route.params.id).then(({ data }) => {
        this.itemList = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.btn {
  margin-top: -10px;
  text-align: center;
}
.el-button {
  color: $--color-text-secondary;
  &:hover {
    color: $--color-primary;
  }
}
</style>
