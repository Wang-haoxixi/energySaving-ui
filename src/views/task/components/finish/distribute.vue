<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title="手动分配"
    width="800px"
    center
    @close="closed"
    :isTitleSlot="true"
    :show-close="false"
  >
    <div slot="title" class="slot-title">
      <div class="title">手动分配</div>
      <i class="el-icon-close" @click="sureClose"></i>
    </div>
    <div class="reward-content">
      <iep-table
        :isLoadTable="isLoadTable"
        :isPagination="false"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
      >
        <template slot="state" slot-scope="{scope}">
          <i :class="[icon[scope.row.state], {'success': scope.row.state === '2'}]"></i>
        </template>
        <template slot="reward" slot-scope="{scope}">
          <el-input
            type="number"
            v-model="pagedTable[scope.index].money"
            :disabled="scope.row.state !== '2' && filter"
          ></el-input>
        </template>
      </iep-table>
      <div class="form">
        <div class="form-item">
          <div class="form-label">过滤未完成人员：</div>
          <div class="form-span">
            <el-switch v-model="filter" active-color="#13ce66"></el-switch>
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">选择奖励宝贝：</div>
          <div class="form-span">
            <el-button
              class="button"
              v-for="(item, index) in diyOptions"
              :key="index"
              :type="diyValue === item.value ? 'primary' : ''"
              @click="handleSelectReward(item.value)"
            >{{item.name}}</el-button>
          </div>
        </div>
        <div class="form-item" v-if="diyShow">
          <div class="form-label"></div>
          <div class="form-span">
            <el-input placeholder="请输入自定义宝贝值" v-model="diyNumber"></el-input>
          </div>
        </div>
        <div class="form-item">
          <div class="form-label">支付密码：</div>
          <div class="form-span">
            <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <el-button :loading="loadState" @click="sureClose">取 消</el-button>
      <el-button :loading="loadState" type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { getTaskUser, freeDistribution } from "@/api/qms/cooperation_task";
import { columnsMap, diyOptions } from "./options";
import { encryption } from "@/util/util";

export default {
  data() {
    return {
      dialogVisible: false,
      loadState: false,
      isLoadTable: false,
      columnsMap,
      diyOptions,
      taskId: "",
      pagedTable: [],
      icon: {
        1: "el-icon-woneng-guanbihuozheshibaishixin",
        2: "el-icon-woneng-chenggong2shixin",
      },
      filter: true,
      diyNumber: "", // 自定义宝贝值
      diyValue: "", // 奖励选项
      diyShow: false, // 是否显示自定义输入框
      password: "",
    };
  },
  methods: {
    open(id) {
      this.taskId = id;
      getTaskUser({
        taskId: id,
      }).then(({ data }) => {
        if (data && data.length > 1) {
          this.dialogVisible = true;
          const list = [];
          for (const item of data) {
            if (!item.isPublisher) {
              list.push({
                money: "",
                moneyType: "canMoney",
                userId: item.userId,
                state: item.state,
                userRealName: item.userRealName,
              });
            }
          }
          this.pagedTable = [...list];
        } else {
          this.$message.warning("该任务无协作人，无需奖励分配");
        }
      });
    },
    sureClose() {
      this.$confirm("退出分配后已填数据将被清空, 确定退出分配吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.closed();
        })
        .catch(() => {});
    },
    closed() {
      this.pagedTable = [];
      this.taskId = "";
      this.filter = true;
      this.diyNumber = "";
      this.diyValue = "";
      this.password = "";
      this.dialogVisible = false;
    },
    handleSelectReward(number) {
      if (this.diyValue === number) {
        this.diyValue = "";
        this.diyShow = false;
        number = "";
        // 当取消的时候全部取消
        for (const item of this.pagedTable) {
          item.money = number;
        }
      } else {
        // 自定义数额：点击显示输入框，输入框内数值同步至表格
        if (number === "diy") {
          this.diyValue = "diy";
          this.diyNumber = "";
          this.diyShow = true;
        } else {
          this.diyShow = false;
          this.diyValue = number;
          // 当选中的时候需要判断是否需要过滤掉未完成的
          if (this.filter) {
            for (const item of this.pagedTable) {
              if (item.state === "2") {
                item.money = number;
              }
            }
          } else {
            for (const item of this.pagedTable) {
              item.money = number;
            }
          }
        }
      }
    },
    handleSubmit() {
      if (!this.password) {
        this.$message.warning("请先输入支付密码！");
      } else {
        this.loadState = true;
        const list = [];
        for (const m of this.pagedTable) {
          if (m.money) {
            list.push({
              money: m.money,
              moneyType: "canMoney",
              userId: m.userId,
            });
          }
        }
        const form = {
          items: list,
          safePassword: this.password,
          taskId: this.taskId,
        };
        // 加密
        const data = encryption({
          data: form,
          param: ["safePassword"],
        });
        console.log("data: ", data);
        freeDistribution(data).then(({ data }) => {
          this.loadState = false;
          if (data) {
            this.$message.success("奖励分配完成！");
            this.$emit("success-distribute");
            this.closed();
          }
        });
      }
    },
  },
  watch: {
    diyNumber(val) {
      if (val !== "") {
        val = parseInt(val);
        if (!val) val = 0;
        if (val < 0) {
          val === 0;
        } else if (val > 10000) {
          val = 10000;
        }
        if (this.diyNumber !== val) {
          this.diyNumber = val;
          if (this.filter) {
            for (const item of this.pagedTable) {
              if (item.state === "2") {
                item.money = val;
              }
            }
          } else {
            for (const item of this.pagedTable) {
              item.money = val;
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slot-title {
  display: flex;
  width: 100%;
  .title {
    flex: 1;
    text-align: left;
    font-size: 18px;
    color: $--color-text-primary;
  }
  i {
    cursor: pointer;
  }
}
.success {
  color: $--color-secondary;
}
.form {
  border-top: 1px solid $--border-color;
  margin-top: 20px;
  padding-top: 20px;
  .form-item {
    display: flex;
    margin-bottom: 20px;
    .form-label {
      width: 120px;
      line-height: 34px;
      text-align: right;
    }
    .form-span {
      flex: 1;
      .button {
        width: 70px;
      }
    }
  }
}
.dialog-footer {
  margin: auto;
}
</style>
