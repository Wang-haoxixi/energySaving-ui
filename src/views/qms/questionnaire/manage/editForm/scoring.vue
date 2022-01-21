<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <!-- @click="changeTitle()" -->
      <h3 class="name">打分题</h3>
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
                style="width:200px;border:none;text-align:center;margin-right:30px"
                size="mini"
                placeholder="请输入选项（最多80个字）"
                v-model="item.name"
                :maxlength="80"
              ></el-input>
              <span style="text-align:right">
                <i class="curP el-icon-remove-outline" @click="handleDelete(index)"></i>
              </span>
              <div class="mg10">
                <!-- <el-rate :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>-->
              </div>
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
        <h3 style="margin:8px 0" :id="'a'+data.orderNumber" :name="'a'+data.orderNumber">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(打分题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <div v-for="(item,index) in data.optionList" :key="index">
          {{item.name}}
          <div class="mg10">
            <el-rate v-model="data.answer[item.name]" :colors="colors" :disabled="disabled"></el-rate>
          </div>
        </div>
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
      optionList: [],
      titleType: 1,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  methods: {
    addSingle() {
      const newArr = this.data.optionList || [];
      newArr.push({
        type: 1,
        name: "",
      });
      this.$set(this.data, "optionList", newArr);
    },
    handleDelete(index) {
      const newArr = this.data.optionList || [];
      newArr.splice(index, 1);
      this.$set(this.data, "optionList", newArr);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css/style.scss";
.gray {
  color: #606266;
  font-size: 15px;
}
</style>
