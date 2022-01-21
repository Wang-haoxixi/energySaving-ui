export class IssueDTO {
  amount = 0;
  remarks = "";
  safePassword = "";
  mobile = "";
  code = "";
}
export class PhoneDTO {
  mobile = "";
  safePassword = "";
  code = "";
}

export class TransferDTO {
  receiverId = null;
  receiver = {};
  receiverPayType = 4; // 收入账户类型（0超级账户，1平台，2联盟，3组织，4个人，5红包）
  amount = 0; // 交易金额
  remarks = ""; // 备注
  safePassword = ""; // 支付密码
}
