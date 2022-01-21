<template>
  <div class="quick-box box">
    <div class="sub-title">快捷入口</div>
    <div class="item-group">
      <div
        v-for="item in quickBtnGroup"
        :class="item.disabled"
        :key="item.name"
        class="item"
        @click="item.func()"
      >
        <IepIcon :icon="item.icon" :aColor="item.aColor" :bColor="item.bColor"></IepIcon>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { hasPermissions } from "@/util/menu";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      quickBtnGroup: [
        {
          name: "群聊",
          icon: "el-icon-woneng-qunliaoshixin",
          aColor: "#D7B0FF",
          bColor: "#824AF7",
          func: this.群聊,
        },
        {
          name: "任务",
          icon: "el-icon-woneng-renwushixin",
          aColor: "#FFE290",
          bColor: "#FFA014",
          func: this.任务,
        },
        {
          name: "材料",
          icon: "el-icon-woneng-cailiaoshixin",
          aColor: "rgba(144,220,255,1)",
          bColor: "rgba(20,116,255,1)",
          func: this.材料,
        },
        {
          name: "产品",
          icon: "el-icon-woneng-mofangshixin",
          aColor: "rgba(104,163,255,1)",
          bColor: "rgba(45,120,237,1)",
          func: this.产品,
        },
        {
          name: "活动",
          icon: "el-icon-woneng-huiyishixin1",
          aColor: "rgba(171,166,255,1)",
          bColor: "rgba(99,102,255,1)",
          func: this.活动,
        },
        {
          name: "问卷",
          icon: "el-icon-woneng-wenjuanshixin",
          aColor: "rgba(255,198,157,1)",
          bColor: "rgba(255,81,49,1)",
          func: this.问卷,
        },
        {
          name: "考试",
          icon: "el-icon-woneng-kaoshishixin2",
          aColor: "rgba(255,175,196,1)",
          bColor: "rgba(255,51,84,1)",
          func: this.考试,
        },
        {
          name: "纪要",
          icon: "el-icon-woneng-jiyaoshixin",
          aColor: "rgba(255,175,196,1)",
          bColor: "rgba(255,51,84,1)",
          func: this.纪要,
        },
        {
          name: "报表",
          icon: "el-icon-woneng-bingtushixin1",
          aColor: "rgba(135,235,237,1)",
          bColor: "rgba(32,215,168,1)",
          func: this.报表,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    meeting_summary_add: () => hasPermissions("meeting_summary_add"),
    material_so_create: () => hasPermissions("material_so_create"),
    cpms_products_add: () => hasPermissions("cpms_products_add"),
    ques_quesAnswer_add: () => hasPermissions("ques_quesAnswer_add"),
    meetting_add: () => hasPermissions("meetting_add"),
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId"]),
    群聊() {
      this.imcOpenConversionByTargetId({
        targetId: this.userInfo.orgId + "",
        type: 3,
      });
    },
    报表() {
      if (this.meeting_summary_add) {
        this.$_shortcut("报表");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    纪要() {
      if (this.meeting_summary_add) {
        this.$_shortcut("纪要");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    材料() {
      if (this.material_so_create) {
        this.$_shortcut("材料");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    产品() {
      if (this.cpms_products_add) {
        this.$_shortcut("产品");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    问卷() {
      if (this.ques_quesAnswer_add) {
        this.$_shortcut("问卷");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    活动() {
      if (this.ques_quesAnswer_add) {
        this.$_shortcut("活动");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    考试() {
      // TODO: 暂时用别的权限
      if (this.ques_quesAnswer_add) {
        this.$_shortcut("考试库");
      } else {
        this.$message.warning("您没有权限");
      }
    },
    任务() {
      // TODO: 暂时用别的权限
      if (this.meetting_add) {
        this.$_shortcut("任务");
      } else {
        this.$message.warning("您没有权限");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.quick-box {
  display: flex;
  flex-direction: column;
}
.item-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 12px;
  height: 90%;
}
.item {
  // margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  .name {
    margin-top: 10px;
    font-size: 14px;
  }
  &:hover {
    opacity: 0.7;
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
