<template>
  <div class="box">
    <div class="item" v-for="item in itemList" :key="item.type">
      <div class="icon">
        <i :class="item.icon"></i>
      </div>
      <div class="txt">
        <span>{{item.name}}</span>
        <span>{{item.num|showBigNumber|arrJoin}}{{item.unit}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrgBalanceValuation } from "@/api/admin/org";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      itemList: [
        {
          type: "balance",
          icon: "el-icon-woneng-beishixin",
          name: "当前宝贝",
          num: "--",
          unit: "贝",
        },
        {
          type: "assess",
          icon: "el-icon-woneng-tongjibiaoshixin",
          name: "当前估值",
          num: "--",
          unit: "元",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async loadPage() {
      const params = { type: 3, id: this.userInfo.orgId };
      const { data } = await getOrgBalanceValuation(params);
      if (data) {
        this.itemList[0]["num"] = data.balance;
        this.itemList[1]["num"] = data.assess;
      }
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      width: 42px;
      height: 42px;
      border-radius: 10px;
    }
    &:nth-of-type(1) .icon {
      background: linear-gradient(
        -45deg,
        rgba(130, 228, 255, 1),
        rgba(36, 165, 255, 1)
      );
    }
    &:nth-of-type(2) .icon {
      background: linear-gradient(
        -45deg,
        rgba(255, 226, 144, 1),
        rgba(255, 160, 20, 1)
      );
    }
    i {
      font-size: 30px;
      color: #fff;
    }
    .txt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          color: $--color-text-secondary;
        }
        &:nth-of-type(2) {
          font-size: 18px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
      }
    }
  }
}
</style>
