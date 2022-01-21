<template>
  <div class="search-form-content">
    <div class="head">
      <el-button type="primary" @click="handleClear">重新选择</el-button>
    </div>
    <div class="search-form">
      <!-- 任务名称 -->
      <div class="search-item">
        <div class="label">任务名称：</div>
        <div class="span">
          <el-input v-model="formData.name" placeholder="请输入任务名称"></el-input>
        </div>
      </div>
      <!-- 选择组织 -->
      <div class="search-item">
        <div class="label">所属组织：</div>
        <div class="span">
          <el-select
            v-model="formData.orgId"
            filterable
            placeholder="请选择"
            remote
            :remote-method="remoteMethod"
            @visible-change="handleChange"
          >
            <el-option
              v-for="item in orgList"
              :key="item.orgId"
              :label="item.name"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="search-title">状态</div>
      <!-- 全部任务 -->
      <div class="search-item search-type">
        <div class="type" @click="handleType('all')" :class="{'chosen': chosenAll}">
          <div class="number all">{{total.total}}</div>
          <div class="word">全部任务</div>
        </div>
        <div class="type" @click="handleType('notFinish')" :class="{'chosen': formData.type === 1}">
          <div class="number not-finish">{{total.overdueTask}}</div>
          <div class="word">逾期未完成</div>
        </div>
      </div>
      <!-- 任务状态 -->
      <div class="search-item">
        <div
          class="state"
          :class="{'chosen': formData.state === item.value}"
          @click="handleStateTask(item.value)"
          v-for="(item, index) in stateTask"
          :key="index"
        >{{item.name}}</div>
      </div>
      <div class="search-title">相关性</div>
      <!-- 个人状态 -->
      <div class="search-item">
        <div
          class="state"
          :class="{'chosen': formData.status === item.value}"
          @click="handleStatus(item.value)"
          v-for="(item, index) in statusTask"
          :key="index"
        >{{item.name}}</div>
      </div>
      <!-- 排序 -->
      <div class="search-item">
        <el-dropdown class="org-dropdown">
          <span class="el-dropdown-link">
            {{formData.sort | getSortName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in sortList"
              :key="item.value"
              @click.native="()=>{formData.sort = item.value}"
            >{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserHadList } from "@/api/admin/org";
import { stateTask, statusTask, initSearchData, sortList } from "./options";

let comDate = setTimeout(() => {});
const allOrg = {
  orgId: "all",
  name: "全部组织",
};

export default {
  data() {
    return {
      total: {
        total: 0,
        overdueTask: 0,
      },
      sortList,
      stateTask,
      statusTask,
      orgList: [],
      orgRealList: [],
      formData: initSearchData(),
      chosenAll: false,
      comDate: false,
      isclear: false,
    };
  },
  filters: {
    getSortName(val) {
      return sortList.filter((m) => m.value === val)[0].label;
    },
  },
  methods: {
    // 获取当前用户SO列表
    getUserHadList() {
      getUserHadList().then(({ data }) => {
        this.orgList = [...data];
        this.orgList.splice(0, 0, allOrg);
        this.orgRealList = [...data];
      });
    },
    /**
     * 任务状态 - type
     *
     * 选中全部任务时，将进行状态去除，相关性选中全部
     * 选中逾期未完成时，将进行状态去除，相关性不变
     */
    handleType(type) {
      if (type === "all") {
        this.chosenAll = true;
        this.formData.state = "";
        this.formData.status = 0;
        this.$set(this.formData, "type", 0);
      } else {
        this.chosenAll = false;
        this.formData.state = "";
        this.$set(this.formData, "type", 1);
      }
    },
    /**
     * 任务进行状态 - state
     *
     * 变更时将清空状态值
     */
    handleStateTask(value) {
      if (value === this.formData.state) {
        value = "";
      }
      this.chosenAll = false;
      this.formData.type = "";
      this.$set(this.formData, "state", value);
    },
    /**
     * 相关性 - status
     *
     * 变更时将状态中全部任务去除
     */
    handleStatus(value) {
      if (value === this.formData.status) {
        value = "";
      }
      this.chosenAll = false;
      this.$set(this.formData, "status", value);
    },
    // 延时搜索
    setDataComputed() {
      clearTimeout(comDate);
      comDate = setTimeout(() => {
        this.comDate = true;
      }, 1000);
    },
    handleClear() {
      this.formData = initSearchData();
    },
    loadPage() {
      const row = { ...this.formData };
      if (row.orgId === "all") {
        delete row.orgId;
      }
      for (const key in row) {
        if (row[key] === "") {
          delete row[key];
        }
      }
      this.$emit("search_page", row);
      this.comDate = false;
    },
    // 远程查询so
    remoteMethod(query) {
      if (query === "") {
        this.orgList = [...this.orgRealList];
      } else {
        this.orgList = this.orgRealList.filter(
          (m) => m.name.indexOf(query) >= 0,
        );
      }
      this.orgList.splice(0, 0, allOrg);
    },
    handleChange(type) {
      if (type) {
        this.orgList = [...this.orgRealList];
        this.orgList.splice(0, 0, allOrg);
      }
    },
  },
  created() {
    this.getUserHadList();
    this.loadPage();
  },
  watch: {
    formData: {
      handler() {
        this.comDate = false;
        this.setDataComputed();
      },
      deep: true,
    },
    comDate(val) {
      if (val) {
        this.loadPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form-content {
  .head {
    margin-bottom: 20px;
  }
  .search-form {
    .search-title {
      color: $--color-text-secondary;
      margin-bottom: 20px;
    }
    .search-item {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .org-dropdown {
        cursor: pointer;
      }
      .state {
        width: 25%;
        border-radius: 10px;
        font-size: 14px;
        color: $--color-text-regular;
        text-align: center;
        padding: 6px;
        cursor: pointer;
        border: 1px solid rgba(239, 240, 241, 1);
        &:hover {
          background-color: $--color-primary;
          border-color: $--color-primary;
          color: #fff;
        }
      }
      .chosen {
        // color: rgba(247, 68, 55, 1);
        color: $--color-primary;
        // background: rgba(247, 68, 55, 0.1);
        background: $--color-fifth;
        border: 0;
        &:hover {
          border: 0;
        }
      }
      .label {
        width: 70px;
        line-height: 36px;
      }
      .span {
        width: calc(100% - 70px);
      }
    }
    .search-type {
      display: flex;
      justify-content: space-between;
      .el-dropdown-link {
        cursor: pointer;
      }
      .type {
        width: 90px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(239, 240, 241, 1);
        border-radius: 10px;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        .number {
          font-size: 24px;
          font-weight: 400;
          line-height: 24px;
          margin-bottom: 10px;
        }
        .all {
          // color: rgba(60, 212, 137, 1);
        }
        .no-finish {
          color: rgba(247, 68, 55, 1);
        }
      }
      .chosen {
        // color: rgba(247, 68, 55, 1);
        color: $--color-primary;
        // background: rgba(247, 68, 55, 0.1);
        background: $--color-fifth;
        // border-color: rgba(247, 68, 55, 0.1);
        border-color: $--color-fifth;
      }
    }
  }
}
</style>
