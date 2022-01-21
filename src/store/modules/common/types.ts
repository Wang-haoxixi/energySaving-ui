import { Dict } from "@/types/user";

interface CommonState {
  isCollapse: boolean
  isFixedClose: boolean
  tableSize: string
  menu: []
  addRouters: []
  dictGroup: Map<string, Dict[]>
  cityTree: []
  industryTree: []
  positionTree: []
  professionTree: []
  redirect: string
  /**
   * 为什么需要两个重定向，解决wx会重新加载页面的问题
   */
  wxRedirect: string
}

export { CommonState };
