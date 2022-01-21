<template>
  <el-card shadow="never">
    <div class="item-wrapper">
      <div class="content">
        <div class="title" @click="handleClick">
          <span class="iep-ellipsis-flex" :title="value.name">{{value.name}}</span>
        </div>
        <div>
          <iep-tags :value="value.labels"></iep-tags>
        </div>
        <div class="org iep-ellipsis-flex">
          <iep-img :src="value.picture" :resizeOpt="{l:30}"></iep-img>
          <span @click="changeOrg">{{value.orgName}}</span>
        </div>
      </div>
      <div class="other">
        <div class="status" :style="{color:statusColor[value.state]}">{{status[value.state]}}</div>
        <div class="createTime">{{value.createTime|parseToDay}}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { dictsMap } from "@/views/channel/questionnaire/const/option";
const statusColor = {
  1: "#3cd489",
  2: "#303031",
  3: "#f74437",
  4: "#2f80ff",
  5: "#fe9b00",
  6: "#303031",
};
export default {
  name: "QuestionnaireRowItem",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      statusColor,
      status: dictsMap.status,
    };
  },
  methods: {
    changeOrg() {
      this.$emit("changeOrg", this.value.orgId);
    },
    handleClick() {
      this.$openPage(`/questionnaire_edit/${this.value.id}`, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper {
  display: flex;
}
.content {
  flex: 1;
  .title {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .org {
    margin-top: 10px;
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
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  color: $--color-text-secondary;
}
</style>