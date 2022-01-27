<template>
  <div class="parther-introduce">
    <div class="introduce-banner">
      <div class="introduce-content">
        <div class="banner-left">
          <div class="banner-title">
            <div class="banner-title-first">节能宝</div>
            <div class="banner-title-seacond">五位一体，核心优势，定义未来等数据资产运营能力</div>
          </div>
          <div
            class="banner-sub-title"
          >以数据治理架构师为使命，以定义未来为愿景，聚焦“数字生态系统+数字技能提升+百万合伙人+智慧群组+行业运营”五位一体的数据资产运营，打造智慧城市、数字政府、智慧园区、智慧企业等项目创新标杆，引领组织变革、数据治理、流程再造新浪潮。</div>
        </div>
        <div class="banner-right">
          <iep-img :src="'/img/recruit/partner-banner-pic.png'"></iep-img>
        </div>
      </div>
    </div>
    <div class="introduce-head">
      <div class="title">节能宝，五新价值体系</div>
      <div class="system-list">
        <div
          class="system-item"
          :class="{'hover' : isSystemHover === index}"
          v-for="(item, index) in introduceList.systemList"
          :key="index"
          @mouseenter="()=>{isSystemHover = index}"
        >
          <i :class="item.icon"></i>
          <div class="system-name">{{item.name}}</div>
          <div class="system-label">{{item.label}}</div>
        </div>
      </div>
    </div>
    <div class="introduce-word">
      <div class="title">加入节能宝，成为合伙人</div>
      <div class="join-table">
        <div class="table-span" v-for="(item, index) in introduceList.partherList" :key="index">
          <div class="first">{{item.name}}</div>
          <div class="second">{{item.label}}</div>
          <el-button class="button" type="primary" @click="$openPage('/channel/partner_apply')">在线申请</el-button>
        </div>
      </div>
    </div>
    <div class="introduce-guarantee">
      <div class="guarantee-content">
        <div class="title">多重权益保障</div>
        <div class="guarantee-table">
          <div class="table-span" v-for="(item, index) in introduceList.guarantee" :key="index">
            <div class="icon">
              <i :class="item.icon"></i>
            </div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
        <div class="guarantee-direction">
          <div class="direction-item" v-for="(item, index) in introduceList.direction" :key="index">
            <div class="direction-title">{{item.name}}</div>
            <div class="direction-span" v-for="(t, i) in item.list" :key="i">{{t}}</div>
            <div class="direction-sub" v-if="item.subList">
              <div
                class="direction-sub-item"
                v-for="(subItem, subIndex) in item.subList"
                :key="subIndex"
              >{{subItem}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="introduce-agent">
      <div class="title">多样产品代理</div>
      <div class="agent-list">
        <div class="agent-item" v-for="(item, index) in introduceList.product" :key="index">
          <iep-img class="agent-img" :src="item.img"></iep-img>
          <div class="agent-name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="introduce-cooperation">
      <div class="title">合作案例</div>
      <div class="cooperation-list">
        <div
          class="cooperation-item"
          v-for="(item, index) in introduceList.cooperation"
          :key="index"
        >
          <iep-img class="cooperation-img" :src="item.img"></iep-img>
          <div class="cooperation-name">{{item.label}}</div>
          <div class="cooperation-sub-name">{{item.sub}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { introduceList } from "./options";
export default {
  data() {
    return {
      introduceList,
      isSystemHover: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.parther-introduce {
  padding-bottom: 60px;
  .introduce-banner {
    background-image: url("/img/recruit/partner-bg-banner.png");
    width: 100%;
    height: 400px;
    .introduce-content {
      width: 1200px;
      display: flex;
      justify-content: center;
      margin: auto;
    }
    .banner-left {
      flex: 1;
      padding: 110px 100px 0 0;
      .banner-title {
        display: flex;
        margin-bottom: 30px;
        .banner-title-first {
          height: 40px;
          font-size: 40px;
          font-weight: 400;
          color: $--color-primary;
          margin-right: 20px;
          line-height: 30px;
        }
        .banner-title-seacond {
          height: 40px;
          font-size: 18px;
          font-weight: 400;
          color: $--color-text-primary;
          line-height: 40px;
        }
      }
      .banner-sub-title {
        font-size: 16px;
        font-weight: 400;
        color: $--color-text-regular;
        line-height: 30px;
      }
    }
    .banner-right {
      width: 400px;
      height: 400px;
    }
  }
  .title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    color: $--color-text-primary;
  }
  .introduce-head {
    width: 1200px;
    margin: 50px auto 75px;
    .system-list {
      display: flex;
      margin-top: 50px;
      .system-item {
        width: 20%;
        text-align: center;
        padding: 28px 0;
        cursor: pointer;
        border-radius: $--border-radius-base;
        i {
          font-size: 41px;
          margin: auto;
          margin-bottom: 25px;
          color: $--color-input-regular;
        }
        .system-name {
          font-size: 18px;
          color: $--color-text-primary;
          margin-bottom: 15px;
        }
        .system-label {
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
      .hover {
        background-color: $--color-primary;
        i,
        .system-name,
        .system-label {
          color: #fff;
        }
      }
    }
  }
  .introduce-word {
    margin: 50px auto 0;
    width: 1200px;
    .join-table {
      display: flex;
      margin: 50px 0 64px;
      .table-span {
        width: 20%;
        padding: 40px 25px 74px;
        position: relative;
        border: 1px solid $--border-color;
        border-right-color: #fff;
        .first {
          margin-bottom: 20px;
          text-align: center;
          color: $--color-text-primary;
          font-size: 20px;
        }
        .second {
          color: $--color-text-regular;
          font-size: 16px;
          margin-bottom: 30px;
        }
        .button {
          position: absolute;
          bottom: 34px;
          background-color: #feeceb;
          color: $--color-primary;
          border: 0;
          width: calc(100% - 50px);
          left: 25px;
          padding: 15px 0;
        }
        &:last-of-type {
          border-right: 1px solid $--border-color;
        }
        &:hover {
          border: 1px solid $--color-primary;
        }
      }
    }
  }
  .introduce-guarantee {
    padding: 60px;
    background-color: $--background-color;
    margin: 50px 0 0;
    .guarantee-content {
      width: 1200px;
      margin: auto;
      .guarantee-table {
        display: flex;
        margin: 64px 0;
        .table-span {
          width: 25%;
          text-align: center;
          .icon {
            background-color: #fff;
            border-radius: 50%;
            color: $--color-primary;
            width: 90px;
            height: 90px;
            line-height: 103px;
            margin: auto;
            margin-bottom: 25px;
            i {
              font-size: 32px;
            }
          }
          .name {
            color: $--color-text-primary;
            font-size: 16px;
          }
        }
      }
      .guarantee-direction {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: auto;
        .direction-item {
          width: calc(33% - 40px);
          cursor: pointer;
          border-radius: $--border-radius-base;
          background-color: #fff;
          padding: 35px 0 25px;
          .direction-title {
            color: $--color-primary;
            margin-bottom: 32px;
            display: flex;
            line-height: 27px;
            &::before {
              content: "";
              width: 3px;
              height: 26px;
              border-radius: 0px 3px 3px 0px;
              background-color: $--color-primary;
              display: block;
              margin-right: 22px;
            }
          }
          .direction-span {
            color: $--color-text-regular;
            position: relative;
            padding: 0 15px 15px 40px;
            font-size: 14px;
            &::before {
              content: "";
              width: 5px;
              height: 5px;
              background: $--color-input-regular;
              border-radius: 50%;
              position: absolute;
              top: 9px;
              left: 26px;
            }
          }
          .direction-sub {
            font-size: 14px;
            background-color: $--background-color;
            margin: 0 25px;
            padding: 15px;
            border-radius: $--border-radius-base;
            .direction-sub-item {
              padding-bottom: 15px;
            }
          }
        }
      }
    }
  }
  .introduce-agent {
    width: 1200px;
    margin: 50px auto 0;
    .agent-list {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      .agent-item {
        display: block;
        width: 20%;
        padding-bottom: 20px;
        .agent-img {
          display: block;
          margin-bottom: 25px;
          height: auto;
        }
        .agent-name {
          text-align: center;
        }
      }
    }
  }
  .introduce-cooperation {
    width: 1200px;
    margin: 50px auto 0;
    .cooperation-list {
      display: flex;
      justify-content: space-between;
      margin-top: 100px;
      .cooperation-item {
        position: relative;
        width: 20%;
        background: #ffffff;
        border: 1px solid $--border-color;
        border-radius: $--border-radius-base;
        padding: 20px;
        .cooperation-img {
          position: absolute;
          width: 100px;
          height: 100px;
          top: -50px;
          left: calc(50% - 50px);
          border: 1px solid $--border-color;
          border-radius: 50%;
        }
        .cooperation-name {
          margin: 50px 0 17px;
          font-weight: 400;
          color: $--color-text-primary;
          text-align: center;
        }
        .cooperation-sub-name {
          font-size: 14px;
          font-weight: 400;
          color: $--color-text-secondary;
          text-align: center;
        }
      }
    }
  }
}
</style>
