<template>
  <div class="expert-search">
    <div class="search-con">
      <iep-operation-search @search-page="searchPage" :paramForm="paramForm" prop="materialName"></iep-operation-search>
    </div>
  </div>
</template>

<script>
const initParmas = () => {
  return {
    materialName: "",
  };
};

export default {
  data() {
    return {
      paramForm: initParmas(),
    };
  },
  methods: {
    searchPage(val) {
      this.$emit("load-page", val, "material");
    },
    clearSearchParam() {
      this.paramForm = initParmas();
    },
  },
};
</script>
<style scoped  lang="scss">
.expert-search {
  margin: 0 auto 25px;
  text-align: center;
  width: 300px;
  h3 {
    font-size: 24px;
    position: relative;
    .count {
      font-size: 14px;
      color: $--color-text-secondary;
    }
    .publish {
      font-size: 14px;
      color: #f74437;
      position: absolute;
      right: 0;
      line-height: 45px;
      cursor: pointer;
    }
  }
}
.search-con {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
</style>
