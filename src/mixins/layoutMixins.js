/**
 * 全局布局
 */
import { mapActions, mapGetters, mapMutations } from "vuex";
import { validatenull } from "@/util/validate";
import * as types from "@/store/modules/user/mutation-types";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  computed: {
    ...mapGetters([
      "expiresIn",
      "accessToken",
    ]),
  },
  created() {
    // 实时检测刷新token
    this.handleRefreshToken();
  },
  methods: {
    ...mapActions(["userRefreshToken"]),
    ...mapMutations({ setExpiresIn: types.SET_EXPIRES_IN }),
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 实时检测刷新token
    handleRefreshToken() {
      let timer = null;
      timer = setInterval(() => {
        const token = this.accessToken;
        if (validatenull(token)) {
          return;
        }
        if (this.expiresIn <= 1000 && !this.refreshLock) {
          this.refreshLock = true;
          this.userRefreshToken().catch(() => {
            clearInterval(timer);
          });
          this.refreshLock = false;
        }
        this.setExpiresIn(this.expiresIn - 10);
      }, 10000);
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
};
