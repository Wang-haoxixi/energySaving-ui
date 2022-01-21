import Vue from "vue";
import store from "@/store/";
import {
  SET_ACCESS_TOKEN,
  SET_EXPIRES_IN,
  SET_REFRESH_TOKEN,
  SET_CURRENT_MENU_GROUP,
} from "@/store/modules/user/mutation-types";
import { SET_TABLE_SIZE, SET_FIXED_CLOSE, SET_WX_REDIRECT } from "@/store/modules/common/mutation-types";

export default function Initializer() {
  store.commit(SET_WX_REDIRECT, Vue.$storage.get(SET_WX_REDIRECT));
  store.commit(SET_ACCESS_TOKEN, Vue.$storage.get(SET_ACCESS_TOKEN));
  store.commit(SET_ACCESS_TOKEN, Vue.$storage.get(SET_ACCESS_TOKEN));
  store.commit(SET_EXPIRES_IN, Vue.$storage.get(SET_EXPIRES_IN));
  store.commit(SET_REFRESH_TOKEN, Vue.$storage.get(SET_REFRESH_TOKEN));
  store.commit(SET_TABLE_SIZE, Vue.$storage.get(SET_TABLE_SIZE) || "meduim");
  store.commit(SET_FIXED_CLOSE, Vue.$storage.get(SET_FIXED_CLOSE) ?? false);
  store.commit(SET_CURRENT_MENU_GROUP, Vue.$storage.get(SET_CURRENT_MENU_GROUP));
  store.dispatch('initAndWatchIM');
}
