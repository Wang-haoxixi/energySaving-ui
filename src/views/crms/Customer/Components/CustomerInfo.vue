<template>
  <div class="customer-info">
    <div>
      <div class="data-info">
        <div class="item">
          <div class="item-num">{{form.monthFollowCount?form.monthFollowCount:"--"}}</div>
          <div class="item-des">本月跟进次数</div>
        </div>
        <div class="item">
          <div class="item-num">{{form.recentFollowTime?form.recentFollowTime:"--"}}</div>
          <div class="item-des">上次跟进时间</div>
        </div>
        <div class="item">
          <div class="item-num">{{form.followDays?form.followDays:"--"}}</div>
          <div class="item-des">跟进历时天数</div>
        </div>
        <div class="item">
          <div class="item-num">{{form.frequency?form.frequency:"--"}}</div>
          <div class="item-des">跟进率</div>
        </div>
      </div>
      <div class="basic-info">
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
      <div class="project">
        <iep-table
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          style="width:100%;margin-top: 20px;"
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
</template>
<script>
import mixins from "@/mixins/mixins";
import SimilarCustomers from "./SimilarCustomers";
import InterProduct from "./InterProduct";
import { mapGetters } from "vuex";
const columnsMap = [
  {
    prop: "rank",
    label: "项目名称",
  },
  {
    prop: "bailSum",
    label: "项目负责人",
  },
  {
    prop: "discountRate",
    label: "项目金额",
  },
  {
    prop: "status",
    label: "项目状态",
  },
];
export default {
  mixins: [mixins],
  components: {
    SimilarCustomers,
    InterProduct,
  },
  data() {
    return {
      columnsMap,
      form: {},
      isLoadTable: false,
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
  },
  methods: {
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
.customer-info {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .data-info {
    padding: 25px;
    margin-top: 15px;
    margin-bottom: 25px;
    border: 1px solid $--border-color;
    display: flex;
    justify-content: space-around;
    .item {
      text-align: center;
      .item-num {
        margin-bottom: 8px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        font-size: 20px;
      }
      .item-des {
        font-size: 14px;
        color: $--color-text-regular;
      }
    }
  }
  .basic-info {
    padding: 0 8px;
    .item {
      display: flex;
      margin-bottom: 15px;
      span {
        width: 50%;
        font-size: 14px;
        color: $--color-text-regular;
      }
    }
  }
  .right {
    .title {
      margin-top: 15px;
      font-size: 18px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
}
</style>