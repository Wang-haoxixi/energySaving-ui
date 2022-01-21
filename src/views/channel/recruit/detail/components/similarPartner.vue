<template>
  <div class="newest-tpl">
    <div class="head">相似信息</div>
    <div class="list" v-if="list.length > 0">
      <div class="data" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
        <div class="title nowrap">{{item.name}}</div>
        <div class="tags nowrap" v-if="item.tags">{{item.tags.join(" / ")}}</div>
        <div class="info">
          <iep-img class="avatar" :src="item.soAvatar"></iep-img>
          <div class="so-name nowrap" :title="item.soName">{{item.soName}}</div>
          <div class="so-num">{{item.soNum}}人</div>
        </div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { parseDate } from "@/filters/index";
import { getSimilarRecruit } from "@/api/dms/recruit_query";

export default {
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  props: {
    id: {
      default: 0,
    },
  },
  data() {
    return {
      parseDate,
      list: [],
    };
  },
  methods: {
    loadData() {
      getSimilarRecruit({
        recruitId: this.id,
        current: 1,
        size: 5,
      }).then(({ data }) => {
        this.list = [...data.records];
      });
    },
    handleDetail(row) {
      this.$router.push(`/channel/partner_detail/${row.recruitId}`);
    },
  },
  watch: {
    id: {
      handler(val) {
        if (val) this.loadData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.newest-tpl {
  padding: 10px 20px 0;
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: 10px;
  .head {
    padding: 5px 0 0;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .list {
    padding: 0 0 15px;
    font-size: 14px;
    .data {
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid $--border-color;
      cursor: pointer;
      &:hover .name {
        color: $--color-primary;
      }
      .title {
        margin-bottom: 10px;
      }
      .tags {
        width: 100%;
        color: $--color-text-secondary;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .info {
        display: flex;
        align-items: center;
        .avatar {
          width: 23px;
          height: 23px;
          margin-right: 6px;
          border-radius: $--small-border-radius;
          border: 1px solid $--border-color;
          transition: all 0.3s;
        }
        .so-name {
          width: calc(100% - 80px);
          height: 23px;
          line-height: 23px;
        }
        .so-num {
          width: 50px;
          height: 23px;
          line-height: 23px;
          text-align: right;
        }
      }
      &:hover .avatar ::v-deep .el-image__inner {
        transform: scale(1.1);
        transition: all 0.3s;
      }
      &:hover .content .title {
        color: $--color-primary;
        transition: all 0.3s;
      }
      &:last-child {
        padding-bottom: 0;
        border: 0;
      }
    }
  }
}
.none {
  padding: 15px 0;
  color: $--color-text-secondary;
}
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
