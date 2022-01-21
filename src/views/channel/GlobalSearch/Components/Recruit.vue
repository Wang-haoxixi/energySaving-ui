<template>
  <div class="list-box" v-loading="loading">
    <Nodata v-if="!pagedTable.length"></Nodata>
    <template v-else>
      <p>
        共
        <span>{{pagination.total}}</span>
        条数据
      </p>
      <div class="grid-box">
        <el-card shadow="never" v-for="(item, index) in pagedTable" :key="index">
          <div class="item" @click="$openPage(`/channel/recruit_detail/${item.recruitId}`)">
            <div class="head">
              <div class="title">
                <div class="task-name nowrap">{{transformString(item.name)}}</div>
                <div class="workplace">{{item.workplace}}</div>
                <div class="reward" v-if="item.reward" title="该职位已设置有奖推荐，您分享推荐后可能会获得宝贝奖励">
                  <div class="icon">荐</div>
                  <div class="money">+{{item.reward}}贝</div>
                </div>
              </div>
            </div>
            <div class="middle">
              <div class="content">
                <!-- 薪资 -->
                <div class="middle-item salary" v-if="!item.salaryStart && !item.salaryEnd">面议</div>
                <div class="middle-item salary" v-else>{{item.salaryStart}}K—{{item.salaryEnd}}K</div>
                <!-- 经验 -->
                <div class="middle-item">{{item.experience || "经验不限"}}</div>
                <!-- 学历 -->
                <div class="middle-item">{{item.education || "学历不限"}}</div>
                <!-- 红度 -->
                <div class="middle-item" v-if="item.rednessDemand">{{`红度 > ${item.rednessDemand}`}}</div>
                <!-- 标签 -->
                <div class="middle-item middle-item-tags" v-if="item.tags">
                  <div
                    class="middle-item-tag"
                    v-for="(item, index) in item.tags.slice(0, 4)"
                    :key="index"
                  >{{item}}</div>
                </div>
              </div>
              <div class="button">
                <!-- <div class="info" v-if="!(mouseIndex === index)">
                <div class="realName">{{item.realName}}</div>
                <div class="position">{{item.position}}</div>
                </div>-->
                <el-button
                  type="primary"
                  class="button iep-btn-s"
                  @click.stop="handleSendMsg(item)"
                >立即沟通</el-button>
              </div>
            </div>
            <div class="footer">
              <div class="content">
                <!-- so头像 名称 -->
                <div class="info">
                  <iep-img :src="item.soAvatar" class="avatar"></iep-img>
                  <div class="realName">{{item.soName}}</div>
                </div>
                <!-- so人数 -->
                <div class="block">{{getPersonNum(item.soNum)}}</div>
                <!-- 福利 -->
                <div class="block" v-if="item.welfareList">{{item.welfareList.join(" ")}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="pages" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          prev-text="上一页"
          next-text="下一页"
          background
        ></iep-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getRecruitHallPage } from "@/api/dms/recruit_query";
import Nodata from "./Nodata";
import { mapGetters, mapActions } from "vuex";
import { transformString } from "@/util/dataDeal";

export default {
  components: {
    Nodata,
  },
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      layout: "prev,pager,next",
      loading: false,
      iepPageSize: 4,
    };
  },
  mounted() {
    this.loadPage();
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    transformString,
    async loadPage(
      param = {
        keyword: this.$route.query.keyword,
        type: this.$route.query.type,
      },
    ) {
      let params;
      if (param.type === "1") {
        params = {
          name: param.keyword,
        };
      } else if (param.type === "2") {
        params = {
          tagName: param.keyword,
        };
      }
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(params, getRecruitHallPage);
      this.loading = false;
    },
    ...mapActions(["imcOpenConversionByTargetId"]),
    handleSendMsg(row) {
      const url = `${window.location.host}/channel/recruit_detail/${row.recruitId}`;
      const msg = `你好，对贵公司发布的${row.name}很感兴趣，希望能和你进一步沟通～↵职位链接：${url}`;
      if (row.createBy === this.userInfo.userId) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: row.createBy + "",
          type: 1,
          messageContent: msg,
        });
      }
    },
    getPersonNum(num) {
      const numList = [
        {
          value: 19,
          label: "1~19人",
        },
        {
          value: 99,
          label: "20~99人",
        },
        {
          value: 499,
          label: "100~499人",
        },
        {
          value: 999,
          label: "500~999人",
        },
        {
          value: 9999,
          label: "1000~9999人",
        },
      ];
      for (const item of numList) {
        if (num < item.value) return item.label;
      }
      return "10000人以上";
    },
  },
  watch: {
    $route: {
      handler: function () {
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.grid-box {
  grid-template-columns: 1fr;
}
.item {
  cursor: pointer;
  &:hover {
    .title .task-name {
      color: $--color-primary;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      width: 60%;
      display: flex;
      align-items: center;
      color: $--color-text-primary;
      .task-name {
        margin-right: 12px;
        font-size: 18px;
      }
      .workplace {
        margin-top: 2px;
        font-size: 14px;
        color: $--color-text-secondary;
      }
      .reward {
        margin-left: 15px;
        display: flex;
        font-size: 14px;
        line-height: 30px;
        .icon {
          margin-top: 4px;
          width: 22px;
          height: 22px;
          line-height: 22px;
          border-radius: 50%;
          background-color: $--color-secondary;
          color: #fff;
          text-align: center;
          font-size: 12px;
        }
        .money {
          color: $--color-secondary;
          margin-left: 2px;
        }
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    .content {
      margin-bottom: 20px;
      display: flex;
      .middle-item {
        font-size: 14px;
        color: $--color-text-secondary;
        height: 14px;
        line-height: 14px;
        margin: 5px 0;
        padding: 0 10px;
        border-right: 1px solid $--border-color;
        &:first-of-type {
          padding-left: 0;
        }
        &:last-of-type {
          border: 0;
        }
      }
      .salary {
        color: $--color-primary;
      }
      .middle-item-tags {
        margin: 0;
        display: flex;
        .middle-item-tag {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 24px;
          background: $--background-color;
          border-radius: 5px;
          padding: 0 10px;
          line-height: 24px;
        }
      }
    }
    .button {
      width: 84px;
      text-align: center;
      .info {
        text-align: right;
        padding: 8px 10px;
        border-radius: $--border-radius-base;
        border: 1px solid $--border-color;
        color: $--color-text-regular;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    .content {
      color: $--color-text-secondary;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      font-size: 14px;
      .info {
        display: flex;
        align-items: center;
        padding: 0;
        height: 20px;
        line-height: 20px;
        color: $--color-text-secondary;
        .avatar {
          height: 20px;
          width: 20px;
          border-radius: 5px;
          margin-right: 6px;
        }
        .realName {
          margin-right: 10px;
          padding-right: 10px;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: $--color-text-regular;
          border-right: 1px solid $--border-color;
        }
      }
    }
    .block {
      margin-right: 10px;
      padding-right: 10px;
      height: 14px;
      font-size: 14px;
      line-height: 14px;
      color: $--color-text-secondary;
      border-right: 1px solid $--border-color;
      &:last-of-type {
        border: 0;
      }
    }
  }
}
</style>
