import Vue from "vue";
import * as types from "./mutation-types";
import { CommonState } from "./types";
import { Dict } from "@/types/user";

export default {
  [types.SET_MENU](state: CommonState, menu: []) {
    state.menu = menu;
  },
  [types.SET_ADD_ROUTERS](state: CommonState, addRouters: []) {
    state.addRouters = addRouters;
  },
  [types.SET_COLLAPSE]: (state: CommonState) => {
    state.isCollapse = !state.isCollapse;
  },
  [types.SET_FIXED_CLOSE]: (state: CommonState, isFixedClose: boolean) => {
    state.isFixedClose = isFixedClose;
    Vue.$storage.set(types.SET_FIXED_CLOSE, isFixedClose);
  },
  [types.SET_DICT_GROUP]: (state: CommonState, dictGroup: Map<string, Dict[]>) => {
    state.dictGroup = dictGroup;
  },
  [types.SET_TABLE_SIZE]: (state: CommonState, tableSize: string) => {
    state.tableSize = tableSize;
    Vue.$storage.set(types.SET_TABLE_SIZE, tableSize);
  },
  [types.SET_CITY_TREE]: (state: CommonState, cityTree: []) => {
    state.cityTree = cityTree;
  },
  [types.SET_INDUSTRY_TREE]: (state: CommonState, industryTree: []) => {
    state.industryTree = industryTree;
  },
  [types.SET_POSITION_TREE]: (state: CommonState, positionTree: []) => {
    state.positionTree = positionTree;
  },
  [types.SET_PROFESSION_TREE]: (state: CommonState, professionTree: []) => {
    state.professionTree = professionTree;
  },
  [types.SET_REDIRECT]: (state: CommonState, redirect: string) => {
    state.redirect = redirect;
  },
  [types.SET_WX_REDIRECT]: (state: CommonState, wxRedirect: string) => {
    Vue.$storage.set(types.SET_WX_REDIRECT, wxRedirect);
    state.wxRedirect = wxRedirect;
  },
};
