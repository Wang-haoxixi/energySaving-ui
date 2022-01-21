import * as types from "./mutation-types";
import { ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { IcsState } from "./types";

export const QuestionAndAnswer = ({ commit }: ActionContext<IcsState, RootState>, status: boolean) => {
  commit(types.SET_QUESTION_DIALOG_SHOW, status);
};
