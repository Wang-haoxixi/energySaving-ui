<template>
  <div class="mainContainer">
    <!-- 上面这行的 @mouseenter="() => { this.mouseStatus = true}"
    @mouseleave="() => { this.mouseStatus = false}"-->
    <el-row>
      <el-col :span="1">
        <div class="number" v-if="quesIndex">{{data.orderNumber=quesIndex}}</div>
        <div v-else class="holder"></div>
      </el-col>
      <el-col :span="15">
        <all-content :data="data"></all-content>
      </el-col>
      <!-- v-show="mouseStatus" 下面这行的 -->
      <el-col :span="8" style="color: #909399;">
        <el-button type="text" v-if="data.type != '11'" @click="insertQuetion">插入题目</el-button>
        <el-button
          class="selfBtn"
          v-if="data.type == '1'  || data.type == '3'  || data.type == '5'"
          type="text"
          @click="logic(index)"
        >
          <i class="iconfont icon-xitongshezhi1"></i>逻辑配置
        </el-button>
        <el-button
          class="selfBtn"
          v-if="data.type != '11' && data.type != '12' && data.type != '13'"
          type="text"
          @click="copyData(index)"
        >
          <i class="iconfont icon-cz-yinyongsj"></i>复制
        </el-button>
        <el-button class="selfBtn" v-if="data.type != '11' " type="text" @click="deleteData(index)">
          <i class="iconfont icon-shanchu"></i>删除
        </el-button>
        <!-- <el-button class="selfBtn" v-if="data.type != '11' && star && data.isGrade == '1'" type="text" @click="scoreStar(index)"><i class="iconfont icon-pingfen"></i>自动评分</el-button> -->
        <div>
          <template v-if="data.type != '10'">
            <el-button
              class="selfBtn"
              type="text"
              @click="()=>this.$set(this.data,'isRequire',this.data.isRequire == '1' ? '0' : '1')"
            >是否必填</el-button>
            <el-checkbox
              v-model="data.isRequire"
              true-label="1"
              false-label="0"
              style="margin-left: 5px;"
            ></el-checkbox>
            <el-button class="selfBtn" type="text" @click="setDisplay">是否显示</el-button>
            <el-checkbox v-model="data.isShow" true-label="1" false-label="2"></el-checkbox>
          </template>
          <el-button
            v-if="index!==0"
            class="selfBtn"
            type="text"
            title="题目上移"
            @click="handleMove(1)"
          >
            <i class="el-icon-woneng-xiangshang"></i>
          </el-button>
          <el-button
            v-if="index!==list.length-1"
            class="selfBtn"
            type="text"
            title="题目下移"
            @click="handleMove(-1)"
          >
            <i class="el-icon-woneng-xiangxia"></i>
          </el-button>
        </div>
        <div>
          {{data.logic.type == 'jump' ? '跳转逻辑：' : (data.logic.type == 'display' ? '显示逻辑：' : '')}}
          <div v-if="data.logic.type == 'jump'">
            <div
              v-for="(item, index) in data.logic.logic"
              :key="index"
            >{{`选择 ${getOption(item.id||false,data.logic.logic)} 时跳转：${item.target}`}}</div>
          </div>
          <div v-if="data.logic.type == 'display'">
            <div
              v-for="(item, index) in data.logic.logic"
              :key="index"
            >{{`选择 ${getOption(item.id||false)} 时显示：题${item.target}`}}</div>
          </div>
          <div v-else></div>
        </div>
      </el-col>
    </el-row>
    <logic-dialog :list="list" :data="data" @setLogic="setLogic" ref="logicDialog"></logic-dialog>
    <question-dialog ref="questionDialog" @pushQuestion="pushQuestion"></question-dialog>
  </div>
</template>


<script>
import logicDialog from "../dialog/logic";
import questionDialog from "../dialog/question";
import AllContent from "./allContent";
import operationMixins from "@/mixins/operationMixins";
import { swapArr } from "@/util/util";
export default {
  mixins: [operationMixins],
  components: {
    AllContent,
    logicDialog,
    questionDialog,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
    quesIndex: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default: () => [],
    },
    star: {
      type: Boolean,
      default: () => false,
    },
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: null,
      indexName: "",
      // mouseStatus: false,
    };
  },
  // computed: {
  // 逻辑配置限制一道题时使用
  // getLogicMount() {
  //   let flag = 0;
  //   this.list.forEach(item => {
  //     if (item.logic.logic) {
  //       flag++;
  //     }
  //   });
  //   if (this.data.logic.logic) {
  //     return true;
  //   } else {
  //     return flag ? false : true;
  //   }
  // },
  // },
  methods: {
    getOption(id) {
      //根据选项ID获取选项名字
      const item = this.data.optionList.find(item => {
        return item.randomStr === id;
      });
      if (item) {
        // console.log((logic.name = item.name));
        return item.description || item.name || "未填写选项";
      } else {
        return "";
      }
    },
    pushQuestion(item) {
      this.$emit("pushQuestion", item, this.index);
    },
    //插入题目
    insertQuetion() {
      this.$refs["questionDialog"].open();
    },
    copyData(index) {
      this.$emit("handleCopy", index);
    },
    deleteData(index) {
      this._handleComfirm(
        index,
        index => {
          this.$emit("handleDelete", index);
          return { data: true };
        },
        "删除题目",
      );
    },
    logic(index) {
      this.currentIndex = index;
      this.$refs["logicDialog"].open();
    },
    scoreStar(index) {
      this.currentIndex = index;
      // this.$refs['scoreDialog'].open()
    },
    setLogic(data) {
      // console.log(this.list[this.currentIndex], data);
      this.$set(this.list[this.currentIndex], "logic", data);
    },
    setDisplay() {
      this.$set(this.data, "isShow", this.data.isShow == "1" ? "2" : "1");
    },
    handleMove(index) {
      //箭头切换顺序切清空逻辑配置
      const order = this.index;
      this.list[order].logic = {};
      this.list[order - index].logic = {};
      this.list = swapArr(this.list, order, order - index);
    },
  },
};
</script>
<style lang="scss" scoped>
.mainContainer {
  margin: 10px;
  border-bottom: 1px solid $--border-color;

  .number {
    color: #909399;
    width: 28px;
    height: 28px;
    line-height: 28px;
    float: right;
    font-size: 14px;
    background: #f2f6fc;
    text-align: center;
    border-radius: 50%;
    margin: 0 5px 5px 5px;
    font-weight: 600;
  }
  .holder {
    width: 28px;
    height: 28px;
    float: right;
    margin: 0 5px 5px 5px;
  }

  .selfBtn {
    color: #909399;
    ::v-deep .el-checkbox__inner {
      &:after {
        border-color: $--color-text-regular;
      }
    }
    &:hover {
      opacity: 0.7;
    }
    &:hover ::v-deep .el-checkbox__inner:after {
      opacity: 0.7;
    }
    ::v-deep .el-checkbox__inner {
      background-color: #fff;
      border-color: $--border-color;
    }
  }
  .el-checkbox {
    margin-right: 10px;
  }
}

.rightSpace {
  width: 100%;
  border: 1px solid $--border-color;
  margin: 5px 0px;
}

.rightSpace .number {
  padding: 5px 8px;
  display: inline-block;
  border: 1px solid $--border-color;
  margin: 5px;
}

.title {
  margin: 5px;
}

.title span {
  margin: 0px 10px 0 0;
  font-size: 16px;
}

.nameForSpan {
  display: inline-block;
  width: 20%;
  margin: 0 !important;
}

.title h3 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
}
</style>