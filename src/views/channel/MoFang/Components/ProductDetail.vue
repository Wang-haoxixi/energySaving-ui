<template>
  <div class="basic-container">
    <el-card class="top-box" shadow="never">
      <div class="item-box">
        <div class="img">
          <iep-img :resizeOpt="{l:160}" :src="productInfo.imageUrl" alt></iep-img>
        </div>
        <div class="txt">
          <div>
            <div class="item-box">
              <div class="weight" :title="productInfo.name">
                {{ productInfo.name }}
                <el-tag
                  size="mini"
                  type="primary"
                  style="margin-bottom:5px;"
                >{{typeMap[productInfo.type]}}</el-tag>
              </div>
              <el-rate
                v-if="productInfo.star"
                class="rate"
                :value="productInfo.star"
                show-score
                disabled
              ></el-rate>
              <div class="rate-text" v-else>暂无评分</div>
            </div>
            <div class="item-box">
              <span class="describe" :title="productInfo.synopsis">{{ productInfo.synopsis }}</span>
            </div>
            <div class="item-box">
              <IepTags :value="productInfo.tagKeywords"></IepTags>
            </div>
            <div class="item-box so-item">
              <i class="el-icon-woneng-so"></i>：
              <el-link
                :underline="false"
                @click="$openPage(`${$pathPrefix_SoStyle}${productInfo.orgId}`)"
              >{{productInfo.orgName}}</el-link>
            </div>
            <div class="item-box sum-box">
              <div class="price">
                <i :class="`el-icon-woneng-v${productInfo.rank}`"></i>

                <template v-if="productInfo.payCurrency==='9'">
                  <div class="coin1">
                    特权价：
                    <span class="num">{{ productInfo.discountPrice }} 贝/</span>
                    <span class="num">{{ productInfo.discountCash }} 元</span>
                  </div>
                  <div class="coin">
                    <del>
                      <span>{{ productInfo.price }} 贝/</span>
                    </del>
                    <del>
                      <span>{{ productInfo.cash }} 元</span>
                    </del>
                  </div>
                </template>
                <template v-if="productInfo.payCurrency==='1'">
                  <div class="coin1">
                    特权价：
                    <span class="num">{{ productInfo.discountPrice }} 贝</span>
                  </div>
                  <div class="coin">
                    <del>
                      <span>{{ productInfo.price }} 贝</span>
                    </del>
                  </div>
                </template>
                <template v-if="productInfo.payCurrency==='2'">
                  <div class="coin1">
                    特权价：
                    <span class="num">{{ productInfo.discountCash }} 元</span>
                  </div>
                  <div class="coin">
                    <del>
                      <span>{{ productInfo.cash }} 元</span>
                    </del>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-show="isPublished">
        <div class="btn-group">
          <!-- 报告 -->
          <div class="btn-gp">
            <el-button
              class="buy-btn iep-btn-m"
              icon="el-icon-woneng-kefu3"
              @click="handleDdvisory()"
            >咨询</el-button>
            <!-- 软件 -->
            <template v-if="['0', '1'].includes(productInfo.type)">
              <el-button
                v-if="productInfo.website"
                class="buy-btn iep-btn-m"
                type
                @click="$openPage(productInfo.website, 2)"
                plain
              >试用</el-button>
            </template>
            <el-button
              class="buy-btn iep-btn-m"
              type="primary"
              @click="handleOrder()"
              v-if="productInfo.certificationStatus!='0'"
            >购买</el-button>
          </div>
        </div>
        <div>
          <template v-if="['0','1','2','3','4'].includes(productInfo.type)">
            <span v-if="productInfo.isBought == 1" @click="handleDownload()" class="collection">
              <i class="el-icon-woneng-xiazai2"></i>下载
            </span>
          </template>
          <span @click="$openPage('/channel_proxyProduct/buy_proxy')" class="collection">
            <i class="el-icon-woneng-tequan-1"></i>代理
          </span>
          <!-- <span @click="handleCollection" class="collection">
            <i class="el-icon-woneng-xingxing"></i>收藏
          </span>-->
          <IepCollectionBtn
            :collect="productInfo.collect"
            :name="productInfo.name"
            :id="productInfo.id"
            :type="6"
            @update-data="updateData()"
          ></IepCollectionBtn>
        </div>
      </div>
    </el-card>
    <div class="content-center">
      <div class="carousel" v-if="productInfo.previewImgUrl&&productInfo.previewImgUrl.length">
        <h4>{{typeMap[productInfo.type]}}截图</h4>
        <pic-list :imgList="productInfo.previewImgUrl"></pic-list>
      </div>
      <div class="introduce">
        <h4>
          {{typeMap[productInfo.type]}}介绍
          <OfficialIcon v-if="productInfo.isOfficial==='1'" isText></OfficialIcon>
        </h4>
        <pre>{{productInfo.description}}</pre>
      </div>
      <div class="version" v-if="['0','1'].includes(productInfo.type)">
        <h4>版本信息</h4>
        <div class="info">
          <span>版本信息：{{productInfo.version | showText}}</span>
          <span>更新时间：{{productInfo.versionTime | showText}}</span>
        </div>
      </div>
      <div class="version" v-if="productInfo.customers.length">
        <h4>客户</h4>
        <div class="customer-list">
          <div class="customer" v-for="item in productInfo.customers" :key="item.id">{{item.name}}</div>
        </div>
      </div>
      <div class="version" v-if="['0'].includes(productInfo.type)">
        <h4>此方案关联的 {{productInfo.productList.length}} 个产品</h4>
        <iep-no-data v-if="!productInfo.productList.length" complex></iep-no-data>
        <ProductCard :itemList="productInfo.productList"></ProductCard>
      </div>
      <div class="version" v-if="!['0'].includes(productInfo.type)">
        <h4>应用此产品的方案</h4>
        <iep-no-data v-if="!productInfo.planList.length" complex></iep-no-data>
        <ProgramCard :itemList="productInfo.planList"></ProgramCard>
      </div>
      <div class="relation" v-show="isPublished">
        <Comment :id="id" :name="productInfo.name" @updateStar="updateData()"></Comment>
      </div>
      <div class="relation" v-show="isPublished">
        <h4>猜你喜欢</h4>
        <iep-no-data v-if="!productInfo.recommendProducts.length" complex></iep-no-data>
        <ProductCard :itemList="productInfo.recommendProducts"></ProductCard>
      </div>
    </div>
    <IepDialogReqJoinSo ref="IepDialogReqJoinSo" @load-page="updateData()"></IepDialogReqJoinSo>
    <DownloadDialog ref="DownloadDialog"></DownloadDialog>
  </div>
</template>

<script>
import { typeMap } from "../options";
import { getUserHadList } from "@/api/admin/org";
import PicList from "./PicList";
import { applyOrg } from "@/api/admin/org";
import ProductCard from "./ProductCard";
import ProgramCard from "./ProgramCard";
import DownloadDialog from "./DownloadDialog";
import Comment from "./Comment";
import OfficialIcon from "./OfficialIcon";
import { mapActions } from "vuex";
export default {
  components: {
    PicList,
    ProductCard,
    ProgramCard,
    Comment,
    OfficialIcon,
    DownloadDialog,
  },
  props: {
    productInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeMap,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isPublished() {
      return this.productInfo.certificationStatus === "2";
    },
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId"]),
    _handleSendMsg(orgId) {
      this.imcOpenConversionByTargetId({
        targetId: orgId + "",
        type: 3,
      });
    },
    async handleDdvisory() {
      const { data } = await getUserHadList();
      const orgIds = data.map((m) => m.orgId);
      const { orgId, isExempt } = this.productInfo;
      if (orgIds.includes(orgId)) {
        this._handleSendMsg(orgId);
      } else {
        if (isExempt) {
          const { data } = await applyOrg({ orgId });
          if (data) {
            this._handleSendMsg(orgId);
            setTimeout(() => {
              this.$message("已加入该组织，并跳转到群聊中");
            }, 500);
          }
        } else {
          this.$refs["IepDialogReqJoinSo"].orgId = orgId;
          this.$refs["IepDialogReqJoinSo"].dialogShow = true;
          setTimeout(() => {
            this.$message("该组织需要发起验证申请！");
          }, 500);
        }
      }
    },
    handleDownload() {
      if (this.productInfo.attachList.length) {
        this.$refs["DownloadDialog"].attachList = this.productInfo.attachList;
        this.$refs["DownloadDialog"].dialogShow = true;
      }
    },
    updateData() {
      this.$emit("updateData");
    },
    handleOrder() {
      this.$generateOrderPage({
        id: this.productInfo.id,
        type: 1,
        category: this.productInfo.type,
        name: this.productInfo.name,
        avatar: this.productInfo.imageUrl,
        orgName: this.productInfo.orgName,
        amount: 1,
        price: this.productInfo.price,
        cash: this.productInfo.cash,
        discountPrice: this.productInfo.discountPrice,
        discountCash: this.productInfo.discountCash,
        goodsPrice: this.productInfo.price,
        goodsCash: this.productInfo.cash,
        payCurrency: this.productInfo.payCurrency,
        paymentMethod: this.productInfo.paymentMethod,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-container {
  padding: 20px 0;
}
.content-center {
  margin: 0 auto;
  width: 1200px;
  .relation,
  .carousel,
  .introduce,
  .version {
    margin-top: 50px;
    h4 {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    pre {
      margin: -10px 0;
    }
  }
  .relation:last-child {
    margin: 30px 0 20px;
  }
  .info {
    span {
      display: block;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 14px;
      color: $--color-text-regular;
    }
  }
}
.item-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.top-box ::v-deep .el-card__body {
  display: flex;
  justify-content: space-between;
}
.img {
  margin-right: 20px;
  width: 160px;
  min-width: 160px;
  height: 160px;
  border-radius: $--border-radius-base;
  img {
    width: 100%;
    height: 100%;
  }
}
.join {
  background-color: $--color-primary;
  border: 1px solid $--color-primary;
  color: #fff;
  transition: all 0.5s;
  &:hover {
    background-color: #fff;
    border: 1px solid $--color-primary;
    color: $--color-primary;
  }
}
.top-box ::v-deep .title-col {
  margin-bottom: 0;
}
.txt {
  flex: 1;
  height: 160px;
  position: relative;
  .rate-text {
    margin: 10px 0;
    font-size: 14px;
    color: $--color-input-regular;
  }
  .describe {
    font-size: 14px;
    line-height: 14px;
    color: $--color-text-secondary;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 16px;
    overflow: hidden;
  }
  .weight {
    margin-right: 10px;
    max-width: 380px;
    font-size: 20px;
    font-weight: 500;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .sum-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    .price {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        color: #f74437;
      }
    }
  }
  .so-item {
    display: flex;
    align-items: center;
    line-height: 20px;
    i {
      font-size: 20px;
    }
    span {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
  .item-box,
  .item-box-share {
    .coin,
    .coin1 {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: $--color-text-secondary;
      strong {
        font-size: 16px;
        font-weight: 400;
      }
      .num {
        margin-right: 3px;
        font-size: 16px;
        color: $--color-primary;
      }
    }
    .coin1 {
      margin-right: 20px;
    }
    .serve {
      margin-top: 15px;
    }
  }
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex: 0 0 400px;
  .btn-group {
    display: flex;
    flex-direction: column;
    .btn-gp {
      display: flex;
      align-items: center;
    }
    .el-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      &:last-child {
        margin: 0;
      }
    }
    .down-it {
      margin-left: 5px;
      margin-bottom: 10px;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background: rgba(243, 245, 245, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .collection {
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: $--color-text-regular;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      opacity: 0.7;
    }
    i {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      font-size: 20px;
      color: $--color-input-regular;
      &.yellow {
        color: $--color-fourth;
      }
    }
  }
}
.base {
  border-bottom: 1px solid $--border-color;
  .txt {
    padding: 20px 20px 0 0;
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: #303031;
  }
  .context {
    font-size: 14px;
    padding: 20px 0;
    color: $--color-text-regular;
  }
}
.el-form {
  margin: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
.top-box {
  border-radius: 10px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 12px 0 $--background-color;
  }
}
.img ::v-deep .el-image__inner {
  width: 100%;
  max-height: 100%;
}
.basic-container ::v-deep .el-tabs__content,
.basic-container ::v-deep .el-tabs__content p,
.basic-container ::v-deep .el-tabs__content span {
  font-size: 14px !important;
  text-align: justify;
}
.buy-btn {
  margin-left: 0;
  margin-right: 10px;
}
::v-deep .buy-btn.el-button--default {
  &:hover {
    i {
      color: #f74437;
    }
  }
}
.buy-btn ::v-deep i {
  font-size: 20px;
  color: $--color-input-regular;
}
.buy-btn ::v-deep .el-button-group {
  position: relative;
}
.buy-btn ::v-deep .el-button-group .el-button--primary:first-child {
  margin-right: 5px;
  padding: 0 20px;
  width: 105px;
  height: 36px;
  font-size: 14px;
  border-radius: $--border-radius-base;
}
.buy-btn ::v-deep .el-button-group .el-button--primary:last-child {
  width: 36px;
  height: 36px;
  font-size: 14px;
  background-color: $--background-color;
  color: $--color-text-secondary;
  border-color: $--background-color;
  border-radius: $--border-radius-base;
}
::v-deep .el-rate__icon {
  font-size: 22px;
}

.customer-list {
  display: flex;
  .customer {
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    padding: 10px 20px;
    margin-right: 20px;
  }
}
</style>
