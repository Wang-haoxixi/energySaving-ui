<template>
  <div class="questionnaire-setting-wrapper">
    <p class="title">问卷设置</p>
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" refs="form">
      <el-form-item label="问卷名称：" prop="name">
        <el-input v-model.trim="form.name" :maxlength="50" placeholder="请输入问卷名称（最多输入50个字）"></el-input>
      </el-form-item>
      <el-form-item label="问卷描述：" prop="remarks">
        <el-input
          v-model="form.remarks"
          type="textarea"
          :maxlength="500"
          placeholder="请输入问卷描述（最多输入500个字）"
        ></el-input>
      </el-form-item>
      <el-form-item label="问卷范围：" prop="scope">
        <el-radio-group v-model="form.scope">
          <el-radio :label="item.value" :key="item.value" v-for="item in rangeData">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签：">
        <iep-tag-input v-model="form.tag"></iep-tag-input>
      </el-form-item>
      <el-form-item label="答卷宝贝奖励：" prop="openAward">
        <el-radio-group v-model="form.openAward" :disabled="!!form.isMobile" @change="setOpenAward">
          <el-radio :label="item.value" :key="item.value" v-for="item in isData">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0" v-if="form.openAward === 2" class="nengbar">
        <el-form-item label="每人奖励宝贝：" prop="awardNumber">
          <el-input v-model="form.awardNumber">
            <template slot="append">贝</template>
          </el-input>
        </el-form-item>
        <el-form-item label="奖励范围：" prop="awardScope">
          <el-input v-model="form.awardScope">
            <template slot="prepend">前</template>
            <template slot="append">名有效</template>
          </el-input>
        </el-form-item>
        <el-form-item label="宝贝消耗：" prop="awardTotal">
          <el-input disabled v-model="getAwardTotal">
            <template slot="append">贝</template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="时间设置：" prop="timeSetting">
        <el-radio-group v-model="form.timeSetting">
          <el-radio :label="item.value" :key="item.value" v-for="item in isData">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.timeSetting === 2" label="时间：" prop="timeRange">
        <iep-date-picker
          v-model="form.timeRange"
          value-format="yyyy-MM-dd HH:mm:00"
          format="yyyy-MM-dd HH:mm"
          :picker-options="timeOption"
          type="datetimerange"
          :default-time="defaultTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></iep-date-picker>
      </el-form-item>
      <el-form-item label="是否限制手机号填写：" prop="isMobile">
        <el-radio-group v-model="form.isMobile">
          <el-radio :label="item.value" :key="item.value" v-for="item in isOrNot">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="限制手机号：" prop="mobileListText" v-if="form.isMobile===1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          v-model.trim="form.mobileListText"
          :placeholder="placeholderMobileListText"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { formInit } from "./const/base";
import { getAccountVal } from "@/api/fms/account";
import { mapGetters } from "vuex";
import moment from "moment";
import formMixins from "./mixins/formMixins"; // 代码过多,分离了rule和rule相关校验方法到formMixins里
export default {
  mixins: [formMixins],
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tagsData: [],
      balance: "0",
      placeholderMobileListText:
        '请输入手机号，请用"/"来分隔手机号。示例：15895867484/15895867999',
      isData: [
        {
          label: "是",
          value: 2,
        },
        {
          label: "否",
          value: 1,
        },
      ],
      isOrNot: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      rangeData: [
        {
          label: "生态开放",
          value: 1,
        },
        {
          label: "组织内开放",
          value: 2,
        },
      ],
      timeOption: {
        disabledDate: (time) => {
          const day1 = new Date();
          day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
          return time.getTime() < +day1;
        },
      },
    };
  },
  watch: {
    formData: {
      handler(newVal) {
        for (const key in this.form) {
          this.form[key] = newVal[key];
        }
      },
      deep: true,
    },
    "form.timeSetting": {
      handler(newVal) {
        if (newVal === 1) {
          this.form.timeRange = [];
        }
      },
    },
    "form.timeRange": {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.form.startTime = newVal[0];
          this.form.endTime = newVal[1];
        } else {
          this.form.startTime = "";
          this.form.endTime = "";
        }
      },
      deep: true,
    },
    "form.isMobile": {
      handler(newVal) {
        if (!newVal) {
          this.form.mobileListText = "";
        } else {
          this.form.openAward = 1;
          this.form.awardNumber = 0;
          this.form.awardScope = 0;
        }
      },
    },
  },
  methods: {
    submit() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
            return false;
          }
        });
      });
    },
    getResult() {
      if (this.form.isMobile === 1) {
        this.form.mobileList = Array.from(
          new Set(this.form.mobileListText.split("/")),
        );
      }
      return this.form;
    },
    resetForm() {
      this.form = formInit();
    },
    async getAccount() {
      //初始化时取组织宝贝
      const { data } = await getAccountVal({
        id: this.userInfo.orgId,
        type: 3,
      });
      this.balance = data ? (data.balance ? data.balance : 0) : 0;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    getAwardTotal() {
      //计算总宝贝消耗
      const temp =
        Math.round(this.form.awardNumber * 100 * this.form.awardScope) / 100;
      if (isNaN(temp)) {
        return "输入有误";
      } else {
        return temp;
      }
    },
    defaultTime() {
      const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const st = nowDate.split(" ")[1];
      return [st, "23:59:59"];
    },
  },
  created() {
    this.getAccount();
  },
};
</script>
<style lang="scss" scoped>
.inline-form-item {
  padding-left: 0 !important;
}
.nengbar {
  margin-bottom: 0;
  ::v-deep .el-form-item__content {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-bottom: 30px;
      .el-input__inner {
        max-width: 70px;
      }
      &:last-of-type {
        .el-input__inner {
          max-width: 110px;
        }
      }
    }
  }
}
</style>
