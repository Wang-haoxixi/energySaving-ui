<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item
            class="menu-item"
            :index="item.type"
            :key="item.type"
            v-for="item in Type"
            @click.native="handleSelectType(item.type)"
          >
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <iep-basic-container>
        <!-- <iep-page-header title="站点管理详情" :backOption="backOption"></iep-page-header> -->
        <column-management v-if="selectType == '1'"></column-management>
        <ad v-if="selectType == '4'"></ad>
        <f-link-management v-if="selectType == '5'"></f-link-management>
        <special-management v-if="selectType == '6'"></special-management>
        <ad-slot v-if="selectType == '3'"></ad-slot>
        <attribute-management v-if="selectType == '2'"></attribute-management>
      </iep-basic-container>
    </el-col>
  </el-row>
</template>
<script>
import Ad from "../ADManagement";
import AdSlot from "../ADSlotManagement";
import AttributeManagement from "../AttributeManagement";
import ColumnManagement from "../ColumnManagement";
import FLinkManagement from "../FLinkManagement";
import SpecialManagement from "../SpecialManagement";
export default {
  data() {
    return {
      bodyStyle: {
        padding: 0,
      },
      Type: [
        { type: "1", name: "栏目管理" },
        { type: "2", name: "推荐位管理" },
        { type: "3", name: "广告位管理" },
        { type: "4", name: "广告管理" },
        { type: "5", name: "友情链接管理" },
        { type: "6", name: "专题管理" },
      ],
      backOption: {
        isBack: true,
      },
      selectType: "1",
    };
  },
  components: {
    Ad,
    AdSlot,
    AttributeManagement,
    ColumnManagement,
    FLinkManagement,
    SpecialManagement,
  },
  methods: {
    handleSelectType(type) {
      this.selectType = type;
    },
  },
};
</script>
<style lang="scss" scoped>
.aside-main {
  padding: 20px;
  display: flex;
  margin: 0 !important;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 16px;
  }
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    width: 100%;
  }
}
.sub-menu-left {
  margin: -10px 15px -20px -20px;
  padding-top: 12px;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
