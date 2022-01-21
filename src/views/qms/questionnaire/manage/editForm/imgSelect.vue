<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <!-- @click="changeTitle()" -->
      <h3 class="name">图片单选题</h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="150" placeholder="最多输入150个字"></el-input>
        </div>
      </div>
      <div class="ti">
        <div class="ti1">选项：</div>
        <div class="ti2">
          <div class="imgs">
            <div class="img" v-for="(file,index) in data.optionList" :key="index">
              <iep-img :src="file.url" :previewSrcList="[file.url]" />
              <el-input
                style="margin-top:15px;width:130px;border:none;text-align:center"
                size="mini"
                placeholder="描述（最多80个字）"
                v-model="file.description"
                :maxlength="80"
                @change="changeLogic(file)"
              ></el-input>
              <i class="delete el-icon-delete" @click="handleDelete(index)"></i>
            </div>
            <div class="img">
              <el-upload
                class="upload-demo"
                action="/api/admin/file/sftp/upload"
                :on-remove="handleRemove"
                :headers="myHeaders"
                :file-list="data.optionList"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeImgUpload"
                :show-file-list="false"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(图片单选题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <el-radio-group v-model="data.answer.value" :disabled="disabled">
          <div class="imgDiv" v-for="(item,index) in data.optionList" :key="index">
            <el-radio :label="item.description">
              <p :title="item.description">{{optionLetters[index]}}、{{item.description}}</p>
              <div class="img">
                <iep-img :src="item.url " :previewSrcList="[item.url ]" />
              </div>
            </el-radio>
          </div>
        </el-radio-group>
      </div>
    </template>
  </div>
</template>


<script>
import baseMixin from "./mixin/base";
import uploadMixin from "./mixin/upload";
import { randomLenNum } from "@/util/util";

export default {
  mixins: [baseMixin, uploadMixin],
  data() {
    return {
      titleType: 1,
      optionStr: "",
    };
  },
  watch: {
    "data.isShow": {
      immediate: true,
      async handler() {
        const arr = [];
        for (const item of this.data.optionList) {
          const obj = { ...item };
          arr.push(obj);
        }
        this.data.optionList = arr;
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
      const logicArr = this.data.logic.logic;
      if (logicArr) {
        logicArr.forEach(item => {
          if (item.id === value.randomStr) {
            item.source = value.description;
          }
        });
      }
    },
    async handleSuccessTitle(response) {
      // 未用参数file, fileList
      const data = response.data;
      this.$set(this.data, "title", data.url);
      this.data.isPicTitle = 1;
    },
    async handleSuccess(response) {
      // 未用参数file, fileList
      const data = response.data;
      const newfile = {
        description: data.description,
        url: data.url,
        name: data.original,
        type: 1,
        fileName: data.fileName,
        randomStr: randomLenNum(4, true),
      };
      this.data.optionList.push(newfile);
    },
    handleDelete(index) {
      const fileList = [...this.data.optionList];
      const newArr2 = this.data.logic.logic;
      if (newArr2) {
        const id = fileList[index].randomStr;
        const index2 = newArr2.findIndex(item => {
          return item.id === id;
        });
        if (index2 > -1) {
          newArr2.splice(index2, 1);
          this.$set(this.data.logic, "logic", newArr2);
        }
      }
      fileList.splice(index, 1);
      this.$set(this.data, "optionList", fileList);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css/style.scss";
.delete {
  vertical-align: -2px;
  margin-left: 3px;
  cursor: pointer;
}
.mh100 {
  min-height: 100px;
  line-height: 57px;
}
.imgDiv {
  margin-right: 15px;
  margin-bottom: 20px;
  width: 150px;
  height: 200px;
  float: left;
  position: relative;
  p {
    position: absolute;
    top: 157px;
    width: 150px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    width: 150px;
    height: 150px;
    border: 1px solid $--border-color;
  }
  img {
    width: 150px;
  }
  .se {
    width: 150px;
    text-align: center;
  }
  ::v-deep .el-radio__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
  ::v-deep .el-checkbox__label {
    padding-left: 0;
  }
  ::v-deep .el-checkbox__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
}

.imgs {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .img {
    margin-right: 30px;
    width: 150px;
    height: 200px;
    padding-top: 15px;
    .el-image {
      max-height: 150px;
      border: 1px solid $--border-color;
    }
  }
}
.imgs {
  padding-right: 10px;
}
</style>
