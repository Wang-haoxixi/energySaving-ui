<template>
  <div class="job-content">
    <!-- 列表 -->
    <div class="page-list" v-loading="loading">
      <div class="list" v-if="dataList.length > 0">
        <div
          class="item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="handleDetail(item)"
        >
          <iep-img class="item-avatar" :src="item.soAvatar"></iep-img>
          <div class="item-detail">
            <div class="item-head">
              <div class="item-name" :title="item.name">{{item.name}}</div>
              <div class="item-reward" v-if="item.reward" title="该合伙信息已设置有奖推荐，您分享推荐后可能会获得宝贝奖励">
                <div class="icon">荐</div>
                <div class="money">+{{item.reward}}</div>
                <div class="money">贝</div>
              </div>
            </div>
            <div class="item-decs">
              <!-- 地区 -->
              <div class="item-block" v-if="item.workplace">{{item.workplace}}</div>
              <!-- 行业 -->
              <div class="item-block" v-if="item.industry">{{item.industry}}</div>
              <!-- 红度 -->
              <div
                class="item-block"
                v-if="item.rednessDemand"
              >红度{{item.rednessDemand === 5 ? '=' : '≥'}}{{item.rednessDemand}}</div>
            </div>
            <div class="item-tags" v-if="item.tags">
              <div
                class="item-tag"
                v-for="(tag, tIndex) in item.tags.slice(0,2)"
                :key="tIndex"
              >{{tag}}</div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div
          style="text-align: center;margin: 15px 0;width: 100%;"
          v-if="dataList.length > 0 && total > 20"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :current-page.sync="params.current"
            :total="total"
            :page-size="params.size"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
      <div class="no-data" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { getRecruitHallPage } from "@/api/dms/recruit_query";
import { applyJoin } from "@/api/qms/cooperation_task";
import { parseDate } from "@/filters/index";
import { initSearchData, filterSpaceData } from "./options";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      parseDate,
      dataList: [],
      searchForm: initSearchData(),
      params: {
        current: 1,
        size: 20,
      },
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    searchPage(params = {}) {
      this.searchForm = Object.assign({}, this.searchForm, params);
      this.params.current = 1;
      this.currentChange(1);
    },
    async loadPage(row = { ...this.searchForm }) {
      this.loading = true;
      let query = { ...this.$route.query };
      query = Object.assign({}, query, filterSpaceData(row));
      this.$router.replace({ query });
      await getRecruitHallPage({
        ...query,
        ...this.params,
      }).then((res) => {
        this.dataList = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      this.params.current = val;
      const query = { ...this.$route.query };
      query.current = val;
      this.$router.replace({ query });
      this.loadPage();
    },
    // 加入任务
    handleJoin(row) {
      this.$prompt(
        "提醒：加入任务申请通过后，会自动加入该组织，请知悉。",
        "申请理由",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入申请理由",
        },
      ).then(({ value }) => {
        applyJoin({
          applyReason: value,
          taskId: row.id,
        })
          .then(({ data }) => {
            if (data) {
              this.$message.success("报名成功！");
              this.loadPage();
            }
          })
          .catch(() => {});
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/partner_detail/${row.recruitId}`);
    },
    getSearchName(row) {
      for (const item of row.list) {
        if (item.value === this.searchForm[row.value]) {
          return item.label;
        }
      }
    },
    // 获取字典
    getDictName(value, dictName) {
      for (const item of this.dictGroup.get(dictName)) {
        if (item.value === value) {
          return item.label;
        }
      }
      return "";
    },
  },
  created() {
    this.params.type = 1;
    const query = this.$route.query;
    if (query.current) {
      this.$set(this.params, "current", Number(query.current));
    }
  },
};
</script>

<style lang="scss" scoped>
.job-content {
  .sort {
    margin-bottom: 14px;
    padding: 14px 20px;
    border: 1px solid $--border-color;
    border-radius: 10px;
    display: flex;
    .dropdown {
      font-size: 14px;
      width: 25%;
      ::v-deep .el-dropdown {
        cursor: pointer;
      }
      ::v-deep i {
        color: $--color-input-regular;
      }
    }
  }
  .list {
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: calc(50% - 52px);
      display: flex;
      border: 1px solid $--border-color;
      border-radius: $--border-radius-base;
      margin-bottom: 20px;
      padding: 20px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .item-avatar {
        width: 90px;
        height: 90px;
        margin-right: 20px;
      }
      .item-detail {
        width: calc(100% - 110px);
        .item-head {
          display: flex;
          .item-name {
            font-size: 16px;
            font-family: "微软雅黑";
            color: $--color-text-primary;
            margin-bottom: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item-reward {
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
        .item-decs {
          display: flex;
          flex-wrap: wrap;
          .item-block {
            font-size: 14px;
            color: $--color-text-secondary;
            margin-bottom: 15px;
            font-family: Microsoft YaHei;
            color: #303031;
            border-right: 1px solid $--border-color;
            padding: 0 5px;
            height: 16px;
            line-height: 16px;
            &:first-of-type {
              padding-left: 0;
            }
            &:last-of-type {
              border: 0;
            }
          }
        }
        .item-tags {
          display: flex;
          flex-wrap: wrap;
          height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .item-tag {
            background-color: $--background-color;
            padding: 5px 10px;
            font-size: 12px;
            color: $--color-text-secondary;
            margin-right: 10px;
            border-radius: $--small-border-radius;
          }
        }
      }
    }
    .item:nth-child(odd) {
      margin-right: 10px;
    }
    .item:nth-child(even) {
      margin-left: 10px;
    }
  }
  .no-data {
    color: $--color-text-secondary;
    text-align: center;
  }
  .nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}
.search ::v-deep .el-input .el-input__icon {
  line-height: 36px;
}
</style>