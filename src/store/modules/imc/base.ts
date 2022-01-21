import mapKeys from 'lodash/mapKeys';
import { msgType } from '@/layouts/Components/Other/ConversationBox/options';
import { showTypeName, showTypeAvatar } from '@/layouts/Components/Other/ConversationBox/options';
export const baseInfoMap = {
  name:
    mapKeys(showTypeName, (value, key) => {
      return JSON.stringify({
        id: key,
        type: 1,
      });
    }),
  avatar: mapKeys(showTypeAvatar, (value, key) => {
    return JSON.stringify({
      id: key,
      type: 1,
    });
  }),
};
export const createNotification = (message: any, tips: string, rongIMLib: any = null, cb: any = null) => {
  Notification.requestPermission((perm) => {
    if (perm === "granted") {
      let msg = "";
      switch (message.messageType) {
        case msgType[2]:
          msg = "[图片]";
          break;
        case msgType[3]:
          msg = "[文件]";
          break;
        case msgType[4]:
          msg = "[语音]";
          break;
        case msgType[5]:
          msg = "[位置]";
          break;
        case msgType[6]:
          msg = "[图文]";
          break;
        case msgType[7]:
          msg = "[语音]";
          break;
        default:
          msg = rongIMLib && message.content.content && rongIMLib.RongIMEmoji.emojiToSymbol(message.content.content) || message.content.content || "";
          break;
      }
      const notification = new Notification(tips, {
        dir: "auto",
        lang: "zh",
        icon: "https://wm.woneng.net/images/logo.png",
        body: msg,
        tag: message.messageUId,
      });
      notification.onclick = () => {
        window.focus();
        cb && cb(message);
      };
    }
  });
};
