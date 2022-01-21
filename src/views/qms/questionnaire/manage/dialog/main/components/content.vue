<template>
  <div class="content-wrapper" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="5" class="left">
        <left-content @scrollToBottom="scrollToBottom" :data="data" @choose="onChoose"></left-content>
      </el-col>
      <el-col :span="19" class="right iep-basic-scroll" ref="right">
        <!-- {{data}} -->
        <right-content
          :data="data"
          :form="form"
          ref="rightContent"
          @changeQuesData="changeQuesData"
          @scrollToBottom="scrollToBottom"
          @scrollToAnchor="scrollToAnchor"
        ></right-content>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LeftContent from "./leftContent";
import RightContent from "./rightContent";
import { getDataById } from "@/api/qms/questionnaire";
import { getMobileListById } from "@/api/qms/ques_mobile";
import { formInit } from "./const/base";
export default {
  components: {
    LeftContent,
    RightContent,
  },
  data() {
    return {
      loading: false,
      form: formInit(),
      data: [
        // {
        //   title: "结束语",
        //   type: "11",
        //   timeType: 1,
        //   logic: {},
        //   isShow: "1",
        //   optionList: [
        //     {
        //       name: "答卷成功，感谢您的帮助与支持！",
        //       type: 2,
        //     },
        //     {
        //       name: "",
        //       type: 2,
        //     },
        //   ],
        //   isRequire: "2",
        //   answer: {
        //     value: "",
        //   },
        // },
      ],
    };
  },
  methods: {
    async getData(id) {
      this.loading = true;
      const { data, code } = await getDataById(id);
      if (code === 0) {
        this.form = this.$mergeByFirst(formInit(), data);
        // 时间设置
        if (this.form.timeSetting === 2) {
          this.form.timeRange = [this.form.startTime, this.form.endTime];
        } else {
          this.form.timeRange = [];
        }
        if (this.form.isMobile === 1) {
          const res = await getMobileListById(id);
          if (res.data) {
            this.form.mobileList = res.data;
            this.form.mobileListText = res.data.join("/");
          }
        }
        this.data = this._jsonFarmater(data.quesQuestionDTO || []);
      }
      this.loading = false;
    },
    _jsonFarmater(row) {
      // 逻辑JSON格式化
      row = row.map((item) => {
        let logic = item.logic;
        if (logic) {
          if (logic.startsWith("{") && logic.endsWith("}")) {
            logic = JSON.parse(logic);
          } else {
            logic = {};
          }
        } else {
          logic = {};
        }
        item.logic = logic;
        return item;
      });
      return row;
    },
    submit() {
      // 未使用参数 row
      return this.$refs.rightContent.submit();
    },
    getQuesData() {
      this.data = this.$refs.rightContent.getQuesData();
    },
    getResult() {
      const form = Object.assign({}, this.$refs.rightContent.getResult());
      this.getQuesData();
      form.quesQuestionDTO = this.data;
      return form;
    },
    resetResult() {
      this.data = [];
    },
    clearForm() {
      this.form = formInit();
      this.$refs.rightContent.resetForm();
      this.data = [
        // {
        //   title: "结束语",
        //   type: "11",
        //   timeType: 1,
        //   logic: {},
        //   isShow: "1",
        //   optionList: [
        //     {
        //       name: "",
        //       type: 2,
        //     },
        //     {
        //       name: "",
        //       type: 2,
        //     },
        //   ],
        //   isRequire: "2",
        //   answer: {
        //     value: "",
        //   },
        // },
      ];
    },
    onChoose(row) {
      if (row.quesQuestionDTO) {
        this.data = row.quesQuestionDTO.map((m) => {
          m.logic = (m.logic && JSON.parse(m.logic)) || {};
          return m;
        });
      } else {
        this.data = [];
      }
    },
    changeQuesData(row) {
      this.data = row;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs["right"].$el;
        el.scrollTop = el.scrollHeight;
      });
    },
    scrollToAnchor(offsetTop) {
      this.$refs["right"].$el.scrollTop = offsetTop;
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  height: 600px;
  overflow-x: hidden;
}
</style>