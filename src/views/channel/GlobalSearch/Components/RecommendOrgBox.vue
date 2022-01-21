<template>
  <div class="recommend-org-container">
    <div class="recommend-org" v-loading="loading">
      <h4>推荐组织</h4>
      <iep-no-data v-if="!orgList.length" complex message="暂无推荐组织"></iep-no-data>
      <div class="recommend-org-content">
        <el-card
          class="item"
          v-for="(item) in orgList"
          @click.native="$openPage(`${$pathPrefix_SoStyle}${item.commonId}`)"
          :key="item.commonId"
          shadow="hover"
        >
          <div class="always">
            <div class="img-box">
              <iep-img class="img" :resizeOpt="{l:110}" :src="item.imageUrl"></iep-img>
            </div>
            <span class="always-sub-title">{{item.commonName}}</span>
            <IepTags :value="item.tagKeyWords"></IepTags>
            <div class="info">
              <div class="person-img">
                <div class="person-img-item" v-for="(img,idx) in item.users" :key="idx">
                  <iep-img :src="img.avatar"></iep-img>
                </div>
              </div>
              <span class="say" v-if="item.count">等{{item.count}}位好友已加入该组织</span>
            </div>
            <div class="hover">
              <el-button class="btn" type="primary" @click.stop="handleApply(item)">申请加入</el-button>
              <el-button class="btn" type="white">组织风采</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <IepDialogReqJoinSo ref="IepDialogReqJoinSo"></IepDialogReqJoinSo>
    </div>
  </div>
</template>
<script>
import { getRecOrgList } from "@/api/dms/channel";
export default {
  data() {
    return {
      orgList: [],
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleApply(item) {
      this.$refs["IepDialogReqJoinSo"].orgId = item.commonId;
      this.$refs["IepDialogReqJoinSo"].dialogShow = true;
    },
    async loadPage() {
      this.loading = true;
      const { data } = await getRecOrgList();
      this.orgList = data;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend-org-container {
  padding: 30px 0 40px;
  // background-color: $--background-color;
}
.recommend-org {
  margin: 0 auto;
  // width: 1200px;
  h4 {
    margin-bottom: 20px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .recommend-org-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    margin-right: -20px;
    margin-bottom: -20px;
    .item {
      margin-right: 20px;
      margin-bottom: 20px;
      width: 228px;
      height: 293px;
      transition: all 0.5s;
      &:hover {
        transform: translateY(-10px);
      }
      .always {
        position: relative;
        height: 100%;
        text-align: center;
        .img-box {
          cursor: pointer;
          margin: 0 auto;
          width: 110px;
          height: 110px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 10px;
        }
        .always-sub-title {
          display: block;
          margin-top: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        ::v-deep .tags {
          margin: 10px 0 20px;
          .el-tag {
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 5px;
          }
        }
        .sub-title {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          z-index: 1;
        }
        .info {
          position: absolute;
          left: -10px;
          right: 0;
          bottom: 40px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $--color-text-secondary;
          .person-img {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .person-img-item {
              margin-left: -12px;
              width: 30px;
              height: 30px;
              border-radius: 10px;
              border: 1px solid $--border-color;
              background-color: #fff;
              &:nth-child(1) {
                margin-left: 0;
                z-index: 3;
              }
              &:nth-child(2) {
                z-index: 2;
              }
              &:nth-child(3) {
                z-index: 1;
              }
            }
          }
          .say {
            min-width: 140px;
            font-size: 12px;
          }
        }
      }
      .hover {
        position: absolute;
        left: -20px;
        right: -20px;
        bottom: -124px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 124px;
        background-color: #fff;
        text-align: center;
        z-index: 10;
        cursor: pointer;
        opacity: 0;
        transition: all 0.5s;
        box-sizing: border-box;
        .btn {
          padding: 0;
          width: 110px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          &:first-child {
            margin-bottom: 15px;
          }
          &:last-child {
            margin-left: 0;
            border-color: $--color-primary;
            color: $--color-primary;
            &:hover {
              background-color: $--color-primary;
              color: #fff;
            }
          }
        }
      }
      &:hover .hover {
        bottom: 20px;
        opacity: 1;
      }
    }
  }
}
.img-box ::v-deep .el-image__inner {
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 0.7;
  }
}
.item ::v-deep.el-card__body {
  height: 100%;
}
.person-img-item ::v-deep .el-image__inner {
  border-radius: 10px;
  &:hover {
    opacity: 0.7;
  }
}
</style>
