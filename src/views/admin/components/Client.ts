const RongIMLib = window.RongIMLib; // 由 window 赋值

export class ImClient {
  private imLib = RongIMLib;
  private imClient: any = null;
  private conversationList = [];// 当前已存在的会话列表
  // 初始化
  init() {
    this.conversationList = [];
    this.imClient = this.imLib.init({
      appkey: '82hegw5u8vy3x',
    });
    this.imClient.watch({
      conversation: (event: any) => {
        const updatedConversationList = event.updatedConversationList; // 更新的会话列表
        console.log('更新会话汇总:', updatedConversationList);
        console.log('最新会话列表:', this.imClient.Conversation.merge({
          conversationList: this.conversationList,
          updatedConversationList: updatedConversationList,
        }));
      },
      message: (event: any) => {
        const message = event.message;
        console.log('收到新消息', message);
      },
      status: (event: any) => {
        const status = event.status;
        switch (status) {
          case this.imLib.CONNECTION_STATUS.CONNECTED:
            console.log('链接成功');
            break;
          case this.imLib.CONNECTION_STATUS.CONNECTING:
            console.log('正在连接中');
            break;
          case this.imLib.CONNECTION_STATUS.DISCONNECTED:
            console.log('已主动断开连接');
            break;
          case this.imLib.CONNECTION_STATUS.NETWORK_UNAVAILABLE:
            console.log('网络不可用'); // SDK 内部会自动进行重连
            break;
          case this.imLib.CONNECTION_STATUS.SOCKET_ERROR:
            console.log('Socket 链接错误'); // SDK 内部会自动进行重连
            break;
          case this.imLib.CONNECTION_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT:
            console.log('其他设备登录, 本端被踢'); // 己端被踢, 不可进行重连. 否则会造成多端循环互踢
            break;
          case this.imLib.CONNECTION_STATUS.BLOCKED:
            console.log('链接断开, 用户已被封禁');
            break;
          default:
            console.log('链接状态变化为:', status);
            break;
        }
      },
    });
  }
  // 连接
  connect(token: string) {
    const user = { token };
    this.imClient.connect(user).then((user: any) => {
      console.log('链接成功, 链接用户 id 为: ', user.id);
    }).catch((error: any) => {
      console.log('链接失败: ', error.code, error.msg);
    });
  }
  //断开链接
  disconnect() {
    this.imClient.disconnect().then(function () {
      console.log('断开链接成功');
    });
  }
  //重新链接
  reconnect() {
    this.imClient.reconnect().then(function (user: any) {
      console.log('重新链接成功, 链接用户 id 为: ', user.id);
    }).catch(function (error: any) {
      console.log('链接失败: ', error.code, error.msg);
    });
  }
  //切换用户
  changeUser(token: string) {
    const user = { token };
    this.imClient.changeUser(user).then(function (user: any) {
      console.log('切换用户成功, 当前用户 id 为: ', user.id);
    }).catch(function (error: any) {
      console.log('切换用户失败: ', error.code, error.msg);
    });
  }
}

