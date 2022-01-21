<template>
  <div class="parent">
    <div class="aside">
      <div>组卷方式： 随机试卷</div>
      <div v-if="!configList.length">暂无题型</div>
      <div class="text-block-wrap" v-for="(item,i) in configList" :key="i">
        <div class="label-text">{{exam_question_type[item.quesType]}}:</div>
        <div class="number-text">{{item.simpleNum+item.middleNum+item.difficultNum}} 题</div>
      </div>
      <el-divider></el-divider>
      <div class="text-block-wrap">
        <div class="label-text">总题数：</div>
        <div class="number-text">{{choiceNum}}题</div>
      </div>
      <div class="text-block-wrap">
        <div class="label-text">总分：</div>
        <div class="number-text">{{score}}分</div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <el-input v-model="record.name" :disabled="!isEdit"></el-input>
      </div>
      <div v-if="isEdit">
        <el-button type="primary" @click="handleAddGroup()" style="margin-top:10px;">添加题型</el-button>
      </div>
      <div v-for="(item,i) in configList" :key="i">
        <el-divider></el-divider>
        <h2>
          {{i+1}}. {{exam_question_type[item.quesType]}}
          <template v-if="isEdit">
            <el-button @click="handleEdit(item)">编辑</el-button>
            <el-button @click="handleDel(i)">删除</el-button>
          </template>
        </h2>
        <div>分类：{{item.quesKindStr}}</div>
        <div>
          <span class="text-inline-wrap">
            <span class="label-text">普通：</span>
            <span class="number-text">{{item.simpleNum}} 题</span>
          </span>
          <span style="margin-left:5px;" class="text-inline-wrap">
            <span class="label-text">每题分值：</span>
            <span class="number-text">{{item.simpleScore}} 分</span>
          </span>
        </div>
        <div>
          <span class="text-inline-wrap">
            <span class="label-text">较难：</span>
            <span class="number-text">{{item.middleNum}} 题</span>
          </span>
          <span style="margin-left:5px;" class="text-inline-wrap">
            <span class="label-text">每题分值：</span>
            <span class="number-text">{{item.middleScore}} 分</span>
          </span>
        </div>
        <div>
          <span class="text-inline-wrap">
            <span class="label-text">困难：</span>
            <span class="number-text">{{item.difficultNum}} 题</span>
          </span>
          <span style="margin-left:5px;" class="text-inline-wrap">
            <span class="label-text">每题分值：</span>
            <span class="number-text">{{item.difficultScore}} 分</span>
          </span>
        </div>
      </div>
      <div v-if="isEdit">
        <el-divider></el-divider>
        <el-button type="primary" @click="handleSave()">保存</el-button>
      </div>
    </div>
    <DialogAddGroup
      ref="DialogAddGroup"
      @add-ques="handleAddQues"
      @edit-ques="handleEditQues"
      :existQuesType="existQuesType"
    ></DialogAddGroup>
  </div>
</template>
<script>
import {
  getTestDictPage,
  postTestPaper,
  putTestPaper,
  getTestPaperById,
} from "@/api/qms/test_questions_library";
import _ from "lodash";
import { mapGetters } from "vuex";
import DialogAddGroup from "./DialogAddGroup";
import { convertTreeToList } from "@/util/util";
export default {
  components: {
    DialogAddGroup,
  },
  props: ["record", "isEdit"],
  data() {
    return {
      configList: [],
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    existQuesType() {
      return this.configList.map((m) => m.quesType);
    },
    score() {
      let sum = 0;
      this.configList.forEach((m) => {
        sum +=
          m.simpleScore * m.simpleNum +
          m.middleScore * m.middleNum +
          m.difficultScore * m.difficultNum;
      });
      return sum;
    },
    choiceNum() {
      let sum = 0;
      this.configList.forEach((m) => {
        sum += m.simpleNum + m.middleNum + m.difficultNum;
      });
      return sum;
    },
    exam_question_type() {
      const typeMap = this.dictGroup.get("exam_question_type");
      return _(typeMap).keyBy("value").mapValues("label").value();
    },
  },
  methods: {
    async handleEdit(item) {
      await this.$refs["DialogAddGroup"].loadConfig(
        item.quesType,
        item.quesKind,
      );
      this.$refs["DialogAddGroup"].form = { ...item };
      this.$refs["DialogAddGroup"].form.quesKindStr = item.quesKind;
      this.$refs["DialogAddGroup"].form.quesKind = item.quesKindStr;
      this.$refs["DialogAddGroup"].dialogShow = true;
      this.$refs["DialogAddGroup"].isEdit = true;
    },
    handleDel(i) {
      // const configList = this.configList.filter((m, idx) => {
      //   return idx !== i;
      // });`
      this.configList.splice(i, 1);
      // this.$set(this, "configList", configList);
    },
    handleSave() {
      const postData = {
        examQuesConfigList: this.configList,
        title: this.record.name,
        kind: this.record.qType,
        score: this.score,
        choiceNum: this.choiceNum,
        generateType: this.record.generateType,
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
    handleAddGroup() {
      this.$refs["DialogAddGroup"].isEdit = false;
      this.$refs["DialogAddGroup"].dialogShow = true;
    },
    handleAddQues(form) {
      const row = { ...form };
      row.quesKindStr = form.quesKind;
      row.quesKind = form.quesKindStr;
      this.configList.push(row);
    },
    handleEditQues(form) {
      const row = { ...form };
      row.quesKindStr = form.quesKind;
      row.quesKind = form.quesKindStr;
      const i = this.configList.findIndex((m) => m.quesType === row.quesType);
      this.$set(this.configList, i, row);
    },
  },
  watch: {
    record: {
      immediate: true,
      async handler(val) {
        if (val.id) {
          const res = await getTestDictPage({ category: 1 });
          const list = convertTreeToList(res.data).filter((m) => m.value);
          const dictMap = _(list).keyBy("value").mapValues("label").value();
          const { data } = await getTestPaperById(val.id);
          this.configList = data.examQuesConfigList.map((m) => {
            return {
              ...m,
              quesKindStr: dictMap[m.quesKind],
            };
          });
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.parent {
  display: flex;
  .aside {
    flex: 0 0 200px;
    text-align: center;
  }
  .content {
    margin-left: 40px;
    flex: 1;
    h1 {
      text-align: center;
    }
    .title {
      text-align: center;
      line-height: 28px;
    }
  }
}
.text-block-wrap {
  display: flex;
}
.text-inline-wrap {
  display: inline-flex;
}

.text-block-wrap,
.text-inline-wrap {
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .number-text {
    color: $--color-text-secondary;
    font-size: 15px;
  }
  .label-next {
    color: $--color-text-primary;
    font-size: 16px;
  }
}
</style>
