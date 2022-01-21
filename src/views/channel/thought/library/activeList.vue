<template>
  <!-- 热门页面下轮播 -->
  <div class="active" v-if="list.length > 0">
    <el-carousel :interval="5000" arrow="always" height="220px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <div class="content">
          <div class="item" v-for="(t, i) in item" :key="i">
            <iep-img :src="t.avatar" class="image" @click.native="handleDetail(t)"></iep-img>
            <div class="title" :title="t.realName">{{t.realName}}</div>
            <div class="position" :title="t.position">{{t.position}}</div>
            <div class="button" v-if="t.isFollowed === 0" @click="handleFollow(t)">+ 关注</div>
            <div class="is-follow" v-else @click="handleFollow(t)">已关注</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getMightyOne } from "@/api/dms/thoughts";
import { follow } from "@/api/admin/follow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleDetail(row) {
      this.$openPage(`${this.$pathPrefix_UserStyle}${row.userId}`, 2);
    },
    loadData() {
      const list = [];
      getMightyOne().then(({ data }) => {
        for (let i = 0; i < data.length; i += 5) {
          list.push(data.slice(i, i + 5));
        }
        this.list = [...list];
      });
    },
    handleFollow(row) {
      follow({
        followId: row.userId,
        sign: row.isFollowed,
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
.active {
  .content {
    display: flex;
    padding: 0;
    .item {
      border: 1px solid $--border-color;
      text-align: center;
      width: 150px;
      margin: 0 1.5%;
      height: 174px;
      padding-top: 16px;
      border-radius: 10px;
      .image {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin: auto;
        cursor: pointer;
      }
      .title {
        margin-top: 11px;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        padding: 0 10px;
      }
      .position {
        color: $--color-text-secondary;
        margin-top: 7px;
        height: 24px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        padding: 0 10px;
        font-size: 14px;
      }
      .button {
        width: 60px;
        height: 28px;
        background: white;
        border: 1px solid #f74437;
        border-radius: 5px;
        margin: auto;
        line-height: 26px;
        font-size: 14px;
        font-weight: 400;
        color: #f74437;
        margin-top: 13px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          background-color: #f74437;
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
        margin-top: 13px;
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
.active ::v-deep .el-carousel--horizontal {
  margin: 0 -10px;
}
.active ::v-deep .el-carousel__arrow {
  top: 40%;
  width: 30px;
  height: 30px;
  background: white;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  opacity: 0;
}
.active ::v-deep .el-carousel__arrow--left {
  left: 0;
}
.active ::v-deep .el-carousel__arrow--right {
  right: 0;
}
.active ::v-deep .el-carousel__indicators {
  display: none;
}
.active ::v-deep .el-carousel__arrow i {
  font-size: 20px;
  color: $--color-text-secondary;
}
.active:hover ::v-deep .el-carousel__arrow {
  opacity: 0.8;
}
</style>
