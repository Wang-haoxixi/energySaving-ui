<template>
  <div class="info-form" v-loading="loading">
    <div class="tab">
      <div style="flex: 0 0 100px;">联系方式：</div>
      <div class="btn-group">
        <el-button
          type="default"
          v-for="(item,index) of form.infoFormConfigList"
          :key="'person'+index+Math.random()"
          :class="{active:index===currentIndex}"
          @click="handleToggle(index)"
        >
          {{item[0].value||`联系人${index+1}`}}
          <i
            v-if="index > 0"
            title="删除联系人"
            class="el-icon-woneng-guanbihuozheshibaishixin"
            @click.stop="handleDel(index)"
          ></i>
        </el-button>
        <i
          v-if="form.infoFormConfigList.length<form.amount"
          class="el-icon-woneng-jia1"
          title="添加新联系人"
          @click="addOne(true)"
        ></i>
      </div>
    </div>
    <div class="cont">
      <FormView ref="formView" :form="form.infoFormConfigList[currentIndex]"></FormView>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import FormView from "@/views/meetting/publish/Components/FormView.vue";
import { mapGetters } from "vuex";
import { getFormConfig } from "@/api/meetting/config";
import { isArrRepeat } from "@/util/util";
export default {
  name: "ConcactForm",
  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: {
    FormView,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      currentIndex: 0,
      formTemplate: [],
      loading: true,
    };
  },
  created() {
    this.loadPage();
  },
  watch: {
    "form.infoFormConfigList.length": {
      handler(v) {
        if (v > 0 && v - 1 < this.currentIndex) {
          this.currentIndex = v - 1;
        }
      },
    },
  },
  methods: {
    _deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    async loadPage() {
      this.loading = true;
      const { data } = await getFormConfig({
        activityId: this.form.conferenceId,
      });
      this.formTemplate = data;
      this.form.infoFormConfigList = [];
      {
        // 设置第一个人及预填信息
        const { data } = await getFormConfig({
          setDefault: true,
          activityId: this.form.conferenceId,
        });
        this.form.infoFormConfigList.push(this._deepCopy(data));
      }
      this.loading = false;
    },
    // 添加一个联系人
    addOne(indexFlag = false) {
      if (this.form.infoFormConfigList.length >= this.form.amount) {
        this.$message.warning(`当前最多添加${this.form.amount}个联系人`);
        return;
      }
      this.form.infoFormConfigList.push(this._deepCopy(this.formTemplate));
      if (indexFlag) {
        this.currentIndex = this.form.infoFormConfigList.length - 1;
      }
    },
    // 删除一个联系人
    handleDel(index) {
      if (this.form.infoFormConfigList.length <= 1) {
        this.$message.warning("至少需要一个联系人");
      } else {
        this.form.infoFormConfigList.splice(index, 1);
      }
    },
    // 切换联系人
    handleToggle(index) {
      this.currentIndex = index;
    },
    // 验证表单
    _validate() {
      const arr = [];
      const arrPhone = [];
      const phoneArr = [];
      const res = this.form.infoFormConfigList.map((m, index) => {
        const { validFlag, phoneFlag, phoneNum } = this.$refs[
          "formView"
        ]._validate(m, false);
        if (!validFlag) {
          arr.push(index + 1);
        }
        if (!phoneFlag) {
          arrPhone.push(index + 1);
        }
        phoneArr.push(phoneNum);
        return validFlag;
      });
      if (res.every((m) => m)) {
        const res = isArrRepeat(phoneArr);
        if (res) {
          return { code: 1, message: `联系人手机号不能重复` };
        }
        return { code: 0 };
      } else {
        if (arrPhone.length) {
          return {
            code: 1,
            message: `第 ${arrPhone.join(",")} 个联系人手机号格式不正确`,
          };
        }
        return { code: 1, message: `第 ${arr.join(",")} 个联系人信息不完整` };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.info-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tab {
    margin-top: 30px;
    display: flex;
    align-items: center;
    width: 90%;
    .btn-group {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -10px;
      i {
        align-self: center;
        margin-left: 15px;
        font-size: 24px;
        color: $--color-input-regular;
        cursor: pointer;
        &:hover {
          color: $--color-text-secondary;
        }
      }
      & > * {
        margin-bottom: 10px;
      }
    }
    .el-button {
      position: relative;
      &.active {
        color: #f74437;
        border-color: #fdc7c3;
        background-color: #feeceb;
      }
      i {
        position: absolute;
        cursor: pointer;
        top: -8px;
        right: -8px;
        font-size: 16px;
        color: $--color-primary;
        &:hover {
          font-size: 18px;
          top: -9px;
          right: -9px;
        }
      }
    }
  }
  .cont {
    margin-top: 30px;
    width: 80%;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    padding: 40px 80px 20px;
    box-sizing: border-box;
  }
}
</style>
