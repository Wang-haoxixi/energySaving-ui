<template>
  <div class="excellent">
    <IepAppTabCard :title="labelTitle">
      <div class="list">
        <div class="item" v-for="(item, index) in labelList" :key="index">
          <div class="avatar" @click="handleDetail(item)">
            <iep-img :src="item.avatar"></iep-img>
          </div>
          <div class="content">
            <div class="title">{{item.realName}}</div>
            <div class="position">{{item.position}}</div>
          </div>
          <div class="button-list">
            <div class="button" v-if="!item.isFollowed" @click="handleFollow(item)">关注</div>
            <div class="is-follow" v-else @click="handleFollow(item)">已关注</div>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getAbleUserList } from "@/api/admin/search";
import { follow } from "@/api/admin/follow";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      labelTitle: "优秀用户",
      labelList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleDetail(row) {
      this.$router.push(`${this.$pathPrefix_UserStyle}${row.userId}`);
    },
    loadData() {
      getAbleUserList().then(({ data }) => {
        this.labelList = data;
      });
    },
    handleFollow(row) {
      follow({
        followId: row.userId,
        sign: row.isFollowed ? "1" : "0",
        type: 1,
        userId: this.userInfo.userId,
      }).then(({ data }) => {
        if (data) {
          this.loadData();
        }
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.excellent {
  .list {
    margin: -5px 0 5px 0;
    .item {
      display: flex;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 11px;
        cursor: pointer;
      }
      .content {
        width: calc(100% - 135px);
        margin-right: 11px;
        .title {
          font-size: 14px;
          font-family: Microsoft YaHei;
          color: #303031;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .position {
          font-size: 14px;
          color: $--color-text-secondary;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
      .button-list {
        display: flex;
        align-items: center;
        margin-left: 5px;
        .button {
          width: 60px;
          height: 28px;
          // border: 1px solid #f74437;
          border: 1px solid $--color-primary;
          border-radius: 5px;
          text-align: center;
          line-height: 26px;
          // color: #f74437;
          color: $--color-primary;
          background-color: #fff;
          font-size: 14px;
          cursor: pointer;
          box-sizing: border-box;
          &:hover {
            // background-color: #f74437;
            background-color: $--color-primary;
            color: #fff;
          }
        }
        .is-follow {
          width: 60px;
          height: 28px;
          border: 1px solid $--border-color;
          background: $--background-color;
          border-radius: 5px;
          margin: auto;
          line-height: 26px;
          font-size: 14px;
          font-weight: 400;
          color: $--color-text-secondary;
          text-align: center;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
    }
  }
}
.excellent ::v-deep .el-card {
  .el-card__header {
    padding-bottom: 0;
    height: 45px;
    border: 0;
  }
}
.excellent ::v-deep .title {
  margin: 0;
  font-size: 16px;
}
.excellent ::v-deep .el-card {
  border: 0;
}
.excellent ::v-deep .iep-image {
  border: 1px solid $--border-color;
}
</style>
