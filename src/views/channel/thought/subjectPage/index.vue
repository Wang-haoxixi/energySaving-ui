<template>
  <div class="subject">
    <div class="list">
      <div class="subject-item" v-for="(item, index) in list" :key="index">
        <div class="left">
          <div class="head">
            <div class="roof" v-if="item.status === 2">置顶</div>
            <div class="title" @click="handleDetail(item)">#{{item.content}}#</div>
          </div>
          <div class="footer">
            <div class="num">讨论数：{{item.hot}}</div>
            <div class="creater">
              话题发起人：
              <span class="name" @click="handleCreater(item.creatorId)">{{item.creatorName}}</span>
            </div>
          </div>
        </div>
        <!-- 是否关注 -->
        <div class="right">
          <iep-button
            class="add"
            size="mini"
            type="primary"
            @click="handleFollow(item, 0)"
            v-if="item.isFollowed === 0"
          >
            <i class="el-icon-plus"></i> 关注
          </iep-button>
          <iep-button class="add-now" size="mini" @click="handleFollow(item, 1)" v-else>已关注</iep-button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        :page-size="params.size"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getTableData } from "@/api/dms/commontopic";
import { mapGetters } from "vuex";
import { follow } from "@/api/admin/follow";

const initParams = () => {
  return {
    current: 1,
    size: 10,
  };
};
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      total: 0,
      params: initParams(),
      list: [],
      searchForm: {
        content: "",
      },
    };
  },
  methods: {
    currentChange(val) {
      document.getElementsByClassName("iep-basic-scroll")[0].scrollTo(0, 430);
      this.params.current = val;
      this.getTableData();
    },
    getTableData() {
      getTableData(Object.assign({}, this.params, this.searchForm)).then(
        ({ data }) => {
          this.list = data.records;
          this.total = data.total;
        },
      );
    },
    // 人物
    // handleCreater (id) {
    // this.$router.push(`${$pathPrefix_UserStyle}${id}`);
    // },
    // 详情
    handleDetail(row) {
      this.$router.push({
        path: "/thought/subject_list",
        query: {
          title: row.content,
          id: row.topicId,
        },
      });
    },
    // 搜索
    search(params) {
      this.searchForm = Object.assign({}, this.searchForm, params);
      this.getTableData();
    },
    handleFollow(row, sign) {
      follow({
        followId: row.topicId,
        sign: sign,
        type: 3,
        userId: this.userInfo.userId,
      }).then(() => {
        this.getTableData();
      });
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
.subject {
  .list {
    margin-bottom: 20px;
    .subject-item {
      border-bottom: 1px solid $--border-color;
      display: flex;
      .left {
        flex: 1;
        .head {
          margin: 20px 0;
          display: flex;
          align-items: center;
          .roof {
            color: $--color-primary;
            border: 1px solid $--color-primary;
            height: 16px;
            line-height: 16px;
            padding: 0 5px;
            border-radius: 3px;
            margin-right: 10px;
            font-size: 12px;
          }
          .title {
            font-size: 16px;
            line-height: 18px;
            cursor: pointer;
          }
        }
        .footer {
          display: flex;
          margin-bottom: 20px;
          font-size: 14px;
          .num {
            color: $--color-text-secondary;
            margin-right: 30px;
          }
          .creater {
            color: $--color-text-secondary;
            .name {
              cursor: pointer;
            }
          }
        }
      }
      .right {
        width: 150px;
        padding-top: 20px;
        text-align: right;
      }
    }
  }
  .pagination {
    text-align: center;
  }
}
.add {
  width: 60px;
  height: 28px;
  border-radius: 5px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
}
.add-now {
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
  &:hover,
  &:focus {
    border: 1px solid $--border-color;
    background: $--background-color;
    color: $--color-text-secondary;
  }
}
</style>
