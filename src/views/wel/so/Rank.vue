<template>
  <div class="rank-box box">
    <div class="sub-title">贡献排行</div>
    <div v-if="rankList.length">
      <div class="item-group" v-for="(rank,i) in rankList" :key="i">
        <div class="num-name">
          <i class="num">{{i+1}}</i>
          <span class="name iep-ellipsis">{{rank.realName}}</span>
          <svg v-if="i===0" class="iep-icon" aria-hidden="true">
            <use xlink:href="#iep2-iconjinpai" />
          </svg>
          <svg v-if="i===1" class="iep-icon" aria-hidden="true">
            <use xlink:href="#iep2-iconyinpai" />
          </svg>
          <svg v-if="i===2" class="iep-icon" aria-hidden="true">
            <use xlink:href="#iep2-icontongpai" />
          </svg>
        </div>
        <span class="scale">{{rank.proportion}}%</span>
      </div>
    </div>
    <iep-no-data message="暂无排行" v-else></iep-no-data>
  </div>
</template>
<script>
import { getMaterialRankByOrgId } from "@/api/dms/material";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rankList: [],
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getMaterialRankByOrgId(this.userInfo.orgId);
      this.rankList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";

.item-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0;
  font-size: 14px;
  &:nth-child(1) {
    margin-top: 25px;
  }
  &:nth-child(-n + 3) {
    .name,
    .scale {
      color: $--color-primary;
    }
    .num {
      color: $--color-primary;
      border-color: $--color-primary;
    }
  }
  .num-name,
  .scale {
    color: $--color-text-regular;
  }
  span,
  i,
  .iep-icon {
    display: inline-block;
    vertical-align: middle;
  }
  .iep-icon {
    font-size: 22px;
    margin-left: 5px;
  }
  .num {
    width: 20px;
    height: 20px;
    font-style: normal;
    text-align: center;
    line-height: 20px;
    background: #fff;
    border: 1px solid $--border-color;
    border-radius: 5px;
    color: $--color-text-secondary;
  }
  .medal {
    margin-left: 10px;
    font-size: 23px;
  }

  .name {
    margin-left: 10px;
    max-width: 100px;
  }
}
</style>
