<template>
  <div class="cyberstar-box box">
    <div class="sub-title">
      <div class="title">网红达人</div>
      <el-link class="all" type="primary" @click="loadFollows()" :underline="false">
        <i class="el-icon-woneng-shuaxin"></i>换一批
      </el-link>
    </div>
    <div class="item-group">
      <div class="item" v-for="item in itemList" :key="item.id">
        <div class="con">
          <div class="img">
            <iep-popover-user-card :user-id="1">
              <iep-img :src="item.src"></iep-img>
            </iep-popover-user-card>
          </div>
          <div class="item-txt">
            <span class="name" :title="item.name">{{item.name}}</span>
            <span class="num">
              <i class="el-icon-woneng-huo"></i>
              {{item.num}}
            </span>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" size="mini" plain>
            <i class="el-icon-woneng-jiahao"></i>关注
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemList: [
        {
          src:
            "//cloud.woneng.net/20200215/a6543c47-9b7c-477d-93e8-2188ff3d357f_1581751327061.jpg",
          name: "高文勇",
          num: "10568",
        },
        {
          src:
            "//cloud.woneng.net/20200515/65abcb1d-4b50-454f-8fd7-464002e4d235.jpg",
          name: "陈晓",
          num: "9846",
        },
        {
          src:
            "//cloud.woneng.net/20200506/dac7ab29-d104-4adf-8799-81391825307d.png",
          name: "文桃桃",
          num: "7568",
        },
        {
          src:
            "//cloud.woneng.net/20200210/c5b78389-5152-45fe-b6f1-2f0c7fc2b471_IMG_20200210_115243.png",
          name: "杨颖",
          num: "6897",
        },
        {
          src: "",
          name: "王鸿雷",
          num: "6458",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.sub-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.all {
  color: $--color-text-secondary;
  i {
    margin-right: 5px;
    font-size: 10px;
  }
}
.item-group {
  .btn {
    .el-button {
      padding: 0;
      width: 60px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      border-radius: 5px;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    font-size: 14px;
    &:nth-of-type(1) {
      margin-top: 20px;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .con {
      display: flex;
      align-items: center;
    }
  }
  .img {
    margin-right: 12px;
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eff0f1;
  }
  .item-txt {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 52px;
    cursor: pointer;
    .name {
      font: 14px;
      font-family: Microsoft YaHei;
      color: #303031;
    }
    .num {
      color: $--color-text-secondary;
      i {
        font-size: 18px;
        color: $--color-primary;
      }
    }
  }
}
</style>
