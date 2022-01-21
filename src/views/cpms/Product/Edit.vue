<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="`${methodName+typeMapName}`" :backOption="backOption"></iep-page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto" class="iep-form-detail">
        <el-row class="base">
          <iep-form-item :verifValue="form.imageUrl" label-name="标题图" prop="imageUrl">
            <iep-upload-avatar
              v-model="form.imageUrl"
              :width="108"
              :height="108"
              :dialogWidth="750"
              :dialogHeight="750"
            ></iep-upload-avatar>
          </iep-form-item>
          <iep-form-item :label-name="`${typeMapName}名称`" prop="name">
            <el-input :maxlength="30" v-model="form.name" placeholder="请输入名称"></el-input>
          </iep-form-item>
          <!-- <iep-form-item label-name="类别" prop="category" class="iep-form-half">
            <IepDictSelect v-model="form.category" :dictName="categoryNameMap"></IepDictSelect>
          </iep-form-item>-->
          <iep-form-item label-name="关联标签" :verifValue="form.tagKeywords" prop="tagKeywords">
            <!-- <IepTagInput v-model="form.tagKeywords"></IepTagInput> -->
            <el-select v-model="form.tagKeywords" multiple placeholder="请选择">
              <!-- :label="item.label" -->
              <el-option v-for="item in options" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </iep-form-item>
          <template v-if="['0','1'].includes(type)">
            <!-- <iep-form-item label-name="测试站网址" prop="website">
              <el-input :maxlength="100" v-model="form.website" placeholder="请输入测试站地址"></el-input>
            </iep-form-item>-->
            <iep-form-item label-name="版本号" prop="version" class="iep-form-half-block">
              <el-input :maxlength="100" v-model="form.version" placeholder="请输入版本号"></el-input>
            </iep-form-item>
            <iep-form-item label-name="版本更新时间" prop="versionTime" class="iep-form-half-block">
              <IepDatePicker v-model="form.versionTime" type="datetime" placeholder="请输入版本更新时间"></IepDatePicker>
            </iep-form-item>
          </template>
          <iep-form-item :label-name="`${typeMapName}截图`" prop="previewImgUrl">
            <IepPicListUpload v-model="form.previewImgUrl"></IepPicListUpload>
          </iep-form-item>
          <iep-form-item label-name="简介" prop="synopsis">
            <el-input :maxlength="150" v-model="form.synopsis" placeholder="请用一句话概括其核心内容"></el-input>
          </iep-form-item>
          <iep-form-item label-name="详情" prop="description">
            <iep-input-area
              :maxlength="10000"
              v-model="form.description"
              placeholder="请填写产品详情介绍"
              show-word-limit
              :autosize="{ minRows: 6}"
            ></iep-input-area>
          </iep-form-item>
          <iep-form-item
            v-show="['0','1','2','3','4'].includes(type)"
            label-name="附件"
            :prop="['2'].includes(type)?'attachs':''"
          >
            <iep-upload v-model="form.attachs" :limit="3" action="/api/admin/file/oss/upload"></iep-upload>
          </iep-form-item>
          <iep-form-item v-if="isEdit" label-name="客户" class="iep-form-half" prop="customers">
            <Customers :id="form.id" v-model="form.customers"></Customers>
          </iep-form-item>
          <iep-form-item v-if="type==='0'" label-name="关联产品">
            <Products v-model="form.productList"></Products>
          </iep-form-item>
          <iep-form-item class="free-charge" label-name="是否免费">
            <el-switch
              v-model="form.isFree"
              active-color="#13ce66"
              active-value="1"
              inactive-value="0"
              @change="handleInitPrice()"
            ></el-switch>
          </iep-form-item>
          <template v-if="!isFree">
            <el-divider content-position="center">制定价格</el-divider>
            <div class="check-wrapper">
              <div class="price-check">
                <el-checkbox
                  v-model="form.priceChecked"
                  :disabled="priceCheckDisabled"
                  @change="form.price = form.priceChecked ? 0.01 : 0"
                ></el-checkbox>
                <iep-form-item label-name="宝贝价格" prop="price" label-width="80px">
                  <iep-input-amount :disabled="!form.priceChecked" v-model="form.price" :min="form.priceChecked ? 0.01 : 0"></iep-input-amount>
                </iep-form-item>
              </div>
              <div class="price-check">
                <el-checkbox
                  v-model="form.cashChecked"
                  :disabled="cashCheckDisabled"
                  @change="form.cash = form.cashChecked ? 0.01 : 0"
                ></el-checkbox>
                <iep-form-item label-name="现金价格" prop="cash" label-width="80px">
                  <iep-input-amount :disabled="!form.cashChecked" v-model="form.cash" unit="元" :min="form.cashChecked ? 0.01 : 0"></iep-input-amount>
                </iep-form-item>
              </div>
            </div>
          </template>
          <el-form-item>
            <el-button
              class="iep-btn-l"
              type="primary"
              :loading="submitFormLoading"
              @click="mixinsSubmitFormGen()"
            >保存</el-button>
            <!-- TODO: 等待后端完成 -->
            <el-button class="iep-btn-l" @click="handleDraft()">保存为草稿</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </iep-basic-container>
  </div>
</template>

<script>
import {
  getProductById,
  postProduct,
  putProduct,
  putProductManage,
  draftProduct,
} from "@/api/dms/product";
import formMixins from "@/mixins/formMixins";
import { toDtoForm, rules, dictsMap, toVoForm } from "../options";
import { ProductDTO } from "../util";
import Products from "../Components/Products";
import Customers from "../Components/Customers";

import { getTags } from "@/api/qms/udataContent";

export default {
  components: {
    Products,
    Customers,
  },
  mixins: [formMixins],
  data() {
    return {
      options: [],
      backOption: {
        isBack: true,
      },
      priceChecked: false,
      cashChecked: false,
      rules,
      form: new ProductDTO(),
    };
  },
  watch:{
    // 'form.priceChecked': {
    //   handler(n){
    //     this.form.price = !n ? 0 : 0.01;
    //   },
    // },
    // 'form.cashChecked': {
    //   handler(n, o){
    //     console.log('new: ' + n,'old: ' + o);
    //     this.form.cash = !n ? 0 : 0.01;
    //   },
    // },
  },
  computed: {
    cashCheckDisabled() {
      if (this.form.cashChecked !== this.form.priceChecked) {
        if (this.form.cashChecked) {
          return true;
        }
      }
      return false;
    },

    priceCheckDisabled() {
      if (this.form.cashChecked !== this.form.priceChecked) {
        if (this.form.priceChecked) {
          return true;
        }
      }
      return false;
    },
    isFree() {
      return this.form.isFree === "1" ? true : false;
    },
    id() {
      return +this.$route.params.id;
    },
    /**
     * form.type 统一使用 type 字段 类型为 string
     */
    type() {
      if (this.$route.query.type) {
        return String(this.$route.query.type);
      }
      return this.form.type;
    },
    typeMapName() {
      return dictsMap.type[this.type];
    },
    // categoryNameMap() {
    //   return categoryDictNameMap[this.type];
    // },
    isEdit() {
      return this.id ? true : false;
    },
    formRequestFn() {
      return this.isEdit
        ? this.$route.query.manage
          ? putProductManage
          : putProduct
        : postProduct;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
  },
  created() {
    this.form = new ProductDTO(this.type);
    // this.loadPage();
    this.getSelectTags();
  },
  methods: {
    getSelectTags() {
      if (this.isEdit) {
        getProductById(this.id).then((data) => {
          console.log('data..', data);
          this.form = this.$mergeByFirst(new ProductDTO(), data.data);
          this.form = toVoForm(this.form);
          console.log('payCurrency..', this.form.payCurrency);
          getTags(this.form.type).then((res) => {
            this.options = res.data;
          });
        });
      }else {
        getTags(this.$route.query.type).then((res) => {
          this.options = res.data;
        });
      }
    },
    // loadPage() {
    //   if (this.isEdit) {
    //     getProductById(this.id).then((data) => {
    //       this.form = this.$mergeByFirst(new ProductDTO(), data.data);
    //       this.form = toVoForm(this.form);
    //     });
    //   }
    // },
    async submitForm() {
      const { data } = await this.formRequestFn(toDtoForm(this.form));
      if (data) {
        this.$router.history.go(-1);
      }
    },
    async handleDraft() {
      if (this.form.imageUrl && this.form.name) {
        const { data } = await draftProduct(toDtoForm(this.form));
        if (data) {
          this.$router.history.go(-1);
        }
      } else {
        this.$message("图片、名称必填！");
      }
    },
    handleInitPrice() {
      if (this.isFree) {
        this.form.price = 0;
        this.form.cash = 0;
        // this.form.price = 0.01;
        // this.form.cash = 0.01;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.check-wrapper {
  margin-left: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .price-check {
    display: flex;
    align-items: center;
    &:last-child {
      margin-left: 40px;
    }
  }
  .el-checkbox {
    margin-bottom: 30px;
  }
}
</style>
