
// import { loadContactsPyList } from '@/api/admin/contacts'
import { getUserNameList } from "@/api/dms/thoughts";

export default {
  data() {
    return {
      restaurants: [],
      state: "",
      keyupType: false,
      keyupTypes: false,
      startPos: -1,
      content: "",
    };
  },
  methods: {
    handleKeyup(val) {
      // 因为输入法的原因，需要在输入之后延时获取字符串
      setTimeout(() => {
        const elInput = document.getElementById("keyupStart"); // 根据id选择器选中对象
        const startPos = elInput.selectionStart; // input 第0个字符到选中的字符
        if (val.key === " ") { // 输入空格  --  关闭搜索
          console.log("关闭搜索");
          this.keyupTypes = false;
        } else if (val.key === "Backspace" && this.startPos === startPos + 1) { // 输入删除  --  关闭搜索
          this.keyupTypes = false;
        }
        if (this.keyupType) { // 输入普通的内容  --  根据输入搜索
          this.gettingFocus();
        } else if (val.code === "Digit2") { // 输入@ -- 打开搜索
          // 中文输入发状态下监听不到 @ 输入，所以要监听 2 然后判断是否输入了 @ 
          if (this.formData.content.slice(startPos - 1, startPos) === "@") {
            this.startPos = startPos;
            this.keyupType = true;
            this.keyupTypes = true;
          }
        }
      }, 200);
    },
    handleCancal() {
      this.handleEnd();
    },
    querySearchAsync(queryString, cb) {
      const defaultObj = {
        value: "轻敲空格完成输入",
        id: 0,
      };
      if (!this.keyupTypes) {
        cb([defaultObj]);
        this.handleEnd();
      } else {
        getUserNameList({ realName: this.state }).then(({ data }) => {
          const list = [defaultObj].concat(data.records.map(m => {
            return {
              value: m.realName,
              id: m.userId,
            };
          }));
          cb(list);
        });
      }
    },
    // 联想搜索
    handleSelect(item) {
      const elInput = document.getElementById("keyupStart"); // 根据id选择器选中对象
      const startPos = elInput.selectionStart; // input 第0个字符到选中的字符
      if (item.id === 0) {
        this.formData.content = this.formData.content.slice(0, startPos) + " " + this.formData.content.slice(startPos);
      } else {
        this.formData.content = this.formData.content.slice(0, this.startPos) + item.value + " " + this.formData.content.slice(startPos);
      }
      this.handleEnd();
      this.$nextTick(() => {
        this.$refs["content"].focus();
      });
    },
    // 结束
    handleEnd() {
      this.keyupType = false;
      this.content = "";
      this.state = "";
    },
    // @人
    handleAnt() {
      const elInput = document.getElementById("keyupStart"); // 根据id选择器选中对象
      const startPos = elInput.selectionStart; // input 第0个字符到选中的字符
      this.formData.content = this.formData.content.slice(0, startPos) + "@" + this.formData.content.slice(startPos);
      this.startPos = startPos + 1;
      this.keyupType = true;
      this.keyupTypes = true;
      this.gettingFocus();
    },
    gettingFocus() {
      const elInput = document.getElementById("keyupStart"); // 根据id选择器选中对象
      const startPos = elInput.selectionStart; // input 第0个字符到选中的字符
      this.state = this.formData.content.slice(this.startPos, startPos);
      if (this.formData.content !== this.content) {
        this.content = this.formData.content;
        this.$refs["autocomplete"].focus();
        this.$nextTick(() => {
          this.$refs["content"].focus();
        });
      }
    },
    handleSubject() {
      const elInput = document.getElementById("keyupStart"); // 根据id选择器选中对象
      const startPos = elInput.selectionStart; // input 第0个字符到选中的字符
      this.formData.content = this.formData.content.slice(0, startPos) + "#请填写话题# " + this.formData.content.slice(startPos);
    },
  },
};