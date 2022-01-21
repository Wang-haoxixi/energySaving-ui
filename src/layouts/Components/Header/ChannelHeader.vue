<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header-first">
        <div class="header-left">
          <div class="menu-logo" @click="$openPage('/')" title="个人中心">
            <img src="/img/icons/logo-h180.png" alt="icon" />
            <span>节能保</span>
          </div>
        </div>
        <div class="header-center">
          <span
            class="nav iep-header-trigger"
            :class="{'iep-header-active-trigger':item.url===$route.path}"
            v-for="item in navList"
            :key="item.name"
            @click="$openPage(item.url)"
          >
            <span v-if="item.type === 1">{{item.name}}</span>
            <el-dropdown v-else-if="item.type === 2" placement="bottom">
              <span class="el-dropdown-link nav">
                {{item.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(value, name) in item.list"
                  :key="name"
                  @click.native="item.fn(item, value) || $openPage(value)"
                >{{name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span class="nav iep-header-trigger nav-search" @click="search()">
            <i class="el-icon-search" style="font-size:20px;margin-right:8px;"></i>
          </span>
        </div>
      </div>
      <div class="header-right">
        <right-wrapper showOrgName></right-wrapper>
      </div>
    </div>
    <SearchHeader ref="SearchHeader"></SearchHeader>
  </div>
</template>
<script>
import RightWrapper from "../Other/RightWrapper";
import SearchHeader from "@/views/channel/GlobalSearch/SearchHeader.vue";
export default {
  components: { RightWrapper, SearchHeader },
  name: "ChannelHeader",
  provide() {
    return {
      isAvatar: false,
    };
  },
  data() {
    return {
      recruitObj: {
        name: "能聘",
        url: "/channel/recruit",
        type: 2,
        objName: "recruitObj",
        list: {
          职位大厅: "/channel/recruit",
          人才库: "/channel/talent_pool",
        },
        fn: this.switchFn,
      },
      thoughtObj: {
        name: "关注",
        url: "/channel/thought_list",
        type: 2,
        objName: "thoughtObj",
        list: {
          关注: "/channel/thought_list",
          材料: "/channel/material",
        },
        fn: this.switchFn,
      },
    };
  },
  computed: {
    navList() {
      return [
        this.thoughtObj,
        {
          name: "工场",
          url: "/channel/task_hall",
          type: 1,
        },
        {
          name: "活动",
          url: "/channel/activity/index",
          type: 1,
        },
        this.recruitObj,
        {
          name: "魔方",
          url: "/channel/mo_fang/index",
          type: 1,
        },
        {
          name: "问卷",
          url: "/channel/questionnaire",
          type: 1,
        },
        {
          name: "考试",
          url: "/channel/exam",
          type: 1,
        },
      ];
    },
  },
  methods: {
    search() {
      this.$refs["SearchHeader"].show = !this.$refs["SearchHeader"].show;
    },
    switchFn(row, url) {
      this[row.objName].url = url;
      this.$openPage(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-select-dropdown {
  width: 140px;
  padding: 5px 0;
  margin-top: -1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: $--border-radius-base;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  top: 58px !important;
  .user-dropdown-item {
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    padding: 0 16px;
    clear: both;
    color: #515a6e;
    &:hover {
      background-color: #fff;
      color: $--color-primary;
    }
  }
}
.header {
  height: 66px;
  background-color: #fff;
  // box-shadow: 0 1px 4px rgba(87, 87, 87, 0.08);
  position: relative;
  z-index: 3;
  .header-wrapper {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .header-first {
    display: flex;
    align-items: center;
  }
  .header-left {
    display: flex;
    height: 66px;
    line-height: 66px;
    width: 170px;
    img {
      height: 33px;
      vertical-align: middle;
    }
    .menu-logo {
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
      span {
        margin-left: 7px;
        font-size: 24px;
      }
    }
  }
  .header-center {
    min-width: 400px;
    display: flex;
    .nav {
      font-size: 17px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .nav-search {
      width: 60px;
    }
  }
  .header-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
