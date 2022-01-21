import { operationTask } from "@/api/qms/cooperation_task";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 完成任务
    handleFinish(row) {
      // 处理的函数
      const fn = params => {
        operationTask(params).then(() => {
          // 在完成任务之后，需要单独判断是否需要手动分配奖励 - 手动分配只有发布者才有
          if (
            row.allocationType === "1" &&
            row.publisher === this.userInfo.userId
          ) {
            this.$refs.distribute.open(row.id);
          }
          this.refreshData();
        });
      };
      const options = {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      };
      // 首先判断是完成任务还是重启任务
      if (row.state === "1") {
        // 判断是否是创建者
        if (row.publisher === this.userInfo.userId) {
          // 创建者 - 判断是否是重复任务
          if (row.type === "0") {
            // 普通任务 - 判断是否需要付费，仅影响tip提示语
            let tip = `是否确认完成任务：${row.title}`;
            if (row.allocationType !== "0") {
              tip += "，并进行宝贝分配";
            }
            this.$confirm(tip, "提示", options)
              .then(() => {
                fn({
                  type: 1,
                  taskId: row.id
                });
              })
              .catch(() => {});
          } else {
            // 重复任务 - 判断是否需要付费
            let tip = "是否完成重复任务？";
            if (row.allocationType !== "0") {
              tip = "是否完成重复任务同时进行宝贝分配";
            }
            this.$confirm(tip, "提示", {
              distinguishCancelAndClose: true,
              confirmButtonText: "仅完成一次",
              cancelButtonText: "不再重复",
              type: "warning"
            })
              .then(() => {
                fn({
                  type: 1,
                  taskId: row.id,
                  repeatType: 1
                });
              })
              .catch(action => {
                if (action === "cancel") {
                  fn({
                    type: 1,
                    taskId: row.id,
                    repeatType: 2
                  });
                }
              });
          }
        } else {
          // 普通成员
          this.$confirm(`是否确认完成任务：${row.title}`, "提示", options)
            .then(() => {
              fn({
                type: 1,
                taskId: row.id
              });
            })
            .catch(() => {});
        }
      } else {
        // 重启 - 2020年11月12日需求变更，关闭重启任务功能
        // this.$confirm("是否确认重启任务？", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning",
        //   })
        //   .then(() => {
        //     fn({
        //       type: 4,
        //       taskId: row.id,
        //     });
        //   })
        //   .catch(() => {});
      }
    }
  }
};
