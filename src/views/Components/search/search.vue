<template>
  <!-- labelWidth 传入一个label宽度 保证框对齐 -->
  <el-form
    :inline="true"
    class="searchForm"
    :model="newListQuery"
    size="small"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <div :class="isSearch ? 'search-conten-block' : 'search-conten-inline'">
      <template v-for="(item, index) in formProps">
        <el-form-item
          :label="item.label ? `${item.label}:` : ''"
          v-if="item.show == null ? true : item.show"
          :key="item.prop"
          :label-width="item.labelWidth"
          v-show="index >= maxShow ? isSearch : true"
        >
          <template v-if="item.type === 'select'">
            <el-select
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change ? item.change : ()=>{}"
              :filterable="filterable == null ? true : filterable"
              v-model="newListQuery[item.prop]"
              clearable
              :multiple="item.multiple"
              :placeholder="item.placeholder ? item.placeholder : `请选择${item.label}`"
            >
              <el-option
                v-for="data in item.dicData"
                :key="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
                :label="hasDefaultProps(item.props) ? data[item.props.label] : data.label"
                :value="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
              ></el-option>
            </el-select>
          </template>
          <!-- // 远程搜索的 -->
          <template v-if="item.type === 'selectRemote'">
            <el-select
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change ? item.change : ()=>{}"
              v-model="newListQuery[item.prop]"
              filterable
              remote
              clearable
              reserve-keyword
              :remote-method="(query)=>{
                          if(query.length>50){
                            $message({
                              type: 'warning',
                              message: '关键词搜索不能超过50个字符！'
                            })
                          }else{
                            item.remoteMethod(query)
                          }
                        }"
              :placeholder="item.placeholder ? item.placeholder : `请选择${item.label}`"
            >
              <el-option
                v-for="data in item.dicData"
                :key="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
                :label="hasDefaultProps(item.props) ? data[item.props.label] : data.label"
                :value="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
              ></el-option>
            </el-select>
          </template>
          <template v-if="item.type === 'dept'">
            <el-select
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change ? item.change : (val)=>{}"
              v-model="newListQuery[item.prop]"
              clearable
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="item.placeholder ? item.placeholder : `请选择${item.label}`"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template v-if="item.type === 'system'">
            <el-select
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change ? item.change : ()=>{}"
              v-model="newListQuery[item.prop]"
              clearable
              filterable
              remote
              :remote-method="sysRemoteMethod"
              :loading="sysLoading"
              :placeholder="item.placeholder ? item.placeholder : `请选择${item.label}`"
            >
              <el-option
                v-for="item in sysOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              clearable
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change ? item.change : ()=>{}"
              :props="mergeProps(item.props)"
              :options="item.dicData"
              :filterable="item.filterable"
              v-model="newListQuery[item.prop]"
            ></el-cascader>
          </template>
          <template v-else-if="item.type === 'number'">
            <el-input
              v-model="newListQuery[item.prop]"
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              :placeholder="item.placeholder ? item.placeholder : `请输入${item.label}`"
              type="number"
            ></el-input>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="newListQuery[item.prop]" clearable>
              <el-radio
                :label="data.value"
                v-for="data in item.dicData"
                :key="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
              >{{hasDefaultProps(item.props) ? data[item.props.label] : data.label}}</el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              default-value
              style="width: 200px !important;"
              v-model="newListQuery[item.prop]"
              type="date"
              :value-format="item.valueFormat ? item.valueFormat : 'timestamp'"
              placeholder="选择日期"
            ></el-date-picker>
          </template>
          <template v-else-if="item.type === 'year'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              style="width: 200px !important;"
              v-model="newListQuery[item.prop]"
              type="year"
              value-format="yyyy"
              placeholder="选择年度"
            ></el-date-picker>
          </template>
          <template v-else-if="item.type === 'daterange'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              v-model="newListQuery[item.prop]"
              :type="item.range ? item.range : 'daterange'"
              :value-format="item.valueFormat ? item.valueFormat : 'timestamp'"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </template>
          <template v-else-if="item.type === 'input' || !item.type">
            <el-input
              :style="{width: item.width ? item.width : 'auto'}"
              :placeholder="item.placeholder ? item.placeholder : `请输入${item.label}`"
              v-model.trim="newListQuery[item.prop]"
              :maxlength="item.maxlength ? item.maxlength : 100"
              clearable
            ></el-input>
          </template>
        </el-form-item>
      </template>
      <slot></slot>
    </div>
    <div :class="isSearch ? 'search-button-block' : 'search-button-inline'">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button type="default" icon="el-icon-delete" @click="handleReset" v-if="reset">清空</el-button>
        <slot name="button-groups"></slot>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="formProps.length > maxShow"
          @click="toggleSearch"
          type="text"
          :icon="isSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        >{{isSearch ? '收起' : '展开'}}</el-button>
      </el-form-item>
    </div>
    <!-- <br>
    listQuery:{{listQuery}}
    <br>
    newListQuery:{{newListQuery}}-->
  </el-form>
</template>

<script>
import {
  isArray,
  isBoolean,
  isNumber,
  isPlainObject,
  isString,
  mergeWith,
  cloneDeep,
} from "lodash";
// import { getDeptQuery, getDeptById, getNoRightListByName } from '@/api/admin/dept';
// import { getSurveyId, getDetail } from '@/api/dataShare/assetSys/sysCensus/systemRegister';
export default {
  name: "IepOdsSearch",
  data() {
    return {
      isSearch: false,
      deptOptions: [],
      sysOptions: [],
      props: {
        value: "value",
        label: "label",
        children: "children",
        disabled: "disabled",
      },
      loading: false,
      sysLoading: false,
      newListQuery: this.listQuery,
    };
  },
  props: {
    // 不按权限查询
    noPower: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: true,
    },
    cityId: {
      type: [Number, String],
      default: null,
    },
    deptId: {
      type: [Number, String],
      default: "",
    },
    //  <!-- labelWidth 传入一个label宽度 保证框对齐 -->
    labelWidth: {
      type: String,
      default: "",
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    // 是否为radio/select/cascader添加全部
    addAll: {
      type: Boolean,
      default: true,
    },
    // 最多显示几个
    maxShow: {
      type: Number,
      default: 8,
    },
    // label位置
    labelPosition: {
      type: String,
      default: "left",
    },
    // 搜索参数
    listQuery: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * 数据格式
     * 如：
     * [
     *   {
     *     prop: 'name',
     *     label: '姓名',
     *     placeholder: '请输入',
     *     multiply: true, select专用
     *     type: 'select/input/radio/cascader',
     *     data: data select/radio/cascader的数据
     *   }
     * ]
     */
    formProps: {
      type: Array,
      default() {
        return [];
      },
    },
    resetIgnore: {
      type: Array,
      default: () => {
        return ["limit", "page"];
      },
    },
    isString: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    listQuery: {
      handler(newVal) {
        if (isPlainObject(newVal) && Object.keys(newVal).length > 0) {
          const newListQuery = this.newListQuery;
          for (const key in newVal) {
            if (newVal[key] != null || newVal === "") {
              if (newVal[key] !== newListQuery[key]) {
                newListQuery[key] = newVal[key];
              }
            }
          }
        }
      },
      deep: true,
    },
  },
  created() {
    this.getDept();
  },
  methods: {
    remoteMethod(query) {
      if (query.length > 50) {
        this.$message({
          type: "warning",
          message: "关键词搜索不能超过50个字符！",
        });
        return;
      }
      if (query !== "") {
        this.loading = true;
        // if(this.noPower){
        //   getNoRightListByName({ deptName: query, cityId: this.cityId }).then(({ data }) => {
        //     this.loading = false;
        //     this.deptOptions = data.data;
        //   }).catch(() => {
        //     this.loading = false;
        //   });
        // } else {
        //   getDeptQuery({ deptName: query, cityId: this.cityId }).then(({ data }) => {
        //     this.loading = false;
        //     this.deptOptions = data.data;
        //   }).catch(() => {
        //     this.loading = false;
        //   });
        // }
      } else {
        this.deptOptions = [];
      }
    },
    getDept() {
      // for (let i = 0; i < this.formProps.length; i++) {
      //   const element = this.formProps[i];
      //   // if (element.type == 'dept' && this.newListQuery[element.prop] > 0) {
      //   //   getDeptById(this.newListQuery[element.prop]).then(({ data }) => {
      //   //     if (data.code == 0) {
      //   //       this.deptOptions = [{
      //   //         value: data.data.id,
      //   //         label: data.data.deptName,
      //   //         code: data.data.creditCode,
      //   //       }];
      //   //     }
      //   //   });
      //   //   break;
      //   // }
      // }
    },
    clearDept() {
      this.deptOptions = [];
    },
    sysRemoteMethod(query) {
      if (query !== "") {
        this.sysLoading = true;
        // getSurveyId({ name: query, deptId: this.deptId }).then(({ data }) => {
        //   this.sysLoading = false;
        //   this.sysOptions = data.data;
        // }).catch(() => {
        //   this.sysLoading = false;
        // });
      } else {
        this.sysOptions = [];
      }
    },
    getSys() {
      for (let i = 0; i < this.formProps.length; i++) {
        const element = this.formProps[i];
        if (element.type == "system" && this.newListQuery[element.prop] > 0) {
          // getDetail(this.newListQuery[element.prop]).then(({ data }) => {
          //   if (data.code == 0) {
          //     this.sysOptions = [{
          //       value: data.data.id,
          //       label: data.data.sysDsgt,
          //       code: data.data.code,
          //     }];
          //   }
          // });
          break;
        }
      }
    },
    mergeProps(props) {
      return mergeWith(this.props, props);
    },
    hasDefaultProps(props) {
      return props && Object.keys(props).length > 0;
    },
    // 展开切换
    toggleSearch() {
      this.isSearch = !this.isSearch;
    },
    // 搜索
    handleFilter() {
      for (const key in this.newListQuery) {
        this.$set(this.listQuery, key, this.newListQuery[key]);
      }
      this.$emit("handleFilter", this.newListQuery);
    },
    // 重置
    handleReset() {
      this.newListQuery = this.resetFormData(this.newListQuery);
      this.$emit("handleReset");
    },
    // 数据重置
    resetFormData(
      data = {},
      string = this.isString,
      ignore = this.resetIgnore,
    ) {
      const resultData = cloneDeep(data);
      for (const key in resultData) {
        if (ignore.indexOf(key) > -1) {
          continue;
        }
        const value = data[key];
        let result = string ? "" : undefined;
        if (isBoolean(value) || isNumber(value) || isString(value)) {
          result = string ? "" : undefined;
        } else if (isArray(value)) {
          result = [];
        } else if (isPlainObject(value)) {
          result = {};
        } else {
          result = string ? "" : undefined;
        }
        this.$set(resultData, key, result);
      }
      return resultData;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-conten-inline,
.search-button-inline {
  display: inline;
}
.search-conten-block,
.search-button-block {
  display: block;
}
.search-button-block {
  text-align: right;
  margin-top: 10px;
}
.searchForm {
  margin: 10px;
}
.searchForm {
  ::v-deep .el-input .el-input__icon {
    line-height: 32px !important;
  }
  ::v-deep .el-form-item__content .el-button {
    height: auto;
  }
}
</style>
