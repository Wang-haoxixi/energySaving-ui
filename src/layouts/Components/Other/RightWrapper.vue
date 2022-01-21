<template>
  <user-wrapper>
    <div
      v-show="userInfo.orgName"
      class="iep-header-trigger"
      title="进入组织赋能台"
      v-intro="'无论在哪个页面，都可使用导航栏快速到达组织赋能台'"
      v-intro-step="2"
    >
      <el-dropdown
        split-button
        type="default"
        @click.stop="$openPage(`/wel/${currentMenuGroup.path}`)"
        trigger="click"
        @visible-change="handleLoadOrg"
      >
        <div class="org-name">{{userInfo.orgName}}</div>
        <el-dropdown-menu v-loading="loading" class="iep-dropdown" slot="dropdown">
          <div class="search-org-box">
            <el-input
              placeholder="搜索组织"
              prefix-icon="el-icon-search"
              size="small"
              v-model="orgText"
            ></el-input>
          </div>
          <el-dropdown-item
            class="iep-dropdown-item"
            v-for="(item,key) in filterOrgList"
            :key="item.id"
            :divided="key===0"
            @click.native="handleChangeOrg(item)"
          >
            <div style="display:flex;justify-content: space-between;">
              <iep-div-detail :value="item.name"></iep-div-detail>
              <i class="el-icon-check" v-show="userInfo.orgId === item.id"></i>
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            class="iep-dropdown-item"
            @click.native="$openPage('/my/account/org')"
            divided
          >更多</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="iep-header-trigger" title="使用指南" @click="$openPage('/my/help_center')">
      <i class="el-icon-woneng-bangzhu"></i>
    </div>

    <div class="iep-header-trigger" title="通讯录" @click="$openPage('/my/contacts')">
      <i class="el-icon-notebook-1"></i>
    </div>

    <div
      class="iep-header-trigger"
      :class="{rongIMDisable}"
      :title="rongIMDisable?`会话不可用`:`消息`"
      @click="rongIMDisable?()=>{}:handleConversationBox()"
    >
      <i class="el-icon-woneng-pinglun">
        <span class="unread" v-show="totalUnreadCount"></span>
      </i>
    </div>

    <!-- <div class="iep-header-trigger" title="邮件" @click="handleEmailBox()">
      <i class="el-icon-message"></i>
    </div>-->
    <ConversationBox ref="ConversationBox"></ConversationBox>
  </user-wrapper>
</template>
<script>
import { getUserHadList } from "@/api/admin/org";
import UserWrapper from "./UserWrapper";
import ConversationBox from "./ConversationBox/index";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  props: {
    showOrgName: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["reload"],
  components: {
    UserWrapper,
    ConversationBox,
  },
  data() {
    return {
      orgText: "",
      isCollapse: true,
      orgList: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentMenuGroup"]),
    ...mapState({
      totalUnreadCount: (state) => state.imc.totalUnreadCount,
      currentConversation: (state) => state.imc.currentConversation,
      rongIMDisable: (state) => state.imc.rongIMDisable,
    }),
    filterOrgList() {
      return this.orgList
        .filter(
          (m) => m.name.toLowerCase().indexOf(this.orgText.toLowerCase()) >= 0,
        )
        .slice(0, 10);
    },
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    ...mapActions(["orgChangeAction", "imcClearUnreadCount"]),
    handleConversationBox() {
      this.setDialogShow(true);
      this.imcClearUnreadCount(this.currentConversation);
    },
    // handleEmailBox() {
    //   this.$openPage("/my/email");
    // },
    async handleChangeOrg(item) {
      await this.orgChangeAction(item.id);
      this.$openPage(`/wel/${this.currentMenuGroup.path}`);
      this.reload();
    },
    async handleLoadOrg(value) {
      if (value) {
        this.loading = true;
        const { data } = await getUserHadList();
        this.orgList = data.map((m) => ({
          ...m,
          id: m.orgId,
        }));
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-header-trigger > [class^="el-icon-"] {
  font-size: 20px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  position: relative;
}
.iep-header-trigger {
  .unread {
    position: absolute;
    background: $--color-primary;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    right: -2px;
    top: -2px;
  }
  .org-name {
    max-width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.search-org-box {
  margin: 10px 20px;
  max-width: 150px;
}
.rongIMDisable {
  cursor: default;
  &:hover {
    background-color: transparent;
  }
  i[class^="el-icon-"] {
    color: $--color-input-regular;
  }
}
</style>
