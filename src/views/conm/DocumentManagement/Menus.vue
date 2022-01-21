<template>
  <div calss="menus">
    <a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys="openKeys" @openChange="onOpenChange" mode="inline">
      <a-sub-menu v-for="item in data" :key="item.id">
        <span slot="title">
          <span>{{ item.levelName }}</span>
        </span>
        <a-menu-item v-for="t in item.childrens" :key="t.id">{{
          t.levelName
        }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      current: ["mail"],
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      data: [
        {
          id: 1,
          levelName: "国脉集团",
          childrens: [
            { levelName: "sdada", id: 2 },
            { levelName: "asasds", id: 3 },
          ],
        },
        {
          id: 4,
          levelName: "国脉集团",
          childrens: [
            { levelName: "sdada", id: 5 },
            { levelName: "asasds", id: 6 },
          ],
        },
        {
          id: 7,
          levelName: "国脉集团",
          childrens: [
            { levelName: "sdada", id: 8 },
            { levelName: "asasds", id: 9 },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(e) {
      this.$emit("change_page", e.key);
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1,
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menus {
  height: 100%;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
