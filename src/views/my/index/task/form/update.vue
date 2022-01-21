<template>
  <div class="update">
    <div class="form">
      <div class="head form-item">
        <div class="title">
          <!-- 这个宽度不能随便改动，涉及到输入框高度自动变化，改动时请联系前端开发，或自行改动 titleRows 监听函数 -->
          <el-input
            v-if="isCreater"
            ref="title"
            v-model="formData.title"
            type="textarea"
            :rows="titleRows"
            placeholder="请输入任务名称"
            :maxlength="200"
          ></el-input>
          <pre v-else>{{formData.title}}</pre>
        </div>
      </div>
      <div class="status form-item">
        <!-- 状态 -->
        <div class="state">
          <i
            :class="stateObj[formData.taskState].icon"
            :style="`color: ${stateObj[formData.taskState].color}`"
          ></i>
          <p>{{stateObj[formData.taskState].name}}</p>
        </div>
        <div class="progress">
          <div class="time">
            <div class="finish">
              <span class="finish-title">{{formData.type === '0' ? '截止时间：' : ''}}</span>
              <div class="finish-date" v-if="isCreater">
                <el-date-picker
                  v-if="formData.type === '0'"
                  v-model="formData.finishTime"
                  type="datetime"
                  placeholder="请选择时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  class="report-date"
                ></el-date-picker>
                <!-- 重复选择 - start -->
                <el-dropdown
                  ref="dropdown"
                  class="repeat-task"
                  trigger="click"
                  :hide-on-click="false"
                  @visible-change="visibleChange"
                >
                  <span class="el-dropdown-link" title="重复任务">
                    <i class="el-icon-woneng-lishijilu icon-date"></i>
                    <span v-if="formData.type === '0'"></span>
                    <span v-else-if="formData.type === '4'">每{{formData.cycle}}天重复</span>
                    <span v-else>{{formData.type | getRepeatName}}</span>
                    <span
                      class="repeat-time"
                      v-if="formData.type !== '0'"
                    >已重复{{formData.repeatTime}}次</span>
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
                      <input
                        type="number"
                        min="1"
                        max="99"
                        class="diy-input"
                        v-model="formData.cycle"
                      />
                      <span>天重复</span>
                    </div>
                    <div class="diy-button" v-if="formData.type === '4'">
                      <div class="diy-click" @click="handleDropdownSave">保存</div>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- 重复选择 - end -->
              </div>
              <span v-else class="finish-time">{{formData.finishTime|parseToTimeMinutes}}</span>
            </div>
            <!-- 时间倒计时 -->
            <div
              class="surplus"
              v-if="formData.timeDifference && formData.state === '1' && formData.type === '0'"
              :class="formData.timeDifference.state ? 'red' : formData.timeDifference.day === 0 ? 'orange' : 'green'"
            >
              <span>{{formData.timeDifference.state ? '逾期' : '剩余'}}</span>
              <span v-if="formData.timeDifference.day > 0">{{formData.timeDifference.day}}天</span>
              <span v-else>{{formData.timeDifference.hour}}时</span>
            </div>
          </div>
          <el-progress :percentage="formData.plan"></el-progress>
        </div>
      </div>
      <!-- 归属so -->
      <div class="org form-item" v-if="formData.orgName">
        <div class="form-label">
          <i class="iconfont el-icon-woneng-so"></i>归属组织
        </div>
        <div class="form-span">{{formData.orgName}}</div>
      </div>
      <!-- 描述 -->
      <div class="desc form-item">
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-dingdan"></i>描述
        </div>
        <div class="form-span">
          <!-- 同上，宽度请勿随便改动，改动时请联系前端开发，或自行改动 descRealRows 监听函数 -->
          <el-input
            v-if="isCreater"
            type="textarea"
            v-model="formData.description"
            :rows="descRealRows"
            placeholder="请添加描述"
            @focus="handleDescShow"
            :maxlength="1000"
          ></el-input>
          <pre
            v-else
            :style="`height: ${formStateObj.descHidden ? Math.min(descRealRows, descRows)*30 + 'px' : 'auto'};overflow: hidden;`"
          >{{formData.description}}</pre>
          <!-- 描述展开收拢按钮 -->
          <div
            class="span-tip"
            v-if="descRows > 3"
            @click="handleDescTip"
          >{{formStateObj.descHidden ? "展开" : "收拢"}}</div>
        </div>
      </div>
      <!-- 紧急程度 -->
      <div class="desc form-item">
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-baojing1"></i>紧急程度
        </div>
        <div class="form-span urgency" v-if="isCreater">
          <el-select v-model="formData.urgency" placeholder="请选择">
            <el-option
              v-for="item in urgencyList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="form-span urgency-detail" v-else>{{urgencyTransf(formData.urgency)}}</div>
      </div>
      <!-- 协作人 -->
      <div class="collaborator form-item">
        <div class="form-label form-label-xiezuoren">
          <i class="iconfont el-icon-woneng-xiezuoren"></i>协作人
        </div>
        <div class="form-span">
          <div class="user-list" :class="{'user-hidden': formStateObj.userHidden}">
            <div class="user-info">
              <iep-img
                :src="formData.publisherObj.avatar"
                class="user-avatar"
                :title="formData.publisherObj.name"
                :resizeOpt="{l:50}"
              ></iep-img>
              <i class="el-icon-woneng-touxiangshixin i-avatar"></i>
            </div>
            <div
              class="user-info"
              v-for="(item, index) in formData.cooperationTaskUserVOList.slice(0, formStateObj.userHidden ? 5 : formStateObj.countNum)"
              :key="index"
            >
              <iep-img
                :src="item.avatar"
                class="user-avatar"
                :title="item.name"
                :resizeOpt="{l:50}"
              ></iep-img>
              <i
                class="el-icon-woneng-guanbihuozheshibaishixin close"
                @click="handleUserClose(item, index)"
                v-if="isCreater && formData.isOfficial === '0'"
              ></i>
            </div>
            <div
              class="user-block user-plus"
              @click="handlePlusUser"
              v-if="isCreater && formData.isOfficial === '0'"
            >
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <IepContactsInput
            :orgId="formData.orgId"
            ref="IepContactsInput"
            v-show="false"
            v-if="IepContactsInputShow"
            v-model="formData.cooperationTaskUserVOList"
            :showFriend="false"
            :limitUserIds="[formData.publisher]"
          ></IepContactsInput>
          <!-- 协作人展开收拢按钮 -->
          <div
            class="span-tip"
            v-if="formData.countNum > 5"
            @click="handleUserTip"
          >{{formStateObj.userHidden ? "展开" : "收拢"}}</div>
        </div>
      </div>
      <!-- 奖励分配 -->
      <div
        class="form-item"
        v-if="formData.publisher === userInfo.userId || (formData.publisher !== userInfo.userId && formData.allocationType !== '0')"
      >
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-qian1"></i>奖励分配
        </div>
        <div class="form-span reward" v-if="formData.publisher !== userInfo.userId">
          <div class="reward-item mode">{{rewardTips[formData.allocationType].name}}</div>
          <div
            class="reward-item amount"
            v-if="formData.allocationType === '2'"
          >{{formData.allocationAmount}}贝</div>
          <el-tooltip placement="top">
            <div slot="content" v-html="rewardTips[formData.allocationType].tip"></div>
            <i class="icon-info el-icon-info"></i>
          </el-tooltip>
          <el-button
            type="primary"
            class="reward-button"
            @click="openTips"
            v-if="formData.isOfficial === '0'"
          >风险提示</el-button>
        </div>
        <div class="form-span reward" v-else>
          <RewardMode ref="mode" v-model="rewardValue"></RewardMode>
        </div>
      </div>
      <!-- 关联元素 -->
      <div class="desc form-item">
        <div class="form-label form-label-describe">
          <i class="iconfont el-icon-woneng-guanlian1"></i>关联元素
        </div>
        <div class="form-span relation">
          <RelationCreate
            ref="relation"
            :orgId="formData.orgId"
            :isCreater="isCreater"
            @relation-change="relationChange"
          ></RelationCreate>
        </div>
      </div>
    </div>
    <div class="form-item button-list" v-if="isCreater">
      <div class="form-label"></div>
      <div class="form-span">
        <iep-button
          type="primary"
          @click="handleSubmit"
          class="button iep-btn-m"
          v-if="isUpdate.isEdit"
        >保存</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import { parseDate } from "@/filters/index.ts";
import { updateTask, getTaskUser } from "@/api/qms/cooperation_task";
import {
  formStateObj,
  stateObj,
  initFormData,
  getContentRows,
  urgencyList,
  relationType,
  urgencyTransf,
  isUpdate,
  repeatList,
  rewardTips,
} from "./options";
import RelationCreate from "./relation/relationCreate";
import { mapGetters } from "vuex";
import RewardMode from "@/views/task/components/Reward/index";

export default {
  components: { RelationCreate, RewardMode },
  filters: {
    getRepeatName(val) {
      if (val === "0") {
        return "";
      } else {
        return repeatList.filter((m) => m.value === val)[0].name;
      }
    },
  },
  data() {
    return {
      isUpdate: isUpdate(),
      urgencyTransf,
      IepContactsInputShow: true,
      urgencyList, // 紧急程度
      parseDate,
      repeatList,
      formData: initFormData(),
      stateObj,
      formStateObj: formStateObj(),
      titleRows: 1,
      descRows: 1,
      descRealRows: 1,
      isCreater: false,
      rewardTips,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    TaskUserVOList() {
      if (this.formStateObj.userHidden) {
        return this.formData.cooperationTaskUserVOList.slice(0, 5);
      } else {
        return this.formData.cooperationTaskUserVOList;
      }
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
    _close() {
      this.formStateObj = formStateObj();
      this.isCreater = false;
    },
    loadData(row) {
      /**
       * 首先判断打开详情的是创建者还是协作者
       * 需求变更 -- 之前详情能够修改，完成的任务创建者进行编辑能够重启任务
       *            2020年11月16日：去除重启任务功能，即完成的任务无法编辑
       * isCreater字段更改为：是否能够编辑，仅未完成及创建者可以进行编辑
       */
      this.isCreater =
        this.userInfo.userId === row.publisher && row.taskState === "0";
      // 处理关联的数据
      const relationList = {
        material: [],
        summary: [],
        questionnaire: [],
        activity: [],
      };
      const relationForm = {
        material: [],
        summary: [],
        questionnaire: [],
        activity: [],
      };
      for (const item of row.material) {
        relationList[relationType[item.type]].push(item);
        relationForm[relationType[item.type]].push(item.id);
      }
      // 处理协作人
      row.cooperationTaskUserVOList = row.cooperationTaskUserVOList.map((m) => {
        m.id = m.userId;
        m.name = m.userRealName;
        return m;
      });
      // 将创建者从协作者的列表中剖离出来（因为通讯录有全选功能，会有冲突）
      for (const index in row.cooperationTaskUserVOList) {
        if (row.cooperationTaskUserVOList[index].id === row.publisher) {
          row.publisherObj = row.cooperationTaskUserVOList[index];
          row.cooperationTaskUserVOList.splice(index, 1);
          break;
        }
      }
      // 最后的赋值 formData
      this.$set(this, "formData", { ...row });
      this.$refs.relation.list = relationList;
      this.$refs.relation.formData = relationForm;
      // 协作人存在问题，需要在详情初始化的时候就获取到协作人的数据
      this.getCooperationTaskUser();
      setTimeout(() => {
        this.$set(this.isUpdate, "isLoad", true);
      }, 500);
    },
    handleSubmit() {
      // 主要将关联元素取出来进行map压缩
      // 0：材料、1：问卷、2：活动、3：纪要
      const annexesType = {
        material: 0,
        questionnaire: 1,
        activity: 2,
        summary: 3,
      };
      const relationList = this.$refs.relation.list;
      const annexes = [];
      for (const key in relationList) {
        for (const item of relationList[key]) {
          annexes.push({
            relatedId: item.id,
            type: annexesType[key],
          });
        }
      }
      // 获取协作者
      const userSet = this.formData.cooperationTaskUserVOList.map((m) => m.id);
      // 赋值
      const {
        description,
        finishTime,
        id,
        orgId,
        title,
        urgency,
        type,
        cycle,
        allocationAmount,
        allocationType,
      } = this.formData;
      const form = {
        description,
        // finishTime,
        id,
        orgId,
        title,
        userSet,
        urgency,
        annexes,
        type,
        cycle,
        allocationAmount,
        allocationType,
      };
      if (form.type === "0") {
        form.finishTime = finishTime;
      }
      updateTask(form).then(({ data }) => {
        if (data) {
          this.$emit("load_page", true);
        }
      });
    },
    // 添加协作人
    handlePlusUser() {
      this.formStateObj.userHidden = false;
      // 首先需要判断目前显示的协作人是否是真实人数
      if (
        this.formData.countNum ===
        this.formData.cooperationTaskUserVOList.length
      ) {
        // 若相同，直接展开通讯录
        this.$refs.IepContactsInput.handleEdit();
      } else {
        // 若不同，先获取全部数据，再展开通讯录
        getTaskUser({
          taskId: this.formData.id,
        }).then(({ data }) => {
          // 将创建者从协作者的列表中剖离出来（因为通讯录有全选功能，会有冲突）
          for (const index in data) {
            if (data[index].userId === this.formData.publisher) {
              data.splice(index, 1);
              break;
            }
          }
          this.$set(
            this.formData,
            "cooperationTaskUserVOList",
            data.map((m) => {
              m.id = m.userId;
              m.name = m.userRealName;
              return m;
            }),
          );
          this.$nextTick(() => {
            this.$refs.IepContactsInput.handleEdit();
          });
        });
      }
    },
    // 获取协作人
    getCooperationTaskUser() {
      if (!this.formData.id) return;
      // 根据协作人list的长度和总人数对比来判断是否需要通过接口获取全部协作人
      if (
        this.formData.cooperationTaskUserVOList.length !==
        this.formData.countNum
      ) {
        getTaskUser({
          taskId: this.formData.id,
        }).then(({ data }) => {
          if (data[0].userId === this.formData.publisher) {
            data.splice(0, 1);
          }
          this.$set(
            this.formData,
            "cooperationTaskUserVOList",
            data.map((m) => {
              m.id = m.userId;
              m.name = m.userRealName;
              return m;
            }),
          );
        });
      }
    },
    // 协作者展开收拢
    handleUserTip() {
      this.$set(this.formStateObj, "userHidden", !this.formStateObj.userHidden);
    },
    // 删除协作者
    handleUserClose(row, index) {
      this.formData.cooperationTaskUserVOList.splice(index, 1);
    },
    returnUserList(list) {
      if (this.TaskUserVOList.length > 5) {
        this.formStateObj.userHidden = false;
      }
      this.formData.cooperationTaskUserVOList = list;
    },
    // 控制描述显示框的高度
    handleDescTip() {
      this.formStateObj.descHidden = !this.formStateObj.descHidden;
      if (this.formStateObj.descHidden) {
        this.descRealRows = 3;
      } else {
        this.descRealRows = this.descRows + 1;
      }
    },
    // 获取焦点展开
    handleDescShow() {
      this.formStateObj.descHidden = false;
      this.descRealRows = this.descRows + 1;
    },
    relationChange() {
      if (this.isUpdate.isLoad) {
        this.$set(this.isUpdate, "isEdit", true);
      }
    },
    // 重复
    handleDropdown(row) {
      this.formData.type = row.value;
      if (row.value !== "4") {
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
      this.$refs.dropdown.hide();
    },
    openTips() {
      this.$alert(
        "<div>1、该奖励任务以个人名义进行发布，加入任务时请注意规避风险；</div><div>2、若后续对分配的奖励有异议，建议直接与任务发布人联系；</div>",
        "风险提示",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "我知道了",
        },
      );
    },
  },
  watch: {
    /**
     * 监听输入框内字符数量进行高度控制
     * code 一行的字符数，超过code数量，增加一行
     * title 输入框屏蔽了回车，不需要考虑换行
     * 产品设计错了，能换行的，现在需要考虑换行
     */
    "formData.title"(val) {
      const code = 67;
      this.titleRows = getContentRows(val, code);
    },
    /**
     * 监听输入框内字符数量进行高度控制
     * code 一行的字符数，超过code数量，增加一行
     * description 存在换行行为，所以在方法中加入了换行计算
     */
    "formData.description"(val) {
      const code = 58;
      this.descRows = getContentRows(val, code);
      // 超过3行才出现折叠效果
      if (this.formStateObj.descHidden) {
        this.descRealRows = this.descRows >= 3 ? 3 : this.descRows + 1;
      } else {
        this.descRealRows = this.descRows + 1;
      }
    },
    // 判断orgId改变约等于判断这个弹框是否重新打开
    "formData.orgId"(val) {
      this.isUpdate = isUpdate();
      if (val) {
        this.IepContactsInputShow = false;
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
    formData: {
      handler() {
        if (this.isUpdate.isLoad) {
          this.$set(this.isUpdate, "isEdit", true);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.update {
  padding: 15px 15px 15px 0;
  position: relative;
  .form {
    height: calc(100% - 40px);
    overflow-x: hidden;
  }
  .form-item {
    margin-bottom: 15px;
    &:last-of-type {
      margin-top: 20px;
    }
    display: flex;
    .form-label {
      margin-right: 25px;
      color: $--color-text-secondary;
      width: 90px;
      i {
        position: relative;
        top: 1px;
        font-size: 18px;
        margin-right: 10px;
        color: #666769;
      }
    }
    .form-label-describe {
      position: relative;
      height: 36px;
      line-height: 36px;
    }
    .form-label-xiezuoren {
      position: relative;
      top: 14px;
    }
    .form-span {
      font-family: "微软雅黑";
      color: $--color-text-primary;
      width: calc(100% - 118px);
      ::v-deep .el-textarea,
      ::v-deep .el-select {
        border: 1px solid $--border-color;
        border-radius: 10px;
      }
      pre {
        margin: 0;
      }
      .user-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
        .user-info {
          margin-right: 16px;
          margin-bottom: 16px;
          position: relative;
          .user-avatar {
            width: 50px;
            height: 50px;
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
          .close {
            cursor: pointer;
            opacity: 0.2;
            position: absolute;
            top: -6px;
            right: -6px;
            font-size: 16px;
          }
        }
        .user-block {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          margin: 0 15px 5px 0;
        }
        .user-plus {
          background-color: $--background-color;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          &::v-deep .el-button {
            margin: 0;
          }
        }
      }
      .span-tip {
        cursor: pointer;
        color: $--color-primary;
      }
    }
    .reward {
      display: flex;
      line-height: 36px;
      .reward-item {
        margin-right: 20px;
      }
      .reward-button {
        margin-left: 20px;
      }
      .icon-info {
        margin-top: 11px;
      }
    }
    .urgency {
      &::v-deep .el-input {
        height: 36px;
        line-height: 36px;
        input {
          height: 36px;
        }
      }
    }
    .urgency-detail {
      line-height: 36px;
    }
    &::v-deep input,
    &::v-deep textarea {
      border: 0;
      padding: 10px;
      font-size: 16px;
      resize: none;
      &:hover {
        background-color: $--background-color;
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    .title {
      font-size: 18px;
      font-weight: 400;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      width: 100%;
    }
  }
  .status {
    display: flex;
    justify-content: space-between;
    .state {
      display: flex;
      align-items: center;
      i {
        font-size: 40px;
        vertical-align: bottom;
        margin-right: 7px;
      }
      p {
        display: inline-block;
        font-size: 16px;
        margin-top: 0;
      }
    }
    .progress {
      flex: 1;
      padding-left: 30px;
      .time {
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
        .finish {
          display: flex;
          .finish-title {
            line-height: 34px;
          }
          .finish-date {
            display: flex;
            .report-date {
              line-height: 34px;
            }
            .repeat-task {
              line-height: 34px;
            }
          }
          .finish-time {
            line-height: 34px;
          }
        }
        .surplus {
          text-align: right;
          line-height: 34px;
          color: $--color-text-secondary;
        }
        .red {
          color: $--color-primary;
        }
        .green {
          color: $--color-third;
        }
        .orange {
          color: #ff9667;
        }
      }
      &::v-deep .el-date-editor {
        width: 180px;
        .el-input__icon {
          height: 24px;
          line-height: 24px;
        }
        input {
          font-size: 13px;
          padding: 0 0 0 32px;
          height: 24px;
        }
        .el-input__icon {
          margin-left: 5px;
        }
      }
    }
  }
  .button-list {
    bottom: 0;
    .button {
      height: 36px;
      padding: 0 20px;
      color: #ffffff;
      background-color: $--color-primary;
      border-color: $--color-primary;
      // background-color: #f74437;
      // border-color: #f74437;
    }
    .button:hover {
      opacity: 0.7;
    }
  }
}
.repeat-task {
  cursor: pointer;
}
.icon-date {
  margin-right: 3px;
}
.repeat-time {
  margin-left: 18px;
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
    background-color: #f74437;
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
.update ::v-deep .el-textarea {
  ::-webkit-scrollbar {
    border-radius: 10px;
    width: 6px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ddd;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
    display: none;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  :hover ::-webkit-scrollbar-thumb {
    display: block;
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
.desc.form-item {
  ::v-deep .el-textarea textarea {
    font-size: 14px;
  }
  ::v-deep {
    .urgency .el-input input {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }
  }
}
</style>
