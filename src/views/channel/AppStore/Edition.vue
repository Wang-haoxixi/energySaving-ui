<template>
  <div class="edition-box">
    <div class="sub-title">
      <h3>当前版本：{{versionNumber}}</h3>
      <span @click="handleHistory()">版本历史记录</span>
    </div>
    <div class="list">
      <pre>{{description}}</pre>
    </div>
    <iep-dialog :dialog-show="dialogShow" title="版本历史记录" width="500px" @close="_close()">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item,key) in pagedTable"
          :key="item.relationId"
          :title="item.versionNumber"
          :name="key+''"
        >
          <pre>{{item.description}}</pre>
        </el-collapse-item>
      </el-collapse>
    </iep-dialog>
  </div>
</template>
<script>
import { getAppStoreVersionListById } from "@/api/admin/app_store";
export default {
  data() {
    return {
      activeName: "0",
      versionNumber: "",
      pagedTable: [],
      description: "",
      dialogShow: false,
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleHistory() {
      this.dialogShow = true;
    },
    async loadPage() {
      const { data } = await getAppStoreVersionListById(this.$route.params.id);
      this.pagedTable = data;
      this.description = data[0].description;
      this.versionNumber = data[0].versionNumber;
    },
  },
};
</script>
<style lang="scss" scoped>
.edition-box {
  margin: 25px 0;
  .sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      margin-bottom: 0;
    }
    span {
      font-size: 14px;
      color: $--color-primary;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    span {
      display: block;
      font-size: 14px;
      line-height: 32px;
      font-size: 14px;
      color: $--color-text-regular;
    }
  }
}
</style>
