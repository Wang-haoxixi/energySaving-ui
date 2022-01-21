<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <!-- @click="changeTitle()" -->
      <h3 class="name">单选题</h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="150" placeholder="最多输入150个字"></el-input>
        </div>
      </div>
      <div class="ti">
        <div class="ti1">选项：</div>
        <div class="ti2">
          <draggable element="div" v-model="data.optionList" :animation="100">
            <div class="mg10" v-for="(item,index) in data.optionList" :key="index">
              <el-radio label="1">
                <el-input
                  :maxlength="80"
                  style="width:200px;border:none;text-align:center"
                  size="mini"
                  placeholder="请输入选项（最多80个字）"
                  v-model="item.name"
                  @change="changeLogic(item)"
                ></el-input>
              </el-radio>
              <el-input style="width:150px" size="mini" v-if="item.type == 2" disabled></el-input>
              <!-- <span v-if="data.isScore == '1'" style="margin-left:20px">分数</span> -->
              <!-- <el-input-number v-if="data.isScore == '1'" size="mini" v-model="item.score"></el-input-number> -->
              <span style="text-align:right">
                <i
                  style="margin-left:5px"
                  class="curP el-icon-remove-outline"
                  @click="handleDelete(index)"
                ></i>
              </span>
            </div>
          </draggable>
        </div>
      </div>

      <el-button class="gray" type="text" @click="addSingle">
        <i class="blue el-icon-circle-plus-outline"></i>添加单个选项
      </el-button>
      <el-button class="gray" type="text" @click="addSingleInput">
        <i class="blue el-icon-printer"></i>在选项后添加填空框
      </el-button>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(单选题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <!-- <span v-show="data.score" style="color: red;">得分: {{data.score}}</span> -->
        <div v-for="(item,index) in data.optionList" :key="index" style="margin-top:3px;">
          <el-radio
            :label="item.name"
            v-model="data.answer.value"
            :disabled="disabled"
            @change="setOptionId(item.id)"
            class="radio-box"
          >
            <div class="radio-item">{{optionLetters[index]}}、{{item.name}}</div>
          </el-radio>
          <el-input
            :maxlength="50"
            style="width:200px"
            size="mini"
            v-if="item.type == 2"
            :disabled="disabled"
            v-model="data.answer[item.name]"
            placeholder="最多输入50个字"
          ></el-input>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import baseMixin from "./mixin/base";
import { randomLenNum } from "@/util/util";

export default {
  mixins: [baseMixin],
  components: { draggable },
  data() {
    return {
      optionList: [],
      titleType: 1,
      optionStr: "",
    };
  },
  watch: {
    "data.answer.value": {
      deep: true,
      handler(val) {
        if (!this.disabled && this.data.logic != "{}") {
          let logic;
          if (this.data.logic instanceof Object) {
            logic = this.data.logic;
          } else {
            logic = JSON.parse(this.data.logic);
          }
          if (logic.type === "jump") {
            for (const item of logic.logic) {
              if (val == item.source) {
                window.location.href =
                  window.location.href.split("#")[0] + "#a" + item.target;
                // window.location.href = window.location.href.split("#")[0] +"#a"+item.target
              }
            }
          }
          if (logic.type === "display") {
            const targetShow = [];
            let targetHidden = [];
            const allTaget = [];
            logic.logic.map(item => {
              allTaget.push(...item.target);
            });
            for (const item of logic.logic) {
              if (val == item.source) {
                targetShow.push(...item.target);
              }
            }
            targetHidden = allTaget.filter(
              item => !(targetShow.indexOf(item) > -1),
            );
            targetHidden = Array.from(new Set(targetHidden));
            this.$emit("changeDisplay", targetShow, "1");
            this.$emit("changeDisplay", targetHidden, "2");
          }
        }
      },
    },
  },
  methods: {
    changeLogic(value) {
      //修改选项时同步逻辑配置中的选项名字
      const logicArr = this.data.logic.logic;
      if (logicArr) {
        logicArr.forEach(item => {
          if (item.id === value.randomStr) {
            item.source = value.name;
          }
        });
      }
    },
    setOptionId(id) {
      this.data.optionId = id;
    },
    addSingle() {
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 1,
        name: "",
        score: 0,
        randomStr: randomLenNum(4, true),
      });
      this.$set(this.data, "optionList", newArr);
    },
    addSingleInput() {
      //未使用参数 isScore
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 2,
        name: "",
        score: 0,
        randomStr: randomLenNum(4, true),
      });
      this.$set(this.data, "optionList", newArr);
    },
    handleDelete(index) {
      const newArr = this.data.optionList || [];
      const newArr2 = this.data.logic.logic;
      if (newArr2) {
        const id = newArr[index].randomStr;
        const index2 = newArr2.findIndex(item => {
          return item.id === id;
        });
        if (index2 > -1) {
          newArr2.splice(index2, 1);
          this.$set(this.data.logic, "logic", newArr2);
        }
      }
      newArr.splice(index, 1);
      this.$set(this.data, "optionList", newArr);
    },
  },
};
</script>
<style lang="scss" scoped>
.radio-box {
  height: auto !important;
  line-height: 1 !important;
}
.radio-item {
  display: inline-block;
  white-space: normal;
  vertical-align: top;
  margin-top: -3px;
  line-height: 24px;
  max-width: 100%;
}
@import "./css/style.scss";
.gray {
  color: $--color-text-regular;
  font-size: 15px;
}
.blue {
  color: #3a8ee6;
  padding-right: 5px;
}
</style>

