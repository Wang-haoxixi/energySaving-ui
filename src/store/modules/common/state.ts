import { CommonState } from "./types";

const commonState: CommonState = {
  isCollapse: false,
  isFixedClose: false,
  tableSize: "small",
  menu: [],
  addRouters: [],
  dictGroup: new Map(),
  cityTree: [],
  industryTree: [],
  positionTree: [],
  professionTree: [],
  redirect: '',
  wxRedirect: '',
};
export default commonState;
