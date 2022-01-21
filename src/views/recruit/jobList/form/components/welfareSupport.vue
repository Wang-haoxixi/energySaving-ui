<template>
  <div class="welfare-supportList">
    <el-checkbox-group v-model="list">
      <!-- 选项 -->
      <el-checkbox
        :label="item.id"
        v-for="(item, index) in welfareList"
        :key="`w-${index}`"
      >{{item.name}}</el-checkbox>
      <el-checkbox :label="item.id" v-for="(item, index) in otherWelfareList" :key="`o-${index}`">
        <el-tag closable type="info" @close.stop="handleClose(item, index)">{{item.name}}</el-tag>
      </el-checkbox>
      <div class="input">
        <iep-button v-if="!isInput" @click="handleClick">
          <i class="el-icon-edit"></i> 添加其他
        </iep-button>
        <el-input
          v-else
          ref="input"
          v-model="input"
          placeholder="请输入福利信息"
          maxlength="10"
          @blur="handleBlur"
          @keyup.enter.native="handleBlur"
        ></el-input>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
import { getWelfare } from "@/api/dms/recruit";
import { mapGetters } from "vuex";
import { createWelfare, deleteWelfare } from "@/api/dms/recruit";

export default {
  name: "WelfareSupportList",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    type: {
      default: 0,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    list: {
      get() {
        // 因为福利可能被删除,首先要进行数据的筛选操作
        if (this.welfareList.length > 0 || this.otherWelfareList.length > 0) {
          const ids = this.welfareList
            .concat(this.otherWelfareList)
            .map(m => m.id);
          const list = this.value.filter(val => {
            return ids.indexOf(val) > -1;
          });
          return list;
        } else {
          return [...this.value];
        }
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data() {
    return {
      welfareList: [],
      otherWelfareList: [],
      input: "",
      isInput: false,
    };
  },
  methods: {
    handleClick() {
      this.isInput = !this.isInput;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleBlur() {
      if (this.input) {
        const id = this.validateDuplicate(this.input);
        if (id) {
          this.list.push(id);
          this.$set(this, "list", this.list);
          this.isInput = false;
        } else {
          createWelfare({
            name: this.input,
            orgId: this.userInfo.orgId,
            type: this.type,
          }).then(({ data }) => {
            this.isInput = false;
            if (data) {
              this.otherWelfareList.push({
                id: data,
                name: this.input,
              });
              this.list.push(data);
              this.$set(this, "list", this.list);
            }
            this.input = "";
          });
        }
      } else {
        this.isInput = false;
      }
    },
    validateDuplicate(val) {
      for (const item of this.otherWelfareList.concat(this.welfareList)) {
        if (item.name === val) {
          return item.id;
        }
      }
      return false;
    },
    // 获取福利接口
    getWelfare() {
      getWelfare({
        orgId: this.userInfo.orgId,
        type: this.type,
      }).then(({ data }) => {
        // 因为福利可能被删除,首先要进行数据的筛选操作
        if (this.list.length > 0) {
          const ids = data.map(m => m.id);
          this.list = this.list.filter(val => {
            return ids.indexOf(val) > -1;
          });
        }
        // 处理数据，将公共的数据和so的数据分离
        for (const item of data) {
          if (item.orgId === 0) {
            this.welfareList.push(item);
          } else {
            this.otherWelfareList.push(item);
          }
        }
      });
    },
    // 删除
    handleClose(row, index) {
      deleteWelfare({
        id: row.id,
      }).then(({ data }) => {
        if (data) {
          this.otherWelfareList.splice(index, 1);
          setTimeout(() => {
            const ids = this.welfareList
              .concat(this.otherWelfareList)
              .map(m => m.id);
            this.list = this.list.filter(val => {
              return ids.indexOf(val) > -1;
            });
          }, 100);
        }
      });
    },
  },
  created() {
    this.getWelfare();
  },
};
</script>

<style lang="scss" scoped>
.welfare-supportList {
  .input {
    width: 180px;
    display: inline-block;
    // margin-left: 20px;
  }
}
</style>
