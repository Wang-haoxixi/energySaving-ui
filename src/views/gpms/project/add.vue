<template>
  <div class="new-project">
    <iep-basic-container>
      <iep-empowerment :title="`${methodName}项目`" :backOption="backOption" v-model="openEmpower">
        <template slot="left">
          <el-form
            :model="formData"
            :rules="rules"
            ref="form"
            label-width="120px"
            style="margin-right: 16%;"
          >
            <el-row>
              <div v-if="!id">
                * 项目标签（可多选） ；学习方案撰写，请点击
                <span class="jumpOver">前往</span>。
              </div>
              <div v-if="!id" class="tag-counter">
                <span
                  v-for="(item,index) in formData.recommendTagList.slice(0,18)"
                  :key="item.id"
                  :class="item.isClick ? 'active':''"
                  @click="changeTagList(index)"
                >{{item.name}}</span>
              </div>
              <el-col v-if="!id" :span="24">
                <el-form-item label="更多项目标签：" placeholder="添加自定义主题（标签）" label-width="120px">
                  <IepTagInput v-model="formData.projectTagList"></IepTagInput>
                </el-form-item>
              </el-col>
              <el-col v-else :span="24">
                <el-form-item
                  label="项目标签："
                  placeholder="添加自定义主题（标签）"
                  label-width="120px"
                  prop="projectTagList"
                >
                  <IepTagInput v-model="formData.projectTagList"></IepTagInput>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="position: relative;">
                <el-form-item label="客户名称：" prop="clientName">
                  <!-- <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select> -->

                  <el-col :span="12">
                    <iep-custom-select
                      v-model="formData.clientName"
                      @update-id="formData.relatedClient = $event"
                    ></iep-custom-select>
                  </el-col>
                </el-form-item>
                <!-- <iep-button style="position: absolute;right:-85px;top:0;">新增客户</iep-button> -->
              </el-col>
              <el-col :span="24">
                <iep-form-item label-name="项目名称" :prop="id?'editProjectName':'projectName'">
                  <el-col :span="12">
                    <el-input v-model="formData.projectName" placeholder="请填入项目名称" maxlength="99"></el-input>
                  </el-col>
                </iep-form-item>
              </el-col>
              <el-col :span="24">
                <iep-form-item label-name="项目经理">
                  <el-col :span="12">
                    <el-input v-model="formData.projectManagerName" disabled></el-input>
                  </el-col>
                </iep-form-item>
              </el-col>
              <el-col :span="24">
                <iep-form-item class="project-team" label-name="项目团队" prop="userType">
                  <div
                    class="project-team-con"
                    v-for="(item,index) in formData.userType"
                    :key="index"
                  >
                    <el-col :span="12">
                      <el-select v-model="item.dictKey" placeholder="请选择">
                        <el-option
                          v-for="dict in dictTeamList"
                          :key="dict.value"
                          :label="dict.label"
                          :value="dict.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <IepContactsInput
                      v-model="item.teamUser"
                      :showFriend="true"
                      :onlyOnlineOrg="true"
                    ></IepContactsInput>
                    <!-- <IepUsersInput v-model="item.teamUser"></IepUsersInput> -->
                    <i class="el-icon-plus" @click="addProjectTeam()" v-if="index==0"></i>
                    <i class="el-icon-woneng-jianhao" @click="lessProjectTeam(index)" v-else></i>
                  </div>
                </iep-form-item>
              </el-col>
              <el-col :span="24">
                <iep-form-item label-name="项目说明" prop="projectExplain">
                  <el-input v-model="formData.projectExplain" maxlength="254"></el-input>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <iep-form-item label-name="项目阶段" prop="projectStage">
                  <iep-dict-select v-model="formData.projectStage" dict-name="dms_project_phase"></iep-dict-select>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <iep-form-item label-name="项目等级" prop="projectLevel">
                  <iep-dict-select
                    v-model="formData.projectLevel"
                    dict-name="dms_project_level"
                    disabled
                  ></iep-dict-select>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <iep-form-item label-name="立项时间" prop="projectTime">
                  <iep-date-picker v-model="formData.projectTime" type="date" placeholder="立项时间"></iep-date-picker>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <iep-form-item label-name="结束时间" prop="endTime">
                  <iep-date-picker v-model="formData.endTime" type="date" placeholder="结束时间"></iep-date-picker>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <iep-form-item label-name="签订时间" prop="estimatedSignTime">
                  <IepDatePicker v-model="formData.estimatedSignTime"></IepDatePicker>
                </iep-form-item>
              </el-col>
              <el-col :span="12">
                <!-- <el-form-item :label="`${formData.contractList.length > 0 ? '合同' : '项目'}金额：`" prop="projectAmount">
                <el-input v-if="formData.contractList.length > 0" v-model="formData.contractAmount" disabled />
                <iep-input-number v-else v-model="formData.projectAmount" placeholder="请正确输入非负金额" :disabled="formData.projectStatus=='3'"></iep-input-number>
                </el-form-item>-->
                <el-form-item label="项目金额：" prop="projectAmount">
                  <iep-input-number v-model="formData.projectAmount" placeholder="请正确输入非负金额"></iep-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <iep-form-item label-name="成本预算" prop="projectBudgetRelationList"></iep-form-item>
                <budget-table
                  v-model="formData.projectBudgetRelationList"
                  :dictBudget="dictBudgetList"
                  v-bind.sync="formData"
                ></budget-table>
              </el-col>
              <!-- <el-col :span="24">
              <iep-form-item label-name="事项关联" prop="projectBudgetList"></iep-form-item>
              </el-col>-->
            </el-row>
          </el-form>
        </template>
        <template slot="right">
          <iep-tabs
            class="right-tabs"
            v-model="activeTab"
            :tab-list="tabList"
            style="margin-top:20px;"
          >
            <template v-slot:[activeTab]>
              <component
                ref="tabList"
                :is="activeTab"
                :projectTagList="dealTagList()"
                @referenceClick="referenceClick"
              ></component>
            </template>
          </iep-tabs>
        </template>
      </iep-empowerment>
      <IepFooterBar>
        <el-button v-show="!id" type="primary" @click="save('2')" :loading="btnLoading">保存并发布</el-button>
        <iep-button v-show="!id" @click="save('1')" :loading="btnLoading">保存为草稿</iep-button>
        <el-button v-show="id" type="primary" @click="save('2')" :loading="btnLoading">保存</el-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getRecTags } from "@/api/tms/tag";
import { getDictList } from "@/api/gpms/setting";
import { createData, updateData, getDataDetail } from "@/api/gpms/index";
import { initFormData, dictMap, rules } from "./option";
import project from "./Recommend/project";
import people from "./Recommend/people";
import cycle from "./Recommend/cycle";
import amount from "./Recommend/amount";
import budget from "./Recommend/budget";
import BudgetTable from "./BudgetTable";
export default {
  components: { project, people, cycle, amount, budget, BudgetTable },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close();
        },
      },
      btnLoading: false,
      formData: initFormData(),
      dictMap,
      rules,
      dictBudgetList: [],
      dictTeamList: [],
      tabList: [
        {
          label: "同类项目",
          value: "project",
        },
        {
          label: "项目团队",
          value: "people",
        },
        {
          label: "项目周期",
          value: "cycle",
        },
        {
          label: "项目金额",
          value: "amount",
        },
        {
          label: "成本预算",
          value: "budget",
        },
      ],
      activeTab: "project",
      type: "create",
      typeObj: {
        create: {
          requestFn: createData,
          name: "新增",
        },
        update: {
          requestFn: updateData,
          name: "编辑",
        },
      },
      openEmpower: false,
    };
  },
  created() {
    this.formData = initFormData(this.userInfo);
    this.getData();
  },
  computed: {
    ...mapGetters(["userInfo"]),
    id() {
      return this.$route.params.id ? +this.$route.params.id : null;
    },
    methodName() {
      return this.id ? "修改" : "新增";
    },
  },
  methods: {
    close() {
      this.$router.history.go(-1);
    },
    async getData() {
      if (this.id) {
        await getDataDetail(this.id).then(res => {
          this.formData = this.$mergeByFirst(initFormData(), res.data);
          this.formData.projectManagerName = this.formData.projectManagerList.name;
          this.formData.userType =
            this.formData.userType.length == 0
              ? [{ dictId: "", teamUser: [] }]
              : this.formData.userType;
        });
        this.type = "update";
      }
      await getRecTags().then(res => {
        this.formData.recommendTagList = res.data.map(m => {
          return {
            ...m,
            isClick: false,
          };
        });
      });
      await getDictList().then(res => {
        this.dictBudgetList = res.data.budget;
        this.dictTeamList = res.data.team;
      });
    },
    changeTagList(val) {
      if (this.formData.recommendTagList[val].isClick == false) {
        this.formData.recommendTagList[val].isClick = true;
      } else {
        this.formData.recommendTagList[val].isClick = false;
      }
    },
    addProjectTeam() {
      const newItem = { dictId: "", teamUser: [] };
      this.formData.userType.push(newItem);
    },
    lessProjectTeam(index) {
      this.formData.userType.splice(index, 1);
    },
    dealTagList() {
      let newTag = this.formData.recommendTagList.filter(
        item => item.isClick === true,
      );
      newTag = newTag.map(m => {
        return m["name"];
      });
      return newTag.concat(this.formData.projectTagList);
    },
    async save(val) {
      this.formData.editProjectName = this.formData.projectName;
      this.$refs["form"].validate(valid => {
        if (valid) {
          /*数据处理 */
          this.formData.projectStatus = val;
          if (!this.id) {
            // this.formData.allTagList = Array.from(new Set(allTagList));
          }
          this.dealTagList();
          this.formData.projectBudgetRelationList = this.formData.projectBudgetRelationList.map(
            m => {
              return {
                relationId: Number(m.relationId),
                money: Number(m.money),
              };
            },
          );
          if (this.formData.projectTagList.length == 0) {
            this.$message.error("请选择标签");
          } else {
            /*数据处理 */
            this.btnLoading = true;
            this.typeObj[this.type]
              .requestFn({ id: this.id, ...this.formData })
              .then(res => {
                if (res.data === true) {
                  this.$message({
                    type: "success",
                    message: `${this.methodName}成功!`,
                  });
                  this.$router.push("/gpms/project");
                } else {
                  this.$message({
                    type: "info",
                    message: `${this.methodName}失败,${res.message}`,
                  });
                }
                this.btnLoading = false;
              });
            this.close();
          }
        } else {
          return false;
        }
      });
    },
    referenceClick(val, type) {
      if (type == "project") {
        const _newObject = {
          clientName: "",
          projectName: "",
          projectManagerName: "",
          projectExplain: "",
          projectStage: "",
          projectLevel: "",
          projectTime: "",
          endTime: "",
          projectBudgetRelationList: [{ relationId: "", money: 0 }],
        };
        const _changeNewObject = this.$mergeByFirst(_newObject, val);
        this.formData = this.$mergeByFirst(this.formData, _changeNewObject);
      } else if (type == "people") {
        this.formData.userType.push({
          dictId: "",
          teamUser: [{ id: val.id, name: val.name }],
        });
      }
    },
  },
  watch: {
    "formData.projectAmount": {
      deep: true,
      handler: function(val) {
        if (val > 999999.99) {
          this.formData.projectLevel = "1";
        } else if (499999.99 < val && val < 1000000) {
          this.formData.projectLevel = "2";
        } else {
          this.formData.projectLevel = "3";
        }
      },
    },
    "formData.clientName": {
      deep: true,
      handler: function(val) {
        if (val != "") {
          this.openEmpower = true;
        }
      },
    },
    "formData.projectTagList": {
      deep: true,
      handler: function(val) {
        if (val.length > 0) {
          this.openEmpower = true;
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 400px;
  border-top: 1px solid $--border-color;
  padding-top: 20px;
  font-size: 14px;
  /*推荐标签样式开始 */
  .jumpOver {
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .tag-counter {
    padding: 20px;
    > span {
      display: inline-block;
      margin: 5px;
      padding: 0 10px;
      height: 30px;
      line-height: 28px;
      font-size: 14px;
      border: 1px solid $--border-color;
      border-radius: 4px;
      transition: all 0.5s linear;
      color: $--color-text-secondary;
      &:hover {
        cursor: pointer;
        color: $--color-primary;
        border-color: $--custom-menu-background-color;
        background-color: $--custom-menu-background-color;
      }
    }
    .active {
      color: $--color-primary;
      border-color: $--custom-menu-background-color;
      background-color: $--custom-menu-background-color;
    }
  } /*推荐标签样式结束 */
  .el-icon-plus,
  .el-icon-woneng-jianhao {
    font-size: 16px;
    margin-left: 10px;
    width: 40px;
    min-width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid $--border-color;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.new-project ::v-deep .contacts-box {
  justify-content: flex-start;
  margin-left: 0;
}
.project-team ::v-deep {
  .el-form-item__content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}
.project-team-con {
  display: flex;
  margin-bottom: 10px;
  ::v-deep .el-select {
    width: 100%;
  }
  &:last-child {
    margin-bottom: 0;
    width: 100%;
  }
}
.new-project ::v-deep .el-autocomplete {
  width: 100%;
}
.new-project ::v-deep .el-select,
.new-project ::v-deep .el-date-editor,
.new-project ::v-deep .el-input-number {
  width: 100%;
}
.new-project ::v-deep .budget-bottom .el-select,
.new-project ::v-deep .budget-bottom .el-date-editor {
  width: auto;
}

.new-project ::v-deep .budget-down .el-input-number {
  width: 150px;
}
</style>
