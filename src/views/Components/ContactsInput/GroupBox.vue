<template>
  <div class="group iep-basic-scroll">
    <div class="title" @click="show = !show">
      <i v-if="!show" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      组织成员
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <iep-no-data v-if="!data.length"></iep-no-data>
        <el-tree
          v-else
          ref="tree"
          :data="data"
          :filter-node-method="filterNode"
          :default-expand-all="isExpand"
        >
          <div style="width: 100%;" slot-scope="{ node,data }">
            <div class="sub-tree-txt" v-if="!!data.count">
              <div class="sub-tree-txt-title">
                <span class="sub-tree-txt-name">{{ data.name }}</span>
                <span>({{ data.count }})</span>
              </div>
              <div class="button" @click.stop="handleSelectAll(data)">全选</div>
            </div>
            <AvatarItem
              v-else
              :item="data"
              @select="handleSelect"
              @unselect="handleUnSelect"
              :disabled="_selected(data.id)"
            ></AvatarItem>
          </div>
        </el-tree>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import AvatarItem from "./AvatarItem";
import { getMailList } from "@/api/admin/mail";
import { mapGetters } from "vuex";
export default {
  props: {
    selectedItemIds: {
      type: Array,
      default: () => [],
    },
  },
  inject: ["onlyOnlineOrg", "$computedOrgId"],
  components: {
    AvatarItem,
  },
  data() {
    return {
      data: [],
      show: true,
      isExpand: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    orgId() {
      return this.$computedOrgId();
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load(realName = "") {
      const { data } = await getMailList(realName);
      this.data = data;
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.filter();
          this.show = true;
          if (realName) {
            this.isExpand = false;
          } else {
            this.isExpand = true;
          }
          this.$refs.tree.store.defaultExpandAll = this.isExpand;
        }
      });
    },
    handleSelect(item) {
      this.$emit("select", item);
    },
    handleUnSelect(item) {
      this.$emit("unselect", item);
    },
    _selected(id) {
      return this.selectedItemIds.includes(id);
    },
    filterNode(label, data, node) {
      if (!this.onlyOnlineOrg) {
        return true;
      } else if (this.orgId) {
        if (node.parent) {
          if (node.parent.data.id === this.orgId) {
            return true;
          } else {
            return false;
          }
        } else {
          if (data.id === this.orgId) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        if (node.parent) {
          if (node.parent.data.id === this.userInfo.orgId) {
            return true;
          } else {
            return false;
          }
        } else {
          if (data.id === this.userInfo.orgId) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    handleSelectAll(list) {
      this.$emit("select-all", list.children);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contacts.scss";
</style>
