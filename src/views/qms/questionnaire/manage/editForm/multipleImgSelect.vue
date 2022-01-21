<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">图片多选题</h3>
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
              ></el-input>
              <i class="delete el-icon-delete" @click="handleDelete(index)"></i>
            </div>
            <div class="img">
              <el-upload
                class="upload-demo"
                action="/api/admin/file/sftp/upload"
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
      <div class="mh100">
        <div>
          <el-button class="gray" type="text">
            <i class="blue el-icon-refresh"></i>选择范围 最少
            <el-input
              style="width:100px;border:none"
              size="mini"
              placeholder="请输入选项"
              v-model="data.minNum"
              type="number"
              min="0"
            />最多
            <el-input
              style="width:100px;border:none"
              size="mini"
              placeholder="请输入选项"
              v-model="data.maxNum"
              type="number"
              min="0"
            />
          </el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(图片多选题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
          <span class="tips" v-if="data.isRequire === '1'">至少选择{{data.minNum}}个最多选择{{data.maxNum}}个</span>
        </h3>
        <div style="min-height:230px;display:inline-block;">
          <el-checkbox-group v-model="data.answer.value" :max="data.maxNum" :disabled="disabled">
            <div v-for="(item,index) in data.optionList" :key="index" class="imgDiv">
              <el-checkbox :label="item.description">
                <p :title="item.description">{{optionLetters[index]}}、{{item.description}}</p>
                <div class="img">
                  <iep-img :src="item.url" :previewSrcList="[item.url]" />
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
// import { getUrl } from "./util";
import uploadMixin from "./mixin/upload";
import baseMixin from "./mixin/base";
export default {
  mixins: [baseMixin, uploadMixin],
  components: {},
  data() {
    return {
      titleType: 1,
    };
  },
  watch: {
    "data.isShow": {
      immediate: true,
      async handler() {
        const arr = [];
        for (const item of this.data.optionList) {
          const obj = { ...item };
          // obj.url = await getUrl(JSON.parse(item.name));
          arr.push(obj);
        }
        this.data.optionList = arr;
      },
    },
    "data.minNum": {
      deep: true,
      handler(val) {
        if (+this.data.isRequire && this.data.optionList.length) {
          if (val === "0") {
            this.$set(this.data, "minNum", 1);
          }
        }
        if (val > this.data.maxNum) {
          this.$set(this.data, "minNum", this.data.maxNum);
        }
        if (val < 0) {
          this.$set(this.data, "minNum", 0);
        }
      },
    },
    "data.maxNum": {
      deep: true,
      handler(val) {
        if (this.data.optionList && val > (this.data.optionList.length || 0)) {
          this.$set(this.data, "maxNum", this.data.optionList.length || 0);
        }
        if (+this.data.isRequire && this.data.optionList.length) {
          if (val < this.data.minNum && val > 0) {
            this.$set(this.data, "minNum", this.data.maxNum);
          } else if (val == "0") {
            this.$set(this.data, "maxNum", 1);
          }
        }
        if (val < this.data.minNum) {
          this.$set(this.data, "minNum", this.data.maxNum);
        }
      },
    },
    "data.isRequire": {
      deep: true,
      handler(val) {
        if (+val && this.data.optionList.length) {
          if (this.data.maxNum == "0") {
            this.$set(this.data, "maxNum", 1);
          }
          if (this.data.minNum == "0") {
            this.$set(this.data, "minNum", 1);
          }
        }
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
              if (val.indexOf(item.source) > -1) {
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
              if (val.indexOf(item.source) > -1) {
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
    async handleSuccessTitle(response) {
      // 未用参数file, fileList
      const data = response.data;
      this.$set(this.data, "title", data.url);
      this.data.isPicTitle = 1;
    },
    async handleSuccess(response) {
      const data = response.data;
      // let jsonName = JSON.stringify({
      //   fileName: data.fileName,
      //   original: data.original,
      // });
      const newfile = {
        description: data.description,
        url: data.url,
        name: data.original,
        type: 1,
        fileName: data.fileName,
      };
      this.data.optionList.push(newfile);
      this.$set(this.data, "maxNum", this.data.optionList.length);
      if (+this.data.isRequire && this.data.optionList.length) {
        !+this.data.minNum && this.$set(this.data, "minNum", 1);
      } else {
        !+this.data.minNum && this.$set(this.data, "minNum", 0);
      }
    },
    handleDelete(index) {
      const fileList = [...this.data.optionList];
      fileList.splice(index, 1);
      this.$set(this.data, "optionList", fileList);
      this.$set(this.data, "maxNum", fileList.length);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css/style.scss";
.imgs {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.imgs .img {
  margin-right: 30px;
  width: 150px;
  height: 200px;
  padding-top: 15px;
  .el-image {
    max-height: 150px;
    border: 1px solid $--border-color;
  }
}
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
.gray {
  color: $--color-text-regular;
  font-size: 15px;
}
.blue {
  color: #3a8ee6;
  padding-right: 5px;
}
.imgs {
  padding-right: 10px;
}
.title .tips {
  font-size: 12px;
  color: $--color-primary;
}
</style>
