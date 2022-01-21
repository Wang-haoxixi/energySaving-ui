<template>
  <div class="talent-content">
    <div class="talent-list">
      <div
        class="talent-item"
        v-for="item in pagedTable"
        :key="item.userId"
        @click="()=> {$openPage(`/channel/styles/user/${item.userId}/index`)}"
      >
        <div class="talent-avatar">
          <iep-img class="img" :src="item.avatar"></iep-img>
        </div>
        <div class="talent-info">
          <div class="head">
            <div class="realName">{{item.realName}}</div>
            <div class="redness">
              <i :class="`el-icon-woneng-hongdu${item.redness}`"></i>
            </div>
            <div class="workPlace">{{item.workPlace}}</div>
            <div class="info">
              <div class="info-tag" v-if="item.age">{{item.age}}岁</div>
              <div class="info-tag" v-if="item.workYear">{{item.workYear}}</div>
              <div class="info-tag" v-if="item.education">{{item.education}}</div>
            </div>
          </div>
          <div class="middle">
            <div class="middle-info">
              <div class="tags" v-if="item.abilityTag && item.abilityTag.length > 0">
                <div class="tag" v-for="tag in item.abilityTag" :key="tag">{{tag}}</div>
              </div>
              <div class="experience" v-if="item.recentWork">
                <div class="label">工作经历：</div>
                <div
                  class="span"
                  :title="item.recentWork.describe"
                >{{item.recentWork.company}}·{{item.recentWork.describe}}</div>
                <div class="date" v-if="item.recentWork.newWorkTime">{{item.recentWork.newWorkTime}}</div>
              </div>
              <div class="experience" v-else>暂未填写工作经历</div>
              <div class="experience" v-if="item.recentStudy">
                <div class="label">教育经历：</div>
                <div
                  class="span"
                  :title="item.recentStudy.content"
                >{{item.recentStudy.school}}·{{item.recentStudy.content}}</div>
                <div
                  class="date"
                  v-if="item.recentStudy.highestEduYear"
                >{{item.recentStudy.highestEduYear}}</div>
              </div>
              <div class="experience" v-else>暂未填写教育经历</div>
            </div>
            <div class="button-list">
              <el-button
                type="primary"
                class="invitation"
                @click.stop="handleSendInvitation(item)"
                plain
              >邀请投递</el-button>
              <div class="weixin" @click.stop="handleSendMsg(item)">
                <i class="el-icon-woneng-weixin1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="pagination.current"
        :total="pagination.total"
        @current-change="handlePaginationCurrentChange"
      ></el-pagination>
    </div>
    <!-- 邀请投递 -->
    <InvitationDialog ref="invitation" :orgId="orgId"></InvitationDialog>
  </div>
</template>

<script>
import { getPcPage } from "@/api/admin/talent_pool";
import mixins from "@/mixins/mixins";
import { mapActions } from "vuex";
import InvitationDialog from "./components/InvitationDialog";

export default {
  mixins: [mixins],
  components: { InvitationDialog },
  props: ["orgId"],
  methods: {
    searchData(row) {
      this.searchForm = { ...row };
      this.searchPage();
    },
    loadPage(params = {}) {
      this.loadTable(Object.assign({}, this.searchForm, params), getPcPage);
    },
    // 直聊
    ...mapActions(["imcOpenConversionByTargetId"]),
    handleSendMsg(row) {
      this.$refs.invitation.open(row, "msg");
    },
    handleSendInvitation(row) {
      this.$refs.invitation.open(row, "invitation");
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.talent-content {
  border-radius: $--border-radius-base;
  padding: 20px;
  background-color: #fff;
}
.talent-list {
  width: 100%;
  .talent-item {
    width: 100%;
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid $--border-color;
    cursor: pointer;
    &:hover .talent-info .head .realName {
      color: $--color-primary;
    }
    .talent-avatar {
      margin-right: 25px;
      .img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        border: 1px solid $--border-color;
      }
    }
    .talent-info {
      width: calc(100% - 105px);
      .head {
        margin-bottom: 12px;
        display: flex;
        .realName {
          font-size: 18px;
          color: $--color-text-primary;
          margin-right: 10px;
        }
        .redness {
          margin-right: 10px;
          color: #ff8574;
        }
        .workPlace {
          color: $--color-text-secondary;
          font-size: 14px;
          line-height: 27px;
        }
        .info {
          margin-left: 30px;
          color: $--color-text-secondary;
          display: flex;
          font-size: 14px;
          padding-top: 5px;
          .info-tag {
            padding: 0 10px;
            border-right: 1px solid $--border-color;
            height: 16px;
            line-height: 16px;
            &:last-of-type {
              border: 0;
            }
          }
        }
      }
      .middle {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .middle-info {
          width: calc(100% - 150px);
          .tags {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            font-size: 12px;
            .tag {
              background-color: $--background-color;
              border-radius: $--small-border-radius;
              color: $--color-text-secondary;
              margin-right: 10px;
              margin-bottom: 10px;
              padding: 3px 10px;
            }
          }
          .experience {
            margin-bottom: 10px;
            color: $--color-text-secondary;
            display: flex;
            font-size: 14px;
            width: 100%;
            &:nth-child(2) {
              margin-top: 5px;
            }
            &:last-of-type {
              margin: 0;
            }
            .label {
              width: 70px;
            }
            .span {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              max-width: calc(100% - 165px);
            }
            .date {
              width: 80px;
              margin-left: 10px;
              text-align: right;
            }
          }
        }
        .button-list {
          display: flex;
          width: 150px;
          height: 34px;
          .invitation {
            margin-right: 10px;
            padding: 0 12px;
            height: 30px;
          }
          .weixin {
            cursor: pointer;
            background-color: $--color-primary;
            width: 30px;
            height: 30px;
            border-radius: $--border-radius-base;
            line-height: 34px;
            text-align: center;
            i {
              background-color: $--color-primary;
              color: #fff;
              font-size: 20px;
            }
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
</style>
