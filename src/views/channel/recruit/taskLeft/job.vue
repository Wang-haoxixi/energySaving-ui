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
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave(index)"
        >
          <div class="head">
            <div class="title">
              <div
                class="task-name nowrap"
                :title="transformString(item.name)"
              >{{transformString(item.name)}}</div>
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
              <div
                class="middle-item"
                v-if="item.rednessDemand"
              >{{`红度 ${item.rednessDemand === 5 ? '=' : '≥'} ${item.rednessDemand}`}}</div>
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
              <div class="block welfare" v-if="item.welfareList">
                <span>{{item.welfareList.join(" ")}}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin: 15px 0;" v-if="dataList.length > 0 && total > 10">
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
import { mapGetters, mapActions } from "vuex";
import { postMsgCustomInitiate } from "@/api/ims/rong";
import { ifUserLinkUp } from "@/api/dms/recruit_linkup";
import { transformString } from "@/util/dataDeal";
export default {
  components: {},
  data() {
    return {
      parseDate,
      dataList: [],
      searchForm: initSearchData(),
      params: {
        current: 1,
        size: 10,
      },
      loading: true,
      mouseIndex: -1,
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    transformString,
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
      this.$router.push(`/channel/recruit_detail/${row.recruitId}`);
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
    // 直聊
    ...mapActions(["imcOpenConversionByTargetId"]),
    async handleSendMsg(row) {
      if (row.createBy === this.userInfo.userId) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: row.createBy + "",
          type: 1,
        });
        const params1 = {
          targetId: row.createBy,
          recruitId: row.recruitId,
        };
        const { data } = await ifUserLinkUp(params1);
        if (!data) {
          const params2 = {
            dataId: row.recruitId,
            targetId: row.createBy,
            beforePage: 0,
          };
          await postMsgCustomInitiate(params2);
        }
      }
    },
    handleMouseOver(index) {
      this.mouseIndex = index;
    },
    handleMouseLeave() {
      this.mouseIndex = -1;
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
  created() {
    this.params.type = 0;
    const query = this.$route.query;
    if (query.current) {
      this.$set(this.params, "current", Number(query.current));
    }
  },
};
</script>

<style lang="scss" scoped>
.job-content {
  .list {
    border: 1px solid $--border-color;
    padding: 20px;
    border-radius: 10px;
    .item {
      border-bottom: 1px solid $--border-color;
      margin-bottom: 20px;
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
          font-family: "微软雅黑";
          color: $--color-text-primary;
          .task-name {
            margin-right: 12px;
            font-size: 18px;
          }
          .workplace {
            margin-top: 2px;
            min-width: 120px;
            font-size: 14px;
            color: $--color-text-secondary;
          }
          .reward {
            margin-left: 15px;
            display: flex;
            min-width: 140px;
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
            min-width: 78px;
            text-align: center;
            border-right: 1px solid $--border-color;
            box-sizing: border-box;
            &:first-of-type {
              padding-left: 0;
            }
            &:last-of-type {
              border: 0;
            }
          }
          .salary {
            min-width: 40px;
            text-align: left;
            color: $--color-primary;
          }
          .middle-item-tags {
            margin: 0 0 -10px;
            display: flex;
            flex-wrap: wrap;
            max-width: 380px;
            height: auto;
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
          padding: 0 14px;
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
        padding: 0 0 10px;
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
          .welfare {
            flex: 1;
            height: auto;
            line-height: 24px;
            span {
              display: block;
            }
          }
        }
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
