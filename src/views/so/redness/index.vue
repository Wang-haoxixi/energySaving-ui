<template>
  <div class="grid-parent">
    <div class="redness-wrap">
      <div class="redness-title">
        当前红度等级
        <i :class="`el-icon-woneng-hongdu${form.redness} iep-hongdu-v${form.redness}`"></i>
      </div>
      <div class="redness-rank">
        <div :class="`redness-item ${calcActive(o)}`" v-for="o in 5" :key="o">
          <i :class="`el-icon-woneng-hongdu${o} ${calcActive(o)}`"></i>
          <span v-if="o===(form.redness + 1)" class="unreaches">未达到</span>
        </div>
      </div>
      <div v-if="form.redness!==5" class="redness-tip">
        距离下一级还差
        <strong>{{form.upgradeScore}}点</strong>
        红度值
      </div>
      <div v-else style="height:44px;"></div>
    </div>
    <RednessInfo />
  </div>
</template>
<script>
import RednessInfo from "@/views/Components/Functional/RednessInfo";
import { getRednessAnalysis } from "@/api/dms/redness_record";
import { mapGetters } from "vuex";
const initForm = () => {
  return {
    dayScore: 0,
    nightyScore: 0,
    redness: 0,
    upgradeScore: 0,
  };
};
export default {
  components: {
    RednessInfo,
  },
  data() {
    return {
      form: initForm(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.load();
  },
  methods: {
    calcActive(current) {
      if (current <= this.form.redness) {
        return `iep-hongdu-v${current}`;
      } else {
        return "";
      }
    },
    async load() {
      const { data } = await getRednessAnalysis({
        type: 2,
        relationId: this.userInfo.orgId,
      });
      this.form = this.$mergeByFirst(initForm(), data);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 300px 1fr;
  gap: 20px;
  .redness-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: $--color-input-regular;
  }
  .redness-title {
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    color: $--color-text-primary;
    i {
      font-size: 32px;
    }
  }
  .redness-rank {
    width: 100%;
    display: flex;
    justify-content: center;
    i {
      font-size: 25px;
      color: inherit;
    }
    // .redness-item {
    //   border-color: inherit !important;
    // }
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 120px;
      width: 58px;
      height: 58px;
      &::after {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        width: 58px;
        height: 58px;
        border: 1px solid $--color-input-regular;
        border-radius: 50%;
      }
      &::before {
        position: absolute;
        content: "";
        top: 50%;
        left: 6%;
        right: 40%;
        height: 1px;
        background-color: $--color-input-regular;
      }
      &:first-of-type {
        padding-left: 0;
        &::before {
          display: none;
        }
      }
    }
    .redness-item {
      .unreaches {
        position: absolute;
        bottom: -25px;
        font-size: 12px;
        color: $--color-input-regular;
      }
      &.iep-hongdu-v1 {
        &::after {
          border-color: #f3b4af;
        }
        // &::before {
        //   background-color: #f3b4af;
        // }
      }
      &.iep-hongdu-v2 {
        &::after {
          border-color: #ff8574;
        }
        &::before {
          background-color: #f3b4af;
        }
      }
      &.iep-hongdu-v3 {
        &::after {
          border-color: #f250b1;
        }
        &::before {
          background-color: #ff8574;
        }
      }
      &.iep-hongdu-v4 {
        &::after {
          border-color: #eb33d3;
        }
        &::before {
          background-color: #f250b1;
        }
      }
      &.iep-hongdu-v5 {
        &::after {
          border-color: #e418f3;
        }
        &::before {
          background-color: #eb33d3;
        }
      }
    }
  }
  .redness-tip {
    margin-bottom: 20px;
    padding: 10px 30px;
    font-size: 16px;
    text-align: center;
    background-color: $--background-color;
    box-sizing: border-box;
    border-radius: 20px;
    color: $--color-text-primary;
  }
  & > div {
    border: 1px solid $--border-color;
    border-radius: 10px;
    padding: 20px;
  }
  h3 {
    margin: 5px 0 30px;
    font-size: 22px;
    text-align: center;
    color: $--color-text-primary;
  }
  h4 {
    position: relative;
    margin: 0;
    padding-left: 10px;
    font-size: 14px;
    color: $--color-text-primary;
    &::before {
      position: absolute;
      content: "";
      top: 8px;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: $--color-primary;
    }
  }
  p {
    margin: 8px 0 25px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 30px;
    text-align: justify;
    color: $--color-text-regular;
    &:last-child {
      margin-bottom: 5px;
    }
  }
}
</style>
