<template>
  <div class="container">
    <div class="banner">
      <div class="banner-con">
        <div class="banner-plain">
          <div class="banner-title">
            <p>
              <strong>人参</strong>果
              <strong class="sep">●</strong>
            </p>问卷调研服务系统
          </div>
          <iep-img class="img" src="/img/banner/qmssubbg.png"></iep-img>
        </div>
        <div class="banner-decorate">
          <iep-img class="img" src="/img/banner/qmszsbg.png"></iep-img>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <questionnaire-header @change-solt="searchLoading" @search-page="searchLoading"></questionnaire-header>
      </div>
      <div v-if="pagedTable.length" v-loading="loading">
        <div class="list-wrap">
          <list :data="pagedTable"></list>
        </div>
        <div class="pagenation">
          <iep-pagination
            @size-change="handlePaginationSizeChange"
            @current-change="handlePaginationCurrentChange"
            :pagination-option="pagination"
            :page-sizes="initPageSize"
            prev-text="上一页"
            next-text="下一页"
          ></iep-pagination>
        </div>
      </div>
      <div v-else v-loading="loading">
        <p class="nodata">没有找到相关问卷</p>
      </div>
    </div>
  </div>
</template>

<script>
import questionnaireHeader from "./components/header";
import list from "./components/list";
import mixins from "@/mixins/mixins";
import { getChannelPage } from "@/api/qms/questionnaire";
export default {
  data() {
    return {
      loading: true,
      param: {},
    };
  },
  methods: {
    searchLoading(parm) {
      this.loadPage(parm);
    },
    async loadPage(param = this.param) {
      try {
        this.loading = true;
        Object.assign(this.param, param);
        for (const key in this.param) {
          if (!this.param[key]) {
            delete this.param[key];
          }
        }
        await this.loadTable(this.param, getChannelPage);
        this.param.current ? delete this.param.current : false;
        // 修改过一次当前页码后及时删除,因以免影响后续请求
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  components: {
    questionnaireHeader,
    list,
  },
  mounted() {
    this.loadPage();
  },
  computed: {
    initPageSize() {
      const { pageOptionSize } = this;
      return [
        pageOptionSize,
        pageOptionSize * 2,
        pageOptionSize * 3,
        pageOptionSize * 4,
      ];
    },
  },
  mixins: [mixins],
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  background: #fff;
  .banner {
    height: 280px;
    background-image: url(/img/banner/qmsbg.jpg);
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    .banner-con {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      width: 1200px;
    }
    .banner-plain {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 13%;
      .banner-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 30px;
        margin-bottom: -20px;
        font-size: 22px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        p {
          display: flex;
          align-items: center;
          font-size: 40px;
        }
        strong {
          font-weight: 400;
          color: $--color-primary;
        }
        .sep {
          margin: 0 10px;
          font-size: 18px;
        }
      }
      .img {
        margin-left: 8px;
        margin-bottom: 20px;
      }
    }
    .banner-decorate {
      margin-right: 5%;
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
  }
  .list-wrap {
    width: 100%;
  }
  .pagenation {
    display: flex;
    align-items: center;
    justify-content: center;
    &::v-deep .el-pagination__rightwrapper {
      margin-left: 14px;
    }
  }
}
.nodata {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  color: $--color-text-secondary;
}
</style>
