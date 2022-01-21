<template>
  <iep-dialog :dialog-show="dialogShow" title="转账" width="600px" @close="close">
    <el-form :model="form" :rules="rules" ref="form" label-width="95px">
      <iep-form-item label-name="转账类型">
        <el-radio-group v-model="form.receiverPayType">
          <el-radio-button :label="3">组织</el-radio-button>
          <el-radio-button :label="4">个人</el-radio-button>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item v-if="form.receiverPayType===4" label-name="接受人" prop="receiver">
        <IepContactInput v-model="form.receiver" :showFriend="true" :onlyOnlineOrg="false"></IepContactInput>
      </iep-form-item>
      <iep-form-item v-if="form.receiverPayType===3" label-name="接受方" prop="receiverId">
        <IepOrgSelect v-if="form.senderPayType!==null" v-model="form.receiverId"></IepOrgSelect>
        <IepSelectSearchAllOrg v-else v-model="form.receiverId"></IepSelectSearchAllOrg>
      </iep-form-item>
      <iep-form-item label-name="金额" prop="amount">
        <iep-input-amount v-model="form.amount"></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="安全密码" prop="safePassword">
        <span v-if="!userInfo.safePassword">
          请先去
          <el-link type="primary" @click="openSecurity()">账号设置 > 账号安全 设置安全密码</el-link>
        </span>
        <el-input v-else type="password" autocomplete="false" v-model="form.safePassword"></el-input>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">转账</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { checkContactUser } from "@/util/rules";
import { mapGetters } from "vuex";
import formMixins from "@/mixins/formMixins";
import { encryption } from "@/util/util";
class TransferDTO {
  constructor(senderPayType = null, senderId = null) {
    this.senderPayType = senderPayType;
    this.senderId = senderId;
  }
  receiverId = null;
  senderId = null;
  receiver = {};
  receiverPayType = 4; // 收入账户类型（0超级账户，1平台，2联盟，3组织，4个人，5红包）
  senderPayType = null; // 发送账户类型（0超级账户，1平台，2联盟，3组织，4个人，5红包）
  amount = 0; // 交易金额
  remarks = ""; // 备注
  safePassword = ""; // 支付密码
}
export default {
  name: "IepDialogTransferNb",
  mixins: [formMixins],
  data() {
    return {
      formRequestFn: () => {},
      form: new TransferDTO(),
      dialogShow: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    rules() {
      const rules = {
        safePassword: [
          { required: true, message: "请输入安全密码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" },
        ],
      };
      if (this.form.receiverPayType === 4) {
        return {
          ...rules,
          receiver: {
            required: true,
            validator: checkContactUser("接受人"),
            trigger: "blur",
          },
        };
      } else if (this.form.receiverPayType === 3) {
        return {
          ...rules,
          receiverId: {
            required: true,
            message: "请选择接受方",
            trigger: "blur",
          },
        };
      } else {
        return rules;
      }
    },
  },
  methods: {
    个人转账个人() {
      this.form = new TransferDTO(4, this.userInfo.userId);
    },
    平台转账个人() {
      this.form = new TransferDTO();
    },
    组织转账个人() {
      this.form = new TransferDTO(3, this.userInfo.orgId);
    },
    async submitForm() {
      if (this.form.receiverPayType === 4) {
        this.form.receiverId = this.form.receiver.id;
      }
      delete this.form.receiver;
      const form = encryption({
        data: this.form,
        param: ["safePassword"],
      });
      const { data } = await this.formRequestFn(form);
      if (data) {
        this.$message("操作成功");
        this.close();
      }
    },
    openSecurity() {
      this.close();
      this.$openPage("/my/account/security");
    },
    _close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
    close() {
      this.form = new TransferDTO();
      this._close();
    },
  },
};
</script>
