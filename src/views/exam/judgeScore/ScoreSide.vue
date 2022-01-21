<template>
  <div>
    <div class="title">
      <span>答题卡</span>
      <el-button type="primary" plain @click="zeroScore">一键零分</el-button>
    </div>
    <div class="ques-type-group">
      <div class="ques-type-item" v-for="item in quesType" :key="item.value">
        <div class="s-title">
          {{item.label}}
          <span class="desc">（共{{_sumOfTques(item)}}题，合计{{item.total}}分）</span>
        </div>
        <div class="ques-tag-wrap">
          <div
            class="ques-tag"
            v-for="i in _quesOfQType(item)"
            :key="i"
            @click="handleSelect(i)"
            :class="{scored:!validatenull(findQues(i))}"
          >{{i}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postZeroScore } from "@/api/qms/exam_answer";
import { validatenull } from "@/util/validate";
export default {
  props: ["quesType", "scoreList", "zeroData"],
  data() {
    return {};
  },
  methods: {
    validatenull,
    _sumOfTques(item) {
      return item.end - item.start + 1;
    },
    _quesOfQType(item) {
      const num = this._sumOfTques(item);
      const quesList = [];
      for (let i = item.start; i < item.start + num; i++) {
        quesList.push(i);
      }
      return quesList;
    },
    handleSelect(i) {
      this.$emit("select", i);
    },
    findQues(i) {
      return this.scoreList.find(m => m.questionNum === i).score;
    },
    zeroScore() {
      this.$confirm("请确认是否全部零分", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          postZeroScore(this.zeroData).then(res => {
            if (res.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$router.go(-1);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.ques-tag-wrap {
  margin: 15px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  .ques-tag {
    cursor: pointer;
    color: $--color-text-regular;
    background: #fff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid $--border-color;
  }
  .scored {
    background: $--color-third;
    color: #ffffff;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.s-title {
  font-size: 14px;
  span.desc {
    color: $--color-text-secondary;
  }
}
</style>
