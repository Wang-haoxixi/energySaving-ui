<template>
  <div class="all-customer">
    <iep-basic-container>
      <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
      <el-tag type="info" class="tags">{{tags.join(" / ")}}</el-tag>
      <div class="wraper">
        <div>
          <div class="top-info">
            <div class="left-ibox">
              <div class="small-ibox">
                <div>{{form.contactCount}}</div>
                <div>联系人</div>
              </div>
              <div class="small-ibox">
                <div>{{form.recordCount}}</div>
                <div>跟进记录</div>
              </div>
              <div class="small-ibox">
                <div>{{form.planCount}}</div>
                <div>方案</div>
              </div>
              <div class="small-ibox">
                <div>{{form.informationCount}}</div>
                <div>资讯</div>
              </div>
              <div class="small-ibox">
                <div>{{form.projectCount||"--"}}</div>
                <div>项目量</div>
              </div>
              <div class="small-ibox">
                <div>{{form.money||"--"}}万</div>
                <div>合同总额</div>
              </div>
            </div>
            <div class="right-ibox">
              <div class="title">浙江省营商环境评估</div>
              <div class="score">
                <div class="scored">最优项目</div>
              </div>
              <div>
                <span>项目金额：</span>
                <span class="info">{{form.money||"--"}}</span>
              </div>
              <div>
                <span>市场经理：</span>
                <span class="info">{{form.manager||"--"}}</span>
              </div>
            </div>
          </div>
          <div class="basic-info">
            <div class="title">基本信息</div>
            <div class="item">
              <span class="item-opt">客户简称：{{form.simpleName}}</span>
              <span class="item-opt">原机构名：{{form.elderOrgName}}</span>
            </div>
            <div class="item">
              <span class="item-opt">客户分类：{{dealDict(dms_client_type,form.area)}}</span>
              <span class="item-opt">区域类型：{{dealDict(dms_district_type,form.area)}}</span>
            </div>
            <div class="item">
              <span class="item-opt">客户官网：{{form.website}}</span>
              <span class="item-opt">
                客户来源：{{
                dealDict(dms_client_source,form.resourceFrom)}}
              </span>
            </div>
            <div class="item">
              <span class="item-opt">行业：{{dealIndustryTree(industryTree,form.industryCodes)}}</span>
              <span class="item-opt">客户关系：{{dealDict(dms_client_relations,form.relation)}}</span>
            </div>
            <div class="item">
              <span>职能/主营：{{form.function}}</span>
            </div>
            <div class="item">
              <span>地址：{{form.address}}</span>
            </div>
            <div class="item">
              <span>其它说明：{{form.remark}}</span>
            </div>
          </div>
          <div class="linker">
            <div class="title">联系人</div>
            <iep-table
              :isLoadTable="isLoadTable"
              border
              :isPagination="isPagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              is-mutiple-selection
            ></iep-table>
          </div>
          <div class="others">
            <div class="title">其它信息</div>
            <iep-table
              :isLoadTable="isLoadTable"
              border
              :isPagination="isPagination"
              :columnsMap="columnsProMap"
              :pagedTable="pagedTable"
              is-mutiple-selection
            ></iep-table>
            <br />
            <iep-table
              :isLoadTable="isLoadTable"
              border
              :isPagination="isPagination"
              :columnsMap="columnsFolMap"
              :pagedTable="pagedTable"
              is-mutiple-selection
            ></iep-table>
          </div>
        </div>
        <div class="right">
          <div>
            <div class="title">同类客户参考</div>
            <similar-customers></similar-customers>
          </div>
          <div>
            <div class="title">感兴趣产品</div>
            <inter-product></inter-product>
          </div>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
const columnsProMap = [
  {
    prop: "name",
    label: "方案",
  },
  {
    prop: "uploader",
    label: "上传者",
  },
  {
    prop: "createTime",
    label: "上传时间",
  },
  // {
  //   prop: "times",
  //   label: "浏览次数",
  // },
];
const columnsFolMap = [
  {
    prop: "theme",
    label: "跟进主题",
  },
  {
    prop: "followStatus",
    label: "跟进状态",
    type: "slot",
  },
  {
    prop: "followTime",
    label: "跟进时间",
  },
];
import SimilarCustomers from "../Components/SimilarCustomers";
import InterProduct from "../Components/InterProduct";
import { mapGetters } from "vuex";
import { getPageById } from "@/api/dms/custom";
import { columnsMap } from "../../Linker/options";
import { getClientPage } from "@/api/dms/custom_contact.ts";
import { getContactPage } from "@/api/dms/custom_follow.ts";
import { getPage } from "@/api/dms/custom_plan.ts";
export default {
  components: {
    SimilarCustomers,
    InterProduct,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsMap,
      columnsProMap,
      columnsFolMap,
      isLoadTable: false,
      isPagination: false,
      pagedTable: [],
      form: {},
      title: "",
      tags: [],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "industryTree"]),
    //区域类型
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
    },
    //客户关系
    dms_client_relations() {
      return this.dictGroup.get("dms_client_relations");
    },
    //客户来源
    dms_client_source() {
      return this.dictGroup.get("dms_client_source");
    },
    //客户分类
    dms_client_type() {
      return this.dictGroup.get("dms_client_type");
    },
    id() {
      return +this.$route.params.id;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
      this.loadLinker();
      this.loadFol();
      this.loadPro();
    });
  },
  methods: {
    async loadLinker(param = this.searchForm, fn = m => m) {
      const { data } = await getClientPage({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records } = data;
      this.pagedTable = records.map(fn);
    },
    async loadFol(param = this.searchForm, fn = m => m) {
      const { data } = await getContactPage({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records } = data;
      this.pagedTable = records.map(fn);
    },
    async loadPro(param = this.searchForm, fn = m => m) {
      const { data } = await getPage({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records } = data;
      this.pagedTable = records.map(fn);
    },
    load() {
      getPageById(this.id).then(res => {
        this.form = res.data;
        this.title = res.data.name;
        this.tags = res.data.tagKeywords;
      });
    },
    //行业处理
    dealIndustryTree(dict, industryCodes = []) {
      const num = industryCodes[0];
      let name = "";
      if (industryCodes) {
        dict.map(m => {
          if (m.id === num) {
            name = m.name;
          }
        });
      }
      return name;
    },
    //字典处理
    dealDict(dict, formNum = null) {
      let getDict = "暂无";
      if (formNum) {
        getDict = dict.map(m => m.label)[formNum];
      }
      return getDict;
    },
  },
};
</script>
<style lang="scss" scoped>
.all-customer {
  .tags {
    margin-bottom: 25px;
    font-size: 14px;
    color: $--color-text-secondary;
  }
  .wraper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
  }
}
.top-info {
  margin-bottom: 20px;
  display: flex;
  padding: 15px 0;
  border: 1px solid $--border-color;
  .left-ibox {
    display: flex;
    width: 60%;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 28px;
    margin: -10px 0;
    border-right: 1px solid $--border-color;
    .small-ibox {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 30%;
      padding: 10px 5px;
      text-align: center;
      & > div:nth-child(1) {
        max-width: 120px;
        font-size: 20px;
        color: $--color-text-secondary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        color: $--color-text-regular;
      }
    }
  }
  .right-ibox {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    min-width: 100px;
    text-align: center;
    color: $--color-text-regular;
    & > div {
      min-width: 200px;
      margin-bottom: 14px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .title {
      width: 100%;
      font-size: 18px;
      color: $--color-text-regular;
    }
    .score {
      .scored {
        margin: auto;
        width: 100px;
        font-size: 14px;
        border: 1px solid $--border-color;
        border-radius: $--small-border-radius;
      }
      .info {
        color: $--color-text-regular;
      }
    }
  }
}
.right {
  > div {
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 10px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
}
.basic-info {
  margin-bottom: 30px;
  padding: 0 8px;
  .title {
    margin-bottom: 15px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .item {
    padding: 0 15px;
    display: flex;
    margin-bottom: 15px;
    span {
      width: 50%;
      font-size: 14px;
      color: $--color-text-regular;
    }
  }
}
.linker {
  margin-bottom: 30px;
  .title {
    margin-bottom: 15px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .linker-info {
    padding: 0 15px;
  }
}
.others {
  .title {
    margin-bottom: 15px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
}
</style>