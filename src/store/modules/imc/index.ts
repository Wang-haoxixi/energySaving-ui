import * as actions from "./actions";
import state from "./state";
import mutations from "./mutations";
import { ImcState } from "./types";
import { RootState } from "@/store/types";
import { Module } from "vuex";

const imcModule: Module<ImcState, RootState> = {
  actions,
  state,
  mutations,
};

export default imcModule;
