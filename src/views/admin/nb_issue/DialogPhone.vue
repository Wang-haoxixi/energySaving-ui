<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="手机号配置"
    width="600px"
    @close="close"
    @mounted="loadPage()"
  >
    <iep-operation-container>
      <template slot="left">
        <el-button
          v-if="!pagedTable.length"
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
        >添加</el-button>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
    >
      <el-table-column prop="operation" label="操作" width="100">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button @click="handleDel(scope.row)" type="text">删除</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <DialogPhoneForm ref="DialogPhoneForm" @load-page="loadPage()"></DialogPhoneForm>
  </iep-dialog>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getMobileList, delMobileById } from "@/api/fms/mobile";
import DialogPhoneForm from "./DialogPhoneForm";
import { PhoneDTO } from "./options";
export default {
  mixins: [operationMixins],
  components: {
    DialogPhoneForm,
  },
  data() {
    return {
      isLoadTable: false,
      pagedTable: [],
      columnsMap: [
        {
          prop: "mobile",
          label: "手机号",
        },
      ],
      dialogShow: false,
    };
  },
  methods: {
    handleAdd() {
      this.$refs["DialogPhoneForm"].form = new PhoneDTO();
      this.$refs["DialogPhoneForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delMobileById, "删除");
    },
    async loadPage() {
      const { data } = await getMobileList();
      this.pagedTable = data;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new PhoneDTO();
      this._close();
    },
  },
};
</script>
