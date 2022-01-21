<template>
  <div class="exam-box">
    <el-card
      class="box-card left-box"
      :class="{active:!questionCount}"
      :body-style="{ padding: '0px' }"
      shadow="never"
    >
      <div class="exam-type">
        <div>组卷方式: 固定试卷</div>
        <hr />
      </div>
      <div class="item" v-show="!!singleCount">
        <span>单选题</span>
        <span class="count">{{singleCount}}题</span>
      </div>
      <div class="item" v-show="!!mutipleCount">
        <span>多选题</span>
        <span class="count">{{mutipleCount}}题</span>
      </div>
      <div class="item" v-show="!!judgeCount">
        <span>判断题</span>
        <span class="count">{{judgeCount}}题</span>
      </div>
      <div class="item" v-show="!!fillBlankCount">
        <span>填空题</span>
        <span class="count">{{fillBlankCount}}题</span>
      </div>
      <div class="item" v-show="!!qaCount">
        <span>问答题</span>
        <span class="count">{{qaCount}}题</span>
      </div>
      <div class="item">
        <span>总题数</span>
        <span class="count">{{questionCount}}题</span>
      </div>
      <div class="item">
        <span>总分</span>
        <span class="count">{{allCount}}分</span>
      </div>
    </el-card>
    <el-card class="box-card right-box" :body-style="{ padding: '0px' }" shadow="never">
      <div class="title">
        <el-input v-model="record.name" :disabled="!isEdit"></el-input>
      </div>
      <el-button class="iep-btn-l" @click="addQuestion" v-if="isEdit">添加题型</el-button>
      <div class="questionType" v-if="singleItems.length>0">
        <div class="question-title">
          <span @click="show1 = !show1" class="q_type">
            <i :class="`el-icon-arrow-${show1?'down':'right'}`"></i>
            {{showCnNumber(1)}}、单选题
          </span>
          <div style="display:inline-block;margin-left: 15px;">
            <span>批量设置</span>
            <el-input-number
              size="small"
              class="iep-btn-l"
              style="margin:10px"
              :disabled="!isEdit"
              v-model="num1"
              type="number"
              :min="0"
              :step="1"
              step-strictly
              @input="batchScore1"
            ></el-input-number>分
            <iep-button @click="changeBatchScore('RADIO')" v-if="isEdit">确定</iep-button>
          </div>
          <div class="btn-column">
            <iep-button
              type="primary"
              style="margin-right:10px"
              @click="addQuestion('RADIO')"
              v-if="isEdit"
            >添加试题</iep-button>
            <iep-button style="margin-right:10px" @click="deleteBatch('RADIO')" v-if="isEdit">批量删除</iep-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="questionList" v-show="show1">
            <div class="qItem" v-for="(item,index) of singleItems" :key="index">
              <single
                :index="index"
                :leng="singleItems.length"
                :itemData="item"
                :isEdit="isEdit"
                @handleDelete="itemDelete"
                @handleTop="itemTop"
                @handleBottom="itemBottom"
                @changeScore="changeScore"
              ></single>
            </div>
            <!-- <div v-if="!isEdit" class="mask"></div> -->
          </div>
        </el-collapse-transition>
      </div>
      <div class="questionType" v-if="mutipleItems.length>0">
        <div class="question-title">
          <span @click="show2 = !show2" class="q_type">
            <i :class="`el-icon-arrow-${show2?'down':'right'}`"></i>
            {{showCnNumber(2)}}、多选题
          </span>
          <div style="display:inline-block;margin-left: 15px;">
            <span>批量设置</span>
            <el-input-number
              size="small"
              style="margin:10px"
              v-model="num2"
              :disabled="!isEdit"
              type="number"
              :min="0"
              :step="1"
              step-strictly
              @input="batchScore2"
            ></el-input-number>分
            <iep-button @click="changeBatchScore('CHECKBOX')" v-if="isEdit">确定</iep-button>
          </div>
          <div class="btn-column">
            <iep-button
              type="primary"
              style="margin-right:10px"
              @click="addQuestion('CHECKBOX')"
              v-if="isEdit"
            >添加试题</iep-button>
            <iep-button
              style="margin-right:10px"
              @click="deleteBatch('CHECKBOX')"
              v-if="isEdit"
            >批量删除</iep-button>
          </div>
        </div>

        <el-collapse-transition>
          <div class="questionList" v-show="show2">
            <div class="qItem" v-for="(item,index) of mutipleItems" :key="index">
              <mutiple
                :index="index"
                :leng="mutipleItems.length"
                :itemData="item"
                :isEdit="isEdit"
                @handleDelete="itemDelete"
                @handleTop="itemTop"
                @handleBottom="itemBottom"
                @changeScore="changeScore"
              ></mutiple>
            </div>
            <!-- <div v-if="!isEdit" class="mask"></div> -->
          </div>
        </el-collapse-transition>
      </div>
      <div class="questionType" v-if="judgeItems.length>0">
        <div class="question-title">
          <span @click="show3 = !show3" class="q_type">
            <i :class="`el-icon-arrow-${show3?'down':'right'}`"></i>
            {{showCnNumber(3)}}、判断题
          </span>
          <div style="display:inline-block;margin-left: 15px;">
            <span>批量设置</span>
            <el-input-number
              size="small"
              style="margin:10px"
              v-model="num3"
              :disabled="!isEdit"
              type="number"
              :min="0"
              :step="1"
              step-strictly
              @input="batchScore3"
            ></el-input-number>分
            <iep-button @click="changeBatchScore('CHECKED')" v-if="isEdit">确定</iep-button>
          </div>
          <div class="btn-column">
            <iep-button
              type="primary"
              style="margin-right:10px"
              @click="addQuestion('CHECKED')"
              v-if="isEdit"
            >添加试题</iep-button>
            <iep-button style="margin-right:10px" @click="deleteBatch('CHECKED')" v-if="isEdit">批量删除</iep-button>
          </div>
        </div>

        <el-collapse-transition>
          <div class="questionList" v-show="show3">
            <div class="qItem" v-for="(item,index) of judgeItems" :key="index">
              <judge
                :index="index"
                :leng="judgeItems.length"
                :itemData="item"
                :isEdit="isEdit"
                @handleDelete="itemDelete"
                @handleTop="itemTop"
                @handleBottom="itemBottom"
                @changeScore="changeScore"
              ></judge>
            </div>
            <!-- <div v-if="!isEdit" class="mask"></div> -->
          </div>
        </el-collapse-transition>
      </div>
      <div class="questionType" v-if="fillBlankItems.length>0">
        <div class="question-title">
          <span @click="show4 = !show4" class="q_type">
            <i :class="`el-icon-arrow-${show4?'down':'right'}`"></i>
            {{showCnNumber(4)}}、填空题
          </span>
          <div style="display:inline-block;margin-left: 15px;">
            <span>批量设置</span>
            <el-input-number
              size="small"
              style="margin:10px"
              v-model="num4"
              :disabled="!isEdit"
              type="number"
              :min="0"
              :step="1"
              step-strictly
              @input="batchScore4"
            ></el-input-number>分
            <iep-button @click="changeBatchScore('GAPFILLING')" v-if="isEdit">确定</iep-button>
          </div>
          <div class="btn-column">
            <iep-button
              type="primary"
              style="margin-right:10px"
              @click="addQuestion('GAPFILLING')"
              v-if="isEdit"
            >添加试题</iep-button>
            <iep-button
              style="margin-right:10px"
              @click="deleteBatch('GAPFILLING')"
              v-if="isEdit"
            >批量删除</iep-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="questionList" v-show="show4">
            <div class="qItem" v-for="(item,index) of fillBlankItems" :key="index">
              <fill-blank
                :index="index"
                :leng="fillBlankItems.length"
                :itemData="item"
                :isEdit="isEdit"
                @handleDelete="itemDelete"
                @handleTop="itemTop"
                @handleBottom="itemBottom"
                @changeScore="changeScore"
              ></fill-blank>
            </div>
            <!-- <div v-if="!isEdit" class="mask"></div> -->
          </div>
        </el-collapse-transition>
      </div>
      <div class="questionType" v-if="qaItems.length>0">
        <div class="question-title">
          <span @click="show5 = !show5" class="q_type">
            <i :class="`el-icon-arrow-${show5?'down':'right'}`"></i>
            {{showCnNumber(5)}}、问答题
          </span>
          <div style="display:inline-block;margin-left: 15px;">
            <span>批量设置</span>
            <el-input-number
              size="small"
              style="margin:10px"
              v-model="num5"
              :disabled="!isEdit"
              type="number"
              :min="0"
              :step="1"
              step-strictly
              @input="batchScore5"
            ></el-input-number>分
            <iep-button @click="changeBatchScore('ESSAYQUESTION')" v-if="isEdit">确定</iep-button>
          </div>
          <div class="btn-column">
            <iep-button
              type="primary"
              style="margin-right:10px"
              @click="addQuestion('ESSAYQUESTION')"
              v-if="isEdit"
            >添加试题</iep-button>
            <iep-button
              style="margin-right:10px"
              @click="deleteBatch('ESSAYQUESTION')"
              v-if="isEdit"
            >批量删除</iep-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="questionList" v-show="show5">
            <div class="qItem" v-for="(item,index) of qaItems" :key="index">
              <qa
                :index="index"
                :leng="qaItems.length"
                :itemData="item"
                :isEdit="isEdit"
                @handleDelete="itemDelete"
                @handleTop="itemTop"
                @handleBottom="itemBottom"
                @changeScore="changeScore"
              ></qa>
            </div>
            <!-- <div v-if="!isEdit" class="mask"></div> -->
          </div>
        </el-collapse-transition>
      </div>
      <div>
        <el-button
          class="iep-btn-l"
          style="margin:30px 0"
          type="primary"
          @click="handleSave"
          v-if="isEdit"
        >保存</el-button>
      </div>
    </el-card>
    <dialogAdd ref="dialogAdd" @save="createQuestions"></dialogAdd>
  </div>
</template>
<script>
// import { Items } from "./mock";
import qa from "./items/qa";
import fillBlank from "./items/fillBlank";
import single from "./items/single";
import judge from "./items/judge";
import mutiple from "./items/mutiple";
import dialogAdd from "./dialogAdd";
import {
  postTestPaper,
  putTestPaper,
  getTestPaperById,
} from "@/api/qms/test_questions_library";
export default {
  props: ["record", "isEdit"],
  components: {
    single,
    dialogAdd,
    judge,
    mutiple,
    fillBlank,
    qa,
  },
  data() {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      itemsList: [],
      allCount: 0,
      singleScore1: 0,
      singleScore2: 0,
      singleScore3: 0,
      singleScore4: 0,
      singleScore5: 0,
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
    };
  },
  methods: {
    changeBatchScore(type) {
      if (type === "RADIO") {
        this.singleItems.forEach((data) => {
          data.score = this.singleScore1;
        });
      } else if (type === "CHECKBOX") {
        this.mutipleItems.forEach((data) => {
          data.score = this.singleScore2;
        });
      } else if (type === "CHECKED") {
        this.judgeItems.forEach((data) => {
          data.score = this.singleScore3;
        });
      } else if (type === "GAPFILLING") {
        this.fillBlankItems.forEach((data) => {
          data.score = this.singleScore4;
        });
      } else if (type === "ESSAYQUESTION") {
        this.qaItems.forEach((data) => {
          data.score = this.singleScore5;
        });
      }
    },
    batchScore5(data) {
      this.singleScore5 = Number(data);
    },
    batchScore4(data) {
      this.singleScore4 = Number(data);
    },
    batchScore3(data) {
      this.singleScore3 = Number(data);
    },
    batchScore2(data) {
      this.singleScore2 = Number(data);
    },
    batchScore1(data) {
      this.singleScore1 = Number(data);
    },
    changeScore(score, index) {
      this.itemsList[index].singleScore = score;
      this.resetScore();
    },
    resetScore() {
      let score = 0;
      this.itemsList.forEach((item) => {
        score += item.singleScore;
      });
      this.allCount = score;
    },
    createQuestions(items) {
      const ids = this.itemsList.map((item) => item.id);
      const getItems = [];
      items.forEach((ele) => {
        ele.score = 0; //初始化0分
        getItems.push(ele);
      });
      if (ids.length !== 0) {
        for (const item of getItems) {
          if (!ids.includes(item.id)) {
            this.itemsList.push(item);
          }
        }
      } else {
        this.itemsList = getItems;
      }
      this.$refs["dialogAdd"].selectOption = this.itemsList;
      this.sortQuestions();
      this.setIndex();
    },
    showCnNumber(number) {
      const arr = ["一", "二", "三", "四", "五"];
      if (number == 1) {
        return "一";
      } else if (number == 2) {
        return this.singleItems.length == 0 ? "一" : "二";
      } else if (number == 3) {
        let count = 0;
        this.singleItems.length != 0 ? count++ : "";
        this.mutipleItems.length != 0 ? count++ : "";
        return arr[count];
      } else if (number == 4) {
        let count = 0;
        this.singleItems.length != 0 ? count++ : "";
        this.mutipleItems.length != 0 ? count++ : "";
        this.judgeItems.length != 0 ? count++ : "";
        return arr[count];
      } else if (number == 5) {
        let count = 0;
        this.singleItems.length != 0 ? count++ : "";
        this.mutipleItems.length != 0 ? count++ : "";
        this.judgeItems.length != 0 ? count++ : "";
        this.fillBlankItems.length != 0 ? count++ : "";
        return arr[count];
      }
    },
    addQuestion(type) {
      this.$refs["dialogAdd"].open(type);
      if (type === "CHECKBOX" || type === "RADIO" || type === "CHECKED") {
        this.$refs["dialogAdd"].selectOption = this.itemsList.filter(
          (item) => item.type == type,
        );
      } else {
        this.$refs["dialogAdd"].selectOption = this.itemsList;
      }
    },
    itemDelete(index) {
      this.$alert("是否确认删除？", "警告", {
        confirmButtonText: "确定",
        callback: (action) => {
          if (action == "confirm") {
            this.itemsList.splice(index, 1);
            this.setIndex();
            this.resetScore();
          }
        },
      });
    },
    itemTop(index) {
      const type = this.itemsList[index].type;
      if (index - 1 > -1 && this.itemsList[index - 1].type == type) {
        const stash = { ...this.itemsList[index - 1] };
        this.itemsList.splice(index - 1, 1, this.itemsList[index]);
        this.itemsList.splice(index, 1, stash);
        this.setIndex();
      }
    },
    itemBottom(index) {
      const type = this.itemsList[index].type;
      if (
        index + 1 < this.itemsList.length &&
        this.itemsList[index + 1].type == type
      ) {
        const stash = { ...this.itemsList[index + 1] };
        this.itemsList.splice(index + 1, 1, this.itemsList[index]);
        this.itemsList.splice(index, 1, stash);
        this.setIndex();
      }
    },
    //设置题号
    setIndex() {
      this.itemsList = this.itemsList.map((item, index) => {
        return {
          ...item,
          index,
        };
      });
    },
    //排序
    sortQuestions() {
      this.itemsList = this.singleItems.concat(
        this.mutipleItems,
        this.judgeItems,
        this.fillBlankItems,
        this.qaItems,
      );
    },
    //批量删除
    deleteBatch(type) {
      this.$alert("是否确认删除？", "警告", {
        confirmButtonText: "确定",
        callback: (action) => {
          if (action == "confirm") {
            this.itemsList = this.itemsList.filter((item) => item.type != type);
            this.resetScore();
            this.setIndex();
          }
        },
      });
    },
    //保存
    handleSave() {
      if (this.itemsList.length === 0) {
        this.$message({
          type: "warning",
          message: "至少选择一道题目再保存！",
        });
        return;
      }
      const postData = {
        score: this.allCount,
        choiceNum: this.questionCount,
        title: this.record.name,
        kind: this.record.qType,
        generateType: this.record.generateType,
        examQuesConfigList: this.getPostData(),
      };
      if (this.record.id) {
        postData.id = this.record.id;
        putTestPaper(postData).then(({ data }) => {
          if (data) {
            this.$message({
              type: "success",
              message: "保存成功！",
            });
            this.$emit("on-data");
          }
        });
      } else {
        postTestPaper(postData).then(({ data }) => {
          if (data) {
            this.$message({
              type: "success",
              message: "保存成功！",
            });
            this.$emit("on-data");
          }
        });
      }
    },
    //转化提交模块数据
    getPostData() {
      const postData = [];
      if (this.singleItems.length > 0) {
        const ids = this.singleItems.map((item) => item.id).join(",");
        const scoreList = this.singleItems
          .map((item) => item.singleScore)
          .join(",");
        postData.push({
          quesType: "RADIO",
          questionList: ids,
          batchScore: this.num1,
          testPaperId: this.record.id,
          scoreList: scoreList,
        });
      }
      if (this.mutipleItems.length > 0) {
        const ids = this.mutipleItems.map((item) => item.id).join(",");
        const scoreList = this.mutipleItems
          .map((item) => item.singleScore)
          .join(",");
        postData.push({
          quesType: "CHECKBOX",
          questionList: ids,
          batchScore: this.num2,
          testPaperId: this.record.id,
          scoreList: scoreList,
        });
      }
      if (this.judgeItems.length > 0) {
        const ids = this.judgeItems.map((item) => item.id).join(",");
        const scoreList = this.judgeItems
          .map((item) => item.singleScore)
          .join(",");
        postData.push({
          quesType: "CHECKED",
          questionList: ids,
          batchScore: this.num3,
          testPaperId: this.record.id,
          scoreList: scoreList,
        });
      }
      if (this.fillBlankItems.length > 0) {
        const ids = this.fillBlankItems.map((item) => item.id).join(",");
        const scoreList = this.fillBlankItems
          .map((item) => item.singleScore)
          .join(",");
        postData.push({
          quesType: "GAPFILLING",
          questionList: ids,
          batchScore: this.num4,
          testPaperId: this.record.id,
          scoreList: scoreList,
        });
      }
      if (this.qaItems.length > 0) {
        const ids = this.qaItems.map((item) => item.id).join(",");
        const scoreList = this.qaItems
          .map((item) => item.singleScore)
          .join(",");
        postData.push({
          quesType: "ESSAYQUESTION",
          questionList: ids,
          batchScore: this.num5,
          testPaperId: this.record.id,
          scoreList: scoreList,
        });
      }
      return postData;
    },
  },
  computed: {
    //题目
    singleItems() {
      return this.itemsList.filter((item) => item.type == "RADIO");
    },
    mutipleItems() {
      return this.itemsList.filter((item) => item.type == "CHECKBOX");
    },
    judgeItems() {
      return this.itemsList.filter((item) => item.type == "CHECKED");
    },
    fillBlankItems() {
      return this.itemsList.filter((item) => item.type == "GAPFILLING");
    },
    qaItems() {
      return this.itemsList.filter((item) => item.type == "ESSAYQUESTION");
    },
    //数量
    singleCount() {
      return this.singleItems.length;
    },
    mutipleCount() {
      return this.mutipleItems.length;
    },
    judgeCount() {
      return this.judgeItems.length;
    },
    fillBlankCount() {
      return this.fillBlankItems.length;
    },
    qaCount() {
      return this.qaItems.length;
    },
    // allCount() {
    //   return (
    //     this.singleCount * this.num1 +
    //     this.mutipleCount * this.num2 +
    //     this.judgeCount * this.num3 +
    //     this.fillBlankCount * this.num4 +
    //     this.qaCount * this.num5
    //   );
    // },
    questionCount() {
      return (
        this.singleCount +
        this.mutipleCount +
        this.judgeCount +
        this.fillBlankCount +
        this.qaCount
      );
    },
  },
  watch: {
    record: {
      immediate: true,
      handler(val) {
        if (val.id) {
          getTestPaperById(val.id).then(({ data }) => {
            this.itemsList = [];
            for (const typeItem of data.examQuesConfigList || []) {
              for (const item of typeItem.examQuestionList) {
                this.itemsList.push(item);
              }
            }
            // for (const (item,index) of data.examQuesConfigList) {
            //   this[`num${item.quesType}`] = item.batchScore;
            // }
            // 这里他用了num1 num2 num3分别对应 但是有可能出现只有多选或者判断 并不会全部出现的问题
            // data.examQuesConfigList.forEach((v, i) => {
            //   this[`num${i + 1}`] = v.batchScore;
            // });
            // 我这里根据他之前的代码进行一一对应
            data.examQuesConfigList.forEach((v) => {
              if (v.examQuestionList[0].type === "RADIO") {
                this.num1 = v.batchScore;
              } else if (v.examQuestionList[0].type === "CHECKBOX") {
                this.num2 = v.batchScore;
              } else if (v.examQuestionList[0].type === "CHECKED") {
                this.num3 = v.batchScore;
              } else if (v.examQuestionList[0].type === "GAPFILLING") {
                this.num4 = v.batchScore;
              } else if (v.examQuestionList[0].type === "ESSAYQUESTION") {
                this.num5 = v.batchScore;
              }
            });
            this.sortQuestions();
            this.setIndex();
          });
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.exam-box {
  display: flex;
  justify-content: space-between;
  .active {
    border-color: red;
  }
  .left-box {
    width: 200px;
    margin-right: 25px;
    padding: 20px;
    font-size: 14px;
    color: #333;
    line-height: 28px;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      &:nth-child(1) {
        padding-top: 0;
      }
      .count {
        color: #888;
      }
    }
  }
  .right-box {
    flex: 1;
    border: none;
    // padding: 30px 20px;
    &:hover {
      box-shadow: none;
    }
    .questionType {
      margin-top: 10px;
      .title {
        text-align: center;
        line-height: 28px;
      }
      .q_type {
        cursor: pointer;
        font-size: 16px;
      }
      .btn-column {
        float: right;
        line-height: 52px;
      }
      .qItem {
        margin-top: 15px;
      }
      .questionList {
        position: relative;
        .mask {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-color: transparent;
        }
      }
    }
  }
}
.question-title {
  margin-top: 20px;
  border-bottom: 1px solid $--border-color;
}
.iep-btn-l {
  margin-top: 30px;
}
</style>
