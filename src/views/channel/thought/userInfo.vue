<template>
  <div class="statistic">
    <iep-img
      :src="userInfo.avatar"
      class="img"
      @click.native="()=>{$router.push('/channel/styles/user/' + userInfo.userId + '/index')}"
    ></iep-img>
    <div class="name">{{userInfo.realName}}</div>
    <div class="position">{{userInfo.position}}</div>
    <div class="data">
      <div @click="handleJump(item.path)" v-for="(item, index) in statistic" :key="index">
        <p>{{dynamicData[item.value]}}</p>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getDynamic } from "@/api/dms/comprehensive";
import { statistic } from "./options";
export default {
  data() {
    return {
      statistic,
      dynamicData: {
        chatWorth: 0,
        materialWorth: 0,
        fanWorth: 0,
        followWorth: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 右上角个人信息路由跳转
    handleJump(path) {
      path = path.replace("*", this.userInfo.userId);
      this.$router.push(path);
    },
    getDynamic() {
      getDynamic().then(({ data }) => {
        const number = 10000;
        for (const key in data) {
          if (data[key] >= number) {
            data[key] = parseInt(data[key] / number) + "万";
          }
        }
        this.dynamicData = data;
      });
    },
  },
  created() {
    this.getDynamic();
  },
};
</script>

<style lang="scss" scoped>
.statistic {
  width: 100%;
  padding: 20px 15px 30px;
  border-radius: $--border-radius-base;
  background-color: #fff;
  box-sizing: border-box;
  .img {
    width: 80px;
    height: 80px;
    margin: auto;
    cursor: pointer;
  }
  .name {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    color: $--color-text-regular;
  }
  .position {
    text-align: center;
    font-size: 14px;
    color: rgba(145, 147, 151, 1);
  }
  .data {
    display: flex;
    text-align: center;
    margin-top: 20px;
    > div {
      width: 50%;
      cursor: pointer;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: 35px;
        width: 1px;
        margin-top: auto;
        margin-bottom: auto;
        background-color: #ebeef5;
      }
      &:first-of-type:before {
        width: 0;
      }
      p {
        margin: 0;
        &:first-child {
          margin-bottom: 15px;
          height: 18px;
          line-height: 18px;
          font-size: 18px;
        }
        &:last-child {
          margin-top: 10px;
          line-height: 14px;
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
    }
  }
}
</style>