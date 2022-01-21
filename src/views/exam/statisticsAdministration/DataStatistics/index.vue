<template>
  <div>
    <iep-basic-container>
      <div class="stat_header">
        <div class="stat_header_child">
          <div>{{headerData.试题数}}</div>
          <div>试题数</div>
        </div>
        <div class="stat_header_child">
          <div>{{headerData.试卷数}}</div>
          <div>试卷数</div>
        </div>
        <div class="stat_header_child">
          <div>{{headerData.证书数}}</div>
          <div>证书数</div>
        </div>
        <div class="stat_header_child">
          <div>{{headerData.考试次数}}</div>
          <div>考试次数</div>
        </div>
        <div class="stat_header_child">
          <div>{{headerData.考试人数}}</div>
          <div>考试人数</div>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>试题类型</h3>
        </el-col>
        <el-col :span="12">
          <h3>试题难度</h3>
        </el-col>
        <el-col :span="12">
          <iep-charts class="echarts" :options="options" autoresize />
        </el-col>
        <el-col :span="12">
          <iep-charts class="echarts" :options="optionTwo" autoresize />
        </el-col>
        <el-col :span="12">
          <h3>考试排名</h3>
        </el-col>
        <el-col :span="12">
          <h3>证书排名</h3>
        </el-col>
        <el-col :span="12">
          <div
            v-for="(item,index) in examRank"
            :key="index"
            :style="index < 3 ? 'display: inline-block;width: 33.3%;': ''"
          >
            <div v-if="index < 3" class="sta_ranking">
              <div class="rank-wrap">
                <span>{{item.no}}</span>
                <i class="rank-icon el-icon-woneng-gerenzhanji_tieyou"></i>
              </div>
              <iep-img class="img" :src="item.avatar" :resizeOpt="{l:80}"></iep-img>
              <div>{{ item.realName }}</div>
              <div class="ranking_num">{{ item.number }}</div>
            </div>
            <div v-else class="rank_main">
              <div class="rank_main_title">
                <div>
                  <span>{{ item.no }}</span>
                  <span>{{ item.realName }}</span>
                </div>
                <div class="ranking_num">{{ item.number }}</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div
            v-for="(item,index) in certRank"
            :key="index"
            :style="index < 3 ? 'display: inline-block;width: 33.3%;': ''"
          >
            <div v-if="index < 3" class="sta_ranking">
              <div class="rank-wrap">
                <span>{{item.no}}</span>
                <i class="rank-icon el-icon-woneng-gerenzhanji_tieyou"></i>
              </div>
              <iep-img class="img" :src="item.avatar" :resizeOpt="{l:80}"></iep-img>
              <div>{{ item.realName }}</div>
              <div class="ranking_num">{{ item.number }}</div>
            </div>
            <div v-else class="rank_main">
              <div class="rank_main_title">
                <div>
                  <span>{{ item.no }}</span>
                  <span>{{ item.realName }}</span>
                </div>
                <div class="ranking_num">{{ item.number }}</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <h3>最近一年考试数据分析</h3>
        </el-col>
        <el-col :span="24" style="padding: 30px;height: 400px;">
          <iep-charts class="echarts" :options="optionThre" autoresize />
        </el-col>
      </el-row>
    </iep-basic-container>
  </div>
</template>
<script>
import _ from "lodash";
import {
  getExamHeader,
  getExamChart,
  getExamTopUser,
  getCertTopUser,
  getExamTimeChart,
} from "@/api/exam/exam_statistics";
import { genOptions, bOption } from "./options";
import { typeMap } from "../options";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headerData: {
        考试次数: 0,
        考试人数: 0,
        证书数: 0,
        试卷数: 0,
        试题数: 0,
      },
      examEchart: [],
      examEchart1: [],
      month: [],
      examNumber: [],
      takeNumber: [],

      examRank: [],
      certRank: [],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    prefixUrl() {
      return this.isPlatform ? "/yyexam" : "/exam";
    },
    suffer() {
      return typeMap[this.currentMenuGroup.id];
    },
    options() {
      return genOptions(this.examEchart);
    },
    optionTwo() {
      return genOptions(this.examEchart1);
    },
    optionThre() {
      return bOption(this.month, this.takeNumber, this.examNumber);
    },

    exam_question_type() {
      const typeMap = this.dictGroup.get("exam_question_type");
      return _(typeMap).keyBy("value").mapValues("label").value();
    },
    exam_difficulty() {
      const typeMap = this.dictGroup.get("exam_difficulty");
      return _(typeMap).keyBy("value").mapValues("label").value();
    },
  },
  created() {
    this.loadDataHeader();
    this.loadDataChart();
    this.loadExamRank();
    this.loadCertRank();
    this.loadExamTimeChart();
  },
  methods: {
    async loadDataHeader() {
      const { data } = await getExamHeader(this.suffer);
      this.headerData = data;
    },
    async loadDataChart() {
      const { data } = await getExamChart(this.suffer);
      this.examEchart = data[0].map((m) => {
        return {
          ...m,
          name: this.exam_question_type[m.name],
        };
      });
      this.examEchart1 = data[1].map((m) => {
        return {
          ...m,
          name: this.exam_difficulty[m.name],
        };
      });
    },
    async loadExamRank() {
      const { data } = await getExamTopUser(this.suffer);
      this.examRank = data;
    },
    async loadCertRank() {
      const { data } = await getCertTopUser(this.suffer);
      this.certRank = data;
    },
    async loadExamTimeChart() {
      const { data } = await getExamTimeChart(this.suffer);
      this.month = data.month;
      this.examNumber = data.examNumber;
      this.takeNumber = data.takeNumber;
    },
  },
};
</script>
<style lang="scss" scoped>
.stat_header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba($color: #ccc, $alpha: 0.2);
  padding: 20px 10px;
  border-radius: 10px;
  .stat_header_child {
    text-align: center;
  }
}
h3 {
  padding: 30px 10px;
  font-size: 16px;
  font-weight: 500;
}
.sta_ranking {
  width: 150px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  .img ::v-deep .el-image__inner {
    border-radius: 10px;
    border: 1px solid $--border-color;
  }
  .rank-wrap {
    position: relative;
    span {
      position: absolute;
      top: 8px;
      left: 70px;
      color: #fff;
    }
  }
  .rank-icon {
    color: rgba(243, 211, 30, 0.925);
    font-size: 30px;
  }
}
.ranking_num {
  color: $--color-primary;
}
.rank_main {
  padding: 20px;
  width: 450px;
  span:first-child {
    display: inline-block;
    border: 1px solid rgba($color: #ccc, $alpha: 0.7);
    padding: 0 5px;
    border-radius: 5px;
    margin-right: 40px;
  }
}
.rank_main_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.echarts {
  margin: 0 auto -120px;
  width: 100%;
}
</style>
