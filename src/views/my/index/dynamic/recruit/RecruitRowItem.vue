<template>
  <el-card shadow="never">
    <div class="item-wrapper">
      <iep-img @click.native="handleClick" :src="value.picture" :resizeOpt="{l:100}"></iep-img>
      <div class="content">
        <div class="title" @click="handleClick">
          <span class="iep-ellipsis-flex" :title="value.name">{{value.name}}</span>
        </div>
        <div class="org iep-ellipsis-flex">
          <span @click="changeOrg">{{value.orgName}}</span>
        </div>
      </div>
      <div class="other">
        <div class="state" :style="{color:stateColor[value.state]}">{{state[value.state]}}</div>
        <div class="createTime">{{value.createTime|parseToDay}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
// import { dictsMap } from "@/views/recruit/jobList/options";
const dictsMap = {
  state: {
    0: "招聘中",
    1: "已停止",
  },
};
const stateColor = {
  0: "#3cd489",
  1: "#f74437",
};
export default {
  name: "RecruitRowItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stateColor,
      state: dictsMap.state,
    };
  },
  methods: {
    changeOrg() {
      this.$emit("changeOrg", this.value.orgId);
    },
    handleClick() {
      this.$openPage(`/channel/recruit_detail/${this.value.id}`);
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
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    cursor: pointer;
  }

  .org {
    font-size: 14px;
    span {
      color: $--color-text-secondary;
      cursor: pointer;
    }
  }
}
.other {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  color: $--color-text-secondary;
}
</style>