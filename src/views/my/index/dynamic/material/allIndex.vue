<template>
  <div>
    <div v-if="dataList.length !== 0">
      <div v-for="(item,index) in dataList" :key="index" class="piece">
        <template v-if="!loading">
          <div style="cursor: pointer;" @click="handleOpen(item)">
            <div>
              <div class="title">
                <h4 class="name">{{item.materialName}}</h4>
                <i class="iconfont el-icon-woneng-qian" v-if="item.downloadCost > 0"></i>
                <!-- <i class="iconfont icon-fujian" v-if="item.attachFile !== ''"></i> -->
                <i class="el-icon-woneng-banquan" v-if="item.isCertified === 1"></i>
              </div>
              <p class="con">{{item.materialIntro}}</p>
            </div>
            <div class="box">
              <div class="avatar">
                <iep-img :src="item.avatar"></iep-img>
              </div>
              <span class="uploaded">
                <iep-div-detail :value="item.realName"></iep-div-detail>
              </span>
              <span>
                <i class="iconfont icon-shijian"></i>
                {{item.createTime}}
              </span>
              <span>
                <i class="iconfont icon-yanjing"></i>
                {{item.views}}人浏览
              </span>
              <!-- <span>
                  <i class="iconfont icon-download1"></i>
                  {{item.downloadTimes}}人下载
              </span>-->
            </div>
          </div>
          <div v-for="(item,index) in item.tag" :key="index" class="label">
            <span class="el-tag el-tag--info">{{item}}</span>
          </div>
        </template>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="params.size"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <IepNoData v-else class="iep-no-data"></IepNoData>
  </div>
</template>
<script>
import { fetchAllPage } from "@/api/dms/material";

function initDataItem() {
  return {
    tagKeyWords: [],
    downloadTimes: 0,
    views: 0,
    creatorRealName: "",
    createTime: 0,
    attachFile: "",
    downloadCost: 0,
    name: "",
    intro: "",
  };
}
export default {
  components: {},
  data() {
    const dataList = [];
    for (let i = 0; i < 10; i++) {
      dataList.push(initDataItem());
    }
    return {
      loading: true,
      dataList: dataList,
      secondClass: "",
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    };
  },
  methods: {
    searchData(val) {
      this.params.current = 1;
      this.paramForm = Object.assign({}, this.paramForm, val);
      this.loadPage();
    },
    handleOpen(row) {
      this.$openPage(`/channel/material/detail/${row.id}`, 2);
    },
    backPage() {
      this.loadPage();
    },
    loadPage() {
      this.loading = true;
      fetchAllPage(
        Object.assign({ materialType: 1 }, this.paramForm, this.params),
      ).then(({ data }) => {
        this.dataList = data.records;
        this.total = data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      document.getElementsByClassName("iep-basic-scroll")[0].scrollTo(0, 430);
      this.params.current = val;
      this.loadPage();
    },
  },
  created() {
    if (this.$route.query.id) {
      this.params.orgId = this.$route.query.id;
    }
    if (this.$route.query.materialType) {
      this.params.materialType = this.$route.query.materialType;
    }
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.piece {
  padding: 16px 0;
  border-bottom: 1px solid $--border-color;
  &:first-child {
    padding-top: 0;
  }
  & > p {
    font-size: 14px;
    color: $--color-text-regular;
    line-height: 28px;
  }
  .con {
    display: -webkit-box;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    text-align: justify;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.title {
  margin-bottom: 2px;
  .name {
    display: inline-block;
    margin: 0;
    margin-right: 10px;
    font-size: 16px;
    vertical-align: middle;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    &:hover {
      text-decoration: underline;
      color: #f74437;
    }
  }
  i {
    margin-right: 10px;
    font-size: 20px;
    color: $--color-text-secondary;
    vertical-align: -2px;
  }
}
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    margin-right: 5px;
    overflow: hidden;
    border: 1px solid #eff0f1;
  }
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 15px;
    line-height: 24px;
    font-size: 14px;
    color: $--color-text-secondary;
    i {
      margin-right: 5px;
      font-size: 16px;
      color: $--color-text-secondary;
      vertical-align: -2px;
    }
  }
  .uploaded {
    max-width: 80px;
  }
  .collect {
    &:hover {
      color: #f74437;
    }
  }
}
.label {
  display: inline-block;
  & > span {
    margin: 15px 5px 0 0;
    height: 26px;
    line-height: 26px;
    border-radius: 5px;
  }
}
.iep-no-data {
  padding-right: 160px;
}
</style>
