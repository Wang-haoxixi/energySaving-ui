<template>
  <div>
    <div class="recommend-peopel" v-for="r in recommendMemberList" :key="r.id">
      <div class="img">
        <iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img>
      </div>
      <div class="right">
        <div class="name-top">
          <span class="name">{{r.name}}</span>
          <iep-button
            class="recommend-container-btn"
            type="danger"
            plain
            @click="reference(r)"
            size="mini"
          >设为项目经理</iep-button>
        </div>
        <span>
          负责了
          <span style="font-size:16px;margin:0 2px;">{{r.conscientiousCount}}</span>个项目 | 参与了
          <span style="font-size:16px;margin:0 2px;">{{r.participateCount}}</span>个项目
        </span>
        <span class="sign" v-show="vShow">
          <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { recommendMember } from "@/api/gpms/index";
export default {
  props: {
    projectTagList: {
      type: Array,
      required: true,
      default: () => [],
      vShow: true,
    },
  },
  data() {
    return {
      recommendMemberList: [],
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      recommendMember({ projectTagList: this.projectTagList }).then(res => {
        this.recommendMemberList = res;
      });
    },
    reference(item) {
      this.$emit("referenceClick", item, "people");
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend-peopel {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  margin-bottom: 10px;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid $--border-color;
  .img {
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    float: left;
    .img-box {
      width: 50px;
      border-radius: 10px;
      border: 1px solid $--border-color;
    }
  }
  .right {
    flex: 1;
    margin-left: 15px;
    .name-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    > span {
      display: block;
      width: 100%;
      height: 22px;
      line-height: 22px;
      color: $--color-text-secondary;
    }
    .name {
      font-size: 14px;
      width: 120px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
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
  }
}
.recommend-container-btn {
  width: 80px;
}
</style>
