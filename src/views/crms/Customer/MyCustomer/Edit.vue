<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${methodName}客户`" :backOption="backOption"></iep-page-header>
      <div class="drawer">
        <div class="con">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            style="margin-right: 16%;"
            :rules="rules"
            class="iep-form-detail"
          >
            <el-row class="base">
              <div class="custom-tags">
                <div class="custom-name">
                  <span class="red">*</span>客户标签（可多选）：
                </div>
                <div class="tag-counter">
                  <span
                    v-for="(item, index) in recommendTagList"
                    :key="item.id"
                    :class="item.isClick ? 'active' : ''"
                    @click="changeTagList(index)"
                  >{{ item.name }}</span>
                </div>
              </div>
              <iep-form-item label-name="更多客户标签" prop="tags" placeholder="添加自定义主题（标签）">
                <IepTagInput v-model="form.tags"></IepTagInput>
              </iep-form-item>

              <el-col :span="24">
                <el-col :span="12">
                  <iep-form-item label-name="客户名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                    <!-- <IepCustomSelect v-if="!isEdit" v-model="nameList.orgId" :option="[{orgId: nameList.orgId, orgName: nameList.orgName}]" ref="name" prefixUrl="dms/organization/show_page" @change="changClient"></IepCustomSelect> -->
                  </iep-form-item>
                </el-col>
                <el-col :span="12">
                  <iep-form-item label-name="客户简称">
                    <el-input v-model="form.simpleName"></el-input>
                  </iep-form-item>
                </el-col>
              </el-col>

              <el-col :span="24">
                <el-col :span="12">
                  <iep-form-item label-name="原机构名称">
                    <el-input v-model="form.elderOrgName"></el-input>
                  </iep-form-item>
                </el-col>
                <el-col :span="12">
                  <iep-form-item label-name="单位职能/主管">
                    <el-input v-model="form.function"></el-input>
                  </iep-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <iep-form-item label-name="客户分类">
                    <iep-dict-select v-model="form.type" dict-name="dms_client_type" clearable></iep-dict-select>
                  </iep-form-item>
                </el-col>

                <el-col :span="12">
                  <iep-form-item label-name="所属行业">
                    <IepSelectIndustry v-model="form.industryCode"></IepSelectIndustry>
                  </iep-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <iep-form-item label-name="区域类型">
                    <iep-dict-select v-model="form.area" dict-name="dms_district_type"></iep-dict-select>
                  </iep-form-item>
                </el-col>

                <el-col :span="12">
                  <iep-form-item label-name="客户官网">
                    <el-input v-model="form.website"></el-input>
                  </iep-form-item>
                </el-col>
              </el-col>

              <el-col :span="24">
                <iep-form-item label-name="客户地址">
                  <div style="display:flex;width: 100%;">
                    <iep-select-city style="flex:2; margin-right:10px" v-model="form.cityCode"></iep-select-city>
                    <el-input style="flex:3;" v-model="form.address"></el-input>
                  </div>
                </iep-form-item>
              </el-col>

              <el-col :span="24">
                <iep-form-item label-name="其它说明">
                  <el-input v-model="form.remark" type="textarea"></el-input>
                </iep-form-item>
              </el-col>

              <el-col :span="24">
                <el-col :span="12">
                  <iep-form-item label-name="客户关系">
                    <iep-dict-select
                      v-model="form.relation"
                      dict-name="dms_client_relations"
                      clearable
                    ></iep-dict-select>
                  </iep-form-item>
                </el-col>
                <el-col :span="12">
                  <iep-form-item label-name="客户来源">
                    <iep-dict-select
                      v-model="form.resourceFrom"
                      dict-name="dms_client_source"
                      clearable
                    ></iep-dict-select>
                  </iep-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
          <IepFooterBar>
            <el-button type="primary" :loading="submitFormLoading" @click="handleSumbit">保存</el-button>
          </IepFooterBar>
        </div>
        <div class="right-box" ref="widthStyle">
          <iep-basic-container class="wrap">
            <iep-tabs v-model="tabName" :tab-list="tabList">
              <template v-if="tabName === 'SimilarCustomers'" v-slot:SimilarCustomers>
                <similar-customers></similar-customers>
              </template>
              <template v-if="tabName === 'ProRecommend'" v-slot:ProRecommend>
                <pro-recommend></pro-recommend>
              </template>
              <template v-if="tabName === 'InterProduct'" v-slot:InterProduct>
                <inter-product></inter-product>
              </template>
              <template v-if="tabName === 'WantToSee'" v-slot:WantToSee>
                <want-to-see></want-to-see>
              </template>
            </iep-tabs>
          </iep-basic-container>
          <i class="el-icon-d-arrow-left" v-if="flag == 0" @click="hadnleLeft"></i>
          <i class="el-icon-d-arrow-right" v-if="flag == 1" @click="hadnleRight"></i>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import SimilarCustomers from "../Components/SimilarCustomers";
import ProRecommend from "../Components/ProRecommend";
import InterProduct from "../Components/InterProduct";
import WantToSee from "../Components/WantToSee";
import { initForm, rules } from "../options.ts";
import mixins from "@/mixins/mixins";
import formMixins from "@/mixins/formMixins";
import { getRecTags } from "@/api/tms/tag";
// import { getDetailPage } from "@/api/dms/organization_list";
import {
  getExistence,
  createPage,
  updatePage,
  getPageById,
  createSeaPage,
} from "@/api/dms/custom";
export default {
  components: {
    SimilarCustomers,
    ProRecommend,
    InterProduct,
    WantToSee,
  },
  mixins: [mixins, formMixins],
  props: {
    record: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      rules,
      customType: "MyCustomer",
      fnCreatePage: createPage,
      fnUpdatePage: updatePage,
      fnGetPageById: getPageById,
      form: initForm(),
      flag: 0,
      recommendTagList: [],
      tagList: [],
      tabName: "SimilarCustomers",
      tabList: [
        {
          label: "相似客户",
          value: "SimilarCustomers",
        },
        {
          label: "方案推荐",
          value: "ProRecommend",
        },
        {
          label: "感兴趣产品",
          value: "InterProduct",
        },
        {
          label: "猜你想看",
          value: "WantToSee",
        },
      ],
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id ? true : false;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.customType = this.$route.query.customType || "MyCustomer";
      const data = await getRecTags();
      this.recommendTagList = data.data.map(m => {
        return {
          ...m,
          isClick: false,
        };
      });
      if (this.isEdit) {
        this.loadDetailPage();
      }
    },
    filterTags() {
      let tagList = this.recommendTagList;
      tagList = tagList.filter(item => item.isClick === true);
      tagList = tagList.map(m => {
        return m["name"];
      });
      this.tagList = [...tagList, ...this.form.tags];
    },
    hadnleLeft() {
      this.$refs.widthStyle.style.width = 480 + "px";
      this.flag = 1;
    },
    hadnleRight() {
      this.$refs.widthStyle.style.width = 0 + "px";
      this.flag = 0;
    },
    changeTagList(val) {
      if (this.recommendTagList[val].isClick == false) {
        this.recommendTagList[val].isClick = true;
      } else {
        this.recommendTagList[val].isClick = false;
      }
    },
    loadDetailPage() {
      this.fnGetPageById(this.id).then(res => {
        if (res.data) {
          this.form = this.$mergeByFirst(this.form, res.data);
          this.form.cityCode = this.form.cityCode
            .split(",")
            .map(i => Number(i));
          this.form.industryCode = this.form.industryCode
            .split(",")
            .map(i => Number(i));
          const c = [];
          const d = [];
          this.recommendTagList.map(m => {
            const b = this.form.tagKeywords.includes(m.name);
            c.push(b);
          });
          for (let i = 0; i < c.length; i++) {
            this.recommendTagList[i].isClick = c[i];
          }
          let tagList = this.recommendTagList;
          tagList = tagList.filter(item => item.isClick === true);
          tagList = tagList.map(m => {
            return m["name"];
          });
          this.form.tagKeywords.map(i => {
            if (!tagList.includes(i)) {
              d.push(i);
            }
          });
          this.form.tags = d;
        }
      });
    },
    handleSumbit() {
      this.filterTags();
      this.form.tagKeywords = this.tagList;
      if (this.isEdit) {
        // this.form.cityCode = this.form.cityCode.map(i => String(i));
        // this.form.industryCode = this.form.industryCode.map(i => String(i));
        this.fnUpdatePage(this.form).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "更新成功!",
            });
            this.$router.go(-1);
          }
        });
      } else {
        getExistence({ name: this.form.name }).then(res => {
          if (!res.data) {
            this.fnCreatePage(this.form).then(res => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: "新增成功!",
                });
                this.$router.go(-1);
              }
            });
          } else {
            this.$message("客户名已存在，请重新输入");
            this.form.name = "";
          }
        });
      }
    },
  },
  watch: {
    customType(newVal) {
      switch (newVal) {
        case "HighSeas":
          this.fnCreatePage = createSeaPage;
          break;
        case "ColCustomer":
          // 代码块;
          break;
        default:
      }
    },
  },
};
</script>
<style scoped lang="scss">
.drawer {
  display: flex;
  .custom-name {
    padding: 0 12px 0 0;
    width: 168px;
    font-size: 14px;
    text-align: right;
  }
  .con {
    flex: 1;
  }
  .right-box {
    position: relative;
    width: 0;
    margin-left: 30px;
    transition: 0.3s;
    & > i {
      position: absolute;
      top: calc(5% - 20px);
      left: -20px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
      border: 1px solid $--border-color;
      border-radius: 50%;
      background-color: #fff;
      color: $--color-input-regular;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.red {
  color: $--color-primary;
}
.tag-counter {
  padding: 20px;
  > span {
    display: inline-block;
    margin: 5px;
    padding: 0 10px;
    height: 30px;
    line-height: 28px;
    font-size: 14px;
    border: 1px solid $--border-color;
    border-radius: $--small-border-radius;
    transition: all 0.3s linear;
    color: $--color-text-secondary;
    cursor: pointer;
    &:hover {
      cursor: pointer;
      color: $--color-primary;
      border-color: $--custom-menu-background-color;
      background-color: $--custom-menu-background-color;
    }
  }
  .active {
    color: $--color-primary;
    border-color: $--custom-menu-background-color;
    background-color: $--custom-menu-background-color;
  }
}
.wrap {
  height: calc(100% - 5px);
  box-shadow: 0 2px 12px 2px rgba(87, 87, 87, 0.08);
}
</style>
