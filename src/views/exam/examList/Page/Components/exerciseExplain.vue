<template>
  <div class="wrapper">
    <div class="title">{{explainData.examName}}</div>
    <el-row>
      <el-col class="colBlock" :span="12">
        时间：
        <span v-if="explainData.beginTime">
          {{explainData.beginTime | parseToDay}} 至
          {{explainData.endTime | parseToDay}}
        </span>
        <span v-else>长期有效</span>
      </el-col>
      <el-col class="colBlock" :span="12">题数：共{{explainData.choiceNum}}题</el-col>
      <el-col class="colBlock" :span="12">难度：{{levelName(explainData.level)}}</el-col>
      <el-col class="colBlock" :span="12">次数：{{次数(explainData.repeatExam)}}</el-col>
      <el-col
        class="colBlock"
        :span="12"
        v-if="explainData.chargeStatus === '2'"
      >费用：{{explainData.consume}}贝</el-col>
    </el-row>
    <div class="description" v-if="explainData.examExplain" v-html="explainData.examExplain"></div>
    <div class="matarial">
      <template v-if="explainData.materialList && explainData.materialList.length > 0">
        <div class="smallTitle">材料：</div>
        <div class="content">
          <el-link
            class="contentItem"
            type="primary"
            v-for="item of explainData.materialList"
            :key="item.id"
            @click="$openPage(`/my/index/material/${item.id}`)"
          >
            {{item.name}}
            <i class="el-icon-arrow-right iconItem"></i>
          </el-link>
        </div>
        <hr />
      </template>
    </div>

    <div class="description" style="display: flex;">
      <IepPopoverOrgCard :orgId="explainData.orgId||0">
        <iep-img class="img" :src="explainData.soAvatar"></iep-img>
      </IepPopoverOrgCard>
      <div class="txt">
        <div>{{explainData.orgName}}</div>
        <div>考证: {{explainData.textualResearchNum}}个</div>
      </div>
      <hr />
    </div>
    <div v-if="explainData.relatedExamList.length" class="text">
      <div class="smallTitle">相关练习：</div>
      <div class="content">
        <div
          class="contentItem"
          v-for="item in explainData.relatedExamList"
          :key="item.id"
          @click="handleExe(item.id)"
        >
          <div class="con">{{item.examName}}</div>
          <span class="num">{{item.testNumber}}人已考</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    explainData: {
      type: Object,
      required: true,
      default: () => {
        return {
          orgId: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    次数(value) {
      if (value === "1") {
        return "单次";
      } else {
        return "不限次";
      }
    },
    levelName(level) {
      if (level) {
        const dicMap = {
          SIMPLE: "简单",
          GENERAL: "较难",
          DIFFICULT: "很难",
        };
        return dicMap[level];
      } else {
        return "暂无难度";
      }
    },
    handleExe(id) {
      this.$emit("reload", id);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin-bottom: 17px;
}
.title {
  text-align: center;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 25px;
}
.colBlock {
  padding: 5px 0;
}
.description {
  background: #f5f4f7;
  padding: 15px;
  border-radius: 15px;
  margin: 10px 0;
  line-height: 26px;
  font-size: 14px !important;
  .txt {
    margin-left: 20px;
    div {
      margin: 10px 0;
    }
  }
  .img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    border: 1px solid $--border-color;
    box-sizing: border-box;
  }
}
.smallTitle {
  margin: 20px 0 10px;
  font-size: 14px;
}
.footer {
  text-align: center;
}
.contentItem {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 5px;
  background: #f5f4f7;
  padding: 20px;
  margin-bottom: 10px;
  color: #666769;
  &:hover {
    &:after {
      border-color: transparent !important;
    }
  }
  .con {
    max-width: 700px;
    text-align: justify;
  }
  .num {
    display: inline-block;
    margin-left: 10px;
    text-align: right;
    vertical-align: middle;
    color: #919397;
  }
  .iconItem {
    float: right;
    line-height: 20px;
  }
}
</style>
