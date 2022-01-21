<template>
  <div>
    <div class="recommend-container" v-for="r in recommendProjectList" :key="r.id">
      <span
        class="name"
        @click="handleDetail(r.id)"
        style="cursor: pointer;font-size:?15px;"
      >{{r.projectName}}</span>
      <iep-button
        class="recommend-container-btn"
        type="danger"
        plain
        @click="reference(r)"
        size="mini"
      >参考项目</iep-button>
      <div class="list">
        <div class="grade" v-show="r.projectLevel==1">重</div>
        <div class="grade" v-show="r.projectLevel==2">中</div>
        <div class="grade" v-show="r.projectLevel==3">一</div>
        <div class="stage" v-show="r.projectStage==1">意向</div>
        <div class="stage" v-show="r.projectStage==2">方案</div>
        <div class="stage" v-show="r.projectStage==3">执行</div>
        <div class="stage" v-show="r.projectStage==4">完结</div>
        <div class="stage" v-show="r.projectStage==5">搁置</div>
        <div class="stage" v-show="r.projectStage==6">失败</div>
        项目经理：{{r.projectManagerList?r.projectManagerList.name:'暂无'}}
      </div>
      <span class="sign">
        <div v-for="(s,index) in r.projectTagList" :key="index" @click="openSign(s)">{{s}}</div>
      </span>
    </div>
  </div>
</template>
<script>
import { recommendProject } from "@/api/gpms/index";
export default {
  props: {
    projectTagList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      recommendProjectList: [],
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      recommendProject({ projectTagList: this.projectTagList }).then(res => {
        this.recommendProjectList = res;
      });
    },
    reference(item) {
      this.$emit("referenceClick", item, "project");
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend-container {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid $--border-color;
  position: relative;
  overflow: hidden;
  &:last-child {
    border: 0;
  }
  .list {
    display: flex;
    font-size: 14px;
  }
  .recommend-container-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.grade,
.stage {
  color: $--color-text-secondary;
  font-size: 12px;
  padding: 0 6px;
  height: 18px;
  line-height: 18px;
  margin-right: 4px;
  margin-top: 2px;
}
.grade {
  background-color: $--color-primary;
  color: #fff;
  border-radius: 4px;
}
.stage {
  margin-right: 10px;
  background-color: rgba(244, 245, 246, 1);
  border-radius: 4px;
}
.sign {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  > div {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    margin-right: 12px;
    padding-right: 10px;
    font-size: 14px;
    color: $--color-text-regular;
    cursor: pointer;
    &:after {
      content: "/";
      position: absolute;
      right: -4px;
      top: 0;
    }
    &:last-child {
      &:after {
        content: "";
      }
    }
  }
}
</style>
