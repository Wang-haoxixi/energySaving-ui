<template>
  <div class="chosen-user">
    <div class="tag-list" v-if="!isHover">
      <el-tag
        :key="index"
        v-for="(item, index) in chosenUserList"
        closable
        :disable-transitions="false"
        @close="handleClose(index)"
      >{{item.realName}}</el-tag>
    </div>
    <el-popover placement="bottom" width="200" trigger="hover">
      <div class="content" id="task_chosen_user_content">
        <div class="head">
          <el-input placeholder="搜索协作人" v-model="userName"></el-input>
        </div>
        <div class="list" v-infinite-scroll="loadData">
          <el-checkbox-group v-model="chosenUser">
            <div
              class="item"
              v-for="(item, index) in userList"
              :key="index"
              @click="handleChosen(item)"
            >
              <el-checkbox :label="item.userId">
                <iep-img class="avatar" :src="item.avatar" :resizeOpt="{l:30}"></iep-img>
                <div class="name">{{item.realName}}</div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="reference" class="button">
        <i class="el-icon-plus"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getUserPage } from "@/api/admin/app";

export default {
  props: {
    orgId: {
      default: 0,
    },
    value: {
      type: Array,
      default: () => [],
    },
    isHover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    chosenUser: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data() {
    return {
      chosenUserList: [],
      inputVisible: false,
      inputValue: "",
      userList: [],
      pageParams: {
        current: 1,
        size: 10,
      },
      userName: "",
    };
  },
  methods: {
    handleClose(index) {
      const userId = this.chosenUserList[index].userId;
      const list = [...this.value];
      for (const i in list) {
        if (userId === list[i]) {
          list.splice(i, 1);
          break;
        }
      }
      this.chosenUserList.splice(index, 1);
      this.$emit("input", list);
    },
    loadData() {
      this.pageParams.current += 1;
      this.getUserPage();
    },
    getUserPage() {
      getUserPage(
        Object.assign(
          {},
          {
            orgId: this.orgId,
          },
          this.pageParams,
        ),
      ).then(({ data }) => {
        this.userList = this.userList.concat(data.result.records);
      });
    },
    handleChosen(row) {
      setTimeout(() => {
        // 判断数组中是否存在此条数据，若无，插入，反之，删除
        if (this.chosenUserList.length === this.chosenUser.length) {
          this.$emit("return_user_list", this.chosenUserList);
          return;
        } else if (this.chosenUserList.length < this.chosenUser.length) {
          this.$emit("return_user_list", this.chosenUserList);
          this.chosenUserList.push(row);
        } else {
          for (const index in this.chosenUserList) {
            const item = this.chosenUserList[index];
            if (row.userId === item.userId) {
              this.chosenUserList.splice(index, 1);
              this.$emit("return_user_list", this.chosenUserList);
              return;
            }
          }
        }
      });
    },
  },
  watch: {
    orgId(val) {
      this.pageParams.current = 1;
      this.userList = [];
      this.chosenUserList = [];
      this.$emit("input", []);
      if (val) {
        this.getUserPage();
      }
    },
    userName(val) {
      setTimeout(() => {
        this.userList = [];
        this.pageParams.current = 1;
        this.pageParams.realName = val;
        this.getUserPage();
      }, 800);
    },
  },
};
</script>

<style lang="scss" scoped>
.chosen-user {
  margin-left: -10px;
  padding: 0;
  .tag-list {
    display: inline-block;
  }
  &::v-deep .el-tag {
    border: 0;
    background-color: #fff;
    .el-icon-close {
      transform: scale(0.8);
      background-color: #babec0;
      color: #fff;
      line-height: 17px;
      margin-top: -12px;
    }
  }
  .button {
    display: inline-block;
    margin-left: 10px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    color: $--color-text-regular;
    background-color: $--background-color;
    border: 0;
    text-align: center;
    cursor: pointer;
  }
}
#task_chosen_user_content {
  padding: 10px 0 0;
  .head {
    margin-bottom: 20px;
  }
  .list {
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: scroll;
    .item {
      margin-bottom: 5px;
      &:last-of-type {
        margin: 0;
      }
      display: flex;
      &::v-deep .el-checkbox__input {
        line-height: 40px;
      }
      &::v-deep .el-checkbox {
        display: flex;
        width: 100%;
        .el-checkbox__label {
          width: calc(100% - 20px);
          display: flex;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 8px;
          }
          .name {
            padding-left: 15px;
            line-height: 30px;
            width: calc(100% - 30px);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
