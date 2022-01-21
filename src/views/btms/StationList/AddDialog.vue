<template>
  <iep-dialog title="描述标签" :dialog-show="dialogShow" width="500" @close="close()">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <iep-form-item label-name="标签分类">
        <el-input type="text" v-model="form.centralWordName" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="描述标签" prop="satelliteWord">
        <el-tag
          v-for="tag in form.satelliteWord"
          :key="tag.id"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          style="margin-right:10px;margin-bottom:4px;"
        >{{tag.name}}</el-tag>
      </iep-form-item>
      <el-row :gutter="20">
        <el-col :span="22" :offset="2">
          <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchData(searchValue)"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="word-list">
        <span
          v-for="(item,index) in SatelliteWordList"
          :key="index"
          :class="form.satelliteWord.map(m=>m.id).includes(item.commonId)?'active':''"
          @click="changeWord(item)"
        >{{item.commonName}}</span>
        <div style="text-align: center;margin: 20px 0;">
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
      <iep-button type="primary">保 存</iep-button>
      <iep-button @click="close()">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
const rules = {
  centralWord: [{ required: true, message: "请输入中心词", trigger: "blur" }],
  satelliteWord: [{ required: true, message: "请选择卫星词", trigger: "blur" }],
};
export default {
  data() {
    return {
      dialogShow: false,
      form: {
        centralWord: "",
        centralWordName: "",
        satelliteWord: [],
      },
      rules,
      SatelliteWordList: [
        { commonId: 1, commonName: "11" },
        { commonId: 2, commonName: "22" },
      ],
      params: {
        current: 1,
        size: 30,
        total: 0,
      },
      AddOption: [],
      formRequestFn: () => {},
      editSatelliteWord: [],
      searchValue: "",
    };
  },
  created() {},
  methods: {
    // loadPage (val) {
    //   this.loading = true
    //   getResultFreePage(Object.assign({}, this.paramForm, this.params, { name: val })).then(({ data }) => {
    //     this.SatelliteWordList = data.data.records

    //     this.params.total = data.data.total
    //     this.loading = false
    //   })
    // },
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
  margin-left: 54px;
  > span {
    border: 1px solid $--border-color;
    border-radius: 5px;
    display: inline-block;
    margin: 10px 5px;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
  }

  .active {
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
</style>
