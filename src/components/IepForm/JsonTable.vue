<template>
  <div>
    <el-table class="table" :data="data" style="width: 100%" border>
      <el-table-column
        :label="item.label"
        :width="item.width"
        v-for="(item, idx) in columns"
        :key="idx"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <iep-date-picker
              v-if="item.type === 'date'"
              :type="_dateType(item.dateType)"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
              value-format="yyyy-MM-dd"
            ></iep-date-picker>
            <iep-date-range-select
              v-else-if="item.type === 'daterange'"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
            ></iep-date-range-select>
            <iep-upload-select
              v-else-if="item.type === 'file'"
              size="mini"
              v-model="scope.row[item.prop]"
            ></iep-upload-select>
            <iep-dict-select
              v-else-if="item.type === 'dict'"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
              :dict-name="item.dictName"
            ></iep-dict-select>
            <iep-input-area
              v-else-if="item.type === 'area'"
              :maxlength="1000"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
              :autosize="{minRows: 1}"
            ></iep-input-area>
            <iep-select
              v-else-if="item.type === 'list'"
              size="mini"
              :prefixUrl="item.prefixUrl"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
            ></iep-select>
            <el-upload
              v-else-if="item.type === 'avatar'"
              class="avatar-uploader"
              action="/api/admin/file/upload/avatar"
              :show-file-list="false"
              :headers="headers"
              :on-success="(response, file, fileList)=>{return handleAvatarSuccess(response, file, fileList,scope.$index)}"
              accept="image/*"
            >
              <iep-img v-if="scope.row[item.prop]" :src="scope.row[item.prop]" class="avatar"></iep-img>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              v-else
              :maxlength="100"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
              clearable
            ></el-input>
          </template>
          <template v-else>
            <iep-dict-detail
              v-if="item.type === 'dict'"
              size="mini"
              :value="scope.row[item.prop]"
              :dict-name="item.dictName"
            ></iep-dict-detail>
            <iep-date-range-select
              v-else-if="item.type === 'daterange'"
              size="mini"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
              disabled
            ></iep-date-range-select>
            <iep-upload-select
              v-else-if="item.type === 'file'"
              size="mini"
              :value="scope.row[item.prop]"
              disabled
            ></iep-upload-select>
            <iep-div-detail v-else-if="item.type === 'date'" :value="_parseToDate(scope,item)"></iep-div-detail>
            <iep-select
              v-else-if="item.type === 'list'"
              size="mini"
              disabled
              :prefixUrl="item.prefixUrl"
              v-model="scope.row[item.prop]"
              :placeholder="item.label"
            ></iep-select>
            <iep-img v-else-if="item.type === 'avatar'" :src="scope.row[item.prop]" class="avatar"></iep-img>
            <iep-div-detail v-else :value="scope.row[item.prop]"></iep-div-detail>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
              <el-button type="text" @click="saveRow(scope.row.id)">保存</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm title="是否要删除此数据？" @onConfirm="remove(scope.row.id)">
                <el-button slot="reference" type="text" size="mini">删除</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <el-button type="text" @click="saveRow(scope.row.id)">更新</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="cancel(scope.row.id)">取消</el-button>
            </span>
          </template>
          <span v-else>
            <el-button
              v-if="!(onlyLastCanEdit && columns.length-1 === idx)"
              type="text"
              @click="toggle(scope.row.id)"
            >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="是否要删除此数据？" @onConfirm="remove(scope.row.id)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <iep-button
      v-if="isShowNewBtn"
      style="width: 100%; margin-top: 5px; margin-bottom: 8px"
      icon="el-icon-plus"
      @click="newMember"
      plain
    >新增</iep-button>
  </div>
</template>
<script>
import store from "@/store";
import { parseToDay, parseToMonth, parseToYear } from "../../filters";
export default {
  name: "IepJsonTable",
  props: {
    value: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    onlyLastCanEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: [],
      headers: {
        Authorization: "Bearer " + store.getters.accessToken,
      },
    };
  },
  computed: {
    isShowNewBtn() {
      // const isLast = !this.onlyLastCanEdit; //false
      return !this.data.map(m => m.editable).includes(true);
    },
  },
  created() {
    this.initData();
  },
  methods: {
    _parseToDate(scope, item) {
      const parseMap = {
        week: parseToDay,
        month: parseToMonth,
        year: parseToYear,
      };
      return parseMap[item.dateType](scope.row[item.prop]);
    },
    _dateType(dateType) {
      return dateType ?? "date";
    },
    _emitData() {
      this.$emit("input", this.data);
    },
    initData() {
      this.data = this.value.map(m => {
        return {
          ...m,
          editable: false,
          isNew: false,
        };
      });
    },
    newMember() {
      const length = this.data.length;
      const newObj = {};
      this.columns.forEach(m => {
        newObj[m.prop] = "";
      });
      this.data.push({
        id: length ? (parseInt(this.data[length - 1].id) + 1).toString() : "0",
        ...newObj,
        editable: true,
        isNew: true,
      });
    },
    saveRow(id) {
      const target = this.data.filter(item => item.id === id)[0];
      target.editable = false;
      target.isNew = false;
      this._emitData();
    },
    remove(id) {
      const newData = this.data.filter(item => item.id !== id);
      this.data = newData;
      this._emitData();
    },
    cancel(id) {
      const target = this.data.filter(item => item.id === id)[0];
      target.editable = false;
    },
    toggle(id) {
      const target = this.data.filter(item => item.id === id)[0];
      target.editable = !target.editable;
    },
    handleAvatarSuccess(response, file, fileList, val) {
      this.data[val].annex = response.data.url;
    },
  },
  watch: {
    value() {
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.table ::v-deep .el-button {
  margin-right: 0;
}
</style>
