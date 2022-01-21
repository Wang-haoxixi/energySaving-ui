<template>
  <iep-dialog :dialog-show="show" title="逻辑配置" width="50%" @close="close">
    <el-tabs v-model="activeName">
      <!-- <el-tab-pane label="跳转逻辑设置" name="first"> -->
      <!-- <el-button type="primary" @click="handleCreateJump" text="">创建条件</el-button>
        <div v-for="(item,index) in jumpData" :key='index' class="logicItem">
          {{index+1+'.'}} 如果本题选中
          <el-select style="width:200px" v-model="item.source" placeholder="请选择">
            <el-option v-for='item in answerDic' :key="item.value + (new Date()).valueOf()" :label="limitedData(item.label)" :value="item.value">
            </el-option>
          </el-select>
          则跳转到
          <el-select style="width:200px" v-model="item.target" placeholder="请选择">
            <el-option v-for='item in questionDic' :key="item.value + (new Date()).valueOf()" :label="limitedData(item.label)" :value="item.value">
            </el-option>
          </el-select>
          <i class="ml10 el-icon-delete" @click="handleDeleteJump(index)"></i>
      </div>-->
      <!-- </el-tab-pane> -->
      <el-tab-pane label="显示逻辑设置" name="second">
        <div class="tab-title">
          <el-tag type="info">显示逻辑</el-tag>&nbsp;
          <IepTip content="每道题目只能被一题所控制"></IepTip>
        </div>
        <el-container>
          <el-aside width="200px">
            <p>当用户选择本题选项：</p>
            <el-radio-group v-model="radio">
              <el-tooltip
                v-for="item of displayData"
                :key="item.id"
                class="item"
                effect="dark"
                :content="item.source"
                placement="left"
                :open-delay="500"
                :disabled="item.source.length<11"
              >
                <el-radio
                  :class="{'active':radio===item.id}"
                  :label="item.id"
                >{{limitedData(item.source,10)}}</el-radio>
              </el-tooltip>
            </el-radio-group>
          </el-aside>
          <el-container>
            <el-main>
              <p>则显示以下题目：</p>
              <template>
                <div v-for="item of displayData" :key="item.id">
                  <el-checkbox-group v-if="radio===item.id" v-model="item.target">
                    <el-tooltip
                      v-for="(item,index) of questionDic"
                      :key="index+item.value"
                      class="item"
                      effect="dark"
                      :content="`题${item.value}：${item.label}`"
                      placement="left"
                      :open-delay="500"
                      :disabled="item.label.length<18"
                    >
                      <el-checkbox
                        :label="item.value"
                      >{{limitedData(`题${item.value}：${item.label}`,20)}}</el-checkbox>
                    </el-tooltip>
                  </el-checkbox-group>
                </div>
              </template>
            </el-main>
          </el-container>
        </el-container>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button type="danger" @click="clear">清除</el-button>
      <el-button type="danger" @click="submit">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      show: false,
      jumpData: [],
      displayData: [],
      questionDic: [],
      answerDic: [],
      radio: "",
      selectValue: "0",
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    open() {
      this.show = true;
      this.afterOpen();
    },
    close() {
      this.show = false;
    },
    limitedData(label, num) {
      if (label && label.length > num) {
        label = label.slice(0, num) + "...";
      }
      return label;
    },
    afterOpen() {
      const questionDic = [];
      const orderNumber = this.data.orderNumber;
      let questionList = [];
      this.list.forEach(m => {
        if (
          m.orderNumber < orderNumber &&
          JSON.stringify(m.logic) !== "{}" &&
          m.logic.type === "display"
        ) {
          m.logic.logic.forEach(o => {
            questionList.push(...o.target);
          });
        }
      });
      questionList = Array.from(new Set(questionList));
      for (const item of this.list) {
        if (item.type != "10" && item.type != "11") {
          //只能跳转到之后的题目
          if (this.data.orderNumber < item.orderNumber) {
            // 已经被配过的题目不能被配置
            if (questionList.includes(item.orderNumber)) continue;
            questionDic.push({
              id: item.id,
              value: item.orderNumber,
              label: item.title || "未填写标题",
            });
          }
        }
      }
      this.questionDic = questionDic;
      // const answerDic = [];
      // for (const item of this.data.optionList) {
      //   answerDic.push({
      //     value: item.randomStr,
      //     label: item.name,
      //   });
      // }
      // this.answerDic = answerDic;
      this.displayData = [];
      for (const item of this.data.optionList) {
        this.displayData.push({
          source: item.description || item.name || "未填写选项",
          id: item.randomStr,
          target: [],
        });
      }
      if (this.data.logic) {
        if (this.data.logic.type === "display") {
          this.displayData = this.displayData.map(item => {
            const res = this.data.logic.logic.find(v => {
              return v.id === item.id;
            });
            return {
              source: item.source,
              id: item.id,
              target: res ? res.target : [],
            };
          });
        }
      }
    },
    // 提交
    submit() {
      let logic = {
        type: this.activeName == "first" ? "jump" : "display",
        logic: this.activeName == "first" ? this.jumpData : this.displayData,
      };
      logic.logic = logic.logic.filter(item => {
        return item.target.length;
      });
      if (logic.logic.length == 0) {
        logic = {};
      }
      this.$emit("setLogic", logic);
      this.close();
    },
    clear() {
      this.data.logic = {};
      this.displayData.forEach(v => {
        v.target = [];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-title {
  margin: 0 0 15px;
}
.el-container {
  min-height: 200px;
  .el-aside {
    border: 1px solid #fcc;
    background: #fafaff;
    .el-radio-group {
      display: flex;
      flex-direction: column;
    }
    .el-radio {
      margin: 0;
      line-height: 20px;
      height: 20px;
      ::v-deep .el-radio__input {
        display: none;
      }
      &:hover {
        background: $--color-primary;
        color: #ffffff;
      }
    }
    p {
      padding-left: 20px;
    }
  }
  .el-main {
    border: solid #fcc;
    border-width: 1px 1px 1px 0;
    padding: 0 20px;
    .el-checkbox-group {
      display: flex;
      flex-direction: column;
    }
  }
  .el-footer {
    border: solid #fcc;
    border-width: 0 1px 1px 0;
    display: flex;
    align-items: center;
  }
  .active {
    background: $--color-primary;
    ::v-deep .el-radio__label {
      color: #ffffff;
    }
  }
}
.el-button {
  margin-right: 8px !important;
}
.tip {
  margin-left: 20px;
  color: $--color-text-secondary;
}
</style>
