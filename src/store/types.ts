import { UserState } from "./modules/user/types";
import { CommonState } from "./modules/common/types";
import { IcsState } from "./modules/ics/types";
import { ImcState } from './modules/imc/types';

// types.ts
export interface RootState {
  version: string
  user?: UserState
  common?: CommonState
  ics?: IcsState
  imc?: ImcState
}
