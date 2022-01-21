<template>
  <el-card shadow="never">
    <div class="item-wrapper">
      <div class="content">
        <div class="title" @click="handleClick">
          <span class="iep-ellipsis-flex" :title="value.materialName">{{value.materialName}}</span>
          <el-tag size="mini" type="primary" style="margin-left:5px;">{{'收费'}}</el-tag>
        </div>
        <div
          class="material-intro iep-ellipsis-flex"
          :title="value.materialIntro"
        >{{value.materialIntro}}</div>
        <div>
          <iep-tags :value="value.tagKeywords"></iep-tags>
        </div>
        <div class="org iep-ellipsis-flex">
          <iep-img :src="value.orgAvatar" :resizeOpt="{l:30}"></iep-img>

          <span @click="changeOrg">{{value.orgName||"模拟数据组织"}}</span>
        </div>
      </div>
      <div class="other">
        <div
          class="isOriginal"
          :style="{color:isOriginalColor[value.isOriginal]}"
        >{{isOriginal[value.isOriginal]}}</div>
        <div class="createTime">{{value.createTime|parseToDay}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
const isOriginalColor = {
  0: "#f74437",
  1: "#3cd489",
};
const dictsMap = {
  isOriginal: {
    "0": "转载",
    "1": "原创",
  },
};
export default {
  name: "MaterialRowItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOriginalColor,
      isOriginal: dictsMap.isOriginal,
    };
  },
  methods: {
    changeOrg() {
      this.$emit("changeOrg", this.value.orgId);
    },
    handleClick() {
      // this.$openPage(`/channel/mo_fang/detail/${this.value.id}`);
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
  .material-intro {
    font-size: 14px;
    color: $--color-text-secondary;
  }
  .org {
    font-size: 14px;
    display: flex;
    align-items: center;
    span {
      color: $--color-text-secondary;
      cursor: pointer;
      margin-left: 10px;
    }
    .iep-image {
      width: 30px;
      height: 30px;
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