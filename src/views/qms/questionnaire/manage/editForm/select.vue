<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <!-- @click="changeTitle()" -->
      <h3 class="name">下拉题</h3>
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
              <el-input
                style="width:200px;border:none;text-align:center;margin-right: 30px;"
                size="mini"
                placeholder="请输入下拉选项（最多80个字）"
                v-model="item.name"
                :maxlength="80"
                @change="changeLogic(item)"
              />
              <span style="text-align:right">
                <i class="curP el-icon-remove-outline" @click="handleDelete(index)"></i>
              </span>
            </div>
          </draggable>
        </div>
      </div>
      <el-button class="gray" type="text" @click="addSingle">
        <i class="blue el-icon-circle-plus-outline"></i>添加单个选项
      </el-button>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(下拉题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <div style="width:300px">
          <el-select placeholder="请选择" v-model="data.answer.value">
            <el-option
              v-for="(item,index) in data.optionList"
              :disabled="disabled"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
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
    addSingle() {
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 1,
        name: "",
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
