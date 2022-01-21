<template>
  <el-collapse-item title="ShowWrap" name="9">
    <div class="component-box">
      <IepShowWrap ref="IepShowWrap" title="工作经历" v-model="jsonTable" :initDto="initDto">
        <!-- 单个展示插槽模板 -->
        <template #item="{scope}">
          <div class="primary-info">
            <div class="info-text">
              <h4 class="name">{{scope.company}}</h4>
              <span class="gray period">{{scope.starTime}}-{{scope.endTime}}</span>
            </div>
            <h4>
              <span class="prev-line">{{scope.department | showText}}</span>
              <span class="prev-line">{{scope.jobs | showText}}</span>
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
            class="iep-form-detail"
            ref="form"
            :model="scope"
            label-width="120px"
            label-position="top"
          >
            <iep-form-item class="form-half iep-form-half-padding" label-name="公司名称">
              <el-input v-model="scope.company" placeholder="请输入公司名称"></el-input>
            </iep-form-item>
            <iep-form-item class="form-half iep-form-half-padding" label-name="职位名称">
              <el-input v-model="scope.jobs" placeholder="请输入职位名称"></el-input>
            </iep-form-item>
            <iep-form-item class="form-half iep-form-half-padding" label-name="部门名称">
              <el-input v-model="scope.department" placeholder="请输入部门名称"></el-input>
            </iep-form-item>
            <iep-form-item class="form-half iep-form-half-padding" label-name="开始时间">
              <el-date-picker
                v-model="scope.starTime"
                type="month"
                placeholder="选择月"
                :picker-options="startPickerOptions"
                value-format="yyyy-MM"
              ></el-date-picker>
            </iep-form-item>
            <iep-form-item class="form-half iep-form-half-padding" label-name="结束时间">
              <el-date-picker
                v-model="scope.endTime"
                type="month"
                placeholder="选择月"
                :picker-options="endPickerOptions"
                value-format="yyyy-MM"
              ></el-date-picker>
            </iep-form-item>
            <iep-form-item class="iep-form-half-padding" label-name="工作内容">
              <iep-input-area v-model="scope.describe" placeholder="请输入工作内容"></iep-input-area>
            </iep-form-item>
            <el-form-item class="iep-form-half-padding" style="text-align: right;">
              <el-button @click="$refs['IepShowWrap'].showForm=false">取消</el-button>
              <el-button type="primary" @click="$refs['IepShowWrap'].save()">保存</el-button>
            </el-form-item>
          </el-form>
        </template>
      </IepShowWrap>
    </div>
  </el-collapse-item>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { startPickerOptions, endPickerOptions } from "@/util/date";
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      startPickerOptions,
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
    initDto() {
      return {
        id: uuidv4(),
        company: "",
        department: "",
        jobs: "",
        starTime: "",
        endTime: "",
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
      max-width: 250px;
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
      word-break: break-all;
      float: left;
      line-height: 34px;
      color: #414a60;
      & + .period {
        font-size: 12px;
        padding-left: 15px;
        float: left;
        position: relative;
        top: 2px;
        line-height: 30px;
        &.gray {
          color: #9fa3b0;
        }
      }
    }
  }
}
</style>
