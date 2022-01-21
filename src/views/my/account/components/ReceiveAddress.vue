<template>
  <div class="receive-address-wrap">
    <h3 class="title">
      收货信息
      <el-link
        class="link-add"
        type="primary"
        icon="el-icon-circle-plus-outline"
        :underline="false"
        @click="handleAdd()"
      >添加</el-link>
    </h3>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :is-pagination="false"
    >
      <iep-operation-table-btn-group :options="operationOptions" :count="3" :width="170"></iep-operation-table-btn-group>
    </iep-table>
    <AddressDialogForm ref="AddressDialogForm" @load-page="loadPage()"></AddressDialogForm>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { AddressDTO } from "./options";
import { mapGetters } from "vuex";
import AddressDialogForm from "./AddressDialogForm";
import {
  getReceiveAddressList,
  createReceiveAddress,
  updateReceiveAddress,
  defaultReceiveAddress,
  deleteReceiveAddress,
} from "@/api/admin/receive_address";
export default {
  mixins: [operationMixins],
  components: {
    AddressDialogForm,
  },
  data() {
    return {
      isLoadTable: false,
      columnsMap: [
        {
          prop: "consignee",
          label: "收货人",
        },
        {
          prop: "cityArea",
          label: "所在地区",
        },
        {
          prop: "address",
          label: "详细地址",
        },
        {
          prop: "zipCode",
          label: "邮编",
        },
        {
          prop: "phone",
          label: "联系电话",
        },
        {
          prop: "mail",
          label: "邮箱",
        },
      ],
      pagedTable: [],
      operationOptions: [
        {
          name: "修改",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
        {
          name: row => {
            if (row.isDefault === "0") {
              return "设为默认";
            } else {
              return "默认";
            }
          },
          func: this.handleDefault,
          hidden: false,
          disabled: row => row.isDefault !== "0",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleAdd() {
      this.$refs.AddressDialogForm.dialogTitle = "新增";
      this.$refs.AddressDialogForm.dialogShow = true;
      this.$refs.AddressDialogForm.form = new AddressDTO();
      this.$refs.AddressDialogForm.formRequestFn = createReceiveAddress;
    },
    handleEdit(row) {
      this.$refs.AddressDialogForm.dialogTitle = "修改";
      this.$refs.AddressDialogForm.dialogShow = true;
      this.$refs.AddressDialogForm.form = this.$mergeByFirst(
        new AddressDTO(),
        row,
      );
      this.$refs.AddressDialogForm.formRequestFn = updateReceiveAddress;
    },
    handleDel(row) {
      this._handleComfirm(row.id, deleteReceiveAddress, "删除");
    },
    handleDefault(row) {
      this._handleComfirm(row.id, defaultReceiveAddress, "设置默认");
    },
    async loadPage() {
      this.isLoadTable = true;
      const { data } = await getReceiveAddressList();
      this.pagedTable = data;
      this.isLoadTable = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.receive-address-wrap {
  h3.title {
    margin: 20px 0;
    padding: 0;
    position: relative;
    padding-left: 12px;
    font-size: 16px;
    font-weight: 400;
    &:before {
      content: "";
      position: absolute;
      width: 3px;
      height: 14px;
      border-radius: $--border-radius-base;
      background-color: $--color-primary;
      left: 0;
      top: 4px;
    }
    .link-add {
      position: absolute;
      top: 2px;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
