<template>
  <el-card shadow="never">
    <div class="item-wrapper">
      <iep-img @click.native="handleClick" :src="value.picture" :resizeOpt="{w:180}"></iep-img>
      <div class="content">
        <div class="title" @click="handleClick">
          <span class="iep-ellipsis-flex" :title="value.name">{{value.name}}</span>
        </div>
        <div class="text iep-ellipsis-flex">
          <span class="createTime">{{value.createTime|parseToDay}}</span>&nbsp;
          <span
            class="adress"
            :title="value.city+' '+value.field"
          >{{value.city}} {{value.field}}</span>
        </div>
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
          class="statusFlag"
          :style="{color:statusFlagColor[value.state]}"
        >{{statusFlag[value.state]}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { dictsMap } from "@/views/meetting/options";
const statusFlagColor = {
  0: "#303031",
  1: "#3cd489",
  2: "#f74437",
  3: "#2f80ff",
};
export default {
  name: "ActivityRowItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      statusFlagColor,
      statusFlag: dictsMap.statusFlag,
    };
  },
  methods: {
    changeOrg() {
      this.$emit("changeOrg", this.value.orgId);
    },
    handleClick() {
      this.$openPage(`/channel/activity/detail/${this.value.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper {
  display: flex;
}
.iep-image {
  width: 180px;
  height: 108px;
  cursor: pointer;
}
.content {
  flex: 1;
  margin-left: 20px;
  .title {
    cursor: pointer;
  }
  .text {
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
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;
  color: $--color-text-secondary;
}
</style>