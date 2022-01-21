<template>
  <div class="talent-card">
    <div class="title">我为组织招人才</div>
    <div class="search">
      <el-select
        v-model="soValue"
        placeholder="请选择"
        :disabled="list.length === 0"
        @change="handleChange"
      >
        <el-option v-for="item in list" :key="item.orgId" :label="item.name" :value="item.orgId"></el-option>
      </el-select>
    </div>
    <div v-if="list.length > 0">
      <div v-if="soValue">
        <div class="title">在招职位</div>
        <div class="list" v-if="jobList.length > 0">
          <div class="item" v-for="item in jobList" :key="item.id">
            <div class="name">{{item.name}}</div>
            <div class="button" @click="topRecruitById(item.recruitId)">刷新职位</div>
          </div>
        </div>
        <div class="no-job" v-else @click="handleCreate">该组织下暂无在招职位，去发布新职位吧>></div>
      </div>
      <div class="no-chosen" v-else>请先选择组织</div>
    </div>
    <div class="link" v-else @click="handleCreateSo">请先创建组织再来招聘人才吧>></div>
  </div>
</template>

<script>
import { getUserManageOrgList } from "@/api/admin/org";
import { getRecruitPageByOrgId, topRecruitById } from "@/api/dms/recruit";

export default {
  data() {
    return {
      soValue: "",
      list: [],
      jobList: [],
    };
  },
  methods: {
    getOrgList() {
      getUserManageOrgList({
        size: 9999,
      }).then(({ records }) => {
        this.list = [...records];
      });
    },
    handleChange(val) {
      this.$emit("changeSo", val);
      getRecruitPageByOrgId({
        size: 9999,
        orgId: val,
        state: 0,
      }).then(({ data }) => {
        this.jobList = [...data.records].map((m) => {
          const list = m.name.split("-");
          m.name = list[list.length - 1];
          return m;
        });
      });
    },
    topRecruitById(id) {
      topRecruitById({
        recruitIds: [id],
        type: "top",
      }).then(({ data }) => {
        if (data) {
          this.$message.success("职位刷新成功！");
        }
      });
    },
    handleCreate() {
      this.$router.push("/recruit/job_create");
    },
    handleCreateSo() {
      this.$router.push("/my/create_org");
    },
    selectSo(val) {
      this.soValue = val;
      this.handleChange(val);
    },
  },
  created() {
    this.getOrgList();
  },
};
</script>

<style lang="scss" scoped>
.talent-card {
  display: inline-block;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  box-sizing: border-box;
  .title {
    color: $--color-text-primary;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .search {
    margin-bottom: 20px;
  }
  .list {
    margin-bottom: 20px;
    .item {
      justify-content: space-between;
      display: flex;
      margin-bottom: 20px;
      font-size: 14px;
      .name {
        color: $--color-text-regular;
        width: calc(100% - 80px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .button {
        cursor: pointer;
        color: $--color-secondary;
        cursor: pointer;
        width: 70px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .no-job {
    color: $--color-text-regular;
  }
  .link,
  .no-job {
    font-size: 14px;
    text-decoration: underline;
    color: $--color-secondary;
    cursor: pointer;
  }
}
</style>
