<template>
  <iep-dialog :dialog-show="dialogShow" title="关联元素" width="900px" @close="_close()">
    <div class="content">
      <!-- 左侧关联元素类型 -->
      <div class="meun-list">
        <div
          class="menu-item"
          :class="{'select': item.value === activeName}"
          v-for="(item, index) in tabList"
          :key="index"
          @click="handleSelect(item.value)"
        >
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </div>
      <!-- 右侧关联元素列表 -->
      <div class="table-list" v-loading="isLoadTable">
        <!-- 材料 -->
        <div class="table-content-item material" v-if="activeName === 'material'">
          <el-checkbox-group v-model="materialList" class="table-content">
            <div class="item" v-for="(item, index) in pagedTable" :key="index">
              <el-checkbox
                class="material-checkbox"
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'materialDataList', id: 'id', name: 'materialName'})"
              >{{item.materialName}}</el-checkbox>
              <div class="icon">
                <i class="el-icon-woneng-yanjing1"></i>
                <span>{{item.views}}</span>
              </div>
              <div class="icon">
                <i class="el-icon-woneng-xiazai2"></i>
                <span>{{item.downloadTimes}}</span>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 纪要 -->
        <div class="table-content-item material" v-if="activeName === 'summary'">
          <div class="file-tpl">
            <div class="file-item" @click="summaryLoad('personal')">我发布的</div>
            <div class="file-item" @click="summaryLoad('involved')">我参与的</div>
            <div class="file-item" @click="summaryLoad('received')">我收到的</div>
          </div>
          <el-checkbox-group v-model="summaryList" class="table-content">
            <div class="item" v-for="(item, index) in pagedTable" :key="index">
              <el-checkbox
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'summaryDataList', id: 'id', name: 'title'})"
              >{{item.title}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 问卷 -->
        <div class="table-content-item questionnaire" v-if="activeName === 'questionnaire'">
          <el-checkbox-group v-model="questionnaireList" class="table-content">
            <div class="item" v-for="(item, index) in pagedTable" :key="index">
              <el-checkbox
                class="questionnaire-checkbox"
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'questionnaireDataList', id: 'id', name: 'name'})"
                :title="item.name"
              >{{item.name}}</el-checkbox>
              <div class="icon">
                <i class="el-icon-woneng-duoren"></i>
                <span>{{item.joinPeople}}</span>
              </div>
              <div class="time">
                <div class="time-content" v-if="!item.startTime">长期有效</div>
                <div
                  class="time-content"
                  v-else
                >{{item.startTime|parseToDay}}至{{item.endTime|parseToDay}}</div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 活动 -->
        <div class="table-content-item activity" v-if="activeName === 'activity'">
          <el-checkbox-group v-model="activityList" class="table-content">
            <div class="item" v-for="(item, index) in pagedTable" :key="index">
              <el-checkbox
                class="activity-checkbox"
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'activityDataList', id: 'id', name: 'name'})"
              >{{item.name}}</el-checkbox>
              <div class="time">
                <div class="time-content">{{item.startTime|parseToDay}}至{{item.endTime|parseToDay}}</div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="footer">
        <div class="total">
          <span>已选</span>
          <span class="number">{{this[`${activeName}List`].length}}</span>
          <span>条</span>
        </div>
        <el-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :current-page.sync="pageOption.current"
          layout="prev, pager, next, total"
          :total="pagination.total"
        ></el-pagination>
        <iep-button
          type="primary"
          :loading="loadState"
          @click="handleSubmit"
          class="submit-button"
        >确认</iep-button>
      </div>
    </template>
  </iep-dialog>
</template>

<script>
import { tabList } from "./options";
import mixins from "@/mixins/mixins";
import { fetchAllPage as getMaterialPage } from "@/api/dms/material";
import {
  fetchPersonalPage,
  fetchInvolvedPage,
  fetchReceivedPage,
} from "@/api/dms/meeting_summary";
import { getManagePage as getQuestionnairePage } from "@/api/qms/questionnaire";
import { getActivitiePage } from "@/api/meetting/publish";

export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      loadState: false,
      tabList,
      activeName: tabList[0].value,
      materialList: [],
      materialDataList: [],
      summaryList: [],
      summaryDataList: [],
      questionnaireList: [],
      questionnaireDataList: [],
      activityList: [],
      activityDataList: [],
    };
  },
  methods: {
    open(list = {}) {
      for (const key in list) {
        this[`${key}List`] = list[key].map(m => m.id);
        this[`${key}DataList`] = list[key];
      }
      this.dialogShow = true;
      this.loadPage();
    },
    loadPage() {
      this[`${this.activeName}Load`]();
    },
    _close() {
      this.dialogShow = false;
    },
    handleSubmit() {
      this.$emit(
        "relation-submit",
        {
          material: this.materialDataList,
          summary: this.summaryDataList,
          questionnaire: this.questionnaireDataList,
          activity: this.activityDataList,
        },
        {
          material: this.materialList,
          summary: this.summaryList,
          questionnaire: this.questionnaireList,
          activity: this.activityList,
        },
      );
      this._close();
    },
    handleSelect(val) {
      this.activeName = val;
      this.loadPage();
    },
    // 获取材料
    materialLoad(id = this.searchForm.materialLevelId) {
      if (this.searchForm.materialLevelId !== id) {
        this.pageOption.current = 1;
        this.searchForm.materialLevelId = id;
      }
      const param = { ...this.searchForm };
      this.loadTable(param, getMaterialPage);
    },
    // 获取纪要
    summaryLoad(type = this.searchForm.fnType) {
      const requestFn = {
        personal: fetchPersonalPage, // 我发布的
        involved: fetchInvolvedPage, // 我参与的
        received: fetchReceivedPage, // 我收到的
      };
      if (!type) type = "personal";
      if (this.searchForm.fnType !== type) {
        this.pageOption.current = 1;
        this.searchForm.fnType = type;
      }
      const param = { ...this.searchForm };
      this.loadTable(param, requestFn[type]);
    },
    // 获取问卷
    questionnaireLoad() {
      const param = { ...this.searchForm };
      this.loadTable(param, getQuestionnairePage);
    },
    // 获取活动
    activityLoad() {
      const param = { ...this.searchForm };
      this.loadTable(param, getActivitiePage);
    },
    dataSelect(row, obj) {
      for (const index in this[obj.list]) {
        if (row.id === this[obj.list][index].id) {
          this[obj.list].splice(index, 1);
          return;
        }
      }
      this[obj.list].push({ id: row[obj.id], name: row[obj.name] });
    },
  },
  watch: {
    // activeName(val) {
    //   this[`${val}Load`]();
    // },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .meun-list {
    width: 140px;
    min-width: 140px;
    .menu-item {
      position: relative;
      margin: 26px 0;
      padding-left: 35px !important;
      font-size: 14px;
      cursor: pointer;
      i {
        margin-right: 5px;
        width: 25px;
        font-size: 18px;
      }
      span {
        width: 30px;
      }
    }
    .select {
      color: $--color-primary;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background: #f74337;
        border-radius: 2px;
      }
    }
  }
  .table-list {
    flex: 1;
    height: 450px;
    .table-content-item {
      display: flex;
      width: 100%;
      .file-tpl {
        width: 200px;
        padding: 20px 0 0 20px;
        .file-item {
          padding: 4px 20px 10px 5px;
          height: 14px;
          line-height: 14px;
          border: 0;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .table-content {
        flex: 1;
        padding: 20px 0 0 20px;
        border-left: 1px solid $--border-color;
        height: 430px;
        .item {
          height: 44px;
          display: flex;
          .material-checkbox {
            width: 305px;
          }
          .activity-checkbox {
            width: 488px;
          }
          .questionnaire-checkbox {
            width: 380px;
          }
          &::v-deep .el-checkbox {
            padding-right: 30px;
            height: 30px;
            .el-checkbox__input {
              margin-top: -7px;
            }
            .el-checkbox__label {
              width: calc(100% - 17px);
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }
          }
          .icon {
            width: 70px;
            color: #babec0;
            i {
              margin-right: 5px;
            }
            span {
              font-size: 14px;
              color: $--color-text-secondary;
            }
          }
          .time {
            margin-right: 20px;
            width: 150px;
            text-align: right;
            color: $--color-text-secondary;
            .time-content {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  .total {
    color: $--color-text-regular;
    line-height: 38px;
    margin-right: 20px;
    .number {
      color: $--color-primary;
    }
  }
}
.submit-button {
  color: #ffffff;
  background-color: #f74437;
  border-color: #f74437;
}
</style>
