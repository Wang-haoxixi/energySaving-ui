<template>
  <div class="item-wrap">
    <div class="item-content">
      <div class="name" :class="{'iep-red':item.status===2,'is-bold':item.status===2}">{{item.name}}</div>
      <div class="status">
        <i v-if="item.status === 1" class="el-icon-warning-outline"></i>
        <i v-else class="iep-red el-icon-circle-check"></i>
      </div>
      <div class="desc-content">
        <div class="desc-wrap">
          <div class="desc">
            <span
              :class="{'iep-red':item.status===2,'is-bold':item.status===2}"
            >{{item.description}}</span>
            <i
              v-if="item.isDetail==='1'"
              class="el-icon-arrow-right desc-arrow"
              :class="{'is-active':active}"
              @click="handleToggle()"
            ></i>
          </div>
          <div class="opt-wrap">
            <div class="worth iep-red">{{item.rewardAmountStr}}</div>
            <el-button
              v-if="item.status===1"
              type="primary"
              @click="handleSwitch(item)"
              plain
            >{{item.buttonName}}</el-button>
            <el-button v-if="item.status===0" type="primary" @click="handleGetAward(item)">领取</el-button>
            <el-button v-if="item.status===2" type="primary" disabled>已领取</el-button>
          </div>
        </div>
        <div class="content" v-show="active" v-html="item.steps"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { postSoTaskAward } from "@/api/qms/so_task";
import { encryption } from "@/util/util";
export default {
  props: ["item"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleToggle() {
      this.active = !this.active;
    },
    async handleGetAward(row) {
      const form = { encryptId: row.taskId + "" };
      const newForm = encryption({
        data: form,
        param: ["encryptId"],
      });
      const { code } = await postSoTaskAward(newForm);
      if (!code) {
        this.$emit("refresh");
      }
    },

    handleSwitch(item) {
      console.log(item.code);
      switch (item.code) {
        case "perfect_org_information_award":
          this.$openPage("/so/info");
          break;
        case "new_so_notification":
          this.$openPage("/so/notice");
          break;
        case "so_add_member":
          this.$emit("inviteSoUser");
          break;
        case "new_so_governor":
          this.$openPage("/so/member");
          break;
        case "open_app":
          this.$openPage("/so/application");
          break;
        case "role_auth":
          this.$openPage("/so/member?tabName=role");
          break;
        case "so_document_assets":
          this.$openPage("/mlms/material");
          break;
        case "so_create_task":
          this.$openPage("/my/index/cooperation");
          break;
        case "so_post_question":
          this.$openPage("/ques/questionnaire_my");
          break;
        case "so_post_exam":
          this.$openPage("/exam/test_questions_library");
          break;
        case "so_products_shelves":
          this.$openPage("/cpms/product");
          break;
        case "so_can_recruit":
          this.$openPage("/recruit/jobList");
          break;
        default:
          this.$openPage("/wel/index");
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.is-bold {
  font-weight: 600;
}
.item-wrap {
  &:first-child {
    .item-content {
      padding-top: 0;
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 89px;
        width: 1px;
        height: 2px;
        background-color: #fff;
      }
    }
  }
}
.item-content {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-top: 30px;
  font-size: 15px;
  color: $--color-text-regular;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 89px;
    bottom: 0;
    width: 1px;
    background-color: $--border-color;
  }
  .name {
    flex: 0 0 80px;
  }
  .status {
    position: relative;
    display: flex;
    flex: 0 0 40px;
    font-size: 18px;
    margin-top: 2px;
    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 9px;
      bottom: 0;
      width: 1px;
      background-color: #fff;
    }
    i {
      z-index: 1;
      color: $--color-text-secondary;
    }
  }
  .desc-content {
    flex: 1;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .content {
    max-width: 680px;
  }
  .desc-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .desc {
      max-width: 680px;
    }
    .desc-arrow {
      margin-left: 20px;
      color: $--color-text-secondary;
      cursor: pointer;
      transition: transform 0.3s;
      &.is-active {
        transform: rotate(90deg);
      }
    }
    .opt-wrap {
      display: flex;
      align-items: center;
      .worth {
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
