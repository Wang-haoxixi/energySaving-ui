<template>
  <div class="map-select-content">
    <el-select v-model="v" placeholder="请选择" class="map-select">
      <el-option
        v-for="(item, index) in options"
        :key="item.id"
        :value="item.address"
        :label="item.address"
      >
        <div class="map-select-option">
          <div class="label" :title="item.address">{{item.address}}</div>
          <div class="button-list">
            <el-button type="text" style="color: #999;" @click.stop="handleDelete(item, index)">删除</el-button>
            <el-button type="text" @click.stop="handleUpdate(item, index)">编辑</el-button>
          </div>
        </div>
      </el-option>
      <el-option value="-1">
        <div class="map-select-create" @click.stop="handleClick">
          <i class="el-icon-woneng-jiahao"></i>添加新的工作地点
        </div>
      </el-option>
    </el-select>
    <MapDialog ref="map" @close="handleClose"></MapDialog>
  </div>
</template>

<script>
import MapDialog from "./map/dialog";
import { getAddressByOrgId, addressDelete } from "@/api/dms/recruit";
import { mapGetters } from "vuex";
export default {
  components: { MapDialog },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          detailedAddress: "",
        };
      },
    },
    workplace: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    v: {
      get() {
        return this.value.detailedAddress;
      },
      set(val) {
        for (const item of this.options) {
          if (item.address === val) {
            item.detailedAddress = item.address;
            this.$emit("input", item);
            break;
          }
        }
      },
    },
  },
  data() {
    return {
      options: [],
    };
  },
  methods: {
    handleClick() {
      this.$refs.map.open({ workplace: this.workplace });
    },
    // 获取地址列表
    getAddress(row = {}) {
      getAddressByOrgId(this.userInfo.orgId).then(({ data }) => {
        this.options = [...data];
        if (row.id) {
          this.$nextTick(() => {
            this.v = row.address;
          });
        }
      });
    },
    handleClose(row) {
      this.getAddress(row);
    },
    handleDelete(row, index) {
      addressDelete({
        id: row.id,
      }).then(({ data }) => {
        if (data) {
          this.options.splice(index, 1);
        }
      });
    },
    handleUpdate(row) {
      this.$refs.map.open(row);
    },
  },
  created() {
    this.getAddress();
  },
};
</script>

<style lang="scss" scoped>
.map-select-content {
  width: 100%;
}
.map-select-option {
  display: flex;
  justify-content: space-between;
  .label {
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    padding-right: 10px;
  }
}
.map-select-create {
  text-align: center;
  color: $--color-text-secondary;
  cursor: pointer;
  font-size: 12px;
}
</style>