<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <!-- @click="changeTitle()" -->
      <h3 class="name">多选题</h3>
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
              <el-checkbox label="1">
                <el-input
                  :maxlength="80"
                  style="width:200px;border:none;text-align:center"
                  size="mini"
                  placeholder="请输入选项（最多80个字）"
                  v-model="item.name"
                ></el-input>
              </el-checkbox>
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
      <div>
        <el-button class="gray" type="text" @click="addSingle">
          <i class="blue el-icon-circle-plus-outline"></i>添加单个选项
        </el-button>
        <el-button class="gray" type="text" @click="addSingleInput">
          <i class="blue el-icon-printer"></i>在选项后添加填空框
        </el-button>
      </div>
      <div>
        <el-button class="gray" type="text">
          <i class="blue el-icon-refresh"></i>选择范围 最少
          <el-input
            style="width:100px;border:none"
            size="mini"
            placeholder="请输入选项"
            v-model="data.minNum"
            type="number"
            min="0"
          />最多
          <el-input
            style="width:100px;border:none"
            size="mini"
            placeholder="请输入选项"
            v-model="data.maxNum"
            type="number"
            min="0"
          />
        </el-button>
      </div>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(多选题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
          <span class="tips" v-if="data.isRequire === '1'">至少选择{{data.minNum}}个最多选择{{data.maxNum}}个</span>
        </h3>
        <!-- <span v-show="data.score" style="color: red;">得分: {{data.score}}</span> -->
        <el-checkbox-group v-model="data.answer.value" :max="+data.maxNum">
          <div v-for="(item, index) in data.optionList" :key="index" style="margin-top:3px;">
            <el-checkbox
              :label="item.name"
              :disabled="disabled"
              @change="setOptionId(item.id)"
              style="margin-right: 30px;"
              class="radio-box"
            >
              <div class="radio-item">{{optionLetters[index]}}、{{item.name}}</div>
            </el-checkbox>
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
        </el-checkbox-group>
      </div>
    </template>
  </div>
</template>


<script>
import draggable from "vuedraggable";
import baseMixin from "./mixin/base";
export default {
  mixins: [baseMixin],
  components: { draggable },
  data() {
    return {
      value: [],
      optionList: [],
      titleType: 1,
      optionIds: [],
    };
  },
  watch: {
    "data.minNum": {
      deep: true,
      handler(val) {
        if (+this.data.isRequire && this.data.optionList.length) {
          if (val === "0") {
            this.$set(this.data, "minNum", 1);
          }
        }
        if (val > this.data.maxNum) {
          this.$set(this.data, "minNum", this.data.maxNum);
        }
        if (val < 0) {
          this.$set(this.data, "minNum", 0);
        }
      },
    },
    "data.maxNum": {
      deep: true,
      handler(val) {
        if (this.data.optionList && val > (this.data.optionList.length || 0)) {
          this.$set(this.data, "maxNum", this.data.optionList.length || 0);
        }
        if (+this.data.isRequire && this.data.optionList.length) {
          if (val < this.data.minNum && val > 0) {
            this.$set(this.data, "minNum", this.data.maxNum);
          } else if (val == "0") {
            this.$set(this.data, "maxNum", 1);
          }
        }
        if (val < this.data.minNum) {
          this.$set(this.data, "minNum", this.data.maxNum);
        }
      },
    },
    "data.isRequire": {
      deep: true,
      handler(val) {
        if (+val && this.data.optionList.length) {
          if (this.data.maxNum == "0") {
            this.$set(this.data, "maxNum", 1);
          }
          if (this.data.minNum == "0") {
            this.$set(this.data, "minNum", 1);
          }
        }
      },
    },
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
          // let logic = JSON.parse(this.data.logic);
          if (logic.type === "jump") {
            for (const item of logic.logic) {
              if (val.indexOf(item.source) > -1) {
                window.location.href =
                  window.location.href.split("#")[0] + "#a" + item.target;
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
              if (val.indexOf(item.source) > -1) {
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
    setOptionId(id) {
      const index = this.optionIds.indexOf(id);
      if (index > -1) {
        this.optionIds.splice(index, 1);
      } else {
        this.optionIds.push(id);
      }
      this.data.optionId = this.optionIds.join(",");
    },
    addSingle() {
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 1,
        name: "",
        score: 0,
      });
      this.$set(this.data, "maxNum", newArr.length);
      if (+this.data.isRequire && newArr.length) {
        !this.data.minNum && this.$set(this.data, "minNum", 1);
      } else {
        !this.data.minNum && this.$set(this.data, "minNum", 0);
      }
      this.$set(this.data, "optionList", newArr);
    },
    addSingleInput() {
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 2,
        name: "",
        score: 0,
      });
      this.$set(this.data, "maxNum", newArr.length);
      if (+this.data.isRequire && this.data.optionList) {
        !+this.data.minNum && this.$set(this.data, "minNum", 1);
      } else {
        !+this.data.minNum && this.$set(this.data, "minNum", 0);
      }
      this.$set(this.data, "optionList", newArr);
    },
    handleDelete(index) {
      const newArr = this.data.optionList || [];
      newArr.splice(index, 1);
      this.$set(this.data, "optionList", newArr);
      this.$set(this.data, "maxNum", newArr.length);
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
  margin-top: -1px;
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
label.el-checkbox {
  margin-right: 30px;
}
.title .tips {
  font-size: 12px;
  color: $--color-primary;
}
</style>
