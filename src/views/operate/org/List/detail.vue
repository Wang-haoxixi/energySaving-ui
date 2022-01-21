<template>
  <iep-basic-container>
    <iep-page-header title="组织详情" :backOption="backOption">
      <el-button plain disabled>审核</el-button>
      <el-button @click="handleWarning()" plain>警告</el-button>
      <el-button plain disabled>解散</el-button>
    </iep-page-header>
    <div class="info-box" v-loading="loading">
      <div class="org-info">
        <iep-img :src="form.avatar" :resizeOpt="{l:140}"></iep-img>
        <div class="cont">
          <div class="org-name">
            {{form.orgName}}
            <el-tag>正常</el-tag>
          </div>
          <div class="cont-box">
            <span>负责人：{{form.realName}}</span>
            <span>成立时间：{{form.establishedTime | parseToDay}}</span>
            <span>创建时间：{{form.createTime | parseToTimeMinutes}}</span>
            <span>更新时间：{{form.updateTime | parseToTimeMinutes}}</span>
            <span>行业：{{form.industry | showText}}</span>
            <span>所在地：{{form.area | showText}}</span>
          </div>
        </div>
      </div>
      <div class="operate-group">
        <el-button type="primary" @click="$openPage(`/operate/org/log/${id}`)">组织日志</el-button>
        <el-dropdown>
          <div class="down-it el-dropdown-link">
            <i class="el-icon-woneng-gengduo"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>组织动态</el-dropdown-item>
            <el-dropdown-item @click.native="handleToData">组织数据</el-dropdown-item>
            <el-dropdown-item>认证材料</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="data-wrap">
      <iep-data-item :value="form.exponentVo.governor||0" label="知事"></iep-data-item>
      <iep-data-item :value="form.exponentVo.fanWorth||0" label="粉丝"></iep-data-item>
      <iep-data-item :value="form.exponentVo.creditWorth" label="信用值"></iep-data-item>
      <iep-data-item :value="form.exponentVo.mightyOne" label="用户"></iep-data-item>
      <iep-data-item :value="form.exponentVo.bellAssets" label="宝贝"></iep-data-item>
      <iep-data-item :value="form.exponentVo.assetsWorth" label="数据资产"></iep-data-item>
      <iep-data-item :value="form.exponentVo.redness" label="红度"></iep-data-item>
    </div>
    <iep-tabs :tabList="tabList" v-model="activeName">
      <template v-if="activeName==='reported'" v-slot:reported>
        <Reported></Reported>
      </template>
      <template v-if="activeName==='redness'" v-slot:redness>
        <Redness></Redness>
      </template>
    </iep-tabs>
    <WarningDialog ref="WarningDialog" @load-page="loadPage()"></WarningDialog>
  </iep-basic-container>
</template>
<script>
import WarningDialog from "@/views/operate/user/List/WarningDialog";
import { getStatisticsOrgById } from "@/api/admin/statistics";
import { columnsMapReport as columnsMap } from "./options";
import Reported from "./Components/Reported";
import Redness from "./Components/Redness";
class ExponentVo {
  governor = 0;
  fanWorth = 0;
  assetsWorth = 0;
  bellAssets = 0;
  creditWorth = 0;
  mightyOne = 0;
  redness = 0;
  taskCount = 0;
}
class OrgDataDTO {
  id = 0;
  avatar = "";
  orgName = "";
  realName = "";
  establishedTime = "";
  createTime = "";
  updateTime = "";
  industry = "";
  area = "";
  exponentVo = new ExponentVo();
}
export default {
  components: {
    Reported,
    Redness,
    WarningDialog,
  },
  data() {
    return {
      activeName: "reported",
      tabList: [
        { label: "被举报详情", value: "reported" },
        { label: "红度历史", value: "redness" },
      ],
      columnsMap,
      backOption: {
        isBack: true,
      },
      form: new OrgDataDTO(),
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    handleToData() {
      this.$openPage(`/operate/org/data/${this.id}`);
    },
    async loadOrgInfo() {
      this.loading = true;
      const { data } = await getStatisticsOrgById(this.id);
      this.form = this.$mergeByFirst(new OrgDataDTO(), data);
      this.loading = false;
    },
    handleWarning() {
      this.$refs["WarningDialog"].form.type = 2;
      this.$refs["WarningDialog"].form.dataId = this.form.id;
      this.$refs["WarningDialog"].dialogShow = true;
    },
  },
  created() {
    this.loadOrgInfo();
  },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
  .el-button {
    margin-left: 0;
  }
}
.info-box {
  display: flex;
  margin-bottom: 20px;
  .org-info {
    flex: 1;
    display: flex;
    .iep-image {
      width: 140px;
      height: 140px;
    }
    .cont {
      flex: 1;
      margin-left: 20px;
      .org-name {
        font-size: 18px;
        margin-bottom: 15px;
        .el-tag {
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          border-radius: $--small-border-radius;
        }
      }
      .cont-box {
        width: 100%;
        font-size: 14px;
        color: $--color-text-secondary;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        gap: 8px 0;
      }
    }
  }
  .operate-group {
    .down-it {
      margin-left: 5px;
      margin-bottom: 10px;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background: rgba(243, 245, 245, 1);
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
.data-wrap {
  background: none;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  margin-bottom: 20px;
  .data-item {
    padding: 0 10px;
    width: 100%;
    border-right: 1px solid $--border-color;
    &:last-of-type {
      border-right: 0;
    }
  }
}
</style>
