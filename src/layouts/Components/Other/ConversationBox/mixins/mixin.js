import { mapState } from "vuex";
import { parseToDay, spaceWrapEscape } from "@/filters/index.ts";
export default {
  data() {
    return {
      audioFlag: false,
    };
  },
  computed: {
    ...mapState({
      rongIMLib: state => state.imc.rongIMLib,
      messageList: state => state.imc.messageList,
    }),
  },
  methods: {
    //unicode转emoji
    unicodeToEmoji(content) {
      if (content && typeof content === "string") {
        return this.rongIMLib.RongIMEmoji.symbolToEmoji(
          this.rongIMLib.RongIMEmoji.emojiToSymbol(content),
        );
      } else {
        return "";
      }

    },
    //unicode转文字
    unicodeToTxt(content) {
      if (content && typeof content === "string") {
        return this.rongIMLib.RongIMEmoji.emojiToSymbol(content);
      } else {
        return "";
      }
    },
    //网址转链接 加空格换行转换
    httpToLink(content) {
      const reg1 = /<(?!a|\/a).*?>/g;
      let text = content.replace(reg1, "");
      const reg2 = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:|%)+)/g;
      text = spaceWrapEscape(text);
      text = text.replace(reg2, "<a href='$1$2' target='_blank'>$1$2</a>");
      return text;
    },
    //内容处理
    contentSolve(content) {
      if (!content) return "";
      let str = this.unicodeToEmoji(content);
      str = this.httpToLink(str);
      return str;
    },
    //时间线
    timeDividing(item, index) {
      const prop = item.time ? 'time' : 'sentTime';
      if (index === 0) {
        return item[prop];
      }
      const yestoday = this.messageList[index - 1][prop];
      return parseToDay(item[prop]) !== parseToDay(yestoday) ? item[prop] : false;
    },
    //播放声音
    playAudio(audioFile, duration) {
      //预加载
      this.rongIMLib.RongIMVoice.preLoaded(audioFile, () => {
        // 播放声音
        this.rongIMLib.RongIMVoice.play(audioFile, duration);
      });
    },
    //停止播放
    stopAudio(audioFile) {
      this.rongIMLib.RongIMVoice.stop(audioFile);
    },
    handleAudio(msg) {
      const { content, duration } = msg;
      if (this.audioFlag) {
        this.stopAudio(content);
        this.audioFlag = false;
      } else {
        clearTimeout(this.timer);
        this.audioFlag = true;
        this.playAudio(content, duration);
        this.timer = setTimeout(() => {
          this.audioFlag = false;
          clearTimeout(this.timer);
        }, duration * 1000);
      }
    },
  },
};
