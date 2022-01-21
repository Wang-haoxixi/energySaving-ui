<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="`${methodName}内部网签合同`" :backOption="backOption"></iep-page-header>
      <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-width="150px"
        class="form form-detail"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="委托组织（甲方）：" prop="orgId">
              <IepOrgSelect v-model="formData.orgId" disabled></IepOrgSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方代表：" prop="partyAuserName">
              <IepContactInput
                v-model="formData.partyAuserName"
                :showFriend="true"
                :onlyOnlineOrg="false"
              ></IepContactInput>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承接组织（乙方）：" prop="carryonOrg">
              <IepOrgSelect v-model="formData.carryonOrg"></IepOrgSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方代表：" prop="partyBuserName">
              <IepContactInput
                v-model="formData.partyBuserName"
                :showFriend="true"
                :onlyOnlineOrg="false"
              ></IepContactInput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <span style="display:block;">&nbsp;</span>
          <el-col :span="24">
            <span class="label">经协商，甲乙双方就：</span>
            <div class="form-inline half mb-no">
              <el-form-item label prop="projectId">
                <iep-project-select
                  v-model="formData.projectId"
                  :projectName="formData.projectName"
                  @relation-change="handleProjectChange"
                ></iep-project-select>
              </el-form-item>
            </div>
            <span class="label">合作事宜达成一致意见，以便共同遵守。</span>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第一条 项目内容</span>
          <el-col :span="24">
            <div class="form-left-no">
              <el-form-item label prop="contents">
                <el-input type="textarea" v-model="formData.contents"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第二条 项目费用</span>
          <el-col :span="24">
            <span class="label">双方认定本合同项目费用总金额为人民币</span>
            <div class="form-inline mb-no">
              <el-form-item label prop="amount">
                <el-input-number v-model="formData.amount"></el-input-number>
              </el-form-item>
            </div>
            <span class="label">元，费用包括</span>
            <div class="form-inline mb-no">
              <el-form-item label prop="costItem">
                <el-input v-model="formData.costItem"></el-input>
              </el-form-item>
            </div>
            <br />
            <span class="label">如果在项目执行中项目金额发送变动，由双方协定解决。</span>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第三条 付款方式</span>
          <el-col :span="24">
            <div class="form-left-no">
              <el-form-item label prop="payment">
                <el-input type="textarea" v-model="formData.payment"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第四条 利益分配</span>
          <el-col :span="24">
            <span class="label">项目由双方共同完成，所产生的收益归甲乙双方所有，按利润的甲方</span>
            <div class="form-inline small mb-no">
              <el-form-item label prop="partyArate">
                <el-input-number v-model="formData.partyArate"></el-input-number>
              </el-form-item>
            </div>
            <span class="label">%，乙方</span>
            <div class="form-inline small mb-no">
              <el-form-item label prop="partyBrate">
                <el-input-number v-model="formData.partyBrate"></el-input-number>
              </el-form-item>
            </div>
            <br />
            <span class="label">%比例分成，所产生的亏损，或者民事责任由甲乙双方各自依法承担。</span>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第五条 纠纷处理</span>
          <el-col :span="24">
            <span class="label">如果甲乙双方出现纠纷，由双方协商解决。协商未果的由集团高层及项目委员会进行仲裁，一裁终局。</span>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第六条 补充说明</span>
          <el-col :span="24">
            <div class="form-left-no">
              <el-form-item label prop="footnote">
                <el-input type="textarea" v-model="formData.footnote"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <span class="title">第七条 本合同自双方确认后起生效</span>
          <el-col :span="24"></el-col>
        </el-row>
      </el-form>
      <IepFooterBar>
        <el-button type="primary" @click="save(1)" :loading="btnLoading">保存并发布</el-button>
        <iep-button @click="save(0)" :loading="btnLoading">保存为草稿</iep-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>

<script>
import { initFormData, rules } from "./option";
import { mapGetters } from "vuex";
import {
  getOnlineconDetail,
  createOnlinecon,
  updateOnlinecon,
} from "@/api/gpms/manage";
import IepProjectSelect from "../../components/Select";

export default {
  name: "add-dialog",
  components: { IepProjectSelect },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close();
        },
      },
      rules,
      formData: initFormData(),
      type: "create",
      typeObj: {
        create: {
          requestFn: createOnlinecon,
          name: "新增",
        },
        update: {
          requestFn: updateOnlinecon,
          name: "编辑",
        },
      },
      btnLoading: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id ? +this.$route.params.id : null;
    },
    methodName() {
      return this.id ? "修改" : "新增";
    },
    ...mapGetters(["userInfo"]),
  },
  created() {
    if (this.id) {
      getOnlineconDetail(this.id).then(res => {
        this.formData = this.$mergeByFirst(initFormData(), res.data);
      });
      this.type = "update";
    }
    // getCustomerPage({ type: 1 }).then((res) => {
    //   this.clientList = res.data.records
    // })
    this.formData = initFormData(this.userInfo);
  },
  methods: {
    handleProjectChange(v) {
      if (v) {
        this.formData.projectId = v.id;
        this.formData.projectName = v.name;
      }
    },
    close() {
      this.$router.history.go(-1);
    },
    async save(val) {
      // if (this.id) {
      //   await getOnlineconDetail(this.id).then((res) => {
      //     const changeData = this.$mergeByFirst(initFormData(), res.data)
      //     this.changeTableData = changeData.projectBudgetList
      //   })
      // }
      this.formData.signStatus = val;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          this.typeObj[this.type].requestFn(this.formData).then(res => {
            if (res.data === true) {
              this.$message({
                type: "success",
                message: `${this.methodName}成功!`,
              });
              this.$router.push({
                path: "/gpms/manage",
                query: {
                  tabActive: "sign",
                },
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
* {
  vertical-align: middle;
}
.title {
  display: block;
  margin-top: 30px;
  padding-left: 10px;
  height: 34px;
  line-height: 34px;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin-bottom: 10px;
}
.iep-page-form {
  font-size: 14px;
  .label {
    display: inline-block;
    height: 42px;
    line-height: 42px;
  }
  .mb-no ::v-deep .is-required {
    margin-bottom: 0;
  }
  ::v-deep .el-select {
    width: 100%;
  }
}
.iep-page-form .el-form {
  padding: 0 0 50px 30px;
}
.el-form-item--small.el-form-item {
  margin: 10px 0;
}
.form-inline {
  display: inline-block;
}
.half {
  width: 50%;
}
.small {
  width: 20%;
}
</style>
<style scoped>
.form-inline >>> .el-form-item__content {
  margin: 0 10px !important;
}
.form-left-no >>> .el-form-item__content {
  margin: 0 !important;
}
.form-left-no >>> .el-form-item {
  margin: 0 !important;
}
::v-deep .right-wrapper {
  padding-left: 180px;
}
</style>

