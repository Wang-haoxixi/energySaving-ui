import * as types from "./mutation-types";
import { IcsState } from "./types";

export default {
  [types.SET_QUESTION_DIALOG_SHOW](state: IcsState, status: boolean) {
    state.questionDialogShow = status;
  },
};
