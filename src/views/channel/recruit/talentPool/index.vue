<template>
  <div class="talent-pool">
    <div class="content" v-if="isChosen">
      <CardTpl ref="card" class="card-tpl tpl" @changeSo="changeSo"></CardTpl>
      <ListTpl class="list-tpl tpl" :orgId="orgId"></ListTpl>
    </div>
    <iep-img class="img" :src="img" v-else></iep-img>
    <selectDialog ref="selectSo" @select-so="selectSo" :list="list"></selectDialog>
  </div>
</template>

<script>
import CardTpl from "./card/index";
import ListTpl from "./list/index";
import selectDialog from "./selectDialog";
import { getUserManageOrgList } from "@/api/admin/org";
export default {
  components: { CardTpl, ListTpl, selectDialog },
  data() {
    return {
      img: "/img/default/default-nodata1.png",
      orgId: 0,
      isChosen: false,
      list: [],
      soValue: "",
    };
  },
  methods: {
    changeSo(val) {
      this.orgId = val;
    },
    selectSo(val) {
      this.isChosen = true;
      this.$nextTick(() => {
        this.$refs.card.selectSo(val);
      });
    },
    getSoList() {
      getUserManageOrgList({
        size: 9999,
      }).then(({ records }) => {
        this.list = [...records];
        // 获取到组织列表后需要进行判断，是否已经选中值了
        if (this.soValue) {
          for (const item of this.list) {
            if (item.orgId === this.soValue) {
              this.selectSo(this.soValue);
              return;
            }
          }
          // 若对应不上，重新进行选择
          this.$refs.selectSo.dialogShow = true;
        } else {
          this.$refs.selectSo.dialogShow = true;
        }
      });
    },
  },
  created() {
    this.getSoList();
    // 首先判断是否曾经选中过so
    const obj = window.sessionStorage.getItem("talentPoolSoSelect");
    const result = obj ? JSON.parse(obj) : {};
    if (result.content) {
      // 同时还要判断组织是否存在，由获取组织后进行判断
      this.soValue = result.content;
    }
  },
};
</script>

<style lang="scss" scoped>
.talent-pool {
  background-color: $--background-color;
  .content {
    display: flex;
    width: 1200px;
    margin: 20px auto 0;
    .card-tpl {
      width: 260px;
      padding: 20px;
      min-height: 300px;
      margin-right: 20px;
      background-color: #fff;
    }
    .list-tpl {
      width: calc(100% - 320px);
    }
  }
  .img {
    height: calc(100vh - 160px);
    &::v-deep img {
      width: 300px;
    }
  }
}
</style>