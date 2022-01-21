<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="title" :backOption="backOption">
        <div slot="left" class="tags">{{tags.join(" / ")}}</div>
      </iep-page-header>
      <div class="wraper">
        <div class="custom-info">
          <div class="title">客户信息</div>
          <div class="title-b">浙江省大数据局</div>
          <div class="top-info">
            <div class="left-ibox">
              <div class="small-ibox">
                <div>{{form.contactCount||"--"}}</div>
                <div>联系人</div>
              </div>
              <div class="small-ibox">
                <div>{{form.recordCount||"--"}}</div>
                <div>跟进记录</div>
              </div>
              <div class="small-ibox">
                <div>{{form.planCount||"--"}}</div>
                <div>方案</div>
              </div>
              <div class="small-ibox">
                <div>{{form.informationCount||"--"}}</div>
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
            <div class="title">联系人信息</div>
            <div class="item">
              <span class="item-opt">姓名：{{formData.name}}</span>
              <span class="item-opt">职务：{{formData.position}}</span>
            </div>
            <div class="item">
              <span class="item-opt">部门/处室：{{formData.function}}</span>
              <span class="item-opt">关注的产品：{{"暂无"}}</span>
            </div>
            <div class="item">
              <span class="item-opt">电话：{{formData.telephone}}</span>
              <span class="item-opt">手机：{{formData.mobile}}</span>
            </div>
            <div class="item">
              <span class="item-opt">传真：{{formData.fax}}</span>
              <span class="item-opt">邮箱：{{formData.mail}}</span>
            </div>
            <div class="item">
              <span class="item-opt">微信：{{formData.weiXin}}</span>
              <span class="item-opt">QQ：{{formData.qq}}</span>
            </div>
            <div class="item">
              <span class="item-opt">客户来源：{{ dealDict(dms_client_source,formData.resourceFrom)}}</span>
              <span class="item-opt">地址：{{formData.address}}</span>
            </div>
            <div class="item">
              <span class="item-opt">市场经理：{{formData.chargeName}}</span>
              <span class="item-opt">前市场经理：{{formData.previousManager}}</span>
            </div>
            <div class="item">
              <span class="item-opt">联系人标签：{{formData.tagKeywords}}</span>
            </div>
          </div>
          <div class="others">
            <iep-table
              :isLoadTable="isLoadTable"
              border
              :isPagination="isPagination"
              :columnsMap="columnsFolMap"
              :pagedTable="pagedTable"
              is-mutiple-selection
            ></iep-table>
            <br />
          </div>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
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
import { getContactPage } from "@/api/dms/custom_follow.ts";
import { getPageById } from "@/api/dms/custom";
import { getContactById } from "@/api/dms/custom_contact.ts";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      backOption: {
        isBack: true,
      },
      title: "",
      tags: [],
      pagedTable: [],
      columnsFolMap,
      isLoadTable: false,
      isPagination: false,
      form: {},
      formData: {},
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
    clientId() {
      return this.$route.query.clientId;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadFol();
      this.load();
    });
  },
  methods: {
    async loadFol(param = this.searchForm, fn = m => m) {
      const { data } = await getContactPage({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records } = data;
      this.pagedTable = records.map(fn);
    },
    load() {
      getPageById(this.clientId).then(res => {
        this.form = res.data;
        this.title = res.data.name;
        this.tags = res.data.tagKeywords;
      });
      getContactById(this.id).then(res => {
        this.formData = res.data;
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
.custom-info {
  .title {
    margin-bottom: 15px;
    width: 100%;
    font-size: 18px;
    color: $--color-text-regular;
  }
  .title-b {
    margin-bottom: 15px;
    width: 100%;
    font-size: 20px;
    color: $--color-text-regular;
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
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 28px;
    border-right: 1px solid $--border-color;
    .small-ibox {
      width: 30%;
      padding: 10px 0;
      text-align: center;
      & > div:nth-child(1) {
        font-size: 20px;
        color: $--color-text-secondary;
      }
      & > div:nth-child(2) {
        font-size: 16px;
        color: $--color-text-regular;
      }
    }
  }
  .right-ibox {
    width: 40%;
    min-width: 100px;
    text-align: center;
    color: $--color-text-regular;
    & > div {
      min-width: 200px;
      margin-bottom: 14px;
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
  .title {
    margin-top: 15px;
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
  .item {
    padding: 0 15px;
    display: flex;
    margin-bottom: 15px;
    span {
      width: 50%;
      font-size: 14px;
      font-family: "微软雅黑";
      color: $--color-text-regular;
    }
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
