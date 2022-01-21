<template>
  <div v-loading="loading">
    <iep-basic-container style="border:0">
      <div class="title-box">
        <div class="info-title">{{$route.name}}</div>
        <div>
          <iep-operation-search @search-page="searchPage"></iep-operation-search>
        </div>
      </div>
      <div class="org-wrapper">
        <iep-no-data v-if="!orgList.length"></iep-no-data>
        <div class="org-item" v-for="item in orgList" :key="item.orgId">
          <div class="item">
            <div
              class="avatar-wrapper"
              title="进入风采页"
              @click="$openPage(`${$pathPrefix_SoStyle}${item.orgId}`)"
            >
              <iep-img class="avatar" :src="item.avatar"></iep-img>
              <IepIdentitySvg v-if="item.isAdmin" class="identity" :type="item.isAdmin"></IepIdentitySvg>
            </div>
            <div class="title">{{item.name}}</div>
            <div class="btn-group">
              <el-button type="primary" plain @click="handleChangeOrg(item)">进入赋能台</el-button>
              <el-button v-if="item.isAdmin!==2" type="default" plain @click="handleOut(item)">退出</el-button>
            </div>
          </div>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import { getUserHadList, outOrg } from "@/api/admin/org";
import operationMixins from "@/mixins/operationMixins";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  data() {
    return {
      loading: false,
      orgList: [],
    };
  },
  created() {
    this.loadPage();
  },
  computed: {
    ...mapGetters(["currentMenuGroup", "userInfo"]),
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async handleChangeOrg(item) {
      await this.orgChangeAction(item.orgId);
      this.$openPage(`/wel/${this.currentMenuGroup.path}`);
    },
    async loadPage() {
      this.loading = true;
      const { data } = await getUserHadList();
      this.orgList = data;
      this.filterList = data;
      this.loading = false;
    },
    async handleOut(row) {
      if (row.orgId === this.userInfo.orgId) {
        this.$message("请先切换至其他组织，再尝试退出该组织");
        return;
      }
      const msg =
        row.isAdmin === 1
          ? `一旦退出该组织，您将无权进入组织赋能台并进行组织管理。是否确认退出${row.name}？`
          : `一旦退出该组织，您将无权进入组织赋能台。是否确认退出${row.name}？`;
      this._handleComfirm(row.orgId, outOrg, "退出", msg);
    },
    async searchPage({ name }) {
      this.loading = true;
      const { data } = await getUserHadList();
      if (data) {
        this.orgList = data.filter((m) => {
          return m.name.indexOf(name) !== -1;
        });
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.org-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 40px;
  padding: 15px;
  .org-item {
    box-sizing: border-box;
    display: flex;
    position: relative;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 20px;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    overflow: hidden;
    &:hover {
      box-shadow: 0 -1px 6px $--background-color;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 10px;
      .avatar {
        margin: 0 auto;
        border-radius: 10px;
        ::v-deep .el-image__inner {
          height: 100%;
        }
      }

      .identity {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }
    .title {
      margin: 15px 0;
      height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .el-button {
      width: 100px;
      height: auto;
    }
  }
}
.el-button {
  width: 90px;
  height: 32px;
  line-height: 14px;
  text-align: center;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.btn-group {
  &:nth-child(1) {
    margin-top: 10px;
  }
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  div:last-child {
    margin-right: 7px;
  }
}
</style>
