<template>
  <div class="quick-wrapper">
    <iep-wrapper title="快捷入口">
      <div class="c-wrapper">
        <div class="grid-container">
          <div class="item" v-for="item in quickBtnGroup" :key="item.name" @click="item.func()">
            <IepIcon :icon="item.icon" :aColor="item.aColor" :bColor="item.bColor"></IepIcon>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </iep-wrapper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quickBtnGroup: [
        {
          name: "发布公告",
          icon: "el-icon-woneng-gonggaoshixin",
          aColor: "rgba(255,198,157,1)",
          bColor: "rgba(255,81,49,1)",
          func: this.callbackFunc("发布公告"),
        },
        {
          name: "发布任务",
          icon: "el-icon-woneng-bianji8",
          aColor: "rgba(170,170,255,1)",
          bColor: "rgba(95,85,241,1)",
          func: this.callbackFunc("发布任务"),
        },
        {
          name: "产品审核",
          icon: "el-icon-woneng-chanpinshenheshixin",
          aColor: "rgba(255,226,144,1)",
          bColor: "rgba(255,160,20,1)",
          func: this.callbackFunc("产品审核"),
        },
        {
          name: "说说管理",
          icon: "el-icon-woneng-duihuakuang1shixin",
          aColor: "rgba(170,170,255,1)",
          bColor: "rgba(95,85,241,1)",
          func: this.callbackFunc("说说管理"),
        },
        {
          name: "专栏管理",
          icon: "el-icon-woneng-zhuanlanguanlishixin",
          aColor: "rgba(104,163,255,1)",
          bColor: "rgba(45,120,237,1)",
          func: this.callbackFunc("专栏管理"),
        },
        {
          name: "合伙人管理",
          icon: "el-icon-woneng-hehuorenguanlishixin",
          aColor: "rgba(135,235,237,1)",
          bColor: "rgba(32,215,168,1)",
          func: this.callbackFunc("合伙人管理"),
        },
        {
          name: "建议处理",
          icon: "el-icon-woneng-jianyichulishixin",
          aColor: "rgba(255,167,113,1)",
          bColor: "rgba(255,54,20,1)",
          func: this.callbackFunc("建议处理"),
        },
        // {
        //   name: "标签管理",
        //   icon: "el-icon-woneng-biaoqianguanlishixin1",
        //   aColor: "rgba(255,226,144,1)",
        //   bColor: "rgba(255,160,20,1)",
        //   func: this.callbackFunc("标签管理"),
        // },
        {
          name: "举报管理",
          icon: "el-icon-woneng-jubaoguanlishixin",
          aColor: "rgba(255,175,196,1)",
          bColor: "rgba(255,51,84,1)",
          func: this.callbackFunc("举报管理"),
        },
        {
          name: "问答管理",
          icon: "el-icon-woneng-wendaguanlishixin",
          aColor: "rgba(144,220,255,1)",
          bColor: "rgba(20,116,255,1)",
          func: this.callbackFunc("问答库管理"),
        },
      ],
    };
  },
  methods: {
    callbackFunc(name) {
      return () => {
        this.$_shortcut(name);
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.c-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.grid-container {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 13px;
  margin-bottom: -20px;
  width: 100%;
  font-size: 14px;
  flex: 5;
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.right {
  color: $--color-primary;
  &:hover {
    text-decoration: underline;
  }
}
.icon-box {
  cursor: pointer;
  margin-bottom: 5px;
  width: 40px;
  height: 40px;
  background-color: darkorange;
  border-radius: $--small-border-radius;
  color: #fff;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.name {
  margin-left: 10px;
}
.item {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
