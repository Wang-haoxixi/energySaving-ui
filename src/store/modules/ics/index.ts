import * as actions from "./actions";
import state from "./state";
import mutations from "./mutations";
import { Module } from "vuex";
import { IcsState } from "./types";
import { RootState } from "@/store/types";

const icsModule: Module<IcsState, RootState> = {
  actions,
  state,
  mutations,
};
export default icsModule;
