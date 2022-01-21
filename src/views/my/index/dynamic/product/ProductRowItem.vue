<template>
  <el-card shadow="never">
    <div class="item-wrapper">
      <iep-img @click.native="handleClick" :src="value.picture" :resizeOpt="{l:100}"></iep-img>
      <div class="content">
        <div class="title" @click="handleClick">
          <span class="iep-ellipsis-flex" :title="value.name">{{value.name}}</span>
          <el-tag size="mini" type="primary" style="margin-left:5px;">{{typeMap[value.type]}}</el-tag>
        </div>
        <div class="synopsis iep-ellipsis-flex" :title="value.synopsis">{{value.synopsis}}</div>
        <div>
          <iep-tags :value="value.labels"></iep-tags>
        </div>
        <div class="org iep-ellipsis-flex">
          来自
          <span @click="changeOrg">{{value.orgName}}</span>
        </div>
      </div>
      <div class="other">
        <div
          class="certificationStatus"
          :style="{color:certificationStatusColor[value.state]}"
        >{{certificationStatus[value.state]}}</div>
        <div class="createTime">{{value.createTime|parseToDay}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { typeMap } from "@/views/channel/MoFang/options";
import { commonDictsMap } from "@/views/cpms/util";
const certificationStatusColor = {
  0: "#fe9b00",
  1: "#2f80ff",
  2: "#3cd489",
  3: "#f74437",
  9: "#303031",
};
export default {
  name: "ProductRowItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeMap,
      certificationStatusColor,
      certificationStatus: commonDictsMap.certificationStatus,
    };
  },
  methods: {
    changeOrg() {
      this.$emit("changeOrg", this.value.orgId);
    },
    handleClick() {
      this.$openPage(`/channel/mo_fang/detail/${this.value.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper {
  display: flex;
}
.iep-image {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.content {
  flex: 1;
  margin-left: 10px;
  .title {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .synopsis {
    font-size: 14px;
    color: $--color-text-secondary;
  }
  .org {
    font-size: 14px;
    span {
      color: $--color-text-secondary;
      cursor: pointer;
    }
  }
  & > div:not(.org) {
    margin-bottom: 5px;
  }
}
.other {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  color: $--color-text-secondary;
}
</style>