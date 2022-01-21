<template>
  <IepShowWrap
    ref="IepShowWrap"
    title="工作经历"
    v-model="jsonTable"
    :initDto="initDto"
    :traslateForm="traslateForm"
    :reverseForm="reverseForm"
  >
    <!-- 单个展示插槽模板 -->
    <template #item="{scope}">
      <div class="primary-info">
        <div class="info-text">
          <h4 class="name" title="公司名称">{{scope.company}}</h4>
          <span class="gray period">{{scope.starTime}}-{{scope.endTime}}</span>
        </div>
        <h4>
          <span class="prev-line" title="部门">{{scope.department | showText}}</span>
          <span class="prev-line" title="职位">{{scope.position | lastPosition | showText}}</span>
        </h4>
        <div class="info-text">
          <span class="text-type">内容：</span>
          <span>{{scope.describe}}</span>
        </div>
      </div>
    </template>
    <!-- 单个新增与编辑 -->
    <template #form="{scope}">
      <el-form
        class="iep-form-detail iep-flow-root"
        ref="form"
        :model="scope"
        label-width="120px"
        label-position="top"
      >
        <iep-form-item class="form-half iep-form-half-padding" label-name="公司">
          <el-input v-model="scope.company" placeholder="请输入公司" :maxlength="20"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half iep-form-half-padding" label-name="职位">
          <IepCascaderPosition v-model="scope.position"></IepCascaderPosition>
        </iep-form-item>
        <iep-form-item class="form-half iep-form-half-padding" label-name="部门">
          <el-input v-model="scope.department" placeholder="请输入部门" :maxlength="20"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half iep-form-half-padding" label-name="在职时间">
          <el-date-picker
            v-model="scope.rangeTime"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM"
            :picker-options="endPickerOptions"
            :editable="false"
          ></el-date-picker>
        </iep-form-item>
        <iep-form-item class="iep-form-half-padding" label-name="工作描述">
          <iep-input-area
            v-model="scope.describe"
            placeholder="请输入工作描述"
            :maxlength="300"
            show-word-limit
          ></iep-input-area>
        </iep-form-item>
        <div></div>
        <el-form-item class="iep-form-half-padding iep-flow-root-right" style="margin-top:10px;">
          <el-button
            class="iep-btn-l"
            type="primary"
            plain
            @click="$refs['IepShowWrap'].showForm=false"
          >取消</el-button>
          <el-button class="iep-btn-l" type="primary" @click="$refs['IepShowWrap'].save()">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </IepShowWrap>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { endPickerOptions } from "@/util/date";
import { reverseForm, traslateForm } from "./options";
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      endPickerOptions,
    };
  },
  computed: {
    jsonTable: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    reverseForm,
    traslateForm,
    initDto() {
      return {
        id: uuidv4(),
        company: "",
        department: "",
        position: "",
        starTime: "",
        endTime: "",
        rangeTime: [],
        describe: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.primary-info {
  h4 {
    font-size: 14px;
    padding: 0;
    margin: 0;
    .prev-line {
      max-width: 300px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 34px;
      &:last-child::before {
        margin: 0 15px;
        width: 1px;
        height: 12px;
        background-color: #e0e0e0;
        content: "";
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .info-text {
    padding: 0;
    color: #61687c;
    white-space: pre-wrap;
    overflow: hidden;
    word-break: break-all;
    .text-type {
      font-weight: 700;
    }
    h4.name {
      max-width: 420px;
      line-height: 34px;
      word-break: break-all;
      float: left;
      color: #414a60;
      & + .period {
        font-size: 12px;
        padding-left: 15px;
        float: left;
        line-height: 30px;
        position: relative;
        top: 2px;
        &.gray {
          color: #9fa3b0;
        }
      }
    }
  }
}
</style>
