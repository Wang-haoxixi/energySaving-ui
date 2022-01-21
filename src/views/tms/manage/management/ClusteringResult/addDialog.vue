<template>
  <iep-dialog :title="`${methodName}中心词`" :dialog-show="dialogShow" width="500" @close="close()">
    <el-form ref="form" :model="form" :rules="rules" label-width="75px">
      <iep-form-item label-name="中心词" prop="centralWord">
        <tms-select
          v-if="methodName=='新增'"
          v-model="form.centralWord"
          :satelliteWordName="form.centralWordName"
        ></tms-select>
        <el-input v-else type="text" v-model="form.centralWordName" disabled></el-input>
      </iep-form-item>
      <iep-form-item class="tags-box" label-name="卫星词" prop="satelliteWord">
        <el-tag
          v-for="tag in form.satelliteWord"
          :key="tag.id"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          style="margin-right:10px;margin-bottom:4px;"
        >{{tag.name}}</el-tag>
        <!-- <tms-tag-select v-model="form.satelliteWord" :value="editSatelliteWord"></tms-tag-select>-->

        <!-- <tms-select v-model="form.satelliteWord" :AddOption="AddOption"  @relation-change="handleSatelliteWordChange"></tms-select> -->
      </iep-form-item>

      <div class="search">
        <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchData(searchValue)"></el-button>
        </el-input>
      </div>
      <div class="word-list">
        <span
          v-for="(item,index) in SatelliteWordList"
          :key="index"
          :class="form.satelliteWord.map(m=>m.id).includes(item.commonId)?'active':''"
          @click="changeWord(item)"
        >{{item.commonName}}</span>
        <div style="text-align: right;margin: 20px 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="params.total"
            :page-size="params.size"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import TmsSelect from "@/views/tms/components/Select/TmsSelect.vue";
// import TmsTagSelect from '@/views/tms/Components/TmsTagSelect.vue'
import { getResultFreePage } from "@/api/tms/management";
const rules = {
  centralWord: [{ required: true, message: "请输入中心词", trigger: "blur" }],
  satelliteWord: [{ required: true, message: "请选择卫星词", trigger: "blur" }],
};
export default {
  components: { TmsSelect },
  data() {
    return {
      dialogShow: false,
      form: {
        centralWord: "",
        centralWordName: "",
        satelliteWord: [],
      },
      rules,
      SatelliteWordList: [],
      params: {
        current: 1,
        size: 30,
        total: 0,
      },
      AddOption: [],
      methodName: "新增",
      formRequestFn: () => {},
      editSatelliteWord: [],
      searchValue: "",
    };
  },
  created() {},
  methods: {
    loadPage(val) {
      this.loading = true;
      getResultFreePage(
        Object.assign({}, this.paramForm, this.params, { name: val }),
      ).then(res => {
        this.SatelliteWordList = res.data.records;

        this.params.total = res.data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage(this.searchValue);
    },
    changeWord(item) {
      if (this.form.satelliteWord.map(m => m.id).includes(item.commonId)) {
        const wordIndex = this.form.satelliteWord
          .map(m => m.id)
          .indexOf(item.commonId);
        this.form.satelliteWord.splice(wordIndex, 1);
      } else {
        this.form.satelliteWord.push({
          id: item.commonId,
          name: item.commonName,
        });
      }
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.satelliteWord = this.form.satelliteWord.map(m => m.id);
          this.formRequestFn(
            this.form.centralWord,
            this.form.satelliteWord,
          ).then(res => {
            if (res.data === true) {
              this.$message({
                type: "success",
                message: `${this.methodName}成功!`,
              });
              this.close();
            } else {
              this.$message({
                type: "info",
                message: `${this.methodName}失败,${res.data.msg}`,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.form = {
        centralWord: "",
        centralWordName: "",
        satelliteWord: [],
      };
      this.dialogShow = false;
      this.$emit("load-page");
    },
    handleClose(tag) {
      this.form.satelliteWord.splice(
        this.form.satelliteWord.findIndex(item => item.id === tag.id),
        1,
      );
    },
    searchData(val) {
      (this.params = {
        current: 1,
        size: 30,
        total: 0,
      }),
        this.loadPage(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.word-list {
  margin: 10px 5px;
  > span {
    border: 1px solid $--border-color;
    border-radius: 5px;
    display: inline-block;
    margin: 5px;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    .active,
    &:hover {
      border: 1px solid $--color-primary;
      position: relative;
      &::before {
        content: "✓";
        z-index: 2;
        font-size: 8px;
        color: #fff;
        position: absolute;
        right: -1px;
        bottom: -8px;
      }
      &::after {
        content: " ";
        position: absolute;
        right: -2px;
        color: #fff;
        bottom: -8px;
        font-size: 0;
        border-width: 12px;
        border-color: $--second-color-primary;
        border-left-width: 0;
        border-style: dashed;
        transform: rotate(225deg);
        border-top-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
}
.search {
  position: relative;
  margin-left: 10px;
  ::v-deep .el-input__inner {
    padding: 0 35px 0 10px;
    width: 100%;
    border-radius: 10px;
  }
}
.search ::v-deep .el-input-group__append {
  position: absolute;
  top: 1px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 18px;
  height: 34px;
  text-align: center;
  border-radius: 0 10px 10px 0;
  background: none;
  cursor: pointer;
  .el-button {
    padding: 0;
    font-size: 18px;
    background: none;
    border: 0;
    color: $--color-text-secondary;
    box-sizing: border-box;
  }
  &:hover {
    opacity: 0.8;
  }
}
.tags-box ::v-deep .el-form-item__content {
  margin-top: 5px;
}
</style>
