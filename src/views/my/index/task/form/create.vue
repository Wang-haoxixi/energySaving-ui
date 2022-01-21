<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="新建任务"
    width="600px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <el-form :model="formData" :rules="rules" ref="form" label-width="105px" class="form-create">
      <iep-form-item label-name="名称" prop="title">
        <el-input
          type="textarea"
          v-model="formData.title"
          placeholder="输入任务主题以新建任务"
          maxlength="200"
          :rows="3"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="归属组织" prop="orgId">
        <el-select
          v-model="formData.orgId"
          filterable
          placeholder="请选择"
          remote
          :remote-method="remoteMethod"
          @visible-change="handleChange"
        >
          <el-option
            v-for="item in orgList"
            :key="item.orgId"
            :label="item.name"
            :value="item.orgId"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="协作人">
        <div class="user-list">
          <div
            class="user-info"
            v-for="(item, index) in formData.cooperationTaskUserVOList"
            :key="index"
          >
            <iep-img :src="item.avatar" class="user-avatar" :title="item.name" :resizeOpt="{l:45}"></iep-img>
          </div>
          <div class="user-block user-plus" @click="handlePlusUser">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <IepContactsInput
          ref="IepContactsInput"
          v-if="IepContactsInputShow"
          v-show="false"
          :orgId="formData.orgId"
          v-model="formData.cooperationTaskUserVOList"
          :showFriend="false"
          :limitUserIds="[userInfo.userId]"
        ></IepContactsInput>
      </iep-form-item>
      <iep-form-item :label-name="formData.type === '0' ? '截止时间' : '重复任务'" prop="finishTime">
        <div class="block">
          <el-date-picker
            v-if="formData.type === '0'"
            class="date-picker"
            v-model="formData.finishTime"
            type="datetime"
            placeholder="请选择时间"
            value-format="yyyy-MM-dd HH:mm:ss"
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
      </iep-form-item>
      <div v-if="isMoreShow">
        <iep-form-item label-name="紧急度">
          <el-radio-group v-model="formData.urgency">
            <el-radio
              :label="item.value"
              v-for="item in urgencyList"
              :key="item.value"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </iep-form-item>
        <iep-form-item label-name="描述">
          <el-input type="textarea" rows="5" v-model="formData.description" placeholder="请添加描述"></el-input>
        </iep-form-item>
        <iep-form-item label-name="关联元素" v-if="formData.orgId > 0">
          <RelationCreate ref="relation" :orgId="formData.orgId" isCreate></RelationCreate>
        </iep-form-item>
        <iep-form-item label-name="奖励分配" prop="allocationAmount">
          <RewardMode ref="reward" v-model="rewardValue"></RewardMode>
        </iep-form-item>
      </div>
      <iep-form-item label-name="是否公开" v-if="isAdmin > 0">
        <el-switch
          v-model="formData.isWorkshop"
          active-color="#3cd489"
          inactive-color="#babec0"
          active-value="1"
          inactive-value="0"
        ></el-switch>
        <div class="open-tips">
          <el-tooltip placement="top">
            <div slot="content" v-html="openTips"></div>
            <i class="icon-info el-icon-info"></i>
          </el-tooltip>
        </div>
      </iep-form-item>
      <div class="is-show" v-show="!isMoreShow" @click="isMoreShow = !isMoreShow">··· 显示全部</div>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="loadState" @click="handleSave()" class="creat-button">创建</iep-button>
      <iep-button :loading="loadState" @click="handleSubmit()">保存并创建下一个</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
import {
  formRule,
  initForm,
  urgencyList,
  repeatList,
  openTips,
} from "./options";
import { getUserHadList } from "@/api/admin/org";
import { createTask } from "@/api/qms/cooperation_task";
import RelationCreate from "./relation/relationCreate";
import { mapGetters } from "vuex";
import RewardMode from "@/views/task/components/Reward/index";
import { encryption } from "@/util/util";

export default {
  components: { RelationCreate, RewardMode },
  mixins: [mixins],
  data() {
    const checkArewardValueValidatege = (rule, value, callback) => {
      if (this.rewardValue.allocationType === "2") {
        if (
          this.rewardValue.allocationAmount === "" ||
          this.rewardValue.allocationAmount === 0
        ) {
          return callback(new Error("请输入分配金额"));
        } else if (this.rewardValue.safePassword === "") {
          return callback(new Error("请输入支付密码"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    formRule.allocationAmount = [
      { validator: checkArewardValueValidatege, trigger: "change" },
    ];
    const rules = formRule;
    return {
      dialogShow: false,
      loadState: false,
      formData: initForm(),
      rules: rules,
      openTips,
      repeatList,
      repeatName: "",
      urgencyList,
      organizationList: [],
      orgList: [],
      orgRealList: [],
      IepContactsInputShow: false,
      isMoreShow: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isAdmin() {
      if (this.formData.orgId === -1) return 2;
      for (const item of this.orgRealList) {
        if (item.orgId === this.formData.orgId) {
          return item.isAdmin;
        }
      }
      return 0;
    },
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
      this.formData = Object.assign({}, this.formData, form);
    },
    // 获取当前用户SO列表
    getUserHadList() {
      getUserHadList().then(({ data }) => {
        if (data.length === 0) {
          this.orgList = [
            {
              name: "添加协作组织",
              orgId: -1,
            },
          ];
          this.formData.orgId = -1;
        } else {
          this.formData.orgId = "";
          this.orgList = [...data];
        }
        this.orgRealList = [...data];
      });
    },
    _close() {
      this.formData = initForm();
      this.isMoreShow = false;
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
      // 通讯录处理
      row.userSet = row.cooperationTaskUserVOList.map((m) => m.id);
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
          this._close();
          this.$message.success("创建任务成功！");
          this.$emit("load_page", true);
        })
        .catch(() => {
          this.loadState = false;
          return false;
        });
    },
    // 保存并创建下一个
    handleSubmit() {
      const row = this.handleDealData(this.formData);
      this.createTask(row)
        .then(() => {
          this.formData = initForm();
          this.$refs.relation.initFormData();
          this.$message.success("创建任务成功！");
          this.$emit("load_page", true);
        })
        .catch(() => {
          this.loadState = false;
          return false;
        });
    },
    // 任务保存操作
    createTask(row) {
      return new Promise((resolve, reject) => {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.loadState = true;
            createTask(row).then(({ data }) => {
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
    // 选择通讯录
    handlePlusUser() {
      if (this.formData.orgId > 0) {
        this.$refs.IepContactsInput.handleEdit();
      } else {
        this.$message.warning("请先选择组织");
      }
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
    // 远程查询so
    remoteMethod(query) {
      if (query === "") {
        this.orgList = [...this.orgRealList];
      } else {
        this.orgList = this.orgRealList.filter(
          (m) => m.name.indexOf(query) >= 0,
        );
      }
    },
    handleChange(type) {
      if (type) {
        this.orgList = [...this.orgRealList];
      }
    },
  },
  watch: {
    // 当组织切换的时候，需要清空已经选择的用户
    "formData.orgId"(val) {
      this.$set(this.formData, "cooperationTaskUserVOList", []);
      this.IepContactsInputShow = false;
      if (val > 0) {
        setTimeout(() => {
          this.IepContactsInputShow = true;
        });
      }
    },
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
  created() {
    this.getUserHadList();
  },
};
</script>

<style lang="scss" scoped>
.is-show {
  margin-bottom: 20px;
  color: $--color-secondary;
  padding-left: 17px;
  cursor: pointer;
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
  .open-tips {
    margin-left: 30px;
  }
}
.el-dropdown-menu__item.chosen {
  // background-color: #feeceb;
  background-color: $--color-fifth;
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
  background-color: $--color-primary;
  border-color: $--color-primary;
}
.creat-button:hover {
  opacity: 0.7;
}
</style>
