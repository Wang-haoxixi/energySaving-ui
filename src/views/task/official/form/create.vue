<template>
  <iep-dialog
    :dialog-show="dialogShow"
    width="600px"
    title
    @close="_close()"
    @mounted="loadPage()"
    isTitleSlot
  >
    <div class="dialog-title" slot="title">
      <div class="tilte">{{`${methodMaps[methodName].name}任务`}}</div>
      <i class="el-icon-woneng-icon_guanfang"></i>
    </div>
    <el-form :model="formData" :rules="rules" ref="form" label-width="95px" class="form-create">
      <iep-form-item label-name="名称" prop="title">
        <el-input
          type="textarea"
          v-model="formData.title"
          placeholder="输入任务主题以新建任务"
          maxlength="200"
          :rows="3"
        ></el-input>
      </iep-form-item>
      <el-form-item :label="formData.type === '0' ? '截止时间：' : '重复任务：'" prop="finishTime">
        <div class="block">
          <el-date-picker
            v-if="formData.type === '0'"
            class="date-picker"
            v-model="formData.finishTime"
            type="datetime"
            placeholder="请选择时间"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
          <el-dropdown
            ref="dropdown"
            class="repeat-task"
            trigger="click"
            :hide-on-click="false"
            @visible-change="visibleChange"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-woneng-lishijilu icon-date"></i>
              <span v-if="formData.type === '0'">设置重复任务</span>
              <span v-else-if="formData.type === '4'">每{{formData.cycle}}天重复</span>
              <span v-else>{{repeatName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :class="{'chosen': formData.type === item.value}"
                v-for="item in repeatList"
                :key="item.value"
                @click.native="handleDropdown(item)"
              >{{item.name}}</el-dropdown-item>
              <div class="diy-dropdown" v-if="formData.type === '4'">
                <span>间隔：每</span>
                <input type="number" min="1" max="99" class="diy-input" v-model="formData.cycle" />
                <span>天重复</span>
              </div>
              <div class="diy-button" v-if="formData.type === '4'">
                <div class="diy-click" @click="handleDropdownSave">保存</div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>
      <iep-form-item label-name="紧急度">
        <el-select v-model="formData.urgency" placeholder="请选择">
          <el-option
            v-for="item in urgencyList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="描述">
        <el-input type="textarea" rows="5" v-model="formData.description" placeholder="请添加描述"></el-input>
      </iep-form-item>
      <iep-form-item label-name="关联元素">
        <RelationCreate ref="relation" isCreate></RelationCreate>
      </iep-form-item>
      <iep-form-item label-name="奖励分配">
        <RewardMode ref="reward" v-model="rewardValue"></RewardMode>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="loadState" @click="handleSave()" class="creat-button">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
import { rules, initForm, urgencyList, repeatList } from "./options";
import {
  createOfficialTask,
  editOfficialTask,
} from "@/api/qms/cooperation_task";
import { getDetailById } from "@/api/qms/cooperation_list";
import RelationCreate from "./relation/relationCreate";
import { mapGetters } from "vuex";
import RewardMode from "@/views/task/components/Reward/index";
import { encryption } from "@/util/util";

export default {
  components: { RelationCreate, RewardMode },
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initForm(),
      rules,
      repeatList,
      repeatName: "",
      urgencyList,
      methodName: "create",
      methodMaps: {
        create: {
          name: "新增",
          reuestFn: createOfficialTask,
        },
        update: {
          name: "编辑",
          reuestFn: editOfficialTask,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    rewardValue: {
      get() {
        return { ...this.formData };
      },
      set(row) {
        this.formData = Object.assign({}, this.formData, row);
      },
    },
  },
  methods: {
    loadData(form = {}) {
      this.dialogShow = true;
      if (form.id) {
        this.methodName = "update";
        getDetailById({ taskId: form.id }).then(({ data }) => {
          this.formData = { ...data };
          this.$refs.relation.dealData(data.material || []);
        });
      }
    },
    _close() {
      this.methodName = "create";
      this.formData = initForm();
      this.dialogShow = false;
    },
    loadPage() {},
    // 保存前操作数据
    handleDealData(row) {
      // 主要将关联元素取出来进行map压缩
      // 0：材料、1：问卷、2：活动、3：纪要
      const annexesType = {
        material: 0,
        questionnaire: 1,
        activity: 2,
        summary: 3,
      };
      let relationList = {};
      if (this.$refs.relation) {
        relationList = this.$refs.relation.list;
      }
      const annexes = [];
      for (const key in relationList) {
        for (const item of relationList[key]) {
          annexes.push({
            relatedId: item.id,
            type: annexesType[key],
          });
        }
      }
      row.annexes = annexes;
      // 加密
      const data = encryption({
        data: row,
        param: ["safePassword"],
      });
      return data;
    },
    // 创建
    handleSave() {
      const row = this.handleDealData(this.formData);
      this.createTask(row)
        .then(() => {
          this.$message.success(
            `${this.methodMaps[this.methodName].name}任务成功！`,
          );
          this._close();
          this.$emit("load_page", false);
        })
        .catch(() => {
          this.loadState = false;
          return false;
        });
    },
    // 任务保存操作
    createTask(row) {
      return new Promise((resolve, reject) => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.loadState = true;
            this.methodMaps[this.methodName].reuestFn(row).then(({ data }) => {
              this.loadState = false;
              if (data) {
                resolve();
              } else {
                reject();
              }
            });
          } else {
            reject();
          }
        });
      });
    },
    // 重复
    handleDropdown(row) {
      this.formData.type = row.value;
      if (row.value !== "4") {
        this.repeatName = row.name;
        this.$refs.dropdown.hide();
      }
    },
    visibleChange(type) {
      if (!type && this.formData.type === "4") {
        if (!this.formData.cycle) {
          this.$set(this.formData, "cycle", 1);
        }
      }
    },
    handleDropdownSave() {
      this.repeatName = "";
      this.$refs.dropdown.hide();
    },
  },
  watch: {
    "formData.cycle"(val) {
      if (!val) {
        this.$set(this.formData, "cycle", "");
      } else if (val > 99) {
        this.$set(this.formData, "cycle", 99);
      } else if (val < 1) {
        this.$set(this.formData, "cycle", 1);
      } else {
        this.$set(this.formData, "cycle", Math.floor(val));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-title {
  display: flex;
  i {
    color: $--color-secondary;
    font-size: 16px;
    line-height: 24px;
    margin-left: 10px;
  }
}
.user-list {
  display: flex;
  flex-wrap: wrap;
  .user-info {
    margin-right: 16px;
    margin-bottom: 16px;
    position: relative;
    .user-avatar {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      border: 1px solid $--border-color;
    }
    .i-avatar {
      position: absolute;
      bottom: -9px;
      right: -9px;
      color: $--color-secondary;
      font-size: 20px;
      opacity: 1;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  .user-block {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    margin: 0 15px 5px 0;
  }
  .user-plus {
    background-color: $--background-color;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    &::v-deep .el-button {
      margin: 0;
    }
  }
}
.form-create {
  padding-right: 10px;
  &::v-deep .el-select {
    display: block;
  }
  &::v-deep .el-date-editor {
    width: 100%;
  }
  .date-picker {
    width: 200px;
    margin-right: 20px;
  }
}
.el-dropdown-menu__item.chosen {
  background-color: #feeceb;
  color: $--color-primary;
}
.repeat-task {
  cursor: pointer;
}
.icon-date {
  margin-right: 3px;
}
.diy-dropdown {
  color: $--color-text-secondary;
  padding: 0 20px;
  font-size: 14px;
  .diy-input {
    margin: 0 5px;
    width: 40px;
  }
}
.diy-button {
  text-align: right;
  .diy-click {
    width: 40px;
    height: 19px;
    line-height: 19px;
    // background-color: #f74437;
    background-color: $--color-primary;
    color: #fff;
    display: inline-block;
    margin-right: 20px;
    margin-top: 5px;
    font-size: 12px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
}
.form-create ::v-deep .el-form-item {
  margin-bottom: 20px;
}
.form-create ::v-deep .el-form-item__content {
  line-height: 36px;
}
.form-create ::v-deep .el-form-item__label {
  height: 36px;
  line-height: 36px;
}
.form-create ::v-deep .el-input__inner {
  padding-left: 15px;
}
.creat-button {
  color: #ffffff;
  // background-color: #f74437;
  background-color: $--color-primary;
  // border-color: #f74437;
  border-color: $--color-primary;
}
.creat-button:hover {
  opacity: 0.7;
}
</style>
