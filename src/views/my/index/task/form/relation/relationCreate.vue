<template>
  <div class="relation">
    <div class="head" id="search" v-show="isCreater">
      <el-input
        placeholder="搜索名称"
        v-model="searchValue"
        class="search"
        prefix-icon="el-icon-search"
        @keyup.enter.native="handleSubmit"
      >
        <template slot="prepend">
          <div class="add" @click="handleRelation">
            <i class="el-icon-woneng-jiahao"></i>选择关联元素
          </div>
        </template>
      </el-input>
    </div>
    <!-- 关联列表 - 新建 -->
    <div class="relation-list" v-show="!isSearch" v-if="isCreate">
      <div class="list">
        <div class="type-items" v-for="card in tabList" :key="card.value">
          <div
            class="item"
            v-for="(item, index) in list[card.value]"
            :key="`${card.value}-${index}`"
          >
            <div class="title">
              <i :class="card.icon"></i>
              <span>{{item.name}}</span>
            </div>
            <i
              class="icon el-icon-woneng-guanbihuozheshibaishixin"
              @click="handleDelete(index, card.value)"
            ></i>
          </div>
        </div>
      </div>
      <!-- <div class="no-data">暂无关联</div> -->
    </div>
    <!-- 关联列表 - 修改 -->
    <div class="relation-list" v-show="!isSearch" v-if="!isCreate">
      <div
        class="material card"
        v-for="card in tabList"
        :key="card.value"
        v-show="list[card.value].length > 0"
      >
        <div class="card-title">关联的{{card.name}}</div>
        <div
          class="item"
          v-for="(item, index) in list[card.value]"
          :key="`${card.value}-${index}`"
          @click="detailMaterial(item, card.value)"
        >
          <div class="title">
            <i :class="card.icon"></i>
            <span>{{item.name}}</span>
          </div>
          <i
            class="icon el-icon-woneng-guanbihuozheshibaishixin"
            @click.stop="handleDelete(index, card.value)"
            v-if="isCreater"
          ></i>
        </div>
      </div>
    </div>
    <!-- 搜索结果列表 -->
    <div class="search-list" v-show="isSearch">
      <div class="list-head">
        <!-- tab -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="item.name"
            :name="item.value"
            v-for="(item, index) in tabList"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
        <!-- 关闭按钮 -->
        <i class="el-icon-woneng-guanbihuozheshibai close" @click="handleClose"></i>
      </div>
      <div class="search-items">
        <!-- 材料 -->
        <div class="content-list material" v-if="activeName === 'material'">
          <el-checkbox-group
            v-model="formData.material"
            class="table-content"
            v-if="tabData['material'].length > 0"
          >
            <div class="item nowrap" v-for="(item, index) in tabData['material']" :key="index">
              <el-checkbox
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'material', id: 'id', name: 'materialName'})"
              >{{item.materialName}}</el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="no-data" v-else>暂无数据</div>
        </div>
        <!-- 纪要 -->
        <div class="content-list summary" v-if="activeName === 'summary'">
          <el-checkbox-group
            v-model="formData.summary"
            class="table-content"
            v-if="tabData['summary'].length > 0"
          >
            <div class="item nowrap" v-for="(item, index) in tabData['summary']" :key="index">
              <el-checkbox
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'summary', id: 'id', name: 'title'})"
              >{{item.title}}</el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="no-data" v-else>暂无数据</div>
        </div>
        <!-- 活动 -->
        <div class="content-list activity" v-if="activeName === 'activity'">
          <el-checkbox-group
            v-model="formData.activity"
            class="table-content"
            v-if="tabData['activity'].length > 0"
          >
            <div class="item nowrap" v-for="(item, index) in tabData['activity']" :key="index">
              <el-checkbox
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'activity', id: 'id', name: 'name'})"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="no-data" v-else>暂无数据</div>
        </div>
        <!-- 问卷 -->
        <div class="content-list questionnaire" v-if="activeName === 'questionnaire'">
          <el-checkbox-group
            v-model="formData.questionnaire"
            class="table-content"
            v-if="tabData['questionnaire'].length > 0"
          >
            <div class="item nowrap" v-for="(item, index) in tabData['questionnaire']" :key="index">
              <el-checkbox
                :label="item.id"
                @mouseup.native="dataSelect(item, {list: 'questionnaire', id: 'id', name: 'name'})"
              >{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 关联弹框 -->
    <RelationDialog ref="relation" :orgId="orgId" @relation-submit="relationSubmit"></RelationDialog>
  </div>
</template>

<script>
import { tabList, tabData, initParams, initList, routeList } from "./options";
import RelationDialog from "./relationDialog";
// 搜索接口
import { fetchSoPage as getMaterialPage } from "@/api/dms/material";
import { fetchPersonalPage as getSummaryPage } from "@/api/dms/meeting_summary";
import { getSoPage as getQuestionnairePage } from "@/api/qms/questionnaire";
import { getActivityPagePC } from "@/api/meetting/publish";

export default {
  components: { RelationDialog },
  props: {
    orgId: {
      default: 0,
    },
    // 是否为新建表单
    isCreate: {
      type: Boolean,
      default: false,
    },
    // 是否为创建者
    isCreater: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isSearch: false,
      searchValue: "",
      tabList,
      tabData,
      activeName: "material",
      params: initParams(),
      // 包含name和id的集合
      list: initList(),
      // 搜索用的纯id集合
      formData: initList(),
      searchFn: {
        material: getMaterialPage,
        summary: getSummaryPage,
        questionnaire: getQuestionnairePage,
        activity: getActivityPagePC,
      },
    };
  },
  methods: {
    initFormData() {
      const list = ["list", "formData"];
      for (const item of list) {
        for (const key in this[item]) {
          this[item][key] = [];
        }
      }
    },
    handleSubmit() {
      this.isSearch = true;
      this.handleClick();
    },
    handleClick() {
      const query = {
        material: {
          materialName: this.searchValue,
          orgId: this.orgId,
        },
        summary: {
          nowOrgId: this.orgId,
          title: this.searchValue,
        },
        activity: {
          name: this.searchValue,
          orgId: this.orgId,
        },
        questionnaire: {
          name: this.searchValue,
          orgId: this.orgId,
        },
      };
      this.searchFn[this.activeName](
        Object.assign({}, this.params[this.activeName], query[this.activeName]),
      ).then(({ data }) => {
        this.tabData[this.activeName] = data.records;
      });
    },
    handleRelation() {
      this.$refs.relation.open({
        activity: [...this.list.activity],
        material: [...this.list.material],
        questionnaire: [...this.list.questionnaire],
        summary: [...this.list.summary],
      });
    },
    handleClose() {
      this.isSearch = false;
    },
    // 关联提交
    relationSubmit(dataList, list) {
      this.list = { ...dataList };
      this.formData = { ...list };
      this.$emit("relation-change", true);
    },
    // 删除关联
    handleDelete(index, type) {
      this.list[type].splice(index, 1);
      this.$emit("relation-change", true);
    },
    dataSelect(row, obj) {
      for (const index in this.list[obj.list]) {
        if (row.id === this.list[obj.list][index].id) {
          this.list[obj.list].splice(index, 1);
          return;
        }
      }
      this.list[obj.list].push({ id: row[obj.id], name: row[obj.name] });
      this.$emit("relation-change", true);
    },
    detailMaterial(row, type) {
      this.$openPage(routeList[type] + row.id, 2);
    },
  },
  watch: {
    orgId(val) {
      // 监听orgId，当id变化的时候，将已经选中的关联元素清空
      if (this.isCreate || !val) {
        this.list = initList();
        this.searchValue = "";
        this.isSearch = false;
        this.formData = initList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.relation {
  width: 100%;
  .head {
    margin-bottom: 10px;
    .search {
      width: 100%;
      border: 1px solid $--border-color;
      border-radius: 10px;
    }
    &::v-deep .el-input-group__prepend {
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      border: 0;
      border-right: 1px solid #eff0f1;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        background-color: $--background-color;
      }
      .add {
        height: 34px;
        line-height: 34px;
        color: #babec0;
        i {
          margin-right: 5px;
          color: #babec0;
        }
      }
    }
  }
  #search {
    &::v-deep input {
      padding: 0 10px;
      font-size: 14px;
      text-indent: 2em;
      border: 0;
      .el-input__prefix {
        left: -10px;
      }
    }
  }
  .relation-list {
    .list {
      .item {
        display: flex;
        justify-content: space-between;
        .title {
          width: calc(100% - 30px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          color: $--color-text-secondary;
        }
        i {
          width: 20px;
          color: $--color-text-secondary;
          line-height: 36px;
          cursor: pointer;
        }
      }
    }
    .card {
      border: 1px solid #eff0f1;
      border-radius: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .card-title {
        font-size: 14px;
        color: #666769;
        padding: 17px 13px;
      }
      .item {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 5px 13px;
        .title {
          width: calc(100% - 30px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          color: $--color-text-secondary;
        }
        i {
          width: 20px;
          color: $--color-text-secondary;
          line-height: 18px;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
    .no-data {
      text-align: center;
      color: $--color-text-regular;
    }
  }
  .search-list {
    border: 1px solid $--border-color;
    border-radius: 10px;
    padding: 0 25px;
    .list-head {
      position: relative;
      .close {
        position: absolute;
        right: 0;
        top: 15px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .content-list {
      height: 200px;
      overflow-y: scroll;
      &::v-deep .el-checkbox__input {
        margin-top: -7px;
      }
      &::v-deep .el-checkbox__label {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        width: 340px;
      }
    }
  }
}
.no-data {
  color: $--color-text-secondary;
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
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
