<template>
  <div class="file">
    <iep-basic-container>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        rowId="id"
        :loadFunction="getFilePage"
        searchName="fileName"
      >
        <template #iep-crud-left>
          <iep-page-header :title="$route.meta.name"></iep-page-header>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "./options";
import { hasPermissions } from "@/util/menu";
import { getFilePage, delFileById } from "@/api/admin/file";
import { downloadUrl } from "@/api/common";
export default {
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      commonOptions: [],
      operationOptions: [
        {
          name: "删除",
          func: this.handleDel,
          hidden: !hasPermissions("sys_file_del"),
          disabled: false,
        },
        {
          name: "下载",
          func: this.download,
          disabled: false,
        },
      ],
    };
  },
  methods: {
    getFilePage,
    handleDel(row) {
      this._handleComfirm(row.id, delFileById, "删除文件");
    },
    download(row) {
      downloadUrl(row.bucketName + "-" + row.fileName, row.original);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>