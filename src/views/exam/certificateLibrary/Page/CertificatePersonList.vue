<template>
  <div>
    <iep-basic-container>
      <iep-page-header title="获证人员" :backOption="backOption"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="personColumnsMap"
        :isMutipleSelection="false"
        searchName="name"
        rowId="id"
        :loadFunction="getPersonPage"
        :isInitLoad="false"
        @load-page="handleLoad"
        :useRoutePage="false"
      >
        <template #iep-crud-left>
          <span>
            证书发放数量
            <span style="color:red;">{{total}}</span>本
          </span>
        </template>
        <!-- <template #iep-crud-advance-search>
          <AdvanceSearch :orderType="orderType" @search-page="handleSearch"></AdvanceSearch>
        </template>-->
        <template #relationState="{scope}">{{dictsMap.relationState[scope.row.relationState]}}</template>
      </iep-crud-table>
      <IepImgViewer ref="imgViewer"></IepImgViewer>
    </iep-basic-container>
  </div>
</template>
<script>
import { dictsMap, personColumnsMap } from "../../const/certificateOptions.ts";
import { getPersonPage } from "@/api/qms/cerificate";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { validatenull } from "@/util/validate";
export default {
  data() {
    return {
      dictsMap,
      personColumnsMap,
      editData: {
        methodName: "新增",
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      total: 0,
      certificateId: null,
    };
  },
  mixins: [mixins, operationMixins],
  props: ["record"],
  computed: {
    operationOptions() {
      return [
        {
          name: "查看证书",
          func: this.handleDetail,
          hidden: (row) => {
            return validatenull(row.imgUrl);
          },
          disabled: false,
        },
      ];
    },
  },
  created() {
    this.certificateId = this.record.id;
  },
  mounted() {
    this._setQueryForm();
    this.$refs["CrudTable"].searchPage();
    this.$refs["CrudTable"].clearSearch();
  },
  methods: {
    getPersonPage,
    handleLoad(record) {
      this.total = record.total;
    },
    _setQueryForm() {
      this.$refs["CrudTable"].queryForm = {
        certificateId: this.certificateId,
      };
    },
    useGuide() {
      this.$emit("onGuide");
    },
    handleDetail(row) {
      this.$refs["imgViewer"].imgList = [row.imgUrl];
      this.$refs["imgViewer"].showViewer = true;
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
</style>
