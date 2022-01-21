<template>
  <div class="left-content-wrapper">
    <div class="left-content">
      <div class="item">
        <div class="title">选择题</div>
        <div v-for="item of selectData" :key="item.type">
          <el-popover placement="right" width="600" trigger="hover">
            <single-election
              v-if="item.type == '1'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></single-election>
            <multiple-election
              v-if="item.type == '2'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></multiple-election>
            <img-select
              v-if="item.type == '3'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></img-select>
            <multiple-img-select
              v-if="item.type == '4'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></multiple-img-select>
            <select-election
              v-if="item.type == '5'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></select-election>
            <el-button
              slot="reference"
              :class="`iconfont ${item.icon} v1`"
              style="width: 100%"
              @click="addSubject(item)"
            >{{item.name}}</el-button>
          </el-popover>
        </div>
      </div>
      <div class="item">
        <div class="title">填空题</div>
        <div v-for="item of inputData" :key="item.type">
          <el-popover placement="right" width="600" trigger="hover">
            <fill-blank
              v-if="item.type == '6'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></fill-blank>
            <multiple-fill-blank
              v-else-if="item.type == '7'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></multiple-fill-blank>
            <el-button
              slot="reference"
              :class="`iconfont ${item.icon} v1`"
              style="width: 100%"
              @click="addSubject(item)"
            >{{item.name}}</el-button>
          </el-popover>
        </div>
      </div>
      <div class="item">
        <div class="title">其他</div>
        <div v-for="item of otherData" :key="item.type">
          <el-popover placement="right" width="600" trigger="hover">
            <scoring hideForm v-if="item.type == '8'" :data="item.example" :type="'check'"></scoring>
            <file-upload
              v-if="item.type == '9'"
              :data="item.example"
              :type="'check'"
              :disabled="true"
            ></file-upload>
            <remarks v-if="item.type == '10'" :data="item.example" :type="'check'"></remarks>
            <el-button
              slot="reference"
              :class="`iconfont ${item.icon} v1`"
              style="width: 100%"
              @click="addSubject(item)"
            >{{item.name}}</el-button>
          </el-popover>
        </div>
      </div>
      <div class="title" style="text-align:center;">
        <el-button class="iep-btn-m database-btn" @click="openDialogTemplate">问卷库</el-button>
      </div>
    </div>
    <dialog-template ref="dialogTemplate" @choose="onChoose"></dialog-template>
  </div>
</template>
<script>
import { selectData, inputData, otherData } from "../../const/base";
import SingleElection from "../../../editForm/singleElection";
import MultipleElection from "../../../editForm/multipleElection";
import ImgSelect from "../../../editForm/imgSelect";
import MultipleImgSelect from "../../../editForm/multipleImgSelect";
import SelectElection from "../../../editForm/select";
import FillBlank from "../../../editForm/fillBlank";
import MultipleFillBlank from "../../../editForm/multipleFillBlank";
import Scoring from "../../../editForm/scoring";
import FileUpload from "../../../editForm/fileUpload";
import Remarks from "../../../editForm/remarks";
import DialogTemplate from "../../template/index";
export default {
  components: {
    SingleElection,
    MultipleElection,
    ImgSelect,
    MultipleImgSelect,
    SelectElection,
    FillBlank,
    MultipleFillBlank,
    FileUpload,
    Scoring,
    Remarks,
    DialogTemplate,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectData,
      inputData,
      otherData,
    };
  },
  methods: {
    openDialogTemplate() {
      this.$refs.dialogTemplate.open();
    },
    //添加题目
    addSubject(item) {
      // this.data.splice(-1, 0, JSON.parse(JSON.stringify(item)));
      this.data.push(JSON.parse(JSON.stringify(item)));
      this.$emit("scrollToBottom");
    },
    onChoose(row) {
      this.$emit("choose", row);
    },
  },
};
</script>
<style lang="scss" scoped>
.left-content-wrapper {
  padding: 0 20px;
  width: 100%;
  border: 1px solid $--border-color;
  text-align: center;
  box-sizing: border-box;
  .title {
    font-size: 16px;
    color: #303031;
    padding: 20px 0 10px;
    font-family: Microsoft YaHei;
    text-align: left;
    // border-bottom: 1px solid $--border-color;
    ::v-deep .el-button {
      padding: 0;
      width: 100%;
      border-radius: 10px;
    }
  }
  // .item {
  // border-bottom: 1px solid $--border-color;
  // }
}
.left-content-wrapper ::v-deep .el-button {
  height: 36px;
  line-height: 14px;
  border: 0;
}
.left-content-wrapper ::v-deep .database-btn {
  margin: 20px 0;
  border: 1px solid $--border-color;
  color: $--color-primary;
  &:hover {
    color: #fff;
    background-color: $--color-primary;
    border-color: $--color-primary;
  }
}
</style>