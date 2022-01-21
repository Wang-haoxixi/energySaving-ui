<template>
  <div class="category-wrapper">
    <div v-if="categoryOption&&categoryOption.typeList.length" class="classify-item">
      <span class="name">类型：</span>
      <div class="classify-con">
        <span
          :class="{active: item.id == searchForm[typeName||'type']}"
          v-for="(item) in categoryOption.typeList"
          :key="item.id"
          @click="handleSearch(item, typeName||'type')"
        >{{ item.name }}</span>
      </div>
    </div>
    <div v-if="currentItem.length" class="classify-item">
      <span class="name">类别：</span>
      <div class="classify-con">
        <span
          :class="{active: item.id == searchForm.category}"
          v-for="(item,index) in currentItem"
          :key="index"
          @click="handleSearch(item, 'category')"
        >{{ item.name }}</span>
      </div>
    </div>
    <div v-if="categoryOption&&categoryOption.area.length" class="classify-item">
      <span class="name">地区：</span>
      <div class="classify-con">
        <span
          :class="{active: item.id == searchForm.cityId}"
          v-for="(item,index) in categoryOption.area"
          :key="index"
          @click="handleSearch(item, 'cityId')"
        >{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Category",
  props: ["categoryOption", "searchForm", "typeName"],
  data() {
    return {};
  },
  computed: {
    currentItem() {
      const type = this.searchForm.type;
      if (type && this.categoryOption) {
        return this.categoryOption.typeList[type].child || [];
      }
      return [];
    },
  },
  methods: {
    handleSearch(i, p) {
      this.$emit("handleSearch", i, p);
    },
  },
};
</script>
<style lang="scss" scoped>
.category-wrapper {
  & > div {
    margin-bottom: 20px;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    height: 28px;
    line-height: 28px;
    color: $--color-text-regular;
  }
  .classify-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .classify-con {
    display: inline-block;
    vertical-align: top;
    margin-left: 15px;
    max-width: 95%;
    & > span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      padding: 0 20px;
      height: 28px;
      line-height: 28px;
      border-radius: 5px;
      color: $--color-text-secondary;
      cursor: pointer;
      i {
        font-size: 12px;
        color: $--color-text-secondary;
      }
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
    .active {
      border-color: $--color-primary;
      background-color: $--color-primary;
      color: #fff;
    }
    .tag {
      padding: 6px 10px;
      background-color: #fff;
      border: 1px solid $--border-color;
      border-radius: 4px;
      i {
        margin-left: 5px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
