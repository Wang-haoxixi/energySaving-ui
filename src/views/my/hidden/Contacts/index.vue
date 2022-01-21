<template>
  <div class="contacts-container grid-container">
    <div class="contacts-tree-wrapper">
      <div class="title">通讯录</div>
      <el-scrollbar style="height:calc(100vh - 1px);">
        <SearchBox @on-search="handleSearch"></SearchBox>
        <GroupBox ref="GroupBox" @select="handleUser"></GroupBox>
        <FriendBox ref="FriendBox" @select="handleUser"></FriendBox>
        <MentorBox ref="MentorBox" @select="handleUser"></MentorBox>
        <SoBox @select="handleOrg"></SoBox>
      </el-scrollbar>
    </div>
    <div class="contact-person-wrapper">
      <component ref="SelectBox" :is="selectBox" @refresh="handleSearch"></component>
    </div>
  </div>
</template>
<script>
import SearchBox from "./SearchBox";
import GroupBox from "./GroupBox";
import FriendBox from "./FriendBox";
import MentorBox from "./MentorBox";
import SoBox from "./SoBox";
import UserBox from "./UserBox";
import OrgBox from "./OrgBox";
import { mapGetters } from "vuex";
export default {
  components: {
    SearchBox,
    GroupBox,
    FriendBox,
    MentorBox,
    SoBox,
    UserBox,
    OrgBox,
  },
  data() {
    return {
      selectBox: "UserBox",
      query: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.$refs["SelectBox"].loadPage(this.userInfo.userId);
  },
  methods: {
    handleSearch(value) {
      this.$refs["GroupBox"].load(value);
      this.$refs["FriendBox"].load(value);
    },
    handleUser(id) {
      this.selectBox = "UserBox";
      this.$nextTick(() => {
        this.$refs["SelectBox"].loadPage(id);
      });
    },
    handleOrg(id) {
      this.selectBox = "OrgBox";
      this.$nextTick(() => {
        this.$refs["SelectBox"].loadPage(id);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.contacts-container {
  margin: 20px auto 40px;
  width: 1200px;
}
[class$="-wrapper"] {
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
}

.grid-container {
  display: grid;
  gap: 20px;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "contacts-tree-wrapper contact-person-wrapper";
}

.contacts-tree-wrapper {
  grid-area: contacts-tree-wrapper;
  padding: 20px;
  & > .title {
    font-size: 16px;
    padding-bottom: 10px;
    margin-bottom: 2px;
  }
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.contact-person-wrapper {
  grid-area: contact-person-wrapper;
}
</style>
