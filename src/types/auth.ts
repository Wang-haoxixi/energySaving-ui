/**
 * 用户登陆认证
 */
interface AuthLogin {
  access_token: string
  active: boolean
  expires_in: number
  license: string
  org_id: number
  refresh_token: string
  scope: string
  tenant_id: number
  token_type: string
  user_id: number
  username: string
}


export {
  AuthLogin,
};
