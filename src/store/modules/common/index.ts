import * as actions from "./actions";
import state from "./state";
import mutations from "./mutations";
import { Module } from "vuex";
import { CommonState } from "./types";
import { RootState } from "@/store/types";

const commonModule: Module<CommonState, RootState> = {
  actions,
  state,
  mutations,
};
export default commonModule;
