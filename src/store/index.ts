import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import user from "./modules/user/index";
import common from "./modules/common/index";
import ics from "./modules/ics/index";
import imc from "./modules/imc/index";
import getters from "./getters";
import { RootState } from "./types";

Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  state: {
    version: "v1.0",
  },
  modules: {
    user,
    common,
    ics,
    imc,
  },
  getters,
};

export default new Vuex.Store<RootState>(store);
