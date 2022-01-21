
import ShowAnswer from "./showAnswer";
export default {
  components: {
    ShowAnswer,
  },
  data() {
    return {
      isShowAns: false,
    };
  },
  methods: {
    handleShowAnswer() {
      this.isShowAns = !this.isShowAns;
    },
  },
};
