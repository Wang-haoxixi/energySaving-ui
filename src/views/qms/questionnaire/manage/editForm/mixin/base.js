export default {
  data() {
    return {
      uploadUrl: "/api/admin/file/sftp/upload",
      // uploadUrl:"/api/admin/file/upload",
      optionLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    type: {
      type: String,
      default: () => "edit",
    },
    index: {
      type: Number,
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};